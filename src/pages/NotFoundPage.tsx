import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Home, 
  Search, 
  MapPin, 
  TrendingUp, 
  Code, 
  Cpu, 
  BookOpen, 
  Mail, 
  Sparkles,
  ChevronRight 
} from 'lucide-react';
import { PageView } from '../types';
import { applyPageSeo } from '../utils/seo';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { AGENCY_INFO } from '../data/agencyData';
import { motion } from 'motion/react';

interface NotFoundPageProps {
  onNavigate: (page: PageView) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    applyPageSeo('/404');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const quickLinks = [
    { title: 'Search Engine Optimization', desc: 'Rank higher and earn high-intent search leads', icon: Search, page: 'seo' as PageView },
    { title: 'Local SEO & Google Maps', desc: 'Dominate the Google 3-Pack and nearby calls', icon: MapPin, page: 'local-seo' as PageView },
    { title: 'PPC & Google Ads', desc: 'High-ROAS search and display advertising', icon: TrendingUp, page: 'ppc' as PageView },
    { title: 'Custom Web Development', desc: 'Fast, modern, conversion-engineered sites', icon: Code, page: 'web-development' as PageView },
    { title: 'AI Automation Workflows', desc: 'Connect CRMs and qualify leads 24/7', icon: Cpu, page: 'ai-automation' as PageView },
    { title: 'Growth Blog & Playbooks', desc: 'Actionable strategies from our engineers', icon: BookOpen, page: 'blog' as PageView }
  ];

  return (
    <div className="min-h-[80vh] bg-white relative overflow-hidden flex flex-col justify-center py-16 sm:py-24">
      <DecorativeBackground variant="grid" />
      <DecorativeBackground variant="gradient-mesh" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FF] border border-[#E9E7F2] text-xs font-bold text-[#6D28D9] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Status 404 — Resource Not Found</span>
        </div>

        {/* Large 404 Visual & Headline */}
        <div className="space-y-3">
          <div className="text-7xl sm:text-9xl font-black font-['Space_Grotesk'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#2563EB] select-none">
            404
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-['Space_Grotesk']">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. 
            Use the links below to find what you need.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-2xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-bold shadow-[0_10px_25px_rgba(109,40,217,0.2)] hover:shadow-[0_15px_30px_rgba(109,40,217,0.3)] transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3 rounded-2xl bg-white border border-[#E9E7F2] hover:border-[#6D28D9] text-neutral-800 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
          >
            <span>Explore All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Discovery Directory */}
        <div className="pt-8">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.page)}
                  className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] hover:border-violet-300 hover:bg-white transition-all group shadow-xs hover:shadow-md flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-white text-[#6D28D9] border border-[#E9E7F2] group-hover:bg-[#6D28D9] group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Direct Contact Helper */}
        <div className="pt-6 border-t border-[#E9E7F2] text-xs text-neutral-500 flex flex-wrap items-center justify-center gap-4">
          <span>Need immediate assistance?</span>
          <a
            href={AGENCY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6D28D9] font-bold hover:underline"
          >
            Chat on WhatsApp ({AGENCY_INFO.whatsapp})
          </a>
          <span>·</span>
          <a
            href={AGENCY_INFO.emailUrl}
            className="text-[#6D28D9] font-bold hover:underline"
          >
            {AGENCY_INFO.email}
          </a>
        </div>
      </div>
    </div>
  );
};
