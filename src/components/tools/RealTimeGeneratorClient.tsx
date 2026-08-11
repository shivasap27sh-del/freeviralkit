'use client';

import { useState } from 'react';
import { generateRealTimeYouTubePackage, RealTimePackageResult } from '@/app/actions/realtimeTitles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
  Sparkles,
  RotateCcw,
  Film,
  Globe,
  Tag,
  Hash,
  FileText,
  ExternalLink,
  Info,
  Check,
} from 'lucide-react';
import Link from 'next/link';

export default function RealTimeGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Movies & Entertainment');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<RealTimePackageResult | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'titles' | 'description' | 'tags' | 'hashtags'>('titles');
  const [selectedTitleIdx, setSelectedTitleIdx] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    const exclude = isRegenerate && result?.titles ? result.titles : [];

    const res = await generateRealTimeYouTubePackage(topic, exclude, niche);
    if (res.success) {
      setResult(res);
      setSelectedTitleIdx(0);
    } else {
      setError(res.error || 'Failed to fetch live real-time data.');
    }
    setIsGenerating(false);
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70 ? 'text-emerald-600 dark:text-emerald-400' : len < 50 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400';

  return (
    <div className="w-full">
      {/* Top Notification Banner directing to standard tool */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/80 dark:from-purple-950/80 dark:via-indigo-950/80 dark:to-slate-900/80 border border-purple-200/80 dark:border-purple-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 shrink-0 font-bold">⚡</span>
          <div className="text-sm">
            <span className="font-semibold text-slate-900 dark:text-white">Looking for standard creator titles? </span>
            <span className="text-slate-600 dark:text-slate-300">For vlogs, gaming, or original series like "Horror Tape Ep 1", use our ultra-fast standard generator.</span>
          </div>
        </div>
        <Link
          href="/youtube-title-generator"
          className="shrink-0 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white active:scale-[0.96] transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
        >
          Standard AI Generator <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Input Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="glass-card rounded-2xl p-6 md:p-8 mb-8 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Film className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Real-World Movie, Series, or Live Trending Topic
          </label>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
            <Globe className="w-3 h-3 animate-pulse text-emerald-500" /> Live Facts Enabled
          </span>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Obsession Movie 2026, Avatar 3, Horror Movie Release, Breaking Pop Culture Event..."
            className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-base md:text-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Category / Focus Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="Movies & Entertainment">🎬 Movies & Entertainment</option>
              <option value="Horror & Thriller">😱 Horror & Thriller Films</option>
              <option value="Pop Culture & News">📰 Pop Culture & Breaking News</option>
              <option value="Gaming & Esports">🎮 Gaming Releases & Trailers</option>
              <option value="Tech & Hardware">💻 Tech & Product Launches</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white active:scale-[0.98] transition-all duration-75 ease-out shadow-lg shadow-purple-600/30"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Fetching Live Facts & Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" /> Generate Live Real-Time Package
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Section */}
      <AnimatePresence>
        {result && result.success && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            className="origin-top"
          >
            {/* Real-Time Context Badge Box */}
            {result.liveContext && result.liveContext.summary && (
              <div className="mb-8 p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-500/30 text-slate-700 dark:text-slate-300 text-sm shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-medium text-indigo-700 dark:text-indigo-300">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Real-World Context Source: {result.liveContext.source.toUpperCase()}</span>
                  </div>
                  {result.liveContext.url && (
                    <a
                      href={result.liveContext.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 active:scale-[0.96] transition-transform duration-75 font-medium"
                    >
                      View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-slate-700 dark:text-slate-300 line-clamp-3 text-xs md:text-sm leading-relaxed">
                  "{result.liveContext.summary}"
                </p>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('titles')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
                  activeTab === 'titles'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-4 h-4" /> 10 Viral Titles ({result.titles?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
                  activeTab === 'description'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-4 h-4" /> SEO Description
              </button>
              <button
                onClick={() => setActiveTab('tags')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
                  activeTab === 'tags'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Tag className="w-4 h-4" /> Search Tags ({result.tags?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('hashtags')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
                  activeTab === 'hashtags'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Hash className="w-4 h-4" /> Hashtags ({result.hashtags?.length || 0})
              </button>
            </div>

            {/* TAB 1: TITLES */}
            {activeTab === 'titles' && result.titles && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Generated Real-World Titles</h3>
                  <button
                    onClick={() => handleGenerate(true)}
                    disabled={isGenerating}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.95] text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all duration-75 border border-slate-200 dark:border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Regenerate 10 New
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {result.titles.map((t, idx) => {
                    const key = `title_${idx}`;
                    const isCopied = copiedStates[key];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          selectedTitleIdx === idx
                            ? 'bg-white dark:bg-slate-900 border-purple-500/60 ring-1 ring-purple-500/30 shadow-lg'
                            : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-slate-700'
                        }`}
                        onClick={() => setSelectedTitleIdx(idx)}
                      >
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white font-medium text-base mb-1">{t}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={charColor(t.length)}>{t.length} chars</span>
                            <span className="text-slate-400 dark:text-slate-500">•</span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {t.length >= 50 && t.length <= 70
                                ? '✓ Ideal YouTube Search Length'
                                : t.length > 70
                                ? '⚠️ Truncates on mobile feed'
                                : 'Short keyword title'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyText(t, key);
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-[0.94] transition-all duration-75 shrink-0 ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Title
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: SEO DESCRIPTION */}
            {activeTab === 'description' && result.description && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">SEO Video Description</h3>
                  <button
                    onClick={() => copyText(result.description!, 'desc')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
                  >
                    {copiedStates['desc'] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Description Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Entire Description
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-mono shadow-sm">
                  {result.description}
                </div>
              </div>
            )}

            {/* TAB 3: SEARCH TAGS */}
            {activeTab === 'tags' && result.tags && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">YouTube Studio Search Tags</h3>
                  <button
                    onClick={() => copyText(result.tags!.join(', '), 'all_tags')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
                  >
                    {copiedStates['all_tags'] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" /> All Tags Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy All 25 Tags
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  {result.tags.map((tg, idx) => {
                    const key = `tag_${idx}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => copyText(tg, key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-75 cursor-pointer active:scale-[0.94] flex items-center gap-1.5 ${
                          copiedStates[key]
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500'
                        }`}
                      >
                        {tg}
                        {copiedStates[key] ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400 dark:text-slate-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: HASHTAGS */}
            {activeTab === 'hashtags' && result.hashtags && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Trending Hashtags</h3>
                  <button
                    onClick={() => copyText(result.hashtags!.join(' '), 'all_hashtags')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
                  >
                    {copiedStates['all_hashtags'] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" /> All Hashtags Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy All Hashtags
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  {result.hashtags.map((ht, idx) => {
                    const key = `ht_${idx}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => copyText(ht, key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-75 cursor-pointer active:scale-[0.94] flex items-center gap-1.5 ${
                          copiedStates[key]
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 hover:border-purple-500'
                        }`}
                      >
                        {ht}
                        {copiedStates[key] ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-purple-500 dark:text-purple-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
