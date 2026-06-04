'use client';

import DescriptionGeneratorClient from '@/components/tools/DescriptionGeneratorClient';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignLeft, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, Eye, Award, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';

export default function DescriptionGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 mb-6 uppercase tracking-wider">
          <AlignLeft className="w-4 h-4" /> AI Description Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Description Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate SEO-optimized YouTube descriptions with proper keyword placement, calls-to-action, and hashtags. Instantly.
        </p>
      </section>

      <DescriptionGeneratorClient />


      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why YouTube Descriptions Matter for SEO</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Your video description is one of the most powerful — and most overlooked — SEO tools on YouTube. The algorithm reads your entire description to understand your content, and the <strong className="text-slate-900">first 150 characters appear in search results</strong>.</p>
          <p>A well-optimized description with natural keyword placement, timestamps, and calls-to-action can dramatically improve your video&apos;s ranking in both YouTube and Google search.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Description Writing Tips</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Front-load your primary keyword in the first 25 words</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Write at least 200 words for maximum SEO benefit</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Include timestamps for key sections</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Add a clear call-to-action (like, subscribe, comment)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span>Place 3-5 hashtags at the end of the description</span></li>
        </ul>
        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Need titles, hashtags, and tags too?</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">Try Full SEO Optimizer →</Link>
        </div>
      </section>
    </main>
  );
}
