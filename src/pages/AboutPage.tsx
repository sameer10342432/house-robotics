import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Code, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Mail,
  Target,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { AGENCY_INFO, WHY_CHOOSE_ITEMS } from '../data/agencyData';
import { AgencyLabVisual, MilestoneTimelineVisual } from '../components/AboutVisual';
import { AboutHeroVisual } from '../components/AboutHeroVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageView } from '../types';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="bg-white">
      {/* Hero Section with Dedicated AboutHeroVisual */}
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
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Agency Philosophy &amp; Architecture</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Engineered for Businesses That Refuse Generic Marketing
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                House Robotics was founded on a simple conviction: modern growth requires unifying high-performance software engineering with relentless, data-driven marketing.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={onOpenConsultation}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Explore Partnership</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <AboutHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Visual Section */}
      <section className="py-16 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="fade-up" delay={50}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF9FF] p-6 sm:p-10 rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.05)]">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
                  <Sparkles className="w-3.5 h-3.5" /> Company Overview
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  A Hybrid Digital Marketing &amp; Technology Collective
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Headquartered globally with a distributed engineering and marketing delivery framework, House Robotics unites senior software architects, SEO scientists, and conversion strategists under one unified roof.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-2xl border border-[#E9E7F2]">
                    <div className="text-2xl font-black text-[#6D28D9] font-mono">100%</div>
                    <div className="text-xs text-neutral-600 font-semibold mt-1">Senior-Led Accounts</div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#E9E7F2]">
                    <div className="text-2xl font-black text-[#6D28D9] font-mono">24/7</div>
                    <div className="text-xs text-neutral-600 font-semibold mt-1">Autonomous Operations</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#E9E7F2] shadow-sm aspect-[16/10] bg-neutral-50 group">
                  <ImageWithFallback
                    src="/assets/about-company-overview.webp"
                    alt="House Robotics company overview and collaborative agency lab"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    zoomOnHover={false}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Large Agency Growth Lab Visual */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <AgencyLabVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-20 bg-[#FAF9FF] border-y border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="agency-card p-8 space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 text-[#6D28D9] flex items-center justify-center card-icon">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Our Mission</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  To liberate ambitious businesses from ineffective marketing and clunky legacy platforms by deploying scientific search, high-converting design, and autonomous AI automation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div className="agency-card p-8 space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center card-icon">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Our Vision</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  A modern commercial ecosystem where client acquisition, customer communication, and website performance operate symbiotically with zero friction and total transparency.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="agency-card p-8 space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center card-icon">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Our Values</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Zero vanity metrics, sub-second code execution, honest client communication, and continuous weekly compounding improvements across every client campaign.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Visual Timeline Showing Company Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Sparkles className="w-3 h-3" /> Continuous Evolution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Space_Grotesk']">
              The Evolution of Our Engineering Standard
            </h2>
            <p className="text-base text-neutral-600">
              How years of systems architecture and conversion optimization evolved into the House Robotics growth engine.
            </p>
          </div>

          <ScrollReveal animation="fade-up">
            <MilestoneTimelineVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* Team Leadership & Technologists */}
      <section className="py-20 bg-[#FAF9FF] border-t border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Users className="w-3 h-3" /> Leadership Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              The Technologists &amp; Strategists Behind Your Growth
            </h2>
            <p className="text-base text-neutral-600">
              Direct access to senior engineers and growth architects. No junior account managers or generic outsourcing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Sameer Liaqat',
                role: 'Founder & Principal Technologist',
                image: '/images/team-ceo.svg',
                badge: 'System Architecture & AI',
                bio: '10+ years architecting high-converting digital infrastructure, automated pipelines, and full-stack software applications.'
              },
              {
                name: 'Sarah Lin',
                role: 'VP of Search Strategy',
                image: '/images/team-sarah.svg',
                badge: 'Topical Silos & AI Search',
                bio: 'Former enterprise search director specializing in entity clarity, generative search optimization, and competitive market domination.'
              },
              {
                name: 'Alex Vance',
                role: 'Head of Web Engineering',
                image: '/images/team-alex.svg',
                badge: 'React & Headless Shopify',
                bio: 'Full-stack software engineer delivering sub-second web platforms, flawless Core Web Vitals, and conversion rate architecture.'
              },
              {
                name: 'Elena Rostova',
                role: 'Director of Paid Performance',
                image: '/images/team-elena.svg',
                badge: 'Precision Attribution & ROAS',
                bio: 'Specialist in high-intent Google & Meta auction modeling, negative keyword shielding, and multi-touch pipeline attribution.'
              }
            ].map((member, idx) => (
              <ScrollReveal key={member.name} animation="fade-up" delay={idx * 100}>
                <div 
                  className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-xs flex flex-col justify-between hover:border-violet-300 transition-all hover:-translate-y-1 group h-full"
                >
                  <div>
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-[#E9E7F2] bg-[#0A071B]">
                      <ImageWithFallback 
                        src={member.image} 
                        alt={member.name} 
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        zoomOnHover
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-bold text-white">
                        {member.badge}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#6D28D9] mt-0.5">
                      {member.role}
                    </div>
                    <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Verified House Robotics Lead</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
