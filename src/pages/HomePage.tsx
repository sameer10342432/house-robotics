import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  Share2, 
  TrendingUp, 
  Cpu, 
  Code, 
  ShoppingBag, 
  Layers, 
  PieChart, 
  Mail, 
  FileText, 
  UserCheck,
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  ChevronRight,
  Star,
  ExternalLink,
  Zap,
  Globe2,
  Sliders,
  Target,
  BarChart3,
  Eye,
  Rocket,
  Award
} from 'lucide-react';
import { PageView, ServiceItem, CaseStudy, BlogPost } from '../types';
import { 
  SERVICES_LIST, 
  WHY_CHOOSE_ITEMS, 
  PROCESS_STEPS, 
  CASE_STUDIES, 
  TESTIMONIALS, 
  BLOG_POSTS, 
  AGENCY_INFO 
} from '../data/agencyData';
import { HeroVisual } from '../components/HeroVisual';
import { SEOVisual } from '../components/SEOVisual';
import { AIWorkflowVisual } from '../components/AIWorkflowVisual';
import { EcosystemVisual } from '../components/EcosystemVisual';
import { CaseStudyVisual } from '../components/CaseStudyVisual';
import { BlogCardVisual } from '../components/BlogCardVisual';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant, smoothEasing } from '../utils/animations';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
  onOpenBlog: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenBlog
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy>(CASE_STUDIES[0]);
  const [activeOutcomeFilter, setActiveOutcomeFilter] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'PieChart': return <PieChart className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const outcomes = [
    { id: 'all', label: 'All Outcomes' },
    { id: 'visibility', label: 'Search Visibility' },
    { id: 'leads', label: 'Qualified Leads' },
    { id: 'conversion', label: 'Higher Conversions' },
    { id: 'automation', label: 'Smart Automation' }
  ];

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (White / Very Light Lavender) */}
      <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 bg-gradient-to-b from-[#FAF9FF] via-white to-white overflow-hidden border-b border-[#E9E7F2]">
        <DecorativeBackground variant="grid" />
        <DecorativeBackground variant="gradient-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Staggered Animated Headline & Copy */}
            <motion.div
              variants={heroContainerVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-6 text-left"
            >
              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Full-Service Digital Marketing &amp; Technology Agency</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.08] font-['Space_Grotesk']">
                Smart Digital Solutions.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#2563EB]">
                  Powerful Business Growth.
                </span>
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl">
                House Robotics combines digital marketing, AI automation and technology to help ambitious businesses grow faster and smarter.
              </motion.p>

              {/* CTAs with Micro-Interactions */}
              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenConsultation()}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-[#FAF9FF] text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9]"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 btn-arrow" />
                </button>
              </motion.div>

              {/* Trust line below */}
              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span className="hover:text-[#6D28D9] transition-colors">SEO</span>
                  <span className="text-[#6D28D9]">·</span>
                  <span className="hover:text-[#6D28D9] transition-colors">AI Automation</span>
                  <span className="text-[#6D28D9]">·</span>
                  <span className="hover:text-[#6D28D9] transition-colors">Web Development</span>
                  <span className="text-[#6D28D9]">·</span>
                  <span className="hover:text-[#6D28D9] transition-colors">Digital Marketing</span>
                </div>

                {/* Real Client Avatar Proof Bar with Fallback Images */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-2 overflow-hidden">
                    <ImageWithFallback
                      src="/images/avatar-marcus.svg"
                      alt="Marcus Vance"
                      containerClassName="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      className="w-full h-full object-cover"
                    />
                    <ImageWithFallback
                      src="/images/avatar-sophia.svg"
                      alt="Dr. Sophia Bennett"
                      containerClassName="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      className="w-full h-full object-cover"
                    />
                    <ImageWithFallback
                      src="/images/avatar-david.svg"
                      alt="David Sterling"
                      containerClassName="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      className="w-full h-full object-cover"
                    />
                    <ImageWithFallback
                      src="/images/avatar-charlotte.svg"
                      alt="Charlotte Dubois"
                      containerClassName="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-neutral-600">
                    <strong className="text-neutral-900 font-bold">
                      <AnimatedCounter value="45+" /> Ambitious Brands
                    </strong> scaling organic &amp; paid pipelines
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Digital Growth Ecosystem Graphic with Smooth Scale-In */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: smoothEasing }}
              className="lg:col-span-6 w-full"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / VALUE STRIP */}
      <section className="py-8 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 shrink-0">
              Everything You Need to Grow Online
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
              {[
                { title: 'SEO', slug: 'seo', icon: Search },
                { title: 'Paid Advertising', slug: 'ppc', icon: TrendingUp },
                { title: 'Social Media', slug: 'social-media', icon: Share2 },
                { title: 'AI Automation', slug: 'ai-automation', icon: Cpu },
                { title: 'Web Development', slug: 'web-development', icon: Code },
                { title: 'E-commerce', slug: 'web-development', icon: ShoppingBag },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.title}
                    onClick={() => onNavigate(cat.slug as PageView)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] hover:bg-[#F3F0FF] hover:border-violet-300 transition-colors text-xs font-bold text-neutral-800"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span className="truncate">{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Premium Grid of 12 Services) */}
      <section className="py-20 bg-[#FAF9FF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Sparkles className="w-3 h-3" /> Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Digital Solutions Built for Growth
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              From search visibility to AI-powered automation, we build connected digital strategies designed around your business goals.
            </p>
          </div>

          {/* Services Overview Visual Showcase */}
          <ScrollReveal direction="fade-up" delay={100}>
            <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E7F2] shadow-[0_10px_35px_rgba(109,40,217,0.04)]">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                  <Sparkles className="w-3.5 h-3.5" /> Full-Spectrum Execution
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Integrated Capabilities Built to Scale Modern Businesses
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Every channel is tightly orchestrated — from technical search indexing and automated CRM lead capture to hyper-targeted advertising and sub-second React storefronts.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-600">
                  <span className="flex items-center gap-1.5 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 22+ Agency Capabilities</span>
                  <span className="flex items-center gap-1.5 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Channel Attribution</span>
                  <span className="flex items-center gap-1.5 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent SLA</span>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#E9E7F2] shadow-sm aspect-[16/10] bg-neutral-50 group">
                  <ImageWithFallback
                    src="/assets/home-services-overview.webp"
                    alt="House Robotics full-service digital marketing and technology capabilities overview"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    zoomOnHover={false}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Service Cards Grid with Staggered ScrollReveal & Animated Counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((srv, idx) => (
              <ScrollReveal
                key={srv.id}
                animation="fade-up"
                delay={(idx % 3) * 80}
              >
                <div
                  onClick={() => onNavigate(srv.slug as PageView)}
                  className="agency-card p-6 flex flex-col justify-between cursor-pointer group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-50 to-blue-50 text-[#6D28D9] flex items-center justify-center border border-[#E9E7F2] group-hover:from-violet-100 group-hover:to-blue-100 group-hover:border-[#C4B5FD] group-hover:text-[#5B21B6] group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(109,40,217,0.15)] transition-all duration-300 card-icon">
                        {getServiceIcon(srv.iconName)}
                      </div>
                      <span className="text-[11px] font-bold text-neutral-400 group-hover:text-[#6D28D9] flex items-center gap-1">
                        {srv.metrics.label}:{' '}
                        <strong className="text-neutral-900 group-hover:text-[#6D28D9]">
                          <AnimatedCounter value={srv.metrics.value} />
                        </strong>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-500">
                      {srv.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                    <span>Explore Service Architecture</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICE DEEP-DIVE 1: SEO & PERFORMANCE */}
      <section className="py-20 bg-white border-y border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: SEO Dashboard Visual & Results Performance Asset */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="slide-left" delay={150}>
                <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden bg-white p-2 group">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                    <ImageWithFallback
                      src="/assets/home-results-performance.webp"
                      alt="House Robotics organic search performance and measurable ranking results"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      zoomOnHover={false}
                    />
                  </div>
                </div>
              </ScrollReveal>
              <SEOVisual />
            </div>

            {/* Right: SEO Copy & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold">
                <Search className="w-3.5 h-3.5" /> High-Intent Search Architecture
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Turn Search Visibility Into Sustainable Growth
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Ranking at the top of Google isn't about guesswork. We engineer scientific search strategies that capture ready-to-buy prospects while compounding topical authority.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Technical SEO & Core Web Vitals', desc: 'Flawless site architecture, schema markup, and sub-second crawl speed.' },
                  { title: 'On-Page & Keyword Silos', desc: 'High-intent commercial terms mapped into structured semantic clusters.' },
                  { title: 'Authoritative Digital PR & Links', desc: 'White-hat contextual backlinks from tier-1 industry publications.' },
                  { title: 'Search Attribution & Revenue Tracking', desc: 'Direct visibility into which search queries drive actual closed pipeline.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2]">
                    <div className="w-6 h-6 rounded-lg bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{item.title}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('seo')}
                  className="btn-micro inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <span>Explore SEO Services</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SERVICE DEEP-DIVE 2: AI AUTOMATION */}
      <section className="py-20 bg-[#FAF9FF]/60 border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: AI Automation Copy */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                <Cpu className="w-3.5 h-3.5" /> Intelligent Automation Workflows
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Automate Repetitive Work. Focus on Growth.
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Connect your website, ads, CRM, and communication channels with custom autonomous AI pipelines that eliminate manual busywork and respond to leads in seconds.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Lead Qualification & Scoring', desc: 'AI agents qualify inbound inquiries 24/7 before booking sales reps.' },
                  { title: 'CRM & Pipeline Synchronization', desc: 'Automatic contact enrichment and deal stage triggers in HubSpot & Salesforce.' },
                  { title: 'Dynamic Personalized Email Sequences', desc: 'Context-aware messaging generated from lead industry and pain points.' },
                  { title: 'Customer Support Automation', desc: 'Autonomous resolution of standard client inquiries with instant human handoff.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E9E7F2]">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{item.title}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('ai-automation')}
                  className="btn-micro inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <span>Explore AI Automation</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>
              </div>
            </div>

            {/* Right: AI Automation Asset & AI Workflow Visual */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <ScrollReveal direction="slide-right" delay={150}>
                <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden bg-white p-2 group">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                    <ImageWithFallback
                      src="/assets/home-ai-automation.webp"
                      alt="House Robotics autonomous AI agents and intelligent workflow automation"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      zoomOnHover={false}
                    />
                  </div>
                </div>
              </ScrollReveal>
              <AIWorkflowVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 5B. MARKETING AUTOMATION SECTION */}
      <section className="py-20 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="fade-up" delay={50}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                  <Sparkles className="w-3.5 h-3.5" /> High-Velocity Marketing Automation
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk'] mt-3">
                  Seamless Lifecycle &amp; Conversion Automation
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mt-3">
                  Turn cold prospects into repeat buyers with automated multi-channel journeys. We integrate Klaviyo, HubSpot, and custom webhook triggers to deliver personalized messaging at the exact right moment.
                </p>
                <div className="space-y-3 pt-3">
                  {[
                    { title: 'Behavior-Triggered Lifecycle Sequences', desc: 'Engage leads based on browsing behavior, cart abandonment, and content downloads.' },
                    { title: 'Omnichannel Retargeting Triggers', desc: 'Sync customer journey stages across email, SMS, Meta Ads, and sales calendars.' },
                    { title: 'Predictive Churn & Win-Back Flows', desc: 'Identify at-risk accounts automatically and trigger high-converting incentive campaigns.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{item.title}</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('email-marketing' as PageView)}
                    className="btn-micro inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md"
                  >
                    <span>Explore Marketing Automation</span>
                    <ArrowRight className="w-4 h-4 btn-arrow" />
                  </button>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="slide-right" delay={150}>
                <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2 group">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                    <ImageWithFallback
                      src="/assets/home-marketing-automation.webp"
                      alt="House Robotics marketing automation and multi-channel lifecycle workflows"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      zoomOnHover={false}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY HOUSE ROBOTICS (Soft Lavender Background #F3F0FF) */}
      <section className="py-20 bg-[#F3F0FF] border-y border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-violet-200">
              <Sparkles className="w-3 h-3" /> The House Robotics Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Why Businesses Choose House Robotics
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              We operate as your dedicated engineering and growth partner, combining senior technical execution with uncompromising transparency.
            </p>
          </div>

          {/* Why Choose Us Visual Showcase */}
          <ScrollReveal direction="fade-up" delay={100}>
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-violet-100 shadow-[0_15px_40px_rgba(109,40,217,0.06)]">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden border border-[#E9E7F2] shadow-sm aspect-[16/10] bg-neutral-50 group">
                  <ImageWithFallback
                    src="/assets/home-why-choose-us.webp"
                    alt="Why high-growth businesses choose House Robotics partnership"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    zoomOnHover={false}
                  />
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Sparkles className="w-3.5 h-3.5" /> High-Performance Delivery
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Engineering Standards Meets Growth Marketing
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Unlike traditional agencies relying on generic templates, we engineer bespoke digital solutions that give you an unfair technological advantage in competitive search and customer acquisition.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#FAF9FF] rounded-xl border border-[#E9E7F2]">
                    <div className="text-lg font-black text-[#6D28D9] font-mono">+140%</div>
                    <div className="text-[11px] text-neutral-500 font-semibold">Average Organic Lift</div>
                  </div>
                  <div className="p-3 bg-[#FAF9FF] rounded-xl border border-[#E9E7F2]">
                    <div className="text-lg font-black text-[#6D28D9] font-mono">&lt;0.8s</div>
                    <div className="text-[11px] text-neutral-500 font-semibold">Web Load Speed</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 6 Cards with Dedicated Lucide Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const icons = [Target, Cpu, BarChart3, Eye, TrendingUp, Award];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={item.number}
                  className="bg-white p-7 rounded-3xl border border-[#E9E7F2] shadow-[0_10px_30px_rgba(109,40,217,0.05)] hover:shadow-[0_15px_40px_rgba(109,40,217,0.1)] transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] text-[#6D28D9] flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-neutral-300 font-mono">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-bold text-[#6D28D9] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Digital Growth Ecosystem Large Interactive Visual */}
          <div className="pt-4">
            <EcosystemVisual />
          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION: 5-Step Timeline with Unique Icons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Sparkles className="w-3 h-3" /> Structured Execution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              How We Turn Ideas Into Growth
            </h2>
            <p className="text-base text-neutral-600">
              A disciplined five-stage methodology engineered to eliminate bottlenecks and generate predictable results.
            </p>
          </div>

          {/* Process Workflow Visual Showcase */}
          <ScrollReveal direction="fade-up" delay={100}>
            <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9FF]/80 p-6 sm:p-8 rounded-3xl border border-[#E9E7F2]">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                  <Rocket className="w-3.5 h-3.5" /> Agile Sprint Execution
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  From Technical Discovery to Predictable Scale
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Our 5-stage framework removes guesswork through empirical discovery, structured roadmaps, bi-weekly deployment sprints, and continuous CRO feedback loops.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-600">
                  <span className="flex items-center gap-1 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bi-Weekly Sprints</span>
                  <span className="flex items-center gap-1 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent Kanban</span>
                  <span className="flex items-center gap-1 text-neutral-900"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Shared Slack Access</span>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#E9E7F2] shadow-sm aspect-[16/10] bg-white group">
                  <ImageWithFallback
                    src="/assets/home-process-workflow.webp"
                    alt="House Robotics 5-step agile process and growth delivery workflow"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    zoomOnHover={false}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Desktop Horizontal / Mobile Vertical Timeline with Animated Connecting Line */}
          <div className="relative">
            {/* Connecting line on desktop with continuous progressive flow animation */}
            <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-violet-200 via-blue-200 to-cyan-200 rounded-full -translate-y-12 z-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#6D28D9] via-[#2563EB] to-[#06B6D4] animate-process-flow opacity-80" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const stepIcons = [Search, Target, Code, Rocket, TrendingUp];
                const StepIcon = stepIcons[idx % stepIcons.length];
                return (
                  <ScrollReveal key={step.number} animation="fade-up" delay={idx * 100}>
                    <div
                      className="agency-card bg-white p-6 rounded-2xl border border-[#E9E7F2] shadow-xs hover:border-[#6D28D9] hover:bg-[#FAF9FF] transition-all text-left flex flex-col justify-between group h-full"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] text-[#6D28D9] flex items-center justify-center card-icon shadow-inner">
                            <StepIcon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                            {step.number}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-neutral-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                          {step.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 space-y-1">
                        {step.activities.map((act, i) => (
                          <div key={i} className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#6D28D9]" />
                            <span className="truncate">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CASE STUDIES SECTION */}
      <section className="py-20 bg-[#FAF9FF] border-t border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                <Sparkles className="w-3 h-3" /> Proven Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
                Case Studies & Measured Impact
              </h2>
              <p className="text-base text-neutral-600">
                Real business transformations driven by clean code, technical SEO, and automated pipeline engineering.
              </p>
            </div>

            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E9E7F2] text-xs font-bold text-neutral-800 hover:text-[#6D28D9] hover:border-violet-300 transition-colors shadow-xs w-max"
            >
              <span>Request Case Study Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Case Studies Visual Showcase */}
          <ScrollReveal direction="fade-up" delay={100}>
            <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E7F2] shadow-[0_10px_35px_rgba(109,40,217,0.04)]">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden border border-[#E9E7F2] shadow-sm aspect-[16/10] bg-neutral-50 group">
                  <ImageWithFallback
                    src="/assets/home-case-studies.webp"
                    alt="House Robotics client case studies and growth portfolio"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    zoomOnHover={false}
                  />
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Sparkles className="w-3.5 h-3.5" /> Documented Client ROI
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Transformative Results Across Competitive Verticals
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Explore how ambitious direct-to-consumer, B2B SaaS, and healthcare organizations achieved breakout organic visibility, sub-second web speed, and compounding revenue.
                </p>
                <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-neutral-600">
                  <div>
                    <span className="block text-xl font-extrabold text-[#6D28D9] font-mono">4.1x</span>
                    <span>Average ROAS</span>
                  </div>
                  <div className="w-px h-8 bg-neutral-200" />
                  <div>
                    <span className="block text-xl font-extrabold text-[#6D28D9] font-mono">+140%</span>
                    <span>Organic Pipeline</span>
                  </div>
                  <div className="w-px h-8 bg-neutral-200" />
                  <div>
                    <span className="block text-xl font-extrabold text-[#6D28D9] font-mono">99.8%</span>
                    <span>SLA Reliability</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Case Studies 3-Column Grid with Visual Mockups */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs, idx) => (
              <ScrollReveal key={cs.id} animation="fade-up" delay={idx * 120}>
                <div
                  className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_10px_35px_rgba(109,40,217,0.05)] overflow-hidden flex flex-col justify-between hover:border-violet-300 transition-all hover:-translate-y-1 h-full"
                >
                  {/* Visual Header Mockup */}
                  <div className="p-4 bg-[#FAF9FF]/50 border-b border-[#E9E7F2]">
                    <CaseStudyVisual studyId={cs.id} />
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Category and Service */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#6D28D9]">{cs.industry}</span>
                      <span className="text-neutral-400 font-medium">{cs.service}</span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 leading-snug">
                      {cs.title}
                    </h3>

                    {/* Challenge & Solution */}
                    <div className="space-y-3 text-xs leading-relaxed text-neutral-600 pt-2 border-t border-neutral-100">
                      <div>
                        <strong className="text-neutral-900 font-semibold block mb-0.5">The Challenge:</strong>
                        <p>{cs.challenge}</p>
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-semibold block mb-0.5">The Solution:</strong>
                        <p>{cs.solution}</p>
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-semibold block mb-0.5">The Result:</strong>
                        <p>{cs.outcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Footer */}
                  <div className="p-6 bg-[#FAF9FF] border-t border-[#E9E7F2] grid grid-cols-3 gap-2 text-center">
                    {cs.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-base sm:text-lg font-black text-[#6D28D9] font-mono">
                          <AnimatedCounter value={m.value} />
                        </div>
                        <div className="text-[10px] text-neutral-500 font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Clean White Background) */}
      <section className="py-20 bg-white border-t border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Sparkles className="w-3 h-3" /> Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              What Founders &amp; Growth Leaders Say
            </h2>
            <p className="text-base text-neutral-600">
              Direct testimonials from businesses scaling with House Robotics technology and marketing frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <ScrollReveal key={t.id} animation="fade-up" delay={idx * 100}>
                <div
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E7F2] shadow-xs flex flex-col justify-between hover:border-violet-300 transition-all hover:-translate-y-1 h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-sm text-neutral-700 leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                    {t.avatar ? (
                      <ImageWithFallback
                        src={t.avatar}
                        alt={t.name}
                        containerClassName="w-11 h-11 rounded-full shrink-0 border-2 border-violet-200"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900">{t.name}</h5>
                      <p className="text-[11px] text-neutral-500">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BLOG / INSIGHTS SECTION */}
      <section className="py-20 bg-[#FAF9FF] border-t border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                <Sparkles className="w-3 h-3" /> Editorial &amp; Research
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
                Insights for Smarter Digital Growth
              </h2>
              <p className="text-base text-neutral-600">
                Actionable analysis covering SEO trends, generative AI models, web architecture, and performance advertising.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E9E7F2] text-xs font-bold text-neutral-800 hover:text-[#6D28D9] transition-colors shadow-xs w-max"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_POSTS.map((post, idx) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={(idx % 4) * 80}>
                <div
                  onClick={() => onOpenBlog(post)}
                  className="agency-card bg-white rounded-3xl border border-[#E9E7F2] shadow-xs overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-[#6D28D9] h-full"
                >
                  <div className="p-3 bg-[#FAF9FF]/60 border-b border-[#E9E7F2] overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-103">
                      <BlogCardVisual category={post.category} title={post.title} image={post.image} />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2.5">
                        <span className="font-bold text-[#6D28D9]">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-neutral-500 mt-2 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION (Soft Lavender with Violet Gradient Shapes) */}
      <CTASection onOpenConsultation={() => onOpenConsultation()} />
    </div>
  );
};
