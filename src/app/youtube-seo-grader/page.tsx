import type { Metadata } from 'next';
import SEOGraderClient from '@/components/tools/SEOGraderClient';
import { Activity } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube SEO Checker & Grader | FreeViralKit',
  description: 'Analyze your YouTube video title, description, and tags. Get an instant SEO score out of 100 with actionable feedback to rank higher on YouTube.',
  openGraph: {
    title: 'YouTube SEO Checker & Grader - Get Your Score',
    description: 'Stop guessing your SEO. Get an instant score out of 100 on your YouTube video metadata, plus actionable tips to rank higher.',
    type: 'website',
  },
};

export default function SEOGraderPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 mb-6 uppercase tracking-wider">
          <Activity className="w-4 h-4" /> SEO Score Grader
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube SEO Checker — <span className="text-gradient">Grade Your Video</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Paste your video's title, description, and tags to see how well it's optimized for the YouTube algorithm. Get an instant score and actionable feedback.
        </p>
      </section>

      <SEOGraderClient />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How is the YouTube SEO Score Calculated?</h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>
            The YouTube algorithm is a complex beast, but it primarily looks at a few key metadata points when a video is first published to decide who to show it to. Our <strong>YouTube SEO Checker</strong> analyzes the synergy between your Title, Description, and Tags.
          </p>
          <p>
            A high score (80+) means your metadata is highly aligned, making it incredibly easy for the algorithm to categorize your video and serve it to the right audience. A low score means your metadata is confusing or lacking crucial context.
          </p>
        </div>
        
        <h3 className="font-display text-xl font-bold mt-8">The 3 Pillars of YouTube Metadata</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg mb-2">1. The Title</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The title must balance SEO keywords with emotional, click-inducing human language. If it's too long, it gets cut off. If the keyword is at the end, it loses weight.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg mb-2">2. The Description</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The first two lines (above the "Show More" button) are critical. They must contain the main keyword. The rest should include chapters and relevant links.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg mb-2">3. The Tags</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              While less important today, tags help fix common spelling mistakes and associate your video with broader category terms.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Don't want to write it yourself?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/youtube-title-generator" className="btn-secondary rounded-xl px-6 py-3 font-semibold">
              Title Generator
            </Link>
            <Link href="/youtube-description-generator" className="btn-secondary rounded-xl px-6 py-3 font-semibold">
              Description Generator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
