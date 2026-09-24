import React from 'react';
import { MapPin, ArrowRight, Star, CheckCircle2, Navigation, Phone, ShieldCheck, Sparkles, Building, Globe } from 'lucide-react';
import { LocalMapVisual } from '../components/LocalMapVisual';
import { 
  GbpProfileCard, 
  LocalCitationsVisual, 
  ReviewEngineVisual 
} from '../components/LocalSeoVisualSections';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { PageView } from '../types';

import { ImageWithFallback } from '../components/ImageWithFallback';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface LocalSeoPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const LocalSeoPage: React.FC<LocalSeoPageProps> = ({ onNavigate, onOpenConsultation }) => {
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
              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <MapPin className="w-3.5 h-3.5 animate-pulse" />
                <span>Geo-Targeted Search Dominance</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Get Found by Customers in Your Local Area
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                Capture high-intent nearby customers searching on Google Maps and local mobile search. We optimize your Google Business Profile, synchronize citations, and build automated review generation workflows.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => onOpenConsultation('Local SEO & Google Maps')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Improve Your Local Visibility</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] hover:bg-[#FAF9FF]"
                >
                  <span>Audit Local 3-Pack</span>
                </button>
              </motion.div>

              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <span>Google Business Profile</span>
                <span>·</span>
                <span>Local Citations</span>
                <span>·</span>
                <span>Review Capture</span>
                <span>·</span>
                <span>Geo Landing Pages</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2 group">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                    <ImageWithFallback
                      src="/assets/local-seo-page-hero.webp"
                      alt="Local SEO and location-based search marketing visual"
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

      {/* Alternating Visual Deep Dives */}
      <section className="py-20 bg-white space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Section 1: GBP Tuning (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <Building className="w-3.5 h-3.5" /> Google Business Profile
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Turn Local Google Maps Searches Into Predictable Calls
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Over 78% of local mobile queries result in an offline purchase within 24 hours. We tune your Google Business Profile with secondary categories, geotagged high-resolution photos, structured product menus, and prompt customer Q&amp;A management.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Primary &amp; secondary category precision targeting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Geocoded imagery and weekly promotional updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Call tracking and directions request attribution</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <GbpProfileCard />
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: Citations Sync (Visual Left / Text Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <LocalCitationsVisual />
              </div>
              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold">
                  <Globe className="w-3.5 h-3.5" /> NAP Synchronization
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Flawless NAP Consistency Across 60+ Directories
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Inconsistent names, old phone numbers, or mismatched addresses confuse search engines and suppress ranking eligibility. We audit, cleanse, and synchronize your data across Apple Maps, Bing, Yelp, and industry registries.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automatic duplicate listing suppression and merging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-time syndication to voice assistants (Siri, Alexa, Copilot)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero citation drift with persistent monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3: Automated Review Generation (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> Automated Reviews
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Compounding 5-Star Reviews on Autopilot
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Review recency, volume, and sentiment are top ranking factors for Google's local 3-pack algorithm. Our automated SMS and email sequences prompt satisfied clients right after service completion to leave authentic 5-star reviews.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Frictionless 1-tap direct review links via SMS &amp; QR code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Negative sentiment triage to address concerns privately</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>AI response drafting with keyword-rich owner replies</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <ReviewEngineVisual />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('Local SEO')} />
    </div>
  );
};
