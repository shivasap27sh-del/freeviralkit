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

        <button onClick={() => handleGenerate()} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Concepts...</> : <><Sparkles className="w-5 h-5" /> Generate Thumbnail Ideas</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {concepts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8">
            <h2 className="font-display text-xl font-semibold mb-4">Your Thumbnail Concepts</h2>
            
            <div className="grid gap-6">
              {concepts.map((concept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-amber-300 dark:hover:border-amber-500/50 transition-all shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Visual Idea */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                          <ImageIcon className="w-5 h-5 text-amber-500" /> Visual Layout
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                          {concept.visual}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                          <MessageSquare className="w-5 h-5 text-blue-500" /> Text Overlay
                        </h4>
                        <div className="inline-block bg-slate-900 dark:bg-black text-white font-black text-2xl tracking-tight px-4 py-2 rounded-lg transform -rotate-2 border border-slate-700">
                          {concept.textOverlay}
                        </div>
                      </div>
                    </div>

                    {/* Why it works & Actions */}
                    <div className="md:w-1/3 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full mb-2">
                          Why it gets clicks
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {concept.whyItWorks}
                        </p>
                      </div>

                      <button
                        onClick={() => copy(`Visual: ${concept.visual}\nText: ${concept.textOverlay}\nPsychology: ${concept.whyItWorks}`, `concept-${idx}`)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-sm font-medium"
                      >
                        {copiedStates[`concept-${idx}`] ? <><CheckCircle2 className="w-4 h-4 text-green-500" /> Copied Prompt</> : <><Copy className="w-4 h-4" /> Copy Concept</>}
                      </button>
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
