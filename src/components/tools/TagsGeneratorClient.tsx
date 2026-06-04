'use client';

import { useState } from 'react';
import { generateTagsOnly } from '@/app/actions/tags';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

interface TagsGeneratorClientProps {
  niche?: string;
}

export default function TagsGeneratorClient({ niche }: TagsGeneratorClientProps) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate ? tags : [];
    setTags([]);
    setError(null);
    const result = await generateTagsOnly(inputVal, exclude, niche);
    if (result.success && result.tags) setTags(result.tags);
    else setError(result.error || 'Failed to generate tags');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const tagsTotalChars = tags.join(', ').length;
  const getExamples = () => {
    if (niche === 'gaming') return ['Minecraft Let\'s Play', 'Valorant Highlights', 'Roblox Tutorial', 'GTA 6 Trailer Reaction'];
    return ['Unboxing Tech', 'Python Guide', 'Beginner Yoga', 'Minecraft Build'];
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder={niche ? `Enter your ${niche} video topic or title...` : "Enter your video topic or title (e.g. how to code in javascript, diy projects...)"}
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
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Tags...</> : <><Sparkles className="w-5 h-5" /> Generate Tags</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold">🏷️ Your Tags</h2>
                <button onClick={() => handleGenerate(undefined, true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                </button>
              </div>
              <button onClick={() => copy(tags.join(', '), 'all-tags')} className="copy-btn cursor-pointer">
                {copiedStates['all-tags'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
              </button>
            </div>
            {/* Character limit bar */}
            <div className="mb-4 bg-slate-100 rounded-lg p-3 border border-slate-100">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600">Tag characters used</span>
                <span className={tagsTotalChars <= 500 ? 'text-green-400' : 'text-red-400'}>{tagsTotalChars} / 500</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${tagsTotalChars <= 400 ? 'bg-green-500' : tagsTotalChars <= 500 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min((tagsTotalChars / 500) * 100, 100)}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, idx) => (
                <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}
                  onClick={() => copy(tag, `tag-${idx}`)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-medium hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-pointer">
                  {copiedStates[`tag-${idx}`] ? <span className="text-green-400">✓</span> : tag}
                </motion.button>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
              <h4 className="font-display font-semibold text-cyan-500 mb-1 flex items-center gap-1.5">
                💡 Pro Tip: Tag Priority Order
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Put your main target focus keyword as the first tag. YouTube weighs early tags slightly higher in search categorization. Keep tags relevant and avoid generic words.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
