import React from 'react';
import { Truck, ArrowRight, CheckCircle } from 'lucide-react';
import { ESTIMATOR_DEVICES } from '../../data/scrapPricingData';
import { getWhatsAppLink } from '../../data/siteConfig';
import { SelectedItemState, ItemEntry } from './CalculatorDeviceList';

interface CalculatorValuationCardProps {
  totalEstimate: number;
  selectedCount: number;
  selectedItems: SelectedItemState;
  getItemSubtotal: (deviceId: string, entry?: ItemEntry) => number;
  onBookWithEstimate: () => void;
}

export const CalculatorValuationCard: React.FC<CalculatorValuationCardProps> = ({
  totalEstimate,
  selectedCount,
  selectedItems,
  getItemSubtotal,
  onBookWithEstimate
}) => {
  return (
    <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Calculated Scrap Value
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-bold">
          Pune On-Site Weighing
        </span>
      </div>

      <div className="py-6 text-center">
        <span className="text-xs text-slate-400 block mb-1">Total Instant Cash / UPI Payout</span>
        <div className="flex items-center justify-center space-x-1 text-emerald-400">
          <span className="text-3xl font-light">₹</span>
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            {totalEstimate.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {selectedCount > 0 
            ? `Calculated dynamically for ${selectedCount} selected item types`
            : 'Select items on the left to compute scrap value'}
        </p>
      </div>

      {/* Breakdown summary */}
      <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2 text-xs mb-5">
        <div className="font-semibold text-slate-200 pb-1 border-b border-slate-700 flex justify-between">
          <span>Item Breakdown</span>
          <span>Calculated Value</span>
        </div>
        {selectedCount === 0 ? (
          <p className="text-slate-400 italic py-1">No items selected yet. Choose items above.</p>
        ) : (
          (Object.entries(selectedItems) as [string, ItemEntry][])
            .filter(([_, data]) => !!data && data.quantity > 0)
            .map(([id, data]) => {
              const dev = ESTIMATOR_DEVICES.find((d) => d.id === id);
              const sub = getItemSubtotal(id, data);
              return (
                <div key={id} className="flex justify-between items-center text-slate-300">
                  <span className="truncate pr-2">
                    • {data.quantity} {dev?.unit} {dev?.name}
                  </span>
                  <span className="font-mono font-bold text-emerald-400 shrink-0">
                    ₹{sub.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })
        )}
      </div>

      {/* Action CTAs */}
      <div className="space-y-2.5">
        <button
          type="button"
          disabled={totalEstimate === 0}
          onClick={onBookWithEstimate}
          className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Truck className="w-4 h-4" />
          <span>Book Doorstep Pickup (₹{totalEstimate.toLocaleString('en-IN')})</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={getWhatsAppLink(`Hi! I calculated my scrap value on your site: ₹${totalEstimate.toLocaleString('en-IN')}. Please schedule pickup at my Pune address.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-600 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Get WhatsApp Confirmation Quote</span>
        </a>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center space-x-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>100% Digital scale verification at your Pune doorstep.</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Instant payment via UPI, Bank Transfer or Cash on spot.</span>
        </div>
      </div>
    </div>
  );
};
