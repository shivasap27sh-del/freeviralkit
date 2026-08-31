'use client';

import { useState } from 'react';
import { Download, ExternalLink, Check, Eye, Sparkles, Loader2 } from 'lucide-react';
import { thumbnailResolutions, type ThumbnailResolution } from '@/data/thumbnailDownloaderData';

interface ThumbnailPreviewCanvasProps {
  videoId: string;
  videoTitle?: string;
}

type DownloadStatus = 'idle' | 'downloading' | 'success';

export function ThumbnailPreviewCanvas({ videoId, videoTitle }: ThumbnailPreviewCanvasProps) {
  const [activeRes, setActiveRes] = useState<ThumbnailResolution>(thumbnailResolutions[0]);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('idle');

  const imgUrl = `https://img.youtube.com/vi/${videoId}/${activeRes.fileNameSuffix}.jpg`;

  const handleDownload = async (res: ThumbnailResolution) => {
    if (downloadStatus === 'downloading') return;
    setDownloadStatus('downloading');

    try {
      const targetUrl = `/api/download-thumbnail?videoId=${videoId}&quality=${res.fileNameSuffix}&resId=${res.id}`;
      const response = await fetch(targetUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${videoId}-${res.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadStatus('success');
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 1800);
    } catch {
      // Fallback: direct window download trigger
      const directUrl = `/api/download-thumbnail?videoId=${videoId}&quality=${res.fileNameSuffix}&resId=${res.id}`;
      const link = document.createElement('a');
      link.href = directUrl;
      link.setAttribute('download', `youtube-thumbnail-${videoId}-${res.id}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus('success');
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 1800);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header & Quality Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-blue-500/30 uppercase">
            <Eye className="w-3.5 h-3.5" /> 16:9 Cinema Viewport
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-1.5 line-clamp-1">
            {videoTitle || 'YouTube Video Thumbnail'}
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> {activeRes.badge}
          </span>
        </div>
      </div>

      {/* Resolution Selector Tabs (4K/2K, 1080p, 720p, 480p) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {thumbnailResolutions.map((res) => {
          const isActive = activeRes.id === res.id;
          return (
            <button
              key={res.id}
              type="button"
              onClick={() => {
                setActiveRes(res);
                if (downloadStatus === 'success') setDownloadStatus('idle');
              }}
              className={`p-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-left relative ${
                isActive
                  ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-blue-500/20 text-cyan-950 dark:text-white shadow-md ring-2 ring-cyan-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {res.isBest && (
                <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-extrabold bg-amber-500 text-slate-950 shadow-sm uppercase tracking-wider">
                  Master 4K
                </span>
              )}
              <div className="font-extrabold text-slate-900 dark:text-white truncate">{res.name}</div>
              <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">{res.dimensions}</div>
            </button>
          );
        })}
      </div>

      {/* 16:9 Cinema Frame */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center group shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgUrl}
          alt={videoTitle || 'YouTube Thumbnail Preview'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <a
          href={imgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 p-2 rounded-xl bg-black/75 text-white hover:bg-black/95 border border-white/20 text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Full Size Master
        </a>
      </div>

      {/* Action Button with Multi-State Loader & Feedback */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => handleDownload(activeRes)}
          disabled={downloadStatus === 'downloading'}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm md:text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
            downloadStatus === 'downloading'
              ? 'bg-blue-700 text-white cursor-wait opacity-90'
              : downloadStatus === 'success'
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 border border-emerald-400/40'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border border-blue-400/30 shadow-blue-600/25'
          }`}
        >
          {downloadStatus === 'downloading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
              <span>Downloading {activeRes.name} ({activeRes.badge})...</span>
            </>
          ) : downloadStatus === 'success' ? (
            <>
              <Check className="w-5 h-5 text-emerald-200 animate-bounce" />
              <span>Downloaded! Saved to Your Device</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download {activeRes.name} ({activeRes.badge})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
