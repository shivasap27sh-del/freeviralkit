import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import DescriptionGeneratorClient from '@/components/tools/DescriptionGeneratorClient';
import { AlignLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Free YouTube Description Generator — AI-Powered SEO Descriptions',
  description:
    'Generate SEO-optimized YouTube descriptions with proper keyword placement, timestamps, and calls-to-action instantly using our free AI description generator.',
  openGraph: {
    title: 'Free YouTube Description Generator — AI-Powered SEO Descriptions',
    description:
      'Generate SEO-optimized YouTube descriptions with proper keyword placement, timestamps, and calls-to-action instantly.',
    url: buildAbsoluteUrl('/youtube-description-generator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-description-generator'),
  },
  keywords: [
    'youtube description generator',
    'free youtube description generator',
    'ai youtube description generator',
    'youtube description template',
    'youtube seo description',
    'best youtube descriptions',
    'youtube description ideas',
    'youtube video description maker',
    'youtube description format',
    'youtube description writer',
  ],
};

const faqItems = [
  {
    question: 'How long should a YouTube description be?',
    answer:
      'YouTube allows up to 5,000 characters for your video description. While you don\'t need to use all of it, we recommend writing at least 200-300 words (about 1,500 characters). Longer descriptions give YouTube\'s algorithm more text to crawl and understand your content, which improves your chances of ranking for long-tail search queries. Just ensure the content is actually relevant to the video.',
  },
  {
    question: 'Why are the first 2-3 lines of a YouTube description so important?',
    answer:
      'The first 150-200 characters of your description are shown directly in YouTube search results and above the "Show More" button on the video watch page. This makes it crucial real estate for both SEO and Click-Through Rate (CTR). Your primary keyword should appear naturally in this first sentence, along with a compelling hook that encourages viewers to click and watch.',
  },
  {
    question: 'Should I include my script in the YouTube description?',
    answer:
      'No, pasting your entire video script into the description is not recommended and can look spammy to both users and the algorithm. Instead, write a detailed summary or overview of what happens in the video. If you want to provide a transcript, upload it directly as a subtitle/CC file, which YouTube actually prefers for accessibility and SEO purposes.',
  },
  {
    question: 'How do I add timestamps or chapters to my YouTube video?',
    answer:
      'To add video chapters, simply type out a list of timestamps and their corresponding titles in your description. You must follow three rules: the first timestamp must start exactly at 0:00, you must have at least three timestamps listed in ascending order, and the minimum length for a video chapter is 10 seconds. Our description generator can automatically format these for you.',
  },
  {
    question: 'What links should I include in my YouTube description?',
    answer:
      'A well-optimized description should include a mix of internal and external links. Include a prominent "Subscribe" link (using the ?sub_confirmation=1 modifier), links to 2-3 related videos or playlists on your channel to keep viewers watching, and any relevant external links like your social media profiles, affiliate links, or your website. Always clearly label what the links are.',
  },
  {
    question: 'Is it bad to use a description template for all my videos?',
    answer:
      'Using a template for the bottom half of your description (social links, gear used, about the channel) is perfectly fine and recommended for consistency. However, the top half (the actual summary of the video) must be 100% unique for every single upload. Reusing the exact same summary for multiple videos can lead to YouTube flagging your channel for repetitive content.',
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

export default function DescriptionGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 mb-6 uppercase tracking-wider">
            <AlignLeft className="w-4 h-4" /> AI Description Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Free YouTube <span className="text-gradient">Description Generator</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate SEO-optimized YouTube descriptions instantly. Get proper keyword placement, timestamps, and calls-to-action tailored to your video content.
          </p>
        </section>

        <DescriptionGeneratorClient />

        {/* Educational Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Your YouTube Description Is a Hidden SEO Goldmine
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                When creators upload a new video, they typically obsess over the title and the thumbnail. By the time they reach the description box, fatigue sets in. They drop in a quick sentence, paste their social links, and hit publish. This is a massive missed opportunity. The YouTube description box is an <strong className="text-slate-900 dark:text-white">untapped SEO goldmine</strong> that the algorithm relies heavily upon to understand, categorize, and rank your content. It provides the crucial text data the machine learning systems need to comprehend the nuance of your video.
              </p>
              <p>
                YouTube allows up to 5,000 characters in the description. This isn&apos;t arbitrary — it is an invitation to provide deep context. YouTube&apos;s machine learning algorithms crawl this text to determine exactly what your video is about, how it answers user queries, and which other videos it should be suggested next to. A video with a 300-word, highly relevant description will almost always outrank a similar video with only a one-sentence summary, especially for highly competitive search terms.
              </p>
              <p>
                Furthermore, the description doesn&apos;t just serve YouTube; it serves Google Search. Videos with well-written, keyword-rich descriptions are far more likely to appear on the first page of Google search results in the dedicated "Video" carousel. Using a <strong className="text-slate-900 dark:text-white">free YouTube description generator</strong> ensures you don&apos;t miss this critical optimization step. Instead of starting from a blank page, you get a structured, algorithm-friendly draft that perfectly balances natural language with strategic keyword placement.
              </p>
            </div>
          </div>

          <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">

          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              How Descriptions Drive Revenue and Channel Growth
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Beyond search engine optimization, your description box is your primary tool for driving off-platform traffic and direct revenue. While the video content itself builds trust and engagement, the description is where you place the actual mechanisms for conversion. It is the bridge between a passive viewer and an active customer or subscriber.
              </p>
              <p>
                Affiliate marketing is one of the most common ways creators monetize their descriptions. By explicitly listing the camera gear, software, or tools used in the video, and pairing those items with affiliate links, you can generate significant passive income. The key is context: a random list of links will be ignored, but a dedicated "My Gear" section formatted properly within a comprehensive description will consistently generate clicks.
              </p>
              <p>
                The description is also your best tool for building an email list or driving traffic to your own website. By including a clear, compelling Call to Action (CTA) paired with a lead magnet—such as a free checklist, a downloadable template, or an exclusive newsletter—you convert rented YouTube audience members into owned audience members. Our AI description generator helps you naturally weave these CTAs into the text so they feel like a helpful resource rather than a desperate sales pitch.
              </p>
            </div>
          </div>

          <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">

              </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The Blueprint of a High-Ranking Description
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Writing a great YouTube description isn&apos;t about stuffing keywords. It is about structuring information in a way that serves both the viewer (who wants to know if the video is worth watching) and the algorithm (which needs text data to index). A highly optimized description follows a specific, proven blueprint.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                1. The "Above the Fold" Hook (First 150 Characters)
              </h3>
              <p>
                The first two to three lines of your description are the most important. This text is visible in YouTube search results, Google search results, and above the "Show More" button on the video page. Your primary target keyword <strong className="text-slate-900 dark:text-white">must</strong> appear naturally within the first 25 words. Treat this section like an extension of your title — it should hook the reader, summarize the core value proposition of the video, and compel them to click. If this section is boring or irrelevant, you will lose search traffic.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                2. The Deep-Dive Summary (200+ Words)
              </h3>
              <p>
                Once a viewer clicks "Show More," they should find a comprehensive summary of the video. This is where you write 2-3 paragraphs detailing what the video covers. This is your opportunity to naturally weave in secondary keywords, long-tail phrases, and related terminology. Don&apos;t list keywords; write natural sentences. Describe the problem you are solving, the steps you are taking, or the story you are telling. The more relevant text you provide, the better YouTube understands your niche.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                3. Video Chapters & Timestamps
              </h3>
              <p>
                Timestamps are incredible for retention. By listing out the key sections of your video (starting with 0:00), YouTube automatically converts them into playable chapters. Not only does this improve the user experience by letting viewers jump to the exact information they need, but Google also frequently uses these chapters to display your video directly in Google Search results for specific queries.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                4. The "Binge-Watch" Call to Action
              </h3>
              <p>
                The description is the perfect place to drive viewers to your other content. Include links to 2-3 highly relevant videos or playlists on your channel. Tell them exactly why they should click. For example: "If you liked this tutorial on lighting, check out my guide on picking the perfect camera lens: [Link]". This strategy keeps viewers in your ecosystem, signaling high satisfaction to the algorithm.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                5. The Boilerplate & Hashtags
              </h3>
              <p>
                The very bottom of your description should house your standard boilerplate text. This includes your social media links, business inquiries email, affiliate links for gear you use, and a brief "About the Channel" paragraph. Finally, append 3-5 highly relevant hashtags at the very bottom. These hashtags will often appear above your video title on the watch page.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Avoid These Description Mistakes
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                There are several practices that can actively harm your video&apos;s performance. The most common is <strong className="text-slate-900 dark:text-white">keyword stuffing</strong>. Dumping a block of comma-separated keywords at the bottom of your description is explicitly against YouTube&apos;s Terms of Service and can result in your video being suppressed or removed. Always integrate keywords into natural, readable sentences.
              </p>
              <p>
                Another mistake is leading with links instead of value. If the very first thing in your description is a link to your Patreon or Instagram, you are wasting the most valuable SEO real estate available to you. Put the content first, and the promotions second. The algorithm cannot index a URL; it indexes the context around it. Ensure your description is text-heavy and link-light at the very beginning.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white">
              The 6-Step Description Checklist
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Is the primary keyword in the first sentence?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Is the summary at least 150-200 words long?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Are there timestamps starting with 0:00?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Did you include links to related videos on your channel?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Is there a clear subscribe call-to-action?</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" /><span className="dark:text-slate-300">Are there 3-5 relevant hashtags at the bottom?</span></li>
            </ul>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Learn More About YouTube SEO
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/youtube-description-tips"
                className="glass-card rounded-xl p-5 hover:border-green-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-400 transition-colors mb-1">
                  10 YouTube Description Tips for More Views
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Actionable tips for writing descriptions that drive search traffic and conversions.
                </p>
              </Link>
              <Link
                href="/blog/youtube-seo-checklist-2026"
                className="glass-card rounded-xl p-5 hover:border-green-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-400 transition-colors mb-1">
                  The Ultimate 2026 YouTube SEO Checklist
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Ensure every video you upload is perfectly optimized before hitting publish.
                </p>
              </Link>
              <Link
                href="/youtube-title-generator"
                className="glass-card rounded-xl p-5 hover:border-green-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-400 transition-colors mb-1">
                  YouTube Title Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your description is useless if nobody clicks the title. Fix that here.
                </p>
              </Link>
              <Link
                href="/youtube-hashtag-generator"
                className="glass-card rounded-xl p-5 hover:border-green-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-400 transition-colors mb-1">
                  YouTube Hashtag Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Find the best trending hashtags to append to the bottom of your description.
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
                    <span className="text-green-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
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
            <p className="text-slate-600 dark:text-slate-400 mb-4">A great description needs a great title and tags to match.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
              <Link href="/youtube-title-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-green-400/40 transition-colors">
                Title Generator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
