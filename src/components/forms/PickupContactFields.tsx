import React from 'react';
import { User, Phone } from 'lucide-react';

interface PickupContactFieldsProps {
  fullName: string;
  phone: string;
  onFullNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export const PickupContactFields: React.FC<PickupContactFieldsProps> = ({
  fullName,
  phone,
  onFullNameChange,
  onPhoneChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="pickup-full-name" className="block text-xs font-bold text-slate-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            id="pickup-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="e.g. Ramesh Deshpande"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pickup-phone" className="block text-xs font-bold text-slate-700 mb-1">
          Phone Number (WhatsApp) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            id="pickup-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="e.g. 93590 29457"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
        </div>
        <span className="text-[11px] text-slate-500 mt-0.5 block">Our team calls you to coordinate pickup</span>
      </div>
    </div>
  );
};
