'use client';

import TagsGeneratorClient from '@/components/tools/TagsGeneratorClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';

export default function TagsGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
          <Tag className="w-4 h-4" /> AI Tag Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube Tag Generator — <span className="text-gradient">Get 20+ SEO Tags Instantly</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          The best free YouTube tag generator powered by AI. Enter your video topic and instantly get 20-25 highly relevant, SEO-optimized tags formatted perfectly for YouTube Studio. No account needed, completely free.
        </p>
      </section>

      <TagsGeneratorClient />


      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why YouTube Tags Still Matter</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>If you&apos;re looking for a <strong>youtube tag generator free</strong> of charge, you already know that tags matter. While YouTube has said tags are a minor ranking factor, they still play a key role in <strong className="text-slate-900">helping the algorithm categorize your content</strong> and serving it to the right audience through related/suggested videos.</p>
          <p>Our <strong>free tag generator for youtube</strong> ensures you use the right keywords. Tags help you rank for misspelled search queries and appear in YouTube&apos;s &quot;related videos&quot; sidebar — which accounts for a massive portion of views on the platform. Using a dedicated <strong>youtube tags generator</strong> is the fastest way to get them.</p>
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
