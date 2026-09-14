import React from 'react';
import { 
  Truck, 
  Banknote, 
  Recycle, 
  Server, 
  ShieldAlert, 
  Building2, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceItem } from '../../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenPickupModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenPickupModal
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return <Truck className="w-6 h-6 text-white" />;
      case 'Banknote': return <Banknote className="w-6 h-6 text-white" />;
      case 'Recycle': return <Recycle className="w-6 h-6 text-white" />;
      case 'Server': return <Server className="w-6 h-6 text-white" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-white" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-white" />;
      default: return <Recycle className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <span>Comprehensive Solutions in Pune</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Core E-Waste & Recycling Services
          </h2>
          <p className="text-base text-slate-600 mt-3">
            From residential doorstep pickup of old household laptops to multi-facility enterprise IT asset decommissioning across Pune IT parks.
          </p>
        </div>

        {/* 6 Primary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-[#F5F5F0]/60 rounded-3xl p-7 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#2E7D32] transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Key Points */}
                <div className="space-y-2 mb-6 border-t border-slate-200/60 pt-4">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#1565C0] hover:text-[#0d47a1] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenPickupModal}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold">Have Specific Corporate or Government Tender Requirements?</h4>
            <p className="text-sm text-slate-400">
              We provide Form-6 manifests, Green Recycling Certificates, and serialized destruction logs.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenPickupModal}
              className="px-5 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm shadow-md transition-all"
            >
              Request Corporate Inspection
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
