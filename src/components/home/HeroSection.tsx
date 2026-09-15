import React from 'react';
import { 
  Truck, 
  Banknote, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Recycle,
  Building2,
  Scale
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface HeroSectionProps {
  onOpenPickupModal: () => void;
  onNavigateToServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPickupModal,
  onNavigateToServices
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-[#F5F5F0] to-[#F5F5F0] pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200">
      
      {/* Background Decorative subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1565C0_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Central Facility Location Pill */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-300 text-[#2E7D32] shadow-xs text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
            <span>Pune Metropolitan Service Hub: Hadapsar (Survey No. 89, Hingane Mala)</span>
          </div>
          <span className="text-xs text-slate-500 hidden md:inline">
            • Daily collection routes across Hadapsar, Hinjewadi, Kharadi, Kothrud & PCMC
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center sm:text-left space-y-6">
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              E-Waste in Pune: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#1565C0]">
                #1 Recycling & Scrap Buyers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Looking for certified <strong>e-waste recycling in Pune</strong>? We are Pune’s authorized electronic scrap buyers and collection center. Enjoy free doorstep pickup across Hadapsar, Hinjewadi, Kharadi, Kothrud & all Pune areas with instant digital weighing, on-the-spot UPI or cash payout, and 100% legal compliance.
            </p>

            {/* 4 Trust Badges from PRD Section 7 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { title: "Doorstep Collection", sub: "Free across Pune" },
                { title: "Responsible Recycling", sub: "MPCB compliant" },
                { title: "Residential & Corporate", sub: "All quantities" },
                { title: "Pune-Wide Service", sub: "Same/next day" }
              ].map((badge) => (
                <div key={badge.title} className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-[#2E7D32]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">{badge.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block pl-5">{badge.sub}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenPickupModal}
                className="px-7 py-4 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-[background-color,box-shadow,transform] duration-150 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-98"
              >
                <Truck className="w-5 h-5" />
                <span>Schedule Free Pickup</span>
              </button>

              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="px-5 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{SITE_CONFIG.formattedPhone}</span>
              </a>
            </div>

            {/* Micro details */}
            <div className="text-xs text-slate-500 flex items-center space-x-2 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>We buy: Dead Laptops, CPUs, Servers, CRT/LCD Screens, Inverter Batteries, Copper Wires & Telecom Gear.</span>
            </div>

          </div>

              {/* Right Hero Interactive Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl relative overflow-hidden space-y-5">
              
              {/* Operational Facility Image Header */}
              <div className="relative rounded-2xl overflow-hidden h-44 sm:h-48 border border-slate-100 shadow-2xs group">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                  alt="Pune E-Waste Recycling Operations"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center space-x-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>Pune Doorstep Fleet Active</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Hadapsar Facility & Mobile Van</span>
                  <span className="text-sm font-extrabold text-white drop-shadow-sm">
                    Certified Digital Scale & Immediate Payout
                  </span>
                </div>
              </div>

              {/* Items we accept quick-list */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">What We Buy & Recycle</span>
                    <span className="text-[10px] text-slate-500">Doorstep pickup across all Pune pin codes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium pt-1">
                  <div className="flex items-center space-x-1.5 bg-white p-2 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Laptops</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white p-2 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complete PC Towers</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white p-2 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Inverter Batteries / UPS</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white p-2 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Copper Wires & Servers</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenPickupModal}
                  className="w-full py-3 px-4 bg-[#2E7D32] hover:bg-[#256629] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-[background-color,box-shadow,transform] duration-150 flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                >
                  <Truck className="w-4 h-4" />
                  <span>Schedule Free Doorstep Pickup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Instant WhatsApp Direct Trigger */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block">
                    Fast Evaluation
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm">WhatsApp Photo of Your Scrap</span>
                </div>
                <a
                  href={getWhatsAppLink('Hi! I have electronic scrap in Pune and want to calculate its scrap value.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white text-emerald-800 rounded-lg text-xs font-bold shadow-xs hover:bg-emerald-50 transition-colors whitespace-nowrap"
                >
                  Send on WhatsApp
                </a>
              </div>

              {/* Facility address link */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center space-x-1 truncate max-w-[240px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hadapsar: Survey No. 89, Hingane Mala</span>
                </span>
                <button
                  onClick={onNavigateToServices}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  View Services →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
