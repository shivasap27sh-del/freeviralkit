import { BookOpen, Eye, Target, Sparkles } from 'lucide-react';

export function ThumbnailMasterclassSection() {
  return (
    <section aria-labelledby="guide-heading" className="glass-card rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl dark:shadow-2xl space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 text-cyan-700 dark:text-cyan-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Creator &amp; Gamer Masterclass</span>
        </div>
        <h2
          id="guide-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          How to Reverse-Engineer <span className="gradient-text">Viral Thumbnails &amp; Tags</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          The top 1% of gaming and video creators don&apos;t guess what works — they analyze high-CTR competitors. Here is the exact framework to maximize your click-through rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-blue-500/20">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">1. The 3-Element Visual Rule</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Never crowd your thumbnail with more than 3 visual subjects (e.g., 1 human face + 1 focal object + 1 bold 3-word hook). Viewers on mobile make a click decision in <strong>under 1.2 seconds</strong>.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">2. Strategic Tag Architecture</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Structure your 500 characters into 3 tiers: <strong>Tier 1</strong> (Exact video topic keywords), <strong>Tier 2</strong> (Broad category terms), and <strong>Tier 3</strong> (Common search misspellings &amp; slang).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-cyan-500/10 text-purple-700 dark:text-cyan-400 flex items-center justify-center border border-purple-200 dark:border-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">3. YouTube Vision AI Inspection</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            YouTube runs automated optical character recognition (OCR) on your thumbnail. Ensure any on-screen text reinforces your video title rather than duplicating it word-for-word.
          </p>
        </div>
      </div>
    </section>
  );
}
