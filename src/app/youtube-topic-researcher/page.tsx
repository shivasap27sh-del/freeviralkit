import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import TopicResearcherPageClient from '@/components/tools/TopicResearcherPageClient';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Niche & Topic Researcher — Find Low Competition Keywords',
  description:
    'Analyze search demand and competition levels for your YouTube niche. Discover high-potential, low-competition video topics to rank easily and grow your channel.',
  openGraph: {
    title: 'Free YouTube Niche & Topic Researcher — Find Low Competition Keywords',
    description:
      'Analyze search demand and competition levels for your YouTube niche. Discover high-potential, low-competition video topics to rank easily.',
    url: buildAbsoluteUrl('/youtube-topic-researcher'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-topic-researcher'),
  },
  keywords: [
    'youtube topic researcher',
    'youtube niche finder',
    'youtube keyword tool',
    'low competition youtube topics',
    'youtube video ideas',
    'youtube search volume',
    'best youtube niches',
    'youtube analytics tool',
    'youtube seo researcher',
    'how to find youtube topics',
  ],
};

const faqItems = [
  {
    question: 'How do I know if a YouTube niche is profitable?',
    answer:
      'A profitable YouTube niche usually has high search volume and advertiser demand. Niches like personal finance, software tutorials, and real estate tend to have high CPMs (advertisers pay more per 1,000 views). However, the most profitable niche is one where you can consistently create high-quality content over a long period without burning out, regardless of the baseline CPM.',
  },
  {
    question: 'What makes a YouTube keyword "Low Competition"?',
    answer:
      'A keyword is considered low competition when the top-ranking videos for that search term have relatively low view counts, are outdated (several years old), or come from channels with small subscriber bases. If a channel with 500 subscribers is ranking on the first page for a specific topic, that is a strong signal that you can rank for it too.',
  },
  {
    question: 'Should I niche down or make broad content?',
    answer:
      'When starting a new channel, you must niche down. The YouTube algorithm needs to understand exactly who your target audience is so it knows who to recommend your videos to. If you make a cooking video on Monday and a gaming video on Wednesday, the algorithm gets confused. Once you have built a loyal audience (usually past 100k subscribers), you can slowly start broadening your topics.',
  },
  {
    question: 'What is a "Long-Tail Keyword"?',
    answer:
      'A long-tail keyword is a highly specific search phrase containing three or more words. Instead of targeting "camera review" (which is broad and highly competitive), you target "Sony A7IV review for wedding photography." Long-tail keywords have lower overall search volume, but they have much lower competition and significantly higher viewer intent.',
  },
  {
    question: 'How many video ideas should I brainstorm before starting a channel?',
    answer:
      'Before launching a channel, you should brainstorm at least 30 to 50 viable video topics within your niche. If you struggle to come up with even 20 ideas, your niche might be too narrow, or you might not be passionate enough about the subject to sustain a long-term YouTube career. Our AI topic researcher can help you quickly build this initial backlog.',
  },
  {
    question: 'Does the YouTube algorithm prefer search traffic or suggested traffic?',
    answer:
      'Both are important, but they serve different purposes. Search traffic is crucial for new channels because it guarantees an audience is actively looking for your content. It provides a slow, steady stream of evergreen views. Suggested traffic (the homepage and "Up Next" sidebar) is what causes videos to go viral. The best strategy is to create search-optimized videos to build your initial audience, which will eventually trigger the suggested algorithm.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function TopicResearcherPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Search className="w-4 h-4" /> AI Niche Researcher
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Free YouTube <span className="text-gradient">Niche & Topic Researcher</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Analyze search demand and competition levels for your niche, and unlock high-potential video topics to rank easily.
          </p>
        </section>

        <TopicResearcherPageClient />

        {/* SEO Content */}
        <section className="mt-16 space-y-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Niche Research is the Secret to YouTube Growth
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Every day, millions of creators upload videos to YouTube hoping to go viral. The vast majority of these videos will never surpass 100 views. Why? Because the creator filmed what <strong className="italic">they</strong> wanted to film, rather than what the audience was actually searching for.
              </p>
              <p>
                If you start a brand new channel and upload a video titled "My Morning Routine," you are competing against established influencers with millions of subscribers. The algorithm has no reason to surface your video over theirs. However, if you upload a video titled "Morning Routine for Night Shift Nurses Working 12-Hour Shifts," you are targeting a specific, highly engaged audience with very little competition.
              </p>
              <p>
                This is the power of a <strong className="text-slate-900 dark:text-white">YouTube topic researcher</strong>. It removes the guesswork from content creation. By analyzing search volume (how many people are looking for a topic) versus competition (how many high-quality videos already exist for that topic), you can find the "sweet spot" where your new channel can actually gain traction.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Understanding the "Sweet Spot" Matrix
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                When you use our tool, you will receive two primary metrics: Search Volume and Competition Level. Here is how to interpret those results to plan your content calendar.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                🟢 High Volume, Low Competition (The Golden Goose)
              </h3>
              <p>
                If you find a topic in this quadrant, drop everything and make a video about it immediately. These opportunities are rare and usually occur when a new trend, product, or software is just breaking into the mainstream, but established creators haven&apos;t covered it yet. Ranking here can catapult a channel from 0 to 10,000 subscribers in a matter of weeks.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                🟡 Medium Volume, Low Competition (The Foundation)
              </h3>
              <p>
                This is where 80% of a new creator&apos;s content should live. These topics won&apos;t get you a million views overnight, but they will reliably generate 500 to 5,000 views every single month. By stacking dozens of these videos on your channel, you build a foundation of evergreen search traffic that generates passive AdSense revenue and slowly grows your subscriber base.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                🔴 High Volume, High Competition (The Influencer Game)
              </h3>
              <p>
                These are the broad topics (e.g., "iPhone 15 Review," "Minecraft Let's Play"). As a new creator, you will not rank in search for these terms. The only way to succeed here is to create a thumbnail and concept so incredibly unique that it triggers the "Suggested Video" algorithm to put you on the homepage. Unless you are a master of packaging and storytelling, avoid these topics until you have an established audience.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              How to Find Long-Tail Keywords in Saturated Niches
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                What if your dream niche (like fitness or personal finance) is already saturated? You don&apos;t have to give up; you just have to "niche down" until you find a sub-segment where the competition drops off.
              </p>
              <p>
                For example, if you want to make a channel about "Weight Loss" (High Competition), try narrowing it down. 
                <br /><br />
                <span className="opacity-75">Step 1: Weight Loss for Men (Still High)</span><br />
                <span className="opacity-75">Step 2: Weight Loss for Men Over 40 (Medium)</span><br />
                <strong className="text-purple-400">Step 3: Kettlebell Workouts for Men Over 40 with Bad Knees (Low Competition)</strong>
              </p>
              <p>
                By targeting that highly specific "long-tail" demographic, you become the undisputed authority in that micro-niche. The viewers who find your specific content are far more likely to subscribe, comment, and buy your products because the content speaks directly to their unique pain points.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Before You Hit Record Checklist
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Have you verified there is actual search demand for this topic?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Are there channels with under 10k subscribers ranking on page 1 for this term?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Can you make a better thumbnail than the top 3 videos currently ranking?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Does this topic align tightly with the rest of your channel&apos;s niche?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span className="dark:text-slate-300">Is this a long-tail keyword rather than a broad, generic category?</span></li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Learn More About YouTube Strategy
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/how-to-find-youtube-niche"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  How to Find Your YouTube Niche
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A complete guide to balancing your passions with actual market demand.
                </p>
              </Link>
              <Link
                href="/blog/youtube-seo-guide"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  The Complete YouTube SEO Guide
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How to optimize your videos to dominate YouTube search results.
                </p>
              </Link>
              <Link
                href="/youtube-title-generator"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube Title Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Found a great topic? Turn it into a highly clickable, optimized title.
                </p>
              </Link>
              <Link
                href="/youtube-script-generator"
                className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">
                  YouTube Script Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Use your new topic to generate a full, structured video outline.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-purple-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
