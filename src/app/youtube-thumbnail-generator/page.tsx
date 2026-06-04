import type { Metadata } from 'next';
import ThumbnailGeneratorClient from '@/components/tools/ThumbnailGeneratorClient';
import { Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Idea Generator - CTR Boost | FreeViralKit',
  description: 'Generate high-CTR YouTube thumbnail concepts and ideas instantly. Get psychological visual layouts and text overlays to maximize clicks.',
  openGraph: {
    title: 'YouTube Thumbnail Idea Generator - Maximize CTR',
    description: 'Stop guessing what makes a good thumbnail. Get 3 high-converting visual concepts based on psychology and contrast.',
    type: 'website',
  },
};

export default function ThumbnailGeneratorPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 mb-6 uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" /> AI Thumbnail Concepts
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube Thumbnail Idea Generator — <span className="text-gradient">Maximize Your CTR</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          The best thumbnails tell a visual story and invoke curiosity. Enter your video topic, and our AI will generate 3 proven thumbnail concepts, including the exact text overlay to use.
        </p>
      </section>

      <ThumbnailGeneratorClient />

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">The Anatomy of a Viral YouTube Thumbnail</h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>
            Your thumbnail is arguably the most important part of your video. If nobody clicks, nobody watches. A common mistake new creators make is just taking a screenshot of their video and slapping their exact video title on it as text. <strong>This does not work.</strong>
          </p>
          <p>
            Our YouTube Thumbnail Idea generator uses data-backed psychology to give you visual layouts that create <em>contrast</em>, <em>emotion</em>, and <em>curiosity</em>. We separate the concept into two parts: the visual background, and the text overlay.
          </p>
        </div>
        
        <h3 className="font-display text-xl font-bold mt-8">Golden Rules for Thumbnail Text</h3>
        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong>Under 5 Words:</strong> Most people browse YouTube on their phones. If your thumbnail text is a full sentence, it will be completely unreadable on a 6-inch screen.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong>Complement, Don't Repeat:</strong> Your thumbnail text should <em>add</em> context to your title, not just repeat it. If the title is "How to bake a cake", the thumbnail text should be "I made a mistake!"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong>High Contrast Colors:</strong> Use opposing colors on the color wheel (like Yellow and Purple, or Red and Green) to make your text pop off the background.</span>
          </li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center mt-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">You have the thumbnail, now you need the title.</p>
          <Link href="/youtube-title-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Use the Viral Title Generator →
          </Link>
        </div>
      </section>
    </main>
  );
}
