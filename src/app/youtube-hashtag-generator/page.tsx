'use client';

import { useState } from 'react';
import { generateHashtagsOnly } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Copy, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setHashtags([]);
    const result = await generateHashtagsOnly(topic);
    if (result.success && result.hashtags) setHashtags(result.hashtags);
    else alert(result.error || 'Failed to generate hashtags');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-400/20 mb-6 uppercase tracking-wider">
          <Hash className="w-4 h-4" /> AI Hashtag Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Hashtag Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate trending, niche-specific YouTube hashtags ranked by traffic potential. The first 3 appear above your video title.
        </p>
      </section>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic or title..."
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        <button onClick={handleGenerate} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Hashtags...</> : <><Sparkles className="w-5 h-5" /> Generate Hashtags</>}
        </button>
      </motion.div>

      <AnimatePresence>
        {hashtags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold"># Your Hashtags</h2>
              <button onClick={() => copy(hashtags.join(' '), 'all-ht')} className="copy-btn">
                {copiedStates['all-ht'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">⭐ First 3 (marked TOP) appear above your video title on YouTube</p>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((ht, idx) => (
                <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}
                  onClick={() => copy(ht, `ht-${idx}`)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105 cursor-pointer ${
                    idx < 3 ? 'bg-pink-500/15 border border-pink-500/30 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}>
                  {copiedStates[`ht-${idx}`] ? <span className="text-green-400">Copied!</span> : (ht.startsWith('#') ? ht : `#${ht}`)}
                  {idx < 3 && <span className="ml-2 text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full">TOP</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.hashtagBottom} />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How YouTube Hashtags Work</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>YouTube hashtags are clickable tags that help categorize your video and boost discoverability. When you add hashtags to your description, the <strong className="text-slate-900">first 3 hashtags appear as clickable links above your video title</strong> — prime real estate.</p>
          <p>Using the right mix of high-traffic broad hashtags and niche-specific ones can significantly increase your video&apos;s reach in search and suggested videos.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Hashtag Best Practices</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span>Use 8-15 hashtags per video for optimal results</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span>Put your 3 strongest hashtags first — they show above the title</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span>Use CamelCase for multi-word hashtags (#HowToCook)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span>Mix popular and niche-specific hashtags</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span>Never use irrelevant trending hashtags</span></li>
        </ul>
        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Want the complete SEO package? Get titles + descriptions + hashtags + tags.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">Try Full SEO Optimizer →</Link>
        </div>
      </section>
    </main>
  );
}
