'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '@/lib/adminStore';
import BlogList from '@/components/admin/BlogList';
import BlogForm from '@/components/admin/BlogForm';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | undefined>(undefined);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load blogs' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCreate = () => {
    setEditingBlog(undefined);
    setShowForm(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleSave = async (blogData: Omit<BlogPost, 'id'>) => {
    try {
      if (editingBlog) {
        const updated = await updateBlog(String(editingBlog.id), blogData);
        if (updated) {
          setMessage({ type: 'success', text: 'Blog updated successfully!' });
        } else {
          setMessage({ type: 'error', text: 'Failed to update blog' });
        }
      } else {
        await createBlog(blogData);
        setMessage({ type: 'success', text: 'Blog created successfully!' });
      }
      
      await loadBlogs();
      setShowForm(false);
      setEditingBlog(undefined);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteBlog(id);
      if (success) {
        setMessage({ type: 'success', text: 'Blog deleted successfully!' });
        await loadBlogs();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete blog' });
      }
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        {!showForm && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add New Blog
          </button>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {showForm ? (
        <BlogForm
          blog={editingBlog}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

