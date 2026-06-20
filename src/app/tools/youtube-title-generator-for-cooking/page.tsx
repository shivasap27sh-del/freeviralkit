import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for Cooking',
    description: 'Free AI YouTube title generator for cooking channels. Click-worthy titles for recipes, ASMR cooking, mukbang, and meal prep.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for Cooking',
  description:
    'Free AI YouTube title generator for cooking channels. Click-worthy titles for recipes, ASMR cooking, mukbang, and meal prep.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-cooking'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Cooking',
    description:
      'Generate cooking YouTube titles that improve CTR and discoverability. Free AI tool for food creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-cooking'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
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
    question: 'How do I title a recipe video if the dish has multiple names?',
    answer:
      'If a dish is known by multiple names (e.g., "Eggplant Parmesan" and "Aubergine Parmigiana"), use the most popular search term in the title, and include the secondary name in the first line of your description. This ensures you capture the maximum search volume without stuffing your title.',
  },
  {
    question: 'Are adjectives important in food video titles?',
    answer:
      'Yes, sensory adjectives are critical. Words like "Crispy", "Gooey", "Spicy", or "Melt-in-your-mouth" trigger psychological cravings. A title like "Crispy Korean Fried Chicken" will always have a higher CTR than just "Korean Fried Chicken Recipe".',
  },
  {
    question: 'How do I title a "What I Eat in a Day" video?',
    answer:
      'Add a specific dietary goal, calorie limit, or lifestyle context. Titles like "What I Eat in a Day (High Protein, Vegan)" or "What I Eat in a Day to Lose Weight (1500 Calories)" target specific search intents and perform significantly better than generic titles.',
  },
  {
    question: 'Do food challenges still get views on YouTube?',
    answer:
      'Yes, food challenges are incredibly popular, but the title must emphasize the scale or difficulty of the challenge. Use numbers to your advantage. "I Ate the World\'s Spiciest Ramen" or "Surviving on $1 a Day in Japan" are proven viral formulas.',
  },
  {
    question: 'Should I put "Recipe" at the end of my title?',
    answer:
      'Only if you are specifically targeting search traffic for a "How-To" video. If your video is more about entertainment, tasting, or a vlog-style cooking experience, putting "Recipe" in the title can make it feel too much like a tutorial and hurt Browse CTR.',
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
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> YouTube Title Generator for Cooking </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate mouthwatering titles for recipe tutorials, ASMR cooking, mukbang, meal prep, and food challenge videos. Powered by AI, built for food creators.
          </p>
          <div className="text-left mt-8">
            <TitleGeneratorClient niche="cooking" />
          </div>
        </section>
        <section className="mt-16 space-y-12">
          {/* Why cooking titles matter */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-4">
              Why Your Cooking Title Decides Your Video&apos;s Fate
            </h2>
            <div className="prose prose-slate max-w-none">
              <p>
                Food and cooking is one of the fastest-growing categories on YouTube, with billions of views every month. But with thousands of recipe videos uploaded daily, your title is the single biggest factor determining whether someone clicks or scrolls past. A great recipe simply isn&apos;t enough if the packaging fails to entice viewers.
              </p>
              <p>
                A generic title like &ldquo;Dinner Recipe&rdquo; tells the viewer nothing. But &ldquo;I Made Gordon Ramsay&apos;s Beef Wellington in My Tiny Kitchen&rdquo; immediately communicates the dish, the challenge, and the story. You are creating a narrative before the video even begins. This narrative is crucial in a saturated market where viewers are looking for more than just ingredients; they are looking for entertainment, inspiration, or a solution to their immediate dinner dilemma.
              </p>
              <p>
                Winning cooking titles combine <strong>the dish name</strong>, a <strong>sensory or emotional hook</strong>, and <strong>clear expectations</strong>. The human brain is hardwired to respond to sensory language. When you use words like &ldquo;crispy,&rdquo; &ldquo;gooey,&rdquo; or &ldquo;smoky,&rdquo; you are actively triggering the viewer&apos;s salivary glands and memory centers. This psychological trigger is often the tipping point that turns a casual scroller into a dedicated viewer.
              </p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              The Psychology of Clicks in the Culinary Niche
            </h2>
            <div className="prose prose-slate max-w-none">
              <p>
                Understanding what drives a viewer to click on a food video is the foundation of channel growth. Unlike gaming or tech, cooking content appeals to our most primal instinct: hunger. Therefore, your titles and thumbnails must work together to create an irresistible visual and textual feast.
              </p>
              <h3>The Visual-Textual Connection</h3>
              <p>
                Your thumbnail is the window display, and your title is the neon sign. If your thumbnail shows a decadent, cheese-pulling slice of pizza, the title must validate that visual promise. A title like &ldquo;The Ultimate 3-Cheese Pizza Recipe (10-Minute Prep)&rdquo; provides the necessary details (what it is) while adding a value proposition (it&apos;s fast).
              </p>
              <h3>Addressing Pain Points vs. Selling Pleasure</h3>
              <p>
                Cooking videos generally fall into two categories: solving a problem or providing an experience.
              </p>
              <ul>
                <li><strong>Problem-Solving:</strong> These titles focus on convenience, budget, or dietary restrictions. Examples include &ldquo;5 Cheap Dinners for College Students&rdquo; or &ldquo;Gluten-Free Brownies That Actually Taste Good.&rdquo; The goal here is searchability and practical value.</li>
                <li><strong>Providing Experience:</strong> These titles focus on indulgence, challenges, or ASMR. Examples include &ldquo;Eating Only Yellow Food for 24 Hours&rdquo; or &ldquo;No-Talking ASMR Wagyu Steak Prep.&rdquo; These rely heavily on the browse feature and satisfying viewer curiosity or sensory desires.</li>
              </ul>
              <p>
                By identifying which category your video falls into, you can tailor your title to trigger the correct psychological response. Don&apos;t mix signals; a highly practical meal-prep video shouldn&apos;t have an overly dramatic, clickbait title.
              </p>
            </div>
          </div>
          {/* Video Embed */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Mastering the &quot;Ingredient Hook&quot; Strategy
            </h2>
            <div className="prose prose-slate max-w-none">
              <p>
                One of the most effective strategies for food creators is the &quot;Ingredient Hook.&quot; Instead of focusing solely on the final dish, you focus the title on a surprising, trending, or highly versatile ingredient. This captures viewers who have that ingredient in their fridge and don&apos;t know what to do with it, as well as viewers intrigued by unusual culinary applications.
              </p>
              <h3>Examples of the Ingredient Hook</h3>
              <p>
                Consider the difference between these titles:
              </p>
              <ul>
                <li><strong>Standard:</strong> How to Make the Best Chocolate Chip Cookies</li>
                <li><strong>Ingredient Hook:</strong> I Added ONE Secret Ingredient to My Cookies (Brown Butter Magic)</li>
              </ul>
              <p>
                The second title creates an information gap. It tells the viewer that there is a secret they don&apos;t know, prompting a click. It also highlights a specific ingredient (brown butter) that is known to elevate flavors, appealing to baking enthusiasts.
              </p>
              <h3>Riding Ingredient Trends</h3>
              <p>
                Food trends often revolve around specific ingredients. Think of the feta pasta craze, the dalgona coffee trend, or the recent obsession with cottage cheese. If you can incorporate a trending ingredient into your video and title early on, you can capture a massive wave of search traffic. A title like &ldquo;I Tried the Viral TikTok Feta Pasta (Is It Actually Good?)&rdquo; leverages both the ingredient and the cultural moment.
              </p>
              <p>
                Remember to use your title to bridge the gap between what the audience is searching for and the unique spin you are providing. If everyone is making sourdough, your title should be &ldquo;Sourdough Bread for Beginners (No Knead, No Dutch Oven),&rdquo; specifically targeting those intimidated by the traditional process.
              </p>
            </div>
          </div>
          {/* Examples by category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examplesByCategory.map((cat) => (
              <div key={cat.category} className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold mb-3">{cat.category} Titles</h3>
                <ul className="space-y-2 text-slate-700">
                  {cat.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Best practices */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              6 Best Practices for Cooking Video Titles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, i) => (
                <div key={tip.title} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {i + 1}. {tip.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Optimizing Beyond the Title: Descriptions, Tags, and Chapters
            </h2>
            <div className="prose prose-slate max-w-none">
              <p>
                While the title is your primary hook, a successful cooking channel requires a holistic approach to SEO. Your description box is incredibly valuable real estate, particularly for recipe videos.
              </p>
              <h3>The Power of the Recipe Description</h3>
              <p>
                YouTube&apos;s algorithm reads your description to understand the context of your video. Always include the full recipe, or at least a detailed ingredient list, in the description. Not only does this provide value to the viewer (encouraging them to save the video), but it also stuffs your metadata with highly relevant keywords naturally. If someone searches for &ldquo;garlic butter chicken breast recipe,&rdquo; having those exact terms in your description significantly boosts your ranking.
              </p>
              <h3>Utilizing Video Chapters for Tutorials</h3>
              <p>
                For long-form tutorials, video chapters are essential. Viewers often want to skip to specific parts of a recipe—perhaps they know how to chop the vegetables but need to see exactly how you fold the pastry. Adding timestamped chapters (e.g., 0:00 Intro, 1:15 Prepping Ingredients, 3:30 Making the Sauce, 8:00 Taste Test) improves the user experience and can even result in your chapters appearing directly in Google search results.
              </p>
              <p>
                Consistent application of these SEO techniques, combined with click-worthy titles generated by our AI tool, will build a strong foundation for your channel&apos;s long-term growth and discoverability.
              </p>
            </div>
          </div>
          {/* How it works */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              How Our Cooking Title Generator Works
            </h2>
            <ol className="space-y-4 text-slate-600 mb-8">
              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                <span className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-sm font-bold text-purple-600 shrink-0">1</span>
                <div>
                  <strong className="text-slate-900 block mb-1">Enter your cooking topic</strong>
                  <p className="text-sm">Describe your recipe, food challenge, or cooking style in a few words.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                <span className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-sm font-bold text-purple-600 shrink-0">2</span>
                <div>
                  <strong className="text-slate-900 block mb-1">AI generates 10 titles</strong>
                  <p className="text-sm">Our model creates titles optimized with SEO keywords, emojis, and sensory hooks specific to food content.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                <span className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-sm font-bold text-purple-600 shrink-0">3</span>
                <div>
                  <strong className="text-slate-900 block mb-1">Copy and use</strong>
                  <p className="text-sm">Paste your favorite title directly into YouTube Studio to start getting more clicks.</p>
                </div>
              </li>
            </ol>
            <div className="text-center md:text-left">
              <Link
                href="/youtube-title-generator"
                className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
              >
                Open Full Title Generator
              </Link>
            </div>
          </div>
          {/* FAQ */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Cross-links */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Explore More YouTube SEO Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/tools/youtube-title-generator-for-gaming"
                className="block p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-900 text-lg mb-1 block">🎮 Title Generator for Gaming</span>
                <p className="text-slate-600 text-sm">Create click-worthy titles for gameplay walkthroughs, challenges, and reviews.</p>
              </Link>
              <Link
                href="/tools/youtube-title-generator-for-vlogs"
                className="block p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-900 text-lg mb-1 block">🎬 Title Generator for Vlogs</span>
                <p className="text-slate-600 text-sm">Create relatable vlog titles for daily routines, travel, and lifestyle content.</p>
              </Link>
              <Link
                href="/youtube-description-generator"
                className="block p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-900 text-lg mb-1 block">📝 YouTube Description Generator</span>
                <p className="text-slate-600 text-sm">Write SEO-optimized descriptions with timestamps, links, and CTAs for your cooking videos.</p>
              </Link>
              <Link
                href="/youtube-tags-generator"
                className="block p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-900 text-lg mb-1 block">🏷️ YouTube Tags Generator</span>
                <p className="text-slate-600 text-sm">Generate optimized tags for your recipe and cooking videos to boost discoverability.</p>
              </Link>
            </div>
          </div>
          {/* Related blog posts */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">
              Learn More About YouTube SEO for Food Creators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/blog/youtube-titles-that-get-clicks"
                className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all hover:shadow-lg"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mb-3">Titles</span>
                <h3 className="font-display text-xl font-bold group-hover:text-purple-600 transition-colors leading-snug mb-2">
                  How to Write YouTube Titles That Actually Get Clicks
                </h3>
                <p className="text-slate-600 text-sm">Discover the psychological triggers and formatting secrets that top creators use to maximize CTR.</p>
              </Link>
              <Link
                href="/blog/youtube-description-tips"
                className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all hover:shadow-lg"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mb-3">Descriptions</span>
                <h3 className="font-display text-xl font-bold group-hover:text-purple-600 transition-colors leading-snug mb-2">
                  YouTube Description Tips to Rank Higher in Search
                </h3>
                <p className="text-slate-600 text-sm">Learn how to format your video descriptions to please the algorithm and provide value to your viewers.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
