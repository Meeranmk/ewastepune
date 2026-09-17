import React from 'react';
import { ChevronRight, Home, Truck, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

interface SubpageHeroProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; href?: string; onClick?: () => void }>;
  onOpenPickupModal?: () => void;
  stats?: Array<{ label: string; value: string }>;
}

export const SubpageHero: React.FC<SubpageHeroProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  breadcrumbs,
  onOpenPickupModal,
  stats,
}) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-[#1E293B] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden border-b border-slate-800">
      {/* Subtle Background Pattern & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E7D32_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-400">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={idx} className="flex items-center space-x-2">
                  {idx === 0 && <Home className="w-3.5 h-3.5 text-slate-400 mr-1" />}
                  {isLast ? (
                    <span className="text-emerald-400 font-semibold" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : crumb.href ? (
                    <a
                      href={crumb.href}
                      onClick={(e) => {
                        if (crumb.onClick) {
                          e.preventDefault();
                          crumb.onClick();
                        }
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {crumb.label}
                    </button>
                  )}
                  {!isLast && <ChevronRight className="w-3 h-3 text-slate-600" />}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
              {badgeIcon}
              <span>{badge}</span>
            </div>

            {/* Semantic H1 Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              {onOpenPickupModal && (
                <button
                  type="button"
                  onClick={onOpenPickupModal}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#2E7D32] hover:bg-[#256629] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <Truck className="w-4 h-4" />
                  <span>Schedule Free Pickup</span>
                </button>
              )}

              <a
                href={getWhatsAppLink(`Hi, I'm inquiring from the ${title} page on your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-emerald-300 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>
          </div>

          {/* Optional Stats Highlights */}
          {stats && stats.length > 0 && (
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 text-center backdrop-blur-xs"
                >
                  <div className="text-2xl font-black text-emerald-400">{stat.value}</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
