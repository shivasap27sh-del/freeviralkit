import { aboutFaqs } from '@/data/aboutData';

export function AboutFaqSection() {
  return (
    <section className="glass-card rounded-2xl p-8 md:p-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {aboutFaqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-bold text-slate-800 text-base mb-2">{faq.question}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
