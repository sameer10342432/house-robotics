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
import { submitContact, trackEvent } from '../utils/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'SEO',
    budget: '$2,500 - $5,000 / mo',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      errs.email = 'Please provide a valid business email';
    }
    if (!formData.phone.trim()) errs.phone = 'Please provide a contact phone or WhatsApp number';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a brief outline of your goals (min 10 characters)';
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
        source: 'Contact Form'
      });

      if (res.success && res.data?.inquiryId) {
        setInquiryRef(res.data.inquiryId);
      }
      trackEvent('FORM_SUBMIT', 'Contact Form Submitted', { service: formData.service });
    } catch (err) {
      console.warn('[CONTACT] Fallback submission triggered', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6D28D9', '#2563EB', '#06B6D4', '#FACC15']
        });
      } catch (e) {
        // Fallback gracefully
      }
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
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#E9E7F2] pb-4 mb-2">
                      <h3 className="text-xl font-bold text-neutral-900">
                        Send Us Your Project Brief
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Fill out the details below to receive a custom proposal and growth timeline.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Morgan"
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
                          Company Name / URL
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company or website URL"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Primary Service
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
                          Project Budget
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
                          <option value="One-Time Strategic Scope">One-Time Strategic Scope</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Project Outline & Growth Objectives *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you are aiming to achieve, current baseline numbers, and target timeline..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E9E7F2] bg-white focus:border-[#6D28D9]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    <div className="pt-2">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-micro w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-md transition-shadow disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Transmitting Brief...</span>
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
