import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Truck, 
  HardDrive
} from 'lucide-react';

interface ResidentialCorporateSectionProps {
  onOpenPickupModal: () => void;
  onOpenCorporateEnquiry: () => void;
}

export const ResidentialCorporateSection: React.FC<ResidentialCorporateSectionProps> = ({
  onOpenPickupModal,
  onOpenCorporateEnquiry
}) => {
  const [activeTab, setActiveTab] = useState<'residential' | 'corporate'>('residential');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Pills */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-slate-100 rounded-2xl inline-flex space-x-1 border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'residential'
                  ? 'bg-white text-[#2E7D32] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Residential Households</span>
            </button>

            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center space-x-2 transition-colors cursor-pointer ${
                activeTab === 'corporate'
                  ? 'bg-white text-[#1565C0] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Corporate & Enterprises</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'residential' ? (
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Home className="w-3.5 h-3.5" />
                <span>Household E-Waste Recycling in Pune</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Clear Clutter from Your Home & Get Paid on the Spot
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Got broken laptops in your drawer, an old desktop CPU gathering dust, or tangled cords in your store room? Don't let toxic electronics sit in your apartment or end up in Pune municipal trash bins.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Free weekend & evening doorstep pickup",
                  "Digital weighing scales right at your door",
                  "Instant UPI or Cash settlement",
                  "Safe recycling for old TVs, PCs & laptops",
                  "Batteries & UPS safely neutralized",
                  "No minimum weight restrictions on route days"
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenPickupModal}
                  className="px-7 py-3.5 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Sell Household E-Waste</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Popular Household Items We Pick Up:
              </span>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="font-semibold">Old Broken Laptops</span>
                  <span className="text-emerald-700 font-bold">₹400 – ₹4,500+</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="font-semibold">Complete CPU Desktop Tower</span>
                  <span className="text-emerald-700 font-bold">₹300 – ₹2,500+</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="font-semibold">Inverter Battery / UPS</span>
                  <span className="text-emerald-700 font-bold">₹450 – ₹3,500+</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                  <span className="font-semibold">Old CRT or LED Monitor</span>
                  <span className="text-emerald-700 font-bold">₹100 – ₹1,200+</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                *We also collect mobile phones, chargers, irons, and home routers for recycling.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 rounded-3xl p-8 sm:p-12 border border-blue-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-[#1565C0] text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise & IT Park Solutions</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Corporate IT Asset Disposal & Statutory Compliance
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Dedicated corporate solutions for software development firms, colocation datacenters, banks, hospitals, and educational universities across Hinjewadi, Kharadi, Magarpatta, and Pune MIDC zones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Form-6 Hazardous Waste Manifest Documentation",
                  "Green Recycling Certificate for ESG disclosures",
                  "On-site physical shredding & degaussing",
                  "Serialized barcoded asset tracking manifests",
                  "Bulk lot purchasing with maximum ITAD value recovery",
                  "Custom locked collection bins for corporate campuses"
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1565C0] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={onOpenCorporateEnquiry}
                  className="px-7 py-3.5 bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Request Corporate Proposal</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Industries We Serve in Pune:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                {[
                  "IT & Software Parks",
                  "Datacenters & Cloud",
                  "BFSI & Banking",
                  "Hospitals & Clinics",
                  "Schools & Universities",
                  "Auto & Manufacturing",
                  "Startups & Co-working",
                  "Telecom Operators"
                ].map((ind) => (
                  <div key={ind} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span className="truncate">{ind}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900">
                <strong className="block">Need NDA & Compliance Manifest?</strong>
                <span>Our legal team executes bilateral Non-Disclosure Agreements prior to hardware inspection.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
