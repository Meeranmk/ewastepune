import React from 'react';
import { MapPin } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/locationsData';

interface PickupLocationScheduleFieldsProps {
  area: string;
  address: string;
  onAreaChange: (val: string) => void;
  onAddressChange: (val: string) => void;
}

export const PickupLocationScheduleFields: React.FC<PickupLocationScheduleFieldsProps> = ({
  area,
  address,
  onAreaChange,
  onAddressChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label htmlFor="pickup-area" className="block text-xs font-bold text-slate-700 mb-1">
          Pune Locality / Area <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <select
            id="pickup-area"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          >
            {LOCATIONS_DATA.map((loc) => (
              <option key={loc.slug} value={loc.name.split(' (')[0]}>
                {loc.name.split(' (')[0]} ({loc.zone})
              </option>
            ))}
            <option value="Other Area in Pune">Other Area in Pune</option>
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="pickup-address" className="block text-xs font-bold text-slate-700 mb-1">
          Pickup Address & Landmark <span className="text-red-500">*</span>
        </label>
        <input
          id="pickup-address"
          type="text"
          required
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Flat/Office No., Society/Tech Park Name, Near Landmark"
          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
      </div>
    </div>
  );
};
