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

  const cleanText = (str: string) => str ? str.replace(/\*/g, '').trim() : '';

  const copyFullIdea = (idea: ShortsIdea, idx: number) => {
    const text = `SHORTS IDEA #${idx + 1}: ${cleanText(idea.title)}\n\nHOOK (First 3s):\n${cleanText(idea.hook)}\n\nVISUALS (B-Roll):\n${cleanText(idea.visuals)}\n\nAUDIO / VOICEOVER:\n${cleanText(idea.audio)}`;
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

            <div className="space-y-8">
              {ideas.map((idea, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-md"
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    {/* 9:16 Vertical Phone Canvas Mockup */}
                    <div className="lg:w-1/3 flex flex-col justify-between aspect-[9/16] min-h-[320px] max-h-[420px] mx-auto w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-pink-950/80 p-4 border-2 border-slate-800 shadow-2xl relative overflow-hidden group">
                      {/* Top Bar Mockup */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-pink-400 fill-pink-400" /> Shorts #0{idx + 1}</span>
                        <span>9:16 HD</span>
                      </div>

                      {/* Middle Hook Preview */}
                      <div className="my-auto text-center px-2 py-4 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
                        <p className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-1">First 3s Hook</p>
                        <p className="text-sm font-black text-white leading-snug drop-shadow-md">
                          &ldquo;{idea.hook.replace(/\*/g, '').replace(/^["'“”\[\]]+|["'“”\[\]]+$/g, '').replace(/\[VISUAL:.*?\]/gi, '').trim()}&rdquo;
                        </p>
                      </div>

                      {/* Bottom Audio Badge Mockup */}
                      <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-lg flex items-center justify-between text-[11px] text-slate-300">
                        <span className="truncate max-w-[150px] font-medium text-slate-200">🎵 {idea.title}</span>
                        <span className="text-[10px] text-green-400 font-bold px-1.5 py-0.5 rounded bg-green-500/10">Looping</span>
                      </div>
                    </div>

                    {/* Script Breakdown & Actions */}
                    <div className="lg:w-2/3 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">
                              Concept #{idx + 1}
                            </span>
                            <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 mt-1.5">{idea.title}</h3>
                          </div>
                          <button
                            onClick={() => copyFullIdea(idea, idx)}
                            className="copy-btn py-1.5 px-3 text-xs shrink-0 cursor-pointer"
                          >
                            {copiedStates[`full-idea-${idx}`] ? (
                              <span className="text-green-400 flex items-center gap-1">✓ Copied!</span>
                            ) : (
                              <span className="flex items-center gap-1">Copy Full Script</span>
                            )}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Visuals */}
                          <div className="bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                              <Video className="w-3.5 h-3.5" /> Visual B-Roll Cues
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{idea.visuals.replace(/\*/g, '')}</p>
                          </div>

                          {/* Audio */}
                          <div className="bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5 mb-2">
                              <AlignLeft className="w-3.5 h-3.5" /> Voiceover & Audio
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{idea.audio.replace(/\*/g, '')}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => copy(`YouTube Shorts Concept: ${cleanText(idea.title)}\nHook: "${cleanText(idea.hook)}"\nVisuals: ${cleanText(idea.visuals)}\nVoiceover: ${cleanText(idea.audio)}`, `quick-copy-${idx}`)}
                        className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedStates[`quick-copy-${idx}`] ? <span className="text-green-400">✓ Copied to Clipboard</span> : 'Copy Shorts Quick Outline'}
                      </button>
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
