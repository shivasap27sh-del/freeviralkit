import Link from 'next/link';
import {
  Wand2,
  Clapperboard,
  Tag,
  AlignLeft,
  Hash,
  Search,
  Zap,
  User,
  Laptop,
  ArrowRight,
  Sparkles,
  Flame,
  Layers,
} from 'lucide-react';

export function HomeToolsQuickAccess() {
  return (
    <section className="mt-20 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Creator Growth Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Explore All <span className="gradient-text">YouTube SEO Tools</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Engineered specifically for YouTube algorithm discovery, retention curves, and high CTR.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors group self-start md:self-auto"
        >
          <span>View All 82+ Creator Tools</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Flagship Bento Highlights (2 Feature Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Flagship 1: A/B Test Pack */}
        <Link
          href="/youtube-ab-test-generator"
          className="glass-card rounded-3xl p-6 sm:p-7 border border-pink-500/30 hover:border-pink-500/60 bg-gradient-to-br from-pink-500/5 via-slate-900/40 to-slate-900/80 group transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-pink-500/10"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-pink-500/15 text-pink-400 border border-pink-500/30">
                <Wand2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1">
                <Flame className="w-3 h-3 text-pink-400" /> High-CTR Packaging
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors">
              3-Way A/B Test Pack Generator ⚡
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              Generate 3 strategic Title + Thumbnail text variants designed for YouTube Studio&apos;s native Test &amp; Compare tool.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-pink-500 dark:text-pink-400">
            <span>Variant A / B / C Packaging</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch Studio <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Flagship 2: Real-Time Movie AI */}
        <Link
          href="/youtube-realtime-title-generator"
          className="glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/30 hover:border-purple-500/60 bg-gradient-to-br from-purple-500/5 via-slate-900/40 to-slate-900/80 group transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-purple-500/10"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Live Web Grounded
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
              Real-Time Movie &amp; Live Trend AI ⚡
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              Extract live release dates, movie cast info, and plot spoilers to generate factually accurate metadata with zero AI hallucinations.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-500 dark:text-purple-400">
            <span>Verified Movie Facts &amp; Cast</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch Studio <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* Categorized Bento Pillars (3 Workflow Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: Search & Metadata */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Tag className="w-4 h-4" /> Metadata &amp; Search SEO
          </div>
          <div className="space-y-2">
            {[
              { href: '/youtube-thumbnail-downloader', title: 'Thumbnail & Tag Downloader ⚡', desc: '4K image & hidden tag extractor', icon: Tag },
              { href: '/youtube-title-generator', title: 'YouTube Title Generator', desc: '10 high-CTR search titles', icon: Wand2 },
              { href: '/youtube-tags-generator', title: 'YouTube Tags Generator', desc: 'Under 500 characters limit', icon: Tag },
              { href: '/youtube-description-generator', title: 'Description Generator', desc: 'Dynamic templates & CTAs', icon: AlignLeft },
              { href: '/youtube-hashtag-generator', title: 'Hashtag Generator', desc: 'Trending search tags', icon: Hash },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-purple-500/50 transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pillar 2: Retention & Script Doctoring */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" /> Retention &amp; Scripts
          </div>
          <div className="space-y-2">
            {[
              { href: '/youtube-hook-generator', title: '30s Retention Hook Cockpit', desc: '4-beat multi-track script cues', icon: Wand2 },
              { href: '/youtube-chapter-generator', title: 'Chapter Timestamp Generator', desc: 'SEO-rich video chapters', icon: Tag },
              { href: '/youtube-shorts-idea-generator', title: 'Shorts Idea Generator', desc: 'Viral concept outlines', icon: Zap },
              { href: '/youtube-script-generator', title: 'YouTube Script Generator', desc: 'Structured B-roll & spoken copy', icon: AlignLeft },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-pink-500/50 transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-pink-500/10 text-pink-500 dark:text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pillar 3: Packaging & Creator Gear */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            <User className="w-4 h-4" /> Branding &amp; Studio Gear
          </div>
          <div className="space-y-2">
            {[
              { href: '/youtube-money-calculator', title: 'YouTube Money & RPM Calculator ⚡', desc: 'Real 2026 niche income simulator', icon: User },
              { href: '/youtube-thumbnail-generator', title: 'Thumbnail Concept Generator', desc: 'Visual psychological hooks', icon: Wand2 },
              { href: '/youtube-channel-name-generator', title: 'Channel Name Generator', desc: 'Brandable niche channel names', icon: User },
              { href: '/youtube-seo-grader', title: 'YouTube SEO Score Grader', desc: 'Audit score out of 100', icon: AlignLeft },
              { href: '/creator-gear', title: 'Creator Equipment & Setup', desc: 'Tested cameras, mics & lights', icon: Laptop },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-cyan-500/50 transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
