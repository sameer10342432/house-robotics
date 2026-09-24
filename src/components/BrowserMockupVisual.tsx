import React, { useState } from 'react';
import { Laptop, Smartphone, Tablet, ExternalLink, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrowserMockupVisual: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTheme, setActiveTheme] = useState<'saas' | 'ecommerce' | 'corporate'>('saas');

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Browser Bar */}
      <div className="p-3.5 sm:p-4 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-wrap items-center justify-between gap-3">
        {/* Left Window Dots */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="ml-2 hidden sm:flex items-center bg-white px-3 py-1 rounded-xl border border-[#E9E7F2] text-[11px] font-mono text-neutral-600 gap-1.5 shadow-xs">
            <span className="text-emerald-500 font-bold">https://</span>
            <span>client-growth.store/checkout</span>
          </div>
        </div>

        {/* Center Device Switcher */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#E9E7F2] shadow-xs">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${
              device === 'desktop' ? 'bg-violet-100 text-violet-700' : 'text-neutral-400 hover:text-neutral-700'
            }`}
            title="Desktop 1440px"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${
              device === 'tablet' ? 'bg-violet-100 text-violet-700' : 'text-neutral-400 hover:text-neutral-700'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              device === 'mobile' ? 'bg-violet-100 text-violet-700' : 'text-neutral-400 hover:text-neutral-700'
            }`}
            title="Mobile 375px"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right Lighthouse metric badges */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Perf: 100</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>SEO: 100</span>
          </div>
        </div>
      </div>

      {/* Screen Canvas Area with Device Frame Adjustments */}
      <div className="p-4 sm:p-8 bg-[#F8F7FF] flex justify-center items-center transition-all duration-300 min-h-[340px]">
        <div
          className={`bg-white rounded-2xl border border-[#E9E7F2] shadow-sm transition-all duration-300 overflow-hidden ${
            device === 'desktop'
              ? 'w-full max-w-full'
              : device === 'tablet'
              ? 'w-[420px]'
              : 'w-[280px]'
          }`}
        >
          {/* Inner Simulated Website */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Nav */}
            <div className="flex items-center justify-between border-b border-[#F3F0FF] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#6D28D9] flex items-center justify-center text-white text-[10px] font-bold">
                  H
                </div>
                <span className="font-extrabold text-xs text-neutral-900">Modern Brand</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-neutral-500">
                <span>Products</span>
                <span>Solutions</span>
                <span>Pricing</span>
              </div>
              <button className="px-2.5 py-1 rounded-lg bg-[#6D28D9] text-white text-[10px] font-bold">
                Shop Now
              </button>
            </div>

            {/* Hero Inside Mockup */}
            <div className="py-4 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 text-[10px] font-bold">
                <Sparkles className="w-2.5 h-2.5" /> Custom React & Shopify Architecture
              </div>
              <h4 className="text-base sm:text-xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                Engineered for High-Velocity Conversions
              </h4>
              <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                Sub-second page rendering, zero render-blocking JavaScript, and frictionless 1-click checkout.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-[#6D28D9] text-white text-[11px] font-bold">
                  Get Started
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E9E7F2] text-neutral-700 text-[11px] font-semibold">
                  View Demo
                </span>
              </div>
            </div>

            {/* 3 mini cards inside mockup */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3F0FF]">
              <div className="p-2 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
                <div className="text-[10px] text-neutral-400">Load Time</div>
                <div className="text-xs font-bold text-neutral-900 mt-0.5">0.68s</div>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
                <div className="text-[10px] text-neutral-400">Core Vitals</div>
                <div className="text-xs font-bold text-emerald-600 mt-0.5">Passed</div>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
                <div className="text-[10px] text-neutral-400">Mobile UX</div>
                <div className="text-xs font-bold text-violet-700 mt-0.5">100/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#E9E7F2] flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-900">Supported Platforms:</span>
          <span>Custom React / Next.js</span>
          <span>·</span>
          <span>Shopify Liquid & Hydrogen</span>
          <span>·</span>
          <span>WordPress Gutenberg</span>
        </div>
        <div className="text-violet-700 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Full Responsive Testing Guaranteed
        </div>
      </div>
    </div>
  );
};
