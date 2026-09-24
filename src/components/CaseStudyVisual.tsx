import React from 'react';

interface CaseStudyVisualProps {
  studyId: string;
}

export const CaseStudyVisual: React.FC<CaseStudyVisualProps> = ({ studyId }) => {
  const getImageForStudy = () => {
    switch (studyId) {
      case 'cs-ecommerce':
        return {
          src: '/images/case-urbanstride.svg',
          alt: 'UrbanStride D2C E-Commerce Case Study',
          badge: 'Shopify Headless · 0.9s Speed',
          kpi: '+142% Revenue'
        };
      case 'cs-local':
        return {
          src: '/images/case-lumina.svg',
          alt: 'Lumina Aesthetics Local SEO Case Study',
          badge: 'Google 3-Pack Rank #1',
          kpi: '+188% Inbound Calls'
        };
      case 'cs-wealth':
        return {
          src: '/images/case-nexus.svg',
          alt: 'Nexus FinTech Advisory Pipeline',
          badge: 'Institutional Deal Engine',
          kpi: '$28M+ Added AUM'
        };
      case 'cs-automation':
      default:
        return {
          src: '/images/case-apex.svg',
          alt: 'Apex Cloud Autonomous Inbound Engine',
          badge: 'AI Autonomous Lead Router',
          kpi: '<30s Response Latency'
        };
    }
  };

  const info = getImageForStudy();

  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[#E9E7F2] bg-[#0A071B] group shadow-inner">
      <img
        src={info.src}
        alt={info.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Top Left Badge */}
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/40 text-[10px] font-bold text-neutral-900 shadow-xs">
        {info.badge}
      </div>

      {/* Bottom KPI Tag */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
        <span className="font-semibold text-white/95 text-xs truncate drop-shadow">{info.alt}</span>
        <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40 text-[11px] shrink-0 ml-2">
          {info.kpi}
        </span>
      </div>
    </div>
  );
};
