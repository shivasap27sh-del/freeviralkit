'use client';

import { type HookPackage } from './types';
import { X, Copy, Check, Tv } from 'lucide-react';
import { useState } from 'react';

interface HookTeleprompterModalProps {
  pkg: HookPackage | null;
  onClose: () => void;
}

export default function HookTeleprompterModal({ pkg, onClose }: HookTeleprompterModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  if (!pkg) return null;

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(pkg.fullScript);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="max-w-3xl w-full bg-[#0a0d14] border border-purple-500/30 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-purple-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Teleprompter Mode: {pkg.archetype}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-red-600 text-white transition-colors cursor-pointer"
            title="Close Teleprompter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Prompter Script */}
        <div className="py-8 my-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block">
            Read directly into camera (30 Seconds):
          </span>
          <p className="text-2xl md:text-4xl font-extrabold leading-snug tracking-tight text-slate-100 font-display">
            &ldquo;{pkg.fullScript}&rdquo;
          </p>
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            🎬 Visual Cue: <span className="text-slate-200">{pkg.brollCue}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyScript}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied to Clipboard' : 'Copy Script'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
