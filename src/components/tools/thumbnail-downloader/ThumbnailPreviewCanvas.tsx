'use client';

import { useState } from 'react';
import { Download, ExternalLink, Check, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';
import { thumbnailResolutions, type ThumbnailResolution } from '@/data/thumbnailDownloaderData';

interface ThumbnailPreviewCanvasProps {
  videoId: string;
  videoTitle?: string;
}

export function ThumbnailPreviewCanvas({ videoId, videoTitle }: ThumbnailPreviewCanvasProps) {
  const [activeRes, setActiveRes] = useState<ThumbnailResolution>(thumbnailResolutions[0]);
  const [downloading, setDownloading] = useState(false);

  const imgUrl = `https://img.youtube.com/vi/${videoId}/${activeRes.fileNameSuffix}.jpg`;

  const handleDownload = async (res: ThumbnailResolution) => {
    setDownloading(true);
    try {
      const targetUrl = `https://img.youtube.com/vi/${videoId}/${res.fileNameSuffix}.jpg`;
      const response = await fetch(targetUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${videoId}-${res.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(`https://img.youtube.com/vi/${videoId}/${res.fileNameSuffix}.jpg`, '_blank');
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header & Quality Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-cyan-400 border border-blue-500/30 uppercase">
            <Eye className="w-3.5 h-3.5 text-cyan-400" /> 16:9 Cinema Viewport
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1.5 line-clamp-1">
            {videoTitle || 'YouTube Video Thumbnail'}
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {activeRes.dimensions}
          </span>
        </div>
      </div>

      {/* Resolution Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {thumbnailResolutions.map((res) => {
          const isActive = activeRes.id === res.id;
          return (
            <button
              key={res.id}
              type="button"
              onClick={() => setActiveRes(res)}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-left ${
                isActive
                  ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg shadow-blue-500/20'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="truncate text-white">{res.name.split('(')[0]}</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">{res.dimensions}</div>
            </button>
          );
        })}
      </div>

      {/* 16:9 Cinema Frame */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-950 flex items-center justify-center group shadow-inner">
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
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 text-white hover:bg-slate-900 border border-white/20 text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Full Size Master
        </a>
      </div>

      {/* Electric Blue Action Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => handleDownload(activeRes)}
          disabled={downloading}
          className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm md:text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.98] text-white border border-blue-400/30 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {downloading ? <Check className="w-5 h-5 animate-pulse text-cyan-200" /> : <Download className="w-5 h-5" />}
          <span>Download {activeRes.name.split('(')[0]} ({activeRes.dimensions})</span>
        </button>
      </div>
    </div>
  );
}
