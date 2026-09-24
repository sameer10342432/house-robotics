import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Search, 
  Cpu, 
  Code, 
  TrendingUp, 
  Layers, 
  HelpCircle,
  MapPin,
  Target,
  Share2,
  Zap,
  ShoppingBag,
  Laptop,
  BarChart2,
  Mail,
  Bot
} from 'lucide-react';
import { PageView } from '../types';
import { SERVICES_LIST, FAQS } from '../data/agencyData';
import { CTASection } from '../components/CTASection';
import { ServicesHeroVisual } from '../components/ServicesHeroVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { AnalyticsDashboardVisual, LeadGenDashboardVisual } from '../components/AnalyticsAndFunnelVisuals';
import { motion, AnimatePresence } from 'motion/react';
import { smoothEasing } from '../utils/animations';

interface ServicesOverviewPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

const getServiceIcon = (slug: string, category: string) => {
  if (slug.includes('seo') || slug.includes('search')) return Search;
  if (slug.includes('local') || slug.includes('map')) return MapPin;
  if (slug.includes('social') || slug.includes('media')) return Share2;
  if (slug.includes('ppc') || slug.includes('ad')) return Target;
  if (slug.includes('ai') || slug.includes('agent')) return Cpu;
  if (slug.includes('web') || slug.includes('code')) return Code;
  if (slug.includes('shopify') || slug.includes('commerce')) return ShoppingBag;
  if (slug.includes('mail')) return Mail;
  if (category === 'Technology') return Laptop;
  if (category === 'AI & Automation') return Bot;
  if (category === 'Growth') return BarChart2;
  return TrendingUp;
};

export const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({
  onNavigate,
  onOpenConsultation
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Marketing' | 'Technology' | 'AI & Automation' | 'Growth'>('All');

  const filteredServices = selectedFilter === 'All'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === selectedFilter);

  return (
    <div className="bg-white">
      {/* Hero Section with Dedicated ServicesHeroVisual */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] via-white to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" />
        <DecorativeBackground variant="gradient-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 mx-auto shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Comprehensive Agency Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk'] max-w-4xl mx-auto">
            Full-Spectrum Digital Marketing &amp; Technology Solutions
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We eliminate the gap between marketing strategy and technical execution. Explore our 22+ specialized service capabilities built to scale modern businesses.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onOpenConsultation()}
              className="btn-micro inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md"
            >
              <span>Schedule Strategy Consultation</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>
          </div>

          {/* Dedicated Hero Visual Console */}
          <ServicesHeroVisual />
        </div>
      </section>

      {/* Filter Tabs Sticky Bar */}
      <section className="py-6 border-b border-[#E9E7F2] bg-white sticky top-[69px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {['All', 'Marketing', 'Technology', 'AI & Automation', 'Growth'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === tab
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-[#FAF9FF] text-neutral-600 hover:text-neutral-900 border border-[#E9E7F2] hover:border-violet-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden sm:block text-xs text-neutral-400 font-mono">
            Showing {filteredServices.length} Specialized Practices
          </div>
        </div>
      </section>

      {/* Services Grid with Staggered Scroll Animation */}
      <section className="py-16 bg-[#FAF9FF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv, idx) => {
              const ServiceIcon = getServiceIcon(srv.slug, srv.category);
              return (
                <ScrollReveal
                  key={srv.id}
                  animation="fade-up"
                  delay={(idx % 3) * 70}
                >
                  <div
                    onClick={() => onNavigate(srv.slug as PageView)}
                    className="agency-card p-6 flex flex-col justify-between cursor-pointer group h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] text-[#6D28D9] border border-violet-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#EDE9FE] group-hover:border-[#C4B5FD] group-hover:text-[#5B21B6] group-hover:shadow-[0_4px_16px_rgba(109,40,217,0.15)] transition-all duration-300 shadow-xs card-icon">
                          <ServiceIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-neutral-800">
                          {srv.metrics.label}:{' '}
                          <strong className="text-[#6D28D9]">
                            <AnimatedCounter value={srv.metrics.value} />
                          </strong>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                        {srv.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                        {srv.fullDesc}
                      </p>

                      <div className="mt-5 pt-4 border-t border-neutral-100 space-y-1.5">
                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Key Deliverables:</div>
                        {srv.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                      <span>Explore Dedicated Practice</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Analytics & Funnel Blueprints Section */}
      <section className="py-20 bg-white border-t border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <BarChart2 className="w-3.5 h-3.5" /> Performance &amp; Attribution Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Live Attribution &amp; Lead Generation Dashboards
            </h2>
            <p className="text-base text-neutral-600">
              We replace guesswork with granular telemetry. Track your cost per acquisition, keyword rank momentum, and pipeline velocity in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-up" delay={50}>
              <AnalyticsDashboardVisual />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <LeadGenDashboardVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#FAF9FF] border-t border-[#E9E7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <HelpCircle className="w-3.5 h-3.5" /> Clarity &amp; Partnership
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Clear answers on how we collaborate, measure results, and scale client operations.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
                <div
                  className="rounded-2xl border border-[#E9E7F2] bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#6D28D9] transition-transform duration-250 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: smoothEasing }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FAF9FF]/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation()} />
    </div>
  );
};
