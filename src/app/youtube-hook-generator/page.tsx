import type { Metadata } from 'next';
import HookGeneratorClient from '@/components/tools/HookGeneratorClient';
import { Target } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Hook Generator - AI Script Hooks | FreeViralKit',
  description: 'Generate high-retention YouTube video hooks instantly with our free AI tool. Hook your viewers in the first 5 seconds to increase watch time and views.',
  openGraph: {
    title: 'YouTube Hook Generator - Get 5 AI Script Hooks Free',
    description: 'Keep your viewers watching! Generate high-retention YouTube video hooks instantly with our free AI tool.',
    type: 'website',
  },
};

export default function HookGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-6 uppercase tracking-wider">
          <Target className="w-4 h-4" /> AI Hook Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube Hook Generator — <span className="text-gradient">Grab Attention Instantly</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          The first 5 seconds of your video determine if viewers stay or scroll away. Enter your video topic and generate 5 highly engaging, retention-optimized script hooks instantly.
        </p>
      </section>

      <HookGeneratorClient />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why Your YouTube Hook Matters</h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>
            You can have the best thumbnail and the perfect title, but if your intro doesn't immediately grab the viewer's attention, your Audience Retention graph will tank in the first 30 seconds.
          </p>
          <p>
            A strong hook sets the expectations, opens a curiosity loop, or creates an emotional connection. Our <strong>YouTube hook generator</strong> uses proven psychological triggers to craft the perfect first sentence for your script.
          </p>
        </div>
        
        <h3 className="font-display text-xl font-bold mt-8">Types of High-Retention Hooks</h3>
        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span><strong>The Curiosity Loop:</strong> "I spent 30 days doing X, and you won't believe what happened on day 12."</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span><strong>The Problem/Agitation:</strong> "If you're struggling to get views, you are probably making this one fatal mistake."</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span><strong>The Direct Value:</strong> "In the next 5 minutes, I'm going to show you exactly how to double your income."</span>
          </li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center mt-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Want the entire video scripted for you?</p>
          <Link href="/youtube-script-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full Script Generator →
          </Link>
        </div>
      </section>
    </main>
  );
}
