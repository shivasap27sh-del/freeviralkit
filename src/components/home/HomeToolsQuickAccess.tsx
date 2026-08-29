import Link from 'next/link';
import {
  Wand2,
  AlignLeft,
  Search,
  User,
  Zap,
  Tag,
  Hash,
  Laptop,
  ArrowRight,
  Clapperboard,
} from 'lucide-react';

const homeTools = [
  { href: '/youtube-ab-test-generator', title: '3-Way A/B Test Pack ⚡', icon: Wand2, badge: 'High CTR' },
  { href: '/youtube-realtime-title-generator', title: 'Real-Time Movie & Live SEO ⚡', icon: Clapperboard, badge: 'Live AI' },
  { href: '/youtube-title-generator', title: 'YouTube Title Generator', icon: Wand2, badge: 'Viral CTR' },
  { href: '/youtube-description-generator', title: 'Description Generator', icon: AlignLeft, badge: 'SEO Templates' },
  { href: '/youtube-tags-generator', title: 'Tags Generator', icon: Tag, badge: 'Rank Booster' },
  { href: '/youtube-hashtag-generator', title: 'Hashtag Generator', icon: Hash, badge: 'Trending' },
  { href: '/youtube-shorts-idea-generator', title: 'Shorts Idea Generator', icon: Zap, badge: 'Viral Hooks' },
  { href: '/youtube-channel-name-generator', title: 'Channel Name Generator', icon: User, badge: 'Brand Identity' },
  { href: '/youtube-hook-generator', title: 'Hook Generator', icon: Wand2, badge: 'Retention' },
  { href: '/youtube-chapter-generator', title: 'Chapter Generator', icon: Tag, badge: 'Timestamps' },
  { href: '/youtube-thumbnail-generator', title: 'Thumbnail Concepts', icon: User, badge: 'Visual CTR' },
  { href: '/youtube-seo-grader', title: 'SEO Score Grader', icon: AlignLeft, badge: 'Audit Score' },
  { href: '/youtube-script-generator', title: 'Script Generator', icon: AlignLeft, badge: 'Full Outlines' },
  { href: '/youtube-topic-researcher', title: 'Topic Researcher', icon: Search, badge: 'Volume & Trends' },
  { href: '/creator-gear', title: 'Creator Gear & Setup', icon: Laptop, badge: 'Best Setups' },
];

export function HomeToolsQuickAccess() {
  return (
    <section className="mt-20">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Explore All <span className="text-gradient">YouTube SEO Tools</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Every tool you need to optimize, package, and grow your channel for free.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {homeTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="glass-card rounded-xl p-4 flex flex-col items-start justify-between group hover:border-purple-500/40 hover:shadow-lg transition-all"
            >
              <div className="w-full flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                  {tool.badge}
                </span>
              </div>
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-1">
                {tool.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
