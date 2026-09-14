import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Scale, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  ArrowRight,
  Building,
  FileText
} from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';

interface PunePincodeRecord {
  pincode: string;
  name: string;
  zone: string;
  turnaround: string;
  majorHub: string;
  popularItems: string;
}

const PUNE_PINCODES: PunePincodeRecord[] = [
  { pincode: '411013', name: 'Hadapsar & Ramtekadi', zone: 'East Pune', turnaround: '2 - 4 Hours (Central Facility Hub)', majorHub: 'Survey No. 89 Hingane Mala', popularItems: 'Laptops, Heavy IT scrap, Desktop towers, UPS' },
  { pincode: '411028', name: 'Magarpatta City & Cybercity', zone: 'East Pune', turnaround: 'Same Day (Within 4 Hours)', majorHub: 'Magarpatta South Gate', popularItems: 'Corporate IT Assets, Server racks, Laptops' },
  { pincode: '411057', name: 'Hinjewadi IT Park & Wakad', zone: 'West Pune', turnaround: 'Daily Scheduled Vans (Morning/Evening)', majorHub: 'Rajiv Gandhi Infotech Park', popularItems: 'Bulk corporate scrap, Workstations, Hard drives' },
  { pincode: '411014', name: 'Kharadi & EON Free Zone', zone: 'East Pune', turnaround: 'Same Day / Within 4-6 Hours', majorHub: 'World Trade Center Pune', popularItems: 'Datacenter scrap, Enterprise monitors, Laptops' },
  { pincode: '411038', name: 'Kothrud & Karve Nagar', zone: 'West Pune', turnaround: 'Same Day / Next Day', majorHub: 'Paud Road Corridor', popularItems: 'Residential PC scrap, Home electronics, UPS batteries' },
  { pincode: '411045', name: 'Baner & Balewadi', zone: 'West Pune', turnaround: 'Same Day Priority', majorHub: 'High Street Baner', popularItems: 'Startup IT equipment, Monitors, Copper cables' },
  { pincode: '411014', name: 'Viman Nagar & Kalyani Nagar', zone: 'East Pune', turnaround: 'Same Day / 24 Hours', majorHub: 'Cerebrum IT Park / Airport Rd', popularItems: 'Office electronics, Dead laptops, Networking gear' },
  { pincode: '411007', name: 'Aundh & Pashan', zone: 'West Pune', turnaround: 'Next Day Morning Slot', majorHub: 'Parihar Chowk', popularItems: 'Household computers, Printers, Inverter batteries' },
  { pincode: '411042', name: 'Swargate & Shukrawar Peth', zone: 'Central Pune', turnaround: 'Same Day Afternoon Route', majorHub: 'Swargate Bus Terminal Area', popularItems: 'Commercial electronics, Electronic scrap, PCB boards' },
  { pincode: '411005', name: 'Shivaji Nagar & FC Road', zone: 'Central Pune', turnaround: 'Same Day Route', majorHub: 'JM Road / Sancheti', popularItems: 'Institutional scrap, Lab electronics, Old computers' },
  { pincode: '411001', name: 'Pune Camp & MG Road', zone: 'Central Pune', turnaround: 'Scheduled Route', majorHub: 'East Street / Camp', popularItems: 'Office setups, Old telecom gear, Batteries' },
  { pincode: '411048', name: 'Kondhwa & NIBM Road', zone: 'South Pune', turnaround: 'Same Day / 24 Hours', majorHub: 'NIBM Undri Corridor', popularItems: 'Household electronics, Dead appliances, Inverters' },
  { pincode: '411046', name: 'Katraj & Bibwewadi', zone: 'South Pune', turnaround: 'Scheduled 6 Days / Week', majorHub: 'Satara Road', popularItems: 'Small business IT, Inverter batteries, Copper scrap' },
  { pincode: '411018', name: 'Pimpri & Chinchwad (PCMC)', zone: 'North / PCMC', turnaround: 'Daily Industrial Route', majorHub: 'MIDC / Telco Road', popularItems: 'Industrial electronic scrap, Factory automation scrap, UPS' },
  { pincode: '411026', name: 'Bhosari MIDC', zone: 'North / PCMC', turnaround: 'Scheduled Commercial Route', majorHub: 'Bhosari Industrial Estate', popularItems: 'Heavy industrial electronics, Control panels, Copper wire' },
  { pincode: '411021', name: 'Bavdhan & Chandani Chowk', zone: 'West Pune', turnaround: 'Same Day / Next Day', majorHub: 'NDA Road', popularItems: 'Residential scrap, Broken monitors, Dead laptops' },
  { pincode: '412207', name: 'Wagholi & Nagar Road', zone: 'East Pune', turnaround: 'Scheduled 3x Weekly', majorHub: 'Wagholi Chowk', popularItems: 'Household e-waste, Power backup batteries' }
];

interface PuneSEOGuideSectionProps {
  onOpenPickupModal: (params?: { category?: string; quantity?: string }) => void;
}

export const PuneSEOGuideSection: React.FC<PuneSEOGuideSectionProps> = ({ onOpenPickupModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return PUNE_PINCODES.slice(0, 6);
    const q = searchQuery.toLowerCase().trim();
    return PUNE_PINCODES.filter(
      item => 
        item.pincode.includes(q) || 
        item.name.toLowerCase().includes(q) || 
        item.zone.toLowerCase().includes(q) ||
        item.majorHub.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section id="pune-ewaste-guide" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Topical Guide & Pincode Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            E-Waste in Pune: Local Recycling Guide & Scrap Buying Center
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            As Maharashtra’s IT and industrial powerhouse, Pune generates thousands of tonnes of electronic scrap every year. Learn how our central Hadapsar facility ensures 100% legal, certified recycling and highest doorstep scrap payouts.
          </p>
        </div>

        {/* Interactive Pincode & Locality Pickup Route Finder */}
        <div className="mb-16 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Truck className="w-4 h-4" />
              <span>Instant Pune Route Checker</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
              Check E-Waste Doorstep Pickup in Your Pune Locality
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Enter your Pune locality name or 6-digit postal pincode to view our collection van schedule, nearest dispatch hub, and instant booking options.
            </p>

            {/* Search Input Bar */}
            <div className="relative mb-6">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type your Pune area or pincode (e.g., 411013, Hinjewadi, Kharadi, Kothrud, Baner...)"
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:bg-slate-900/90 transition-all backdrop-blur-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-white/10 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Pincode Tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 mb-6">
              <span className="text-slate-400 font-medium mr-1">Popular Pune Areas:</span>
              {['411013 Hadapsar', '411057 Hinjewadi', '411014 Kharadi', '411038 Kothrud', '411045 Baner', '411018 PCMC'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.split(' ')[0])}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-600 hover:text-white text-slate-300 transition-colors cursor-pointer border border-white/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div 
                  key={item.pincode + item.name}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                        PIN: {item.pincode}
                      </span>
                      <span className="text-[11px] text-slate-300 font-medium">
                        {item.zone}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white tracking-tight">
                      {item.name}
                    </h4>

                    <div className="text-xs text-slate-300 flex items-start space-x-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Turnaround:</strong> {item.turnaround}</span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Route Hub:</strong> {item.majorHub}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPickupModal({ category: `Pickup for ${item.name} (${item.pincode})` })}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Schedule Free Pickup Here</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center bg-white/5 rounded-2xl border border-white/10">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-slate-200 font-semibold">
                  No exact match found for "{searchQuery}".
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Don't worry! We cover <strong className="text-white">all localities across the entire Pune Metropolitan Area</strong>.
                </p>
                <button
                  onClick={() => onOpenPickupModal()}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center space-x-1.5"
                >
                  <span>Request Pickup for Your Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3 Pillars of Authority: MPCB, Scrap Valuation & Corporate Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Legal Compliance */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              MPCB & E-Waste Rules 2022 Compliance in Pune
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dumping electronic scrap in Pune's municipal bins or selling to unauthorized scrap kabadiwalas is strictly prohibited under Central and Maharashtra Pollution Control Board (MPCB) rules. Hazardous materials like mercury, cadmium, and brominated plastics contaminate the Mula-Mutha river and groundwater. We channel all scrap through certified eco-friendly dismantling.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Zero landfill policy for heavy metals</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Official MPCB Form-6 manifests</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Green Recycling Certificate issued</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Scrap Value */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              How Electronic Scrap Prices Work in Pune
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Scrap valuation is not a guessing game. We determine the fair market scrap value based on raw material recovery indices in Pune: circuit board motherboard grade (gold/palladium pins), pure copper transformer windings, aluminum heat sinks, and lead content in UPS batteries.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transparent digital weighing scale at your doorstep</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Immediate UPI (GPay/PhonePe) or cash payout</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>No hidden deductions or transport charges</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Corporate ITAD */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Serving Hinjewadi, Kharadi & Magarpatta IT Hubs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pune is home to over 800 IT/ITES firms. We provide end-to-end IT Asset Disposition (ITAD) for tech companies, financial institutions, and hospitals. From decommissioning enterprise server racks and SAN arrays to serialized magnetic hard drive degaussing compliant with NIST 800-88.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>On-site hydraulic shearing & degaussing</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Serialized Certificate of Data Destruction</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Bulk logistics with GPS-tracked vehicles</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
