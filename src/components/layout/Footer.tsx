import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Recycle, 
  Truck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenPickupModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPickupModal }) => {
  return (
    <footer className="bg-[#1E293B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center text-white font-bold">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">E-Waste Center</span>
                <span className="text-xl font-bold text-emerald-400 ml-1">Pune</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Pune’s certified e-waste recycling and electronic scrap buying center. Providing scientific recycling, instant scrap value payment, certified data destruction, and doorstep pickup across Pune.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Central Processing Facility:</strong>
                  {SITE_CONFIG.address.full}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-white font-medium text-emerald-400 transition-colors">
                    {SITE_CONFIG.formattedPhone}
                  </a>
                  <span className="text-xs text-slate-400 ml-2">(Call / WhatsApp)</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400">
                  {SITE_CONFIG.hours.weekdays}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs text-emerald-400">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'services', label: 'Our Recycling Services' },
                { id: 'what-we-accept', label: 'Accepted Electronic Items' },
                { id: 'corporate', label: 'Corporate ITAD & Enterprise' },
                { id: 'how-it-works', label: 'How Pickup Works' },
                { id: 'areas', label: 'Pune Areas Covered' },
                { id: 'pune-ewaste-guide', label: 'Pune E-Waste & Pincode Guide' },
                { id: 'faq', label: 'Frequently Asked Questions' },
                { id: 'contact', label: 'Contact Us & Facility Map' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5 text-left text-slate-400 hover:text-white"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Services */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs text-emerald-400">
              Recycling & ITAD Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                'Doorstep E-Waste Collection',
                'Electronic Scrap Buying & Cash',
                'Desktop & Laptop Recycling',
                'Corporate IT Asset Disposal (ITAD)',
                'Physical Data Destruction & Degaussing',
                'Server Rack & Datacenter Scrap',
                'Lead-Acid & Inverter Battery Recycling',
                'Copper Wires & Cable Scrap',
                'EPR Extended Producer Support',
                'Green Recycling Certificate Issuance'
              ].map((service, index) => (
                <li key={index} className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">Need an Instant Quotation?</span>
              <p className="text-slate-400 mb-2">Send equipment photos or manifest list directly via WhatsApp for swift valuation.</p>
              <a
                href={getWhatsAppLink('Hi, I need an immediate scrap valuation for electronics.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-emerald-400 font-bold hover:underline"
              >
                <span>WhatsApp: 93590 29457</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Pune Localities & Doorstep Express */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide uppercase text-xs text-emerald-400">
              Pune Coverage Zones
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Daily collection vans routing across all major residential & IT corridors in Pune:
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {[
                'Hadapsar (HQ)', 'Magarpatta', 'Hinjewadi', 'Kharadi', 'Kothrud',
                'Baner', 'Viman Nagar', 'Aundh', 'Wakad', 'Pimpri-Chinchwad',
                'Swargate', 'Shivajinagar', 'Kondhwa', 'Katraj', 'Wagholi', 'Bavdhan'
              ].map((area, i) => (
                <span 
                  key={i} 
                  className={`text-xs px-2 py-1 rounded-md border ${
                    area.includes('HQ') 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800 font-semibold' 
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {area}
                </span>
              ))}
            </div>

            <button
              onClick={onOpenPickupModal}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all text-center flex items-center justify-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>Schedule Free Pickup in Pune</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} E-Waste Center Pune. All rights reserved. 
            <span className="block sm:inline sm:ml-2 text-slate-400">
              Compliant with E-Waste Management Rules 2022 & MPCB guidelines.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
