'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import { apiClient } from '@/lib/api';
import { BlogPost } from '@/lib/types';

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await apiClient.getBlogs();
      setAllPosts(blogs);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const postsToShow = allPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < allPosts.length;

  const loadMore = () => {
    setDisplayedPosts(prev => prev + POSTS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {postsToShow.map((post, index) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          isLast={index === postsToShow.length - 1 && !hasMore}
        />
      ))}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

