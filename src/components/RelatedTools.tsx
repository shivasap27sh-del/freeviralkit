'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RelatedToolsProps {
  currentToolPath?: string;
  topic?: string;
}

export default function RelatedTools({ currentToolPath, topic }: RelatedToolsProps) {
  const tools = [
    { href: '/', label: 'Full SEO Optimizer' },
    { href: '/youtube-thumbnail-downloader', label: 'Thumbnail Downloader' },
    { href: '/youtube-money-calculator', label: 'Money Calculator' },
    { href: '/youtube-ab-test-generator', label: 'A/B Test Pack' },
    { href: '/youtube-realtime-title-generator', label: 'Realtime Trends' },
    { href: '/youtube-title-generator', label: 'Title Generator' },
    { href: '/youtube-description-generator', label: 'Description Generator' },
    { href: '/youtube-tags-generator', label: 'Tags Generator' },
    { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
    { href: '/youtube-script-generator', label: 'Script Generator' },
    { href: '/youtube-thumbnail-generator', label: 'Thumbnail Ideas' },
    { href: '/youtube-hook-generator', label: 'Hook Generator' },
    { href: '/tools/youtube-title-generator-for-finance', label: 'Finance Titles' },
    { href: '/tools/youtube-title-generator-for-ai-and-tech', label: 'AI & Tech' },
    { href: '/tools/youtube-title-generator-for-anime', label: 'Anime Titles' },
    { href: '/tools/youtube-title-generator-for-asmr', label: 'ASMR Titles' },
    { href: '/tools/youtube-title-generator-for-faceless-channels', label: 'Faceless Channels' },
  ];

  // Filter out the current tool so we don't link to the current page
  const filteredTools = tools.filter(t => t.href !== currentToolPath).slice(0, 5);

  const getToolHref = (href: string) => {
    if (!topic || !topic.trim()) return href;
    const separator = href.includes('?') ? '&' : '?';
    return `${href}${separator}topic=${encodeURIComponent(topic.trim())}`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 text-center mt-12 mb-8">
      <h2 className="font-display text-2xl font-bold mb-3 text-slate-900 dark:text-white">
        Explore More Free YouTube Tools
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
        Keep building your video package with our 100% free creator tools.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {filteredTools.map(tool => (
          <Link
            key={tool.href}
            href={getToolHref(tool.href)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200/90 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:border-red-500/40 dark:hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400 bg-white/90 dark:bg-zinc-900/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-spring"
          >
            {tool.label}
          </Link>
        ))}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold group hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-spring"
        >
          <span>View All 17 Tools</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
