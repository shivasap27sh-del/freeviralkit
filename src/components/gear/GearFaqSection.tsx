import { HelpCircle } from 'lucide-react';
import { gearFaqs } from '@/data/creatorGearData';

export function GearFaqSection() {
  return (
    <section className="glass-card rounded-2xl p-8 md:p-10 mt-12" aria-labelledby="gear-faq-heading">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-purple-500" aria-hidden="true" />
        <h2 id="gear-faq-heading" className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
          Frequently Asked Questions About Creator Gear
        </h2>
      </div>
      <div className="space-y-6">
        {gearFaqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
