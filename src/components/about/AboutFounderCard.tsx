import Link from 'next/link';
import { GitFork, ExternalLink, Mail, ArrowRight } from 'lucide-react';

export function AboutFounderCard() {
  return (
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

        {/* Bio Content */}
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
              Shiva Srivastava
            </h3>
            <p className="text-purple-600 font-medium text-xs">
              Founder &amp; Lead Engineer, FreeViralKit &bull; CS Graduate, Sharda University
            </p>
          </div>

          <p>
            Hi, I&apos;m Shiva — a software engineer and full-stack developer based in Greater Noida, India. I hold a degree in Computer Science and Engineering from Sharda University, where I specialized in modern web architectures and AI application integration.
          </p>
          <p>
            I built FreeViralKit from the ground up because I saw too many creators getting stuck paying monthly subscription fees for basic tools. As someone who writes code, studies search algorithms, and creates content, I wanted to build something genuinely useful, completely free, and lightning-fast.
          </p>

          {/* Credentials chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Full-Stack Developer',
              'Next.js & React',
              'YouTube Algorithm Research',
              'AI/LLM Engineering',
              'Greater Noida, India',
            ].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Get in touch with Shiva <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
