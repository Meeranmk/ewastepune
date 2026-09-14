import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingCTA } from './components/layout/FloatingCTA';
import { HeroSection } from './components/home/HeroSection';
import { ServicesSection } from './components/home/ServicesSection';
import { AcceptedItemsSection } from './components/home/AcceptedItemsSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { ResidentialCorporateSection } from './components/home/ResidentialCorporateSection';
import { DataDestructionSection } from './components/home/DataDestructionSection';
import { SustainabilitySection } from './components/home/SustainabilitySection';
import { PuneAreasSection } from './components/home/PuneAreasSection';
import { FAQSection } from './components/home/FAQSection';
import { FinalCTASection } from './components/home/FinalCTASection';
import { ServicesView } from './components/views/ServicesView';
import { WhatWeAcceptView } from './components/views/WhatWeAcceptView';
import { CorporateView } from './components/views/CorporateView';
import { ContactView } from './components/views/ContactView';
import { PickupModal } from './components/modals/PickupModal';
import { ServiceItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'services' | 'accept' | 'corporate' | 'contact'
  >('home');

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Pickup Modal state
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [pickupModalProps, setPickupModalProps] = useState<{
    initialCategory?: string;
    initialQuantity?: string;
  }>({});

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenPickupModal = (params?: {
    category?: string;
    quantity?: string;
  }) => {
    if (params) {
      setPickupModalProps({
        initialCategory: params.category,
        initialQuantity: params.quantity,
      });
    } else {
      setPickupModalProps({});
    }
    setIsPickupModalOpen(true);
  };

  const handleSelectServiceFromHome = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentView('services');
  };

  const handleSelectAreaFromHome = (areaName: string) => {
    handleOpenPickupModal({
      category: 'Electronics Scrap'
    });
  };

  const handleNavigate = (view: string) => {
    if (view === 'what-we-accept') {
      setCurrentView('accept');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'how-it-works' || view === 'areas' || view === 'faq') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById(view);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(view);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Persistent Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenPickupModal={() => handleOpenPickupModal()}
      />

      {/* Main Content View Switcher */}
      <main className="grow">
        {currentView === 'home' && (
          <>
            <HeroSection
              onOpenPickupModal={() => handleOpenPickupModal()}
              onNavigateToServices={() => {
                setCurrentView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ServicesSection
              onSelectService={handleSelectServiceFromHome}
              onOpenPickupModal={() => handleOpenPickupModal()}
            />

            <AcceptedItemsSection
              onSelectCategoryForPickup={(category) => handleOpenPickupModal({ category })}
            />

            <HowItWorksSection
              onOpenPickupModal={() => handleOpenPickupModal()}
            />

            <WhyChooseUsSection />

            <ResidentialCorporateSection
              onOpenPickupModal={() => handleOpenPickupModal()}
              onOpenCorporateEnquiry={() => setCurrentView('corporate')}
            />

            <DataDestructionSection
              onOpenPickupModal={() => handleOpenPickupModal({ category: 'Hard Drives / Data Destruction' })}
            />

            <SustainabilitySection />

            <PuneAreasSection
              onSelectAreaForPickup={handleSelectAreaFromHome}
            />

            <FAQSection />

            <FinalCTASection
              onOpenPickupModal={() => handleOpenPickupModal()}
            />
          </>
        )}

        {currentView === 'services' && (
          <ServicesView
            selectedService={selectedService}
            onOpenPickupModal={(category) => handleOpenPickupModal({ category })}
          />
        )}

        {currentView === 'accept' && (
          <WhatWeAcceptView
            onOpenPickupModal={(category) => handleOpenPickupModal({ category })}
          />
        )}

        {currentView === 'corporate' && (
          <CorporateView />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPickupModal={() => handleOpenPickupModal()}
      />

      {/* Floating CTA for high conversion */}
      <FloatingCTA
        onOpenPickupModal={() => handleOpenPickupModal()}
      />

      {/* Global Accessible Pickup Modal */}
      <PickupModal
        isOpen={isPickupModalOpen}
        onClose={() => setIsPickupModalOpen(false)}
        initialCategory={pickupModalProps.initialCategory}
        initialQuantity={pickupModalProps.initialQuantity}
      />

    </div>
  );
}
