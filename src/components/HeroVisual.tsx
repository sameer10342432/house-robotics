import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Cpu, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  Users, 
  Zap, 
  ShieldCheck, 
  Globe2,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'growth' | 'seo' | 'automation' | 'funnel'>('growth');
  const [interactiveHover, setInteractiveHover] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Soft lavender decorative aura in background */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Pill/Badge 1 - Top Left: Google Rankings */}
      <div className="absolute -top-6 -left-4 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E9E7F2] shadow-[0_12px_30px_rgba(109,40,217,0.08)] animate-subtle-float">
        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center font-bold">
          <Search className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">Google Rankings</div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-neutral-900 tabular-nums">Top 3 Positions</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +42%
            </span>
          </div>
        </div>
      </div>

      {/* Floating Pill/Badge 2 - Top Right: Leads Generated */}
      <div className="absolute -top-8 -right-4 z-20 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E9E7F2] shadow-[0_12px_30px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">Inbound Leads</div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-neutral-900 tabular-nums">Qualified Pipeline</span>
            <span className="text-xs font-bold text-violet-700 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +35%
            </span>
          </div>
        </div>
      </div>

      {/* Floating Pill/Badge 3 - Bottom Left: Organic Traffic */}
      <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E9E7F2] shadow-[0_12px_30px_rgba(109,40,217,0.08)] animate-subtle-float-delayed">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">Organic Traffic</div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-neutral-900 tabular-nums">Monthly Growth</span>
            <span className="text-xs font-bold text-emerald-600 tabular-nums">+68%</span>
          </div>
        </div>
      </div>

      {/* Floating Pill/Badge 4 - Bottom Right: Conversion Rate */}
      <div className="absolute -bottom-7 -right-2 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E9E7F2] shadow-[0_12px_30px_rgba(109,40,217,0.08)] animate-subtle-float">
        <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">Conversion Rate</div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-neutral-900 tabular-nums">4.8% High-Intent</span>
            <span className="text-[10px] font-medium text-neutral-400">(Illustrative)</span>
          </div>
        </div>
      </div>

      {/* Main Glass/White Container */}
      <div className="relative z-10 bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.07)] overflow-hidden">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E9E7F2] bg-[#FAF9FF]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-xs font-medium text-neutral-500 font-mono">house-robotics.engine/growth-live</span>
          </div>
          <div className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
            <span>Digital Growth Intelligence</span>
          </div>
        </div>

        {/* Interactive View Selector Tabs */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 border-b border-[#F3F0FF] bg-white gap-1 overflow-x-auto">
          {[
            { id: 'growth', label: 'Growth Ecosystem', icon: BarChart3 },
            { id: 'seo', label: 'SEO Trajectory', icon: Search },
            { id: 'automation', label: 'AI Pipeline', icon: Cpu },
            { id: 'funnel', label: 'Conversion Funnel', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F3F0FF] text-[#6D28D9] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 hover:bg-[#FAF9FF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6D28D9]' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Growth Ecosystem Overview */}
        {activeTab === 'growth' && (
          <div className="p-5 sm:p-6 space-y-5 bg-white">
            {/* Top Metric Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div 
                onMouseEnter={() => setInteractiveHover('traffic')}
                onMouseLeave={() => setInteractiveHover(null)}
                className={`p-3 rounded-2xl border transition-all ${
                  interactiveHover === 'traffic' 
                    ? 'border-[#6D28D9] bg-[#FAF9FF]' 
                    : 'border-[#E9E7F2] bg-white'
                }`}
              >
                <div className="text-[11px] font-medium text-neutral-500">Search Visibility</div>
                <div className="text-xl font-bold text-neutral-900 mt-0.5 tabular-nums">94.8%</div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> +28% this qtr
                </div>
              </div>

              <div 
                onMouseEnter={() => setInteractiveHover('pipeline')}
                onMouseLeave={() => setInteractiveHover(null)}
                className={`p-3 rounded-2xl border transition-all ${
                  interactiveHover === 'pipeline' 
                    ? 'border-[#2563EB] bg-[#FAF9FF]' 
                    : 'border-[#E9E7F2] bg-white'
                }`}
              >
                <div className="text-[11px] font-medium text-neutral-500">Automation Speed</div>
                <div className="text-xl font-bold text-neutral-900 mt-0.5 tabular-nums">&lt; 30s</div>
                <div className="text-[11px] text-violet-700 font-medium flex items-center gap-0.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> 24/7 Qualified
                </div>
              </div>

              <div 
                onMouseEnter={() => setInteractiveHover('roas')}
                onMouseLeave={() => setInteractiveHover(null)}
                className={`p-3 rounded-2xl border transition-all ${
                  interactiveHover === 'roas' 
                    ? 'border-[#06B6D4] bg-[#FAF9FF]' 
                    : 'border-[#E9E7F2] bg-white'
                }`}
              >
                <div className="text-[11px] font-medium text-neutral-500">Paid Ads ROAS</div>
                <div className="text-xl font-bold text-neutral-900 mt-0.5 tabular-nums">4.2x</div>
                <div className="text-[11px] text-cyan-600 font-medium flex items-center gap-0.5 mt-0.5">
                  <ArrowUpRight className="w-3 h-3" /> Target Exceeded
                </div>
              </div>
            </div>

            {/* Featured Hero Visual Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E9E7F2] bg-neutral-50 aspect-[16/10] group shadow-inner">
              <img
                src="/assets/home-hero-visual.webp"
                alt="House Robotics digital marketing and technology growth visual"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 bg-neutral-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>+140% Qualified Inbound</span>
              </div>
            </div>

              {/* Bottom legend */}
              <div className="flex items-center justify-between pt-3 text-[11px] text-neutral-500 border-t border-[#E9E7F2] mt-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 bg-[#6D28D9] rounded-full" /> Organic Traffic
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 bg-[#2563EB] rounded-full" /> Closed Deals
                  </span>
                </div>
                <span className="font-mono text-neutral-400">Live Simulation Mode</span>
              </div>

            {/* Bottom 2 mini connected items */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">Google Local 3-Pack</div>
                  <div className="text-[11px] text-neutral-500">#1 Spot Secured</div>
                </div>
                <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                  #1
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">AI CRM Workflow</div>
                  <div className="text-[11px] text-neutral-500">100% Automated</div>
                </div>
                <div className="w-7 h-7 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO Trajectory Details */}
        {activeTab === 'seo' && (
          <div className="p-5 sm:p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-neutral-800">Target Keyword Rankings (Illustrative)</div>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">All Trending Up</span>
            </div>

            <div className="space-y-2">
              {[
                { keyword: 'digital marketing agency', vol: '18,500/mo', pos: '#2', prev: '#19', change: '+17' },
                { keyword: 'b2b ai automation solutions', vol: '9,200/mo', pos: '#1', prev: '#12', change: '+11' },
                { keyword: 'custom web development react', vol: '14,100/mo', pos: '#3', prev: '#24', change: '+21' },
                { keyword: 'google maps ranking service', vol: '7,400/mo', pos: '#1', prev: '#8', change: '+7' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900">{row.keyword}</span>
                    <span className="text-[11px] text-neutral-500 ml-2 font-mono">{row.vol}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 line-through text-[11px]">{row.prev}</span>
                    <span className="font-bold text-[#6D28D9] bg-violet-100 px-2 py-0.5 rounded-md font-mono">{row.pos}</span>
                    <span className="text-emerald-600 font-bold text-[11px] tabular-nums">{row.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-violet-50/70 rounded-xl border border-violet-100 text-xs text-violet-900 flex items-center justify-between">
              <span className="font-medium">Technical SEO Core Web Vitals: 99/100 Mobile & Desktop</span>
              <span className="font-bold text-violet-700">Audit Passed</span>
            </div>
          </div>
        )}

        {/* Tab 3: AI Pipeline Visualization */}
        {activeTab === 'automation' && (
          <div className="p-5 sm:p-6 space-y-4 bg-white">
            <div className="text-xs font-bold text-neutral-800">Connected Automation Workflow Architecture</div>
            
            <div className="space-y-3">
              {[
                { step: '01', title: 'Visitor Inbound', desc: 'User completes audit or inquiry on web portal', icon: Globe2, color: 'text-violet-600 bg-violet-50' },
                { step: '02', title: 'AI Qualification', desc: 'Intelligent scoring checks budget, urgency & ICP fit', icon: Cpu, color: 'text-blue-600 bg-blue-50' },
                { step: '03', title: 'Instant CRM Sync', desc: 'Enriches lead profile and triggers personalized proposal', icon: Zap, color: 'text-cyan-600 bg-cyan-50' },
                { step: '04', title: 'Calendar & WhatsApp', desc: 'Direct invite link dispatched to sales team in <30 seconds', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' }
              ].map((node, i) => {
                const Icon = node.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#E9E7F2] bg-[#FAF9FF] hover:border-violet-300 transition-colors">
                    <span className="font-mono text-xs font-bold text-violet-700 bg-white px-2 py-1 rounded-lg border border-[#E9E7F2]">{node.step}</span>
                    <div className={`p-2 rounded-lg ${node.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-neutral-900">{node.title}</div>
                      <div className="text-[11px] text-neutral-500">{node.desc}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400 bg-white px-2 py-0.5 rounded-full border border-neutral-200">Active</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Funnel Details */}
        {activeTab === 'funnel' && (
          <div className="p-5 sm:p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-neutral-800">Multi-Channel Inbound Funnel</div>
              <span className="text-[11px] text-neutral-500">Live Stage Efficiency</span>
            </div>

            <div className="space-y-2.5">
              {[
                { stage: '1. Total Targeted Impressions', count: '124,000', pct: '100%', bar: 'w-full bg-violet-200' },
                { stage: '2. High-Intent Site Visitors', count: '14,800', pct: '11.9%', bar: 'w-[75%] bg-violet-400' },
                { stage: '3. Form & WhatsApp Engagements', count: '1,420', pct: '9.6%', bar: 'w-[45%] bg-blue-500' },
                { stage: '4. Qualified Client Consultations', count: '480', pct: '33.8%', bar: 'w-[25%] bg-[#6D28D9]' },
              ].map((row, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-neutral-800">
                    <span>{row.stage}</span>
                    <span className="font-mono text-neutral-900">{row.count} ({row.pct})</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${row.bar}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info strip */}
        <div className="px-5 py-3 border-t border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Real-Time Growth Model</span>
          </div>
          <span className="text-neutral-400">House Robotics Architecture</span>
        </div>
      </div>
    </div>
  );
};
