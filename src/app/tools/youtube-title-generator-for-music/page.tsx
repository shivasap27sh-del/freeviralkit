import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Music',
  description:
    'Free AI-powered YouTube title generator for music channels. Create viral titles for song covers, music production tutorials, beat making, album reviews, and music videos. Boost views instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-music'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Music',
    description:
      'Generate music YouTube titles that improve CTR and discoverability. Free AI tool for musicians and music creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-music'),
  },
  keywords: [
    'music youtube title',
    'song cover title',
    'music video title generator',
    'music production title ideas',
    'beat making title generator',
    'album review title ideas',
    'music channel title generator',
    'youtube music seo',
  ],
};

const examplesByCategory = [
  {
    category: 'Song Covers & Performances',
    examples: [
      'I Sang "Bohemian Rhapsody" in 10 Different Styles (Mind-Blown)',
      'Singing to Strangers on the Street — Their Reactions Were PRICELESS',
      'My Acoustic Cover of "Blinding Lights" — The Weeknd (One Take)',
    ],
  },
  {
    category: 'Music Production & Beat Making',
    examples: [
      'How I Made a Hit Beat in 10 Minutes Using Only Free Plugins',
      'Making a Travis Scott Type Beat From Scratch in FL Studio',
      'I Turned Random Kitchen Sounds Into a Fire Beat',
    ],
  },
  {
    category: 'Album & Song Reviews',
    examples: [
      'Is This the Best Album of 2026? (Honest Review)',
      'Ranking Every Song on Taylor Swift\'s New Album — Worst to Best',
      'Music Producer Reacts to the Most Overrated Songs of All Time',
    ],
  },
  {
    category: 'Music Theory & Tutorials',
    examples: [
      'Learn Piano in 30 Days — Day 1 (Complete Beginner)',
      'The Music Theory Hack That Changed Everything for Me',
    ],
  },
];

const tips = [
  {
    title: 'Include the song or artist name',
    description:
      'When covering or reviewing music, always include the song title and artist name. These are the exact terms viewers search for. "Blinding Lights cover" gets far more searches than "my latest cover".',
  },
  {
    title: 'Specify the instrument or style',
    description:
      'Mention the instrument (piano, guitar, drums), software (FL Studio, Ableton), or style (acoustic, jazz, lo-fi). This targets niche audiences who search for these specific terms.',
  },
  {
    title: 'Use emotional and curiosity hooks',
    description:
      'Words like "mind-blown", "insane", "emotional", or "you won\'t believe" create urgency. Music is emotional content — your title should reflect that energy.',
  },
  {
    title: 'Keep titles between 50-65 characters',
    description:
      'Titles over 70 characters get truncated on mobile devices. Keep your music video titles concise so they display fully in search results and the recommended feed.',
  },
  {
    title: 'Capitalize on trending songs and artists',
    description:
      'When a new song drops or an artist goes viral, create content immediately. "Reacting to [New Song]" searches spike within the first 48 hours — timing is everything.',
  },
  {
    title: 'Add format context',
    description:
      'Specify if it\'s a reaction, tutorial, one-take, mashup, or remix. Format keywords help YouTube recommend your video to the right audience and improve click-through rates.',
  },
];

const faqs = [
  {
    question: 'How do I title a beat or instrumental on YouTube?',
    answer:
      'Producers should always use the "Type Beat" format because it has massive search volume. A good format is "[Artist] x [Artist] Type Beat 2026 - \\"[Beat Name]\\"". For example: "Travis Scott x Drake Type Beat 2026 - \\"NIGHTFALL\\"".',
  },
  {
    question: 'Should I include the words "Official Music Video"?',
    answer:
      'Yes, if it is the official release. Putting (Official Music Video) or (Official Audio) in parentheses at the end of the title signals authenticity to both the algorithm and the viewer, leading to higher click-through rates.',
  },
  {
    question: 'How do I title a music reaction video?',
    answer:
      'Focus on your musical expertise or your extreme emotional response. "Vocal Coach Reacts to Dimash (Speechless)" or "Classical Musician Hears Meshuggah for the First Time" works incredibly well because it promises a specific, expert perspective.',
  },
  {
    question: 'Should I put the original artist\'s name in my cover video title?',
    answer:
      'Always. You are piggybacking off their search volume. If you just title your video "My Acoustic Cover", nobody will find it. You must title it "Blinding Lights - The Weeknd (Acoustic Cover)".',
  },
  {
    question: 'Are mashup titles different from standard covers?',
    answer:
      'Mashups should clearly state both songs and artists involved, and often include a catchy umbrella name. For example: "If [Song A] and [Song B] had a baby..." or "The Ultimate 2026 Pop Mashup (50 Songs in 3 Minutes)".',
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
      name: 'YouTube Title Generator for Music — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-music',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator specifically designed for music channels. Generate optimized titles for song covers, music production, beat making, and album review videos.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function MusicTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Music</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate viral titles for song covers, music production tutorials, beat-making sessions, and album reviews. Powered by AI, built for musicians.
          </p>
          <div className="text-left mt-8">
            <TitleGeneratorClient niche="music" />
          </div>
        </section>

        {/* Why music titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Music Title Makes or Breaks Your Video
          </h2>
          <p className="text-slate-600 mb-4">
            Music is one of the most-watched categories on YouTube, but also one of the most saturated. Millions of covers, tutorials, and reactions compete for the same audience every day. Your title is the first — and often only — chance to stand out.
          </p>
          <p className="text-slate-600 mb-4">
            A lazy title like &ldquo;New Cover Song&rdquo; tells viewers nothing. But &ldquo;I Sang Bohemian Rhapsody in 10 Different Styles (Mind-Blown)&rdquo; instantly communicates the challenge, the scope, and the excitement.
          </p>
          <p className="text-slate-600">
            Great music titles combine <strong className="text-slate-900">the song or artist name</strong>, a <strong className="text-slate-900">format indicator</strong>, and an <strong className="text-slate-900">emotional hook</strong>. That&apos;s exactly what our AI generates for you.
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
            6 Best Practices for Music Video SEO Titles
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

        {/* Advanced Music SEO Deep Dive */}
        <section className="mt-16 mb-8 space-y-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900">
              The Ultimate Guide to YouTube Titles for Musicians and Producers
            </h2>
            <div className="prose prose-lg text-slate-600 max-w-none space-y-6">
              <p>
                Navigating the YouTube algorithm as a musician, producer, or singer-songwriter can often feel like playing to an empty room. You spend countless hours mixing your tracks, mastering the audio, setting up the perfect lighting, and editing your performance. Yet, when you finally hit publish, the video barely gets any views. Why does this happen? The harsh reality of YouTube is that your music&apos;s quality does not matter if people never click on your video in the first place. Your title is the billboard for your music. If that billboard isn&apos;t compelling, people will drive right past it.
              </p>
              
              <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <Image src="/images/seo_dashboard.png" alt="YouTube Growth Analytics" width={1200} height={630} className="w-full h-auto object-cover" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                Why Standard Titles Destroy Your Discoverability
              </h3>
              <p>
                Many independent artists make the fatal mistake of treating YouTube like Spotify. On Spotify, people are already looking for music. They type in an artist&apos;s name or browse a playlist. On YouTube, people are looking for entertainment, education, or an emotional response. If you title your video &quot;John Doe - Midnight Blues (Original Song),&quot; you are relying entirely on people searching for &quot;John Doe.&quot; Unless you are already famous, the search volume for your name is exactly zero.
              </p>
              <p>
                To get discovered, you have to intercept the traffic that already exists. This is why song covers are the ultimate growth hack for aspiring singers. Instead of naming your video &quot;Acoustic Session Part 3,&quot; you need to target a massive search term: &quot;Blinding Lights - The Weeknd (Acoustic Cover).&quot; By putting the original artist and the massive hit song right at the front of your title, you are essentially hijacking their search traffic. When fans of The Weeknd look for live versions, acoustic versions, or reactions to his songs, your video has a chance to appear in their recommended feed.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                The Anatomy of a Viral Music Reaction Title
              </h3>
              <p>
                If there is one format that consistently generates massive numbers for music channels, it is the reaction video. But the landscape is saturated. You cannot just write &quot;Reacting to BTS.&quot; The most successful music reaction titles leverage authority and extreme emotion. For example, &quot;Vocal Coach Reacts to Dimash Kudaibergen - How Is This Possible?!&quot; This title works brilliantly because it establishes authority (&quot;Vocal Coach&quot;) and sets up an intense emotional hook (&quot;How Is This Possible?!&quot;). It promises the viewer an expert breakdown of something extraordinary. 
              </p>
              <p>
                If you are an instrumentalist, the formula is the same. &quot;Classical Pianist Hears Bohemian Rhapsody for the First Time&quot; creates an irresistible information gap. Viewers who love Queen want to see how a trained classical musician reacts to their favorite song. The title clearly defines the character (Classical Pianist), the subject (Bohemian Rhapsody), and the hook (First Time).
              </p>

              <div className="my-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/xbYcAMeI9JY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                SEO Strategies for Music Producers and Beatmakers
              </h3>
              <p>
                Beatmakers face a completely different set of challenges. Rappers and singers looking for instrumentals don&apos;t search for &quot;Cool dark trap beat 140bpm.&quot; They search for the vibe of an artist they want to sound like. This is why the &quot;Type Beat&quot; economy is so massive. 
              </p>
              <p>
                A well-optimized title for a beatmaker looks like this: &quot;[FREE] Travis Scott x Drake Type Beat 2026 - &apos;NIGHTFALL&apos; | Dark Trap Instrumental.&quot; Let&apos;s break down why this is effective. The word &quot;[FREE]&quot; is a massive psychological trigger that dramatically increases Click-Through Rate (CTR). The combination of two massive artists (&quot;Travis Scott x Drake&quot;) gives the rapper a precise understanding of the beat&apos;s tempo, mood, and style. Adding the current year (&quot;2026&quot;) signals to the algorithm and the creator that the beat sounds modern and isn&apos;t a leftover from five years ago. Finally, the name of the beat and the genre tag (&quot;Dark Trap Instrumental&quot;) provide secondary SEO keywords that help rank the video in broader searches.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                Avoiding the Truncation Trap
              </h3>
              <p>
                One of the most common mistakes musicians make is writing titles that are far too long. YouTube truncates (cuts off) titles that exceed 70 characters on most mobile devices. Since over 70% of YouTube viewership happens on mobile phones, a truncated title can destroy your CTR. 
              </p>
              <p>
                Imagine a title that reads: &quot;My Amazing Acoustic Cover of Someone Like You by Adele Featuring My Friend Sarah on the Cello.&quot; On a phone, the viewer might only see: &quot;My Amazing Acoustic Cover of Someone...&quot; They have no idea what song you are singing. The crucial information—Adele, Someone Like You, Cello—is completely hidden. Always front-load the most important keywords. A better version would be: &quot;Adele - Someone Like You (Acoustic Cello Cover).&quot; It is short, punchy, and instantly communicates the value of the video.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                The Power of Emotional Trigger Words
              </h3>
              <p>
                Music is fundamentally an emotional experience. Your titles should reflect the energy of the track. If you are uploading a heavy metal drum cover, words like &quot;Insane,&quot; &quot;Brutal,&quot; or &quot;Impossible&quot; resonate with the target audience. If you are sharing an ambient, lo-fi beat mix, words like &quot;Chill,&quot; &quot;Relaxing,&quot; or &quot;Late Night&quot; set the appropriate mood.
              </p>
              <p>
                Ultimately, your goal as a music creator on YouTube is to bridge the gap between your art and the audience&apos;s search intent. By understanding what your potential fans are actively typing into the search bar, you can craft titles that serve as a magnet for views. Our AI title generator simplifies this entire process, giving you dozens of highly optimized options so you can spend less time worrying about SEO and more time doing what you actually love: making music.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            How Our Music Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your music topic</strong> — describe your cover, production session, or music review.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to music content.</span>
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
              href="/tools/youtube-title-generator-for-cooking"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🍳 Title Generator for Cooking</span>
              <p className="text-slate-600 text-sm mt-1">Generate mouthwatering titles for recipe tutorials and food content.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate trending hashtags for your music videos to maximize reach and discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube SEO for Musicians
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
              href="/blog/youtube-hashtag-strategy"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Hashtags</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Hashtag Strategy That Actually Works in 2026
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
