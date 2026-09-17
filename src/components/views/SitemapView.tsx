import React from 'react';
import { 
  FileText, 
  Truck, 
  Recycle, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ACCEPTED_ITEMS_DATA } from '../../data/acceptedItemsData';
import { LOCATIONS_DATA } from '../../data/locationsData';
import { SITE_CONFIG } from '../../data/siteConfig';
import { SubpageHero } from './SubpageHero';

interface SitemapViewProps {
  onNavigate: (view: string, path?: string) => void;
  onOpenPickupModal: (category?: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate, onOpenPickupModal }) => {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Subpage Hero */}
      <SubpageHero
        badge="Sitemap & Site Index"
        badgeIcon={<FileText className="w-3.5 h-3.5" />}
        title="Complete E-Waste Center Pune Sitemap"
        description="Comprehensive index of our recycling services, accepted scrap categories, Pune collection zones, corporate ITAD solutions, and XML crawler resources."
        breadcrumbs={[
          { label: 'Home', href: '/', onClick: () => onNavigate('home', '/') },
          { label: 'Sitemap' },
        ]}
        onOpenPickupModal={() => onOpenPickupModal()}
        stats={[
          { label: 'Primary Pages', value: '5' },
          { label: 'Recycling Services', value: '6' },
          { label: 'Accepted Categories', value: '10' },
          { label: 'Pune Localities', value: '16+' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* XML Sitemaps Developer / Bot Box */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Machine-Readable XML Sitemaps</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Googlebot, Bingbot, and search engine crawlers can fetch the official XML sitemaps:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#2E7D32] text-xs font-semibold border border-emerald-200 transition-colors"
            >
              <span>sitemap.xml (All URLs)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors"
            >
              <span>robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 1. Main Navigation Hubs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">1. Main Navigation Pages</h2>
              <p className="text-xs sm:text-sm text-slate-500">Core architectural subpages of ewastecenterpune.online</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Home Page',
                path: '/',
                view: 'home',
                desc: 'Pune’s top e-waste buyer, doorstep collection van, instant cash payout, and live scrap rates.',
              },
              {
                title: 'Recycling Services',
                path: '/services',
                view: 'services',
                desc: 'Collection, scrap purchase, scientific depollution, ITAD, and certified data wiping.',
              },
              {
                title: 'What We Accept',
                path: '/what-we-accept',
                view: 'what-we-accept',
                desc: 'Catalog of 100+ accepted electronics: laptops, PCs, batteries, cables, and circuit boards.',
              },
              {
                title: 'Corporate ITAD',
                path: '/corporate',
                view: 'corporate',
                desc: 'Enterprise IT asset disposal, Form-6 documentation, data sanitization, and bulk pickups.',
              },
              {
                title: 'Contact Us & Facility',
                path: '/contact',
                view: 'contact',
                desc: 'Central facility address at Survey No. 89 Hingane Mala, Ramtekadi, Hadapsar, Pune.',
              },
              {
                title: 'How Pickup Works',
                path: '/#how-it-works',
                view: 'how-it-works',
                desc: 'Simple 4-step doorstep pickup: inquiry, schedule, digital weighing, and instant payout.',
              },
              {
                title: 'Pune Local SEO Guide',
                path: '/#pune-ewaste-guide',
                view: 'pune-ewaste-guide',
                desc: 'Coverage across Hadapsar, Hinjewadi, Kharadi, Kothrud, Baner, and all Pune pincodes.',
              },
              {
                title: 'Free Pickup Booking',
                path: '#pickup-modal',
                isAction: true,
                action: () => onOpenPickupModal(),
                desc: 'Online pickup scheduler with doorstep van dispatch across the Pune metropolitan area.',
              },
            ].map((page) => (
              <div
                key={page.title}
                onClick={() => {
                  if (page.isAction && page.action) {
                    page.action();
                  } else {
                    onNavigate(page.view, page.path);
                  }
                }}
                className="p-4 rounded-2xl border border-slate-200/90 bg-[#F5F5F0]/40 hover:bg-emerald-50/50 hover:border-emerald-300 transition-[background-color,border-color,box-shadow] cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                      {page.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-xs font-mono text-emerald-700 block mt-1">{page.path}</span>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{page.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Specialized Services Directory */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">2. Specialized Services Subpages</h2>
              <p className="text-xs sm:text-sm text-slate-500">Dedicated operational divisions and compliant recycling programs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                onClick={() => onNavigate('services', `/services/${service.slug}`)}
                className="p-5 rounded-2xl border border-slate-200 bg-[#F5F5F0]/40 hover:bg-emerald-50/50 hover:border-emerald-300 transition-[background-color,border-color,box-shadow] cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 block mt-1">/services/{service.slug}</span>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {service.category.toUpperCase()}
                  </span>
                  <span className="text-emerald-700 font-semibold group-hover:underline">View Service &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Accepted Items Catalog Subpages */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">3. Accepted Scrap Categories Subpages</h2>
              <p className="text-xs sm:text-sm text-slate-500">Electronics hardware we buy, recycle, and safely depollute</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ACCEPTED_ITEMS_DATA.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('what-we-accept', `/what-we-accept/${cat.slug}`)}
                className="p-4 rounded-2xl border border-slate-200 bg-[#F5F5F0]/40 hover:bg-emerald-50/50 hover:border-emerald-300 transition-[background-color,border-color,box-shadow] cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform shrink-0" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-1">/what-we-accept/{cat.slug}</span>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 text-[11px] text-emerald-800 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Doorstep Pickup</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Pune Coverage Zones & Local Dispatch */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">4. Pune Doorstep Collection Zones</h2>
              <p className="text-xs sm:text-sm text-slate-500">Express doorstep pickup vans scheduled daily across Pune</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS_DATA.map((loc) => (
              <div
                key={loc.slug}
                onClick={() => onNavigate('home', '/#pune-ewaste-guide')}
                className="p-4 rounded-xl border border-slate-200 bg-[#F5F5F0]/40 hover:bg-emerald-50/50 hover:border-emerald-300 transition-[background-color,border-color,box-shadow] cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {loc.name}
                    </h3>
                    <span className="text-xs text-slate-500">{loc.marathiName} • {loc.zone}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {loc.pickupSpeed.split(':')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {loc.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Contact & Facility Overview */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Central Processing Facility Pune</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Need Assistance or Immediate Pickup?</h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Our central facility is located at Survey No. 89, Samarth Nagar Road, Hingane Mala, Ramtekadi, Hadapsar, Pune 411013. We execute verified electronic scrap valuation and pickup throughout Pune.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenPickupModal()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Schedule Free Pickup</span>
                </button>
                <button
                  onClick={() => onNavigate('contact', '/contact')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
                >
                  <span>Contact Details &amp; Map</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-sm space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-slate-300">Helpline:</strong>{' '}
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="text-emerald-400 hover:underline">
                    {SITE_CONFIG.formattedPhone}
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-slate-300">Email:</strong>{' '}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs">
                  {SITE_CONFIG.address.full}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
