'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BlogPost } from '@/lib/types';
import ImageUpload from './ImageUpload';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BlogFormProps {
  blog?: BlogPost;
  onSave: (blog: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}

export default function BlogForm({ blog, onSave, onCancel }: BlogFormProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [image, setImage] = useState(blog?.image || blog?.image_url || '');
  const [date, setDate] = useState(
    blog?.date || new Date().toISOString().split('T')[0]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setExcerpt(blog.excerpt || '');
      setImage(blog.image || blog.image_url || '');
      setDate(blog.date || new Date().toISOString().split('T')[0]);
    }
  }, [blog]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!content.trim() || content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      image_url: image || undefined,
      date,
    });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 ${
            errors.date ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      <ImageUpload value={image} onChange={setImage} />

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt (Optional)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          placeholder="Enter a brief excerpt for the blog post"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            className="bg-white"
          />
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
        >
          {blog ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  );
}

