'use client';

import { type HookPackage } from './types';
import { Copy, Check, Tv, Sparkles, Volume2, Video } from 'lucide-react';
import { useState } from 'react';

interface HookVariantCardsProps {
  packages: HookPackage[];
  selectedHookId: string;
  onSelectHook: (pkg: HookPackage) => void;
  onOpenTeleprompter: (pkg: HookPackage) => void;
}

export default function HookVariantCards({
  packages,
  selectedHookId,
  onSelectHook,
  onOpenTeleprompter,
}: HookVariantCardsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = async (text: string, key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Select Hook Angle &amp; Pacing Deck
        </h3>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Click any card to inspect its 30s timeline
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {packages.map((pkg, idx) => {
          const isSelected = selectedHookId === pkg.id;
          return (
            <div
              key={pkg.id || idx}
              onClick={() => onSelectHook(pkg)}
              className={`p-5 md:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/10 shadow-2xl shadow-purple-950/20 ring-1 ring-purple-500/40'
                  : 'glass-card border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 font-mono text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-display text-base font-extrabold text-slate-900 dark:text-white">
                    {pkg.archetype}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full text-emerald-950 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30">
                    {pkg.badge || '95% Retention'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTeleprompter(pkg);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 shadow-md cursor-pointer transition-transform active:scale-95"
                  >
                    <Tv className="w-3.5 h-3.5" /> Teleprompter
                  </button>
                </div>
              </div>

              {/* Spoken Script */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  &ldquo;{pkg.fullScript}&rdquo;
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-slate-500 text-[11px] font-mono">
                  <span className="truncate max-w-xs md:max-w-md">
                    🎥 {pkg.brollCue}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => copyText(pkg.fullScript, `pkg-${idx}`, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 cursor-pointer transition-all"
                >
                  {copiedKey === `pkg-${idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Script
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy 30s Hook
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
