import React from 'react';
import { Search, ArrowRight, TrendingUp, CheckCircle2, Globe, Shield, Sparkles, Layers, FileText, BarChart3, Database, ChevronRight } from 'lucide-react';
import { SEOVisual } from '../components/SEOVisual';
import { 
  TechnicalSeoVisual, 
  OnPageSeoVisual, 
  KeywordResearchVisual, 
  LinkBuildingVisual 
} from '../components/SeoVisualSections';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { PageView } from '../types';

import { ImageWithFallback } from '../components/ImageWithFallback';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface SeoPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onNavigate, onOpenConsultation }) => {
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
                <span className="text-[#6D28D9]">Search Engine Optimization</span>
              </div>

              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Search className="w-3.5 h-3.5 animate-pulse" />
                <span>High-Intent Search Visibility</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                SEO That Turns Search Visibility Into Business Growth
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                We combine deep technical audits, topical authority clustering, and enterprise link building to establish permanent dominance across competitive search queries.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => onOpenConsultation('SEO')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Get a Free SEO Consultation</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] hover:bg-[#FAF9FF]"
                >
                  <span>Request Full Audit</span>
                </button>
              </motion.div>

              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <span>Technical Audits</span>
                <span>·</span>
                <span>Topical Maps</span>
                <span>·</span>
                <span>Authoritative Backlinks</span>
                <span>·</span>
                <span>Revenue Attribution</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2 group">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                    <ImageWithFallback
                      src="/assets/seo-page-hero.webp"
                      alt="SEO analytics and search optimization visual"
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

      {/* Alternating Deep-Dive Visual Sections */}
      <section className="py-20 bg-white space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Section 1: Technical SEO (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold">
                  <Shield className="w-3.5 h-3.5" /> Pillar 01
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Technical SEO Infrastructure &amp; Sub-Second Speed
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Search engine bots punish slow, poorly structured sites. We eliminate crawl budget bottlenecks, fix 404 redirects, and engineer perfect 100/100 Core Web Vitals to guarantee search spiders index your content instantly.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Schema.org JSON-LD rich snippet structure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero render-blocking scripts &amp; next-gen asset compression</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Log-file crawl budget verification</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <TechnicalSeoVisual />
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: On-Page & Semantic Silos (Visual Left / Text Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <OnPageSeoVisual />
              </div>
              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#2563EB] text-xs font-bold border border-blue-100">
                  <Layers className="w-3.5 h-3.5" /> Pillar 02
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Topical Silos &amp; Semantic Optimization
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Modern search algorithms rank entity depth, not keyword density. We build interconnected topic clusters that establish unquestioned authority around your primary commercial offerings.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Internal link flow directing equity to high-intent pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Natural entity relationship mapping based on NLP analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Optimized meta titles and click-through-rate hooks</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3: Semantic Keyword Research (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold">
                  <Search className="w-3.5 h-3.5" /> Pillar 03
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Commercial Intent Keyword Matrix
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  We ignore vanity keywords that drive irrelevant clicks. Instead, our targeting focuses strictly on high-intent commercial and transactional queries where prospective clients are actively seeking solutions.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>High CPC valuation queries with strong commercial viability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Competitor keyword gap analysis and untapped search demand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Long-tail buyer intent questions answered authoritatively</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <KeywordResearchVisual />
              </div>
            </div>
          </ScrollReveal>

          {/* Section 4: Authoritative Digital PR & Links (Visual Left / Text Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <LinkBuildingVisual />
              </div>
              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-100">
                  <Globe className="w-3.5 h-3.5" /> Pillar 04
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  High-Impact Editorial Backlinks &amp; Digital PR
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Zero spam. Zero private blog networks. We acquire contextual editorial placements in recognized industry publications and news outlets that transfer genuine trust, domain rating, and referral traffic.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Average Domain Rating (DR) 75+ editorial placements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% white-hat manual outreach and PR syndication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Permanent contextual backlinks with zero recurring rental fees</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SEO Workflow Process */}
      <section className="py-20 bg-[#FAF9FF] border-y border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Our 90-Day Compounding SEO Sprint
            </h2>
            <p className="text-base text-neutral-600">
              How we systematically diagnose, execute, and scale your organic search footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="agency-card p-7 space-y-3 h-full text-left">
                <span className="text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider">Days 1–30</span>
                <h3 className="text-xl font-bold text-neutral-900">Phase 1: Remediation &amp; Architecture</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Full technical crawl, 404 cleanup, Core Web Vitals optimization, and keyword mapping across all priority commercial URLs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div className="agency-card p-7 space-y-3 h-full text-left">
                <span className="text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider">Days 31–60</span>
                <h3 className="text-xl font-bold text-neutral-900">Phase 2: Content Silos &amp; Expansion</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Deploying deep pillar articles, commercial comparison landing pages, schema markup, and internal linking structures.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="agency-card p-7 space-y-3 h-full text-left">
                <span className="text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider">Days 61–90+</span>
                <h3 className="text-xl font-bold text-neutral-900">Phase 3: Digital PR &amp; Link Scaling</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Contextual outreach, editorial PR mentions, rank momentum compounding, and revenue conversion optimization.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Client Prerequisites & Measurement Section */}
      <section className="py-20 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What Customer Provides */}
            <ScrollReveal animation="fade-up">
              <div className="bg-[#FAF9FF] rounded-3xl p-8 border border-[#E9E7F2] space-y-5 text-left h-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/70 text-[#6D28D9] text-xs font-bold">
                  <Database className="w-3.5 h-3.5" /> Client Onboarding Checklist
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                  What You Need to Provide to Start
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  We maintain a seamless, frictionless onboarding process. To kick off the technical audit and roadmap, we only require:
                </p>
                <ul className="space-y-3 text-xs sm:text-sm font-semibold text-neutral-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                    <span><strong>Google Search Console &amp; Analytics Access:</strong> Viewer or standard delegate access to analyze crawl trends and baseline traffic.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                    <span><strong>CMS or Repository Access:</strong> Staging / production CMS editor rights (or GitHub repo for custom React / Next.js builds).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                    <span><strong>High-Margin Commercial Focus:</strong> A 30-minute discovery call defining your highest-value customer personas and target geographic markets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                    <span><strong>Brand Voice &amp; Asset Guidelines:</strong> Logos, media, and core technical positioning documents to maintain editorial authority.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* How Success is Measured */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="bg-white rounded-3xl p-8 border border-[#E9E7F2] shadow-xs space-y-5 text-left h-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <BarChart3 className="w-3.5 h-3.5" /> Accountability Framework
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                  How We Measure SEO Performance
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  We don't report on vanity metrics like impressions for irrelevant terms. Our performance dashboard tracks commercial business impact:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                    <div className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">Metric 01</div>
                    <div className="text-sm font-extrabold text-neutral-900">Commercial Inquiries</div>
                    <p className="text-[11px] text-neutral-500">Qualified form submissions, phone calls, and demo requests from organic search.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                    <div className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">Metric 02</div>
                    <div className="text-sm font-extrabold text-neutral-900">Non-Brand High Intent</div>
                    <p className="text-[11px] text-neutral-500">Top 3 and Top 10 rankings on high-CPC transactional keywords.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                    <div className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">Metric 03</div>
                    <div className="text-sm font-extrabold text-neutral-900">Core Web Vitals Pass</div>
                    <p className="text-[11px] text-neutral-500">Sub-second TTFB, 95+ mobile performance score, and zero layout shift.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                    <div className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">Metric 04</div>
                    <div className="text-sm font-extrabold text-neutral-900">Domain Rating &amp; PR</div>
                    <p className="text-[11px] text-neutral-500">Clean, natural backlink acquisition from authoritative industry publications.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEO FAQs */}
      <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] tracking-tight">
              Frequently Asked Questions About Our SEO Services
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Honest, transparent answers about timelines, guarantees, deliverables, and remote collaboration.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to see tangible organic search results?',
                a: 'Most commercial campaigns begin showing measurable leading indicators (increased crawl frequency, indexation of new landing pages, and keyword impression momentum) within 30 to 60 days. Compounding traffic growth and significant lead acceleration typically occur between months 3 and 6 as topical authority is recognized by Google.'
              },
              {
                q: 'Do you offer first-page Google ranking guarantees?',
                a: 'No ethical SEO agency guarantees specific search engine rankings, because search engine algorithms evaluate hundreds of dynamic variables and third-party competitors. What House Robotics guarantees is 100% adherence to Google Search Essentials, clean white-hat architectures, verified technical Core Web Vitals remediation, and high-intent commercial keyword targeting.'
              },
              {
                q: 'How does House Robotics collaborate remotely with US-based clients?',
                a: 'We operate with full transparency and direct founder access. We maintain active daily communication during US business hours (Eastern, Central, Mountain, and Pacific windows) via dedicated WhatsApp (+92 347 4542881) and Slack channels, combined with bi-weekly Zoom sprint reviews and shared analytics dashboards.'
              },
              {
                q: 'What is the difference between Local SEO and National SEO?',
                a: 'Local SEO focuses on capturing proximity-based searches and ranking in Google Maps 3-Pack for regional queries (e.g., "Austin software consultants" or "Miami medical equipment"). National SEO focuses on dominating organic search for broad, competitive commercial keywords across all 50 states without geographical restriction.'
              },
              {
                q: 'What platforms and content management systems do you support?',
                a: 'We support modern JavaScript architectures (React, Next.js, Vite), bespoke WordPress, Shopify, Shopify Plus, Webflow, and custom PHP platforms. We write production code and directly remediate technical bottlenecks rather than just handing you an abstract PDF audit.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-2">
                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 text-[#6D28D9] text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Capabilities & USA Regional Expansion */}
      <section className="py-16 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                Explore Synergistic Digital Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Maximize the ROI of your organic traffic with high-speed web engineering and AI automation.
              </p>
            </div>
            <button
              onClick={() => onNavigate('usa')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            >
              <span>Browse All 50 US State Hubs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigate('web-dev')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-[#6D28D9]">Engineering</div>
              <h4 className="text-base font-bold text-neutral-900">Custom Web Development</h4>
              <p className="text-xs text-neutral-600">Sub-second React &amp; Next.js platforms built to convert organic traffic.</p>
            </div>

            <div 
              onClick={() => onNavigate('local-seo')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-blue-600">Proximity</div>
              <h4 className="text-base font-bold text-neutral-900">Local SEO &amp; Maps</h4>
              <p className="text-xs text-neutral-600">Capture nearby ready-to-buy customers in Google Maps 3-Pack.</p>
            </div>

            <div 
              onClick={() => onNavigate('ppc')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-amber-600">Paid Media</div>
              <h4 className="text-base font-bold text-neutral-900">PPC &amp; Google Ads</h4>
              <p className="text-xs text-neutral-600">Capture immediate commercial search demand while SEO compounds.</p>
            </div>

            <div 
              onClick={() => onNavigate('ai-automation')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-purple-600">Workflows</div>
              <h4 className="text-base font-bold text-neutral-900">AI Automation Systems</h4>
              <p className="text-xs text-neutral-600">Automate inbound lead qualification and CRM pipeline routing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('SEO')} />
    </div>
  );
};

