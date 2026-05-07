import type { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — TubeBoost',
  description: 'Have questions, feedback, or partnership inquiries? Get in touch with the TubeBoost team.',
  openGraph: {
    title: 'Contact Us — TubeBoost',
    description: 'Get in touch with the TubeBoost team for support, feedback, or partnerships.',
    type: 'website',
    url: 'https://tubeboost.com/contact',
  },
  alternates: {
    canonical: 'https://tubeboost.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 mb-6 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" /> Get In Touch
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact Card */}
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Send Us a Message</h2>
            <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
          </div>
        </div>

        <form
          action="https://formsubmit.co/your-email@example.com"
          method="POST"
          className="space-y-5"
        >
          {/* Anti-spam */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://tubeboost.com/contact" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" /> Send Message
          </button>
        </form>
      </div>

      {/* FAQ mini */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Is TubeBoost really free?',
              a: 'Yes! TubeBoost is 100% free to use. No signup, no credit card, no hidden fees.',
            },
            {
              q: 'How does the AI generate titles?',
              a: 'We use Groq AI with advanced language models trained on millions of successful YouTube titles and SEO patterns.',
            },
            {
              q: 'Can I use TubeBoost for any YouTube niche?',
              a: 'Absolutely. Our AI auto-detects your niche and generates content optimized for gaming, tech, cooking, vlogs, education, and more.',
            },
            {
              q: 'How do I report a bug or suggest a feature?',
              a: 'Use the contact form above or email us directly. We read every message and actively implement user feedback.',
            },
          ].map((faq, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <h3 className="font-display text-base font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
