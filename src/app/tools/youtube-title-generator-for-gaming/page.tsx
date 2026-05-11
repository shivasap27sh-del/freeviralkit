import type { Metadata } from 'next';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Gaming | FreeViralKit',
  description:
    'Free YouTube title generator for gaming channels. Create click-worthy titles for gameplay, walkthroughs, reviews, and challenge videos.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-gaming'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Gaming | FreeViralKit',
    description:
      'Generate gaming YouTube titles that improve CTR and discoverability.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-gaming'),
  },
};

const examples = [
  'I Survived 100 Days in Hardcore Minecraft (No Mods)',
  'BGMI Sensitivity Settings That Instantly Improve Aim',
  'I Tried Every Weapon in GTA 5 - Here Is the Best One',
  'Top 10 Hidden Tricks in Roblox You Missed',
];

export default function GamingTitleLandingPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          YouTube Title Generator for <span className="text-gradient">Gaming</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Generate high-CTR gaming titles for walkthroughs, shorts, ranked gameplay, and tutorial videos.
        </p>
      </section>

      <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">Gaming Title Examples</h2>
        <ul className="space-y-2 text-gray-300">
          {examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <InContentAd slot={adSlots.gamingLanding} />

      <section className="glass-card rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="font-display text-xl font-semibold mb-3">Best Practices for Gaming SEO Titles</h2>
        <ul className="space-y-2 text-gray-400">
          <li>Put game name near the start of the title.</li>
          <li>Use specific hooks like update version, challenge type, or rank tier.</li>
          <li>Keep titles around 50-70 characters for clean mobile visibility.</li>
        </ul>
        <div className="mt-6">
          <Link href="/youtube-title-generator" className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold">
            Open Full Title Generator
          </Link>
        </div>
      </section>
    </main>
  );
}
