'use client';

import { useState } from 'react';
import { generateHooks } from '@/app/actions/hooks';
import { HOOK_ARCHETYPES, type HookPackage, type HookArchetypeConfig } from './hooks/types';
import HookArchetypeSelector from './hooks/HookArchetypeSelector';
import HookRetentionWaveform from './hooks/HookRetentionWaveform';
import HookTimelineScrubber from './hooks/HookTimelineScrubber';
import HookVariantCards from './hooks/HookVariantCards';
import HookTeleprompterModal from './hooks/HookTeleprompterModal';
import ErrorBanner from '@/components/ErrorBanner';
import { Loader2, Sparkles, RotateCcw } from 'lucide-react';

export default function HookGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [activeArchetype, setActiveArchetype] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [packages, setPackages] = useState<HookPackage[]>([]);
  const [selectedHook, setSelectedHook] = useState<HookPackage | null>(null);
  const [teleprompterHook, setTeleprompterHook] = useState<HookPackage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (customTopic?: string, customAngle?: string) => {
    const inputTopic = (customTopic !== undefined ? customTopic : topic).trim();
    if (!inputTopic) return;

    setIsGenerating(true);
    setError(null);

    const activeAngle = customAngle !== undefined ? customAngle : activeArchetype;
    const excludes = packages.map((p) => p.summary);
    const result = await generateHooks(inputTopic, activeAngle || undefined, excludes);

    if (result.success && result.packages && result.packages.length > 0) {
      setPackages(result.packages);
      setSelectedHook(result.packages[0]);
    } else {
      setError(result.error || 'Failed to generate retention hooks.');
    }
    setIsGenerating(false);
  };

  const onSelectArchetype = (archetype: HookArchetypeConfig) => {
    const nextId = activeArchetype === archetype.id ? null : archetype.id;
    setActiveArchetype(nextId);
    const targetTopic = topic.trim() || 'Building an AI app in 2026';
    if (!topic.trim()) {
      setTopic(targetTopic);
    }
    handleGenerate(targetTopic, nextId ? archetype.label : undefined);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar & Cockpit Controls */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Active Angle Strategy Indicator */}
        {activeArchetype && (
          <div className="flex items-center gap-2 mb-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              Active Strategy:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300">
              <span>{HOOK_ARCHETYPES.find((a) => a.id === activeArchetype)?.label}</span>
              <button
                type="button"
                onClick={() => setActiveArchetype(null)}
                className="ml-1 text-slate-400 hover:text-red-400 font-bold transition-colors cursor-pointer"
                title="Clear angle filter"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        <div className="relative mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your video topic (e.g., how to code in javascript, building an AI agent...)"
            className="w-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base md:text-lg font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        {/* Archetype Quick Selectors */}
        <HookArchetypeSelector
          activeArchetypeId={activeArchetype}
          onSelectArchetype={onSelectArchetype}
        />

        {/* Generate Button */}
        <button
          type="button"
          onClick={() => handleGenerate()}
          disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-2xl py-4 font-bold text-base md:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Engineering 30-Second Retention Deck...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate 30-Second Retention Hook Cockpit
            </>
          )}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Generated Cockpit Workspace */}
      {packages.length > 0 && selectedHook && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
              🎬 30-Second Multi-Track Production Cockpit
            </h2>
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-500/15 hover:text-purple-600 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Regenerate Decks
            </button>
          </div>

          {/* Top Live Retention Visualizer & 30s Timeline Scrubber */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <HookRetentionWaveform score={selectedHook.predictedRetention} />
            </div>
            <div className="lg:col-span-8">
              <HookTimelineScrubber timeline={selectedHook.timeline} />
            </div>
          </div>

          {/* 3D Hook Card Deck */}
          <HookVariantCards
            packages={packages}
            selectedHookId={selectedHook.id}
            onSelectHook={(pkg) => setSelectedHook(pkg)}
            onOpenTeleprompter={(pkg) => setTeleprompterHook(pkg)}
          />
        </div>
      )}

      {/* Fullscreen Teleprompter Modal */}
      <HookTeleprompterModal
        pkg={teleprompterHook}
        onClose={() => setTeleprompterHook(null)}
      />
    </div>
  );
}
