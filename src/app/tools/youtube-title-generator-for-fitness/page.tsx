import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Fitness | FreeViralKit',
  description:
    'Free AI-powered YouTube title generator for fitness and health channels. Create viral titles for workout routines, transformation videos, nutrition tips, and gym challenges. Boost CTR and views instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-fitness'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Fitness | FreeViralKit',
    description:
      'Generate fitness YouTube titles that improve CTR and discoverability. Free AI tool for fitness creators and personal trainers.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-fitness'),
  },
  keywords: [
    'fitness youtube title',
    'workout video title',
    'gym youtube titles',
    'fitness channel title generator',
    'transformation video title ideas',
    'nutrition video title generator',
    'exercise video title ideas',
    'health youtube title generator',
  ],
};

const examplesByCategory = [
  {
    category: 'Workout Routines',
    examples: [
      '30-Minute Full Body Workout — No Equipment Needed (Beginner Friendly)',
      'The 7-Minute Abs Workout That Actually Works (Science-Based)',
      'I Tried David Goggins\' Morning Workout for 30 Days — Results Were Insane',
    ],
  },
  {
    category: 'Transformation & Challenges',
    examples: [
      'My 90-Day Body Transformation — From Skinny to Muscular (Full Journey)',
      'I Did 100 Push-Ups Every Day for a Month — Before and After',
      'I Followed a Celebrity\'s Workout Plan for a Week — Here Is What Happened',
    ],
  },
  {
    category: 'Nutrition & Diet Tips',
    examples: [
      'What I Eat in a Day to Build Muscle (3,000 Calories)',
      'The Protein Myth — How Much Do You ACTUALLY Need?',
      '5 Meal Prep Ideas for Weight Loss That Taste Amazing',
    ],
  },
  {
    category: 'Gym Tips & Mistakes',
    examples: [
      '5 Gym Mistakes Beginners Make (And How to Fix Them)',
      'The Only 5 Exercises You Need to Build a Great Physique',
    ],
  },
];

const tips = [
  {
    title: 'Specify the workout type and duration',
    description:
      'Viewers search for specific workouts. "15-Minute HIIT Workout" is instantly searchable, while "Quick Workout" is too vague. Include the style (HIIT, strength, yoga) and time commitment.',
  },
  {
    title: 'Use numbers and measurable results',
    description:
      'Fitness viewers love concrete results. "I Lost 20 Pounds in 3 Months" or "100 Push-Ups Daily for 30 Days" creates clear expectations and proves credibility with measurable outcomes.',
  },
  {
    title: 'Add a difficulty or audience qualifier',
    description:
      'Tags like "beginner friendly", "no equipment", "at home", or "advanced" help the right audience find your video. This also reduces bounce rate because viewers know what to expect.',
  },
  {
    title: 'Include body part or muscle group keywords',
    description:
      'People search for specific body parts: "ab workout", "arm day", "leg exercises", "glute activation". Including these terms targets high-intent searches and improves discoverability.',
  },
  {
    title: 'Leverage before-and-after curiosity',
    description:
      'Transformation titles drive massive clicks. Phrases like "before and after", "results", "my journey", and "what happened" create irresistible curiosity. Always deliver genuine results.',
  },
  {
    title: 'Ride fitness trend waves',
    description:
      'New workout trends, viral fitness challenges, and celebrity training programs create huge search spikes. Create titles around trending fitness topics within the first week for maximum search volume.',
  },
];

const faqs = [
  {
    question: 'What makes a good fitness YouTube title?',
    answer:
      'A good fitness YouTube title specifies the workout type, mentions the duration or difficulty level, includes a results-based hook, and stays under 65 characters. It should clearly tell viewers what workout or fitness content they will get.',
  },
  {
    question: 'How do I make my workout video titles stand out?',
    answer:
      'Use specific numbers (duration, reps, days), add a challenge or transformation angle, and include qualifiers like "beginner", "no equipment", or "at home". Avoid generic titles — specificity drives clicks in the fitness niche.',
  },
  {
    question: 'Should I include the exercise type in my title?',
    answer:
      'Yes, always include the specific exercise, workout style, or muscle group. Viewers search for terms like "HIIT workout", "glute exercises", or "yoga for beginners". These keywords are essential for YouTube SEO.',
  },
  {
    question: 'Is this fitness title generator free to use?',
    answer:
      'Yes, FreeViralKit is 100% free. No signup, no credit card, and no hidden fees. Generate unlimited fitness and workout video titles powered by AI.',
  },
  {
    question: 'Can I use this for nutrition, yoga, and transformation content?',
    answer:
      'Absolutely! The AI title generator works for all fitness content including workout routines, transformation videos, nutrition guides, yoga sessions, gym tips, and any other health and fitness content.',
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
  name: 'YouTube Title Generator for Fitness — FreeViralKit',
  url: 'https://freeviralkit.com/tools/youtube-title-generator-for-fitness',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description:
    'Free AI-powered YouTube title generator specifically designed for fitness and health channels. Generate optimized titles for workout routines, transformation videos, nutrition tips, and gym challenges.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function FitnessTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Fitness</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate high-CTR titles for workout routines, body transformations, nutrition guides, and gym challenge videos. Powered by AI, built for fitness creators.
          </p>
          <Link
            href="/youtube-title-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Fitness Titles Free →
          </Link>
        </section>

        {/* Why fitness titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Fitness Title Determines Whether People Click or Scroll
          </h2>
          <p className="text-slate-600 mb-4">
            Fitness is one of the most competitive categories on YouTube, with millions of workout and health videos uploaded every month. Your title is the make-or-break element that decides whether someone watches your video or your competitor&apos;s.
          </p>
          <p className="text-slate-600 mb-4">
            A vague title like &ldquo;Workout Video&rdquo; tells the viewer nothing about what they will get. But &ldquo;30-Minute Full Body HIIT Workout — No Equipment, Beginner Friendly&rdquo; immediately communicates the duration, style, and accessibility.
          </p>
          <p className="text-slate-600">
            Effective fitness titles combine <strong className="text-slate-900">the workout type</strong>, a <strong className="text-slate-900">specific outcome or hook</strong>, and <strong className="text-slate-900">audience qualifiers</strong>. That&apos;s exactly what our AI generates for you.
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
            6 Best Practices for Fitness Video Titles
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
            How Our Fitness Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your fitness topic</strong> — describe your workout, transformation, or nutrition video.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to fitness content.</span>
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
              href="/tools/youtube-title-generator-for-cooking"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🍳 Title Generator for Cooking</span>
              <p className="text-slate-600 text-sm mt-1">Generate mouthwatering titles for recipe tutorials and healthy meal prep content.</p>
            </Link>
            <Link
              href="/tools/youtube-title-generator-for-vlogs"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎬 Title Generator for Vlogs</span>
              <p className="text-slate-600 text-sm mt-1">Create relatable vlog titles for daily routines, travel, and lifestyle content.</p>
            </Link>
            <Link
              href="/youtube-shorts-idea-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎬 YouTube Shorts Idea Generator</span>
              <p className="text-slate-600 text-sm mt-1">Get viral Shorts ideas for quick workout clips, fitness tips, and transformation teasers.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube SEO for Fitness Creators
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
              href="/blog/youtube-ctr-secrets"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">CTR</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube CTR Secrets — How to Get More Clicks on Every Video
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
