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
import { PuneSEOGuideSection } from './components/home/PuneSEOGuideSection';
import { FinalCTASection } from './components/home/FinalCTASection';
import { ServicesView } from './components/views/ServicesView';
import { WhatWeAcceptView } from './components/views/WhatWeAcceptView';
import { CorporateView } from './components/views/CorporateView';
import { ContactView } from './components/views/ContactView';
import { SitemapView } from './components/views/SitemapView';
import { PickupModal } from './components/modals/PickupModal';
import { ServiceItem } from './types';
import { SERVICES_DATA } from './data/servicesData';
import { ACCEPTED_ITEMS_DATA } from './data/acceptedItemsData';

type ViewType = 'home' | 'services' | 'accept' | 'corporate' | 'contact' | 'sitemap';

const getServiceFromPath = (path: string): ServiceItem | null => {
  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '').replace(/\/+$/, '');
    return SERVICES_DATA.find(s => s.slug === slug || s.id === slug) || null;
  }
  return null;
};

const getCategoryFromPath = (path: string): string | undefined => {
  if (path.startsWith('/what-we-accept/')) {
    const slug = path.replace('/what-we-accept/', '').replace(/\/+$/, '');
    const match = ACCEPTED_ITEMS_DATA.find(c => c.slug === slug || c.id === slug);
    return match ? match.id : undefined;
  }
  return undefined;
};

const pathToView = (pathname: string): ViewType => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/services' || clean.startsWith('/services/')) return 'services';
  if (clean === '/what-we-accept' || clean.startsWith('/what-we-accept/')) return 'accept';
  if (clean === '/corporate') return 'corporate';
  if (clean === '/contact') return 'contact';
  if (clean === '/sitemap') return 'sitemap';
  return 'home';
};

const viewToPath = (view: string): string => {
  if (view === 'services') return '/services';
  if (view === 'accept' || view === 'what-we-accept') return '/what-we-accept';
  if (view === 'corporate') return '/corporate';
  if (view === 'contact') return '/contact';
  if (view === 'sitemap') return '/sitemap';
  return '/';
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined') {
      return pathToView(window.location.pathname);
    }
    return 'home';
  });

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    if (typeof window !== 'undefined') {
      return getServiceFromPath(window.location.pathname);
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      return getCategoryFromPath(window.location.pathname);
    }
    return undefined;
  });

  // Pickup Modal state
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [pickupModalProps, setPickupModalProps] = useState<{
    initialCategory?: string;
    initialQuantity?: string;
  }>({});

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const view = pathToView(path);
      setCurrentView(view);
      setSelectedService(getServiceFromPath(path));
      setSelectedCategory(getCategoryFromPath(path));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Dynamically update document title and canonical tag for SEO
  useEffect(() => {
    let title = "E-Waste in Pune | #1 E Waste Buyer & Recycling Center Pune | Doorstep Pickup";
    let canonical = "https://ewastecenterpune.online/";

    if (currentView === 'services') {
      title = selectedService 
        ? `${selectedService.title} | E-Waste Center Pune`
        : "E-Waste Recycling & Scrap Buying Services | E-Waste Center Pune";
      canonical = selectedService 
        ? `https://ewastecenterpune.online/services/${selectedService.slug}`
        : "https://ewastecenterpune.online/services";
    } else if (currentView === 'accept') {
      title = selectedCategory
        ? `${ACCEPTED_ITEMS_DATA.find(c => c.id === selectedCategory)?.name || 'Items'} Scrap Recycling Pune | What We Accept`
        : "What We Accept - Electronic Scrap & E-Waste Catalog | E-Waste Center Pune";
      canonical = selectedCategory
        ? `https://ewastecenterpune.online/what-we-accept/${selectedCategory}`
        : "https://ewastecenterpune.online/what-we-accept";
    } else if (currentView === 'corporate') {
      title = "Corporate E-Waste Management & IT Asset Disposal (ITAD) Pune";
      canonical = "https://ewastecenterpune.online/corporate";
    } else if (currentView === 'contact') {
      title = "Contact E-Waste Center Pune | Doorstep Pickup & Hadapsar Facility Map";
      canonical = "https://ewastecenterpune.online/contact";
    } else if (currentView === 'sitemap') {
      title = "HTML Sitemap & Navigation Index | E-Waste Center Pune";
      canonical = "https://ewastecenterpune.online/sitemap";
    }

    document.title = title;
    
    // Update canonical link element
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonical);
    }
  }, [currentView, selectedService, selectedCategory]);

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
    const targetPath = `/services/${service.slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string, path?: string) => {
    if (view === 'how-it-works' || view === 'pune-ewaste-guide') {
      if (currentView !== 'home') {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        }
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

    let resolvedView: ViewType = 'home';
    if (view === '/' || view === 'home') {
      resolvedView = 'home';
    } else if (view === 'services' || view === '/services' || view.startsWith('/services/')) {
      resolvedView = 'services';
    } else if (view === 'accept' || view === 'what-we-accept' || view === '/what-we-accept' || view.startsWith('/what-we-accept/')) {
      resolvedView = 'accept';
    } else if (view === 'corporate' || view === '/corporate') {
      resolvedView = 'corporate';
    } else if (view === 'contact' || view === '/contact') {
      resolvedView = 'contact';
    } else if (view === 'sitemap' || view === '/sitemap') {
      resolvedView = 'sitemap';
    }

    const targetPath = path || viewToPath(resolvedView);

    if (resolvedView === 'services') {
      setSelectedService(getServiceFromPath(targetPath));
    }
    if (resolvedView === 'accept') {
      setSelectedCategory(getCategoryFromPath(targetPath));
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    setCurrentView(resolvedView);
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
                handleNavigate('services', '/services');
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
              onOpenCorporateEnquiry={() => handleNavigate('corporate', '/corporate')}
            />

            <DataDestructionSection
              onOpenPickupModal={() => handleOpenPickupModal({ category: 'Hard Drives / Data Destruction' })}
            />

            <SustainabilitySection />

            <PuneSEOGuideSection
              onOpenPickupModal={handleOpenPickupModal}
            />

            <FinalCTASection
              onOpenPickupModal={() => handleOpenPickupModal()}
            />
          </>
        )}

        {currentView === 'services' && (
          <ServicesView
            selectedService={selectedService}
            onOpenPickupModal={(category) => handleOpenPickupModal({ category })}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'accept' && (
          <WhatWeAcceptView
            initialCategory={selectedCategory}
            onOpenPickupModal={(category) => handleOpenPickupModal({ category })}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'corporate' && (
          <CorporateView />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}

        {currentView === 'sitemap' && (
          <SitemapView
            onNavigate={handleNavigate}
            onOpenPickupModal={(category) => handleOpenPickupModal({ category })}
          />
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
