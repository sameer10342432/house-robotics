import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Cpu,
  Target
} from 'lucide-react';
import { PageView } from '../types';
import { SERVICES_LIST, AGENCY_INFO } from '../data/agencyData';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CTASection } from '../components/CTASection';

interface ServiceDetailPageProps {
  serviceSlug: string;
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

// Map each service slug to its exact generated asset filename and alt text
const SERVICE_HERO_ASSETS: Record<string, { image: string; alt: string; badge: string }> = {
  'wordpress': {
    image: '/assets/wordpress-page-hero.webp',
    alt: 'WordPress development and CMS engineering visual',
    badge: 'Enterprise CMS Engineering'
  },
  'shopify': {
    image: '/assets/shopify-page-hero.webp',
    alt: 'Shopify e-commerce development visual',
    badge: 'High-Conversion Storefronts'
  },
  'ecommerce': {
    image: '/assets/ecommerce-page-hero.webp',
    alt: 'E-commerce architecture and store design visual',
    badge: 'Retail Commerce Engineering'
  },
  'email-marketing': {
    image: '/assets/email-marketing-page-hero.webp',
    alt: 'Email marketing automation and lifecycle visual',
    badge: 'Lifecycle & Retention Automation'
  },
  'content-marketing': {
    image: '/assets/content-marketing-page-hero.webp',
    alt: 'Content marketing strategy and publication visual',
    badge: 'Topical Authority Architecture'
  },
  'cro': {
    image: '/assets/cro-page-hero.webp',
    alt: 'Conversion rate optimization and funnel visual',
    badge: 'Scientific Conversion Optimization'
  },
  'lead-generation': {
    image: '/assets/lead-generation-page-hero.webp',
    alt: 'B2B lead generation and pipeline visual',
    badge: 'High-Intent Pipeline Acceleration'
  },
  'analytics': {
    image: '/assets/analytics-page-hero.webp',
    alt: 'Analytics and performance reporting dashboard visual',
    badge: 'Unified Attribution Intelligence'
  },
  'branding': {
    image: '/assets/branding-page-hero.webp',
    alt: 'Brand identity and graphic design visual',
    badge: 'Strategic Brand Identity'
  },
  'video-marketing': {
    image: '/assets/video-marketing-page-hero.webp',
    alt: 'Video marketing and creative production visual',
    badge: 'High-Impact Creative Production'
  },
  'online-reputation': {
    image: '/assets/online-reputation-page-hero.webp',
    alt: 'Online reputation management and reviews visual',
    badge: 'Authority & Sentiment Protection'
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceSlug,
  onNavigate,
  onOpenConsultation
}) => {
  // Find matching service item or fallback to first
  const service = SERVICES_LIST.find(s => s.slug === serviceSlug || s.id === serviceSlug) || {
    id: serviceSlug,
    title: serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: serviceSlug,
    category: 'Marketing' as const,
    shortDesc: 'Drive measurable business outcomes through specialized strategy and technical execution.',
    fullDesc: 'Custom growth architecture engineered to scale your pipeline, increase conversions, and compound digital authority.',
    iconName: 'Sparkles',
    deliverables: [
      'Comprehensive Technical Discovery & Baseline Audit',
      'Custom Strategic Execution Roadmap',
      'Full Multi-Channel Implementation',
      'Ongoing Sprint Optimization & SLA Support',
      'Weekly Transparent KPI Reporting & Attribution'
    ],
    metrics: { label: 'Performance Benchmark', value: '+85%' },
    gradient: 'from-violet-600 to-blue-600'
  };

  const assetInfo = SERVICE_HERO_ASSETS[serviceSlug] || {
    image: `/assets/${serviceSlug}-page-hero.webp`,
    alt: `${service.title} visual representation`,
    badge: service.category
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] via-white to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" className="opacity-60" />
        <DecorativeBackground variant="gradient-mesh" className="opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text & CTA (50-60%) */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="fade-up" delay={50}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{assetInfo.badge}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={150}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                  {service.title}
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={250}>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                  {service.fullDesc || service.shortDesc}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={350}>
                <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                  <button
                    onClick={() => onOpenConsultation(service.title)}
                    className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.25)] transition-all hover:-translate-y-0.5"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4 btn-arrow" />
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] transition-all hover:bg-[#FAF9FF]"
                  >
                    <span>Request Strategic Brief</span>
                  </button>
                </div>
              </ScrollReveal>

              {/* Metric bar */}
              <ScrollReveal direction="fade-up" delay={450}>
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-6 text-xs text-neutral-500 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-[#6D28D9] font-mono">
                      <AnimatedCounter value={service.metrics?.value || '+120%'} />
                    </span>
                    <span>{service.metrics?.label || 'Target Impact'}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Technical Lead</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Generated Visual Asset (40-50%) */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative group">
                  {/* Floating Pill - Top Left */}
                  <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
                    <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Engineered Growth</div>
                      <div className="text-xs font-bold text-neutral-900">{service.metrics?.value || 'High Impact'} Performance</div>
                    </div>
                  </div>

                  {/* Floating Pill - Bottom Right */}
                  <div className="absolute -bottom-5 -right-3 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Execution Model</div>
                      <div className="text-xs font-bold text-neutral-900">Dedicated Technical Lead</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                      <ImageWithFallback
                        src={assetInfo.image}
                        alt={assetInfo.alt}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        zoomOnHover={false}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Strategic Architecture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] text-xs font-bold border border-violet-100">
              <CheckCircle2 className="w-3.5 h-3.5" /> What We Deliver
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Space_Grotesk']">
              Engineered Execution &amp; Core Deliverables
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Every engagement includes senior technical management, transparent sprints, and end-to-end delivery with zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((item, idx) => (
              <ScrollReveal key={idx} direction="fade-up" delay={idx * 80}>
                <div className="agency-card p-6 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold text-sm mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-2">{item}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Rigorous quality checks, continuous optimization, and measurable key performance metrics tracked in real-time.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-bold text-[#6D28D9] flex items-center gap-1">
                    <span>Verified Agency Standard</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation(service.title)} />
    </div>
  );
};
