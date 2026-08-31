import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getPublishedPosts } from '@/app/blog/data';

export async function HomeBlogShowcase() {
  const allPosts = await getPublishedPosts();
  const latestPosts = allPosts.slice(0, 6);

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-2 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Creator Knowledge Hub
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Featured YouTube <span className="text-gradient">Growth Guides</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Deep-dive masterclasses on algorithm secrets, retention, and SEO
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-semibold text-purple-600 dark:text-purple-400 transition-colors"
        >
          Explore All Guides <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card rounded-2xl p-5 group hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-purple-400 bg-purple-400/10 px-2.5 py-0.5 rounded-full border border-purple-400/20 truncate max-w-[160px]">
                  {post.category}
                </span>
                <span className="text-[11px] text-slate-500 shrink-0">{post.readTime}</span>
              </div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">
                {post.description}
              </p>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
              <span>By Shiva Srivastava</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
