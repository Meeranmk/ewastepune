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
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { ACCEPTED_ITEMS_DATA } from '../../data/acceptedItemsData';
import { SubpageHero } from './SubpageHero';

interface WhatWeAcceptViewProps {
  onOpenPickupModal: (category?: string) => void;
  onNavigate?: (path: string) => void;
  initialCategory?: string;
}

export const WhatWeAcceptView: React.FC<WhatWeAcceptViewProps> = ({ 
  onOpenPickupModal,
  onNavigate,
  initialCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategory || 'all'
  );

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategoryId(initialCategory);
    }
  }, [initialCategory]);

  const filteredCategories = ACCEPTED_ITEMS_DATA.filter(cat => {
    const matchesCat = selectedCategoryId === 'all' || cat.id === selectedCategoryId;
    const matchesSearch = searchTerm === '' || 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.items.some(it => it.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Subpage Hero */}
      <SubpageHero
        badge="Accepted Electronics Catalog"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        title="What E-Waste We Buy & Recycle in Pune"
        description="Working, damaged, obsolete, or decommissioned electronics. Browse our accepted items catalog with doorstep pickup, accurate electronic weighing, and instant scrap valuation."
        breadcrumbs={[
          { label: 'Home', href: '/', onClick: () => onNavigate?.('/') },
          { label: 'What We Accept' },
        ]}
        onOpenPickupModal={() => onOpenPickupModal()}
        stats={[
          { label: 'Accepted Items', value: '100+' },
          { label: 'Doorstep Pickup', value: 'All Pune' },
          { label: 'Weight Scales', value: 'Certified' },
          { label: 'Scrap Valuation', value: 'Instant' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <label htmlFor="accept-category-search" className="sr-only">
              Search accepted e-waste items
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              id="accept-category-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search e.g. Dell laptop, UPS battery, printer..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {ACCEPTED_ITEMS_DATA.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-5 bg-slate-100">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900/70 backdrop-blur-xs">
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Pune Pickup
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Accepted Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span key={item} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/50 rounded-xl text-[11px] text-emerald-900 mb-4">
                  <strong>Condition:</strong> {cat.acceptedCriteria}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenPickupModal(cat.name)}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-[#2E7D32] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Book Pickup for {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
