'use client';

import { useState } from 'react';
import { generateHooks } from '@/app/actions/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

export default function HookGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate ? hooks : [];
    setHooks([]);
    setError(null);
    const result = await generateHooks(inputVal, exclude);
    if (result.success && result.hooks) setHooks(result.hooks);
    else setError(result.error || 'Failed to generate hooks');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const examples = ['Why you should learn Rust in 2026', 'My morning routine as a millionaire', 'How to fix back pain fast'];

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic (e.g., how to code in javascript, diy room decor...)"
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
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
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Hooks...</> : <><Sparkles className="w-5 h-5" /> Generate Hooks</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {hooks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xl font-semibold">Your Video Hooks</h2>
              <div className="flex gap-2">
                <button onClick={() => handleGenerate(undefined, true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                </button>
                <button onClick={() => copy(hooks.join('\n\n'), 'all-hooks')} className="copy-btn cursor-pointer">
                  {copiedStates['all-hooks'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" /> Copy All</>}
                </button>
              </div>
            </div>

            {hooks.map((hook, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all flex gap-4"
              >
                <div className="flex-1">
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-lg leading-relaxed">{hook}</p>
                </div>
                <button
                  onClick={() => copy(hook, `hook-${idx}`)}
                  className="p-2 h-fit rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer shrink-0"
                >
                  {copiedStates[`hook-${idx}`] ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
