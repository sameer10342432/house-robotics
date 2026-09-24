import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Layers, 
  FileText, 
  Globe, 
  BarChart3, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  Sparkles,
  Link,
  Code,
  Compass
} from 'lucide-react';

export const TechnicalSeoVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Technical SEO Crawler</div>
            <div className="text-[10px] text-neutral-500 font-mono">1,482 URLs Crawled · 0 Errors</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          Health: 99/100
        </span>
      </div>

      {/* Crawl Tree Structure & Core Web Vitals */}
      <div className="space-y-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800">Largest Contentful Paint (LCP)</span>
          </div>
          <span className="font-bold text-emerald-600">0.78s (Good)</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800">Cumulative Layout Shift (CLS)</span>
          </div>
          <span className="font-bold text-emerald-600">0.002 (Good)</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800">Schema.org JSON-LD Validation</span>
          </div>
          <span className="font-bold text-[#6D28D9]">Verified 100%</span>
        </div>
      </div>

      <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between border-t border-[#E9E7F2]">
        <span>Crawl Budget Efficiency: 99.4%</span>
        <span className="text-violet-700 font-bold">XML Sitemap Synced</span>
      </div>
    </div>
  );
};

export const OnPageSeoVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">On-Page Optimizer & Silo</div>
            <div className="text-[10px] text-neutral-500 font-mono">Topical Relevance Score</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#6D28D9] bg-violet-50 px-2 py-0.5 rounded-full">
          Grade: A+
        </span>
      </div>

      {/* Simulated Meta and Content Optimization */}
      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
          <div className="text-[10px] font-mono text-neutral-400">PAGE TITLE & SERP SNIPPET</div>
          <div className="font-bold text-blue-600 truncate">
            Top Enterprise B2B Solutions | House Robotics Architecture
          </div>
          <div className="text-[11px] text-neutral-500 line-clamp-2">
            Discover scalable enterprise solutions engineered for maximum velocity, high conversion, and zero legacy bloat...
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white border border-[#E9E7F2] text-center">
            <div className="text-[10px] text-neutral-500">Keyword Density</div>
            <div className="text-sm font-bold text-neutral-900 mt-0.5">1.8% (Optimal)</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E9E7F2] text-center">
            <div className="text-[10px] text-neutral-500">Internal Context Links</div>
            <div className="text-sm font-bold text-emerald-600 mt-0.5">14 High-Intent</div>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between border-t border-[#E9E7F2]">
        <span>Semantic Entities: 38 Extracted</span>
        <span className="text-blue-600 font-bold">Search Intent Match</span>
      </div>
    </div>
  );
};

export const KeywordResearchVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Commercial Intent Matrix</div>
            <div className="text-[10px] text-neutral-500 font-mono">High-Ticket Search Queries</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          Compounding
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {[
          { query: 'enterprise ai automation agency', vol: '6,400', cpc: '$14.20', intent: 'Commercial' },
          { query: 'b2b custom web development', vol: '12,800', cpc: '$18.50', intent: 'Transactional' },
          { query: 'google maps ranking optimization', vol: '8,200', cpc: '$9.80', intent: 'Commercial' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-900">{item.query}</div>
              <div className="text-[10px] text-neutral-500 font-mono">Vol: {item.vol}/mo · Est. CPC: {item.cpc}</div>
            </div>
            <span className="text-[10px] font-bold text-[#6D28D9] bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-md">
              {item.intent}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between border-t border-[#E9E7F2]">
        <span>Zero-Volume Bleed Removed</span>
        <span className="text-violet-700 font-bold">94% Commercial Match</span>
      </div>
    </div>
  );
};

export const LinkBuildingVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
            <Link className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Authoritative Digital PR Network</div>
            <div className="text-[10px] text-neutral-500 font-mono">White-Hat Contextual Placements</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
          Avg DR: 78
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {[
          { outlet: 'Tier-1 Industry Tech Publication', dr: 'DR 86', type: 'Editorial Feature', status: 'Live Backlink' },
          { outlet: 'Global Business Review Portal', dr: 'DR 81', type: 'Case Study Citation', status: 'Live Backlink' },
          { outlet: 'Specialized Enterprise Journal', dr: 'DR 74', type: 'Executive Interview', status: 'Live Backlink' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-900">{item.outlet}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{item.type}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-neutral-800 bg-white border border-neutral-200 px-1.5 py-0.5 rounded">
                {item.dr}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between border-t border-[#E9E7F2]">
        <span>Spam Score: 0% Guaranteed</span>
        <span className="text-pink-600 font-bold">100% DoFollow Contextual</span>
      </div>
    </div>
  );
};
