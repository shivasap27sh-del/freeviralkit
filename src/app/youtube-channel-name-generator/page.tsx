'use client';

import ChannelNameGeneratorClient from '@/components/tools/ChannelNameGeneratorClient';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';

export default function ChannelNameGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <User className="w-4 h-4" /> AI Channel Name Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Channel Name Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate 15 creative, memorable YouTube channel name ideas matching your niche. Categorized for easy selection.
        </p>
      </section>

      <ChannelNameGeneratorClient />



      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Choose a YouTube Channel Name</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>
            Your YouTube channel name represents your entire brand. It is the first thing viewers see when your video appears in search results or on their home feed, alongside your thumbnail.
          </p>
          <p>
            A perfect channel name should match your content category, be simple and memorable, and have clean pronunciation so viewers can share it by word-of-mouth. Our AI channel name generator uses proven branding frameworks to suggest names that work.
          </p>
        </div>
        <h3 className="font-display text-xl font-bold">Types of YouTube Channel Names</h3>
        <ul className="space-y-4 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Personal Brand:</strong> Using your own name (e.g. <i>MKBHD</i>, <i>MrBeast</i>). Best for personality-driven vlogs, tutorials, or consulting channels.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Topic/Niche Specific:</strong> Incorporating keywords directly (e.g. <i>5-Minute Crafts</i>, <i>TechGamer</i>). Best for SEO ranking and immediately conveying what your channel is about.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Brandable / Abstract:</strong> Short, energetic, and completely unique words (e.g. <i>Vevo</i>, <i>Smosh</i>). Easy to scale into a bigger business.
            </span>
          </li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Ready to optimize your channel metadata? Generate tags, titles, and descriptions all in one place.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full SEO Optimizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
