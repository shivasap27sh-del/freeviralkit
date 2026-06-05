import type { Metadata } from 'next';
import HookGeneratorClient from '@/components/tools/HookGeneratorClient';
import { Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Hook Generator - AI Script Hooks | FreeViralKit',
  description: 'Generate high-retention YouTube video hooks instantly with our free AI tool. Hook your viewers in the first 5 seconds to increase watch time and views.',
  openGraph: {
    title: 'YouTube Hook Generator - Get 5 AI Script Hooks Free',
    description: 'Keep your viewers watching! Generate high-retention YouTube video hooks instantly with our free AI tool.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-hook-generator'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-hook-generator'),
  },
  keywords: [
    'youtube hook generator',
    'video hook generator',
    'youtube script hook',
    'how to hook viewers',
    'youtube intro script',
    'youtube retention',
    'ai hook generator',
  ]
};

const faqs = [
  {
    question: 'Why is the hook the most important part of a YouTube video?',
    answer: 'The first 5 to 15 seconds of your video (the hook) determine your Audience Retention curve. If viewers leave immediately, YouTube\'s algorithm assumes your video is low quality or clickbait, and stops recommending it. A strong hook keeps viewers watching past that critical 30-second mark.',
  },
  {
    question: 'How long should my video hook be?',
    answer: 'A perfect YouTube hook is typically between 5 and 15 seconds long. It should be just long enough to validate the viewer\'s decision to click the thumbnail, state the core value proposition or open a curiosity loop, and transition quickly into the actual content.',
  },
  {
    question: 'How does this AI Hook Generator work?',
    answer: 'Our tool uses advanced language models trained on high-performing YouTube scripts. By analyzing the psychological triggers that retain attention—such as the Curiosity Gap, the Problem/Agitation method, and the Direct Promise—the AI crafts 5 unique, proven hook formulas tailored precisely to your video topic.',
  },
  {
    question: 'Is the YouTube Hook Generator free to use?',
    answer: 'Yes! FreeViralKit provides this tool 100% free of charge. You can generate unlimited video hooks without creating an account or providing a credit card.',
  },
  {
    question: 'Should my hook exactly match my title?',
    answer: 'No, you should never read your title word-for-word as your hook. Viewers already read the title—that\'s why they clicked! Instead, your hook should complement the title, raise the stakes, or immediately plunge the viewer into the action.',
  },
  {
    question: 'What is a "Curiosity Loop"?',
    answer: 'A curiosity loop is a storytelling technique where you present a question, mystery, or unusual situation at the beginning of the video, but promise the answer later. This compels the viewer to keep watching to satisfy their curiosity.',
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

export default function HookGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-6 uppercase tracking-wider">
            <Target className="w-4 h-4" /> AI Hook Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
            Free YouTube Hook Generator — <span className="text-gradient">Grab Attention Instantly</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            The first 5 seconds of your video determine if viewers stay or scroll away. Enter your video topic and generate 5 highly engaging, retention-optimized script hooks instantly.
          </p>
        </section>

        <HookGeneratorClient />

        <section className="mt-16 space-y-12">
          {/* Article Section 1 */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Your Video Hook Makes or Breaks Your Video
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                We've all been there: you spend hours designing the perfect thumbnail and writing a killer title. People are clicking, but when you check your analytics a day later, the retention graph looks like a cliff dive. Everyone is leaving in the first 30 seconds.
              </p>
              <p>
                The harsh truth? When someone clicks your video, they haven't decided to watch it yet. Their finger is literally hovering over the back button. If you don't immediately validate why they clicked and give them a reason to stay, they're gone. And once YouTube sees people ditching your video right away, it stops pushing it to new viewers.
              </p>
              <p>
                That's exactly what a good hook fixes. It grabs them immediately, opens a "curiosity loop," and promises that the payoff is worth their time. Our <strong>YouTube hook generator</strong> is built on the exact same formulas top creators use to keep people glued to the screen from second one.
              </p>
            </div>
          </div>

          {/* Article Section 2 */}
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-rose-500">
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              3 Hook Formulas That Actually Keep People Watching
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" /> 1. The Curiosity Gap
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  We hate unresolved mysteries. If you show someone a weird outcome or raise a massive question right at the start, they almost <em>have</em> to keep watching just to find out how it happened. <br />
                  <em>Example: "I drank a gallon of water every day for a month, but on day 12, something completely unexpected happened to my skin."</em>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" /> 2. Poke the Pain
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  If you're doing an educational or tutorial video, call out the exact frustration your viewer is feeling right now, then tell them you have the fix. <br />
                  <em>Example: "If you're stuck at 100 views per video no matter what you do, you're probably making this one fatal mistake with your thumbnails."</em>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" /> 3. The No-BS Promise
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Sometimes, you just need to cut the fluff and tell people exactly what they're getting. Respect their time, and they'll stick around. <br />
                  <em>Example: "In the next 5 minutes, I'm going to show you exactly how to double your freelance income without working any extra hours."</em>
                </p>
              </div>
            </div>
          </div>

          {/* Article Section 3 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              The #1 Hook Mistake You're Probably Making
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Let me guess, your videos start like this: <em>"Hey guys, welcome back to the channel. My name is [Name], and today we're going to..."</em>
              </p>
              <p>
                Stop doing this! New viewers don't care who you are yet—they only care about what the video can do for them. You have to earn the right to introduce yourself. Hit them with a powerful hook first, roll a quick 3-second intro if you must, and <em>then</em> quickly introduce yourself before getting into the meat of the video.
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
                    <span className="text-rose-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card rounded-2xl p-8 text-center mt-12 bg-gradient-to-br from-rose-500/5 to-purple-500/5">
            <h3 className="font-display text-xl font-bold mb-4 text-slate-900 dark:text-white">Want the entire video scripted for you?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Now that you have your perfect hook, don't stop there. Generate a complete, highly-structured video outline that maintains retention from start to finish.
            </p>
            <Link href="/youtube-script-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg transition-transform hover:scale-105">
              Try Full Script Generator →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
