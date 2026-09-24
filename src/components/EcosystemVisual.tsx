import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Share2, 
  TrendingUp, 
  Cpu, 
  Database, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';

export const EcosystemVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('ai');

  const nodes = [
    {
      id: 'website',
      name: 'High-Speed Web Portal',
      category: 'Foundation',
      icon: Globe,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      badge: '<0.8s Load',
      description: 'Ultra-fast Next.js/React architecture with 100/100 Core Web Vitals.',
      x: 18,
      y: 22
    },
    {
      id: 'seo',
      name: 'Organic Search Engine',
      category: 'Inbound',
      icon: Search,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: 'Top 3 Positions',
      description: 'Topical authority clusters and high-intent commercial keyword rankings.',
      x: 82,
      y: 22
    },
    {
      id: 'ai',
      name: 'Intelligent AI Core',
      category: 'Intelligence',
      icon: Cpu,
      color: 'text-[#6D28D9] bg-[#F3F0FF] border-violet-400 ring-4 ring-violet-100',
      badge: 'Autonomous',
      description: 'Central orchestration engine qualifying leads, enriching data & routing in seconds.',
      x: 50,
      y: 50,
      isCenter: true
    },
    {
      id: 'ads',
      name: 'Precision Paid Ads',
      category: 'Scale',
      icon: TrendingUp,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      badge: '4.2x ROAS',
      description: 'Laser-focused Google Search & Meta retargeting campaigns.',
      x: 18,
      y: 78
    },
    {
      id: 'social',
      name: 'Authority Content',
      category: 'Audience',
      icon: Share2,
      color: 'text-pink-600 bg-pink-50 border-pink-200',
      badge: '3.4x Reach',
      description: 'Multi-channel social storytelling and B2B LinkedIn authority assets.',
      x: 82,
      y: 78
    },
    {
      id: 'crm',
      name: 'Unified CRM & Pipeline',
      category: 'Revenue',
      icon: Database,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'Auto-Sync',
      description: 'Live deal tracking, automated follow-ups, and revenue attribution.',
      x: 50,
      y: 92
    }
  ];

  const currentNode = nodes.find(n => n.id === activeNode) || nodes[2];

  return (
    <div className="relative w-full bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] p-6 sm:p-8 overflow-hidden select-none">
      {/* Subtle ambient lavender glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-100/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-[#E9E7F2] gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9] animate-pulse" />
            <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">
              House Robotics Digital Growth Ecosystem
            </h4>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Synchronized system connecting marketing, engineering, and sales pipeline.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-[11px] font-bold border border-violet-100">
          <Sparkles className="w-3 h-3" />
          <span>Interactive Architecture</span>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative h-[340px] sm:h-[380px] my-4 w-full">
        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradViolet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradActive" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Lines from perimeter nodes to central AI Core */}
          <line x1="18" y1="22" x2="50" y2="50" stroke={activeNode === 'website' ? 'url(#lineGradActive)' : '#E9E7F2'} strokeWidth={activeNode === 'website' ? "1.2" : "0.7"} strokeDasharray={activeNode === 'website' ? 'none' : '2 2'} />
          <line x1="82" y1="22" x2="50" y2="50" stroke={activeNode === 'seo' ? 'url(#lineGradActive)' : '#E9E7F2'} strokeWidth={activeNode === 'seo' ? "1.2" : "0.7"} strokeDasharray={activeNode === 'seo' ? 'none' : '2 2'} />
          <line x1="18" y1="78" x2="50" y2="50" stroke={activeNode === 'ads' ? 'url(#lineGradActive)' : '#E9E7F2'} strokeWidth={activeNode === 'ads' ? "1.2" : "0.7"} strokeDasharray={activeNode === 'ads' ? 'none' : '2 2'} />
          <line x1="82" y1="78" x2="50" y2="50" stroke={activeNode === 'social' ? 'url(#lineGradActive)' : '#E9E7F2'} strokeWidth={activeNode === 'social' ? "1.2" : "0.7"} strokeDasharray={activeNode === 'social' ? 'none' : '2 2'} />
          <line x1="50" y1="50" x2="50" y2="92" stroke={activeNode === 'crm' ? 'url(#lineGradActive)' : '#E9E7F2'} strokeWidth={activeNode === 'crm' ? "1.2" : "0.7"} />

          {/* Outer ring perimeter links */}
          <line x1="18" y1="22" x2="82" y2="22" stroke="#F3F0FF" strokeWidth="0.5" />
          <line x1="18" y1="22" x2="18" y2="78" stroke="#F3F0FF" strokeWidth="0.5" />
          <line x1="82" y1="22" x2="82" y2="78" stroke="#F3F0FF" strokeWidth="0.5" />
          <line x1="18" y1="78" x2="50" y2="92" stroke="#F3F0FF" strokeWidth="0.5" />
          <line x1="82" y1="78" x2="50" y2="92" stroke="#F3F0FF" strokeWidth="0.5" />
        </svg>

        {/* Node Buttons */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute cursor-pointer transition-all duration-300 z-20 group ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div 
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  node.color
                } ${
                  isSelected 
                    ? 'shadow-[0_10px_25px_rgba(109,40,217,0.25)] border-[#6D28D9]' 
                    : 'bg-white shadow-xs border-[#E9E7F2] hover:border-violet-300'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-[#6D28D9]' : 'text-neutral-700'}`} />
                <span className="text-[10px] font-bold text-neutral-900 mt-1 whitespace-nowrap hidden sm:block">
                  {node.name.split(' ')[0]}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full mt-0.5 ${
                  isSelected ? 'bg-[#6D28D9] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {node.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Live Detail Drawer */}
      <div className="pt-4 border-t border-[#E9E7F2] bg-[#FAF9FF] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 sm:p-6 rounded-b-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#6D28D9]">
                {currentNode.category} Pillar
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-sm font-bold text-neutral-900">{currentNode.name}</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
              {currentNode.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
