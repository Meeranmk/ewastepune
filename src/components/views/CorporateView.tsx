import React from 'react';
import { Building2 } from 'lucide-react';
import { CorporateOverview } from './corporate/CorporateOverview';
import { CorporateEnquiryForm } from './corporate/CorporateEnquiryForm';
import { SubpageHero } from './SubpageHero';

interface CorporateViewProps {
  onNavigate?: (path: string) => void;
  onOpenPickupModal?: () => void;
}

export const CorporateView: React.FC<CorporateViewProps> = ({ onNavigate, onOpenPickupModal }) => {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Subpage Hero */}
      <SubpageHero
        badge="Enterprise ITAD & Compliance Solutions"
        badgeIcon={<Building2 className="w-3.5 h-3.5" />}
        title="Corporate E-Waste Management & IT Asset Disposal in Pune"
        description="Statutory environmental compliance, certified on-site data destruction, and maximum salvage value recovery for technology campuses in Hinjewadi, Kharadi, Magarpatta, and across Maharashtra."
        breadcrumbs={[
          { label: 'Home', href: '/', onClick: () => onNavigate?.('/') },
          { label: 'Corporate ITAD' },
        ]}
        onOpenPickupModal={onOpenPickupModal}
        stats={[
          { label: 'Enterprises Served', value: '500+' },
          { label: 'Data Destruction', value: '100% Certified' },
          { label: 'Compliance Audit', value: 'MPCB & EPR' },
          { label: 'Pickup Capacity', value: 'Up to 50 Tons' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 2-Column: Left Information, Right Corporate RFP Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <CorporateOverview />
          <CorporateEnquiryForm />
        </div>
      </div>
    </div>
  );
};
