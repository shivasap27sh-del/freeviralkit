"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from './data';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const visiblePosts = posts.slice(0, visibleCount);

  const hasMore = visibleCount < posts.length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            </div>

            <h2 className="font-display text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors leading-snug">
              {post.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              {post.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1 text-sm text-purple-400 font-medium group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-3 font-semibold text-sm cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}
