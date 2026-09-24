import React from 'react';
import { 
  Building, 
  Cpu, 
  Users, 
  Globe2, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Award,
  Layers,
  Linkedin,
  Mail
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { AnimatedCounter } from './AnimatedCounter';

export const AgencyLabVisual: React.FC = () => {
  return (
    <div className="relative w-full bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-8 shadow-[0_20px_50px_rgba(109,40,217,0.06)] overflow-hidden select-none">
      {/* Decorative aura */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -right-10 w-72 h-72 bg-violet-100/50 rounded-full blur-3xl pointer-events-none" 
      />

      {/* High-Resolution HQ Visual Banner with Safe Fallback */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#E9E7F2] mb-6 shadow-sm group">
        <ImageWithFallback 
          src="/images/about-hq.svg" 
          alt="House Robotics Global Operations Lab" 
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
          zoomOnHover
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div>
            <div className="text-xs font-bold text-violet-300">Global Innovation Center</div>
            <div className="text-sm sm:text-base font-extrabold text-white">Autonomous Growth &amp; Technology Headquarters</div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-medium border border-white/30">
            Live Engineering Operations
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#F3F0FF] text-[#6D28D9] flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">House Robotics Engineering &amp; Growth Lab</div>
            <div className="text-[10px] text-neutral-500 font-mono">Modern Digital Architecture &amp; Telemetry</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#6D28D9] bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          High-Velocity Operations
        </span>
      </div>

      {/* Lab Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2 hover:border-violet-300 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-neutral-900">AI &amp; Automation Hub</div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Autonomous workflows connecting CRM, instant quotation engines, and customer messaging pipelines.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2 hover:border-violet-300 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Globe2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-neutral-900">Search &amp; Topical Engine</div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Topical authority maps, Core Web Vitals engineering, and high-impact digital PR placements.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2 hover:border-violet-300 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-neutral-900">Media &amp; Attribution Core</div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Server-side tracking, negative keyword mining, and real-time revenue attribution dashboards.
          </p>
        </div>
      </div>

      {/* Trust & Discipline Stats with AnimatedCounter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E9E7F2] text-center">
        <div>
          <div className="text-lg font-extrabold text-neutral-950 font-mono">
            <AnimatedCounter value="100%" />
          </div>
          <div className="text-[10px] text-neutral-500 font-semibold">In-House Engineers</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-[#6D28D9] font-mono">
            <AnimatedCounter value="0%" />
          </div>
          <div className="text-[10px] text-neutral-500 font-semibold">Vanity Metrics</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-neutral-950 font-mono">
            <AnimatedCounter value="<30s" />
          </div>
          <div className="text-[10px] text-neutral-500 font-semibold">Lead Qualification</div>
        </div>
        <div>
          <div className="text-lg font-extrabold text-emerald-600 font-mono">
            <AnimatedCounter value="24/7" />
          </div>
          <div className="text-[10px] text-neutral-500 font-semibold">Pipeline Monitoring</div>
        </div>
      </div>
    </div>
  );
};

export const MilestoneTimelineVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-8 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">House Robotics Milestone Evolution</div>
            <div className="text-[10px] text-neutral-500">From Systems Research to Full-Stack Agency</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
          Track Record
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2 relative">
          <span className="text-xs font-mono font-bold text-[#6D28D9] bg-white border border-violet-100 px-2 py-0.5 rounded-md">
            Phase 1 · Foundation
          </span>
          <h4 className="text-xs font-extrabold text-neutral-900">Custom Engineering &amp; Technical Audits</h4>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            Pioneered sub-second web performance architectures and rigorous technical search crawls for enterprise clients.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2 relative">
          <span className="text-xs font-mono font-bold text-blue-600 bg-white border border-blue-100 px-2 py-0.5 rounded-md">
            Phase 2 · Scale
          </span>
          <h4 className="text-xs font-extrabold text-neutral-900">Paid Media &amp; Local Expansion</h4>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            Integrated multi-channel performance marketing, Google Maps 3-pack dominance, and transparent revenue attribution.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-violet-300 bg-gradient-to-b from-[#FAF9FF] to-violet-50/40 space-y-2 relative">
          <span className="text-xs font-mono font-bold text-violet-700 bg-white border border-violet-200 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
            <Sparkles className="w-3 h-3 text-[#6D28D9]" /> Present &amp; Future
          </span>
          <h4 className="text-xs font-extrabold text-neutral-900">AI Automation &amp; Growth Infrastructure</h4>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            Deploying autonomous lead qualification, real-time CRM syncing, and intelligent multi-touch digital ecosystems.
          </p>
        </div>
      </div>
    </div>
  );
};
