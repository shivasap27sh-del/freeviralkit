import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Music | FreeViralKit',
  description:
    'Free AI-powered YouTube title generator for music channels. Create viral titles for song covers, music production tutorials, beat making, album reviews, and music videos. Boost views instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-music'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Music | FreeViralKit',
    description:
      'Generate music YouTube titles that improve CTR and discoverability. Free AI tool for musicians and music creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-music'),
  },
  keywords: [
    'music youtube title',
    'song cover title',
    'music video title generator',
    'music production title ideas',
    'beat making title generator',
    'album review title ideas',
    'music channel title generator',
    'youtube music seo',
  ],
};

const examplesByCategory = [
  {
    category: 'Song Covers & Performances',
    examples: [
      'I Sang "Bohemian Rhapsody" in 10 Different Styles (Mind-Blown)',
      'Singing to Strangers on the Street — Their Reactions Were PRICELESS',
      'My Acoustic Cover of "Blinding Lights" — The Weeknd (One Take)',
    ],
  },
  {
    category: 'Music Production & Beat Making',
    examples: [
      'How I Made a Hit Beat in 10 Minutes Using Only Free Plugins',
      'Making a Travis Scott Type Beat From Scratch in FL Studio',
      'I Turned Random Kitchen Sounds Into a Fire Beat',
    ],
  },
  {
    category: 'Album & Song Reviews',
    examples: [
      'Is This the Best Album of 2026? (Honest Review)',
      'Ranking Every Song on Taylor Swift\'s New Album — Worst to Best',
      'Music Producer Reacts to the Most Overrated Songs of All Time',
    ],
  },
  {
    category: 'Music Theory & Tutorials',
    examples: [
      'Learn Piano in 30 Days — Day 1 (Complete Beginner)',
      'The Music Theory Hack That Changed Everything for Me',
    ],
  },
];

const tips = [
  {
    title: 'Include the song or artist name',
    description:
      'When covering or reviewing music, always include the song title and artist name. These are the exact terms viewers search for. "Blinding Lights cover" gets far more searches than "my latest cover".',
  },
  {
    title: 'Specify the instrument or style',
    description:
      'Mention the instrument (piano, guitar, drums), software (FL Studio, Ableton), or style (acoustic, jazz, lo-fi). This targets niche audiences who search for these specific terms.',
  },
  {
    title: 'Use emotional and curiosity hooks',
    description:
      'Words like "mind-blown", "insane", "emotional", or "you won\'t believe" create urgency. Music is emotional content — your title should reflect that energy.',
  },
  {
    title: 'Keep titles between 50-65 characters',
    description:
      'Titles over 70 characters get truncated on mobile devices. Keep your music video titles concise so they display fully in search results and the recommended feed.',
  },
  {
    title: 'Capitalize on trending songs and artists',
    description:
      'When a new song drops or an artist goes viral, create content immediately. "Reacting to [New Song]" searches spike within the first 48 hours — timing is everything.',
  },
  {
    title: 'Add format context',
    description:
      'Specify if it\'s a reaction, tutorial, one-take, mashup, or remix. Format keywords help YouTube recommend your video to the right audience and improve click-through rates.',
  },
];

const faqs = [
  {
    question: 'What makes a great music YouTube title?',
    answer:
      'A great music YouTube title includes the song or artist name, specifies the format (cover, tutorial, review, reaction), uses an emotional hook, and stays under 65 characters. It should set clear expectations about what the viewer will hear or learn.',
  },
  {
    question: 'How do I title a song cover on YouTube?',
    answer:
      'For song covers, use this formula: "[Song Name] — [Artist] ([Your Style/Instrument] Cover)". For example, "Blinding Lights — The Weeknd (Acoustic Guitar Cover)". This catches both the song search and the cover search.',
  },
  {
    question: 'Should I put the song name or my channel name first?',
    answer:
      'Always put the song or topic name first. Viewers search for songs, not channel names. Your channel name already appears below the title in YouTube results, so use the title space for searchable keywords.',
  },
  {
    question: 'Is the music title generator free to use?',
    answer:
      'Yes, FreeViralKit is 100% free. No signup, no credit card, and no hidden fees. Generate unlimited music video titles powered by AI.',
  },
  {
    question: 'Can I use this for beat-making, production, and tutorial videos?',
    answer:
      'Absolutely! The AI title generator works for all music content — covers, original songs, beat-making, production tutorials, album reviews, music reactions, and instrument lessons.',
  },
];

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

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'YouTube Title Generator for Music — FreeViralKit',
  url: 'https://freeviralkit.com/tools/youtube-title-generator-for-music',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description:
    'Free AI-powered YouTube title generator specifically designed for music channels. Generate optimized titles for song covers, music production, beat making, and album review videos.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function MusicTitleLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            YouTube Title Generator for <span className="text-gradient">Music</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate viral titles for song covers, music production tutorials, beat-making sessions, and album reviews. Powered by AI, built for musicians.
          </p>
          <Link
            href="/youtube-title-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Music Titles Free →
          </Link>
        </section>

        {/* Why music titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Music Title Makes or Breaks Your Video
          </h2>
          <p className="text-slate-600 mb-4">
            Music is one of the most-watched categories on YouTube, but also one of the most saturated. Millions of covers, tutorials, and reactions compete for the same audience every day. Your title is the first — and often only — chance to stand out.
          </p>
          <p className="text-slate-600 mb-4">
            A lazy title like &ldquo;New Cover Song&rdquo; tells viewers nothing. But &ldquo;I Sang Bohemian Rhapsody in 10 Different Styles (Mind-Blown)&rdquo; instantly communicates the challenge, the scope, and the excitement.
          </p>
          <p className="text-slate-600">
            Great music titles combine <strong className="text-slate-900">the song or artist name</strong>, a <strong className="text-slate-900">format indicator</strong>, and an <strong className="text-slate-900">emotional hook</strong>. That&apos;s exactly what our AI generates for you.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Titles</h2>
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
            6 Best Practices for Music Video SEO Titles
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

        {/* How it works */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            How Our Music Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your music topic</strong> — describe your cover, production session, or music review.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to music content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Copy and use</strong> — paste your favorite title directly into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-title-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Title Generator
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
              <p className="text-slate-600 text-sm mt-1">Create click-worthy titles for gameplay walkthroughs, challenges, and reviews.</p>
            </Link>
            <Link
              href="/tools/youtube-title-generator-for-cooking"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🍳 Title Generator for Cooking</span>
              <p className="text-slate-600 text-sm mt-1">Generate mouthwatering titles for recipe tutorials and food content.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate trending hashtags for your music videos to maximize reach and discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube SEO for Musicians
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
              href="/blog/youtube-hashtag-strategy"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Hashtags</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Hashtag Strategy That Actually Works in 2026
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
