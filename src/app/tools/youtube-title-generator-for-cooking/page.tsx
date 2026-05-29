import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Cooking | FreeViralKit',
  description:
    'Free AI-powered YouTube title generator for cooking and recipe channels. Create click-worthy titles for recipe videos, ASMR cooking, mukbang, meal prep, and food challenges. Boost CTR instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-cooking'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Cooking | FreeViralKit',
    description:
      'Generate cooking YouTube titles that improve CTR and discoverability. Free AI tool for food creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-cooking'),
  },
  keywords: [
    'cooking youtube title',
    'recipe video title',
    'food youtube titles',
    'cooking channel title generator',
    'recipe title ideas',
    'mukbang title generator',
    'meal prep title ideas',
    'food vlog title generator',
  ],
};

const examplesByCategory = [
  {
    category: 'Recipe Challenge',
    examples: [
      'I Tried Gordon Ramsay\'s Most Difficult Recipe (Total Disaster)',
      'Can I Make a 5-Star Meal With Only $10?',
      'I Cooked Every Meal From My Childhood for a Week',
    ],
  },
  {
    category: 'ASMR Cooking',
    examples: [
      'ASMR Cooking — Crispy Korean Fried Chicken (No Talking)',
      'Satisfying Japanese Street Food Prep — Full ASMR Experience',
      'Making the Perfect Sourdough From Scratch — Relaxing Kitchen Sounds',
    ],
  },
  {
    category: 'Meal Prep & How-To',
    examples: [
      '7 Days of Healthy Meal Prep Under 30 Minutes Each',
      'How to Make Restaurant-Quality Pasta at Home (Chef-Approved)',
      'Beginner\'s Guide to Indian Cooking — 5 Essential Recipes',
    ],
  },
  {
    category: 'Mukbang & Food Reviews',
    examples: [
      'Eating the Spiciest Ramen in the World — 2X Nuclear Challenge',
      'I Ordered Everything on the Menu at a 1-Star Restaurant',
    ],
  },
];

const tips = [
  {
    title: 'Name the dish or cuisine upfront',
    description:
      'Start your title with the specific dish, cuisine, or ingredient. "Thai Green Curry" is immediately searchable, while "Amazing Dinner Recipe" is vague and gets lost in results.',
  },
  {
    title: 'Use sensory words that trigger cravings',
    description:
      'Words like "crispy", "juicy", "melt-in-your-mouth", "loaded", and "cheesy" make viewers hungry and eager to click. These sensory hooks outperform generic adjectives every time.',
  },
  {
    title: 'Add a constraint or challenge element',
    description:
      'Budget limits, time constraints, or dietary challenges add drama. "I Made a Full Thanksgiving Dinner in 1 Hour" is far more compelling than "Thanksgiving Dinner Recipe".',
  },
  {
    title: 'Keep titles under 65 characters',
    description:
      'Mobile screens truncate long titles. Aim for 50-65 characters so the full title shows in search results, recommendations, and notifications without getting cut off.',
  },
  {
    title: 'Include the format or style',
    description:
      'Mention if it\'s ASMR, a mukbang, a recipe tutorial, or a taste test. This helps YouTube categorize your video and attracts viewers searching for that specific format.',
  },
  {
    title: 'Ride trending food moments',
    description:
      'Viral food trends, new restaurant openings, celebrity recipes, and TikTok food hacks create huge search spikes. Create titles around these trends while they are still hot.',
  },
];

const faqs = [
  {
    question: 'What makes a good cooking YouTube title?',
    answer:
      'A good cooking YouTube title names the dish or cuisine, includes a sensory hook or challenge element, stays under 65 characters, and sets clear expectations. It should make viewers hungry and curious enough to click.',
  },
  {
    question: 'How do I make my recipe video titles more clickable?',
    answer:
      'Use numbers, constraints, or comparisons. "5 Minute Breakfast Ideas" or "Can I Make Sushi at Home for Under $5?" create curiosity. Adding words like "easy", "best", or "ultimate" also helps with searchability.',
  },
  {
    question: 'Should I include the recipe name in the title?',
    answer:
      'Yes, always include the dish or recipe name. This is essential for YouTube SEO — people search for specific recipes like "butter chicken recipe" or "sourdough bread tutorial". Put the dish name near the beginning.',
  },
  {
    question: 'Is this cooking title generator completely free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, and no hidden fees. Generate unlimited cooking and recipe video titles powered by AI.',
  },
  {
    question: 'Can I use this for mukbang, ASMR cooking, and meal prep videos?',
    answer:
      'Absolutely! The AI title generator works for all food content niches including mukbang, ASMR cooking, meal prep, recipe tutorials, food challenges, restaurant reviews, and any other cooking content.',
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
      name: 'YouTube Title Generator for Cooking \u2014 FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-cooking',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator specifically designed for cooking and recipe channels. Generate optimized titles for recipe tutorials, mukbang, ASMR cooking, and food challenge videos.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function CookingTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Cooking</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate mouthwatering titles for recipe tutorials, ASMR cooking, mukbang, meal prep, and food challenge videos. Powered by AI, built for food creators.
          </p>
          <Link
            href="/youtube-title-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Cooking Titles Free →
          </Link>
        </section>

        {/* Why cooking titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Cooking Title Decides Your Video&apos;s Fate
          </h2>
          <p className="text-slate-600 mb-4">
            Food and cooking is one of the fastest-growing categories on YouTube, with billions of views every month. But with thousands of recipe videos uploaded daily, your title is the single biggest factor determining whether someone clicks or scrolls past.
          </p>
          <p className="text-slate-600 mb-4">
            A generic title like &ldquo;Dinner Recipe&rdquo; tells the viewer nothing. But &ldquo;I Made Gordon Ramsay&apos;s Beef Wellington in My Tiny Kitchen&rdquo; immediately communicates the dish, the challenge, and the story.
          </p>
          <p className="text-slate-600">
            Winning cooking titles combine <strong className="text-slate-900">the dish name</strong>, a <strong className="text-slate-900">sensory or emotional hook</strong>, and <strong className="text-slate-900">clear expectations</strong>. That&apos;s exactly what our AI generates for you.
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
            6 Best Practices for Cooking Video Titles
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
            How Our Cooking Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your cooking topic</strong> — describe your recipe, food challenge, or cooking style.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to cooking content.</span>
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
              href="/tools/youtube-title-generator-for-vlogs"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎬 Title Generator for Vlogs</span>
              <p className="text-slate-600 text-sm mt-1">Create relatable vlog titles for daily routines, travel, and lifestyle content.</p>
            </Link>
            <Link
              href="/youtube-description-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📝 YouTube Description Generator</span>
              <p className="text-slate-600 text-sm mt-1">Write SEO-optimized descriptions with timestamps, links, and CTAs for your cooking videos.</p>
            </Link>
            <Link
              href="/youtube-tags-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🏷️ YouTube Tags Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate optimized tags for your recipe and cooking videos to boost discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube SEO for Food Creators
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
              href="/blog/youtube-description-tips"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Descriptions</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Description Tips to Rank Higher in Search
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
