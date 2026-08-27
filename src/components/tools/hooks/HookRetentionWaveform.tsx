'use client';

import { Activity, ShieldCheck } from 'lucide-react';

interface HookRetentionWaveformProps {
  score: number;
}

export default function HookRetentionWaveform({ score }: HookRetentionWaveformProps) {
  const normalizedScore = Math.min(Math.max(score || 92, 70), 99);

  return (
    <div className="glass-card rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Predicted Retention Curve (0:00 – 0:30)
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-mono font-black px-2.5 py-0.5 rounded-full text-emerald-950 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" /> {normalizedScore}% Retention
        </span>
      </div>

      {/* SVG Retention Curve Visualization */}
      <div className="relative w-full h-20 bg-slate-100 dark:bg-slate-900/90 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-2 flex items-end">
        <svg
          viewBox="0 0 400 80"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="retentionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="retentionFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path
            d="M 0,10 Q 100,12 200,18 T 400,24 L 400,80 L 0,80 Z"
            fill="url(#retentionFill)"
          />

          {/* Smooth High-Retention Bezier Line */}
          <path
            d="M 0,10 Q 100,12 200,18 T 400,24"
            fill="none"
            stroke="url(#retentionGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Key Time Markers */}
          <circle cx="10" cy="10" r="4" fill="#10b981" className="animate-pulse" />
          <circle cx="200" cy="18" r="3.5" fill="#06b6d4" />
          <circle cx="390" cy="24" r="3.5" fill="#8b5cf6" />
        </svg>

        {/* Time Labels */}
        <div className="absolute bottom-1 left-3 right-3 flex justify-between text-[9px] font-mono text-slate-500 font-bold">
          <span>0:00 (Shock)</span>
          <span>0:15 (Proof)</span>
          <span>0:30 (Content Bridge)</span>
        </div>
      </div>
    </div>
  );
}
