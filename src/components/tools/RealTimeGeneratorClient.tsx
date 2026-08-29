'use client';

import { useState } from 'react';
import { generateRealTimeYouTubePackage, type RealTimePackageResult } from '@/app/actions/realtimeTitles';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Loader2, Sparkles, Film, Globe } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';
import { RealTimeBanner } from './realtime/RealTimeBanner';
import { RealTimeResultTabs } from './realtime/RealTimeResultTabs';

export default function RealTimeGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Movies & Entertainment');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<RealTimePackageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    const exclude = isRegenerate && result?.titles ? result.titles : [];

    const res = await generateRealTimeYouTubePackage(topic, exclude, niche);
    if (res.success) {
      setResult(res);
    } else {
      setError(res.error || 'Failed to fetch live real-time data.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="w-full">
      {/* Top Banner directing to standard generator */}
      <RealTimeBanner />

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
            placeholder="e.g. Inception, Spider-Man: Beyond the Spider-Verse, Oppenheimer..."
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Niche Format:</span>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="Movies & Entertainment">🎬 Movies & Entertainment (Recaps/Analysis)</option>
              <option value="Anime & Manga">⛩️ Anime & Manga Breaks</option>
              <option value="Tech & Hardware">💻 Tech & Real-World Hardware</option>
              <option value="General Live Trends">🔥 General Live Web Trend</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.97] transition-all duration-100 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 disabled:opacity-50 cursor-pointer text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching Live Grounding Data...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Full Live SEO Pack
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && <ErrorBanner error={error} onClear={() => setError(null)} />}

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <RealTimeResultTabs
              result={result}
              onRegenerate={() => handleGenerate(true)}
              isGenerating={isGenerating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
