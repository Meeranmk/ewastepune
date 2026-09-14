import React from 'react';
import { 
  Truck, 
  Scale, 
  Layers, 
  Building, 
  Leaf, 
  Headphones, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: "Convenient Doorstep Pickup",
      desc: "Our vehicles navigate through narrow residential lanes and high-security IT campuses across Pune to collect right from your door."
    },
    {
      icon: <Scale className="w-6 h-6 text-white" />,
      title: "Transparent Digital Weighing",
      desc: "No estimation guesswork. Certified digital scales are deployed on-site, and you are paid instantly based on prevailing scrap indices."
    },
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: "Wide Range of Electronics",
      desc: "From a single dead laptop or swollen smartphone battery to multi-ton datacenter server racks and copper cable spools."
    },
    {
      icon: <Building className="w-6 h-6 text-white" />,
      title: "Residential & Corporate Ready",
      desc: "Whether you need a Sunday home pickup or a GST-compliant Form-6 manifest for corporate environmental audit compliance."
    },
    {
      icon: <Leaf className="w-6 h-6 text-white" />,
      title: "100% Responsible Recycling",
      desc: "Zero landfill dumping. We follow scientific hydrometallurgical separation and safe toxic substance containment."
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: "Local Pune Support Team",
      desc: "Reach out via call or WhatsApp at 93590 29457 for immediate route coordination from our Hadapsar central facility."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F0] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why Pune Trusts Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Safe, Rewarding Way to Recycle E-Waste
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Say goodbye to unreliable informal scrap dealers who burn wire insulation in open air. Choose professional, certified recycling.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
