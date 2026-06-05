import type { Metadata } from 'next';
import Image from 'next/image';
import { buildAbsoluteUrl } from '@/lib/site';
import TagsGeneratorClient from '@/components/tools/TagsGeneratorClient';
import { Tag } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Tag Generator — Get 20+ SEO Tags Instantly',
  description:
    'Generate 20-25 highly relevant, SEO-optimized YouTube tags instantly with our free AI tag generator. Formatted perfectly for YouTube Studio.',
  openGraph: {
    title: 'Free YouTube Tag Generator — Get 20+ SEO Tags Instantly',
    description:
      'Generate 20-25 highly relevant, SEO-optimized YouTube tags instantly. The best free YouTube tag generator powered by AI.',
    url: buildAbsoluteUrl('/youtube-tags-generator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-tags-generator'),
  },
  keywords: [
    'youtube tags generator',
    'free youtube tag generator',
    'youtube tag generator free',
    'youtube seo tags',
    'best youtube tags',
    'youtube keyword generator',
    'tags for youtube videos',
    'youtube tag finder',
    'generate tags for youtube',
    'youtube metadata tags',
  ],
};

const faqItems = [
  {
    question: 'How many tags should I add to my YouTube video?',
    answer:
      'YouTube allows up to 500 characters total for all tags combined. We recommend using as much of this limit as possible, which usually translates to 15-25 tags depending on their length. Prioritize your most important keywords and phrases at the beginning of your tag list, as YouTube gives slightly more weight to the first few tags.',
  },
  {
    question: 'Do YouTube tags still matter for SEO?',
    answer:
      'Yes, although their importance has shifted. While titles and descriptions are now the primary drivers for YouTube search ranking, tags still play a crucial role in two areas: helping your video appear in the "Up Next" or related videos sidebar alongside similar content, and catching common spelling mistakes that viewers might type when searching for your topic.',
  },
  {
    question: 'Should I use single-word tags or long-tail phrases?',
    answer:
      'You should use a mix of both, but lean heavily towards long-tail phrases. Single-word tags (like "gaming" or "cooking") are too broad to rank for. Long-tail phrases (like "how to bake chocolate chip cookies" or "minecraft survival guide part 1") match exactly what viewers type into the search bar, making them much more effective for driving targeted traffic.',
  },
  {
    question: 'Is it helpful to include misspellings in my YouTube tags?',
    answer:
      'Absolutely. Including common misspellings is actually one of the primary use cases YouTube officially recommends for tags. If your video is about "Arnold Schwarzenegger", including misspellings like "arnold swarzeneger" in your tags ensures that viewers who misspell the name in search will still find your video.',
  },
  {
    question: 'Can I copy and paste competitor tags directly?',
    answer:
      'While you can see competitor tags using browser extensions, blindly copying them is a poor strategy. Competitors might be using tags that aren\'t strictly relevant to your specific video angle. Instead, use their tags as inspiration, but rely on an AI tag generator to build a customized, highly relevant tag list specifically tailored to your exact video topic and content.',
  },
  {
    question: 'Does the order of my YouTube tags matter?',
    answer:
      'Yes, the order does matter. YouTube\'s algorithm places more emphasis on the first tag, and decreasing emphasis on subsequent tags. Your first tag should always be your exact primary target keyword. Follow it with variations of that keyword, then broader category tags towards the end of your 500-character limit.',
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

export default function TagsGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
            <Tag className="w-4 h-4" /> AI Tag Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Free YouTube Tag Generator — <span className="text-gradient">Get 20+ SEO Tags Instantly</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            The best free YouTube tag generator powered by AI. Enter your video topic and instantly get highly relevant, SEO-optimized tags formatted perfectly for YouTube Studio. No account needed, completely free.
          </p>
        </section>

        <TagsGeneratorClient />

        {/* Educational Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Why YouTube Tags Are Still a Vital SEO Tool
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                In the ever-evolving landscape of YouTube SEO, there is a persistent myth that tags no longer matter. While it is true that YouTube&apos;s algorithm has become incredibly sophisticated at understanding video content through audio analysis and machine learning, <strong className="text-slate-900 dark:text-white">tags remain a fundamental piece of your video&apos;s metadata</strong>. They serve as a direct communication line between you and the YouTube search algorithm, providing strict categorization that helps the system confirm what your video is truly about.
              </p>

              <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <Image src="/images/metadata_funnel.png" alt="YouTube Metadata Optimization Funnel" width={1200} height={630} className="w-full h-auto object-cover" />
              </div>

              <p>
                When you use a <strong className="text-slate-900 dark:text-white">free YouTube tag generator</strong>, you are essentially building a bridge of vocabulary. Viewers use specific phrases, slang, or even misspelled words when searching for content. If those specific terms aren&apos;t in your title or description, tags are your safety net. They ensure your video surfaces for the exact terms your audience is typing, capturing search traffic that would otherwise go to competitors who took the time to optimize their tag boxes.
              </p>
              <p>
                Beyond direct search, tags are a primary signal for the &quot;Suggested Videos&quot; algorithm. Have you ever wondered why certain videos always appear next to each other in the sidebar? It&apos;s often because they share a high percentage of overlapping tags. By using highly targeted, relevant tags, you signal to YouTube that your video belongs alongside the top-performing content in your niche, opening the door to passive, algorithmic traffic that scales without you having to actively promote the video.
              </p>
              
              <div className="my-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/_V10q5B_y-I" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>

            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 lg:p-10 border-t-4 border-t-cyan-500">
            <h2 className="font-display text-3xl font-bold mb-8 text-slate-900 dark:text-white">
              The Anatomy of a Perfect Tag Strategy
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
              <p className="text-lg">
                A common mistake creators make is treating the tag box as a place to dump every related word they can think of. A successful tag strategy is intentional, structured, and prioritizes relevance over volume. Here is how to build a 500-character tag list that actually moves the needle on your views.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 text-sm">1</span>
                    The Primary Target Keyword (The Anchor)
                  </h3>
                  <p>
                    Your very first tag should be the exact phrase you want to rank for in YouTube search. If your video is about &quot;how to bake sourdough bread,&quot; that exact phrase must be your first tag. YouTube gives disproportionate weight to the first tag in your list, so don&apos;t waste that premium spot on a generic word like &quot;baking&quot; or &quot;bread.&quot;
                  </p>
                </div>
                
                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />
                
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 text-sm">2</span>
                    Long-Tail Keyword Variations (The Net)
                  </h3>
                  <p>
                    The next 5-10 tags should be logical variations of your primary keyword. Think about how different people might search for the same topic. Variations might include &quot;sourdough bread recipe for beginners,&quot; &quot;easy sourdough baking tutorial,&quot; or &quot;step by step sourdough bread.&quot; These long-tail phrases have lower search volume but much higher intent, meaning viewers who search these terms are highly likely to click and watch your entire video.
                  </p>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />
                
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 text-sm">3</span>
                    Broad Category Tags (The Context)
                  </h3>
                  <p>
                    Once you have exhausted your specific variations, use the remaining character limit for broader category tags. These help YouTube understand the general neighborhood your video belongs in. For the sourdough example, you might use tags like &quot;baking tutorial,&quot; &quot;homemade bread,&quot; or &quot;cooking tips.&quot; While you won&apos;t rank for these highly competitive terms, they help categorize your content for the suggested algorithm.
                  </p>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />
                
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 text-sm">4</span>
                    Strategic Misspellings (The Safety Net)
                  </h3>
                  <p>
                    YouTube explicitly states that tags are useful if the content of your video is commonly misspelled. If you are covering a difficult-to-spell topic, location, or name (e.g., &quot;Arnold Schwarzenegger&quot; or &quot;Massachusetts&quot;), including common typos in your tags is a smart, platform-approved tactic to capture lost search traffic.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Use an AI YouTube Tag Generator?
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
              <p>
                Brainstorming 20-25 highly relevant tags manually for every video is tedious and prone to bias. You might miss obvious variations or waste characters on tags that have zero search volume. An <strong className="text-slate-900 dark:text-white">AI YouTube tags generator</strong> solves this by instantly analyzing your core topic and cross-referencing it with known search patterns and algorithmic preferences. It takes the emotional guesswork out of your SEO strategy.
              </p>
              
              <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <Image src="/images/seo_dashboard.png" alt="YouTube Growth Analytics Dashboard" width={1200} height={630} className="w-full h-auto object-cover" />
              </div>

              <p>
                Our tool doesn&apos;t just spit out random words. It generates a cohesive list that includes the primary long-tail phrases, secondary variations, and necessary context tags — all formatted perfectly with commas so you can copy and paste them directly into YouTube Studio with a single click. This saves you 10-15 minutes of SEO research per upload, allowing you to focus on what actually matters: creating better content that retains the audience once the algorithm brings them to your channel.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Tag Optimization Checklist
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span className="dark:text-slate-300">Is your exact primary keyword the very first tag?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span className="dark:text-slate-300">Have you used close to the 500-character maximum limit?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span className="dark:text-slate-300">Are you prioritizing long-tail phrases (3+ words) over single words?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span className="dark:text-slate-300">Did you include common misspellings related to your topic?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /><span className="dark:text-slate-300">Are all your tags genuinely relevant to the video content?</span></li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Level Up Your YouTube Metadata
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/best-youtube-tags"
                className="glass-card rounded-xl p-5 hover:border-cyan-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-1">
                  How to Find the Best YouTube Tags
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A comprehensive guide to tag research, competitor analysis, and implementation.
                </p>
              </Link>
              <Link
                href="/blog/best-youtube-tags-for-gaming"
                className="glass-card rounded-xl p-5 hover:border-cyan-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-1">
                  Best YouTube Tags for Gaming Channels
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Niche-specific tag strategies for growing a gaming channel fast.
                </p>
              </Link>
              <Link
                href="/youtube-title-generator"
                className="glass-card rounded-xl p-5 hover:border-cyan-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-1">
                  YouTube Title Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pair your tags with high-CTR, click-worthy video titles.
                </p>
              </Link>
              <Link
                href="/youtube-description-generator"
                className="glass-card rounded-xl p-5 hover:border-cyan-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors mb-1">
                  YouTube Description Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Generate SEO descriptions that perfectly complement your tags.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions About YouTube Tags
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-cyan-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Tags are just one piece of the puzzle. Get titles, descriptions, and hashtags too.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
              <Link href="/youtube-hashtag-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-400/40 transition-colors">
                Hashtag Generator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
