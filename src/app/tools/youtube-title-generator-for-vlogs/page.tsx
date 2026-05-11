import type { Metadata } from 'next';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Vlogs | FreeViralKit',
  description:
    'Create better YouTube vlog titles for daily vlogs, travel videos, and lifestyle content. Free AI-powered title ideas for higher CTR.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-vlogs'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Vlogs | FreeViralKit',
    description:
      'Generate vlog-focused YouTube title ideas that attract clicks naturally.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-vlogs'),
  },
};

const examples = [
  'A Realistic Day in My Life as a College Student',
  'Solo Trip to Manali - What Nobody Tells You',
  'My Productive Sunday Routine (Simple and Sustainable)',
  'I Tried Waking Up at 5AM for 7 Days - Honest Results',
];

export default function VlogTitleLandingPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          YouTube Title Generator for <span className="text-gradient">Vlogs</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Make relatable vlog titles for daily routines, travel experiences, and personal updates.
        </p>
      </section>

      <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">Vlog Title Examples</h2>
        <ul className="space-y-2 text-slate-700">
          {examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <InContentAd slot={adSlots.vlogLanding} />

      <section className="glass-card rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="font-display text-xl font-semibold mb-3">How to Improve Vlog Title CTR</h2>
        <ul className="space-y-2 text-slate-600">
          <li>Lead with emotion or transformation.</li>
          <li>Be specific with time, place, or challenge.</li>
          <li>Avoid generic words like daily vlog without a hook.</li>
        </ul>
        <div className="mt-6">
          <Link href="/youtube-title-generator" className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold">
            Generate Vlog Titles
          </Link>
        </div>
      </section>
    </main>
  );
}
