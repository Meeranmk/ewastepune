import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Banknote, 
  Recycle, 
  Server, 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Layers,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceItem } from '../../types';
import { SubpageHero } from './SubpageHero';

interface ServicesViewProps {
  onOpenPickupModal: (category?: string) => void;
  selectedService?: ServiceItem | null;
  onNavigate?: (path: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ 
  onOpenPickupModal, 
  selectedService,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    selectedService ? selectedService.id : SERVICES_DATA[0].id
  );

  // Keep in sync if selectedService prop changes
  useEffect(() => {
    if (selectedService) {
      setActiveTab(selectedService.id);
    }
  }, [selectedService]);

  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return <Truck className="w-5 h-5 text-white" />;
      case 'Banknote': return <Banknote className="w-5 h-5 text-white" />;
      case 'Recycle': return <Recycle className="w-5 h-5 text-white" />;
      case 'Server': return <Server className="w-5 h-5 text-white" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-white" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-white" />;
      default: return <Recycle className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Subpage Hero with Breadcrumbs & Fast CTAs */}
      <SubpageHero
        badge="Certified Pune E-Waste Services"
        badgeIcon={<Recycle className="w-3.5 h-3.5" />}
        title="E-Waste Recycling & Scrap Buying Services"
        description="Scientific recycling, doorstep collection, physical data destruction, and maximum scrap cash payout across Pune and PCMC. Compliant with E-Waste Management Rules 2022."
        breadcrumbs={[
          { label: 'Home', href: '/', onClick: () => onNavigate?.('/') },
          { label: 'Services' },
        ]}
        onOpenPickupModal={() => onOpenPickupModal(currentService.name)}
        stats={[
          { label: 'Pune Doorstep', value: 'Free Van' },
          { label: 'Scrap Valuation', value: 'Top Market' },
          { label: 'Data Destruction', value: 'Certified' },
          { label: 'Green Recycled', value: '100%' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Services Navigation Sidebar + Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Pills */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
              Select a Recycling Service:
            </span>
            {SERVICES_DATA.map((srv) => {
              const isSelected = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(srv.id);
                    if (window.location.pathname !== `/services/${srv.slug}`) {
                      window.history.replaceState(null, '', `/services/${srv.slug}`);
                    }
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-[border-color,box-shadow,background-color] duration-200 flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#2E7D32] shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white/90 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#2E7D32] text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {getIcon(srv.iconName)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug truncate">{srv.name}</h3>
                      <span className="text-[11px] text-slate-500 font-medium capitalize block">{srv.category} service</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${isSelected ? 'text-[#2E7D32]' : 'text-slate-300'}`} />
                </button>
              );
            })}

            {/* Quick Assurance Box */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 text-xs space-y-2 mt-4">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Government & MPCB Compliant</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                We issue Green Recycling Certificates and Data Destruction Certificates for all corporate disposals.
              </p>
            </div>
          </div>

          {/* Right Service Detailed Profile */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
            
            {/* Header of Active Service */}
            <div className="border-b border-slate-100 pb-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                <span>{currentService.category.toUpperCase()} SOLUTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                {currentService.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {currentService.fullDescription}
              </p>
            </div>

            {/* Accepted Materials */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Materials & Hardware Handled:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentService.acceptedMaterials.map((mat) => (
                  <div key={mat} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Client Advantages & Guarantees:</span>
              </h3>
              <div className="space-y-2">
                {currentService.benefits.map((b) => (
                  <div key={b} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Process Steps */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Standard Workflow Process:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.processSteps.map((step, idx) => (
                  <div key={step} className="flex items-start space-x-3 text-xs text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1565C0] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Need this service at your Pune location?</span>
                <span className="text-sm font-bold text-slate-900">Doorstep pickup available today or tomorrow</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenPickupModal(currentService.name)}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Request {currentService.name}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
