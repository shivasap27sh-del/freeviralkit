'use client';

import { useState } from 'react';
import { generateHashtagsOnly } from '@/app/actions/hashtags';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

interface HashtagGeneratorClientProps {
  niche?: string;
}

export default function HashtagGeneratorClient({ niche }: HashtagGeneratorClientProps) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate ? hashtags : [];
    setHashtags([]);
    setError(null);
    const result = await generateHashtagsOnly(inputVal, exclude, niche);
    if (result.success && result.hashtags) setHashtags(result.hashtags);
    else setError(result.error || 'Failed to generate hashtags');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const defaultExamples = ['Healthy Diet', 'Gaming Setup', 'Travel Vlog', 'Personal Finance'];
  const getExamples = () => {
    if (niche === 'shorts') return ['Funny Moment', 'Life Hack', 'Quick Tips', 'Challenge'];
    // could add more niche examples if desired
    return defaultExamples;
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder={niche ? `Enter your ${niche} video topic...` : "Enter your video topic or title (e.g. vegan chocolate cake, fortnite gameplay...)"}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        
        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {getExamples().map(ex => (
            <button
              key={ex}
              onClick={() => {
                setTopic(ex);
                handleGenerate(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        <button onClick={() => handleGenerate()} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Hashtags...</> : <><Sparkles className="w-5 h-5" /> Generate Hashtags</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {hashtags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold"># Your Hashtags</h2>
                <button onClick={() => handleGenerate(undefined, true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                </button>
              </div>
              <button onClick={() => copy(hashtags.join(' '), 'all-ht')} aria-label="Copy all hashtags" className="copy-btn cursor-pointer">
                {copiedStates['all-ht'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">⭐ First 3 (marked TOP) appear above your video title on YouTube</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {hashtags.map((ht, idx) => (
                <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}
                  onClick={() => copy(ht, `ht-${idx}`)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105 cursor-pointer ${
                    idx < 3 ? 'bg-pink-500/15 border border-pink-500/30 text-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}>
                  {copiedStates[`ht-${idx}`] ? <span className="text-green-600">Copied!</span> : (ht.startsWith('#') ? ht : `#${ht}`)}
                  {idx < 3 && <span className="ml-2 text-[10px] bg-pink-500/20 text-pink-600 px-1.5 py-0.5 rounded-full">TOP</span>}
                </motion.button>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-pink-600 mb-1 flex items-center gap-1.5">
                💡 Pro Tip: Place Top 3 in Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Always copy and place your top 3 hashtags at the very bottom of your video description. YouTube automatically displays these first 3 hashtags clickable directly above your video title, driving traffic from hashtag searches.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
