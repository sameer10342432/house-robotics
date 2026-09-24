import React, { useState } from 'react';
import { 
  Search, 
  Code2, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  Activity,
  BarChart3
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const ServicesHeroVisual: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'marketing' | 'tech' | 'ai' | 'growth'>('marketing');

  const categoryData = {
    marketing: {
      title: 'Search & Visibility Architecture',
      tagline: 'Topical authority & high-intent organic pipelines',
      metric: '+140%',
      metricLabel: 'Average Organic Lift',
      pill: 'Google 3-Pack & Organic',
      icon: Search,
      color: 'text-[#6D28D9] bg-violet-100',
      items: ['Core Web Vitals & Schema Architecture', 'Topical Silos & Semantic Clusters', 'Digital PR & Editorial Placements']
    },
    tech: {
      title: 'Full-Stack Modern Engineering',
      tagline: 'React, Next.js, Headless Shopify & Clean WordPress',
      metric: '<0.8s',
      metricLabel: 'Average Page Speed',
      pill: 'Sub-Second Load Times',
      icon: Code2,
      color: 'text-blue-600 bg-blue-100',
      items: ['TypeScript Component Systems', 'Shopify Checkout Optimization', 'Airtight Security & Zero Bloat']
    },
    ai: {
      title: 'Autonomous AI Workflows',
      tagline: '24/7 Lead qualification & CRM orchestration',
      metric: '45+ hrs',
      metricLabel: 'Saved Weekly per Team',
      pill: 'Sub-30s Response Time',
      icon: Cpu,
      color: 'text-cyan-600 bg-cyan-100',
      items: ['Automated Lead Intake & Scoring', 'HubSpot & Salesforce Sync', 'Dynamic Contextual Email Follow-up']
    },
    growth: {
      title: 'High-ROAS Paid Acquisition',
      tagline: 'Precision Google Search, Shopping & Meta Ads',
      metric: '4.1x',
      metricLabel: 'Average Blended ROAS',
      pill: 'Target CPA Optimization',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-100',
      items: ['Negative Keyword Query Shielding', 'Dedicated Split-Test Landing Pages', 'Direct Closed-Revenue Attribution']
    }
  };

  const current = categoryData[activeCategory];
  const CurrentIcon = current.icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none mt-8">
      {/* Ambient background glows */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -right-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Floating Pill - Top Left */}
      <div className="absolute -top-5 -left-4 z-20 hidden md:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
        <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
          <Activity className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Engine Status</div>
          <div className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>22 Capabilities Online</span>
          </div>
        </div>
      </div>

      {/* Floating Pill - Top Right */}
      <div className="absolute -top-6 -right-4 z-20 hidden md:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Quality Standard</div>
          <div className="text-xs font-extrabold text-neutral-900">Sub-Second &amp; High-ROAS</div>
        </div>
      </div>

      {/* Main Console Window */}
      <div className="relative z-10 bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden">
        {/* Console Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 border-b border-[#E9E7F2] bg-[#FAF9FF] gap-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-xs font-mono font-bold text-neutral-500 ml-2">
              HouseRobotics::Capability_Matrix_v2.6
            </span>
          </div>

          {/* Interactive Category Selector */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E9E7F2] rounded-xl text-xs font-bold">
            {[
              { id: 'marketing', label: 'Marketing', icon: Search },
              { id: 'tech', label: 'Technology', icon: Code2 },
              { id: 'ai', label: 'AI Automation', icon: Cpu },
              { id: 'growth', label: 'Growth & Ads', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#6D28D9] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-[#FAF9FF]'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Console Interactive Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Details */}
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FAF9FF] border border-[#E9E7F2] text-xs font-bold text-[#6D28D9]">
              <Sparkles className="w-3 h-3" />
              <span>{current.pill}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-snug">
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {current.tagline}
            </p>

            <div className="space-y-2 pt-2">
              {current.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Metric Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#FAF9FF] to-[#F3F0FF] p-6 rounded-2xl border border-violet-100 flex flex-col justify-between space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${current.color}`}>
                <CurrentIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-violet-700 bg-white px-2 py-0.5 rounded-md border border-violet-200">
                Verified Benchmark
              </span>
            </div>

            <div>
              <div className="text-4xl font-black text-neutral-950 font-mono tracking-tight">
                <AnimatedCounter value={current.metric} />
              </div>
              <div className="text-xs font-semibold text-neutral-600 mt-1">
                {current.metricLabel}
              </div>
            </div>

            <div className="pt-3 border-t border-violet-200/50 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Scientific Methodology</span>
              <span className="text-[#6D28D9] font-bold flex items-center gap-0.5">
                Targeted Impact <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
