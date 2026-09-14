import React from 'react';
import { PhoneCall, Scale, Truck, Recycle, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenPickupModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenPickupModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Request Pickup',
      desc: 'Submit your Pune address and electronic items online or call us at 93590 29457.',
      icon: <PhoneCall className="w-6 h-6 text-white" />,
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      num: '02',
      title: 'Assessment & Quote',
      desc: 'We identify scrap categories, estimate value, and confirm your preferred pickup time slot.',
      icon: <Scale className="w-6 h-6 text-white" />,
      color: 'from-blue-600 to-blue-700'
    },
    {
      num: '03',
      title: 'Doorstep Collection',
      desc: 'Our van arrives with certified digital scales. Material is weighed and paid on the spot via UPI or Cash.',
      icon: <Truck className="w-6 h-6 text-white" />,
      color: 'from-teal-600 to-teal-700'
    },
    {
      num: '04',
      title: 'Responsible Recycling',
      desc: 'Hardware is sorted for scientific dismantling, precious metal recovery, or certified data destruction.',
      icon: <Recycle className="w-6 h-6 text-white" />,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How E-Waste Pickup Works in Pune
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Recycling your old computer scrap and unwanted electronics shouldn't be complicated. Here is how easy we make it for you:
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#F5F5F0]/80 rounded-3xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center text-xs font-bold text-[#2E7D32]">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Logistics & Doorstep Scale Photo Banner */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-gradient-to-r from-slate-900 to-slate-800 text-white grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative h-56 lg:h-auto min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              alt="Doorstep E-Waste Logistics Pune"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
              Pune Fleet On Route
            </div>
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Transparent Doorstep Operations
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Calibrated Digital Scales at Your Home or Office
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every pickup van carries certified electronic weighing scales. You witness the exact weight, agree on the scrap valuation, and receive instantaneous payment via UPI or Cash before our team loads your items.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPickupModal}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2E7D32] hover:bg-[#256629] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Schedule Doorstep Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                Hub: Hadapsar, Pune • Call: 93590 29457
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
