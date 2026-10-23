import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  MapPin,
  Calendar,
  ChevronDown,
  HelpCircle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO, CORE_CAPABILITIES } from '../data/agencyData';
import { ContactVisual } from '../components/ContactVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { smoothEasing } from '../utils/animations';
import { submitContact, apiTrackEvent } from '../utils/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    websiteUrl: '',
    location: '',
    service: 'SEO',
    budget: '$2,500 - $5,000 / mo',
    timeline: 'Within 2-4 weeks',
    serviceDetails: '',
    message: '',
    consentGiven: true,
    hp_field: ''
  });

  const [formRenderTime, setFormRenderTime] = useState<number>(Date.now());
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  React.useEffect(() => {
    setFormRenderTime(Date.now());
    apiTrackEvent('contact_form_view', { form: 'Contact Page' });
  }, []);

  const handleInputFocus = () => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      apiTrackEvent('form_start', { form: 'Contact Page', service: formData.service });
    }
  };

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

  const faqs = [
    {
      q: 'How fast do you respond to new client briefs?',
      a: 'All project briefs are reviewed within 24 business hours by our senior engineering and marketing strategists. You will receive an initial assessment and calendar invite directly.'
    },
    {
      q: 'Do you offer month-to-month or fixed-scope contracts?',
      a: 'We provide both flexible month-to-month retainer sprints with clear milestones and defined fixed-scope project agreements for web platform builds and infrastructure migrations.'
    },
    {
      q: 'Can we schedule a live technical consultation before committing?',
      a: 'Yes! We conduct an initial 30-minute discovery call to review your current tech stack, analytics baseline, and commercial growth targets with zero sales pressure.'
    },
    {
      q: 'Who will be my primary point of contact?',
      a: 'You communicate directly with your dedicated lead engineer and growth strategist via a shared Slack channel or WhatsApp group, with weekly asynchronous sprint updates.'
    }
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid business email address';
    }
    if (!formData.company.trim()) {
      errs.company = 'Please provide your company or organization name';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a brief outline of your goals (min 10 characters)';
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

      const res = await submitContact({
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
        source: 'Contact Form',
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        utmSource: urlParams?.get('utm_source') || undefined,
        utmMedium: urlParams?.get('utm_medium') || undefined,
        utmCampaign: urlParams?.get('utm_campaign') || undefined,
        utmContent: urlParams?.get('utm_content') || undefined,
        utmTerm: urlParams?.get('utm_term') || undefined
      });

      if (res.success && res.data?.inquiryId) {
        setInquiryRef(res.data.inquiryId);
        setIsSubmitted(true);
        apiTrackEvent('valid_submission', {
          form: 'Contact Page',
          service: formData.service,
          inquiryId: res.data.inquiryId
        });

        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#6D28D9', '#2563EB', '#06B6D4', '#FACC15']
          });
        } catch {
          // Fallback gracefully
        }
      } else {
        setErrors({ server: res.message || 'Submission failed. Please message us directly on WhatsApp.' });
      }
    } catch (err: any) {
      console.warn('[CONTACT] Submission issue:', err);
      setErrors({ server: err?.message || 'Network connectivity error. Your details are saved. Please retry or message on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white py-12 sm:py-16 space-y-16 overflow-hidden">
      <DecorativeBackground variant="dots" className="opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: Growth Delivery Architecture Visual */}
        <ScrollReveal direction="fade-up" delay={50}>
          <ContactVisual />
        </ScrollReveal>

        {/* Main Grid: Details + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Visual, and Official Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="slide-left" delay={100}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Strategy Access
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                  Let's Build Something That Moves Your Business Forward.
                </h1>

                <p className="text-base text-neutral-600 leading-relaxed">
                  Whether you're looking to dominate search rankings, automate manual workflows, scale paid media, or engineer a high-speed web platform, our team is ready to help.
                </p>
              </div>
            </ScrollReveal>

            {/* Generated Contact Section Visual */}
            <ScrollReveal direction="slide-left" delay={150}>
              <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2 group">
                <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                  <ImageWithFallback
                    src="/assets/contact-page-visual.webp"
                    alt="House Robotics direct growth strategy and client partnership consultation visual"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    zoomOnHover={false}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Direct Official Communication Channels */}
            <ScrollReveal direction="slide-left" delay={200}>
              <div className="space-y-3.5 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Direct Channels & Booking
                </h3>

                {/* WhatsApp Card */}
                <a
                  href={AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agency-card flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] hover:border-emerald-300 hover:bg-[#F3F0FF] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Official WhatsApp</div>
                    <div className="text-base font-extrabold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                      {AGENCY_INFO.whatsapp}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Quickest response for active project inquiries</div>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={AGENCY_INFO.emailUrl}
                  className="agency-card flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] hover:border-violet-300 hover:bg-[#F3F0FF] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Direct Email</div>
                    <div className="text-base font-extrabold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                      {AGENCY_INFO.email}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Proposals, RFPs, and strategic briefs</div>
                  </div>
                </a>

                {/* Direct Booking Card */}
                <div className="agency-card flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Live Video Session</div>
                    <div className="text-sm font-extrabold text-neutral-900">
                      30-Minute Growth Audit
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Free technical & funnel evaluation</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Office / Global Presence */}
            <ScrollReveal direction="slide-left" delay={300}>
              <div className="agency-card p-5 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                  <MapPin className="w-4 h-4 text-[#6D28D9]" />
                  <span>Global Headquarters & Hybrid Engineering</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Operating internationally across London, New York, and Sydney time zones. Digital-first delivery with dedicated local account leads.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="slide-right" delay={150}>
              <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] p-6 sm:p-10">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-neutral-900">
                      Thanks! Your enquiry has been received.
                    </h3>
                    {inquiryRef && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-[#6D28D9] border border-violet-200 text-xs font-mono font-bold">
                        <span>Ref: {inquiryRef}</span>
                      </div>
                    )}
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      We'll get back to you shortly with a personalized breakdown and scheduling options for our growth strategy session.
                    </p>
                    <div className="pt-4 flex justify-center gap-3">
                      <a
                        href={AGENCY_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-micro inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 btn-arrow" /> Message on WhatsApp ({AGENCY_INFO.whatsapp})
                      </a>
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

                    <div className="border-b border-[#E9E7F2] pb-3 mb-2">
                      <h3 className="text-xl font-bold text-neutral-900 font-['Space_Grotesk']">
                        Send Us Your Project Brief
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Fill out the details below to receive a custom proposal, technical audit, and growth timeline.
                      </p>
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
                        <input
                          type="text"
                          value={formData.websiteUrl}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Business Location <span className="text-neutral-400 font-normal">(City, State)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Austin, TX or USA"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 4: Service, Budget, and Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Primary Service *
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
                          <option value="One-Time Strategic Scope">One-Time Strategic Scope</option>
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

                    {/* Conditional Service Question */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        {getServiceQuestionLabel(formData.service)}
                      </label>
                      <input
                        type="text"
                        value={formData.serviceDetails}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
                        placeholder="Outline any key specifics, current platforms, or metrics..."
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Project Outline &amp; Growth Objectives *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you are aiming to achieve, current baseline numbers, and target timeline..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="consent-contact"
                        checked={formData.consentGiven}
                        onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#6D28D9] focus:ring-[#6D28D9]"
                      />
                      <label htmlFor="consent-contact" className="text-[11px] text-neutral-600 leading-tight">
                        I agree to receive a direct project review and communication from House Robotics regarding this enquiry. We respect your privacy and never sell or share contact information.
                      </label>
                    </div>
                    {errors.consent && <p className="text-[11px] text-red-500">{errors.consent}</p>}

                    <div className="pt-2">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-micro w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-md transition-shadow disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Send My Enquiry</span>
                            <Send className="w-4 h-4 btn-arrow" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <ScrollReveal direction="fade-up" delay={150}>
          <div className="border-t border-[#E9E7F2] pt-14 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk']">
                Everything You Need to Know Before Reaching Out
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="agency-card bg-white rounded-2xl border border-[#E9E7F2] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-bold text-neutral-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6D28D9] shrink-0 transition-transform duration-250 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: smoothEasing }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 bg-[#FAF9FF]/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
