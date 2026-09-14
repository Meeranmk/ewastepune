import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { FAQ_DATA, FAQItem } from '../../data/faqData';
import { SITE_CONFIG, getWhatsAppLink } from '../../data/siteConfig';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Pickup & Payment', 'Corporate & Data', 'Locations'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((f) => f.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Everything you need to know about our Pune doorstep collection, scrap pricing, and data security policies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-[#F5F5F0]/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:text-[#2E7D32] transition-colors focus:outline-hidden"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs border border-slate-200">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#2E7D32]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper box */}
        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Still have questions about your e-waste?</h4>
            <p className="text-xs text-slate-500">Our operations team at Hadapsar is ready to assist you right now.</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call 93590 29457</span>
            </a>
            <a
              href={getWhatsAppLink('Hi! I have a question regarding e-waste collection in Pune.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
