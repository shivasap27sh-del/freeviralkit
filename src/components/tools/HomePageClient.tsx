'use client';

import { useState, useRef } from 'react';
import { generateTitles } from '@/app/actions/titles';
import { generateDetails } from '@/app/actions/details';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';
import { HomeTopBanner } from './home/HomeTopBanner';
import { HomeTitleList } from './home/HomeTitleList';
import { HomeDetailsPackage, type DetailsData } from './home/HomeDetailsPackage';

export default function HomePageClient() {
  const [topic, setTopic] = useState('');
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);
  const [details, setDetails] = useState<DetailsData | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  const handleGenerateTitles = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGeneratingTitles(true);
    setError(null);
    const exclude = isRegenerate ? titles : [];
    setTitles([]);
    setSelectedTitle(null);
    setDetails(null);

    const result = await generateTitles(topic, exclude);
    if (result.success && result.titles) {
      setTitles(result.titles);
    } else {
      setError(result.error || 'Failed to generate titles');
    }
    setIsGeneratingTitles(false);
  };

  const handleSelectTitle = async (title: string) => {
    setSelectedTitle(title);
    setIsGeneratingDetails(true);
    setError(null);
    setDetails(null);

    setTimeout(() => {
      if (detailsSectionRef.current) {
        const yOffset = -80;
        const y = detailsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);

    const result = await generateDetails(title);
    if (result.success && result.details) {
      setDetails(result.details);
    } else {
      setError(result.error || 'Failed to generate details');
    }
    setIsGeneratingDetails(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const copyFullPackage = () => {
    if (!details || !selectedTitle) return;
    const full = `TITLE:\n${selectedTitle}\n\nDESCRIPTION:\n${details.description}\n\nHASHTAGS:\n${details.hashtags.join(' ')}\n\nTAGS:\n${details.tags.join(', ')}\n\nPINNED COMMENT:\n${details.pinnedComment}`;
    copy(full, 'full-package');
  };

  return (
    <div className="w-full space-y-6">
      <HomeTopBanner />

      {/* Main Generator Input Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateTitles();
        }}
        className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600" /> Enter Your Video Topic or Concept
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., How to build a SaaS in 2026, 10 Python Automation Scripts..."
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 text-base md:text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold">Try examples:</span>
            {['AI Automation', 'Beginner Coding', 'Stock Market'].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setTopic(ex);
                  generateTitles(ex).then((res) => res.success && res.titles && setTitles(res.titles));
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-slate-700 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isGeneratingTitles || !topic.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 disabled:opacity-50 cursor-pointer text-sm"
          >
            {isGeneratingTitles ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating 10 Viral Titles...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Titles
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && <ErrorBanner error={error} onClear={() => setError(null)} />}

      {/* Step 1: Titles List */}
      {titles.length > 0 && (
        <HomeTitleList
          titles={titles}
          selectedTitle={selectedTitle}
          onSelectTitle={handleSelectTitle}
          onRegenerate={() => handleGenerateTitles(true)}
          isGeneratingTitles={isGeneratingTitles}
          isGeneratingDetails={isGeneratingDetails}
          copiedStates={copiedStates}
          onCopy={copy}
        />
      )}

      {/* Step 2: Complete SEO Details Package */}
      {details && selectedTitle && (
        <HomeDetailsPackage
          selectedTitle={selectedTitle}
          details={details}
          copiedStates={copiedStates}
          onCopy={copy}
          onCopyFullPackage={copyFullPackage}
          detailsRef={detailsSectionRef}
        />
      )}
    </div>
  );
}
