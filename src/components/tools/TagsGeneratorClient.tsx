'use client';

import { useState } from 'react';
import { generateTagsOnly } from '@/app/actions/tags';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, RotateCcw, Tag } from 'lucide-react';
import ToolWorkspace from './ToolWorkspace';

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
    <ToolWorkspace
      topic={topic}
      setTopic={setTopic}
      placeholder={niche ? `Enter your ${niche} video topic or title...` : "Enter your video topic or title (e.g. how to code in javascript, diy projects...)"}
      examples={getExamples()}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
      error={error}
      onClearError={() => setError(null)}
      buttonText="Generate Tags"
      generatingText="Generating Tags..."
      icon={<Tag className="w-5 h-5" />}
    >
      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold">🏷️ Your Tags</h2>
                <button onClick={() => handleGenerate(undefined, true)} aria-label="Regenerate tags" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                </button>
              </div>
              <button onClick={() => copy(tags.join(', '), 'all-tags')} aria-label="Copy all tags" className="copy-btn cursor-pointer">
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
                  aria-label="Copy tag"
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-medium hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-pointer">
                  {copiedStates[`tag-${idx}`] ? <span className="text-green-400">✓</span> : tag}
                </motion.button>
              ))}
            </div>
            {/* Pro Tip */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-cyan-500 mb-1 flex items-center gap-1.5">💡 Pro Tip: Tag Priority Order</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Put your main target focus keyword as the first tag. YouTube weighs early tags slightly higher in search categorization. Keep tags relevant and avoid generic words.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolWorkspace>
  );
}
