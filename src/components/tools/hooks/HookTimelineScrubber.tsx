'use client';

import { useState } from 'react';
import { type HookTimelineBeat } from './types';
import { Clock, Eye, Volume2, Sparkles } from 'lucide-react';

interface HookTimelineScrubberProps {
  timeline: HookTimelineBeat[];
}

export default function HookTimelineScrubber({ timeline }: HookTimelineScrubberProps) {
  const [selectedBeatIdx, setSelectedBeatIdx] = useState(0);
  const activeBeat = timeline[selectedBeatIdx] || timeline[0];

  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* 1. Interactive 30-Second Scrubber Bar */}
      <div className="p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-inner grid grid-cols-2 sm:grid-cols-4 gap-1">
        {timeline.map((beat, idx) => {
          const isSelected = selectedBeatIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedBeatIdx(idx)}
              className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-md border border-purple-500/40 ring-1 ring-purple-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/40 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="text-[10px] font-mono font-black uppercase text-purple-600 dark:text-purple-400">
                {beat.timestamp}
              </span>
              <span className="text-xs font-bold truncate mt-0.5">
                {beat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Active Beat Visual Cue & SFX Breakdown */}
      {activeBeat && (
        <div className="glass-card rounded-2xl p-4 md:p-5 border border-purple-500/20 bg-purple-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {activeBeat.timestamp} • {activeBeat.label}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/20">
              Active Focus Beat
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1 font-bold">
              🎙️ What to Say (Spoken Script):
            </span>
            <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              &ldquo;{activeBeat.spokenText}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <Eye className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-slate-500 block text-[9px] uppercase">
                  🎬 B-Roll &amp; Visual Direction:
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {activeBeat.visualCue}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <Volume2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-slate-500 block text-[9px] uppercase">
                  🔊 Sound FX &amp; Audio Cue:
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {activeBeat.sfxCue}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
