'use client';

import { useState } from 'react';
import { generateTagsOnly } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Copy, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

export default function TagsGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setTags([]);
    const result = await generateTagsOnly(topic);
    if (result.success && result.tags) setTags(result.tags);
    else alert(result.error || 'Failed to generate tags');
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

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
          <Tag className="w-4 h-4" /> AI Tag Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Tags Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate 20-25 SEO-optimized tags mixing exact match, broad, and long-tail keywords. Stays under YouTube&apos;s 500 character limit.
        </p>
      </section>

      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic or title..."
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        <button onClick={handleGenerate} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Tags...</> : <><Sparkles className="w-5 h-5" /> Generate Tags</>}
        </button>
      </div>

      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">🏷️ Your Tags</h2>
              <button onClick={() => copy(tags.join(', '), 'all-tags')} className="copy-btn">
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
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}
                  onClick={() => copy(tag, `tag-${idx}`)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-pointer">
                  {copiedStates[`tag-${idx}`] ? <span className="text-green-400">✓</span> : tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.tagsBottom} />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why YouTube Tags Still Matter</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>While YouTube has said tags are a minor ranking factor, they still play a key role in <strong className="text-slate-900">helping the algorithm categorize your content</strong> and serving it to the right audience through related/suggested videos.</p>
          <p>Tags also help you rank for misspelled search queries and appear in YouTube&apos;s &quot;related videos&quot; sidebar — which accounts for a massive portion of views on the platform.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Tag Strategy Tips</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span>Put your most important tags first</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span>Stay under 500 characters total</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span>Mix single keywords with multi-word search phrases</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span>Include common misspellings of your topic</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span>All tags should be lowercase, no # symbols</span></li>
        </ul>
        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Need titles, descriptions, and hashtags too?</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">Try Full SEO Optimizer →</Link>
        </div>
      </section>
    </main>
  );
}
