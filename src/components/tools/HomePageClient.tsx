'use client';

import { useState, useRef } from 'react';
import { generateTitles } from '@/app/actions/titles';
import { generateDetails } from '@/app/actions/details';
import { Loader2, Zap, X, ArrowDown } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';
import { HomeTitleList } from './home/HomeTitleList';
import { HomeDetailsPackage, type DetailsData } from './home/HomeDetailsPackage';
import { HomeYouTubePreview } from './home/HomeYouTubePreview';
import { useToast } from '@/components/ToastProvider';
import CreatorPipelineBar from './CreatorPipelineBar';

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

  const handleGenerateTitles = async (isRegenerate = false, overrideTopic?: string) => {
    const query = (overrideTopic !== undefined ? overrideTopic : topic).trim();
    if (!query) return;
    if (overrideTopic !== undefined) setTopic(overrideTopic);
    setIsGeneratingTitles(true);
    setError(null);
    const exclude = isRegenerate ? titles : [];
    setTitles([]);
    setSelectedTitle(null);
    setDetails(null);

    const result = await generateTitles(query, exclude);
    if (result.success && result.titles && result.titles.length > 0) {
      setTitles(result.titles);
      // Pre-select candidate #1 quietly without hijacking the user's screen scroll!
      handleSelectTitle(result.titles[0], false);
    } else {
      setError(result.error || 'Failed to generate titles');
    }
    setIsGeneratingTitles(false);
  };

  const handleSelectTitle = async (title: string, shouldScroll = true) => {
    setSelectedTitle(title);
    setIsGeneratingDetails(true);
    setError(null);
    setDetails(null);

    if (shouldScroll) {
      setTimeout(() => {
        if (detailsSectionRef.current) {
          const yOffset = -80;
          const y = detailsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 80);
    }

    const result = await generateDetails(title);
    if (result.success && result.details) {
      setDetails(result.details);
    } else {
      setError(result.error || 'Failed to generate details');
    }
    setIsGeneratingDetails(false);
  };

  const { showToast } = useToast();

  const copy = async (text: string, key: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      showToast(label ? `Copied ${label}!` : 'Copied to clipboard!', 'success');
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const copyFullPackage = (customDescription?: string) => {
    if (!details || !selectedTitle) return;
    const desc = customDescription !== undefined ? customDescription : details.description;
    const full = `TITLE:\n${selectedTitle}\n\nDESCRIPTION:\n${desc}\n\nHASHTAGS:\n${details.hashtags.join(' ')}\n\nTAGS:\n${details.tags.join(', ')}\n\nPINNED COMMENT:\n${details.pinnedComment}`;
    copy(full, 'full-package', 'Complete YouTube Pack');
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Generator Input Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateTitles();
        }}
        className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#121216]/90 shadow-2xl backdrop-blur-xl space-y-5 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Enter your video topic
          </label>
          <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-md border border-zinc-700/60 hidden sm:inline-flex">
            10 Title Variations + Studio Pack
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 24 Hours in Tokyo on a Budget, 10-Minute High-Protein Meals, Minecraft 100 Days Survival, Best Budget Tech..."
            className="w-full pl-5 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 placeholder:text-slate-500 text-base md:text-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] outline-none transition-all font-sans"
          />
          {topic.trim() && (
            <button
              type="button"
              onClick={() => setTopic('')}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-200/60 dark:bg-zinc-800 transition-colors cursor-pointer"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-400 mr-1 font-mono">Trending:</span>
            {[
              'Viral Shorts',
              'Gaming Highlights',
              'Quick Recipes',
              'Travel Vlog',
              'Personal Finance',
              'Tech Reviews',
            ].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleGenerateTitles(false, name)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#18181f] hover:border-zinc-500 hover:text-red-500 dark:hover:text-red-400 dark:hover:bg-zinc-800 border border-slate-200/60 dark:border-white/[0.06] transition-all font-medium cursor-pointer active:scale-[0.96] flex items-center gap-1"
              >
                <span>{name}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isGeneratingTitles || !topic.trim()}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingTitles ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating 10 Titles...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" /> Generate 10 Viral Titles
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && <ErrorBanner error={error} onClear={() => setError(null)} />}

      {/* Step 1: Titles List */}
      {titles.length > 0 && (
        <div className="space-y-4">
          <HomeTitleList
            titles={titles}
            selectedTitle={selectedTitle}
            onSelectTitle={(t) => handleSelectTitle(t, false)}
            onRegenerate={() => handleGenerateTitles(true)}
            isGeneratingTitles={isGeneratingTitles}
            isGeneratingDetails={isGeneratingDetails}
            copiedStates={copiedStates}
            onCopy={copy}
          />

          {selectedTitle && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  if (detailsSectionRef.current) {
                    const yOffset = -80;
                    const y = detailsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <span>View Generated Description, Tags & SEO Package</span>
                <ArrowDown className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive YouTube Search & Suggested Feed Simulator */}
      {selectedTitle && (
        <HomeYouTubePreview title={selectedTitle} />
      )}

      {/* Step 2: Complete SEO Details Package */}
      {details && selectedTitle && (
        <>
          <HomeDetailsPackage
            selectedTitle={selectedTitle}
            details={details}
            copiedStates={copiedStates}
            onCopy={copy}
            onCopyFullPackage={copyFullPackage}
            detailsRef={detailsSectionRef}
          />

          {/* Publishing Workflow Pipeline */}
          <CreatorPipelineBar
            currentStep="packaging"
            currentTool="youtube-title-generator"
            topic={selectedTitle || topic}
          />
        </>
      )}
    </div>
  );
}
