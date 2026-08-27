'use client';

import { HOOK_ARCHETYPES, type HookArchetypeConfig } from './types';
import { Flame } from 'lucide-react';

interface HookArchetypeSelectorProps {
  activeArchetypeId: string | null;
  onSelectArchetype: (archetype: HookArchetypeConfig) => void;
}

export default function HookArchetypeSelector({
  activeArchetypeId,
  onSelectArchetype,
}: HookArchetypeSelectorProps) {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500">
        <Flame className="w-3.5 h-3.5 text-orange-500" />
        <span>Select Hook Psychology Angle:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {HOOK_ARCHETYPES.map((arch) => {
          const isActive = activeArchetypeId === arch.id;
          return (
            <button
              key={arch.id}
              type="button"
              onClick={() => onSelectArchetype(arch)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-purple-500/15 border-purple-500/50 shadow-md ring-1 ring-purple-500/30 text-slate-950 dark:text-white'
                  : 'glass-card border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold truncate">{arch.label}</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full text-purple-900 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/20">
                  {arch.badge}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                {arch.prompt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
