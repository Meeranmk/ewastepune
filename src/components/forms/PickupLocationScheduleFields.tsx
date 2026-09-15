import React from 'react';
import { MapPin, Calendar, Upload } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/locationsData';

interface PickupLocationScheduleFieldsProps {
  area: string;
  address: string;
  quantity: string;
  pickupDate: string;
  uploadedFiles: string[];
  message: string;
  onAreaChange: (val: string) => void;
  onAddressChange: (val: string) => void;
  onQuantityChange: (val: string) => void;
  onPickupDateChange: (val: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (val: string) => void;
}

export const PickupLocationScheduleFields: React.FC<PickupLocationScheduleFieldsProps> = ({
  area,
  address,
  quantity,
  pickupDate,
  uploadedFiles,
  message,
  onAreaChange,
  onAddressChange,
  onQuantityChange,
  onPickupDateChange,
  onFileUpload,
  onMessageChange
}) => {
  return (
    <>
      {/* Pune Area & Specific Address */}
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

      {/* Quantity & Preferred Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickup-quantity" className="block text-xs font-bold text-slate-700 mb-1">
            Approximate Quantity / Count
          </label>
          <input
            id="pickup-quantity"
            type="text"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="e.g. 3 laptops, 1 CPU, or ~15 kg wires"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="pickup-date" className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Pickup Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="pickup-date"
              type="date"
              value={pickupDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => onPickupDateChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Optional Photo Attachment */}
      <div>
        <div className="text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
          <span>Upload Item Photos (Optional)</span>
          <span className="text-[11px] font-normal text-slate-500">Helps us give an instant quote</span>
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="pickup-photo-upload" className="cursor-pointer inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Choose Files</span>
            <input 
              id="pickup-photo-upload"
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={onFileUpload} 
            />
          </label>
          {uploadedFiles.length > 0 ? (
            <span className="text-xs text-emerald-700 font-semibold truncate">
              {uploadedFiles.length} photo(s) selected: {uploadedFiles.join(', ')}
            </span>
          ) : (
            <span className="text-xs text-slate-400">Attach photos of laptops, scrap pile or serial labels</span>
          )}
        </div>
      </div>

      {/* Special Message / Instructions */}
      <div>
        <label htmlFor="pickup-message" className="block text-xs font-bold text-slate-700 mb-1">
          Special Notes or Gate Instructions
        </label>
        <textarea
          id="pickup-message"
          rows={2}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="e.g. Need hard drive serial numbers documented, or visit after 2 PM"
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
      </div>
    </>
  );
};
