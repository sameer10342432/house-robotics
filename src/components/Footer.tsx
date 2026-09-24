import React, { useState } from 'react';
import { PageView } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { MessageSquare, Mail, ArrowUpRight, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { submitNewsletter, trackEvent } from '../utils/api';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMsg('Please enter a valid business email.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const res = await submitNewsletter(newsletterEmail);
      if (res.success) {
        setNewsletterStatus('success');
        setNewsletterMsg('Thank you for subscribing to House Robotics research updates.');
        setNewsletterEmail('');
        trackEvent('NEWSLETTER_SUBMIT', 'Newsletter Subscribed', { email: newsletterEmail });
      } else {
        setNewsletterStatus('error');
        setNewsletterMsg(res.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setNewsletterStatus('success');
      setNewsletterMsg('Thank you for subscribing to House Robotics research updates.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#F8F7FF] border-t border-[#E9E7F2] text-neutral-800 pt-16 pb-12">
      <ScrollReveal animation="fade-up" threshold={0.08}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Subscription Banner */}
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#6D28D9]/10 via-[#2563EB]/10 to-transparent border border-[#E9E7F2] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Growth Intelligence
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                Subscribe to Executive Growth Briefs
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-lg">
                Bi-weekly playbooks on generative AI workflows, Core Web Vitals, and conversion rate engineering. Zero spam.
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[320px]">
              {newsletterStatus === 'success' ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{newsletterMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus === 'error') setNewsletterStatus('idle');
                      }}
                      placeholder="Enter your corporate email..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E9E7F2] bg-white text-xs text-neutral-900 focus:border-[#6D28D9] focus:outline-none shadow-xs"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === 'loading'}
                      className="btn-micro px-5 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-md disabled:opacity-50"
                    >
                      <span>{newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {newsletterStatus === 'error' && (
                    <p className="text-[11px] text-red-500 font-medium pl-1">{newsletterMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#E9E7F2]">
            {/* Brand Col (2 cols wide on desktop) */}
            <div className="lg:col-span-2 space-y-4">
              <button
                onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2.5 text-left focus:outline-none group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#2563EB] flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <span className="font-extrabold text-base tracking-tighter">H</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-neutral-950 font-['Space_Grotesk']">
                  House<span className="text-[#6D28D9]">Robotics</span>
                </span>
              </button>

              <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
                Full-service digital marketing and technology agency. We combine technical SEO, custom web engineering, AI automation workflows, and high-ROI advertising to help ambitious businesses scale faster.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-micro inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all w-max"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: {AGENCY_INFO.whatsapp}</span>
                </a>

                <a
                  href={AGENCY_INFO.emailUrl}
                  className="btn-micro inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 text-xs font-bold border border-violet-200 transition-all w-max"
                >
                  <Mail className="w-4 h-4 text-[#6D28D9]" />
                  <span>{AGENCY_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Core Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Services & Practice
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 font-medium">
                <li>
                  <button onClick={() => onNavigate('seo')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Search Engine Optimization (SEO)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('local-seo')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Local SEO & Google Maps
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('social-media')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Social Media Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ppc')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    PPC & Google Ads
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ai-automation')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    AI & Workflow Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('web-development')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Custom Web Development
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('shopify')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Shopify & E-commerce
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('wordpress')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    WordPress Engineering
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 font-medium">
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    About House Robotics
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('home')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Our 5-Step Process
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('blog')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Insights & Strategy Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-[#6D28D9] transition-all hover:translate-x-0.5">
                    Direct Contact Desk
                  </button>
                </li>
                <li>
                  <button onClick={onOpenConsultation} className="text-[#6D28D9] font-bold hover:underline transition-all">
                    Free Growth Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Direct Contact
              </h4>
              <div className="space-y-3 text-xs text-neutral-600">
                <div>
                  <span className="block text-[11px] text-neutral-400 font-bold uppercase">Official WhatsApp</span>
                  <a href={AGENCY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-900 hover:text-emerald-700 transition-colors">
                    {AGENCY_INFO.whatsapp}
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] text-neutral-400 font-bold uppercase">Direct Email</span>
                  <a href={AGENCY_INFO.emailUrl} className="font-bold text-neutral-900 hover:text-[#6D28D9] transition-colors">
                    {AGENCY_INFO.email}
                  </a>
                </div>
                <div className="pt-2">
                  <div className="p-3 bg-white rounded-xl border border-[#E9E7F2] text-[11px] text-neutral-600 flex items-center gap-2 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Agency Inquiries Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sub-Footer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <p>© {new Date().getFullYear()} House Robotics. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-neutral-900 cursor-pointer transition-colors">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-neutral-900 cursor-pointer transition-colors">Terms & Conditions</span>
              <span>·</span>
              <button 
                onClick={() => onNavigate('admin')}
                className="hover:text-[#6D28D9] cursor-pointer transition-colors font-semibold"
              >
                Admin CMS
              </button>
              <span>·</span>
              <span className="text-neutral-400">Digital Marketing & Technology</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
