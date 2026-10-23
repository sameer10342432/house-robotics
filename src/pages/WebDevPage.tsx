import React from 'react';
import { Code, ArrowRight, Laptop, ShoppingBag, Layers, Zap, Shield, Sparkles, CheckCircle2, Gauge, Smartphone, GitBranch, ChevronRight, Database, Search, Bot, BarChart3 } from 'lucide-react';
import { BrowserMockupVisual } from '../components/BrowserMockupVisual';
import { SpeedOptimizationVisual, CodeArchitectureVisual, EcommerceProductVisual } from '../components/WebDevVisualSections';
import { CTASection } from '../components/CTASection';
import { PageView } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface WebDevPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const WebDevPage: React.FC<WebDevPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" className="opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              {/* Visual Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-2">
                <span onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span onClick={() => onNavigate('services')} className="hover:text-neutral-900 cursor-pointer">Services</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[#6D28D9]">Web Development</span>
              </div>

              <ScrollReveal direction="fade-up" delay={50}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Code className="w-3.5 h-3.5" /> High-Performance Full-Stack Engineering
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={150}>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                  Websites Built to Perform, Convert and Scale
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={250}>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  We engineer modern web experiences in React, Next.js, bespoke Shopify, and optimized WordPress. Fast loading, mobile-first, airtight security, and architected specifically to maximize your conversion rate.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={350}>
                <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                  <button
                    onClick={() => onOpenConsultation('Custom Website Development')}
                    className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <span>Start Your Web Project</span>
                    <ArrowRight className="w-4 h-4 btn-arrow" />
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] transition-all hover:bg-[#FAF9FF]"
                  >
                    <span>Request Code & Speed Audit</span>
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade-up" delay={450}>
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                  <span>Custom React Apps</span>
                  <span>·</span>
                  <span>Bespoke Shopify</span>
                  <span>·</span>
                  <span>Clean WordPress</span>
                  <span>·</span>
                  <span>Sub-Second Speed</span>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative group">
                  {/* Floating Pill - Top Left */}
                  <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
                    <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
                      <Gauge className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Lighthouse Score</div>
                      <div className="text-xs font-bold text-neutral-900">99+ Performance</div>
                    </div>
                  </div>

                  {/* Floating Pill - Bottom Right */}
                  <div className="absolute -bottom-5 -right-3 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Code className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Stack Architecture</div>
                      <div className="text-xs font-bold text-neutral-900">React + Next.js + TS</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                      <ImageWithFallback
                        src="/assets/web-development-page-hero.webp"
                        alt="High performance web development and software architecture visual"
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

      {/* Interactive Browser & App Framework Explorer */}
      <section className="py-12 bg-[#FAF9FF]/60 border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <BrowserMockupVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating Visual Deep Dives */}
      <section className="py-20 bg-white space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Section 1: Clean Code Architecture (Text Left / Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <ScrollReveal direction="slide-left" delay={100}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Code className="w-3.5 h-3.5" /> Clean Code Principles
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight mt-3">
                  Modular React & Component-Driven Architecture
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base mt-3">
                  No bloated page-builder templates or spaghetti jQuery scripts. We develop modular, type-safe frontend components that render instantaneously, look stunning across all viewports, and are effortlessly maintainable.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Strict TypeScript typing with automated ESLint validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Micro-interactions with hardware-accelerated CSS/motion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero runtime dependencies for lightning-fast bundles</span>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6">
              <ScrollReveal direction="slide-right" delay={200}>
                <CodeArchitectureVisual />
              </ScrollReveal>
            </div>
          </div>

          {/* Section 2: High-Converting E-commerce (Visual Left / Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ScrollReveal direction="slide-left" delay={200}>
                <EcommerceProductVisual />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <ScrollReveal direction="slide-right" delay={100}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                  <ShoppingBag className="w-3.5 h-3.5" /> Conversion Engineering
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight mt-3">
                  Shopify & E-Commerce Built for Higher Average Order Value
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base mt-3">
                  We design frictionless checkout experiences, 1-click bundle upsells, sticky add-to-cart triggers, and razor-sharp product detail pages that turn casual window-shoppers into paying repeat customers.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1-click upsells and post-purchase customer retention funnels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Integrated multi-currency and localized payment gateways</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Shopify Liquid & Storefront API headless compatibility</span>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
          </div>

          {/* Section 3: Sub-Second Speed Optimization (Text Left / Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <ScrollReveal direction="slide-left" delay={100}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <Zap className="w-3.5 h-3.5" /> Performance Guarantee
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight mt-3">
                  99+ Core Web Vitals & Instantaneous Page Renders
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base mt-3">
                  A 1-second delay in page load time costs an average of 7% in conversions. Every website we ship achieves green across Google Lighthouse with sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS).
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Next-gen WebP/AVIF asset compression and adaptive loading</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Global edge CDN caching with automated origin invalidation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Critical CSS inlining to eliminate render-blocking obstacles</span>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6">
              <ScrollReveal direction="slide-right" delay={200}>
                <SpeedOptimizationVisual />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Project Scope & Timeline Guidelines */}
      <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/70 text-[#6D28D9] text-xs font-bold">
              <Gauge className="w-3.5 h-3.5" /> Predictable Timelines
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Clear Project Scope &amp; Delivery Benchmarks
            </h2>
            <p className="text-base text-neutral-600">
              No endless delays or scope creep. We operate with milestone agreements and transparent sprint checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="agency-card p-7 space-y-4">
              <div className="text-xs font-mono font-bold text-[#6D28D9] uppercase">Tier 01 · 2–3 Weeks</div>
              <h3 className="text-xl font-bold text-neutral-900">High-Converting Landing Pages</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Bespoke single-page React / Vite conversion experiences, interactive calculators, lead-routing hooks, and sub-second performance.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-500 border-t border-neutral-100">
                Ideal for paid ads campaigns, product launches &amp; local service expansion.
              </div>
            </div>

            <div className="agency-card p-7 space-y-4">
              <div className="text-xs font-mono font-bold text-[#6D28D9] uppercase">Tier 02 · 4–6 Weeks</div>
              <h3 className="text-xl font-bold text-neutral-900">Full Corporate Web Platforms</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Multi-page corporate platforms with dynamic headless CMS integration, blog publishing, technical SEO architecture, and CRM hooks.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-500 border-t border-neutral-100">
                Ideal for B2B brands, tech companies &amp; established regional service providers.
              </div>
            </div>

            <div className="agency-card p-7 space-y-4">
              <div className="text-xs font-mono font-bold text-[#6D28D9] uppercase">Tier 03 · 6–10 Weeks</div>
              <h3 className="text-xl font-bold text-neutral-900">Custom Web Apps &amp; E-Commerce</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Complex SaaS dashboards, portal architectures, bespoke Shopify Storefront APIs, payment gateways, and custom database integrations.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-500 border-t border-neutral-100">
                Ideal for scaling DTC merchants, marketplaces &amp; technology startups.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Prerequisites & Success Measurement */}
      <section className="py-20 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What You Need to Provide */}
            <div className="bg-[#FAF9FF] rounded-3xl p-8 border border-[#E9E7F2] space-y-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-[#6D28D9] text-xs font-bold">
                <Database className="w-3.5 h-3.5" /> Project Intake Checklist
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                What You Need to Provide to Begin
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We make kickoff straightforward. Before writing code, we align on:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-neutral-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Brand Assets &amp; Guidelines:</strong> Vector logos, typography preferences, and existing color palettes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Content Drafts or Wireframe Goals:</strong> Key messaging, value propositions, and core service offerings (we assist with copywriting where needed).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Hosting &amp; Domain Credentials:</strong> Access to your DNS provider (Cloudflare, GoDaddy, Namecheap) and hosting environment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Third-Party Integrations:</strong> API keys for CRMs (HubSpot, Salesforce), payment processors (Stripe), or email marketing platforms.</span>
                </li>
              </ul>
            </div>

            {/* How Success is Measured */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E7F2] shadow-xs space-y-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <BarChart3 className="w-3.5 h-3.5" /> Technical Standards
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                How We Measure Web Development Success
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We believe true quality is measurable in speed, security, and conversion impact:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Standard 01</div>
                  <div className="text-sm font-extrabold text-neutral-900">Lighthouse 95+ Score</div>
                  <p className="text-[11px] text-neutral-500">Green across Performance, Accessibility, Best Practices, and SEO.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Standard 02</div>
                  <div className="text-sm font-extrabold text-neutral-900">Sub-Second TTFB</div>
                  <p className="text-[11px] text-neutral-500">Under 800ms server response globally via edge CDN caching.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Standard 03</div>
                  <div className="text-sm font-extrabold text-neutral-900">Mobile Fluidity</div>
                  <p className="text-[11px] text-neutral-500">Pixel-perfect ergonomics verified across 320px to 1440px displays.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Standard 04</div>
                  <div className="text-sm font-extrabold text-neutral-900">Full IP Ownership</div>
                  <p className="text-[11px] text-neutral-500">You retain 100% intellectual property and code ownership upon completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development FAQs */}
      <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] tracking-tight">
              Frequently Asked Questions About Web Development
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Clear technical guidance on platforms, maintenance, code ownership, and collaboration.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Should my company build on custom React/Next.js or WordPress?',
                a: 'If your business requires enterprise speed, custom interactive workflows, high security, and bespoke customer portals, custom React/Next.js is vastly superior. If your team requires daily non-technical editorial publishing with dozens of weekly blog articles, a headless or custom-engineered WordPress build is often the right choice. We provide unbiased architectural recommendations based on your operational reality.'
              },
              {
                q: 'Do I own the code and intellectual property after completion?',
                a: 'Yes, 100%. Upon final milestone delivery, you own all source code, assets, and design files. There are zero proprietary agency lock-ins, hostage licenses, or forced maintenance fees.'
              },
              {
                q: 'How do you prevent project delays during remote development?',
                a: 'We operate in 1-week or 2-week agile sprints. You receive live staging preview links, asynchronous Loom video walkthroughs, and direct WhatsApp / Slack access to founder Sameer Liaqat and lead developers during US hours. We establish fixed scope deliverables before writing the first line of code.'
              },
              {
                q: 'What happens after the website launches?',
                a: 'Every project includes a 30-day post-launch warranty covering any bug fixes, browser inconsistencies, or minor tweaks. We also offer optional monthly maintenance and performance SLAs covering security updates, continuous backups, speed monitoring, and content additions.'
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

      {/* Related Services */}
      <section className="py-16 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                Explore Synergistic Digital Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Combine custom web engineering with organic search dominance and automated workflows.
              </p>
            </div>
            <button
              onClick={() => onNavigate('usa')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            >
              <span>Explore USA Target Cities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigate('seo')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-[#6D28D9]">Search Engine</div>
              <h4 className="text-base font-bold text-neutral-900">National SEO Services</h4>
              <p className="text-xs text-neutral-600">Technical search optimization to drive compounding organic traffic to your new site.</p>
            </div>

            <div 
              onClick={() => onNavigate('ai-automation')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-purple-600">Intelligence</div>
              <h4 className="text-base font-bold text-neutral-900">AI &amp; CRM Automation</h4>
              <p className="text-xs text-neutral-600">Connect web forms to automated lead qualification and CRM pipelines.</p>
            </div>

            <div 
              onClick={() => onNavigate('ppc')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-amber-600">Paid Acquisition</div>
              <h4 className="text-base font-bold text-neutral-900">Google Ads &amp; PPC</h4>
              <p className="text-xs text-neutral-600">Deploy high-intent paid campaigns that convert immediately on custom landing pages.</p>
            </div>

            <div 
              onClick={() => onNavigate('local-seo')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-blue-600">Proximity</div>
              <h4 className="text-base font-bold text-neutral-900">Local SEO &amp; Maps</h4>
              <p className="text-xs text-neutral-600">Dominate Google Local 3-Pack rankings in your priority commercial city.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('Custom Website Development')} />
    </div>
  );
};

