import { homepageFaqs } from '@/data/homeData';

export function HomeFaqAccordion() {
  return (
    <section className="mt-12 mb-8">
      <h2 className="font-display text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {homepageFaqs.map((faq, i) => (
          <details key={i} className="glass-card rounded-xl group">
            <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
              {faq.q}
              <span className="text-purple-400 text-xl leading-none group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
