import React, { useState } from 'react';
import { Search, ArrowUp, Globe, CheckCircle, BarChart2, ShieldCheck, Zap } from 'lucide-react';

export const SEOVisual: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<number>(0);

  const keywords = [
    { name: 'enterprise ai automation', vol: '12,400', difficulty: 'High', rank: '#1', change: '+14', cpc: '$9.20' },
    { name: 'digital marketing agency near me', vol: '24,100', difficulty: 'Medium', rank: '#2', change: '+19', cpc: '$14.50' },
    { name: 'custom react web development', vol: '8,800', difficulty: 'High', rank: '#1', change: '+8', cpc: '$11.80' },
    { name: 'local seo services google maps', vol: '15,600', difficulty: 'Low', rank: '#3', change: '+22', cpc: '$7.40' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Search Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Live Organic SERP Position Tracker</div>
            <div className="text-[11px] text-neutral-500">Google Search Network · Desktop & Mobile Indexed</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            Top 3 Rankings: 84%
          </span>
          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
            Core Web Vitals: 99
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Search Engine Result Card Simulation */}
        <div className="p-4 rounded-2xl bg-[#F8F7FF] border border-[#E9E7F2] space-y-2">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Globe className="w-3.5 h-3.5 text-violet-600" />
            <span className="font-medium text-neutral-800">https://www.yourdomain.com</span>
            <span className="text-neutral-400">›</span>
            <span className="text-neutral-500 font-mono text-[11px]">{keywords[selectedKeyword].name.replace(/\s+/g, '-')}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-violet-700 hover:underline cursor-pointer">
            Leading {keywords[selectedKeyword].name} — Scalable Digital Growth & Technical Precision
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Partner with House Robotics for enterprise-grade search engine optimization, guaranteed Core Web Vitals compliance, authoritative backlink acquisition, and predictable pipeline growth.
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle className="w-3 h-3" /> Rich Snippet Active
            </span>
            <span>·</span>
            <span>Site Links Indexed (4)</span>
            <span>·</span>
            <span className="font-semibold text-neutral-700">Verified Schema Markup</span>
          </div>
        </div>

        {/* Keyword Selection Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-neutral-800 flex items-center justify-between">
            <span>Rank Tracking Table (Click to Inspect)</span>
            <span className="text-[11px] font-normal text-neutral-400">Interactive live simulation</span>
          </div>
          <div className="space-y-2">
            {keywords.map((kw, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedKeyword(idx)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  selectedKeyword === idx
                    ? 'border-[#6D28D9] bg-[#F3F0FF] shadow-xs'
                    : 'border-[#E9E7F2] bg-white hover:bg-[#FAF9FF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                    selectedKeyword === idx ? 'bg-[#6D28D9] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-neutral-900">{kw.name}</div>
                    <div className="text-[11px] text-neutral-500">Vol: {kw.vol}/mo · Est. CPC: {kw.cpc}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-[#6D28D9] font-mono">{kw.rank}</div>
                    <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-end">
                      <ArrowUp className="w-2.5 h-2.5 mr-0.5" /> {kw.change} pos
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Technical Indicators */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Indexed Pages</div>
            <div className="text-base font-extrabold text-neutral-900 mt-0.5">100%</div>
            <div className="text-[10px] text-emerald-600 font-medium">Zero 404 Crawl Errors</div>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Domain Authority</div>
            <div className="text-base font-extrabold text-neutral-900 mt-0.5">72 / 100</div>
            <div className="text-[10px] text-violet-700 font-medium">+18 pts YoY</div>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] text-center">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">LCP Speed</div>
            <div className="text-base font-extrabold text-neutral-900 mt-0.5">0.72s</div>
            <div className="text-[10px] text-cyan-600 font-medium">Google Green Band</div>
          </div>
        </div>
      </div>
    </div>
  );
};
