import { BlogPost } from './types';
import { blogPosts } from './mockData';

const STORAGE_KEY = 'admin_blogs';

// Initialize with existing mock data if storage is empty
const initializeStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') {
    return blogPosts;
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
    return blogPosts;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
    return blogPosts;
  }
};

export const getAllBlogs = (): BlogPost[] => {
  return initializeStorage();
};

export const getBlogById = (id: string): BlogPost | undefined => {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id === id);
};

export const createBlog = (blog: Omit<BlogPost, 'id'>): BlogPost => {
  const blogs = getAllBlogs();
  const newId = String(Date.now());
  const newBlog: BlogPost = {
    ...blog,
    id: newId,
  };
  
  const updatedBlogs = [newBlog, ...blogs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  return newBlog;
};

export const updateBlog = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const blogs = getAllBlogs();
  const index = blogs.findIndex(blog => blog.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedBlog: BlogPost = {
    ...blogs[index],
    ...updates,
    id, // Ensure ID doesn't change
  };
  
  const updatedBlogs = [...blogs];
  updatedBlogs[index] = updatedBlog;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  return updatedBlog;
};

export const deleteBlog = (id: string): boolean => {
  const blogs = getAllBlogs();
  const filteredBlogs = blogs.filter(blog => blog.id !== id);
  
  if (filteredBlogs.length === blogs.length) {
    return false; // Blog not found
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBlogs));
  return true;
};

