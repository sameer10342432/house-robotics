import React from 'react';
import { Target, ArrowRight, DollarSign, TrendingUp, Filter, CheckCircle2, Shield, Sparkles, BarChart2, MousePointerClick, RefreshCw, ChevronRight } from 'lucide-react';
import { PpcVisual } from '../components/PpcVisual';
import { GoogleSearchAdVisual, MetaRetargetingVisual, PpcDashboardVisual } from '../components/PpcVisualComponents';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageView } from '../types';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface PpcPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const PpcPage: React.FC<PpcPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] via-white to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" />
        <DecorativeBackground variant="gradient-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              variants={heroContainerVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Visual Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-2">
                <span onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span onClick={() => onNavigate('services')} className="hover:text-neutral-900 cursor-pointer">Services</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[#6D28D9]">PPC & Paid Advertising</span>
              </div>

              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Target className="w-3.5 h-3.5 animate-pulse" />
                <span>Performance Paid Media</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Paid Advertising Built Around Performance
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                Eliminate ad spend waste. We construct tightly-themed Google Search, Shopping, and Meta ad funnels backed by laser-accurate negative keyword pruning, target CPA bidding, and dedicated landing page split tests.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => onOpenConsultation('PPC & Paid Ads')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Get Free PPC Account Audit</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] hover:bg-[#FAF9FF]"
                >
                  <span>Schedule Strategy Call</span>
                </button>
              </motion.div>

              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <span>Google Search</span>
                <span>·</span>
                <span>Google Shopping</span>
                <span>·</span>
                <span>Meta Ads</span>
                <span>·</span>
                <span>Target ROAS Bidding</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative group">
                  {/* Floating Pill - Top Left */}
                  <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Blended ROAS</div>
                      <div className="text-xs font-bold text-neutral-900">4.8x Return on Spend</div>
                    </div>
                  </div>

                  {/* Floating Pill - Bottom Right */}
                  <div className="absolute -bottom-5 -right-3 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Cost-Per-Acquisition</div>
                      <div className="text-xs font-bold text-neutral-900">-34% Lower CPA</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                      <ImageWithFallback
                        src="/assets/ppc-google-ads-page-hero.webp"
                        alt="High-performance PPC and Google Ads campaign management visual"
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

      {/* Interactive PPC Command Hub */}
      <section className="py-12 bg-[#FAF9FF]/60 border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <PpcVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating Visual Deep Dives */}
      <section className="py-20 bg-white space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Section 1: Search Ads Precision (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <MousePointerClick className="w-3.5 h-3.5" /> High-Intent Search
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Capture Ready-to-Buy Search Intent at Peak Position
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  We engineer single-intent ad groups, extensive negative keyword guardrails, and dynamic ad copy variations that earn 10/10 Google Quality Scores—lowering your cost-per-click while monopolizing the top of Google.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Exact &amp; phrase match sculpting with zero generic query leakage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dynamic sitelink extensions, callouts, and structured snippets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bid adjustment modifiers for high-converting geo-regions</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <GoogleSearchAdVisual />
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: Meta Audience Retargeting (Visual Left / Text Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <MetaRetargetingVisual />
              </div>
              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <RefreshCw className="w-3.5 h-3.5" /> Multi-Touch Retargeting
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Re-Engage High-Intent Visitors Across Feed &amp; Stories
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  96% of website visitors leave without buying on their first session. We architect sequential retargeting campaigns with dynamic product carousels, client video testimonials, and urgent objection-handling offers that recover lost pipeline.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Server-side Conversions API (CAPI) bypasses browser ad-blockers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Lookalike audience modeling seeded from your highest-LTV buyers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automated creative fatigue rotation preventing audience burn</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3: Live Account Health & Telemetry (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <BarChart2 className="w-3.5 h-3.5" /> Granular Attribution
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Transparent Revenue Attribution Dashboards
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  No black-box agency reporting. You get real-time access to clear performance telemetry showing exactly how much revenue each campaign, ad set, and search term generates.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Live blended ROAS, CAC, and lead volume scorecards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Weekly negative keyword pruning logs shared transparently</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct integration with your CRM for closed-won deal tracing</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <PpcDashboardVisual />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('PPC & Paid Ads')} />
    </div>
  );
};
