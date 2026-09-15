import React, { useMemo } from 'react';

interface PickupCategorySelectorProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export const PickupCategorySelector: React.FC<PickupCategorySelectorProps> = ({
  categories,
  selectedCategories,
  onToggleCategory
}) => {
  const selectedSet = useMemo(() => new Set(selectedCategories), [selectedCategories]);

  return (
    <div>
      <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
        <span>Select Items to Recycle / Sell <span className="text-red-500">*</span></span>
        <span className="text-[11px] font-normal text-slate-500">Tap to select multiple</span>
      </div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="E-Waste Categories">
        {categories.map((cat) => {
          const isSelected = selectedSet.has(cat);
          return (
            <button
              type="button"
              key={cat}
              onClick={() => onToggleCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              aria-pressed={isSelected}
            >
              <span>{cat}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
