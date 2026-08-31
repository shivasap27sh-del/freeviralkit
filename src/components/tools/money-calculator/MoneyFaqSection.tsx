import { HelpCircle } from 'lucide-react';
import { moneyCalculatorFaqs } from '@/data/moneyCalculatorData';

export function MoneyFaqSection() {
  return (
    <section aria-labelledby="money-faq-heading" className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 text-cyan-700 dark:text-cyan-400 mb-2 uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Earnings FAQs</span>
        </div>
        <h2
          id="money-faq-heading"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {moneyCalculatorFaqs.map((faq, i) => (
          <details
            key={i}
            className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 group cursor-pointer transition-all duration-150 shadow-sm"
          >
            <summary className="font-bold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4 text-sm sm:text-base hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <span>{faq.q}</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
