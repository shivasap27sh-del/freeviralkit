'use client';

import { type RefObject } from 'react';
import { Smartphone, Upload, Sun, Moon, X } from 'lucide-react';
import { type ABTestVariant } from './types';

interface MobileFeedSimulatorProps {
  activeVariant: ABTestVariant | undefined;
  activeVariantId: 'A' | 'B' | 'C';
  activeImage: string | undefined;
  topic: string;
  feedTheme: 'dark' | 'light';
  setFeedTheme: (theme: 'dark' | 'light') => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (variantId: 'A' | 'B' | 'C') => void;
}

export default function MobileFeedSimulator({
  activeVariant,
  activeVariantId,
  activeImage,
  topic,
  feedTheme,
  setFeedTheme,
  fileInputRef,
  onImageUpload,
  onRemoveImage,
}: MobileFeedSimulatorProps) {
  const charLength = activeVariant ? activeVariant.title.length : 0;
  const isMobileSafe = charLength >= 45 && charLength <= 65;

  return (
    <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 mb-2 uppercase font-mono">
            <Smartphone className="w-3.5 h-3.5" /> Live YouTube Mobile App Feed Simulator
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Simulated YouTube Search &amp; Suggested Preview
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Testing <span className="font-bold text-purple-400">Variant {activeVariant?.id}</span> thumbnail and title in the live feed.
          </p>
        </div>

        {/* Feed Controls: Dark/Light Mode + Upload Thumbnail */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            {activeImage ? `Change Variant ${activeVariantId} Image` : `Upload Thumbnail for Variant ${activeVariantId}`}
          </button>

          {activeImage && (
            <button
              type="button"
              onClick={() => onRemoveImage(activeVariantId)}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 transition-colors cursor-pointer"
            >
              Reset to Mockup
            </button>
          )}

          {/* High-Contrast Light / Dark Mode Switcher */}
          <div className="inline-flex rounded-xl p-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-inner">
            <button
              type="button"
              onClick={() => setFeedTheme('light')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                feedTheme === 'light'
                  ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-300 font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setFeedTheme('dark')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                feedTheme === 'dark'
                  ? 'bg-slate-950 text-white shadow-md ring-1 ring-slate-800 font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* SIMULATED MOBILE PHONE CHASSIS */}
      <div
        className={`max-w-md mx-auto rounded-[2.5rem] p-4 md:p-5 border-4 shadow-2xl transition-all duration-300 ${
          feedTheme === 'dark'
            ? 'bg-[#0f0f0f] border-slate-800 text-white shadow-purple-950/20'
            : 'bg-[#f4f5f8] border-slate-300 text-slate-900 shadow-slate-400/30 ring-1 ring-slate-200'
        }`}
      >
        {/* Phone Notch & Top Status Header */}
        <div
          className={`flex items-center justify-between text-[11px] font-mono mb-3 px-2 transition-colors font-bold ${
            feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-700'
          }`}
        >
          <span>9:41</span>
          {/* Speaker / Camera Notch */}
          <div
            className={`w-16 h-3 rounded-full border mx-auto ${
              feedTheme === 'dark'
                ? 'bg-slate-800/80 border-slate-700/50'
                : 'bg-slate-300 border-slate-400/60'
            }`}
          />
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div
              className={`w-4 h-2 rounded-sm border ${
                feedTheme === 'dark'
                  ? 'border-slate-400 bg-slate-300'
                  : 'border-slate-700 bg-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Simulated YouTube Search Bar Header */}
        <div
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-full mb-3 text-xs transition-colors border shadow-sm ${
            feedTheme === 'dark'
              ? 'bg-[#222222] border-slate-800 text-slate-200'
              : 'bg-white border-slate-300 text-slate-800 font-semibold'
          }`}
        >
          <span className="flex items-center gap-2 text-xs truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shrink-0 shadow-sm"></span>
            <span className="truncate">{topic || 'Search YouTube'}</span>
          </span>
          <span
            className={`text-[10px] font-mono uppercase font-bold shrink-0 ${
              feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Search
          </span>
        </div>

        {/* Video Card Container inside simulated feed */}
        <div
          className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
            feedTheme === 'dark'
              ? 'bg-[#181818] border-slate-800 text-white'
              : 'bg-white border-slate-300 text-slate-900 shadow-md'
          }`}
        >
          {/* 16:9 Thumbnail Box with Dynamic Text Overlay */}
          <div className="relative aspect-video w-full bg-slate-800 overflow-hidden flex items-center justify-center group">
            {activeImage ? (
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage}
                  alt={`Uploaded Thumbnail ${activeVariantId}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Remove Button On Image */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(activeVariantId);
                  }}
                  className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors cursor-pointer shadow-lg"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Dynamic Text Overlay on Uploaded Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-3">
                  <h4 className="text-base md:text-xl font-extrabold text-white tracking-wider drop-shadow-xl font-display uppercase px-3 py-1 rounded-lg bg-black/60 border border-white/30 backdrop-blur-xs">
                    {activeVariant?.thumbnailText || 'WATCH THIS'}
                  </h4>
                </div>
              </div>
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-tr ${
                  activeVariantId === 'A'
                    ? 'from-indigo-950 via-purple-900 to-slate-900'
                    : activeVariantId === 'B'
                    ? 'from-rose-950 via-red-900 to-slate-900'
                    : 'from-emerald-950 via-teal-900 to-slate-900'
                } flex flex-col items-center justify-center p-4 text-center`}
              >
                <span className="text-[10px] text-white/70 font-mono uppercase tracking-widest mb-1 font-bold">
                  Thumbnail Preview (Variant {activeVariantId})
                </span>
                <h4 className="text-xl md:text-2xl font-extrabold text-white tracking-wider drop-shadow-lg font-display uppercase px-3 py-1.5 rounded-lg bg-black/50 border border-white/20">
                  {activeVariant?.thumbnailText || 'WATCH THIS'}
                </h4>
              </div>
            )}

            {/* Duration Badge */}
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/85 text-white backdrop-blur-sm shadow-sm">
              12:48
            </span>
          </div>

          {/* Video Metadata in Feed */}
          <div className="p-3.5 flex items-start gap-3">
            {/* Simulated Creator Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
              FK
            </div>

            <div className="flex-1 min-w-0">
              {/* Title with High Contrast Invariant */}
              <p
                className={`text-sm font-bold leading-snug line-clamp-2 transition-colors ${
                  feedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {activeVariant?.title}
              </p>

              {/* Channel Name & Stats */}
              <p
                className={`text-xs mt-1 font-medium transition-colors ${
                  feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                FreeViralKit Creator • 248K views • 2 days ago
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Truncation & Health Gauge (High Contrast in Both Modes) */}
        <div
          className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono transition-colors ${
            feedTheme === 'dark'
              ? 'border-slate-800 text-slate-400'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <span className={feedTheme === 'dark' ? 'text-slate-300' : 'text-slate-800 font-semibold'}>
            Length:{' '}
            <span
              className={`font-black text-xs px-1.5 py-0.5 rounded ${
                feedTheme === 'dark'
                  ? 'text-white bg-slate-800'
                  : 'text-slate-950 bg-slate-200 border border-slate-300'
              }`}
            >
              {charLength} / 65
            </span>{' '}
            chars
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] shadow-xs ${
              isMobileSafe
                ? feedTheme === 'dark'
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                  : 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                : feedTheme === 'dark'
                ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                : 'text-amber-800 bg-amber-100 border border-amber-300'
            }`}
          >
            {isMobileSafe ? '🟢 100% Mobile Feed Safe' : '🟡 May Truncate on Small Screens'}
          </span>
        </div>
      </div>

      {/* Visual Scene Concept Prompt */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
          🎬 AI Visual Scene Prompt for Variant {activeVariant?.id}:
        </span>
        <p className="leading-relaxed">
          {activeVariant?.visualConcept}
        </p>
      </div>
    </section>
  );
}
