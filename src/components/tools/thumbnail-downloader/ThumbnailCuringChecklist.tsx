'use client';

import { useState } from 'react';
import { CheckSquare, Square, ShieldCheck } from 'lucide-react';

const auditItems = [
  { id: 'text', title: 'Minimalist Text Hook', desc: 'Under 3-4 words. Never repeats the exact video title word-for-word.' },
  { id: 'face', title: 'High-Emotion Focal Subject', desc: 'Eyes and facial expressions centered or positioned along the Rule of Thirds.' },
  { id: 'safezone', title: 'Safe-Zone Clearance', desc: 'Critical graphics kept clear of the bottom-right timestamp badge (160x50px).' },
  { id: 'contrast', title: 'High-Contrast Silhouette', desc: 'Subject pops against dark and light YouTube UI themes with subtle outer rim lighting.' },
  { id: 'zoom', title: 'Mobile 2-Inch Test', desc: 'Visual clarity and emotional hook readable when scaled down to mobile feed size.' },
];

export function ThumbnailCuringChecklist() {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const score = Object.values(checked).filter(Boolean).length;

  return (
    <section aria-labelledby="audit-heading" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl dark:shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-blue-500/30 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive Audit Engine</span>
          </div>
          <h2 id="audit-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            5-Point YouTube Thumbnail <span className="gradient-text">CTR Audit</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-cyan-300">
            Score: {score}/5 Passed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {auditItems.map((item) => {
          const isDone = checked[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                isDone
                  ? 'border-cyan-500 dark:border-cyan-500 bg-cyan-50 dark:bg-blue-500/10 text-slate-900 dark:text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isDone ? (
                <CheckSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 dark:text-slate-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
