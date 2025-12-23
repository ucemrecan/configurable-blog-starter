import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/mockData";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find((p) => p.id === params.id);

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

      {post.image && (
        <div className="relative w-full h-96 mb-8 overflow-hidden">
          <Image
            src={post.image}
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
          <p className="text-base text-gray-900 leading-relaxed font-light whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}
