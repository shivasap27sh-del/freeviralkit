import type { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us — FreeViralKit',
  description: 'Have questions, feedback, or partnership inquiries? Get in touch with the FreeViralKit team.',
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — FreeViralKit',
    description: 'Have questions, feedback, or partnership inquiries? Get in touch with the FreeViralKit team.',
  },
  openGraph: {
    title: 'Contact Us — FreeViralKit',
    description: 'Get in touch with the FreeViralKit team for support, feedback, or partnerships.',
    type: 'website',
    url: buildAbsoluteUrl('/contact'),
  },
  alternates: {
    canonical: buildAbsoluteUrl('/contact'),
  },
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-purple-500 bg-purple-500/10 border border-purple-500/20 mb-6 uppercase tracking-wider backdrop-blur-sm">
          <MessageSquare className="w-4 h-4" /> Reach Out
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900 dark:text-white"> Let's Talk </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Have a question, suggestion, or want to collaborate? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 border border-slate-200/80 dark:border-slate-700/50 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 relative z-10">
              Direct Contact
            </h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 text-purple-500 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                  <a href="mailto:support@freeviralkit.com" className="text-slate-500 dark:text-slate-400 text-sm hover:text-purple-500 transition-colors">support@freeviralkit.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 text-blue-500 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Response Time</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Under 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 text-emerald-500 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Support Hours</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6"
          >
            {/* Web3Forms required inputs */}
            <input type="hidden" name="access_key" value="be47cc94-ae28-4ca2-9af6-6716d3150d5a" />
            <input type="hidden" name="from_name" value="FreeViralKit Contact Form" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Reason for Contact</label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none shadow-sm cursor-pointer"
                >
                  <option value="" disabled>Select a topic...</option>
                  <option value="General Support">General Support</option>
                  <option value="Bug Report">Report a Bug / Technical Issue</option>
                  <option value="Feature Request">Suggest a New Feature</option>
                  <option value="Business Partnership">Business Partnership</option>
                  <option value="Advertising">Advertising Inquiry</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none shadow-sm"
                placeholder="Tell us exactly how we can help you today..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Mail className="w-5 h-5" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ mini */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400">Find quick answers to common questions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'Is FreeViralKit really free?',
              a: 'Yes! FreeViralKit is 100% free to use. No signup, no credit card, no hidden fees.',
            },
            {
              q: 'How does the AI generate titles?',
              a: 'We use advanced language models trained on millions of successful YouTube titles and SEO patterns to predict high-CTR combinations.',
            },
            {
              q: 'Can I use FreeViralKit for any YouTube niche?',
              a: 'Absolutely. Our AI auto-detects your niche and generates content optimized for gaming, tech, cooking, vlogs, education, and more.',
            },
            {
              q: 'How do I report a bug or suggest a feature?',
              a: 'Use the contact form above and select the appropriate topic. We read every single message and actively implement user feedback.',
            },
          ].map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 mt-1">
                  <span className="font-bold text-sm">Q</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
