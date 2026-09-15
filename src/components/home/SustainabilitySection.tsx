import React from 'react';
import { RefreshCw, Repeat, Sparkles, ShieldCheck, ArrowDown, Leaf } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  const steps = [
    {
      stage: "REDUCE",
      subtitle: "Preventing Premature Landfill Disposal",
      desc: "By safely extending electronic lifecycles and purchasing obsolete models, we divert tons of heavy metals from Pune's landfills and municipal dumps.",
      color: "from-emerald-500 to-emerald-600",
      stats: "Zero Landfill Objective"
    },
    {
      stage: "REUSE",
      subtitle: "Component-Level Refurbishing",
      desc: "Functional components such as RAM modules, power supplies, heatsinks, and LCD backlights are tested and redirected into affordable second-life repairs.",
      color: "from-teal-500 to-teal-600",
      stats: "Circular Economy in Action"
    },
    {
      stage: "RECOVER",
      subtitle: "Precious Secondary Minerals",
      desc: "Dismantled PCBs undergo hydrometallurgical processing to reclaim copper, gold, silver, palladium, and aluminum—reducing the ecological toll of new mining.",
      color: "from-blue-500 to-blue-600",
      stats: "High Secondary Yield"
    },
    {
      stage: "RECYCLE",
      subtitle: "Zero-Pollution Neutralization",
      desc: "Hazardous residues such as lead-impregnated CRT glass and corrosive battery acids are stabilized according to MPCB and Central Pollution Control Board protocols.",
      color: "from-indigo-500 to-indigo-600",
      stats: "100% Scientific Compliance"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>Sustainable Circularity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our 4-Stage Circular Recycling Methodology
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Electronics should never be treated as garbage. We operate a scientific loop ensuring material recovery while safeguarding Pune’s air and ground water.
          </p>
        </div>

        {/* Circular Flow Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.stage}
              className="bg-[#F5F5F0]/70 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-lg mb-4 shadow-sm`}>
                  {index + 1}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {item.stage}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {item.stats}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#1565C0] mb-2">
                  {item.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] font-semibold text-slate-500">
                Phase {index + 1} of Environmental Loop
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
