import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Banknote,
  ArrowRight,
  Search,
  RotateCcw,
  Scale
} from 'lucide-react';
import { ESTIMATOR_DEVICES, EstimatorDevice } from '../../data/scrapPricingData';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

interface ScrapCalculatorProps {
  onProceedToPickup: (itemsSummary: string, totalEstimate: number) => void;
  initialCategoryId?: string;
}

interface ItemEntry {
  quantity: number;
  condition: 'dead' | 'partiallyWorking' | 'working';
}

interface SelectedItemState {
  [deviceId: string]: ItemEntry | undefined;
}

export const ScrapCalculator: React.FC<ScrapCalculatorProps> = ({ 
  onProceedToPickup,
  initialCategoryId 
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemState>({
    laptop: { quantity: 1, condition: 'dead' },
    'desktop-cpu': { quantity: 1, condition: 'dead' }
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (initialCategoryId) {
      // Map category or device id
      const targetDevice = ESTIMATOR_DEVICES.find(d => 
        d.id === initialCategoryId || 
        d.category.toLowerCase().includes(initialCategoryId.toLowerCase())
      );
      if (targetDevice) {
        setSelectedItems(prev => ({
          ...prev,
          [targetDevice.id]: prev[targetDevice.id] || { quantity: 1, condition: 'dead' }
        }));
      }
    }
  }, [initialCategoryId]);

  const handleQuantityChange = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id]?.quantity || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: {
          quantity: next,
          condition: prev[id]?.condition || 'dead'
        }
      };
    });
  };

  const handleConditionChange = (id: string, condition: 'dead' | 'partiallyWorking' | 'working') => {
    setSelectedItems((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id]!,
          condition
        }
      };
    });
  };

  const getItemSubtotal = (deviceId: string, entry?: ItemEntry) => {
    if (!entry || entry.quantity <= 0) return 0;
    const device = ESTIMATOR_DEVICES.find(d => d.id === deviceId);
    if (!device) return 0;
    let multiplier = 1.0;
    if (entry.condition === 'partiallyWorking') multiplier = 1.35;
    if (entry.condition === 'working') multiplier = 1.8;
    return Math.round(device.avgRate * entry.quantity * multiplier);
  };

  const calculateTotal = () => {
    let total = 0;
    (Object.entries(selectedItems) as [string, ItemEntry][]).forEach(([id, data]) => {
      total += getItemSubtotal(id, data);
    });
    return total;
  };

  const handleReset = () => {
    setSelectedItems({});
  };

  const totalEstimate = calculateTotal();
  const selectedCount = Object.keys(selectedItems).length;

  const categories = ['all', ...Array.from(new Set(ESTIMATOR_DEVICES.map(d => d.category)))];

  const filteredDevices = ESTIMATOR_DEVICES.filter(d => {
    const matchesCat = activeCategory === 'all' || d.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookWithEstimate = () => {
    const summary = (Object.entries(selectedItems) as [string, ItemEntry][])
      .filter(([_, data]) => !!data && data.quantity > 0)
      .map(([id, data]) => {
        const dev = ESTIMATOR_DEVICES.find((d) => d.id === id);
        return `${data.quantity} ${dev?.unit === 'KG' ? 'KG' : 'units'} of ${dev?.name} (${data.condition})`;
      })
      .join(', ');
    onProceedToPickup(summary, totalEstimate);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
          <Scale className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pune E-Waste Scrap Valuation Calculator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculate Your Electronic Scrap Value
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Select your e-waste items, specify quantities and condition. Your estimated scrap value updates dynamically below. Doorstep weighment on calibrated digital scales in Pune.
        </p>
      </div>

      {/* Main Grid: Device Picker & Live Estimate Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Device Selection List */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls: Search & Category Pills */}
          <div className="space-y-3 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search device (e.g. laptop, battery, cable)..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              {selectedCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold flex items-center space-x-1 shrink-0 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
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
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap capitalize transition-colors ${
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
            {filteredDevices.map((device) => {
              const isSelected = !!selectedItems[device.id] && (selectedItems[device.id]?.quantity || 0) > 0;
              const qty = selectedItems[device.id]?.quantity || 0;
              const cond = selectedItems[device.id]?.condition || 'dead';
              const subtotal = getItemSubtotal(device.id, selectedItems[device.id]);

              return (
                <div
                  key={device.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
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
                        onClick={() => handleQuantityChange(device.id, -1)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                          qty > 0 
                            ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100' 
                            : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        }`}
                        disabled={qty === 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-8 text-center text-sm font-extrabold text-slate-800">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleQuantityChange(device.id, 1)}
                        className="w-8 h-8 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white flex items-center justify-center font-bold shadow-xs cursor-pointer"
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
                              onClick={() => handleConditionChange(device.id, c.id as any)}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
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

        {/* Right: Valuation Result & Direct Action */}
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
              onClick={handleBookWithEstimate}
              className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Truck className="w-4 h-4" />
              <span>Book Doorstep Pickup (₹{totalEstimate.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink(`Hi! I calculated my scrap value on your site: ₹${totalEstimate.toLocaleString('en-IN')}. Please schedule pickup at my Pune address.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-600 transition-colors flex items-center justify-center space-x-2"
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

      </div>
    </div>
  );
};
