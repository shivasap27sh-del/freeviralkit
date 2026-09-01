import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedPostBySlug, getPostBySlug, getAllSlugs, getRelatedPosts } from '../data';
import { buildAbsoluteUrl } from '@/lib/site';
import { Calendar, Clock, ArrowLeft, Tag, User, Sparkles } from 'lucide-react';

export const revalidate = 3600; // Cache on Vercel Edge CDN for 1 hour with SWR background revalidation

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | FreeViralKit`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: buildAbsoluteUrl(`/blog/${post.slug}`),
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
      canonical: buildAbsoluteUrl(`/blog/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(post.slug, 4);

  // Balanced tag extractor for top-level HTML divs
  const extractTopLevelDivs = (str: string): { text: string; blocks: string[] } => {
    const blocks: string[] = [];
    let result = '';
    let i = 0;
    while (i < str.length) {
      if (str.substring(i, 4).toLowerCase() === '<div') {
        let depth = 0;
        const start = i;
        while (i < str.length) {
          if (str.substring(i, 4).toLowerCase() === '<div') {
            depth++;
            i += 4;
          } else if (str.substring(i, 6).toLowerCase() === '</div>') {
            depth--;
            i += 6;
            if (depth === 0) {
              const blockHtml = str.substring(start, i);
              const placeholder = `\n\n__HTML_BLOCK_${blocks.length}__\n\n`;
              blocks.push(blockHtml);
              result += placeholder;
              break;
            }
          } else {
            i++;
          }
        }
      } else {
        result += str[i];
        i++;
      }
    }
    return { text: result, blocks };
  };

  // Pixel-perfect markdown-to-HTML parser with full table, alert callout, and divider support
  const renderContent = (content: string) => {
    // 1. Extract and protect top-level HTML blocks
    const { text: safeContent, blocks: htmlBlocks } = extractTopLevelDivs(content.replace(/\r\n/g, '\n'));

    // 2. Normalize markdown headers & dividers
    const normalizedContent = safeContent
      .replace(/^(#{2,3} .*)$/gm, '\n\n$1\n\n')
      .replace(/^(---|\*\*\*)$/gm, '\n\n---\n\n')
      .trim();

    const sections = normalizedContent.split(/\n{2,}/);
    return sections.map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // 0. Render Protected Full HTML Div Blocks
      if (trimmed.includes('__HTML_BLOCK_')) {
        const match = trimmed.match(/__HTML_BLOCK_(\d+)__/);
        if (match) {
          const rawHtml = htmlBlocks[parseInt(match[1], 10)];
          return (
            <div
              key={i}
              className="my-8 w-full"
              dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
          );
        }
      }

      // 1. Horizontal Rules (---)
      if (trimmed === '---' || trimmed === '***') {
        return <hr key={i} className="my-10 border-slate-200 dark:border-slate-800" />;
      }

      // 2. Heading 2 (with subtle divider accent)
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="font-display text-2xl sm:text-3xl font-extrabold mt-12 mb-4 text-slate-900 dark:text-white tracking-tight leading-snug">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // 3. Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="font-display text-xl sm:text-2xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // 4. Code / Preformatted ASCII diagrams
      if (trimmed.startsWith('```')) {
        const code = trimmed.replace(/```\w*/g, '').trim();
        return (
          <pre key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 my-6 overflow-x-auto shadow-xl">
            <code className="text-xs sm:text-sm text-cyan-300 font-mono leading-relaxed whitespace-pre block">{code}</code>
          </pre>
        );
      }

      // 6. Markdown Tables (| Col 1 | Col 2 |)
      if (trimmed.includes('|') && trimmed.split('\n').every(line => line.trim().startsWith('|') && line.trim().endsWith('|'))) {
        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length >= 2) {
          const headerLine = lines[0];
          const rows = lines.slice(2);
          const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean);

          return (
            <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-cyan-400 font-mono uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-5 py-4 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                  {rows.map((rowStr, rIdx) => {
                    const cells = rowStr.split('|').map(c => c.trim()).filter(Boolean);
                    return (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-blue-500/5 transition-colors">
                        {cells.map((cell, cIdx) => (
                          <td key={cIdx} className="px-5 py-3.5" dangerouslySetInnerHTML={{
                            __html: cell
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
                              .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-cyan-600 dark:text-cyan-300 font-mono text-xs">$1</code>')
                              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">$1</a>')
                          }} />
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // 7. Callout Blockquotes (> [!TIP], > [!WARNING], > text)
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*(\[!.*\])?/gm, '').trim();
        const isWarning = trimmed.includes('[!WARNING]');
        return (
          <div key={i} className={`p-5 sm:p-6 my-6 rounded-2xl border text-sm sm:text-base leading-relaxed ${
            isWarning 
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-200' 
              : 'bg-cyan-50 dark:bg-blue-500/10 border-cyan-200 dark:border-blue-500/30 text-slate-800 dark:text-slate-200'
          }`}>
            <p dangerouslySetInnerHTML={{
              __html: quoteText
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-black/10 dark:bg-black/30 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">$1</a>')
            }} />
          </div>
        );
      }

      // 8. Lists (Unordered)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('❌') || trimmed.startsWith('✅')) {
        const items = trimmed.split('\n').map(item => item.trim()).filter(Boolean);
        return (
          <ul key={i} className="space-y-3 my-6">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: item
                      .replace(/^(?:-\s*|\*\s+|❌\s*|✅\s*)/, '')
                      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" width="1200" height="630" loading="lazy" decoding="async" class="rounded-2xl my-6 w-full max-h-[440px] object-cover border border-slate-200 dark:border-slate-800 block shadow-lg" />')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">$1</a>')
                      .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-cyan-600 dark:text-cyan-400 text-xs font-mono">$1</code>'),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }

      // 9. Standard Paragraph
      return (
        <div key={i}>
          <p
            className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed my-5"
            dangerouslySetInnerHTML={{
              __html: trimmed
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" width="1200" height="630" loading="lazy" decoding="async" class="rounded-2xl my-6 w-full max-h-[440px] object-cover border border-slate-200 dark:border-slate-800 block shadow-lg" />')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">$1</a>')
                .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-cyan-600 dark:text-cyan-400 text-xs font-mono">$1</code>'),
            }}
          />
        </div>
      );
    });
  };

  // JSON-LD structured data for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Shiva Srivastava',
      url: buildAbsoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'FreeViralKit',
      url: buildAbsoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildAbsoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return (
    <>
      <script
        id="schema-blog-post"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog Directory
        </Link>

        {/* Hero Header */}
        <header className="mb-12 space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-blue-500/30 uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>By Shiva Srivastava</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Blog Article Body */}
        <article className="prose-custom w-full">
          {renderContent(post.content)}
        </article>

        {/* Tags Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Topic Keywords &amp; Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio & E-E-A-T Credentials */}
        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg shadow-blue-500/20">
            SS
          </div>
          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Shiva Srivastava
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                ✓ Verified YouTube Engineer
              </span>
            </div>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">
              B.Tech Computer Science | Founder of FreeViralKit
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Shiva is a software engineer and YouTube growth researcher who built FreeViralKit to provide 100% free, enterprise-grade creator tools. All guides are independently researched, tested on active channels, and updated for the latest 2026 YouTube algorithm models.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold justify-center sm:justify-start text-slate-500 dark:text-slate-400 pt-1">
              <Link href="/about" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                About the Author →
              </Link>
              <a href="https://linkedin.com/in/shiva-srivastava" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                LinkedIn ↗
              </a>
              <a href="https://github.com/shivasap27sh-del" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* Contextual Viral Tools CTA Banner */}
        <div className="mt-12 rounded-3xl p-8 md:p-10 border border-cyan-300 dark:border-cyan-500/30 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-white dark:from-blue-950/40 dark:via-slate-900/90 dark:to-slate-900/90 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Multi-AI Creator Growth Studio</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ready to <span className="gradient-text">Dominate YouTube SEO</span> in 2026?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Generate 4K master thumbnails, calculate niche RPMs, brainstorm viral hooks, and optimize video tags in seconds.
          </p>
          <div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.98] text-white border border-blue-400/30 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
            >
              Explore All 30+ Free Tools →
            </Link>
          </div>
        </div>

        {/* Related Articles Matrix */}
        <div className="mt-12 space-y-4">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">More YouTube Growth Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:border-cyan-500/40 p-5 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">{related.category}</span>
                  <h4 className="font-display text-sm sm:text-base font-bold mt-1.5 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug">
                    {related.title}
                  </h4>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  {related.readTime} • Read Guide →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
