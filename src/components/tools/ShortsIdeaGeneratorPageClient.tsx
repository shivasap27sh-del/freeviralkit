'use client';

import { useState } from 'react';
import { generateShortsIdeas } from '../../app/actions/shorts';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Sparkles, RotateCcw, Video, AlignLeft, MessageSquare } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

type ShortsIdea = {
  title: string;
  hook: string;
  visuals: string;
  audio: string;
};

export default function ShortsIdeaGeneratorPageClient() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<ShortsIdea[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate ? ideas.map(i => i.title) : [];
    setIdeas([]);
    setError(null);
    const result = await generateShortsIdeas(inputVal, exclude);
    if (result.success && result.ideas) {
      setIdeas(result.ideas as ShortsIdea[]);
    } else {
      setError(result.error || 'Failed to generate Shorts ideas');
    }
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const copyFullIdea = (idea: ShortsIdea, idx: number) => {
    const text = `SHORTS IDEA #${idx + 1}: ${idea.title}\n\nHOOK (First 3s):\n${idea.hook}\n\nVISUALS (B-Roll):\n${idea.visuals}\n\nAUDIO / VOICEOVER:\n${idea.audio}`;
    copy(text, `full-idea-${idx}`);
  };

  const examples = ['Life Hacks', 'Minecraft Tips', 'AI tools 2026', 'Finance Hacks'];

  return (
    <>
      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Enter your topic (e.g. daily habits, productivity apps, coding tips, travel secrets...)"
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {examples.map(ex => (
            <button
              key={ex}
              onClick={() => {
                setTopic(ex);
                handleGenerate(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Crafting Shorts Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate 5 Shorts Ideas
            </>
          )}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Results */}
      <AnimatePresence>
        {ideas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold">Your Generated Shorts Concepts</h2>
              <button
                onClick={() => handleGenerate(undefined, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>

            <div className="space-y-6">
              {ideas.map((idea, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-2xl p-6 md:p-8"
                >
                  <div className="flex justify-between items-start gap-4 mb-5 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">
                        Concept #{idx + 1}
                      </span>
                      <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">{idea.title}</h3>
                    </div>
                    <button
                      onClick={() => copyFullIdea(idea, idx)}
                      className="copy-btn py-1 px-3 text-xs shrink-0 cursor-pointer"
                    >
                      {copiedStates[`full-idea-${idx}`] ? (
                        <span className="text-green-400 flex items-center gap-1">✓ Copied!</span>
                      ) : (
                        <span className="flex items-center gap-1">Copy Concept Script</span>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Hook */}
                    <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5 mb-2">
                        <MessageSquare className="w-3.5 h-3.5" /> Hook (First 3s)
                      </h4>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                        &ldquo;{idea.hook.replace(/\*/g, '')}&rdquo;
                      </p>
                    </div>

                    {/* Visuals */}
                    <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                        <Video className="w-3.5 h-3.5" /> Visuals (B-Roll)
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{idea.visuals.replace(/\*/g, '')}</p>
                    </div>

                    {/* Audio */}
                    <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5 mb-2">
                        <AlignLeft className="w-3.5 h-3.5" /> Audio / Script
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{idea.audio.replace(/\*/g, '')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-5 mt-6">
              <h4 className="font-display font-semibold text-pink-400 mb-1 flex items-center gap-1.5">
                ⚡ Shorts Retention Secret
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                On YouTube Shorts, retention is everything. Keep visual changes happening every 2-3 seconds, synchronize edits to fast background beats, and leave a micro-pause at the end of the script to create a seamless looping effect that gains extra repeat views.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
