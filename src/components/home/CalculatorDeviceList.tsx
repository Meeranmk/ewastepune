import React from 'react';
import { Search, RotateCcw, Minus, Plus } from 'lucide-react';
import { EstimatorDevice } from '../../data/scrapPricingData';

export interface ItemEntry {
  quantity: number;
  condition: 'dead' | 'partiallyWorking' | 'working';
}

export interface SelectedItemState {
  [deviceId: string]: ItemEntry | undefined;
}

interface CalculatorDeviceListProps {
  devices: EstimatorDevice[];
  selectedItems: SelectedItemState;
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  selectedCount: number;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onReset: () => void;
  onQuantityChange: (deviceId: string, delta: number) => void;
  onConditionChange: (deviceId: string, condition: 'dead' | 'partiallyWorking' | 'working') => void;
  getItemSubtotal: (deviceId: string, entry?: ItemEntry) => number;
}

export const CalculatorDeviceList: React.FC<CalculatorDeviceListProps> = ({
  devices,
  selectedItems,
  categories,
  activeCategory,
  searchQuery,
  selectedCount,
  onSearchChange,
  onSelectCategory,
  onReset,
  onQuantityChange,
  onConditionChange,
  getItemSubtotal
}) => {
  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Controls: Search & Category Pills */}
      <div className="space-y-3 pb-2 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <label htmlFor="calc-device-search" className="sr-only">
              Search device
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="calc-device-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search device (e.g. laptop, battery, cable)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {selectedCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold flex items-center space-x-1 shrink-0 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap capitalize transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Device Items List */}
      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
        {devices.map((device) => {
          const isSelected = !!selectedItems[device.id] && (selectedItems[device.id]?.quantity || 0) > 0;
          const qty = selectedItems[device.id]?.quantity || 0;
          const cond = selectedItems[device.id]?.condition || 'dead';
          const subtotal = getItemSubtotal(device.id, selectedItems[device.id]);

          return (
            <div
              key={device.id}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isSelected
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900 truncate">{device.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium shrink-0">
                      {device.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs font-semibold text-emerald-800">
                      Scrap Rate: ₹{device.avgRate}/{device.unit}
                    </span>
                    <span className="text-[10px] text-slate-400">• {device.note}</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(device.id, -1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                      qty > 0 
                        ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer' 
                        : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    }`}
                    disabled={qty === 0}
                    aria-label={`Decrease quantity of ${device.name}`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-8 text-center text-sm font-extrabold text-slate-800">
                    {qty}
                  </span>

                  <button
                    type="button"
                    onClick={() => onQuantityChange(device.id, 1)}
                    className="w-8 h-8 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white flex items-center justify-center font-bold shadow-xs cursor-pointer transition-colors"
                    aria-label={`Increase quantity of ${device.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Condition Selector and Subtotal when selected */}
              {isSelected && (
                <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-600 font-medium">Condition:</span>
                    <div className="flex space-x-1">
                      {[
                        { id: 'dead', label: 'Dead / Scrap' },
                        { id: 'partiallyWorking', label: 'Partially Working' },
                        { id: 'working', label: 'Working' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => onConditionChange(device.id, c.id as any)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                            cond === c.id
                              ? 'bg-[#2E7D32] text-white shadow-2xs'
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 mr-1">Subtotal:</span>
                    <span className="font-extrabold text-sm text-[#2E7D32]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
