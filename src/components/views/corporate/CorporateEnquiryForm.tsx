import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../../data/siteConfig';

export const CorporateEnquiryForm: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [itParkArea, setItParkArea] = useState('Hinjewadi IT Park');
  const [approxQty, setApproxQty] = useState('');
  const [requiresDataDestruction, setRequiresDataDestruction] = useState(true);
  const [requiresForm6, setRequiresForm6] = useState(true);
  const [notes, setNotes] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: contactPerson,
      company: companyName,
      phone,
      email,
      address: `Corporate Office, ${itParkArea}`,
      area: itParkArea,
      eWasteType: ['Corporate ITAD Bulk', requiresDataDestruction ? 'Data Destruction' : ''],
      quantity: approxQty,
      message: `Form-6 Required: ${requiresForm6 ? 'Yes' : 'No'}. Data Destruction Required: ${requiresDataDestruction ? 'Yes' : 'No'}. Notes: ${notes || 'None'}`,
      source: 'Corporate Portal'
    };

    const formattedWhatsAppMsg = `🏢 *New Corporate E-Waste Enquiry*
━━━━━━━━━━━━━━━━━━━━
*Company:* ${companyName}
*Contact Person:* ${contactPerson}
*Official Phone:* ${phone}
*Work Email:* ${email || 'Not provided'}
*Tech Park / Area:* ${itParkArea}
*Scope / Inventory:* ${approxQty || 'Not specified'}
*Data Destruction:* ${requiresDataDestruction ? '✅ Certified (Degaussing/Shredding)' : '❌ Not needed'}
*Form-6 Manifest:* ${requiresForm6 ? '✅ Required (MPCB Hazardous)' : '❌ Not needed'}
*Notes / Timeline:* ${notes || 'None'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via E-Waste Center Pune Corporate Desk_`;

    const targetUrl = getWhatsAppLink(formattedWhatsAppMsg);
    setWhatsappRedirectUrl(targetUrl);

    try {
      const stored = JSON.parse(localStorage.getItem('ewp_leads') || '[]');
      stored.unshift({
        id: `CORP-${Math.floor(1000 + Math.random() * 9000)}`,
        ...payload,
        createdAt: new Date().toISOString(),
        status: 'NEW'
      });
      localStorage.setItem('ewp_leads', JSON.stringify(stored));
    } catch (storageErr) {
      console.error('Storage error:', storageErr);
    }

    setLoading(false);
    setSubmitted(true);

    const win = window.open(targetUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-md">
      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Enquiry Forwarded to WhatsApp!</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you, <strong>{contactPerson}</strong>. Your corporate requirement for <strong>{companyName}</strong> has been auto-forwarded to our WhatsApp desk at <strong>{SITE_CONFIG.formattedPhone}</strong>.
          </p>
          <div className="pt-2">
            <a
              href={whatsappRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors cursor-pointer"
            >
              <span>Open WhatsApp Chat ({SITE_CONFIG.formattedPhone})</span>
            </a>
          </div>
          <p className="text-xs text-slate-400">
            If WhatsApp did not open automatically in your browser, tap the button above.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Fast B2B Response
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Request Corporate Proposal & Valuation
            </h3>
          </div>

          <div>
            <label htmlFor="corp-company" className="block text-xs font-bold text-slate-700 mb-1">
              Company / Organization *
            </label>
            <input
              id="corp-company"
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Infosys / Persistent / Bajaj"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="corp-contact-person" className="block text-xs font-bold text-slate-700 mb-1">
                Contact Person *
              </label>
              <input
                id="corp-contact-person"
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Your Name / Title"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label htmlFor="corp-phone" className="block text-xs font-bold text-slate-700 mb-1">
                Official Mobile *
              </label>
              <input
                id="corp-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 93590 29457"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label htmlFor="corp-email" className="block text-xs font-bold text-slate-700 mb-1">
              Work Email
            </label>
            <input
              id="corp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="corp-it-park" className="block text-xs font-bold text-slate-700 mb-1">
              Facility / Tech Park Area *
            </label>
            <select
              id="corp-it-park"
              value={itParkArea}
              onChange={(e) => setItParkArea(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="Hinjewadi IT Park">Hinjewadi IT Park (Phase 1, 2, 3)</option>
              <option value="EON Free Zone / Kharadi">EON Free Zone / Kharadi WTC</option>
              <option value="Magarpatta Cybercity">Magarpatta Cybercity / Hadapsar</option>
              <option value="Viman Nagar / Kalyani Nagar">Viman Nagar / Kalyani Nagar</option>
              <option value="Bhosari / Chakan MIDC">Bhosari / Chakan Industrial MIDC</option>
              <option value="Talwade Software Park">Talwade Software Park</option>
              <option value="Other Area in Pune">Other Corporate Campus in Pune</option>
            </select>
          </div>

          <div>
            <label htmlFor="corp-approx-qty" className="block text-xs font-bold text-slate-700 mb-1">
              Approximate Inventory / Hardware Scope
            </label>
            <input
              id="corp-approx-qty"
              type="text"
              value={approxQty}
              onChange={(e) => setApproxQty(e.target.value)}
              placeholder="e.g. 50 Dell Laptops, 4 Servers, 10 Cisco Switches"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <label htmlFor="corp-data-destruction" className="flex items-center space-x-2 cursor-pointer">
              <input
                id="corp-data-destruction"
                type="checkbox"
                checked={requiresDataDestruction}
                onChange={(e) => setRequiresDataDestruction(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">Require Certified Data Destruction (Degaussing/Shredding)</span>
            </label>
            <label htmlFor="corp-form-6" className="flex items-center space-x-2 cursor-pointer">
              <input
                id="corp-form-6"
                type="checkbox"
                checked={requiresForm6}
                onChange={(e) => setRequiresForm6(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">Require Form-6 Hazardous Waste Manifest</span>
            </label>
          </div>

          <div>
            <label htmlFor="corp-notes" className="block text-xs font-bold text-slate-700 mb-1">
              Additional Notes
            </label>
            <textarea
              id="corp-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. De-installation timeline or audit deadline"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : 'Submit Corporate Enquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
