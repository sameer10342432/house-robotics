import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Filter, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Layers,
  ShieldAlert,
  ShoppingBag,
  RefreshCw,
  BarChart2,
  Target
} from 'lucide-react';

export const GoogleAdPreviewVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">High-Converting Search Ad Copy</div>
            <div className="text-[10px] text-neutral-500 font-mono">Top Position #1 Auction Winner</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
          Quality Score: 10/10
        </span>
      </div>

      {/* Simulated Google Ad */}
      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">
            Sponsored
          </span>
          <span className="text-neutral-500 font-mono text-[11px]">https://www.yourdomain.com/solutions</span>
        </div>

        <h4 className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
          Custom Enterprise Solutions | Cut Wasteful Spend by 38%
        </h4>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Target ready-to-buy commercial clients with precision Google Search & Shopping campaigns. Real-time attribution and zero vanity impressions.
        </p>

        {/* Ad Sitelinks */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200/60">
          <div className="text-xs font-semibold text-[#1a0dab] hover:underline cursor-pointer">
            ✦ Free 30-Min Growth Audit
          </div>
          <div className="text-xs font-semibold text-[#1a0dab] hover:underline cursor-pointer">
            ✦ View Real Case Studies
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-white border border-[#E9E7F2]">
          <div className="text-[10px] text-neutral-500">Average CTR</div>
          <div className="text-sm font-bold text-neutral-900 mt-0.5 font-mono">8.4%</div>
        </div>
        <div className="p-2 rounded-xl bg-white border border-[#E9E7F2]">
          <div className="text-[10px] text-neutral-500">Target CPA</div>
          <div className="text-sm font-bold text-emerald-600 mt-0.5 font-mono">$42.80</div>
        </div>
        <div className="p-2 rounded-xl bg-white border border-[#E9E7F2]">
          <div className="text-[10px] text-neutral-500">Conv. Rate</div>
          <div className="text-sm font-bold text-[#6D28D9] mt-0.5 font-mono">6.2%</div>
        </div>
      </div>
    </div>
  );
};

export const GoogleSearchAdVisual = GoogleAdPreviewVisual;

export const NegativeKeywordMatrixVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Negative Keyword Shield</div>
            <div className="text-[10px] text-neutral-500">Eliminating Budget Bleed & Irrelevant Clicks</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          -$1,840/mo Saved
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {[
          { term: '"free download templates"', match: 'Negative Phrase', blocked: '1,420 search clicks blocked' },
          { term: '"internship jobs entry level"', match: 'Negative Phrase', blocked: '890 clicks filtered out' },
          { term: '"how to DIY guide"', match: 'Negative Exact', blocked: '640 wasted searches saved' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-red-600">{item.term}</span>
              <div className="text-[10px] text-neutral-500">{item.blocked}</div>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200 px-2 py-0.5 rounded">
              {item.match}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#E9E7F2] pt-2">
        <span>Search Term Hygiene: Weekly Mining</span>
        <span className="text-emerald-600 font-bold">100% Commercial Intent</span>
      </div>
    </div>
  );
};

export const MetaRetargetingVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Multi-Touch Retargeting Sequence</div>
            <div className="text-[10px] text-neutral-500 font-mono">Meta Pixel & CAPI Server Tracking</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
          ROAS: 4.8x
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-[10px]">
              01
            </span>
            <div>
              <div className="font-bold text-neutral-900">Days 1–3: Video Case Studies</div>
              <div className="text-[10px] text-neutral-500">Overcomes price and reliability objections</div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-pink-600">3.4% CTR</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold text-[10px]">
              02
            </span>
            <div>
              <div className="font-bold text-neutral-900">Days 4–14: Client Proof Carousel</div>
              <div className="text-[10px] text-neutral-500">Testimonials and verified Google reviews</div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6D28D9]">5.1% CTR</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
              03
            </span>
            <div>
              <div className="font-bold text-neutral-900">Days 15–30: Time-Sensitive Offer</div>
              <div className="text-[10px] text-neutral-500">Free technical discovery or audit session</div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-600">7.8% Conv</span>
        </div>
      </div>
    </div>
  );
};

export const PpcDashboardVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Paid Media Attribution Console</div>
            <div className="text-[10px] text-neutral-500 font-mono">Google Ads · Meta · LinkedIn</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          Live Synced
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
          <div className="text-[11px] text-neutral-500">Tracked Revenue</div>
          <div className="text-xl font-black text-neutral-900 font-mono">$184,200</div>
          <div className="text-[10px] text-emerald-600 font-semibold">↑ 48% vs baseline</div>
        </div>
        <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
          <div className="text-[11px] text-neutral-500">Blended ROAS</div>
          <div className="text-xl font-black text-[#6D28D9] font-mono">4.6x</div>
          <div className="text-[10px] text-violet-600 font-semibold">Goal: 3.5x achieved</div>
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-600">Search Ads Quality Score</span>
          <span className="font-bold text-neutral-900 font-mono">9.8 / 10</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full bg-[#6D28D9] rounded-full" style={{ width: '98%' }} />
        </div>
      </div>
    </div>
  );
};
