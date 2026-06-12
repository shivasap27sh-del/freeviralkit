'use client';

import { useState } from 'react';
import { generateChapters, type Chapter } from '@/app/actions/chapters';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, Loader2, Sparkles, Clock } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

export default function ChapterGeneratorClient() {
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!script.trim()) return;
    setIsGenerating(true);
    setChapters([]);
    setError(null);
    const result = await generateChapters(script);
    if (result.success && result.chapters) setChapters(result.chapters);
    else setError(result.error || 'Failed to generate chapters');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const formattedText = chapters.map(c => `${c.timestamp} ${c.title}`).join('\n');

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-6">
          <textarea 
            value={script} 
            onChange={e => setScript(e.target.value)}
            placeholder="Paste your video script, transcript, or bullet-point outline here..."
            className="w-full h-48 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-base resize-none"
          />
        </div>

        <button onClick={handleGenerate} disabled={!script.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Script...</> : <><Sparkles className="w-5 h-5" /> Generate Chapters</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {chapters.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="font-display text-xl font-semibold">Your Video Chapters</h2>
              <button onClick={() => copy(formattedText, 'all-chapters')} className="copy-btn cursor-pointer">
                {copiedStates['all-chapters'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" /> Copy All for YouTube</>}
              </button>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8">
              <pre className="text-slate-800 dark:text-slate-200 font-medium text-lg leading-relaxed whitespace-pre-wrap font-mono">
                {formattedText}
              </pre>
            </div>
            
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 mt-6">
              <h4 className="font-display font-semibold text-indigo-500 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> How to Use These Chapters
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Copy and paste the list above directly into your YouTube video description. YouTube requires the first chapter to be exactly <strong>00:00</strong> and for there to be at least 3 chapters in ascending order for them to display on the video timeline.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
