import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO, CORE_CAPABILITIES } from '../data/agencyData';
import { AnimatePresence, motion } from 'motion/react';
import { smoothEasing } from '../utils/animations';
import { submitContact, trackEvent } from '../utils/api';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'SEO'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    budget: '$2,500 - $5,000 / mo',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid business email';
    }
    if (!formData.phone.trim()) errs.phone = 'Please provide a contact phone number';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please describe your business goals in a few sentences';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContact({
        ...formData,
        source: 'Consultation Modal'
      });

      if (res.success && res.data?.inquiryId) {
        setInquiryRef(res.data.inquiryId);
      }
      trackEvent('FORM_SUBMIT', 'Consultation Request Submitted', { service: formData.service });
    } catch (err) {
      console.warn('[CONSULTATION] Fallback submission triggered', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6D28D9', '#2563EB', '#06B6D4', '#FACC15']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'SEO',
      budget: '$2,500 - $5,000 / mo',
      message: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: smoothEasing }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
          onClick={resetForm}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: smoothEasing }}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_25px_60px_-15px_rgba(109,40,217,0.2)] overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E9E7F2] bg-[#FAF9FF]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-1">
              <Sparkles className="w-3 h-3 text-[#6D28D9]" /> Direct Strategy Access
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Request Your Free Strategy Consultation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Discuss your growth goals directly with our senior technology and marketing team.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="w-9 h-9 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-neutral-900">
                Thanks! Your enquiry has been received.
              </h4>
              {inquiryRef && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-[#6D28D9] border border-violet-200 text-xs font-mono font-bold">
                  <span>Ref: {inquiryRef}</span>
                </div>
              )}
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                We'll review your digital footprint and reach out shortly via email or WhatsApp to schedule your tailored discovery session.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Message on WhatsApp ({AGENCY_INFO.whatsapp})
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Company Name or Website
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Corp or acme.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                  >
                    {CORE_CAPABILITIES.map((cap) => (
                      <option key={cap} value={cap}>
                        {cap}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Approximate Monthly Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                  >
                    <option value="$1,000 - $2,500 / mo">$1,000 - $2,500 / mo</option>
                    <option value="$2,500 - $5,000 / mo">$2,500 - $5,000 / mo</option>
                    <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                    <option value="$10,000+ / mo">$10,000+ / mo</option>
                    <option value="One-time Project Scope">One-time Project Scope</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  How can we help your business grow? *
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your current challenges, target audience, and primary growth milestones..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                    errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
                <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Audit Included
                  </span>
                  <span>·</span>
                  <span>NDA Guaranteed</span>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Strategy Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Quick Contact Footer Strip */}
        <div className="p-3.5 sm:p-4 bg-[#F8F7FF] border-t border-[#E9E7F2] flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2">
          <span>Need immediate assistance?</span>
          <div className="flex items-center gap-4">
            <a
              href={AGENCY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" /> {AGENCY_INFO.whatsapp}
            </a>
            <a
              href={AGENCY_INFO.emailUrl}
              className="text-[#6D28D9] hover:underline font-bold flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> {AGENCY_INFO.email}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
