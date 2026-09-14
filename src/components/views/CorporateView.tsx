import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  FileCheck, 
  HardDrive, 
  Server, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Mail,
  Send,
  AlertCircle
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

export const CorporateView: React.FC = () => {
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

    // Persist locally for reference
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

    // Auto-forward directly to WhatsApp
    const win = window.open(targetUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise ITAD & Compliance Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Corporate E-Waste Management & IT Asset Disposal in Pune
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Statutory environmental compliance, certified on-site data destruction, and maximum salvage value recovery for technology campuses in Hinjewadi, Kharadi, Magarpatta, and across Maharashtra.
            </p>
          </div>
        </div>

        {/* 2-Column: Left Information, Right Corporate RFP Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Scope & Capabilities */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Enterprise Lifecycle Management
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                When retiring multi-unit employee laptop fleets, server racks, or datacenter switching hardware, enterprise compliance requires stringent data sanitization, asset inventory reconciliation, and transparent environmental manifests.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Form-6 MPCB Hazardous Manifest Filing",
                  "Green Recycling Certificate for ESG / Audit",
                  "Serialized Hard Drive Barcode Auditing",
                  "NIST 800-88 Degaussing & Physical Shredding",
                  "De-installation of Server Racks & UPS Banks",
                  "Bulk Cash/NEFT Financial Recovery"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries Grid */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Industries We Partner With in Pune:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { name: "IT & Software Parks", area: "Hinjewadi, Magarpatta" },
                  { name: "Banking & FinTech", area: "Kharadi, Senapati Bapat" },
                  { name: "Datacenters & Cloud", area: "Talawade, Chakan" },
                  { name: "Hospitals & Diagnostics", area: "Deccan, Kothrud" },
                  { name: "Universities & Schools", area: "Viman Nagar, Pashan" },
                  { name: "Manufacturing MIDC", area: "Bhosari, Pimpri" }
                ].map((ind, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block">{ind.name}</span>
                    <span className="text-[10px] text-slate-400">{ind.area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Callout */}
            <div className="p-6 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase">Dedicated Corporate Desk</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">Need an immediate NDA or on-site survey?</p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="px-4 py-2 bg-[#1565C0] hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>93590 29457</span>
              </a>
            </div>

          </div>

          {/* Right Column: Corporate Enquiry Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-md">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Forwarded to WhatsApp!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{contactPerson}</strong>. Your corporate requirement for <strong>{companyName}</strong> has been auto-forwarded to our WhatsApp desk at <strong>+91 7358878713</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Open WhatsApp Chat (+91 7358878713)</span>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
                  <input
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Your Name / Title"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Mobile *</label>
                    <input
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facility / Tech Park Area *</label>
                  <select
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Approximate Inventory / Hardware Scope</label>
                  <input
                    type="text"
                    value={approxQty}
                    onChange={(e) => setApproxQty(e.target.value)}
                    placeholder="e.g. 50 Dell Laptops, 4 Servers, 10 Cisco Switches"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresDataDestruction}
                      onChange={(e) => setRequiresDataDestruction(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 font-medium">Require Certified Data Destruction (Degaussing/Shredding)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresForm6}
                      onChange={(e) => setRequiresForm6(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 font-medium">Require Form-6 Hazardous Waste Manifest</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes</label>
                  <textarea
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
                  className="w-full py-3 bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Corporate Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
