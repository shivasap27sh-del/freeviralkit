import type { Metadata } from 'next';
import ChapterGeneratorClient from '@/components/tools/ChapterGeneratorClient';
import { Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Chapter Generator - Auto Timestamps | FreeViralKit',
  description: 'Automatically generate YouTube video chapters and timestamps from your script or outline. Boost your video SEO with our free AI tool.',
  openGraph: {
    title: 'YouTube Chapter Generator - Auto Timestamps Free',
    description: 'Boost your video SEO! Automatically generate YouTube video chapters and timestamps from your script or outline.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-chapter-generator'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-chapter-generator'),
  },
  keywords: [
    'youtube chapter generator',
    'youtube timestamps',
    'auto timestamp generator',
    'youtube video chapters',
    'add chapters to youtube video',
    'youtube seo tool',
    'ai chapter generator',
  ]
};

const faqs = [
  {
    question: 'Why are YouTube chapters important for SEO?',
    answer: 'YouTube chapters not only improve the viewing experience by allowing users to skip to relevant parts of your video, but they are also indexed by Google Search. If a user searches a specific query on Google, Google may display your video exactly at the timestamp that answers their question, driving massive organic traffic.',
  },
  {
    question: 'How do I add chapters to my YouTube video?',
    answer: 'To add chapters, simply paste a list of timestamps and corresponding titles into your video description. The very first timestamp must be exactly 00:00. You need at least three timestamps in chronological order, and each chapter must be at least 10 seconds long.',
  },
  {
    question: 'Why are my YouTube chapters not working?',
    answer: 'If your chapters aren\'t displaying, check the following: 1) Your first chapter must start at 00:00. 2) You must have at least 3 chapters. 3) Chapters must be in chronological order. 4) Each chapter must be at least 10 seconds long. 5) Your channel might have an active community guideline strike, which disables chapters.',
  },
  {
    question: 'Does the AI Chapter Generator work automatically?',
    answer: 'Yes. You paste your video script, outline, or a messy list of topics, and our AI analyzes the text. It logically groups the content and generates properly formatted, chronological timestamps with keyword-rich titles that you can paste directly into YouTube.',
  },
  {
    question: 'Do chapters reduce my total watch time?',
    answer: 'This is a common myth. While viewers might skip parts of your video, data shows that videos with chapters actually have higher overall retention because viewers can easily find the content they want instead of clicking away in frustration.',
  },
];

const pageJsonLd = {
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

export default function ChapterGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 mb-6 uppercase tracking-wider">
            <Clock className="w-4 h-4" /> AI Chapter Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
            Free YouTube Chapter Generator — <span className="text-gradient">Automate Timestamps</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            YouTube chapters improve user experience and boost your video's search ranking on Google. Paste your script or bullet points below, and our AI will automatically generate perfectly formatted timestamps for your description.
          </p>
        </section>

        <ChapterGeneratorClient />

        <section className="mt-16 space-y-12">
          {/* Article Section 1 */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Are YouTube Chapters Essential for Video SEO?
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Adding chapters (timestamps) to your YouTube videos is one of the easiest, fastest, and most effective ways to improve your video SEO. When you add correctly formatted chapters to your description, YouTube automatically divides your video's progress bar into distinct, labeled sections. This allows viewers to instantly see the structure of your video and skip to the exact information they are looking for.
              </p>
              <p>
                But the benefits go far beyond the YouTube platform. <strong>Google Search deeply integrates with YouTube chapters</strong>. Because Google owns YouTube, it parses your timestamps. If someone searches for a specific question on Google (e.g., "How to change a tire on a Honda Civic"), and your video has a chapter titled exactly that, Google will often display your video directly at the top of the search results, cued up to that exact timestamp. This phenomenon is known as "Key Moments" in Google Search, and it is a massive source of external organic traffic.
              </p>
              <p>
                Manually identifying timestamps, writing SEO-optimized titles for them, and formatting them correctly takes time. Our <strong>YouTube Chapter Generator</strong> automates this tedious process using AI.
              </p>
            </div>
          </div>

          {/* Article Section 2 */}
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-indigo-500">
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              How to Use the Auto Timestamp Generator
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Step 1: Paste Your Script or Outline
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  You don't need a perfectly timed script. Simply paste your entire video script, or just a rough bulleted outline of the topics you covered in your video. The AI is smart enough to understand context.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Step 2: Let AI Generate the Structure
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  The AI will analyze the text, group logical sections together, and generate concise, keyword-rich chapter titles. It will assign estimated chronological timestamps based on the flow of your content.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Step 3: Copy to Description
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Copy the generated list of timestamps and paste them anywhere in your YouTube video description. Make sure to double check the exact timing in your video editor before publishing.
                </p>
              </div>
            </div>
          </div>

          {/* Article Section 3 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Strict YouTube Chapter Formatting Rules
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Many creators add timestamps to their descriptions, only to find that the chapters don't actually appear on the video player. YouTube has very strict formatting requirements that must be met perfectly for the chapters to activate:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>The First Chapter:</strong> The very first timestamp MUST start at exactly <code>00:00</code>. Not 00:01, not 0:00. It must be formatted as <code>00:00 Intro</code>.</li>
                <li><strong>Minimum Count:</strong> You must have at least <strong>three (3)</strong> timestamps listed in the description.</li>
                <li><strong>Chronological Order:</strong> The timestamps must increase in chronological order. You cannot go from 02:30 back to 01:15.</li>
                <li><strong>Minimum Length:</strong> Each individual chapter must be at least <strong>10 seconds</strong> long.</li>
                <li><strong>Account Standing:</strong> If your channel has active community guideline strikes, or if the content is deemed inappropriate for some audiences, YouTube may disable chapters on your channel entirely.</li>
              </ul>
              <p className="mt-4">
                By using our AI generator, you guarantee that the formatting (00:00, chronological order) is handled correctly every single time.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-indigo-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card rounded-2xl p-8 text-center mt-12 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5">
            <h3 className="font-display text-xl font-bold mb-4 text-slate-900 dark:text-white">Need help writing the rest of the description?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Timestamps are just one part of a fully optimized YouTube description. Generate a complete, keyword-rich description with dynamic templates and CTAs.
            </p>
            <Link href="/youtube-description-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg transition-transform hover:scale-105">
              Use the Full Description Generator →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
