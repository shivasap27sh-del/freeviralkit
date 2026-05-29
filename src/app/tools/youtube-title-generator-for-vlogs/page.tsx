import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Vlogs | FreeViralKit',
  description:
    'Free AI-powered YouTube title generator for vloggers. Create click-worthy vlog titles for daily life, travel vlogs, lifestyle content, routines, and personal stories. Boost your vlog CTR.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-vlogs'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Vlogs | FreeViralKit',
    description:
      'Generate vlog-focused YouTube title ideas that attract clicks naturally. Free AI tool for vloggers.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-vlogs'),
  },
  keywords: [
    'youtube title generator vlogs',
    'vlog title ideas',
    'vlog title generator',
    'daily vlog titles',
    'travel vlog title ideas',
    'lifestyle vlog titles',
    'youtube vlog seo',
    'best vlog titles',
  ],
};

const examplesByCategory = [
  {
    category: 'Daily Life & Routine',
    examples: [
      'A Realistic Day in My Life as a College Student',
      'My Productive Sunday Routine (Simple and Sustainable)',
      'What I Actually Do in a Day Working From Home',
      'My Morning Routine That Changed Everything',
    ],
  },
  {
    category: 'Travel & Adventure',
    examples: [
      'Solo Trip to Manali — What Nobody Tells You',
      '48 Hours in Goa on a ₹5000 Budget',
      'I Visited the Most Underrated City in India',
      'Backpacking Southeast Asia — Week 1 Honest Review',
    ],
  },
  {
    category: 'Challenge & Experiment',
    examples: [
      'I Tried Waking Up at 5AM for 7 Days — Honest Results',
      'I Quit Social Media for 30 Days. Here\'s What Changed',
      'Living on ₹100 a Day for a Week (Is It Possible?)',
    ],
  },
  {
    category: 'Personal & Lifestyle',
    examples: [
      'Things I Stopped Buying to Save Money in My 20s',
      'Moving Into My First Apartment — Empty Apartment Tour',
      'How I Stay Motivated When Nothing Seems to Work',
    ],
  },
];

const tips = [
  {
    title: 'Lead with emotion or transformation',
    description:
      'Vlog titles that hint at a personal change or emotional journey outperform generic ones. "How Moving Cities Changed My Perspective" beats "I Moved to a New City".',
  },
  {
    title: 'Be specific with time, place, or challenge',
    description:
      'Specificity creates credibility and curiosity. "48 Hours in Goa on ₹5000" is far more compelling than "My Trip to Goa" because it sets clear expectations.',
  },
  {
    title: 'Avoid generic words without a hook',
    description:
      '"Daily Vlog #47" gives the viewer zero reason to click. Instead, highlight what makes THIS vlog different: "The Day Everything Went Wrong in Tokyo".',
  },
  {
    title: 'Use "I" and first-person language',
    description:
      'Vlogs are personal. Titles that start with "I tried...", "My experience...", or "How I..." feel more authentic and relatable than impersonal alternatives.',
  },
  {
    title: 'Create an information gap',
    description:
      'Make viewers NEED to know what happened. "I Quit My Job to Travel (Was It Worth It?)" creates a question the viewer can only answer by watching.',
  },
  {
    title: 'Add 1-2 emojis naturally',
    description:
      'A well-placed emoji adds visual contrast in a feed full of plain text titles. Don\'t overdo it — one or two is perfect for vlogs.',
  },
];

const faqs = [
  {
    question: 'What makes a good vlog title?',
    answer:
      'A good vlog title is personal, specific, and creates curiosity. It should hint at the story or experience in the video while giving viewers a clear reason to click. The best vlog titles use first-person language and mention specific details like location, time frame, or challenge.',
  },
  {
    question: 'How do I make my vlog titles more clickable?',
    answer:
      'To increase vlog title CTR, use emotional hooks, specific numbers or time frames, and create an information gap. Titles like "I Tried X for 30 Days" or "What Nobody Tells You About X" naturally generate curiosity and drive clicks.',
  },
  {
    question: 'Should vlog titles include keywords for SEO?',
    answer:
      'Yes. Including relevant keywords helps YouTube understand and recommend your vlog. For example, if your vlog is about a morning routine, include "morning routine" in the title so it appears in relevant searches.',
  },
  {
    question: 'How long should a vlog title be?',
    answer:
      'Keep vlog titles between 50-65 characters. Titles over 70 characters get truncated on mobile devices. Short, punchy titles work especially well for vlogs since the format is personal and conversational.',
  },
  {
    question: 'Is this vlog title generator free?',
    answer:
      'Yes! FreeViralKit is 100% free. No signup, no credit card, no hidden fees. Generate unlimited vlog title ideas powered by AI.',
  },
  {
    question: 'Can I use this for travel vlogs and daily vlogs?',
    answer:
      'Absolutely. The AI title generator works for all vlog types including daily vlogs, travel vlogs, lifestyle content, college vlogs, routine videos, moving vlogs, and personal story content.',
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'WebApplication',
      name: 'YouTube Title Generator for Vlogs — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-vlogs',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator specifically designed for vloggers. Generate optimized titles for daily vlogs, travel content, lifestyle videos, and personal stories.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function VlogTitleLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            YouTube Title Generator for <span className="text-gradient">Vlogs</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Make relatable, click-worthy vlog titles for daily routines, travel experiences, lifestyle content, and personal stories. Powered by AI, built for vloggers.
          </p>
          <Link
            href="/youtube-title-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Vlog Titles Free →
          </Link>
        </section>

        {/* Why vlog titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Vlog Title Is the Most Important Thing You Write
          </h2>
          <p className="text-slate-600 mb-4">
            Here&apos;s a truth most vloggers learn the hard way: you can spend 4 hours filming a beautiful vlog and 2 hours editing it, but if your title is &ldquo;Vlog #34&rdquo;, almost nobody will click. Your title is the entire sales pitch. Viewers decide in under 2 seconds whether your vlog is worth their time.
          </p>
          <p className="text-slate-600 mb-4">
            The best-performing vlog titles do three things: they&apos;re <strong className="text-slate-900">personal</strong> (using &ldquo;I&rdquo; and &ldquo;My&rdquo;), they&apos;re <strong className="text-slate-900">specific</strong> (mentioning a place, timeframe, or challenge), and they create <strong className="text-slate-900">curiosity</strong> (making viewers need to know what happened).
          </p>
          <p className="text-slate-600">
            Our AI title generator understands these patterns and creates vlog-specific titles that actually get clicked. Not generic, SEO-stuffed titles — real titles that feel authentic to the vlog format.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Vlog Titles</h2>
            <ul className="space-y-2 text-slate-700">
              {cat.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {example}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Best practices */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            How to Improve Your Vlog Title CTR
          </h2>
          <div className="space-y-5">
            {tips.map((tip, i) => (
              <div key={tip.title}>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {i + 1}. {tip.title}
                </h3>
                <p className="text-slate-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vlog title formulas */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            5 Proven Vlog Title Formulas
          </h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">&ldquo;I Tried [X] for [Time Period]&rdquo;</h3>
              <p className="text-sm">Perfect for challenge and experiment vlogs. The time commitment signals real effort and authentic results.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">&ldquo;A Day in My Life as a [Role]&rdquo;</h3>
              <p className="text-sm">Works great for routine and lifestyle content. Adding a specific role makes it relatable to that audience.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">&ldquo;[Time] in [Place] on [Budget]&rdquo;</h3>
              <p className="text-sm">Travel vlog gold. Specificity about time, location, and budget creates immediate value for potential travelers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">&ldquo;What Nobody Tells You About [Topic]&rdquo;</h3>
              <p className="text-sm">Creates an information gap that drives clicks. Implies insider knowledge the viewer can&apos;t get elsewhere.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">&ldquo;[Action] — Honest Results/Review&rdquo;</h3>
              <p className="text-sm">The word &ldquo;honest&rdquo; signals authenticity and builds trust. Viewers know they&apos;ll get a real perspective.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            How Our Vlog Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your vlog topic</strong> — describe what your vlog is about: a trip, routine, challenge, or personal story.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each crafted with vlog-specific hooks, personal language, and SEO keywords.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Copy and publish</strong> — pick your favorite and paste it directly into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-title-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Generate Vlog Titles Now
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Explore More YouTube SEO Tools
          </h2>
          <div className="space-y-3">
            <Link
              href="/tools/youtube-title-generator-for-gaming"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎮 Title Generator for Gaming</span>
              <p className="text-slate-600 text-sm mt-1">Generate click-worthy titles for gameplay, walkthroughs, and gaming challenges.</p>
            </Link>
            <Link
              href="/tools/youtube-description-generator-for-education"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📚 Description Generator for Education</span>
              <p className="text-slate-600 text-sm mt-1">Write structured educational descriptions with learning outcomes and CTAs.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate trending hashtags to boost your vlog discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube Titles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-titles-that-get-clicks"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Titles</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Write YouTube Titles That Actually Get Clicks
              </h3>
            </Link>
            <Link
              href="/blog/how-to-grow-youtube-channel-from-zero"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">YouTube SEO</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Grow a YouTube Channel From 0 Subscribers
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
