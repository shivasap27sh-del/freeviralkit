import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for ASMR Channels | FreeViralKit',
    description: 'Free AI YouTube title generator for ASMR artists. Generate high-retention titles with sensory trigger tags, sleep keywords, and binaural audio formatting.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for ASMR Channels — Sensory & Sleep Titles',
  description:
    'Free AI YouTube title generator for ASMR creators. Create click-worthy titles for whispering, tapping, cranial nerve exams, and deep sleep triggers.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-asmr'),
  },
  openGraph: {
    title: 'YouTube Title Generator for ASMR Channels | FreeViralKit',
    description:
      'Generate soothing, high-CTR ASMR YouTube titles. Free AI tool for ASMRtists, roleplay creators, and relaxation channels.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-asmr'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit ASMR Title Generator',
      },
    ],
  },
  keywords: [
    'youtube title generator asmr',
    'asmr title ideas',
    'asmr video title generator',
    'asmr sleep title ideas',
    'asmr tapping titles',
    'binaural asmr titles',
    'asmr roleplay titles',
    'asmr youtube seo',
  ],
};

const examplesByCategory = [
  {
    category: 'Deep Sleep & Insomnia Relief',
    examples: [
      'ASMR for When You Cannot Sleep (Soft Whispers & Gentle Rain)',
      '1 Hour of Intense Brain Melting Tingles (Guaranteed Sleep)',
      'ASMR Sleep Therapy: Soft Tapping & Layered Breathing Sounds',
      'ASMR Deep Sleep Hypnosis: Slow Whispering & Ear-to-Ear Comfort',
    ],
  },
  {
    category: 'Sensory Triggers & No Talking',
    examples: [
      'ASMR Fast & Aggressive Tapping on 15 Objects [No Talking]',
      '3Dio Binaural Ear Cleaning & Tingles for Deep Relaxation',
      'ASMR Soap Carving & Fluffy Mic Brushing [Ultra Sensitive]',
      'Wood Tapping & Glass Scratching for Instant Tingles [1 Hour]',
    ],
  },
  {
    category: 'Roleplays & Personal Attention',
    examples: [
      'ASMR Real Person Cranial Nerve Exam (Close-up & Calming)',
      'ASMR Late Night Spa Treatment & Face Brushing Roleplay',
      'ASMR Scalp Massage & Hair Brushing for Instant Stress Relief',
      'ASMR Sleep Clinic Doctor Exam: Layered Whispers & Light Triggers',
    ],
  },
  {
    category: 'Lo-Fi & Aesthetic Ambience',
    examples: [
      'ASMR Rainy Night in Tokyo (Cozy Bedroom Ambience)',
      'ASMR Vintage Book Turning & Gentle Paper Sounds [Study with Me]',
      'Cozy Coffee Shop ASMR with Soft Keyboard Typing & Muffled Rain',
      'Midnight Cabin Fireplace ASMR: Crackling Wood & Distant Thunder',
    ],
  },
];

const caseStudies = [
  {
    creator: 'Gibi ASMR & Story Roleplays',
    strategy: 'The Personal Care Connection',
    breakdown:
      'Framing titles with comforting words ("Fixing You", "Taking Care of You", "Cranial Exam") establishes immediate emotional safety and leads to 40%+ Average Percentage Viewed (APV).',
  },
  {
    creator: 'ASMR Glow & Audio Stylists',
    strategy: 'High-Fidelity Audio Badges',
    breakdown:
      'Adding bracketed audio indicators like [Binaural 3Dio], [Ear-to-Ear], or [Layered Sounds] signals high acoustic fidelity to discerning headphone listeners.',
  },
  {
    creator: 'Deep Sleep & Lo-Fi Channels',
    strategy: 'The No-Talking Promise',
    breakdown:
      'Viewers using ASMR for sleep actively filter out spoken videos. Placing [No Talking] in brackets instantly captures high-retention overnight sleep traffic.',
  },
];

const tips = [
  {
    title: '1. Include Clear Trigger Tags in Brackets',
    description:
      'ASMR viewers search for exact tactile sensations. Always add specific tags at the end of the title like [No Talking], [Binaural 3Dio], [Whispered], or [1 Hour] to drastically boost CTR and reduce viewer drop-off.',
  },
  {
    title: '2. Promise Emotional Relief and Sleep Solutions',
    description:
      'Words like "Instant Sleep", "Brain Tingles", "Stress Relief", and "Insomnia Cure" directly target night-time search intent when viewers are actively trying to fall asleep.',
  },
  {
    title: '3. Highlight Microphone and Acoustic Specs',
    description:
      'Audiophile ASMR viewers search specifically for high-end binaural audio setups. Mentioning "3Dio", "Binaural", or "Ultra Sensitive Mic" builds immediate trust in audio quality.',
  },
  {
    title: '4. Front-load "ASMR" in the First Word',
    description:
      'Always start your title with "ASMR" so YouTube’s search and suggested algorithm immediately categorizes your video into the ASMR watch cluster.',
  },
  {
    title: '5. Calibrate Title Pacing with Video Duration',
    description:
      'For sleep videos, explicitly state the duration (e.g. "1 Hour", "3 Hours", "All Night") — sleep viewers prefer longer tracks they don’t have to manually restart.',
  },
  {
    title: '6. Maintain Calming Visual Tone',
    description:
      'Avoid jarring, loud capitalizations or screaming punctuation (!!!). Use soft, sensory, and welcoming phrasing.',
  },
];

const faqs = [
  {
    question: 'Should I include [No Talking] or [Whisper] in my ASMR title?',
    answer:
      'Yes, absolutely. The ASMR audience is strictly divided between viewers who want whispers and those who prefer no talking. Tagging this in your title drastically improves viewer satisfaction and watch time.',
  },
  {
    question: 'What is the optimal character length for ASMR YouTube titles?',
    answer:
      'Aim for 50 to 65 characters. This allows enough space for the primary trigger (e.g. "ASMR Cranial Nerve Exam") plus the bracketed audio tag (e.g. "[Binaural 3Dio]") without mobile truncation.',
  },
  {
    question: 'How do ASMR channels get long watch time on YouTube?',
    answer:
      'ASMR channels often achieve the highest Average View Duration on YouTube (often 20 to 45 minutes per view) because users leave them playing overnight. Accurate titles ensure viewers get the exact auditory experience they expect.',
  },
  {
    question: 'Can I generate ASMR titles in bulk for free?',
    answer:
      'Yes, FreeViralKit allows unlimited title generations without any login or subscription.',
  },
];

export default function ASMRTitleGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Title Generator for ASMR',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'AI YouTube title generator for ASMRtists and relaxation creators. Generate high-CTR titles with sensory triggers and sleep keywords.',
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

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4 uppercase tracking-widest">
            🎧 ASMR Creator Studio
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            YouTube Title Generator for <span className="text-gradient">ASMR Channels</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Create soothing, high-CTR YouTube titles formatted with sensory triggers, audio specs, and sleep-inducing keywords.
          </p>
        </section>

        {/* Interactive Tool Component */}
        <TitleGeneratorClient niche="ASMR & Relaxation" />

        {/* Curated Niche Title Formulas */}
        <section className="mt-16 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Proven ASMR Title Formulas & Formats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examplesByCategory.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-display text-base font-bold text-indigo-500 dark:text-indigo-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-700 dark:text-slate-300 bg-slate-100/60 dark:bg-slate-800/60 p-2.5 rounded-xl font-mono text-xs border border-slate-200/40 dark:border-slate-700/40"
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive: Top ASMR Channel Strategies */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            How Top ASMRtists Hook Sleep & Relaxation Audiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                    {cs.creator}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mt-3 mb-2">
                    {cs.strategy}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cs.breakdown}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practice Tips */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            The 6 Pillars of ASMR YouTube SEO in 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.description}
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

        {/* Bottom CTA */}
        <section className="text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Need Full ASMR Descriptions & Tags?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
            Generate timestamps, whisper trigger tags, and complete descriptions all in one click on our main tool.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
          >
            Go to Full YouTube Suite 🎧
          </Link>
        </section>
      </main>
    </>
  );
}
