import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '../../data';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import Pagination from '@/components/Pagination';

const POSTS_PER_PAGE = 10;

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
  const publishedPosts = getPublishedPosts();
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  
  // We only generate params for page 2 and onwards, since page 1 is the main /blog route
  const params = [];
  for (let i = 2; i <= totalPages; i++) {
    params.push({ page: i.toString() });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog Page ${page} — FreeViralKit`,
    description: `Read page ${page} of our YouTube SEO and growth guides.`,
    alternates: {
      canonical: `https://freeviralkit.com/blog/page/${page}`,
    },
  };
}

export default async function BlogPaginationPage({ params }: Props) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }

  const publishedPosts = getPublishedPosts();
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = publishedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
          Expert strategies, tutorials, and insights to help you rank higher on YouTube and grow your channel faster. Page {currentPage}.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] flex flex-col"
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog"
      />
    </main>
  );
}
