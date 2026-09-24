import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Zap, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const AboutHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none mt-6 lg:mt-0">
      {/* Background glow auras */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -right-8 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Floating Badge 1 - Top Left */}
      <div className="absolute -top-5 -left-3 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
        <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
          <Award className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Experience</div>
          <div className="text-xs font-extrabold text-neutral-900">10+ Years Architecture</div>
        </div>
      </div>

      {/* Floating Badge 2 - Bottom Right */}
      <div className="absolute -bottom-6 -right-2 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Guarantee</div>
          <div className="text-xs font-extrabold text-neutral-900">Zero Vanity Metrics</div>
        </div>
      </div>

      {/* Main Command Console */}
      <div className="relative z-10 bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.07)] overflow-hidden text-left">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E9E7F2] bg-[#FAF9FF]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="text-xs font-mono font-bold text-neutral-500 ml-2">
              HouseRobotics::System_Core_v4.2
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPERATIONAL</span>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-6 space-y-5">
          <div>
            <div className="text-[11px] font-bold text-[#6D28D9] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3" /> Dedicated Technology &amp; Growth Studio
            </div>
            <h3 className="text-xl font-extrabold text-neutral-950 font-['Space_Grotesk']">
              Unified Engineering Standard
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              We eliminate traditional agency silos by pairing senior software engineers directly with algorithmic search and acquisition strategists.
            </p>
          </div>

          {/* Interactive Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Average Speed</div>
              <div className="text-2xl font-black text-neutral-900 font-mono mt-0.5">
                <AnimatedCounter value="<0.8s" />
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">100/100 Core Web Vitals</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Lead Latency</div>
              <div className="text-2xl font-black text-[#6D28D9] font-mono mt-0.5">
                <AnimatedCounter value="<30s" />
              </div>
              <div className="text-[11px] text-violet-700 font-semibold mt-0.5">Instant AI Qualification</div>
            </div>
          </div>

          {/* Technology Badges Matrix */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Verified Core Toolchains &amp; Frameworks
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React 19',
                'TypeScript',
                'Generative AI',
                'Node.js',
                'Shopify Liquid',
                'Next.js',
                'Tailwind CSS',
                'Google Search Console API',
                'HubSpot Webhooks'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200/80 text-[11px] font-mono font-medium text-neutral-700 hover:border-violet-300 hover:bg-[#F3F0FF] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
