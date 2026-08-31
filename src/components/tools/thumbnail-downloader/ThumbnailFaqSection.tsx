import { HelpCircle } from 'lucide-react';
import { thumbnailFaqs } from '@/data/thumbnailDownloaderData';

export function ThumbnailFaqSection() {
  return (
    <section aria-labelledby="thumb-faq-heading" className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-cyan-400 mb-2 uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Creator FAQ</span>
        </div>
        <h2
          id="thumb-faq-heading"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {thumbnailFaqs.map((faq, i) => (
          <details
            key={i}
            className="glass-card rounded-2xl border border-slate-800 bg-slate-900/90 p-5 group cursor-pointer transition-all duration-150"
          >
            <summary className="font-bold text-white select-none list-none flex items-center justify-between gap-4 text-sm sm:text-base hover:text-cyan-400 transition-colors">
              <span>{faq.q}</span>
              <span className="text-cyan-400 font-bold text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
