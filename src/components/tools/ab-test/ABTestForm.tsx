'use client';

import { Sparkles, Wand2, Loader2 } from 'lucide-react';
import { QUICK_TOPICS } from './types';

interface ABTestFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  isGenerating: boolean;
  onGenerate: (isRegenerate?: boolean) => void;
}

export default function ABTestForm({
  topic,
  setTopic,
  isGenerating,
  onGenerate,
}: ABTestFormProps) {
  return (
    <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate(false);
        }}
        className="space-y-4 relative z-10"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="ab-topic" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Enter Your Video Topic, Concept, or Draft Title:
          </label>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 3-Way YouTube Studio Test &amp; Compare Format
          </span>
        </div>

        <div className="relative">
          <input
            id="ab-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How to get more views on YouTube Shorts in 2026..."
            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base md:text-lg transition-all shadow-inner"
            maxLength={250}
          />
        </div>

        {/* Quick Tone & Topic Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 font-medium">Quick Ideas:</span>
          {QUICK_TOPICS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTopic(t.topic)}
              className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-2xl py-4 font-bold text-base md:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Engineering 3-Way A/B Packaging Pack...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate 3-Way A/B Test Pack ⚡
            </>
          )}
        </button>
      </form>
    </section>
  );
}
