import React from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';
import { Lead } from '../../types';

interface PickupConfirmationProps {
  lead: Lead;
  onReset: () => void;
}

export const PickupConfirmation: React.FC<PickupConfirmationProps> = ({ lead, onReset }) => {
  const confirmationText = `🚛 *New E-Waste Pickup Request* (#${lead.id})
━━━━━━━━━━━━━━━━━━━━
*Name:* ${lead.name}
*Phone:* ${lead.phone}
*Area:* ${lead.area}, Pune
*Address:* ${lead.address}
*Items:* ${lead.eWasteType.join(', ')}
*Quantity:* ${lead.quantity || 'Not specified'}
*Preferred Date:* ${lead.pickupDate || 'Earliest available'}
*Notes:* ${lead.message || 'None'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via E-Waste Center Pune Portal_`;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-md text-center animate-fade-in">
      <div className="w-16 h-16 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
        Request Confirmed • Reference #{lead.id}
      </span>

      <h3 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
        Thank you, {lead.name}!
      </h3>

      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
        Your e-waste pickup request has been routed to our Hadapsar operations team. Our logistics coordinator will call you at <strong className="text-slate-900">{lead.phone}</strong> shortly to confirm your pickup slot.
      </p>

      {/* Lead Details Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 mb-6">
        <div className="flex justify-between pb-2 border-b border-slate-200">
          <span className="text-slate-500">Pickup Area:</span>
          <span className="font-semibold text-slate-800">{lead.area}, Pune</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200">
          <span className="text-slate-500">Address:</span>
          <span className="font-semibold text-slate-800 text-right">{lead.address}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200">
          <span className="text-slate-500">Items:</span>
          <span className="font-semibold text-slate-800">{lead.eWasteType.join(', ')}</span>
        </div>
        {lead.pickupDate && (
          <div className="flex justify-between">
            <span className="text-slate-500">Preferred Date:</span>
            <span className="font-semibold text-emerald-700">{lead.pickupDate}</span>
          </div>
        )}
      </div>

      {/* Quick WhatsApp Confirmation Link */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <a
          href={getWhatsAppLink(confirmationText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send Details on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );
};
