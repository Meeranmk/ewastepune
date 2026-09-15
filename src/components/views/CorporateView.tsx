import React from 'react';
import { Building2 } from 'lucide-react';
import { CorporateOverview } from './corporate/CorporateOverview';
import { CorporateEnquiryForm } from './corporate/CorporateEnquiryForm';

export const CorporateView: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise ITAD & Compliance Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Corporate E-Waste Management & IT Asset Disposal in Pune
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Statutory environmental compliance, certified on-site data destruction, and maximum salvage value recovery for technology campuses in Hinjewadi, Kharadi, Magarpatta, and across Maharashtra.
            </p>
          </div>
        </div>

        {/* 2-Column: Left Information, Right Corporate RFP Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <CorporateOverview />
          <CorporateEnquiryForm />
        </div>
      </div>
    </div>
  );
};
