import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import TopicResearcherPageClient from '@/components/tools/TopicResearcherPageClient';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import RelatedTools from '@/components/RelatedTools';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Topic & Niche Researcher',
    description: 'Analyze search demand and competition for your YouTube niche. Discover high-potential, low-competition video topics to rank and grow fast.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free YouTube Topic & Niche Researcher',
  description:
    'Analyze search demand and competition for your YouTube niche. Discover high-potential, low-competition video topics to rank and grow fast.',
  openGraph: {
    title: 'Free YouTube Topic & Niche Researcher',
    description:
      'Analyze search demand and competition for your YouTube niche. Find low-competition video topics to rank and grow fast.',
    url: buildAbsoluteUrl('/youtube-topic-researcher'),
    type: 'website',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
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
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> Free YouTube Niche & Topic Researcher </h1>
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
                If you start a brand new channel and upload a video titled &quot;My Morning Routine,&quot; you are competing against established influencers with millions of subscribers. The algorithm has no reason to surface your video over theirs. However, if you upload a video titled &quot;Morning Routine for Night Shift Nurses Working 12-Hour Shifts,&quot; you are targeting a specific, highly engaged audience with very little competition.
              </p>
              <p>
                This is the power of a <strong className="text-slate-900 dark:text-white">YouTube topic researcher</strong>. It removes the guesswork from content creation. By analyzing search volume (how many people are looking for a topic) versus competition (how many high-quality videos already exist for that topic), you can find the &quot;sweet spot&quot; where your new channel can actually gain traction.
              </p>
            </div>
          </div>



          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Understanding the &quot;Sweet Spot&quot; Matrix
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
                These are the broad topics (e.g., &quot;iPhone 15 Review,&quot; &quot;Minecraft Let&apos;s Play&quot;). As a new creator, you will not rank in search for these terms. The only way to succeed here is to create a thumbnail and concept so incredibly unique that it triggers the &quot;Suggested Video&quot; algorithm to put you on the homepage. Unless you are a master of packaging and storytelling, avoid these topics until you have an established audience.
              </p>
            </div>
          </div>



          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The Power of Search Intent in YouTube Topic Selection
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                It is not enough to just find a keyword with high volume and low competition; you must deeply understand the <em>intent</em> behind that search. Why is the viewer typing this specific phrase into YouTube? What problem are they desperately trying to solve? 
              </p>
              <p>
                There are four main types of search intent on YouTube: <strong>Informational</strong> (e.g., &quot;how to tie a tie&quot;), <strong>Navigational</strong> (e.g., &quot;MrBeast latest video&quot;), <strong>Commercial Investigation</strong> (e.g., &quot;Sony A7IV vs Canon R6&quot;), and <strong>Transactional</strong> (e.g., &quot;buy Final Cut Pro plugins&quot;). For the vast majority of creators, focusing on Informational and Commercial Investigation intent is where the magic happens. 
              </p>
              <p>
                If your topic is &quot;Best Budget Microphones for Podcasting,&quot; the intent is commercial investigation. The viewer is close to making a purchase decision but needs guidance. If your video is instead just a vlog of you buying a microphone without actually reviewing its audio quality, you have failed to meet the search intent. The viewer will quickly exit the video, devastating your audience retention metrics and telling the algorithm that your video is poor quality. Always match your video format precisely to the psychological intent of the search query.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Analyzing Competitor Channels to Find Content Gaps
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                One of the fastest ways to generate brilliant, low-competition topic ideas is to perform a &quot;Content Gap Analysis&quot; on your direct competitors. This involves looking at channels in your niche that are slightly larger than yours and identifying what they are <em>not</em> talking about, or where their content is lacking.
              </p>
              <p>
                Start by finding 3 to 5 competitor channels. Sort their videos by &quot;Most Popular&quot; and look for common themes. More importantly, read their comment sections! Viewers will often leave comments like, &quot;Great video, but can you do a version of this for beginners?&quot; or &quot;This was helpful, but how does this apply to Mac users?&quot; These comments are literal goldmines. They are direct requests from a highly engaged audience for content that does not yet exist.
              </p>
              <p>
                When you create a video that fills this specific gap, you immediately siphon traffic away from your competitors. Because you are answering the unaddressed questions of their audience, those viewers are highly likely to subscribe to you instead, viewing you as the more comprehensive and helpful authority in the space.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Seasonal vs. Evergreen Topics: Building a Balanced Portfolio
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                As you build your content strategy using our topic researcher, you need to understand the difference between Seasonal (or Trending) topics and Evergreen topics. A healthy, rapidly growing YouTube channel relies on a calculated mix of both.
              </p>
              <p>
                <strong>Evergreen Topics:</strong> These are videos that remain relevant year after year. &quot;How to boil an egg&quot; or &quot;Basic Excel formulas&quot; will have exactly the same search demand five years from now as they do today. These videos are the bedrock of your channel. They act like real estate, slowly accumulating views, subscribers, and ad revenue while you sleep. However, they rarely go viral.
              </p>
              <p>
                <strong>Seasonal/Trending Topics:</strong> These are videos tied to a specific event, news cycle, or time of year. For example, &quot;iOS 18 Features Explained&quot; will see a massive spike in traffic during September but will receive almost zero views two years later. These videos are your growth engines. Because the topic is new, competition is temporarily low, giving smaller channels a chance to ride the wave and capture thousands of new subscribers quickly.
              </p>
              <p>
                The optimal strategy is an 80/20 split. Dedicate 80% of your effort to building a massive library of highly targeted, low-competition Evergreen content to guarantee baseline traffic. Use the remaining 20% to take calculated risks on fast-moving Trends to orchestrate viral spikes in channel growth.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Using Google Trends and YouTube Auto-Complete
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                While our AI Niche Researcher provides incredible data, pairing it with native tools can supercharge your ideation process. One of the most overlooked tools by new creators is YouTube&apos;s own Auto-Complete feature in the search bar. This is arguably the most accurate representation of what people are actively searching for <em>right now</em>.
              </p>
              <p>
                When you type a broad seed keyword into the search bar, like &quot;Dog training,&quot; YouTube will drop down a list of predictions like &quot;Dog training for puppies,&quot; &quot;Dog training to stop barking,&quot; or &quot;Dog training tips for beginners.&quot; Every single one of these predictions is a proven long-tail keyword with high search intent. You can then plug these exact phrases into our Niche Researcher to evaluate their specific competition levels.
              </p>
              <p>
                Google Trends is another phenomenal resource for topic validation. Before committing a week of your life to filming and editing a video, plug the core topic into Google Trends and set the filter to &quot;YouTube Search.&quot; If you see the graph steadily declining over the past 12 months, that niche is dying, and you should pivot. If the graph is pointing upwards, you have caught a rising trend just in time. Validating your ideas with data ensures you never waste time making videos nobody wants to watch.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              How to Find Long-Tail Keywords in Saturated Niches
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                What if your dream niche (like fitness or personal finance) is already saturated? You don&apos;t have to give up; you just have to &quot;niche down&quot; until you find a sub-segment where the competition drops off.
              </p>
              <p>
                For example, if you want to make a channel about &quot;Weight Loss&quot; (High Competition), try narrowing it down. 
                <br /><br />
                <span className="opacity-75">Step 1: Weight Loss for Men (Still High)</span><br />
                <span className="opacity-75">Step 2: Weight Loss for Men Over 40 (Medium)</span><br />
                <strong className="text-purple-400">Step 3: Kettlebell Workouts for Men Over 40 with Bad Knees (Low Competition)</strong>
              </p>
              <p>
                By targeting that highly specific &quot;long-tail&quot; demographic, you become the undisputed authority in that micro-niche. The viewers who find your specific content are far more likely to subscribe, comment, and buy your products because the content speaks directly to their unique pain points.
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

          {/* Related Tools CTA */}
          <div className="glass-card rounded-2xl p-6 text-center mt-12 mb-12">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Need the full SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
              <Link href="/youtube-title-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400/40 transition-colors">
                Title Generator
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

          <RelatedTools currentToolPath="/youtube-topic-researcher" />
        </section>
      </main>
    </>
  );
}
