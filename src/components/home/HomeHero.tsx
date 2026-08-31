import { Sparkles, Zap, Shield, CheckCircle2 } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative text-center pt-6 pb-10 space-y-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/15 via-indigo-500/15 to-pink-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 backdrop-blur-md shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
        <span>Free Multi-AI YouTube SEO &amp; Retention Studio</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-3 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.1]">
          Rank Higher on YouTube with{' '}
          <span className="gradient-text">Viral AI SEO</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Generate high-CTR titles, structured descriptions, 500-character tags, and script retention hooks in sub-second speed. No login required.
        </p>
      </div>

      {/* Trust & Speed Value Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Sub-second Edge AI</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>100% Free Forever</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-purple-500" />
          <span>YouTube Algorithm Optimized</span>
        </div>
      </div>
    </section>
  );
}
