import React, { useState } from 'react';
import { 
  Laptop, 
  Monitor, 
  Server, 
  Printer, 
  Tv, 
  Smartphone, 
  Network, 
  Cable, 
  BatteryCharging, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ACCEPTED_ITEMS_DATA } from '../../data/acceptedItemsData';
import { AcceptedItemCategory } from '../../types';

interface AcceptedItemsSectionProps {
  onSelectCategoryForPickup: (categoryName: string) => void;
}

export const AcceptedItemsSection: React.FC<AcceptedItemsSectionProps> = ({
  onSelectCategoryForPickup
}) => {
  const [activeCategory, setActiveCategory] = useState<AcceptedItemCategory>(ACCEPTED_ITEMS_DATA[0]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Printer': return <Printer className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Cable': return <Cable className="w-5 h-5" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F0] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#1565C0] border border-blue-200 text-xs font-bold mb-3">
            <span>Accepted Electronics Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What E-Waste We Accept in Pune
          </h2>
          <p className="text-base text-slate-600 mt-3">
            We purchase and responsibly recycle almost any electronic device or scrap component. Working or completely dead—nothing goes to landfill.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ACCEPTED_ITEMS_DATA.map((cat) => {
            const isCurrent = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center space-x-2 shrink-0 ${
                  isCurrent
                    ? 'bg-[#2E7D32] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{getCategoryIcon(cat.iconName)}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Deep Dive Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image, Description, Items */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {/* Category Image Banner */}
                <div className="relative rounded-2xl overflow-hidden mb-5 border border-slate-200 shadow-xs h-52 sm:h-64 group">
                  <img
                    src={activeCategory.imageUrl}
                    alt={activeCategory.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                        {getCategoryIcon(activeCategory.iconName)}
                      </div>
                      <span className="font-extrabold text-lg sm:text-xl drop-shadow-sm">{activeCategory.name}</span>
                    </div>
                    <span className="text-xs bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-full shadow-xs">
                      Pune Pickup
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {activeCategory.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              {/* Items List */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Typical Examples Accepted:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {activeCategory.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental impact note */}
              <div className="flex items-start space-x-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Why Recycle This in Pune:</strong>
                  <span>{activeCategory.environmentalImpact}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Conditions, What We Don't Accept, Booking CTA */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Acceptance Criteria
                </span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{activeCategory.acceptedCriteria}</span>
                </div>
              </div>

              {activeCategory.notAccepted.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    What We Cannot Accept
                  </span>
                  <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-xs text-red-700 space-y-1">
                    {activeCategory.notAccepted.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onSelectCategoryForPickup(activeCategory.name)}
                  className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Book Pickup for {activeCategory.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  Free doorstep collection across all Pune pin codes.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
