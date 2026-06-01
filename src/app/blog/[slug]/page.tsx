import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedPosts, getPublishedPostBySlug, getPostBySlug, getAllSlugs } from '../data';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { InContentAd } from '@/components/AdSense';



type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://freeviralkit.com/blog/${post.slug}`,
      tags: post.tags,
      images: [
        {
          url: `https://og.tailgraph.com/og?fontFamily=Inter&title=${encodeURIComponent(post.title)}&text=${encodeURIComponent(post.description.substring(0, 120) + '...')}&bg=1e293b&titleColor=ffffff&textColor=cbd5e1`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`https://og.tailgraph.com/og?fontFamily=Inter&title=${encodeURIComponent(post.title)}&text=${encodeURIComponent(post.description.substring(0, 120) + '...')}&bg=1e293b&titleColor=ffffff&textColor=cbd5e1`],
    },
    alternates: {
      canonical: `https://freeviralkit.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  // Use published check — returns 404 for scheduled posts that aren't live yet
  const post = getPublishedPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown-to-HTML
  const renderContent = (content: string) => {
    // Normalize spacing to ensure headings and lists are separated by \n\n
    const normalizedContent = content
      .replace(/^(#{2,3} .*)$/gm, '\n\n$1\n\n')
      .replace(/(?:^|\n)(-[^\n]*(?:\n-[^\n]*)*)/g, '\n\n$1\n\n')
      .replace(/(?:^|\n)(\* [^\n]*(?:\n\* [^\n]*)*)/g, '\n\n$1\n\n')
      .replace(/(?:^|\n)(❌[^\n]*(?:\n❌[^\n]*)*)/g, '\n\n$1\n\n')
      .replace(/(?:^|\n)(✅[^\n]*(?:\n✅[^\n]*)*)/g, '\n\n$1\n\n')
      .trim();

    const sections = normalizedContent.split(/\n{2,}/);
    return sections.map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="font-display text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="font-display text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('```')) {
        const code = trimmed.replace(/```\w*/g, '').trim();
        return (
          <pre key={i} className="bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 my-4 overflow-x-auto">
            <code className="text-sm text-green-400 font-mono">{code}</code>
          </pre>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('❌') || trimmed.startsWith('✅')) {
        const items = trimmed.split('\n').filter(item => item.trim() !== '');
        return (
          <ul key={i} className="space-y-2 my-4">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: item
                      .replace(/^(?:-\s*|\*\s+|❌\s*|✅\s*)/, '')
                      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-6 w-full max-h-[400px] object-cover border border-slate-200 dark:border-slate-800" />')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-500 hover:text-purple-600 underline underline-offset-2">$1</a>')
                      .replace(/`(.*?)`/g, '<code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-300 dark:text-purple-400 text-sm">$1</code>'),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }
      // Insert ad after every 3rd section
      const adInsert = i > 0 && i % 4 === 0 ? <InContentAd key={`ad-${i}`} slot="BLOG_IN_CONTENT" /> : null;

      return (
        <div key={i}>
          {adInsert}
          <p
            className="text-slate-700 dark:text-slate-300 leading-relaxed my-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: trimmed
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-6 w-full max-h-[400px] object-cover border border-slate-200 dark:border-slate-800" />')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-500 hover:text-purple-600 underline underline-offset-2">$1</a>')
                .replace(/`(.*?)`/g, '<code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-300 dark:text-purple-400 text-sm">$1</code>'),
            }}
          />
        </div>
      );
    });
  };

  // JSON-LD structured data for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Shiva',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FreeViralKit',
      url: 'https://freeviralkit.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://freeviralkit.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-6 py-12 max-w-3xl relative z-10 min-h-screen">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-purple-400 dark:hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <User className="w-3 h-3" />
              <span>By Shiva</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{post.description}</p>
        </header>

        {/* Content */}
        <article className="prose-custom">{renderContent(post.content)}</article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg">
            S
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2 text-center sm:text-left">
              Shiva
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-center sm:text-left">
              Shiva is a YouTube growth expert and the creator of FreeViralKit. With years of experience decoding the YouTube algorithm, Shiva builds free AI tools to help creators optimize their metadata, rank higher in search results, and turn their passion into a full-time career.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold mb-3">
            Ready to <span className="text-gradient">Boost</span> Your Videos?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Generate SEO-optimized titles, descriptions, hashtags, and tags in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg"
          >
            Try FreeViralKit Free →
          </Link>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="font-display text-xl font-bold mb-6">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getPublishedPosts()
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
                >
                  <span className="text-xs text-purple-400 font-medium">{related.category}</span>
                  <h4 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
