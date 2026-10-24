import Link from 'next/link';
import {
  Wand2,
  Tag,
  AlignLeft,
  Hash,
  Clapperboard,
  Layers,
  ArrowRight,
} from 'lucide-react';

const COMPANION_TOOLS = [
  {
    href: '/youtube-title-generator',
    title: 'YouTube Title Generator',
    desc: '10 high-CTR, search-optimized title variations with hook formulas.',
    icon: Wand2,
    badge: 'High CTR',
    badgeColor: 'text-red-500 bg-red-500/10 border-red-500/20',
  },
  {
    href: '/youtube-tags-generator',
    title: 'YouTube Tags Generator',
    desc: 'Studio-ready tag packages engineered strictly under the 500-character limit.',
    icon: Tag,
    badge: 'Under 500 Chars',
    badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    href: '/youtube-description-generator',
    title: 'Description Generator',
    desc: 'Structured descriptions with keyword-rich hooks and engagement CTAs.',
    icon: AlignLeft,
    badge: 'SEO Templates',
    badgeColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    href: '/youtube-hashtag-generator',
    title: 'Hashtag Generator',
    desc: 'Trending search hashtags to maximize browse and recommendation traffic.',
    icon: Hash,
    badge: 'Trending Tags',
    badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    href: '/youtube-chapter-generator',
    title: 'Chapter Timestamp Generator',
    desc: 'Video chapter timestamps formatted for Google Key Moments rich search results.',
    icon: Clapperboard,
    badge: 'Google Key Moments',
    badgeColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    href: '/youtube-ab-test-generator',
    title: '3-Way A/B Test Pack',
    desc: '3 strategic Title and Thumbnail pairings designed for YouTube Studio Test and Compare.',
    icon: Layers,
    badge: 'Studio Test and Compare',
    badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
];

export function HomeToolsQuickAccess() {
  return (
    <section className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Creator <span className="text-red-500">Companion Tools</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Dedicated companion utilities to fine-tune individual parts of your YouTube video packaging.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-400 transition-colors group self-start md:self-auto"
        >
          <span>Browse Specialized Tools Hub</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Focused 6-Card Companion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMPANION_TOOLS.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 hover:border-zinc-700 bg-white/60 dark:bg-zinc-900/40 group transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <ToolIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-zinc-400">
                <span>Launch Tool</span>
                <span className="flex items-center gap-1 text-red-500 group-hover:translate-x-1 transition-transform">
                  Open Studio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
