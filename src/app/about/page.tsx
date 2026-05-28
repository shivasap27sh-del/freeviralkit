import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Target, Shield, Users, Sparkles, ArrowRight, GitFork, ExternalLink, Mail, Code2, Database, Globe, Star } from 'lucide-react';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About FreeViralKit — Free AI YouTube SEO Tool',
  description:
    'FreeViralKit is built by Shiva Srivastava, a Computer Science engineer and full-stack developer from India. Learn about the mission to make professional YouTube SEO tools free for every creator.',
  openGraph: {
    title: 'About FreeViralKit — Free AI YouTube SEO Tool',
    description:
      'Learn about FreeViralKit and our mission to help YouTube creators grow faster with AI-powered SEO optimization. Built by Shiva Srivastava.',
    type: 'website',
    url: buildAbsoluteUrl('/about'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/about'),
  },
};

// JSON-LD Person schema for strong E-E-A-T signal
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Shiva Srivastava',
      jobTitle: 'Full Stack Developer & Software Engineer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Sharda University',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
      },
      knowsAbout: [
        'YouTube SEO',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'AI/ML Integration',
        'Web Development',
      ],
      url: buildAbsoluteUrl('/about'),
      sameAs: [
        'https://github.com/shivasap27sh-del',
        'https://www.linkedin.com/in/shiva-srivastava',
      ],
    },
    {
      '@type': 'WebPage',
      name: 'About FreeViralKit',
      description:
        'About page for FreeViralKit — Free AI YouTube SEO Tool built by Shiva Srivastava.',
      url: buildAbsoluteUrl('/about'),
      author: {
        '@type': 'Person',
        name: 'Shiva Srivastava',
      },
    },
  ],
};

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete SEO packages in under 5 seconds using Groq AI inference.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Target,
    title: 'SEO Optimized',
    description: 'Every title, description, and tag is engineered for maximum YouTube discoverability.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Shield,
    title: '100% Free',
    description: 'No subscriptions, no hidden fees, no signup required. Just paste and optimize.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Users,
    title: 'Built for Creators',
    description: 'Designed by a developer who deeply understands the YouTube algorithm and what it takes to grow.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

const techStack = [
  { icon: Code2, name: 'Next.js 16', detail: 'App Router + SSG' },
  { icon: Globe, name: 'Groq AI', detail: 'LLM Inference' },
  { icon: Database, name: 'TypeScript', detail: 'Type-safe codebase' },
  { icon: Star, name: 'Vercel', detail: 'Edge deployment' },
];

const stats = [
  { value: '10+', label: 'Pages Indexed by Google' },
  { value: '100%', label: 'Free — No Signup Required' },
  { value: '<5s', label: 'AI Generation Speed' },
  { value: '7', label: 'SEO Tools in One Place' },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-16" aria-labelledby="about-heading">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> About FreeViralKit
          </div>
          <h1
            id="about-heading"
            className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Helping Creators <span className="text-gradient">Go Viral</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            FreeViralKit is a free, AI-powered YouTube SEO tool that generates optimized titles,
            descriptions, hashtags, and tags — everything you need to rank higher and grow faster,
            completely free.
          </p>
        </section>

        {/* Stats Bar */}
        <section className="glass-card rounded-2xl p-6 mb-12" aria-label="Platform statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-extrabold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="font-display text-2xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We believe every creator deserves access to professional-grade SEO tools, regardless of
            budget. Most YouTube optimization tools charge $20–50/month for features that should be
            free. FreeViralKit changes that.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            By leveraging cutting-edge AI through Groq&apos;s lightning-fast inference engine, we
            provide instant, high-quality YouTube optimization that rivals expensive paid tools —
            completely free, with no account required.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Our AI understands every YouTube niche and generates human-quality titles with proper
            emoji placement, descriptions with strategic keyword placement, and tags that maximize
            your video&apos;s reach in search and suggested videos.
          </p>
        </section>

        {/* Creator Bio — strong E-E-A-T section */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="creator-heading">
          <h2 id="creator-heading" className="font-display text-2xl font-bold mb-6">
            Meet the Creator
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 flex items-center justify-center text-white font-display text-4xl font-extrabold shadow-lg shadow-purple-500/30"
                aria-label="Shiva Srivastava avatar"
              >
                S
              </div>
              {/* Social links */}
              <div className="flex gap-2">
                <a
                  href="https://github.com/shivasap27sh-del"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-600 transition-colors"
                  aria-label="Shiva's GitHub profile"
                  title="GitHub"
                >
                  <GitFork className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shiva-srivastava"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors"
                  aria-label="Shiva's LinkedIn profile"
                  title="LinkedIn"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-600 transition-colors"
                  aria-label="Contact Shiva"
                  title="Contact"
                >
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bio text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-display text-xl font-bold text-slate-900">
                  Shiva Srivastava
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  Full Stack Developer
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 border border-green-500/20">
                  B.Tech CS · Sharda University
                </span>
              </div>

              <p className="text-slate-700 leading-relaxed mb-3">
                Hi, I&apos;m the solo developer behind FreeViralKit. I&apos;m a Computer Science
                engineering graduate (B.Tech, 8th semester) at Sharda University, India. I&apos;ve
                worked as a{' '}
                <strong className="text-slate-900">Full Stack Developer at WooStudios</strong> and a{' '}
                <strong className="text-slate-900">Front End Developer at M2Cloud LLP</strong>,
                building production applications with Next.js, React, TypeScript, and Node.js.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                I built FreeViralKit after seeing creators pay $30–50/month for YouTube SEO tools
                that should be free. With 450+ LeetCode problems solved and 2 production apps
                deployed with 99%+ uptime, I applied those engineering skills to build something
                fast, reliable, and genuinely useful.
              </p>
              <p className="text-slate-700 leading-relaxed">
                FreeViralKit is built with the same attention to quality I bring to every
                project — no shortcuts, no compromises, no paywalls.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="font-display text-2xl font-bold text-center mb-8">
            Built With Modern Tech
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="glass-card rounded-xl p-5 text-center group hover:border-purple-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                  <tech.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="font-display text-sm font-bold text-slate-900 mb-0.5">
                  {tech.name}
                </div>
                <div className="text-xs text-slate-500">{tech.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="font-display text-2xl font-bold text-center mb-8"
          >
            Why Creators Choose FreeViralKit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`glass-card rounded-2xl p-6 group hover:border-purple-500/20 transition-all border ${feature.border}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="how-heading">
          <h2 id="how-heading" className="font-display text-2xl font-bold mb-6">
            How FreeViralKit Works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Enter Your Topic',
                desc: 'Type your video topic or idea into the search box.',
              },
              {
                step: '2',
                title: 'AI Generates 10 Titles',
                desc: 'Our AI creates 10 unique, SEO-optimized titles with emojis and hashtags.',
              },
              {
                step: '3',
                title: 'Pick Your Favorite',
                desc: 'Select the title that best fits your content style and audience.',
              },
              {
                step: '4',
                title: 'Get the Full Package',
                desc: 'Instantly receive an optimized description, hashtags, tags, and pinned comment.',
              },
              {
                step: '5',
                title: 'Copy & Upload',
                desc: 'One-click copy everything directly into YouTube Studio.',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-slate-900 font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center" aria-label="Call to action">
          <h2 className="font-display text-2xl font-bold mb-4">
            Ready to <span className="text-gradient">Supercharge</span> Your Channel?
          </h2>
          <p className="text-slate-600 mb-6">
            Start generating optimized SEO content for your videos — it&apos;s free, always.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg"
            >
              Try FreeViralKit Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 glass-card rounded-xl px-8 py-4 font-semibold text-slate-700 hover:border-purple-500/30 transition-all"
            >
              <Mail className="w-5 h-5" /> Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
