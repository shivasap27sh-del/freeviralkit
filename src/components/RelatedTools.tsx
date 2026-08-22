'use client';

import Link from 'next/link';

export default function RelatedTools({ currentToolPath }: { currentToolPath?: string }) {
  const tools = [
    { href: '/', label: 'Full SEO Optimizer' },
    { href: '/youtube-ab-test-generator', label: '3-Way A/B Test Pack ⚡' },
    { href: '/youtube-realtime-title-generator', label: 'Movie & Live AI Tool ⚡' },
    { href: '/youtube-title-generator', label: 'Title Generator' },
    { href: '/youtube-description-generator', label: 'Description Generator' },
    { href: '/youtube-tags-generator', label: 'Tags Generator' },
    { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
    { href: '/youtube-script-generator', label: 'Script Generator' },
    { href: '/youtube-thumbnail-generator', label: 'Thumbnail Ideas' },
    { href: '/youtube-hook-generator', label: 'Hook Generator' },
    { href: '/tools/youtube-title-generator-for-finance', label: 'Finance Titles 💰' },
    { href: '/tools/youtube-title-generator-for-ai-and-tech', label: 'AI Tools & Tech ⚡' },
    { href: '/tools/youtube-title-generator-for-anime', label: 'Anime Titles ⚔️' },
    { href: '/tools/youtube-title-generator-for-asmr', label: 'ASMR Titles 🎧' },
    { href: '/tools/youtube-title-generator-for-faceless-channels', label: 'Faceless Channels 💼' },
  ];

  // Filter out the current tool so we don't link to the current page
  const filteredTools = tools.filter(t => t.href !== currentToolPath).slice(0, 5);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 text-center mt-12 mb-8">
      <h2 className="font-display text-2xl font-bold mb-3 text-slate-900 dark:text-white">
        Explore More Free YouTube Tools
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
        Level up every aspect of your YouTube channel with our suite of free, AI-powered tools designed specifically for creators.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {filteredTools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400/40 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors bg-white dark:bg-slate-800"
          >
            {tool.label}
          </Link>
        ))}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-2.5 font-semibold"
        >
          View All Tools →
        </Link>
      </div>
    </div>
  );
}
