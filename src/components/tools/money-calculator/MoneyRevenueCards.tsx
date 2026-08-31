'use client';

import { DollarSign, TrendingUp, Calendar, Zap, Sparkles } from 'lucide-react';

interface MoneyRevenueCardsProps {
  dailyViews: number;
  effectiveRpm: number;
  includeSponsorships: boolean;
}

export function MoneyRevenueCards({
  dailyViews,
  effectiveRpm,
  includeSponsorships,
}: MoneyRevenueCardsProps) {
  const sponsorshipMultiplier = includeSponsorships ? 1.7 : 1.0;

  const dailyEarnings = ((dailyViews / 1000) * effectiveRpm) * sponsorshipMultiplier;
  const monthlyEarnings = dailyEarnings * 30.4;
  const annualEarnings = dailyEarnings * 365;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val > 1000 ? 0 : 2,
    }).format(val);
  };

  return (
    <div className="space-y-4">
      {/* 3 Large Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Card */}
        <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Daily Projected
            </span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white my-2">
            {formatCurrency(dailyEarnings)}
          </div>
          <div className="text-xs text-slate-400">
            Based on {dailyViews.toLocaleString('en-US')} views/day
          </div>
        </div>

        {/* Monthly Card */}
        <div className="glass-card rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-blue-950/60 via-slate-900/95 to-slate-900/95 p-6 text-white shadow-2xl shadow-cyan-500/10 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20">
              ★ Monthly Earnings
            </span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-black text-white my-2">
            {formatCurrency(monthlyEarnings)}
          </div>
          <div className="text-xs text-slate-300">
            ~{Math.round(dailyViews * 30.4).toLocaleString('en-US')} views / month
          </div>
        </div>

        {/* Annual Card */}
        <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Annual Run-Rate
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white my-2">
            {formatCurrency(annualEarnings)}
          </div>
          <div className="text-xs text-slate-400">
            ~{Math.round(dailyViews * 365).toLocaleString('en-US')} views / year
          </div>
        </div>
      </div>

      {/* Breakdown Notice Pill */}
      <div className="p-4 rounded-2xl border border-blue-500/20 bg-slate-950 text-xs font-medium text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 font-mono font-bold border border-blue-500/30 text-[11px]">
            RPM Rate
          </span>
          <span>Calculated at <strong>${effectiveRpm.toFixed(2)} RPM</strong> (Net Take-Home per 1,000 views)</span>
        </div>
        {includeSponsorships && (
          <span className="text-cyan-400 font-semibold">
            ✓ Includes +70% brand deals &amp; affiliate earnings
          </span>
        )}
      </div>
    </div>
  );
}
