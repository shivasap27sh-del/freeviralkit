'use client';

import { useState } from 'react';
import { generateThumbnailConcepts, type ThumbnailConcept } from '@/app/actions/thumbnails';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, Loader2, Sparkles, Image as ImageIcon, MessageSquare } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

export default function ThumbnailGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    setConcepts([]);
    setError(null);
    const result = await generateThumbnailConcepts(inputVal);
    if (result.success && result.concepts) setConcepts(result.concepts);
    else setError(result.error || 'Failed to generate thumbnail concepts');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const examples = ['Why diet pills are a scam', '100 days building a cabin', 'I tested viral tiktok gadgets'];

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video title or idea..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Examples:</span>
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

        <button onClick={() => handleGenerate()} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Concepts...</> : <><Sparkles className="w-5 h-5" /> Generate Thumbnail Text & Ideas</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {concepts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Your Thumbnail Concepts</h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                16:9 HD Canvas Layouts
              </span>
            </div>
            
            <div className="grid gap-6">
              {concepts.map((concept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 hover:border-amber-400/50 transition-all shadow-md"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* 16:9 Interactive Canvas Mockup */}
                    <div className="lg:w-1/2 flex flex-col justify-between aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-4 sm:p-5 border border-slate-700/80 shadow-inner relative overflow-hidden group">
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 16:9 Preview #0{idx + 1}
                      </div>

                      <div className="mt-8 mb-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Visual Scene</p>
                        <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed font-sans">
                          {concept.visual}
                        </p>
                      </div>

                      {/* Text Overlay Box - Click to copy text */}
                      <button
                        type="button"
                        onClick={() => copy(concept.textOverlay, `text-${idx}`)}
                        className="w-full bg-slate-950/90 hover:bg-black border border-yellow-400/40 hover:border-yellow-400/80 backdrop-blur-sm p-3 rounded-lg text-center transform -rotate-1 shadow-lg transition-all cursor-pointer group/text"
                        title="Click to copy thumbnail text"
                      >
                        <span className="font-black text-lg sm:text-xl md:text-2xl text-yellow-300 tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] block">
                          &ldquo;{concept.textOverlay}&rdquo;
                        </span>
                        <span className="text-[10px] text-yellow-400/80 font-mono mt-1 inline-flex items-center gap-1">
                          {copiedStates[`text-${idx}`] ? '✓ Copied text!' : 'Click to copy text'}
                        </span>
                      </button>
                    </div>

                    {/* Psychology Details & Actions */}
                    <div className="lg:w-1/2 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 bg-green-500/10 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                            🔥 High Click Intent
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Curiosity Score: 9.{4 - idx}/10</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Click Psychology Strategy</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                            {concept.whyItWorks}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        <button
                          onClick={() => copy(concept.textOverlay, `text-btn-${idx}`)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-600 dark:text-yellow-300 transition-colors cursor-pointer text-xs font-semibold"
                        >
                          {copiedStates[`text-btn-${idx}`] ? <><CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Text</>}
                        </button>
                        <button
                          onClick={() => copy(`Visual Concept: ${concept.visual}\nText Overlay: "${concept.textOverlay}"\nPsychology: ${concept.whyItWorks}`, `concept-${idx}`)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer text-xs font-semibold"
                        >
                          {copiedStates[`concept-${idx}`] ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Full Concept</>}
                        </button>
                        <button
                          onClick={() => copy(`YouTube Thumbnail Image Prompt: ${concept.visual}, cinematic lighting, 8k resolution, photorealistic, bold text overlay: "${concept.textOverlay}"`, `prompt-${idx}`)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 transition-colors cursor-pointer text-xs font-semibold"
                        >
                          {copiedStates[`prompt-${idx}`] ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Copied!</> : <><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Image Prompt</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
