import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from './data';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube SEO Blog — Tips, Guides & Strategies | FreeViralKit',
  description: 'Expert YouTube SEO tips, guides, and strategies to grow your channel. Learn about tags, hashtags, descriptions, titles, and more.',
  openGraph: {
    title: 'YouTube SEO Blog — Tips, Guides & Strategies | FreeViralKit',
    description: 'Expert YouTube SEO tips and strategies to grow your channel faster.',
    type: 'website',
    url: 'https://freeviralkit.com/blog',
  },
  alternates: {
    canonical: 'https://freeviralkit.com/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> YouTube Growth Blog
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          YouTube SEO <span className="text-gradient">Tips & Guides</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Expert strategies, tutorials, and insights to help you rank higher on YouTube and grow your channel faster.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            </div>

            <h2 className="font-display text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors leading-snug">
              {post.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {post.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-500">
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
    </main>
  );
}
