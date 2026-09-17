import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

import { SubpageHero } from './SubpageHero';

interface ContactViewProps {
  onNavigate?: (path: string) => void;
  onOpenPickupModal?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenPickupModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waMessage = `📩 *New General Inquiry - E-Waste Center Pune*
━━━━━━━━━━━━━━━━━━━━
*Name:* ${name}
*Phone:* ${phone}
*Subject:* ${subject || 'General Inquiry'}
*Message:* ${message}
━━━━━━━━━━━━━━━━━━━━
_Sent via E-Waste Center Pune Contact Page_`;

    const waUrl = getWhatsAppLink(waMessage);
    setLastWaUrl(waUrl);

    // Save locally for record keeping
    try {
      const stored = JSON.parse(localStorage.getItem('ewp_inquiries') || '[]');
      stored.unshift({
        id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ewp_inquiries', JSON.stringify(stored));
    } catch (storageErr) {
      console.error('Storage error:', storageErr);
    }

    setLoading(false);
    setSubmitted(true);

    // Automate forwarding directly to WhatsApp
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Survey No. 89, Samarth Nagar, Hingane Mala, Ramtekadi, Hadapsar, Pune 411013'
  )}`;

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Subpage Hero */}
      <SubpageHero
        badge="Facility Hub & Contact Directory"
        badgeIcon={<MapPin className="w-3.5 h-3.5" />}
        title="Contact E-Waste Center Pune"
        description="Visit our central recycling facility in Hadapsar, call our logistics desk, or request a doorstep collection van across Pune and PCMC."
        breadcrumbs={[
          { label: 'Home', href: '/', onClick: () => onNavigate?.('/') },
          { label: 'Contact Us' },
        ]}
        onOpenPickupModal={onOpenPickupModal}
        stats={[
          { label: 'Central Hub', value: 'Hadapsar' },
          { label: 'Working Days', value: 'Mon - Sat' },
          { label: 'Response Time', value: '< 15 Mins' },
          { label: 'Pickup Van', value: 'Pune-Wide' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Facility Details */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Address Card */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Central Facility & Drop-Off Hub</h3>
                  <span className="text-xs text-emerald-700 font-semibold">Open to Public & Commercial Deliveries</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 leading-relaxed">
                  {SITE_CONFIG.address.full}
                </p>
                <p className="text-xs text-slate-500">
                  Landmarks: Near Ramtekadi Industrial Estate / Hingane Mala, Hadapsar, Pune - 411013
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {SITE_CONFIG.formattedPhone}</span>
                </a>
              </div>
            </div>

            {/* Timings & Channels */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Direct Contact Details</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Direct Phone Line:</span>
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:underline">
                      {SITE_CONFIG.formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Official WhatsApp:</span>
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline">
                      +91 93590 29457 (Instant Quotations)
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">General & Tender Email:</span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="font-bold text-slate-900 hover:underline">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Facility Hours:</span>
                    <span className="font-semibold text-slate-800">{SITE_CONFIG.hours.weekdays}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-md">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Delivered</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>! We have received your inquiry and our Hadapsar operations team will respond promptly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  {lastWaUrl && (
                    <a
                      href={lastWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] block">
                    Fast Inquiry
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send Us an Inquiry
                  </h3>
                </div>

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 93590 29457"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Requirement
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Selling 5 old desktop CPUs or ITAD quote"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1">
                    Message Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your equipment, location in Pune, and any specific questions."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
