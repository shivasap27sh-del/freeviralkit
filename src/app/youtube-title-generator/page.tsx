'use client';

import { useState } from 'react';
import { generateTitles } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setTitles([]);
    const result = await generateTitles(topic);
    if (result.success && result.titles) setTitles(result.titles);
    else alert(result.error || 'Failed to generate titles');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70 ? 'text-green-400' : len < 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Title Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Title Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Powered by AI — crafted for every niche.
        </p>
      </section>

      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic (e.g. how to edit videos, fitness routine, gaming tips...)"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        <button onClick={handleGenerate} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Titles...</> : <><Wand2 className="w-5 h-5" /> Generate 10 Titles</>}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {titles.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">Your Generated Titles</h2>
              <button onClick={handleGenerate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {titles.map((title, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3 group hover:bg-slate-50 transition-all">
                  <div className="w-7 h-7 rounded-full bg-purple-500 text-slate-900 flex items-center justify-center shrink-0 text-sm font-bold">{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[1.02rem] leading-snug">{title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-mono ${charColor(title.length)}`}>{title.length} chars</span>
                      {idx < 5 ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">SEO</span>
                      ) : idx < 8 ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">VIRAL</span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">TRENDING</span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => copy(title, `title-${idx}`)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-200 shrink-0">
                    {copiedStates[`title-${idx}`] ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  </button>
                </motion.div>
              ))}
            </div>
            <button onClick={() => copy(titles.join('\n'), 'all-titles')} className="mt-4 w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all">
              {copiedStates['all-titles'] ? '✓ All Titles Copied!' : 'Copy All Titles'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.titleBottom} />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Write the Perfect YouTube Title</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Your YouTube title is the most important ranking factor for your videos. It determines whether viewers click on your video in search results, suggested videos, and their home feed.</p>
          <p>A great YouTube title should be <strong className="text-slate-900">50-70 characters</strong>, include your primary keyword, use power words that trigger curiosity, and match the search intent of your target audience.</p>
          <p>Our AI YouTube title generator analyzes your topic, detects the niche, and creates 10 unique titles using proven formats that real successful creators use — not generic clickbait.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Tips for YouTube Titles That Get Clicks</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Include your main keyword in the first 50 characters</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Use numbers and specific details (e.g. &quot;in 5 minutes&quot;)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Add 1-2 relevant emojis to increase CTR by up to 33%</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Append 1-2 hashtags at the end for discoverability</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Avoid misleading clickbait — it hurts watch time</span></li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Need the full SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full SEO Optimizer →
          </Link>
        </div>
      </section>
    </main>
  );
}
