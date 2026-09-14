import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Truck
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenPickupModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate,
  onOpenPickupModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'what-we-accept', label: 'What We Accept' },
    { id: 'corporate', label: 'Corporate ITAD' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const isItemActive = (id: string) => {
    if (currentView === id) return true;
    if (id === 'what-we-accept' && currentView === 'accept') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Bar for Trust & Direct Contact */}
      <div className="bg-[#1E293B] text-slate-200 text-xs py-2 hidden md:block border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6 shrink-0">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-xs lg:max-w-md">Facility: Survey No. 89, Hingane Mala, Ramtekadi, Hadapsar, Pune 411013</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-300 whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
            </span>
          </div>
          <div className="flex items-center space-x-5 shrink-0">
            <span className="text-emerald-400 font-medium flex items-center space-x-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>Pune Doorstep Pickup Active</span>
            </span>
            <a 
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 text-white hover:text-emerald-400 transition-colors font-semibold whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{SITE_CONFIG.formattedPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center space-x-3 shrink-0 group select-none py-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <div className="relative">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white"></span>
              </div>
            </div>
            <div className="shrink-0 flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 whitespace-nowrap leading-tight">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  E-Waste Center
                </span>
                <span className="text-lg sm:text-xl font-black text-[#2E7D32]">Pune</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide whitespace-nowrap hidden 2xl:block leading-tight mt-0.5">
                Certified Scrap Buyers & Doorstep Recycling
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (5 Clean Links) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0">
            {navItems.map((item) => {
              const active = isItemActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'text-[#2E7D32] bg-emerald-50 font-semibold shadow-2xs'
                      : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Buttons (Desktop lg+) */}
          <div className="hidden lg:flex items-center space-x-2.5 shrink-0">
            <a
              href={getWhatsAppLink('Hello! I would like to sell electronic scrap / schedule e-waste pickup in Pune.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-1.5 px-3.5 h-10 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenPickupModal}
              className="inline-flex items-center justify-center space-x-2 px-4 h-10 rounded-xl text-sm font-bold text-white bg-[#2E7D32] hover:bg-[#256629] shadow-sm hover:shadow-md transition-all active:scale-98 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Truck className="w-4 h-4 shrink-0" />
              <span>Schedule Pickup</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Actions (< lg) */}
          <div className="flex lg:hidden items-center space-x-2 shrink-0">
            <a
              href={getWhatsAppLink('Hello! I would like to sell electronic scrap / schedule e-waste pickup in Pune.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center space-x-1.5 px-3 h-9 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenPickupModal}
              className="inline-flex items-center justify-center space-x-1.5 px-3.5 h-9 rounded-lg text-xs font-bold text-white bg-[#2E7D32] hover:bg-[#256629] shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Schedule Pickup</span>
              <span className="inline sm:hidden">Pickup</span>
            </button>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
              className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors shrink-0"
              title="Call Us"
              aria-label="Call E-Waste Center Pune"
            >
              <Phone className="w-4 h-4 shrink-0" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none shrink-0 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-in fade-in duration-150">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-start text-slate-800 font-semibold space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Survey No. 89, Hingane Mala, Hadapsar, Pune 411013</span>
            </div>
            <div className="flex items-center text-slate-600 space-x-2">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
            </div>
            <div className="flex items-center text-slate-600 space-x-2 pt-1.5 border-t border-slate-200/70">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-semibold text-emerald-700 hover:underline">
                Call: {SITE_CONFIG.formattedPhone}
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    active
                      ? 'text-[#2E7D32] bg-emerald-50 border-l-4 border-[#2E7D32]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <a
              href={getWhatsAppLink('Hello! I would like to schedule an e-waste pickup in Pune.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
            >
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPickupModal();
              }}
              className="w-full py-2.5 px-3 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold rounded-lg text-sm flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 shrink-0" />
              <span>Schedule Pickup</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
