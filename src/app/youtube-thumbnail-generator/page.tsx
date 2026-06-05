import type { Metadata } from 'next';
import ThumbnailGeneratorClient from '@/components/tools/ThumbnailGeneratorClient';
import { Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Idea Generator - CTR Boost | FreeViralKit',
  description: 'Generate high-CTR YouTube thumbnail concepts and ideas instantly. Get psychological visual layouts and text overlays to maximize clicks.',
  openGraph: {
    title: 'YouTube Thumbnail Idea Generator - Maximize CTR',
    description: 'Stop guessing what makes a good thumbnail. Get 3 high-converting visual concepts based on psychology and contrast.',
    type: 'website',
    url: buildAbsoluteUrl('/youtube-thumbnail-generator'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-thumbnail-generator'),
  },
  keywords: [
    'youtube thumbnail generator',
    'youtube thumbnail ideas',
    'thumbnail maker ideas',
    'thumbnail concepts',
    'youtube ctr optimization',
    'high ctr thumbnails',
    'ai thumbnail generator',
  ]
};

const faqs = [
  {
    question: 'Why is my YouTube thumbnail so important?',
    answer: 'Your thumbnail is the very first thing a viewer sees when scrolling through YouTube. Even if your video is a masterpiece, if the thumbnail fails to catch their eye and invoke curiosity, they will not click. A strong thumbnail directly increases your Click-Through Rate (CTR), which tells the YouTube algorithm to push your video to more people.',
  },
  {
    question: 'Should my thumbnail text exactly match my title?',
    answer: 'Absolutely not. This is one of the most common mistakes new creators make. The thumbnail text and the video title should complement each other, not repeat each other. If the title is "How to Bake a Chocolate Cake", the thumbnail text should add an emotional hook, like "I Made a Huge Mistake!" or "The Secret Ingredient".',
  },
  {
    question: 'How many words should be on a YouTube thumbnail?',
    answer: 'You should aim for 3 to 5 words maximum on your thumbnail. Remember that most viewers browse YouTube on mobile devices. If you write a full sentence, the text will be too small to read. Keep it short, punchy, and highly legible.',
  },
  {
    question: 'Does this tool generate the actual image file?',
    answer: 'No, this tool generates the creative concept and psychological blueprint for your thumbnail. It tells you exactly what visual elements to include (e.g., "A split screen showing before and after"), what emotions to portray, and the exact text overlay to use. You can then take these concepts and easily build them in tools like Canva or Photoshop.',
  },
  {
    question: 'What colors work best for YouTube thumbnails?',
    answer: 'High-contrast complementary colors work best. Examples include Yellow and Purple, or Red and Green. Since YouTube\'s interface is primarily White, Red, and Black, using colors like bright Neon Green, Cyan, or Yellow can make your thumbnail pop out from the surrounding UI elements.',
  },
  {
    question: 'Should I put my face in the thumbnail?',
    answer: 'Generally, yes. Humans are biologically hardwired to look at faces and read emotions. Including a face with a strong, exaggerated expression (shock, joy, confusion) dramatically increases CTR. However, the face must be large and clearly visible even on small screens.',
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

export default function ThumbnailGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 mb-6 uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" /> AI Thumbnail Concepts
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
            Free YouTube Thumbnail Idea Generator — <span className="text-gradient">Maximize Your CTR</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            The best thumbnails tell a visual story and invoke curiosity. Enter your video topic, and our AI will generate 3 proven thumbnail concepts, including the exact text overlay to use.
          </p>
        </section>

        <ThumbnailGeneratorClient />

        <section className="mt-16 space-y-12">
          {/* Article Section 1 */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              The Anatomy of a Viral YouTube Thumbnail
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Your thumbnail is arguably the most important part of your video. If nobody clicks, nobody watches. A common mistake new creators make is just taking a screenshot of their video and slapping their exact video title on it as text. <strong>This does not work.</strong>
              </p>
              <p>
                A high-converting thumbnail doesn&apos;t just describe the video; it tells a visual story. It creates an information gap that forces the viewer&apos;s brain to ask a question. The only way the viewer can get the answer is by clicking on the video. If they feel they already know the outcome just by looking at the thumbnail, there is zero incentive to actually invest their time. This is why the element of mystery is so closely guarded by top-tier creators.
              </p>
              <p>
                Our <strong>YouTube Thumbnail Idea Generator</strong> uses data-backed psychology to give you visual layouts that create <em>contrast</em>, <em>emotion</em>, and <em>curiosity</em>. Instead of just generating an image, we provide the architectural blueprint: we separate the concept into the visual background elements, the facial expressions needed, and the precise text overlay.
              </p>
            </div>
          </div>

          <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <Image src="/images/metadata_funnel.png" alt="YouTube Growth Analytics" width={1200} height={630} className="w-full h-auto object-cover" />
          </div>

          {/* Article Section 2 */}
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-amber-500">
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              The 3 Golden Rules for Thumbnail Text Overlays
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" /> 1. Keep It Under 5 Words
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Over 70% of YouTube viewership happens on mobile devices. If your thumbnail text is a full sentence, it will be completely unreadable on a 6-inch phone screen. Keep your text short, punchy, and large enough to read at a glance.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" /> 2. Complement, Don&apos;t Repeat
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Your thumbnail text should <em>add</em> context to your title, not repeat it. If the title explains what the video is about, the thumbnail text should provide the emotional hook. For example, if the title is &quot;Testing Cheap Microphones&quot;, the thumbnail text should say &quot;Don&apos;t Buy This!&quot;
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" /> 3. Use High Contrast Colors
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Use opposing colors on the color wheel to make your text pop off the background. Never use white text on a light background without a heavy drop shadow or a dark stroke. High contrast draws the eye naturally.
                </p>
              </div>
            </div>
          </div>

          {/* Article Section 3 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              The Psychology of Color in YouTube Thumbnails
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Color theory is one of the most underutilized strategies among beginner YouTubers. When a user is scrolling through their subscription feed or the home page, you have roughly 0.25 seconds to capture their attention. Color is processed by the brain before shapes, text, or even faces. 
              </p>
              <p>
                Because the YouTube interface is heavily reliant on White, Black, and Red, you want to avoid using these as the primary background colors for your thumbnails. If you use a white background in light mode, your thumbnail blends into the platform. If you use a black background in dark mode, it disappears. Instead, rely on vibrant colors that break the UI&apos;s pattern. Bright yellow, neon green, cyan, and deep purple are excellent choices because they create immediate visual disruption.
              </p>
              <p>
                Furthermore, different colors evoke different psychological responses. Yellow and orange communicate high energy, excitement, and urgency—which is why they are heavily favored by gaming and challenge creators. Blue communicates trust and authority, making it the dominant choice for tech reviews, educational content, and personal finance videos. Green often implies money, growth, or a &quot;go&quot; signal. By intentionally selecting your color palette, you are subliminally communicating the vibe of your video before the viewer even reads a single word.
              </p>
            </div>
          </div>

          <div className="my-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/f7kK29t2eXQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>

          {/* Article Section 4 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              A/B Testing Your Thumbnails: A Data-Driven Approach
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                The days of uploading a video and hoping for the best are long gone. Professional creators treat their thumbnails like a continuous experiment. YouTube now offers native A/B testing (often called &quot;Test &amp; Compare&quot;), which allows you to upload up to three different thumbnails for a single video. The algorithm will show these variations to different segments of your audience and determine a clear winner based on the highest Click-Through Rate (CTR) and overall watch time.
              </p>
              <p>
                When conducting an A/B test, it is critical that you only change one major variable at a time. If you test three wildly different designs, you won&apos;t know why the winner actually won. Was it the face? The text? The background color? Instead, start by testing two different text overlays on the exact same background. Once you find the winning text, you can then test different background images or facial expressions. This scientific approach ensures that your channel improves incrementally over time.
              </p>
              <p>
                Remember that a good CTR is relative to your niche. While gaming or entertainment channels might regularly see a 10% to 15% CTR, an educational or tutorial channel might be doing exceptionally well with a 5% to 7% CTR. The goal of A/B testing is not to hit an arbitrary number, but to consistently beat your own channel&apos;s average.
              </p>
            </div>
          </div>

          {/* Article Section 5 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Mobile vs. Desktop: Designing for Different Screens
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                A thumbnail that looks incredible on your 27-inch 4K monitor might be completely illegible on a 6-inch smartphone screen. Since mobile devices account for the vast majority of YouTube viewership, you must adopt a &quot;mobile-first&quot; design philosophy. 
              </p>
              <p>
                Before finalizing any design, zoom out until the thumbnail is the size of a postage stamp. Can you still read the text? Is the emotion on the face still recognizable? If the answer is no, you need to increase the size of your core elements and remove background clutter. Many creators fall into the trap of adding too many small details, Easter eggs, or complex backgrounds. While these might seem clever during the editing process, they just look like a blurry mess on a phone.
              </p>
              <p>
                Additionally, you must be hyper-aware of YouTube&apos;s UI overlays. The bottom right corner of your thumbnail will always be covered by the video duration timestamp. Never place important text, a subject&apos;s face, or a crucial visual element in that corner, as it will be completely obscured. Similarly, the top right corner often features icons like the &quot;Watch Later&quot; clock or the playlist indicator. Keep your critical information centered or aligned to the left side of the frame to ensure it is always visible.
              </p>
            </div>
          </div>

          {/* Article Section 6 */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Faces and Eye Contact: The Human Connection
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Humans are biologically programmed to look at faces and recognize emotions. This is why you see so many top YouTubers using highly exaggerated facial expressions in their thumbnails. It isn&apos;t just a trend; it&apos;s basic psychology. When we see someone expressing shock, fear, extreme joy, or confusion, our mirror neurons fire, and we naturally want to know the context behind that emotion.
              </p>
              <p>
                Eye contact is particularly powerful. A subject looking directly into the camera lens creates an immediate sense of intimacy and connection with the viewer. It feels as though the person in the thumbnail is speaking directly to you. Alternatively, you can use the subject&apos;s eyeline to direct the viewer&apos;s attention. If the person in the thumbnail is looking off to the side, the viewer will naturally follow their gaze to see what they are looking at. This is a brilliant way to draw attention to a specific object, a text overlay, or a dramatic before-and-after comparison.
              </p>
              <p>
                When designing your thumbnail based on our AI concepts, ensure that if a face is included, it is large, clear, and expressing a strong emotion. A blank, staring expression will not generate the same click-through rate as an emotive one. Don&apos;t be afraid to exaggerate your expressions; what feels silly in real life often translates perfectly to a small thumbnail on a crowded screen.
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
                    <span className="text-amber-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card rounded-2xl p-8 text-center mt-12 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <h3 className="font-display text-xl font-bold mb-4 text-slate-900 dark:text-white">You have the thumbnail, now you need the title.</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              A great thumbnail needs an equally compelling title to seal the deal. Generate highly optimized titles that work perfectly with your new thumbnail concepts.
            </p>
            <Link href="/youtube-title-generator" className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg transition-transform hover:scale-105">
              Use the Viral Title Generator →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
