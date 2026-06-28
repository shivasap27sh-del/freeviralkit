import Link from 'next/link';
import { getPublishedPosts } from '@/app/blog/data';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function LatestBlogPosts() {
  const posts = getPublishedPosts().slice(0, 4);

  if (!posts.length) return null;

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mt-12 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-500" />
          Latest YouTube Guides
        </h2>
        <Link href="/blog" className="text-sm font-semibold text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1 hidden sm:flex transition-colors">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all block"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 line-clamp-1 mb-1 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2">{post.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-4 sm:hidden text-center">
        <Link href="/blog" className="text-sm font-semibold text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center gap-1 transition-colors">
          View all blog posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
