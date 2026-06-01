import type { Metadata } from 'next';
import { getPublishedPosts } from './data';
import { BookOpen } from 'lucide-react';
import { BlogList } from './BlogList';



export const metadata: Metadata = {
  title: 'YouTube SEO Blog — Tips, Guides & Strategies',
  description: 'Expert YouTube SEO tips, guides, and strategies to grow your channel. Learn about tags, hashtags, descriptions, titles, and more.',
  openGraph: {
    title: 'YouTube SEO Blog — Tips, Guides & Strategies',
    description: 'Expert YouTube SEO tips and strategies to grow your channel faster.',
    type: 'website',
    url: 'https://freeviralkit.com/blog',
  },
  alternates: {
    canonical: 'https://freeviralkit.com/blog',
  },
};

export default function BlogPage() {
  const publishedPosts = getPublishedPosts();

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
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Expert strategies, tutorials, and insights to help you rank higher on YouTube and grow your channel faster.
        </p>
      </section>

      {/* Blog Grid with Load More */}
      <BlogList posts={publishedPosts} />
    </main>
  );
}
