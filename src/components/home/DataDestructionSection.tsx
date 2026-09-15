import React from 'react';
import { 
  ShieldAlert, 
  HardDrive, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Video, 
  Flame, 
  FileBadge
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface DataDestructionSectionProps {
  onOpenPickupModal: () => void;
}

export const DataDestructionSection: React.FC<DataDestructionSectionProps> = ({ onOpenPickupModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Subtle circuit backdrop pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-xs font-bold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Information Security & Confidentiality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Certified Data Destruction & Sanitization
          </h2>
          <p className="text-base text-slate-400 mt-3">
            Formatting or deleting partitions is not enough. We protect your confidential customer records, financial ledgers, and trade secrets with permanent physical eradication.
          </p>
        </div>

        {/* 3 Core Sanitization Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">1. High-Field Degaussing</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Industrial electromagnetic pulse degaussers erase magnetic storage media by neutralizing magnetic domains, rendering magnetic hard drives (HDDs) permanently blank and unbootable.
            </p>
            <span className="inline-block text-[11px] font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800">
              For SATA, SAS & Backup Magnetic Tapes
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">2. Hydraulic Physical Shredding</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Solid-state drives (SSDs), NVMe sticks, smartphone motherboards, and flash memory are cross-cut through industrial counter-rotating steel blades into irregular sub-15mm shards.
            </p>
            <span className="inline-block text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800">
              100% Forensic Irrecoverability
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <FileBadge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">3. Certificate of Destruction</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every drive serial number is scanned and cataloged. An official, tamper-evident Certificate of Destruction is provided alongside CCTV video recording proofs upon request.
            </p>
            <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
              Audit Compliance for DPDP & ISO 27001
            </span>
          </div>

        </div>

        {/* Corporate Trust Strip with Image */}
        <div className="bg-gradient-to-r from-blue-950/80 to-slate-800 rounded-3xl p-6 sm:p-8 border border-blue-900/50 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-48 h-32 rounded-2xl overflow-hidden shrink-0 border border-blue-800 relative">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
              alt="Hard Drive Sanitization & Server Decommissioning"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/40"></div>
            <div className="absolute bottom-2 left-2 text-[10px] font-bold bg-blue-900/90 text-blue-200 px-2 py-0.5 rounded">
              ISO 27001 Certified
            </div>
          </div>
          <div className="space-y-1 text-center lg:text-left grow">
            <h4 className="text-lg font-bold text-white">Need On-Site Mobile Shredding at Your Pune Office?</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Witness the physical destruction of your hard drives directly at your facility in Hinjewadi, Kharadi, Magarpatta, or Hadapsar. Serialized certificate provided.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenPickupModal}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-colors cursor-pointer"
            >
              Book Data Sanitization
            </button>
            <a
              href={getWhatsAppLink('Hi! We need certified hard drive data destruction and shredding at our Pune office.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
