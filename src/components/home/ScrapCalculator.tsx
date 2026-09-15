import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { ESTIMATOR_DEVICES } from '../../data/scrapPricingData';
import { CalculatorDeviceList, ItemEntry, SelectedItemState } from './CalculatorDeviceList';
import { CalculatorValuationCard } from './CalculatorValuationCard';

interface ScrapCalculatorProps {
  onProceedToPickup: (itemsSummary: string, totalEstimate: number) => void;
  initialCategoryId?: string;
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
        <CalculatorDeviceList
          devices={filteredDevices}
          selectedItems={selectedItems}
          categories={categories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          selectedCount={selectedCount}
          onSearchChange={setSearchQuery}
          onSelectCategory={setActiveCategory}
          onReset={handleReset}
          onQuantityChange={handleQuantityChange}
          onConditionChange={handleConditionChange}
          getItemSubtotal={getItemSubtotal}
        />

        <CalculatorValuationCard
          totalEstimate={totalEstimate}
          selectedCount={selectedCount}
          selectedItems={selectedItems}
          getItemSubtotal={getItemSubtotal}
          onBookWithEstimate={handleBookWithEstimate}
        />
      </div>
    </div>
  );
};
