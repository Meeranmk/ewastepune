import React from 'react';
import { X } from 'lucide-react';
import { PickupForm } from '../forms/PickupForm';
import { Lead } from '../../types';

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialQuantity?: string;
}

export const PickupModal: React.FC<PickupModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialQuantity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-1 sm:p-2 max-h-[90vh] overflow-y-auto">
          <PickupForm
            initialCategory={initialCategory}
            initialQuantity={initialQuantity}
            compact={true}
            onSuccess={(lead: Lead) => {
              // keep modal open to show the confirmation screen inside form
            }}
          />
        </div>

      </div>
    </div>
  );
};
