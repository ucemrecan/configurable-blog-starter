'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/lib/mockData';

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const [displayedPosts, setDisplayedPosts] = useState(POSTS_PER_PAGE);
  const allPosts = blogPosts;
  const postsToShow = allPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < allPosts.length;

  const loadMore = () => {
    setDisplayedPosts(prev => prev + POSTS_PER_PAGE);
  };

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

