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
  XCircle, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { ACCEPTED_ITEMS_DATA } from '../../data/acceptedItemsData';

interface WhatWeAcceptViewProps {
  onOpenPickupModal: (category?: string) => void;
}

export const WhatWeAcceptView: React.FC<WhatWeAcceptViewProps> = ({ 
  onOpenPickupModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const filteredCategories = ACCEPTED_ITEMS_DATA.filter(cat => {
    const matchesCat = selectedCategoryId === 'all' || cat.id === selectedCategoryId;
    const matchesSearch = searchTerm === '' || 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.items.some(it => it.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <span>Accepted Electronics Catalog • Pune</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What E-Waste We Buy & Recycle in Pune
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Working, broken, obsolete, or completely burnt out. Browse our accepted items with certified doorstep pickup and instant scrap valuation.
          </p>
        </div>

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
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategoryId === 'all'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {ACCEPTED_ITEMS_DATA.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
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

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-[border-color,box-shadow] duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Category Photo */}
                <div className="h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 relative border border-slate-100 shadow-2xs">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
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
