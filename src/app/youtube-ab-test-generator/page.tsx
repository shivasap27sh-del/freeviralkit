import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import ABTestGeneratorClient from '@/components/tools/ABTestGeneratorClient';
import RelatedTools from '@/components/RelatedTools';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube 3-Way A/B Test Pack Generator & Packaging Simulator | FreeViralKit',
    description: 'Free AI YouTube A/B Test Pack Generator for YouTube Studio Test & Compare. Generate 3 distinct title & thumbnail variants with live mobile feed simulation.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube 3-Way A/B Test Pack Generator — YouTube Studio Test & Compare Tool',
  description:
    'Free AI YouTube A/B Test Pack Generator. Create 3 distinct strategic title & thumbnail combinations formatted for YouTube Studio Test & Compare with live mobile feed simulation.',
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-ab-test-generator'),
  },
  openGraph: {
    title: 'YouTube 3-Way A/B Test Pack Generator & Packaging Simulator',
    description:
      'Generate 3 distinct title & thumbnail packaging angles for YouTube Studio A/B testing. 100% free with live mobile feed preview simulator.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-ab-test-generator'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit YouTube A/B Test Generator',
      },
    ],
  },
  keywords: [
    'youtube ab test generator',
    'youtube test and compare generator',
    'youtube title ab testing',
    'youtube thumbnail ab test generator',
    'youtube packaging tester',
    'youtube mobile feed preview simulator',
    'youtube ctr optimizer',
    'free youtube ab testing tool',
  ],
};

const strategies = [
  {
    letter: 'A',
    name: 'Curiosity Gap & Unresolved Mystery',
    focus: 'Opens an intellectual question in the viewer’s mind that can only be resolved by watching the video.',
    formula: 'The [Hidden Truth / Secret Detail] About [Topic] Nobody Tells You',
    thumbnailIdea: 'Expressive creator gaze + 2–3 word bold text overlay ("HE HID THIS").',
  },
  {
    letter: 'B',
    name: 'Contrarian Challenge & Shock',
    focus: 'Challenges a widely held belief or warns the viewer against making a costly, common mistake.',
    formula: 'Why 99% of People [Action] Completely Wrong (And How to Fix It)',
    thumbnailIdea: 'High-contrast split screen comparing a failing method with a red X vs a green checkmark.',
  },
  {
    letter: 'C',
    name: 'Direct Transformation & Metric Proof',
    focus: 'Promises a tangible, quantified outcome or step-by-step masterclass within a specific timeframe.',
    formula: 'How I [Achieved Result] in [Specific Timeframe] (Full Blueprint)',
    thumbnailIdea: 'Clean upward green analytics curve + confident creator pose + bold metric ("0 TO 100K").',
  },
];

const rules = [
  {
    title: '1. Never Test Minor Cosmetic Variations',
    description:
      'Changing a font color from yellow to green or tweaking one word in your title rarely creates statistically significant results. YouTube’s algorithm requires structurally distinct angles (e.g. Curiosity vs Contrarian vs Transformation) to shift watch time share.',
  },
  {
    title: '2. Enforce the Anti-Duplication Packaging Rule',
    description:
      'Your thumbnail text should NEVER repeat your title word-for-word. If your title is "How Rolex Tricked the World", your thumbnail should say "THE SCAM" or "STATUS TRAP" — adding new emotional tension rather than repeating text.',
  },
  {
    title: '3. Respect the 45–65 Character Mobile Rule',
    description:
      'Over 75% of YouTube impressions happen on mobile devices where titles longer than 65 characters get truncated with an ellipsis (...). Keep your core tension visible on iPhone and Android screens.',
  },
  {
    title: '4. Prioritize Watch Time Share Over Pure CTR',
    description:
      'YouTube Studio’s native "Test & Compare" metric evaluates A/B tests based on Watch Time Share, not just initial clicks. Your winning thumbnail and title must deliver on their promise in the first 30 seconds of the video.',
  },
];

const faqs = [
  {
    question: 'What is YouTube Studio’s "Test & Compare" feature?',
    answer:
      'Test & Compare is YouTube’s native A/B testing tool built into YouTube Studio desktop. It allows creators with Advanced Features to upload up to 3 thumbnails or titles per video. YouTube rotates them across viewers and declares a winner based on total watch time share.',
  },
  {
    question: 'How many variations should I test on YouTube?',
    answer:
      'Testing exactly 3 variations gives you the fastest statistical certainty. We recommend testing: Variant A (High Curiosity), Variant B (Contrarian/Challenge), and Variant C (Direct Value/Transformation).',
  },
  {
    question: 'Why does thumbnail text need to be different from the title?',
    answer:
      'Viewers process visual thumbnails in under 13 milliseconds before reading the title. When thumbnail text complements the title by adding a second layer of curiosity (rather than repeating it), overall click-through rate increases by up to 34%.',
  },
  {
    question: 'Is this YouTube A/B Test Pack Generator really free?',
    answer:
      'Yes! FreeViralKit provides unlimited 3-way A/B test pack generations with zero login, no subscriptions, and no credit card required.',
  },
];

export default function ABTestGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube 3-Way A/B Test Pack Generator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free AI YouTube A/B Test Pack Generator for YouTube Studio Test & Compare. Generate 3 distinct title & thumbnail variants with live mobile feed simulation.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-4 uppercase tracking-widest font-mono">
            ⚡ YouTube Studio Test &amp; Compare Suite
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            YouTube 3-Way <span className="text-gradient">A/B Test Pack Generator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Generate 3 strategically distinct packaging combinations (Title + 3-Word Thumbnail Text + Visual Blueprint) formatted specifically for YouTube Studio&apos;s native A/B testing engine.
          </p>
        </section>

        {/* Interactive Workspace Component */}
        <ABTestGeneratorClient />

        {/* Deep Dive Strategy: The 3 A/B Testing Archetypes */}
        <section className="mt-20 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              The 3 Strategic Packaging Angles Every Video Needs
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Why YouTube Studio’s algorithm rewards testing completely different psychological triggers rather than minor cosmetic tweaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((st, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm mb-3">
                    {st.letter}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {st.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {st.focus}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-slate-900/60 text-slate-300">
                    <span className="text-slate-500 block text-[9px] uppercase">Title Formula:</span>
                    {st.formula}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 text-amber-300">
                    <span className="text-slate-500 block text-[9px] uppercase">Thumbnail Strategy:</span>
                    {st.thumbnailIdea}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Golden Rules for YouTube A/B Testing */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            The 4 Golden Rules of YouTube A/B Testing in 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rules.map((r, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools Carousel */}
        <RelatedTools currentToolPath="/youtube-ab-test-generator" />

        {/* Bottom CTA */}
        <section className="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Need Full Video Descriptions &amp; Tags Too?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
            Get your titles, descriptions with timestamps, 4-tier tags, and hashtags all in one click on our homepage.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
          >
            Go to Full YouTube Suite 🚀
          </Link>
        </section>
      </main>
    </>
  );
}
