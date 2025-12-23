import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  isLast?: boolean;
}

export default function BlogCard({ post, isLast = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const displayText = post.excerpt || post.content;

  return (
    <>
      <article className="bg-white flex gap-6 p-0">
        {post.image && (
          <div className="relative w-64 h-64 flex-shrink-0 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          <Link href={`/blog/${post.id}`}>
            <h2 className="text-[1.75em] font-serif font-semibold text-gray-900 mb-3 leading-tight hover:underline cursor-pointer">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500 mb-4">
            {formattedDate}
          </p>
          <p className="text-base text-gray-900 leading-relaxed font-light">
            {displayText}
          </p>
        </div>
      </article>
      {!isLast && <div className="border-b border-gray-200"></div>}
    </>
  );
}

