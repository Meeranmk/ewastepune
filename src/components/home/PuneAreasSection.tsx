import React, { useState } from 'react';
import { MapPin, Navigation, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/locationsData';
import { PuneLocationArea } from '../../types';
import { SITE_CONFIG } from '../../data/siteConfig';

interface PuneAreasSectionProps {
  onSelectAreaForPickup: (areaName: string) => void;
}

export const PuneAreasSection: React.FC<PuneAreasSectionProps> = ({ onSelectAreaForPickup }) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedArea, setSelectedArea] = useState<PuneLocationArea>(LOCATIONS_DATA[0]);

  const zones = ['All', 'East Pune', 'West Pune', 'Central Pune', 'South Pune', 'North / PCMC'];

  const filteredAreas = selectedZone === 'All' 
    ? LOCATIONS_DATA 
    : LOCATIONS_DATA.filter(loc => loc.zone === selectedZone);

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F0] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local Pune Doorstep Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Areas We Serve Across Pune
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Our daily logistics vans cover every residential township, tech park corridor, and industrial zone across Pune with rapid turnaround times.
          </p>
        </div>

        {/* Zone Filter Chips */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedZone === zone
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Interactive Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Area Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredAreas.map((loc) => {
              const isSelected = selectedArea.slug === loc.slug;
              return (
                <div
                  key={loc.slug}
                  onClick={() => setSelectedArea(loc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#2E7D32] ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-slate-900">{loc.name}</span>
                        {loc.featuredHub && (
                          <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 rounded">
                            Facility Hub
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{loc.zone}</span>
                    </div>
                    <Navigation className={`w-4 h-4 ${isSelected ? 'text-[#2E7D32]' : 'text-slate-300'}`} />
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {loc.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold">{loc.pickupSpeed}</span>
                    <span className="text-blue-600 font-medium">Select →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Area Focal Details & Pickup Action */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
                Location Pickup Details
              </span>
              <span className="text-xs text-slate-400 font-medium">{selectedArea.zone}</span>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3 className="text-2xl font-extrabold text-slate-900">{selectedArea.name}</h3>
              </div>
              {selectedArea.marathiName && (
                <span className="text-xs text-slate-500 block pl-7">
                  स्थानिक सेवा: {selectedArea.marathiName}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedArea.description}
            </p>

            {/* Landmark Coverage */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Prominent Landmarks & Routes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedArea.landmarks.map((lm, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white rounded-md border border-slate-200 text-slate-700">
                    {lm}
                  </span>
                ))}
              </div>
            </div>

            {/* Turnaround Guarantee */}
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-100">
              <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <strong className="block font-bold">Guaranteed Response Speed:</strong>
                <span>{selectedArea.pickupSpeed}</span>
              </div>
            </div>

            {/* Book in this area */}
            <button
              onClick={() => onSelectAreaForPickup(selectedArea.name.split(' (')[0])}
              className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Schedule Pickup in {selectedArea.name.split(' (')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {selectedArea.slug === 'hadapsar' && (
              <p className="text-[11px] text-slate-500 text-center">
                *Walk-in drop-offs welcome at our facility: {SITE_CONFIG.address.street}
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
