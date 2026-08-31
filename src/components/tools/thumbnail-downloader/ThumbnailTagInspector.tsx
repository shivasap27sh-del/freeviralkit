'use client';

import { useState } from 'react';
import { Tag, Copy, Check, Hash } from 'lucide-react';

interface ThumbnailTagInspectorProps {
  tags: string[];
  channelName?: string;
}

export function ThumbnailTagInspector({ tags, channelName }: ThumbnailTagInspectorProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const totalChars = tags.join(', ').length;

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(tags.join(', '));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopySingle = async (tag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // ignore
    }
  };

  if (!tags || tags.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-400 text-sm">
        No hidden keywords or tags found on this video.
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header & Copy All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/30 uppercase">
              Tag Inspector
            </span>
            <span className={`text-xs font-mono font-semibold ${totalChars <= 500 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ({totalChars}/500 chars)
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1.5">
            Extracted YouTube Studio Tags ({tags.length})
          </h3>
          {channelName && (
            <p className="text-xs text-slate-400 mt-0.5">Target channel: <span className="text-white font-medium">{channelName}</span></p>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          className="py-3 px-5 rounded-2xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/40 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          {copiedAll ? <Check className="w-4 h-4 text-cyan-200" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'All Tags Copied!' : 'Copy All Tags for YouTube Studio'}</span>
        </button>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => {
          const isCopied = copiedIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCopySingle(tag, idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                isCopied
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950/80 hover:bg-blue-500/10 border-slate-800 text-slate-300 hover:border-blue-500/40 hover:text-white'
              }`}
            >
              <Hash className="w-3 h-3 text-cyan-400/60" />
              <span>{tag}</span>
              {isCopied && <Check className="w-3 h-3 text-emerald-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
