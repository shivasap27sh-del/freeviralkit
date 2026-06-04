'use client';

import HashtagGeneratorClient from '@/components/tools/HashtagGeneratorClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';

export default function HashtagGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-400/20 mb-6 uppercase tracking-wider">
          <Hash className="w-4 h-4" /> AI Hashtag Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube Hashtag Generator — <span className="text-gradient">Trending Hashtags Instantly</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate trending YouTube hashtags instantly with our free AI hashtag generator. Enter your video topic and get 15+ niche-specific hashtags ranked by traffic potential — completely free, no account required.
        </p>
      </section>

      <HashtagGeneratorClient />


      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How YouTube Hashtags Work</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Using a <strong>youtube hashtag generator free</strong> of charge is the best way to get the <strong>best hashtags for youtube</strong>. YouTube hashtags are clickable tags that help categorize your video and boost discoverability. When you add hashtags to your description, the <strong className="text-slate-900">first 3 hashtags appear as clickable links above your video title</strong> — prime real estate.</p>
          <p>Using the right mix of high-traffic broad hashtags and niche-specific ones from a <strong>youtube hashtags generator</strong> can significantly increase your video&apos;s reach in search and suggested videos.</p>
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
