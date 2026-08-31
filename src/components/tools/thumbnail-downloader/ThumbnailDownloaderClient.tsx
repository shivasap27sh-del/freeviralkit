'use client';

import { useState } from 'react';
import { Search, Loader2, Sparkles, AlertCircle, Zap, Image as ImageIcon } from 'lucide-react';
import { extractYouTubeTagsAction, type ExtractTagsResult } from '@/app/actions/extractTags';
import { ThumbnailPreviewCanvas } from './ThumbnailPreviewCanvas';
import { ThumbnailTagInspector } from './ThumbnailTagInspector';

export function ThumbnailDownloaderClient() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExtractTagsResult | null>(null);

  const handleExtract = async (overrideUrl?: string) => {
    const target = (overrideUrl || urlInput).trim();
    if (!target) return;
    setError(null);
    setLoading(true);

    try {
      const result = await extractYouTubeTagsAction(target);
      if (result.success && result.videoId) {
        setData(result);
      } else {
        setError(result.error || 'Failed to extract video thumbnail.');
      }
    } catch {
      setError('An unexpected error occurred. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Dual-Theme Input Cockpit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExtract();
        }}
        className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Enter YouTube Video or Shorts URL
          </label>
          <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-cyan-50 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-blue-500/30">
            ⚡ 0.05s Direct CDN Extraction
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/..."
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-sm sm:text-base outline-none focus:border-cyan-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="py-4 px-8 rounded-2xl font-bold text-sm md:text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.98] text-white border border-blue-400/30 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Extracting 4K...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" /> Get 4K Thumbnail &amp; Tags
              </>
            )}
          </button>
        </div>

        {/* Quick Demo Pill */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Try popular example:</span>
          <button
            type="button"
            onClick={() => {
              const ex = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
              setUrlInput(ex);
              handleExtract(ex);
            }}
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
          >
            Rick Astley (Classic 4K)
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 dark:text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Area */}
      {data && data.videoId && (
        <div className="space-y-8">
          <ThumbnailPreviewCanvas videoId={data.videoId} videoTitle={data.title} />
          <ThumbnailTagInspector tags={data.tags || []} channelName={data.channel} />
        </div>
      )}
    </div>
  );
}
