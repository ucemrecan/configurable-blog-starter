import { BlogPost, Profile } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  private async authRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    username?: string,
    password?: string
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (username && password) {
      const credentials = btoa(`${username}:${password}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Blog endpoints
  async getBlogs(): Promise<BlogPost[]> {
    const blogs = await this.request<any[]>('/blogs');
    return blogs.map(blog => ({
      ...blog,
      id: String(blog.id),
      image: blog.image_url || blog.image,
    }));
  }

  async getBlog(id: string): Promise<BlogPost> {
    const blog = await this.request<any>(`/blogs/${id}`);
    return {
      ...blog,
      id: String(blog.id),
      image: blog.image_url || blog.image,
    };
  }

  async createBlog(blog: Omit<BlogPost, 'id'>, username: string, password: string): Promise<BlogPost> {
    const blogData: any = { ...blog };
    if (blogData.image_url) {
      // image_url is already set
    } else if (blogData.image) {
      blogData.image_url = blogData.image;
      delete blogData.image;
    }
    const result = await this.authRequest<any>('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    }, username, password);
    return {
      ...result,
      id: String(result.id),
      image: result.image_url || result.image,
    };
  }

  async updateBlog(id: string, blog: Partial<BlogPost>, username: string, password: string): Promise<BlogPost> {
    const blogData: any = { ...blog };
    if (blogData.image_url) {
      // image_url is already set
    } else if (blogData.image) {
      blogData.image_url = blogData.image;
      delete blogData.image;
    }
    const result = await this.authRequest<any>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    }, username, password);
    return {
      ...result,
      id: String(result.id),
      image: result.image_url || result.image,
    };
  }

  async deleteBlog(id: string, username: string, password: string): Promise<void> {
    return this.authRequest<void>(`/blogs/${id}`, {
      method: 'DELETE',
    }, username, password);
  }

  // Admin endpoints
  async adminLogin(username: string, password: string): Promise<{ username: string }> {
    return this.authRequest<{ username: string }>('/admin/login', {
      method: 'POST',
    }, username, password);
  }

  async adminLogout(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/admin/logout', {
      method: 'POST',
    });
  }

  // Config endpoints
  async getConfig(): Promise<{
    blog: Profile & { profile_image?: string };
    about: { bio: string; skills: string[]; experience: string };
    contact: { email: string; social_media: Record<string, string> };
  }> {
    const config = await this.request<any>('/config');
    return {
      ...config,
      blog: {
        ...config.blog,
        profileImage: config.blog.profile_image || config.blog.profileImage,
      },
    };
  }
}

export const apiClient = new ApiClient();

