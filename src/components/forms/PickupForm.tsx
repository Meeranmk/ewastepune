import React, { useState } from 'react';
import { Truck, AlertCircle, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';
import { Lead } from '../../types';
import { PickupConfirmation } from './PickupConfirmation';
import { PickupCategorySelector } from './PickupCategorySelector';
import { PickupContactFields } from './PickupContactFields';
import { PickupLocationScheduleFields } from './PickupLocationScheduleFields';

interface PickupFormProps {
  initialCategory?: string;
  initialQuantity?: string;
  onSuccess?: (lead: Lead) => void;
  compact?: boolean;
}

const AVAILABLE_CATEGORIES = [
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
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setFullName('');
    setPhone('');
    setAddress('');
    setQuantity('');
    setMessage('');
    setUploadedFiles([]);
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

    const waUrl = getWhatsAppLink(autoWaText);
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };

  if (submittedLead) {
    return <PickupConfirmation lead={submittedLead} onReset={resetForm} />;
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

      <PickupContactFields
        fullName={fullName}
        phone={phone}
        email={email}
        company={company}
        onFullNameChange={setFullName}
        onPhoneChange={setPhone}
        onEmailChange={setEmail}
        onCompanyChange={setCompany}
      />

      <PickupLocationScheduleFields
        area={area}
        address={address}
        quantity={quantity}
        pickupDate={pickupDate}
        uploadedFiles={uploadedFiles}
        message={message}
        onAreaChange={setArea}
        onAddressChange={setAddress}
        onQuantityChange={setQuantity}
        onPickupDateChange={setPickupDate}
        onFileUpload={handleFileUpload}
        onMessageChange={setMessage}
      />

      <PickupCategorySelector
        categories={AVAILABLE_CATEGORIES}
        selectedCategories={selectedCategories}
        onToggleCategory={handleCategoryToggle}
      />

      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center space-x-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <span>
          <strong>100% Free Doorstep Collection</strong> across Pune with digital scale weighing and instant payment via UPI/Cash.
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-base shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
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
