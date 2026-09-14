import React from 'react';
import { Phone, MessageCircle, Calendar, Truck } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface FloatingCTAProps {
  onOpenPickupModal: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenPickupModal }) => {
  return (
    <>
      {/* Floating Desktop / Tablet WhatsApp Button */}
      <div className="fixed bottom-20 right-6 z-40 hidden sm:block">
        <a
          href={getWhatsAppLink('Hi E-Waste Center Pune! I want to sell electronic scrap / schedule a pickup.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse"></span>
          </div>
          <div className="text-left leading-tight">
            <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider block">Chat With Us</span>
            <span className="text-sm font-extrabold text-white">93590 29457</span>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-3 py-2">
        <div className="grid grid-cols-3 gap-2">
          {/* Call CTA */}
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-100 active:bg-slate-200 text-slate-800 transition-colors"
          >
            <Phone className="w-5 h-5 text-blue-600 mb-0.5" />
            <span className="text-[11px] font-bold">Call Now</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink('Hi! I want to schedule an e-waste pickup in Pune.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-50 active:bg-emerald-100 text-emerald-800 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
            <span className="text-[11px] font-bold">WhatsApp</span>
          </a>

          {/* Pickup CTA */}
          <button
            onClick={onOpenPickupModal}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#2E7D32] active:bg-[#256629] text-white shadow-xs"
          >
            <Truck className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-bold">Book Pickup</span>
          </button>
        </div>
      </div>
    </>
  );
};
