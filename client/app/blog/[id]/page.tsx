"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { BlogPost } from "@/lib/types";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const blog = await apiClient.getBlog(params.id);
      setPost({
        ...blog,
        id: String(blog.id),
      });
    } catch (error) {
      console.error("Failed to load blog:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Link
        href="/blog"
        className="text-gray-600 hover:text-gray-900 mb-8 inline-block transition-colors"
      >
        ← Back to Blog
      </Link>

      {(post.image || post.image_url) && (
        <div className="relative w-full h-96 mb-8 overflow-hidden">
          <Image
            src={post.image || post.image_url || ""}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <article>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{formattedDate}</p>

        <div className="prose prose-lg max-w-none">
          <div
            className="text-base text-gray-900 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
