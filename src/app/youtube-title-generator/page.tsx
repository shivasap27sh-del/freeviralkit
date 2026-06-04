'use client';

import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

export default function TitleGeneratorPage() {

  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Title Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Title Generator</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Powered by AI — crafted for every niche.
        </p>
      </section>

      <TitleGeneratorClient />

      <InContentAd slot={adSlots.titleBottom} />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Write the Perfect YouTube Title</h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>Your YouTube title is the most important ranking factor for your videos. It determines whether viewers click on your video in search results, suggested videos, and their home feed.</p>
          <p>A great YouTube title should be <strong className="text-slate-900 dark:text-white">50-70 characters</strong>, include your primary keyword, use power words that trigger curiosity, and match the search intent of your target audience.</p>
          <p>Our AI YouTube title generator analyzes your topic, detects the niche, and creates 10 unique titles using proven formats that real successful creators use — not generic clickbait.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Tips for YouTube Titles That Get Clicks</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Include your main keyword in the first 50 characters</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Use numbers and specific details (e.g. &quot;in 5 minutes&quot;)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Add 1-2 relevant emojis to increase CTR by up to 33%</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Append 1-2 hashtags at the end for discoverability</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Avoid misleading clickbait — it hurts watch time</span></li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Need the full SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full SEO Optimizer →
          </Link>
        </div>
      </section>
    </main>
  );
}
