import { Zap, Shield, CheckCircle2, TrendingUp } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative text-center pt-1 pb-2 space-y-4 overflow-hidden">
      {/* Clean Eyebrow Badge */}
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 text-slate-600 dark:text-zinc-400">
        Free YouTube SEO Generator for Creators
      </div>

      {/* Main Headline */}
      <div className="space-y-3 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
          Write YouTube Titles That{' '}
          <span className="bg-gradient-to-r from-[#ff3333] via-[#ff4d4d] to-[#e60000] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,42,42,0.4)]">
            Actually Get Views
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          FreeViralKit is a free YouTube SEO generator for creators. Generate 10 high-CTR titles, optimized descriptions, 500-character tag packages, hashtags, and pinned comments in seconds.
        </p>
      </div>

      {/* Trust & Speed Value Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600 dark:text-slate-300 pt-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>10 Titles in 3 Seconds</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Free, No Account Needed</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube Studio Ready (500 Chars)</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          <span>Updated for 2026</span>
        </div>
      </div>
    </section>
  );
}
