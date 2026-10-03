import React from 'react';
import { Share2, ArrowRight, Heart, MessageCircle, TrendingUp, Calendar, Video, Sparkles, CheckCircle2, Target, Users, Megaphone, ChevronRight } from 'lucide-react';
import { SocialVisual } from '../components/SocialVisual';
import { 
  InstagramMockup, 
  LinkedInMockup, 
  ContentCalendarVisual 
} from '../components/SocialMockups';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageView } from '../types';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface SocialMediaPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const SocialMediaPage: React.FC<SocialMediaPageProps> = ({ onNavigate, onOpenConsultation }) => {
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
                <span className="text-[#6D28D9]">Social Media Marketing</span>
              </div>

              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Share2 className="w-3.5 h-3.5 animate-pulse" />
                <span>Creative Marketing &amp; Audience Growth</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Turn Social Media Into a Growth Channel
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                Move beyond meaningless vanity likes. We engineer high-converting short-form video, B2B LinkedIn carousels, and Meta retargeting campaigns that drive qualified inquiries directly into your sales pipeline.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => onOpenConsultation('Social Media Marketing')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Get Social Strategy Consultation</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] hover:bg-[#FAF9FF]"
                >
                  <span>View Creative Portfolio</span>
                </button>
              </motion.div>

              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <span>Instagram / Reels</span>
                <span>·</span>
                <span>LinkedIn B2B</span>
                <span>·</span>
                <span>TikTok Video</span>
                <span>·</span>
                <span>Retargeting Workflows</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative group">
                  {/* Floating Pill - Top Left */}
                  <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
                    <div className="w-7 h-7 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Avg Engagement</div>
                      <div className="text-xs font-bold text-neutral-900">+420% Organic</div>
                    </div>
                  </div>

                  {/* Floating Pill - Bottom Right */}
                  <div className="absolute -bottom-5 -right-3 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
                    <div className="w-7 h-7 rounded-xl bg-violet-50 text-[#6D28D9] flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Monthly Impressions</div>
                      <div className="text-xs font-bold text-neutral-900">2.8M Reach</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                      <ImageWithFallback
                        src="/assets/social-media-marketing-page-hero.webp"
                        alt="Social media marketing and viral audience engagement campaign visual"
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

      {/* Interactive Channel Architecture */}
      <section className="py-12 bg-[#FAF9FF]/60 border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <SocialVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating Visual Deep Dives */}
      <section className="py-20 bg-white space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Section 1: Instagram Reel & Short Form (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-100">
                  <Video className="w-3.5 h-3.5" /> High-Retention Short Form
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Visual Storytelling Engineered for Modern Feeds
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Attention is the ultimate currency. We craft hyper-visual product demos, motion graphic teardowns, and founder spotlights formatted natively for Instagram Reels and TikTok algorithms.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>3-second psychological hook formulas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dynamic sound design &amp; synced caption animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bio link retargeting funnels to capture warm leads</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <InstagramMockup />
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: LinkedIn B2B Authority (Visual Left / Text Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <LinkedInMockup />
              </div>
              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <Target className="w-3.5 h-3.5" /> B2B Social Authority
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Thought Leadership for Enterprise Buyers &amp; Decision Makers
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  We ghostwrite and design high-impact LinkedIn document carousels, teardown threads, and founder narratives that position your executive team as the definitive authority in your niche.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Slide-by-slide conversion frameworks with high dwell time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Account-Based Marketing (ABM) comment engagement workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Consistent weekly distribution to enterprise prospects</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3: Content Calendar Engine (Text Left / Visual Right) */}
          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] text-xs font-bold border border-violet-100">
                  <Calendar className="w-3.5 h-3.5" /> Editorial Calendar
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-tight">
                  Structured Content Calendars &amp; Multi-Channel Syndication
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                  Never wonder what to post next. We manage your end-to-end creative calendar—from scriptwriting and video editing to scheduled multi-channel distribution across Instagram, TikTok, LinkedIn, and YouTube Shorts.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>30-day advance production sprints and client approval portals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Asset repurposing engine (1 long form → 10 micro-assets)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automated weekly analytics and engagement scorecards</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <ContentCalendarVisual />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('Social Media Marketing')} />
    </div>
  );
};
