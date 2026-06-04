import type { Metadata } from 'next';
import ChapterGeneratorClient from '@/components/tools/ChapterGeneratorClient';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Chapter Generator - Auto Timestamps | FreeViralKit',
  description: 'Automatically generate YouTube video chapters and timestamps from your script or outline. Boost your video SEO with our free AI tool.',
  openGraph: {
    title: 'YouTube Chapter Generator - Auto Timestamps Free',
    description: 'Boost your video SEO! Automatically generate YouTube video chapters and timestamps from your script or outline.',
    type: 'website',
  },
};

export default function ChapterGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 mb-6 uppercase tracking-wider">
          <Clock className="w-4 h-4" /> AI Chapter Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube Chapter Generator — <span className="text-gradient">Automate Timestamps</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          YouTube chapters improve user experience and boost your video's search ranking on Google. Paste your script or bullet points below, and our AI will automatically generate perfectly formatted timestamps for your description.
        </p>
      </section>

      <ChapterGeneratorClient />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why Are YouTube Chapters Important for SEO?</h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>
            Adding chapters (timestamps) to your YouTube videos is one of the easiest and most effective ways to improve your video SEO. When you add chapters, YouTube divides your video progress bar into clear sections, allowing viewers to skip to the exact information they want.
          </p>
          <p>
            But more importantly, <strong>Google Search indexes YouTube chapters</strong>. If someone searches for a specific question on Google, and your video has a chapter answering that exact question, Google will often display your video directly in the search results, cued up to that exact timestamp. This is a massive source of external organic traffic.
          </p>
        </div>
        
        <h3 className="font-display text-xl font-bold mt-8">How to Use the Timestamp Generator</h3>
        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span><strong>Paste Your Script:</strong> Drop your entire video script, or just a rough outline of the topics you covered in your video.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span><strong>Generate:</strong> The AI will analyze the text, group logical sections together, and generate concise, keyword-rich chapter titles.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span><strong>Copy to Description:</strong> Copy the list of timestamps and paste them anywhere in your YouTube video description. Make sure the first timestamp remains exactly <code>00:00</code>.</span>
          </li>
        </ul>

        <h3 className="font-display text-xl font-bold mt-8">YouTube Chapter Formatting Rules</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          If your chapters aren't showing up on your video, ensure you meet YouTube's strict formatting requirements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
          <li>The first chapter MUST start at exactly <strong>00:00</strong>.</li>
          <li>You must have at least <strong>three (3)</strong> timestamps listed in chronological order.</li>
          <li>Each individual chapter must be at least <strong>10 seconds</strong> long.</li>
          <li>Your channel must not have any active community guideline strikes.</li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center mt-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Need help writing the rest of the description?</p>
          <Link href="/youtube-description-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Use the Full Description Generator →
          </Link>
        </div>
      </section>
    </main>
  );
}
