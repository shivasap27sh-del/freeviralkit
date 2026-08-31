import { HelpCircle } from 'lucide-react';
import { homepageFaqs } from '@/data/homeData';

export function HomeFaqAccordion() {
  return (
    <section aria-labelledby="faq-heading" className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clear Answers</span>
        </div>
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
        >
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Everything you need to know about FreeViralKit, safety, and algorithm optimization.
        </p>
      </div>

      <div className="space-y-3 max-w-4xl mx-auto">
        {homepageFaqs.map((faq, i) => (
          <details
            key={i}
            className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800/80 group overflow-hidden transition-all duration-150"
          >
            <summary className="cursor-pointer px-6 py-4 font-bold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <span className="text-sm sm:text-base">{faq.q}</span>
              <span className="text-purple-500 text-xl font-bold leading-none group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed text-sm border-t border-slate-100 dark:border-slate-800/50 pt-3">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
