import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Target, Shield, Users, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About TubeBoost — Free AI YouTube SEO Tool',
  description: 'TubeBoost is a free AI-powered YouTube SEO optimization tool that helps creators generate viral titles, descriptions, hashtags, and tags. Built by Shiva.',
  openGraph: {
    title: 'About TubeBoost — Free AI YouTube SEO Tool',
    description: 'Learn about TubeBoost and our mission to help YouTube creators grow faster with AI-powered SEO optimization.',
    type: 'website',
    url: 'https://tubeboost.com/about',
  },
  alternates: {
    canonical: 'https://tubeboost.com/about',
  },
};

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete SEO packages in under 5 seconds using Groq AI inference.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Target,
    title: 'SEO Optimized',
    description: 'Every title, description, and tag is engineered for maximum YouTube discoverability.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: '100% Free',
    description: 'No subscriptions, no hidden fees, no signup required. Just paste and optimize.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Users,
    title: 'Built for Creators',
    description: 'Designed by a creator who understands the YouTube algorithm and what it takes to grow.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
];

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> About Us
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          Helping Creators <span className="text-gradient">Go Viral</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          TubeBoost is a free, AI-powered YouTube SEO tool that generates optimized titles,
          descriptions, hashtags, and tags — everything you need to rank higher and grow faster.
        </p>
      </section>

      {/* Mission */}
      <section className="glass-card rounded-2xl p-8 md:p-10 mb-12">
        <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          We believe every creator deserves access to professional-grade SEO tools, regardless
          of budget. Most YouTube optimization tools charge $20-50/month for features that should
          be free. TubeBoost changes that.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          By leveraging cutting-edge AI through Groq&apos;s lightning-fast inference engine, we provide
          instant, high-quality YouTube optimization that rivals expensive paid tools — completely free.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Our AI understands every YouTube niche and generates human-quality titles with proper
          emoji placement, descriptions with strategic keyword placement, and tags that maximize
          your video&apos;s reach in search and suggested videos.
        </p>
      </section>

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Why Creators Choose TubeBoost</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card rounded-2xl p-6 group hover:border-purple-500/20 transition-all">
              <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="glass-card rounded-2xl p-8 md:p-10 mb-12">
        <h2 className="font-display text-2xl font-bold mb-6">How TubeBoost Works</h2>
        <div className="space-y-6">
          {[
            { step: '1', title: 'Enter Your Topic', desc: 'Type your video topic or idea into the search box.' },
            { step: '2', title: 'AI Generates 10 Titles', desc: 'Our AI creates 10 unique, SEO-optimized titles with emojis and hashtags.' },
            { step: '3', title: 'Pick Your Favorite', desc: 'Select the title that best fits your content style and audience.' },
            { step: '4', title: 'Get the Full Package', desc: 'Instantly receive an optimized description, hashtags, tags, and pinned comment.' },
            { step: '5', title: 'Copy & Upload', desc: 'One-click copy everything directly into YouTube Studio.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="font-display text-2xl font-bold mb-4">
          Ready to <span className="text-gradient">Supercharge</span> Your Channel?
        </h2>
        <p className="text-gray-400 mb-6">Start generating optimized SEO content for your videos — it&apos;s free.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 font-semibold text-lg"
        >
          Try TubeBoost Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
