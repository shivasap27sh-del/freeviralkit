import { toolsFaqs } from '@/data/toolsCatalog';

export function ToolsFaqAccordion() {
  return (
    <section className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Everything you need to know about our free YouTube creator toolkit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toolsFaqs.map((faq, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80"
          >
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              {faq.question}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
