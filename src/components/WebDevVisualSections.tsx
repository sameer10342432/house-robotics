import React, { useState } from 'react';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  Database, 
  Globe2, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';

export const MultiDeviceVisual: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-5">
      {/* Device Selector Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-1 bg-[#FAF9FF] p-1 rounded-xl border border-[#E9E7F2]">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'desktop' ? 'bg-white text-[#6D28D9] shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'tablet' ? 'bg-white text-[#6D28D9] shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'mobile' ? 'bg-white text-[#6D28D9] shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3" /> Core Web Vitals: 100/100
        </span>
      </div>

      {/* Screen Frame Mockup */}
      <div className="transition-all duration-300 flex justify-center">
        <div 
          className={`bg-neutral-950 p-2.5 rounded-2xl shadow-xl border border-neutral-800 transition-all ${
            device === 'desktop' ? 'w-full' : device === 'tablet' ? 'w-[75%]' : 'w-[52%]'
          }`}
        >
          {/* Inner Display Surface */}
          <div className="bg-white rounded-xl overflow-hidden p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
              <span className="font-extrabold text-[11px] text-[#6D28D9]">HOUSE ROBOTICS</span>
              <span className="text-[9px] text-neutral-400 font-mono">0.72s LCP</span>
            </div>

            <div className="py-3 px-2 bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg text-center space-y-1">
              <div className="text-[10px] font-bold text-neutral-900">Modern Digital Engineering</div>
              <div className="text-[8px] text-neutral-500">React + Next.js + Tailwind</div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[8px]">
              <div className="p-1.5 rounded bg-neutral-50 border border-neutral-100 font-semibold text-neutral-700">
                ✓ Ultra Fast Response
              </div>
              <div className="p-1.5 rounded bg-neutral-50 border border-neutral-100 font-semibold text-neutral-700">
                ✓ SEO Structured Schema
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tech Badges Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-semibold text-neutral-600 border-t border-[#E9E7F2]">
        <span className="flex items-center gap-1 bg-[#FAF9FF] px-2.5 py-1 rounded-lg border border-[#E9E7F2]">
          <Code2 className="w-3.5 h-3.5 text-[#6D28D9]" /> React 19 / TypeScript
        </span>
        <span className="flex items-center gap-1 bg-[#FAF9FF] px-2.5 py-1 rounded-lg border border-[#E9E7F2]">
          <Database className="w-3.5 h-3.5 text-blue-600" /> PostgreSQL / Headless API
        </span>
        <span className="flex items-center gap-1 bg-[#FAF9FF] px-2.5 py-1 rounded-lg border border-[#E9E7F2]">
          <Globe2 className="w-3.5 h-3.5 text-cyan-600" /> Edge CDN Deployment
        </span>
      </div>
    </div>
  );
};

export const PerformanceGaugeVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Google Lighthouse Audit</div>
            <div className="text-[10px] text-neutral-500 font-mono">Real-World Mobile Emulation</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          All Green
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        {[
          { metric: 'Performance', score: '100', color: 'text-emerald-600 border-emerald-300 bg-emerald-50/50' },
          { metric: 'Accessibility', score: '100', color: 'text-emerald-600 border-emerald-300 bg-emerald-50/50' },
          { metric: 'Best Practices', score: '100', color: 'text-emerald-600 border-emerald-300 bg-emerald-50/50' },
          { metric: 'SEO Score', score: '100', color: 'text-emerald-600 border-emerald-300 bg-emerald-50/50' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
            <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-base ${item.color}`}>
              {item.score}
            </div>
            <div className="text-[10px] font-bold text-neutral-700 mt-2 truncate">{item.metric}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#E9E7F2] pt-2">
        <span>Zero Unused JavaScript Bloat</span>
        <span className="text-emerald-600 font-bold">Instant Mobile First Input</span>
      </div>
    </div>
  );
};

export const SpeedOptimizationVisual = PerformanceGaugeVisual;

export const CodeArchitectureVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Type-Safe Architecture</div>
            <div className="text-[10px] text-neutral-500 font-mono">React 19 · TypeScript · Tailwind</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          Build Passed
        </span>
      </div>

      <div className="bg-[#1e1b4b] text-neutral-200 p-4 rounded-2xl font-mono text-[11px] space-y-1.5 leading-relaxed overflow-x-auto shadow-inner">
        <div className="text-neutral-400">// Clean component separation</div>
        <div>
          <span className="text-purple-400">interface</span>{' '}
          <span className="text-yellow-300">GrowthModuleProps</span> {'{'}
        </div>
        <div className="pl-4">
          <span className="text-cyan-300">speedScore</span>: <span className="text-pink-400">number</span>;
        </div>
        <div className="pl-4">
          <span className="text-cyan-300">conversionFunnel</span>: <span className="text-pink-400">PipelineConfig</span>;
        </div>
        <div>{'}'}</div>
        <div className="pt-1">
          <span className="text-purple-400">export const</span>{' '}
          <span className="text-blue-400">GrowthEngine</span> = () {'=>'} {'{'}
        </div>
        <div className="pl-4 text-emerald-400">
          return &lt;<span className="text-yellow-300">OptimizedView</span> hydration="eager" /&gt;;
        </div>
        <div>{'};'}</div>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
        <span>Bundle Size: &lt; 48kb gzip</span>
        <span className="text-[#6D28D9] font-bold font-mono">0.00s TBT</span>
      </div>
    </div>
  );
};

export const EcommerceProductVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">High-Converting E-Commerce PDP</div>
            <div className="text-[10px] text-neutral-500 font-mono">Optimized for Average Order Value</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          +34% Checkout Rate
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-200 to-indigo-100 flex items-center justify-center shrink-0 border border-violet-200">
          <Sparkles className="w-8 h-8 text-[#6D28D9]" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-extrabold text-neutral-900">Enterprise Growth Kit</div>
          <div className="text-sm font-bold text-[#6D28D9] font-mono">$1,490.00</div>
          <div className="text-[10px] text-neutral-500">Includes 1-Click Upsell Bundle</div>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2">
          <span>1-Click Instant Checkout</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <div className="text-center text-[10px] text-neutral-400">
          Shopify Storefront API · Stripe 3DS2 Enabled
        </div>
      </div>
    </div>
  );
};
