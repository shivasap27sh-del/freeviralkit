'use client';

import { useState } from 'react';
import { generateDescriptionOnly } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignLeft, Copy, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';

export default function DescriptionGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setDescription('');
    const result = await generateDescriptionOnly(topic);
    if (result.success && result.description) setDescription(result.description);
    else alert(result.error || 'Failed to generate description');
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 mb-6 uppercase tracking-wider">
          <AlignLeft className="w-4 h-4" /> AI Description Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Description Generator</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Generate SEO-optimized YouTube descriptions with proper keyword placement, calls-to-action, and hashtags. Instantly.
        </p>
      </section>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic or title..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        <button onClick={handleGenerate} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Description...</> : <><Sparkles className="w-5 h-5" /> Generate Description</>}
        </button>
      </motion.div>

      <AnimatePresence>
        {description && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold">📝 Your Description</h2>
                <span className="text-xs text-gray-500">{description.split(/\s+/).length} words</span>
              </div>
              <button onClick={() => copy(description, 'desc')} className="copy-btn">
                {copiedStates['desc'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-gray-400" /> Copy</>}
              </button>
            </div>
            <div className="bg-black/30 rounded-xl p-5 border border-white/5">
              <p className="whitespace-pre-wrap text-gray-300 leading-relaxed text-[0.95rem]">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot="DESC_GEN_BOTTOM" />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why YouTube Descriptions Matter for SEO</h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          <p>Your video description is one of the most powerful — and most overlooked — SEO tools on YouTube. The algorithm reads your entire description to understand your content, and the <strong className="text-white">first 150 characters appear in search results</strong>.</p>
          <p>A well-optimized description with natural keyword placement, timestamps, and calls-to-action can dramatically improve your video&apos;s ranking in both YouTube and Google search.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Description Writing Tips</h3>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Front-load your primary keyword in the first 25 words</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Write at least 200 words for maximum SEO benefit</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Include timestamps for key sections</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Add a clear call-to-action (like, subscribe, comment)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Place 3-5 hashtags at the end of the description</span></li>
        </ul>
        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-gray-400 mb-4">Need titles, hashtags, and tags too?</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">Try Full SEO Optimizer →</Link>
        </div>
      </section>
    </main>
  );
}
