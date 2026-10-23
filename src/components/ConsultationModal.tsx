import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail, Phone, Sparkles, AlertCircle, Globe, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO, CORE_CAPABILITIES } from '../data/agencyData';
import { AnimatePresence, motion } from 'motion/react';
import { smoothEasing } from '../utils/animations';
import { submitContact, apiTrackEvent } from '../utils/api';

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
    websiteUrl: '',
    location: '',
    service: initialService,
    budget: '$2,500 - $5,000 / mo',
    timeline: 'Within 2-4 weeks',
    serviceDetails: '',
    message: '',
    consentGiven: true,
    hp_field: '' // Honeypot field for spam prevention
  });

  const [formRenderTime, setFormRenderTime] = useState<number>(Date.now());
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormRenderTime(Date.now());
      setHasStartedTyping(false);
      apiTrackEvent('contact_form_view', { form: 'Consultation Modal', service: initialService });
    }
  }, [isOpen, initialService]);

  const handleInputFocus = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      apiTrackEvent('form_start', { form: 'Consultation Modal', service: formData.service });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid business email address';
    }
    if (!formData.company.trim()) {
      errs.company = 'Please provide your company or organization name';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please describe your business goals or project requirements (min 10 characters)';
    }
    if (!formData.consentGiven) {
      errs.consent = 'Please confirm consent for project review communications';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company,
        websiteUrl: formData.websiteUrl || undefined,
        city: formData.location ? formData.location.split(',')[0]?.trim() : undefined,
        state: formData.location && formData.location.includes(',') ? formData.location.split(',')[1]?.trim() : undefined,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        serviceDetails: formData.serviceDetails ? { specificNeeds: formData.serviceDetails } : undefined,
        consentGiven: formData.consentGiven,
        hp_field: formData.hp_field,
        formRenderTime,
        source: 'Consultation Modal',
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        utmSource: urlParams?.get('utm_source') || undefined,
        utmMedium: urlParams?.get('utm_medium') || undefined,
        utmCampaign: urlParams?.get('utm_campaign') || undefined,
        utmContent: urlParams?.get('utm_content') || undefined,
        utmTerm: urlParams?.get('utm_term') || undefined
      };

      const res = await submitContact(payload);

      if (res.success && res.data?.inquiryId) {
        setInquiryRef(res.data.inquiryId);
        setIsSubmitted(true);
        apiTrackEvent('valid_submission', {
          form: 'Consultation Modal',
          service: formData.service,
          inquiryId: res.data.inquiryId
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6D28D9', '#2563EB', '#06B6D4', '#FACC15']
          });
        } catch {
          // Graceful fallback
        }
      } else {
        setErrors({ server: res.message || 'Submission could not be completed. Please reach out directly via WhatsApp.' });
      }
    } catch (err: any) {
      console.warn('[CONSULTATION] Submission error:', err);
      setErrors({ server: err?.message || 'Network connectivity issue. Your inputs are saved. Please retry or contact us on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      websiteUrl: '',
      location: '',
      service: initialService,
      budget: '$2,500 - $5,000 / mo',
      timeline: 'Within 2-4 weeks',
      serviceDetails: '',
      message: '',
      consentGiven: true,
      hp_field: ''
    });
    setErrors({});
    onClose();
  };

  // Service-specific conditional question prompt
  const getServiceQuestionLabel = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes('seo')) {
      return 'What is your primary SEO target? (e.g. Local ranking, Core Web Vitals, organic ARR)';
    }
    if (s.includes('web') || s.includes('develop')) {
      return 'Target website or application type? (e.g. React Web App, Corporate Redesign, Client Portal)';
    }
    if (s.includes('ai') || s.includes('automation')) {
      return 'What workflow or tool do you want to automate? (e.g. Inbound lead qualification, Zapier/Make CRM sync)';
    }
    if (s.includes('commerce') || s.includes('shopify')) {
      return 'Target e-commerce platform & approximate SKU count? (e.g. Shopify 500 SKUs, Custom WooCommerce)';
    }
    return 'Specific technical requirements or goals for this service';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: smoothEasing }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={resetForm}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: smoothEasing }}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_25px_60px_-15px_rgba(109,40,217,0.2)] overflow-hidden my-auto flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E9E7F2] bg-[#FAF9FF] shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[11px] font-bold mb-1">
                  <Sparkles className="w-3 h-3 text-[#6D28D9]" /> Direct Technical Strategy Access
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight font-['Space_Grotesk']">
                  Request a Free Technical Consultation
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Discuss your business goals directly with our senior technology and growth strategists.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="w-9 h-9 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors shadow-xs shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                    Your Brief Has Been Received!
                  </h4>
                  {inquiryRef && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 text-[#6D28D9] border border-violet-200 text-xs font-mono font-bold">
                      <span>Inquiry Reference: {inquiryRef}</span>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Our senior engineering and growth strategists will review your project brief within <strong>24 business hours</strong> and reach out via email with an initial assessment and calendar invite.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] text-xs text-neutral-700 max-w-md mx-auto text-left space-y-1.5">
                    <div className="font-bold text-neutral-900">What Happens Next:</div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#6D28D9] font-bold">1.</span>
                      <span>Initial technical &amp; digital footprint review.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#6D28D9] font-bold">2.</span>
                      <span>Direct 30-minute discovery consultation scheduled.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#6D28D9] font-bold">3.</span>
                      <span>Bespoke scope proposal with timeline and fixed milestones.</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={AGENCY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => apiTrackEvent('whatsapp_click', { source: 'Consultation Success Modal' })}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
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
                  {/* Honeypot field (hidden from real users) */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <input
                      type="text"
                      name="hp_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.hp_field}
                      onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                    />
                  </div>

                  {errors.server && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{errors.server}</span>
                    </div>
                  )}

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onFocus={handleInputFocus}
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
                        Business Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Company and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Software LLC"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          errors.company ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                        }`}
                      />
                      {errors.company && <p className="text-[11px] text-red-500 mt-1">{errors.company}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Phone / WhatsApp <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Website URL and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Current Website URL <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Globe className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.websiteUrl}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Business Location <span className="text-neutral-400 font-normal">(City, State)</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.location}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Austin, TX or USA"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Service, Budget, and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
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
                        Project Budget <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                      >
                        <option value="$1,000 - $2,500 / mo">$1,000 - $2,500 / mo</option>
                        <option value="$2,500 - $5,000 / mo">$2,500 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                        <option value="$10,000+ / mo">$10,000+ / mo</option>
                        <option value="One-time Fixed Project">One-time Fixed Project</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Target Timeline <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                      >
                        <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                        <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="Flexible / Planning stage">Flexible / Planning stage</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional Service-Specific Question */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      {getServiceQuestionLabel(formData.service)}
                    </label>
                    <input
                      type="text"
                      value={formData.serviceDetails}
                      onFocus={handleInputFocus}
                      onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
                      placeholder="Outline any key specifics or platforms..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Project Details &amp; Business Objectives *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onFocus={handleInputFocus}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your current bottlenecks, target audience, and primary growth milestones..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                        errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent-modal"
                      checked={formData.consentGiven}
                      onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#6D28D9] focus:ring-[#6D28D9]"
                    />
                    <label htmlFor="consent-modal" className="text-[11px] text-neutral-600 leading-tight">
                      I agree to receive a direct project review and communication from House Robotics regarding this enquiry. We respect your privacy and never sell or share your contact details.
                    </label>
                  </div>
                  {errors.consent && <p className="text-[11px] text-red-500">{errors.consent}</p>}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Technical Assessment
                      </span>
                      <span>·</span>
                      <span>Remote Delivery Protocol</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Strategy Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Contact Footer Strip */}
            <div className="p-3.5 sm:p-4 bg-[#F8F7FF] border-t border-[#E9E7F2] flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2 shrink-0">
              <span className="text-[11px]">Direct Senior Contact:</span>
              <div className="flex items-center gap-4">
                <a
                  href={AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => apiTrackEvent('whatsapp_click', { source: 'Modal Footer' })}
                  className="text-emerald-700 hover:underline font-bold flex items-center gap-1 text-[11px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> {AGENCY_INFO.whatsapp}
                </a>
                <a
                  href={AGENCY_INFO.emailUrl}
                  onClick={() => apiTrackEvent('email_click', { source: 'Modal Footer' })}
                  className="text-[#6D28D9] hover:underline font-bold flex items-center gap-1 text-[11px]"
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
