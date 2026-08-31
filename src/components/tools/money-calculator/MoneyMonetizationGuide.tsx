import { CheckCircle2, Percent, TrendingUp, Sparkles } from 'lucide-react';

export function MoneyMonetizationGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Checklist */}
      <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/30 uppercase w-fit">
          <CheckCircle2 className="w-3.5 h-3.5" /> 2026 YPP Thresholds
        </div>
        <h3 className="text-xl font-bold text-white">
          How to Qualify for Monetization
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">✓</span>
            <span><strong>Path A (Long-Form):</strong> 1,000 Subscribers + 4,000 Valid Watch Hours in the last 365 days</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">✓</span>
            <span><strong>Path B (Shorts):</strong> 1,000 Subscribers + 10 Million Public Shorts Views in the last 90 days</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">✓</span>
            <span>Enabled 2-Step Verification &amp; zero active Community Guideline strikes</span>
          </li>
        </ul>
      </div>

      {/* CPM vs RPM Formula */}
      <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase w-fit">
          <Percent className="w-3.5 h-3.5" /> Revenue Formula
        </div>
        <h3 className="text-xl font-bold text-white">
          CPM vs. RPM Explained
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong>CPM (Cost Per Mille):</strong> The gross price advertisers pay per 1,000 impressions before YouTube takes its 45% platform fee.
          </p>
          <p>
            <strong>RPM (Revenue Per Mille):</strong> The actual net money deposited into your account per 1,000 views (RPM = 55% of Ad Revenue + Memberships + Super Chats).
          </p>
        </div>
      </div>
    </div>
  );
}
