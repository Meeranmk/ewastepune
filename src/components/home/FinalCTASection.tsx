import React from 'react';
import { Truck, Phone, MessageSquare, MapPin } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface FinalCTASectionProps {
  onOpenPickupModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenPickupModal }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#2E7D32] via-emerald-800 to-[#1565C0] text-white relative overflow-hidden">
      
      {/* Visual background radial blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold border border-white/20">
          <MapPin className="w-3.5 h-3.5" />
          <span>Serving All Pune Localities & IT Parks</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Have Old Electronics to Recycle?
        </h2>

        <p className="text-base sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Schedule an e-waste pickup in Pune today. Get fair market scrap payout, doorstep collection, and guaranteed zero-landfill recycling.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenPickupModal}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#2E7D32] hover:bg-emerald-50 font-extrabold text-base shadow-xl hover:shadow-2xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Truck className="w-5 h-5" />
            <span>Schedule Free Pickup</span>
          </button>

          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white border border-white/30 font-bold text-base transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Us: {SITE_CONFIG.formattedPhone}</span>
          </a>

          <a
            href={getWhatsAppLink('Hi! I want to schedule an e-waste pickup in Pune.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>

        <p className="text-xs text-emerald-200/80 pt-2">
          Facility Address: {SITE_CONFIG.address.full}
        </p>

      </div>
    </section>
  );
};
