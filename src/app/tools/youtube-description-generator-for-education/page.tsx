import type { Metadata } from 'next';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Description Generator for Education | FreeViralKit',
  description:
    'Free AI-powered YouTube description generator for education channels. Create structured, keyword-rich descriptions for lectures, tutorials, exam prep, and online courses. Boost SEO and student engagement.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-description-generator-for-education'),
  },
  openGraph: {
    title: 'YouTube Description Generator for Education | FreeViralKit',
    description:
      'Create education-focused YouTube descriptions that rank in search. Free AI tool for educators and online course creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-description-generator-for-education'),
  },
  keywords: [
    'youtube description generator education',
    'educational youtube description',
    'education video description',
    'lecture description generator',
    'tutorial description template',
    'youtube education seo',
    'online course description',
    'exam prep video description',
  ],
};

const descriptionStructure = [
  {
    step: 'Hook',
    description: 'Open with what students will learn in this video. Front-load the keyword so YouTube understands the topic.',
    example: '"Learn how to solve quadratic equations step-by-step in under 10 minutes. Perfect for Class 10 board exam preparation."',
  },
  {
    step: 'Content Summary',
    description: 'Provide a 2-3 sentence overview of what the lesson covers, using natural language with relevant keywords.',
    example: '"This lesson covers the quadratic formula, factoring method, and completing the square. We work through 5 practice problems with detailed explanations."',
  },
  {
    step: 'Timestamps',
    description: 'Add chapter timestamps so students can jump to specific sections. Google also picks these up as "Key Moments" in search.',
    example: '"0:00 Introduction\\n1:30 The Quadratic Formula\\n4:00 Factoring Method\\n7:00 Practice Problems"',
  },
  {
    step: 'Resources & Links',
    description: 'Link to practice worksheets, related lessons, your course page, or study materials mentioned in the video.',
    example: '"📝 Download the practice worksheet: [link]\\n📚 Related lesson — Linear Equations: [link]"',
  },
  {
    step: 'Call to Action',
    description: 'Encourage students to subscribe, comment with questions, or share with classmates who need help.',
    example: '"👍 Like if this helped! 💬 Drop your doubts in the comments — I reply to every question. 🔔 Subscribe for daily lessons."',
  },
  {
    step: 'Hashtags',
    description: 'End with 5-8 relevant education hashtags. The first 3 appear above your video title as clickable links.',
    example: '"#Mathematics #QuadraticEquations #BoardExam #StudyTips #LearnOnYouTube"',
  },
];

const exampleDescriptions = [
  {
    type: 'Math Tutorial',
    preview: 'Learn how to solve quadratic equations using 3 different methods — the quadratic formula, factoring, and completing the square. Step-by-step walkthrough with 5 practice problems. Perfect for Class 10 and SAT prep.',
  },
  {
    type: 'Science Lecture',
    preview: 'Understanding photosynthesis: the light reactions and Calvin cycle explained simply. This lesson covers everything from chloroplast structure to the role of ATP and NADPH. Ideal for biology students in grades 9-12.',
  },
  {
    type: 'Language Learning',
    preview: 'Master the 50 most common English phrasal verbs with examples and practice exercises. Perfect for intermediate ESL learners preparing for IELTS, TOEFL, or everyday conversation.',
  },
];

const tips = [
  {
    title: 'Front-load your keyword in the first line',
    description:
      'The first 150 characters of your description appear in YouTube search results. Start with what the lesson teaches, not "Hey students, welcome back!"',
  },
  {
    title: 'Write at least 200 words',
    description:
      'YouTube gives more weight to videos with detailed descriptions. Think of it as a mini lesson plan — summarize the topic, list what students will learn, and include relevant terminology.',
  },
  {
    title: 'Always add timestamps',
    description:
      'Timestamps help students find specific topics within your video. Google also shows them as "Key Moments" in search results, massively boosting visibility.',
  },
  {
    title: 'Link to related lessons',
    description:
      'Create a learning path by linking to prerequisite and follow-up videos. This increases watch time across your channel and helps students learn in sequence.',
  },
  {
    title: 'Include exam/curriculum references',
    description:
      'Mention specific exams (SAT, IELTS, Board Exams) or curricula (CBSE, NCERT, AP) in your description. Students searching for exam-specific content will find your video.',
  },
  {
    title: 'Use education-specific hashtags',
    description:
      'Hashtags like #LearnOnYouTube, #StudyTips, and subject-specific tags help YouTube categorize your content and connect it to student searches.',
  },
];

const faqs = [
  {
    question: 'What should an educational YouTube description include?',
    answer:
      'A good educational YouTube description should include: a clear learning objective in the first line, a content summary with relevant keywords, timestamps for each section, links to resources and related lessons, a call to action, and 5-8 relevant hashtags.',
  },
  {
    question: 'How long should an education video description be?',
    answer:
      'Aim for 200-300 words minimum. Longer descriptions help YouTube understand your content better and improve search rankings. Include your topic keywords naturally, list learning outcomes, and provide timestamps.',
  },
  {
    question: 'Do timestamps help educational videos rank better?',
    answer:
      'Yes! Timestamps improve user experience and also enable Google\'s "Key Moments" feature, which shows chapter markers directly in Google Search results. This significantly boosts visibility for educational content.',
  },
  {
    question: 'Is this education description generator free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, no hidden fees. Generate unlimited educational video descriptions powered by AI.',
  },
  {
    question: 'Can I use this for online courses and exam prep videos?',
    answer:
      'Absolutely. The AI description generator works for all educational content including lectures, tutorials, exam preparation, online courses, language learning, science experiments, and coding tutorials.',
  },
  {
    question: 'How do descriptions help educational videos get more views?',
    answer:
      'YouTube\'s algorithm reads your description to understand what your video covers and who to recommend it to. A detailed, keyword-rich description helps YouTube match your video with relevant searches, driving more organic views from students actively looking for that topic.',
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
  name: 'YouTube Description Generator for Education — FreeViralKit',
  url: 'https://freeviralkit.com/tools/youtube-description-generator-for-education',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description:
    'Free AI-powered YouTube description generator for education channels. Create structured, SEO-optimized descriptions for lectures, tutorials, and exam prep videos.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function EducationDescriptionLandingPage() {
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
            YouTube Description Generator for <span className="text-gradient">Education</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Build clear, SEO-optimized descriptions for educational videos with topic summaries, learning outcomes, timestamps, and calls to action. Built for educators.
          </p>
          <Link
            href="/youtube-description-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Education Descriptions Free →
          </Link>
        </section>

        {/* Why it matters */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Descriptions Matter for Educational Content
          </h2>
          <p className="text-slate-600 mb-4">
            Educational YouTube videos compete in one of the most search-driven categories on the platform. Students don&apos;t browse — they <strong className="text-slate-900">search</strong>. &ldquo;How to solve quadratic equations,&rdquo; &ldquo;photosynthesis explained simply,&rdquo; &ldquo;IELTS speaking tips.&rdquo; Your description is what tells YouTube&apos;s algorithm whether your video is the right answer.
          </p>
          <p className="text-slate-600 mb-4">
            A detailed, well-structured description helps YouTube understand your lesson&apos;s topic, connect it to relevant searches, and recommend it to students who need exactly what you teach. Yet most educators skip the description entirely or write a single line.
          </p>
          <p className="text-slate-600">
            Our AI generates complete, structured descriptions specifically designed for educational content — with learning objectives, content summaries, and proper keyword placement that drives organic traffic from students worldwide.
          </p>
        </section>

        {/* Description structure */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            The Perfect Education Description Structure
          </h2>
          <div className="space-y-6">
            {descriptionStructure.map((item, i) => (
              <div key={item.step}>
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.step}</h3>
                    <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                    <p className="text-slate-500 text-xs mt-2 italic bg-slate-50 rounded-lg p-3 border border-slate-200">
                      {item.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InContentAd slot={adSlots.educationLanding} />

        {/* Example descriptions */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Example Descriptions by Subject
          </h2>
          <div className="space-y-4">
            {exampleDescriptions.map((desc) => (
              <div key={desc.type} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-purple-400">{desc.type}</span>
                <p className="text-slate-600 text-sm mt-2">{desc.preview}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            6 Tips for Better Education Video Descriptions
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
            How Our Education Description Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your lesson topic</strong> — describe what your educational video covers and the target audience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates a complete description</strong> — with learning objectives, content summary, keywords, and calls to action.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Add timestamps and publish</strong> — customize with your specific chapter markers and paste into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-description-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Description Generator
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
              <p className="text-slate-600 text-sm mt-1">Generate click-worthy titles for gameplay, walkthroughs, and gaming challenges.</p>
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
              <p className="text-slate-600 text-sm mt-1">Generate complete, SEO-optimized descriptions for any YouTube video topic.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube Descriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-description-tips"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Descriptions</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                7 YouTube Description Tips That Actually Boost Views
              </h3>
            </Link>
            <Link
              href="/blog/youtube-seo-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">YouTube SEO</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                The Ultimate YouTube SEO Guide for 2026
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
