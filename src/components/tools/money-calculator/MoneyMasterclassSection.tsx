import { BookOpen, TrendingUp, DollarSign, Zap } from 'lucide-react';

export function MoneyMasterclassSection() {
  return (
    <section aria-labelledby="money-guide-heading" className="glass-card rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl dark:shadow-2xl space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 text-cyan-700 dark:text-cyan-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Monetization Masterclass</span>
        </div>
        <h2
          id="money-guide-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          How to Maximize Your <span className="gradient-text">YouTube RPM &amp; Ad Revenue</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Views alone don&apos;t determine YouTube income. Two channels with 100,000 views can earn $150 vs $2,500 depending on RPM strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-blue-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">1. The 8-Minute Mid-Roll Rule</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Videos over 8 minutes unlock manual mid-roll ad placements. Placing 2 to 3 natural mid-rolls at retention peaks can <strong>increase your total video RPM by 80% to 150%</strong> without alienating viewers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">2. Commercial Keyword Targeting</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Advertisers bid exponentially higher on buyer-intent keywords. Topics featuring &quot;Best&quot;, &quot;Review&quot;, &quot;Tutorial&quot;, or &quot;Comparison&quot; attract finance and B2B software ads yielding $20+ CPMs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-cyan-500/10 text-purple-700 dark:text-cyan-400 flex items-center justify-center border border-purple-200 dark:border-cyan-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">3. Diversified Creator Income</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Top creators treat AdSense as baseline cash flow (30-40% of income). Dedicated brand integrations, affiliate links, digital presets, and memberships typically deliver the remaining 60-70%.
          </p>
        </div>
      </div>
    </section>
  );
}
