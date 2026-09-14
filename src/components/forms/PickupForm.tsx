import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload, 
  MessageSquare, 
  AlertCircle, 
  ShieldCheck,
  Building,
  User,
  Mail,
  Layers,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';
import { LOCATIONS_DATA } from '../../data/locationsData';
import { Lead } from '../../types';

interface PickupFormProps {
  initialCategory?: string;
  initialQuantity?: string;
  onSuccess?: (lead: Lead) => void;
  compact?: boolean;
}

export const PickupForm: React.FC<PickupFormProps> = ({
  initialCategory,
  initialQuantity,
  onSuccess,
  compact = false
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Hadapsar');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : ['Laptops', 'Computers']
  );
  const [quantity, setQuantity] = useState(initialQuantity || '');
  const [pickupDate, setPickupDate] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  const availableCategories = [
    'Laptops',
    'Computers & CPUs',
    'Servers & Data Center',
    'Printers & Scanners',
    'Monitors & TVs',
    'Mobile Phones & Tablets',
    'Batteries & UPS',
    'Copper Cables & Wires',
    'PC Components & RAM',
    'Networking Hardware',
    'Mixed Office Electronics'
  ];

  const handleCategoryToggle = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((f: File) => f.name);
      setUploadedFiles(prev => [...prev, ...filesArray].slice(0, 3));
    }
  };

  const validatePhone = (num: string) => {
    // Standard Indian phone format check (10 digits, optionally with +91 or leading 0)
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please provide a valid 10-digit Indian phone number (e.g. 93590 29457).');
      return;
    }

    if (!address.trim()) {
      setError('Please provide your pickup address / building society name.');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one e-waste category.');
      return;
    }

    setLoading(true);

    const leadId = `EWP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: Lead = {
      id: leadId,
      name: fullName,
      phone,
      email: email || undefined,
      company: company || undefined,
      address,
      area,
      eWasteType: selectedCategories,
      quantity: quantity || 'Not specified',
      pickupDate: pickupDate || undefined,
      message: message || undefined,
      source: compact ? 'Quick Modal' : 'Pickup Page',
      createdAt: new Date().toISOString(),
      status: 'NEW'
    };

    // Save locally for user history & persistence without needing a backend server
    try {
      const stored = JSON.parse(localStorage.getItem('ewp_leads') || '[]');
      stored.unshift(newLead);
      localStorage.setItem('ewp_leads', JSON.stringify(stored));
    } catch (storageErr) {
      console.error('Storage error:', storageErr);
    }

    const autoWaText = `🚛 *New E-Waste Pickup Request* (#${leadId})
━━━━━━━━━━━━━━━━━━━━
*Name:* ${fullName}
*Phone:* ${phone}
*Area:* ${area}, Pune
*Address:* ${address}
*Items:* ${selectedCategories.join(', ')}
*Quantity:* ${quantity || 'Not specified'}
*Preferred Date:* ${pickupDate || 'Earliest available'}
*Notes:* ${message || 'None'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via E-Waste Center Pune Portal_`;

    setSubmittedLead(newLead);
    if (onSuccess) onSuccess(newLead);
    setLoading(false);

    // Automate forwarding directly to WhatsApp
    const waUrl = getWhatsAppLink(autoWaText);
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // If popup blocker intervened, location assignment ensures mobile devices open WhatsApp directly
      window.location.href = waUrl;
    }
  };

  if (submittedLead) {
    const confirmationText = `🚛 *New E-Waste Pickup Request* (#${submittedLead.id})
━━━━━━━━━━━━━━━━━━━━
*Name:* ${submittedLead.name}
*Phone:* ${submittedLead.phone}
*Area:* ${submittedLead.area}, Pune
*Address:* ${submittedLead.address}
*Items:* ${submittedLead.eWasteType.join(', ')}
*Quantity:* ${submittedLead.quantity || 'Not specified'}
*Preferred Date:* ${submittedLead.pickupDate || 'Earliest available'}
*Notes:* ${submittedLead.message || 'None'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via E-Waste Center Pune Portal_`;

    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-md text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
          Request Confirmed • Reference #{submittedLead.id}
        </span>

        <h3 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
          Thank you, {submittedLead.name}!
        </h3>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Your e-waste pickup request has been routed to our Hadapsar operations team. Our logistics coordinator will call you at <strong className="text-slate-900">{submittedLead.phone}</strong> shortly to confirm your pickup slot.
        </p>

        {/* Lead Details Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Pickup Area:</span>
            <span className="font-semibold text-slate-800">{submittedLead.area}, Pune</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Address:</span>
            <span className="font-semibold text-slate-800 text-right">{submittedLead.address}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Items:</span>
            <span className="font-semibold text-slate-800">{submittedLead.eWasteType.join(', ')}</span>
          </div>
          {submittedLead.pickupDate && (
            <div className="flex justify-between">
              <span className="text-slate-500">Preferred Date:</span>
              <span className="font-semibold text-emerald-700">{submittedLead.pickupDate}</span>
            </div>
          )}
        </div>

        {/* Quick WhatsApp Confirmation Link */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={getWhatsAppLink(confirmationText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Details on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSubmittedLead(null);
              setFullName('');
              setPhone('');
              setAddress('');
              setQuantity('');
              setMessage('');
              setUploadedFiles([]);
            }}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-[#2E7D32] mb-1">
          <Truck className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Fast Pune Doorstep Collection</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Request Free E-Waste Pickup
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Sell your electronic scrap or schedule responsible recycling with instant payment on site.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Deshpande"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Phone Number (WhatsApp) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 93590 29457"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Our team calls you to coordinate pickup</span>
        </div>
      </div>

      {/* Row 2: Email and Company (optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="for digital receipt & certificate"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Company / Organization (Optional)
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Persistent / Tech Mahindra"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Pune Area & Specific Address */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Pune Locality / Area <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              {LOCATIONS_DATA.map((loc) => (
                <option key={loc.slug} value={loc.name.split(' (')[0]}>
                  {loc.name.split(' (')[0]} ({loc.zone})
                </option>
              ))}
              <option value="Other Area in Pune">Other Area in Pune</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Pickup Address & Landmark <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Flat/Office No., Society/Tech Park Name, Near Landmark"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
        </div>
      </div>

      {/* Row 4: E-Waste Category Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Select Items to Recycle / Sell <span className="text-red-500">*</span></span>
          <span className="text-[11px] font-normal text-slate-500">Tap to select multiple</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableCategories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                type="button"
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 5: Quantity & Preferred Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Approximate Quantity / Count
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 3 laptops, 1 CPU, or ~15 kg wires"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Pickup Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="date"
              value={pickupDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Optional Photo Attachment */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
          <span>Upload Item Photos (Optional)</span>
          <span className="text-[11px] font-normal text-slate-500">Helps us give an instant quote</span>
        </label>
        <div className="flex items-center space-x-3">
          <label className="cursor-pointer inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Choose Files</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </label>
          {uploadedFiles.length > 0 ? (
            <span className="text-xs text-emerald-700 font-semibold truncate">
              {uploadedFiles.length} photo(s) selected: {uploadedFiles.join(', ')}
            </span>
          ) : (
            <span className="text-xs text-slate-400">Attach photos of laptops, scrap pile or serial labels</span>
          )}
        </div>
      </div>

      {/* Special Message / Instructions */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Special Notes or Gate Instructions
        </label>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Need hard drive serial numbers documented, or visit after 2 PM"
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
      </div>

      {/* Trust & Guarantee Pill */}
      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center space-x-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <span>
          <strong>100% Free Doorstep Collection</strong> across Pune with digital scale weighing and instant payment via UPI/Cash.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
      >
        {loading ? (
          <span>Scheduling Your Pickup...</span>
        ) : (
          <>
            <Truck className="w-5 h-5" />
            <span>Submit Pickup Request</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-500">
        Or call directly: <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-bold text-emerald-700 underline">{SITE_CONFIG.formattedPhone}</a> (Hadapsar Facility)
      </p>
    </form>
  );
};
