import { aboutValues, aboutTechStack } from '@/data/aboutData';

export function AboutValuesGrid() {
  return (
    <>
      {/* Values Grid */}
      <section className="mb-12" aria-labelledby="values-heading">
        <h2 id="values-heading" className="font-display text-2xl font-bold mb-6 text-center">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutValues.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-transform"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${value.bg} ${value.color} border ${value.border} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass-card rounded-2xl p-8 mb-12" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="font-display text-2xl font-bold mb-2 text-center">
          Built with Modern Web Technologies
        </h2>
        <p className="text-slate-600 text-sm text-center mb-6">
          Engineered for speed, reliability, and edge delivery.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {aboutTechStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-800">{tech.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{tech.detail}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
