import { BlogPost } from './types';
import { apiClient } from './api';
import { getStoredCredentials } from './adminAuth';

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const blogs = await apiClient.getBlogs();
    // Convert backend ID (number) to string for frontend compatibility
    return blogs.map(blog => ({
      ...blog,
      id: String(blog.id),
    }));
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
};

export const getBlogById = async (id: string): Promise<BlogPost | undefined> => {
  try {
    const blog = await apiClient.getBlog(id);
    return {
      ...blog,
      id: String(blog.id),
    };
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return undefined;
  }
};

export const createBlog = async (blog: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('Not authenticated');
  }
  
  try {
    const newBlog = await apiClient.createBlog(blog, credentials.username, credentials.password);
    return {
      ...newBlog,
      id: String(newBlog.id),
    };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create blog');
  }
};

export const updateBlog = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('Not authenticated');
  }
  
  try {
    const updatedBlog = await apiClient.updateBlog(id, updates, credentials.username, credentials.password);
    return {
      ...updatedBlog,
      id: String(updatedBlog.id),
    };
  } catch (error: any) {
    if (error.message?.includes('404')) {
      return null;
    }
    throw new Error(error.message || 'Failed to update blog');
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('Not authenticated');
  }
  
  try {
    await apiClient.deleteBlog(id, credentials.username, credentials.password);
    return true;
  } catch (error: any) {
    if (error.message?.includes('404')) {
      return false;
    }
    throw new Error(error.message || 'Failed to delete blog');
  }
};

