import React from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../../data/siteConfig';

export const CorporateOverview: React.FC = () => {
  return (
    <div className="lg:col-span-7 space-y-8">
      <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Enterprise Lifecycle Management
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          When retiring multi-unit employee laptop fleets, server racks, or datacenter switching hardware, enterprise compliance requires stringent data sanitization, asset inventory reconciliation, and transparent environmental manifests.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            "Form-6 MPCB Hazardous Manifest Filing",
            "Green Recycling Certificate for ESG / Audit",
            "Serialized Hard Drive Barcode Auditing",
            "NIST 800-88 Degaussing & Physical Shredding",
            "De-installation of Server Racks & UPS Banks",
            "Bulk Cash/NEFT Financial Recovery"
          ].map((item) => (
            <div key={item} className="flex items-start space-x-2 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Industries Grid */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Industries We Partner With in Pune:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { name: "IT & Software Parks", area: "Hinjewadi, Magarpatta" },
            { name: "Banking & FinTech", area: "Kharadi, Senapati Bapat" },
            { name: "Datacenters & Cloud", area: "Talawade, Chakan" },
            { name: "Hospitals & Diagnostics", area: "Deccan, Kothrud" },
            { name: "Universities & Schools", area: "Viman Nagar, Pashan" },
            { name: "Manufacturing MIDC", area: "Bhosari, Pimpri" }
          ].map((ind) => (
            <div key={ind.name} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 block">{ind.name}</span>
              <span className="text-[10px] text-slate-400">{ind.area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Callout */}
      <div className="p-6 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-900 uppercase">Dedicated Corporate Desk</span>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">Need an immediate NDA or on-site survey?</p>
        </div>
        <a
          href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
          className="px-4 py-2 bg-[#1565C0] hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>93590 29457</span>
        </a>
      </div>
    </div>
  );
};
