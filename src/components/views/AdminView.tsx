import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  AlertCircle,
  Copy,
  FileCode,
  Tag
} from 'lucide-react';
import { Lead } from '../../types';
import { LOCATIONS_DATA } from '../../data/locationsData';

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'ai-seo'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [areaFilter, setAreaFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // AI SEO Assistant State
  const [seoKeyword, setSeoKeyword] = useState('sell old laptop');
  const [seoLocation, setSeoLocation] = useState('Hadapsar, Pune');
  const [seoType, setSeoType] = useState('service_landing');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSeoResult, setAiSeoResult] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchLeads = () => {
    setLoadingLeads(true);
    try {
      const stored = JSON.parse(localStorage.getItem('ewp_leads') || '[]');
      setLeads(stored);
    } catch (e) {
      console.error(e);
      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: Lead['status']) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, status: newStatus } : l);
      try {
        localStorage.setItem('ewp_leads', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const handleGenerateAISeo = async () => {
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: seoKeyword,
          location: seoLocation,
          articleType: seoType
        })
      });

      const data = await res.json();
      if (data.success && data.seoData) {
        setAiSeoResult(data.seoData);
      }
    } catch (err) {
      console.error('AI SEO generation failed:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Area', 'Address', 'Items', 'Quantity', 'Status', 'EstimatedValue'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      `"${l.area}"`,
      `"${(l.address || '').replace(/"/g, '""')}"`,
      `"${(l.eWasteType || []).join(', ')}"`,
      `"${l.quantity || ''}"`,
      l.status,
      l.estimatedValue || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ewaste_leads_pune_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesArea = areaFilter === 'ALL' || lead.area === areaFilter;
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesArea && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 bg-[#F5F5F0] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Navigation Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Pune Operations & SEO Portal</h1>
              <span className="text-xs text-slate-500">Central Hub: Survey No. 89, Hingane Mala, Hadapsar</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Pickup Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-seo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'ai-seo'
                  ? 'bg-[#1565C0] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI SEO Assistant</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Lead Management */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex flex-wrap items-center gap-2 grow">
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, or ID..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New Requests</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="PICKUP_SCHEDULED">Pickup Scheduled</option>
                  <option value="COLLECTED">Collected</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="ALL">All Areas in Pune</option>
                  {LOCATIONS_DATA.map((l) => (
                    <option key={l.slug} value={l.name.split(' (')[0]}>
                      {l.name.split(' (')[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={fetchLeads}
                  disabled={loadingLeads}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  title="Refresh Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={downloadCSV}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Leads Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Ref ID / Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Area & Address</th>
                      <th className="py-3 px-4">E-Waste Items</th>
                      <th className="py-3 px-4">Est. Value</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No leads match the current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const dateStr = new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });

                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-slate-900 block">{lead.id}</span>
                              <span className="text-[10px] text-slate-400">{dateStr}</span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-800 block">{lead.name}</span>
                              <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="text-emerald-700 font-semibold hover:underline">
                                {lead.phone}
                              </a>
                              {lead.company && (
                                <span className="text-[10px] text-blue-600 block">{lead.company}</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 max-w-[200px]">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[10px] block w-fit mb-1">
                                {lead.area}
                              </span>
                              <span className="text-slate-500 text-[11px] truncate block" title={lead.address}>
                                {lead.address}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-[220px]">
                              <span className="font-medium text-slate-800 block truncate">
                                {lead.eWasteType.join(', ')}
                              </span>
                              {lead.quantity && (
                                <span className="text-[10px] text-slate-400 block truncate">
                                  Qty: {lead.quantity}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 font-bold text-[#2E7D32]">
                              {lead.estimatedValue ? `₹${lead.estimatedValue.toLocaleString('en-IN')}` : '—'}
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                                  lead.status === 'NEW' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                  lead.status === 'CONTACTED' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  lead.status === 'PICKUP_SCHEDULED' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                                  lead.status === 'COLLECTED' ? 'bg-teal-50 text-teal-800 border-teal-300' :
                                  lead.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  'bg-slate-100 text-slate-600 border-slate-300'
                                }`}
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="PICKUP_SCHEDULED">PICKUP_SCHEDULED</option>
                                <option value="COLLECTED">COLLECTED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <a
                                href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Hi ${lead.name}, this is from E-Waste Center Pune regarding your pickup request #${lead.id} in ${lead.area}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold rounded-lg text-[11px]"
                              >
                                WhatsApp
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: AI SEO Assistant (PRD Section 28) */}
        {activeTab === 'ai-seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left SEO Generator Controls */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-1.5 text-blue-600 text-xs font-bold uppercase mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Gemini 3.8 Flash Powered</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Pune Local SEO Content Generator
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Generate SEO briefs, title tags, meta descriptions, localized FAQs, and JSON-LD schema for Pune target keywords.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Search Keyword *</label>
                <input
                  type="text"
                  value={seoKeyword}
                  onChange={(e) => setSeoKeyword(e.target.value)}
                  placeholder="e.g. computer scrap buyer, sell old laptop"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pune Area / Location Target</label>
                <input
                  type="text"
                  value={seoLocation}
                  onChange={(e) => setSeoLocation(e.target.value)}
                  placeholder="e.g. Hadapsar, Hinjewadi, Kharadi, Kothrud"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Content Type</label>
                <select
                  value={seoType}
                  onChange={(e) => setSeoType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="service_landing">Service Landing Page</option>
                  <option value="location_page">Pune Location Page</option>
                  <option value="educational_guide">Educational Guide / Blog</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateAISeo}
                disabled={aiGenerating}
                className="w-full py-3 bg-[#1565C0] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{aiGenerating ? 'Analyzing & Generating Brief...' : 'Generate SEO Blueprint'}</span>
              </button>
            </div>

            {/* Right SEO Blueprint Output */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              {!aiSeoResult ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <FileCode className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-medium">Click "Generate SEO Blueprint" to create optimized content for Pune.</p>
                  <span className="text-xs text-slate-400">Generates Google-ready meta tags, heading structures, and schema</span>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in text-xs sm:text-sm">
                  
                  {/* Title & Meta */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="font-bold uppercase tracking-wider text-xs text-slate-500">Google SERP Preview</span>
                      <button
                        onClick={() => handleCopy(aiSeoResult.seoTitle, 'title')}
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === 'title' ? 'Copied!' : 'Copy Title'}</span>
                      </button>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-blue-700 font-bold text-sm sm:text-base block leading-snug">
                        {aiSeoResult.seoTitle}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-mono block">
                        https://ewastecenterpune.online/{aiSeoResult.slug || 'pune-ewaste'}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {aiSeoResult.metaDescription}
                      </p>
                    </div>
                  </div>

                  {/* H1 and Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">H1 Tag</span>
                      <span className="font-bold text-slate-900 text-xs mt-0.5 block">{aiSeoResult.h1}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Suggested URL Slug</span>
                      <span className="font-mono font-semibold text-emerald-700 text-xs mt-0.5 block">/{aiSeoResult.slug}</span>
                    </div>
                  </div>

                  {/* Content Outline */}
                  {aiSeoResult.contentOutline && (
                    <div>
                      <span className="font-bold uppercase tracking-wider text-xs text-slate-500 block mb-2">
                        Pune-Specific Content Section Outline:
                      </span>
                      <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                        {aiSeoResult.contentOutline.map((item: string, i: number) => (
                          <li key={i} className="text-xs">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Generated FAQs */}
                  {aiSeoResult.faqs && (
                    <div>
                      <span className="font-bold uppercase tracking-wider text-xs text-slate-500 block mb-2">
                        Generated Localized FAQs:
                      </span>
                      <div className="space-y-2">
                        {aiSeoResult.faqs.map((f: any, i: number) => (
                          <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                            <strong className="block text-slate-900 mb-0.5">Q: {f.question}</strong>
                            <span className="text-slate-600">A: {f.answer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyword Clusters */}
                  {aiSeoResult.keywords && (
                    <div>
                      <span className="font-bold uppercase tracking-wider text-xs text-slate-500 block mb-2">
                        Related Keyword Cluster:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aiSeoResult.keywords.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-200">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
