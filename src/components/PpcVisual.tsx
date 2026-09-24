import React, { useState } from 'react';
import { TrendingUp, Target, DollarSign, BarChart2, Filter, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const PpcVisual: React.FC = () => {
  const [budget, setBudget] = useState<number>(3500);

  // Dynamic interactive calculation based on budget slider
  const estClicks = Math.round(budget / 1.45);
  const estConversions = Math.round(estClicks * 0.054);
  const estPipeline = (estConversions * 320).toLocaleString();

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Google Ads & PPC Performance Cockpit</div>
            <div className="text-[11px] text-neutral-500">Search & Shopping Auction Attribution (Illustrative)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            Average ROAS: 4.4x
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            Avg. CTR: 6.8%
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Campaign Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
            <div className="text-[11px] font-medium text-neutral-500">Click-Through Rate</div>
            <div className="text-xl font-extrabold text-neutral-900 mt-1 tabular-nums">7.14%</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +2.4% vs Industry
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
            <div className="text-[11px] font-medium text-neutral-500">Cost Per Click (CPC)</div>
            <div className="text-xl font-extrabold text-neutral-900 mt-1 tabular-nums">$1.45</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-0.5" /> -32% Cost Reduction
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
            <div className="text-[11px] font-medium text-neutral-500">Conversion Rate</div>
            <div className="text-xl font-extrabold text-neutral-900 mt-1 tabular-nums">5.4%</div>
            <div className="text-[11px] text-violet-700 font-bold flex items-center mt-1">
              High Buyer Intent
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
            <div className="text-[11px] font-medium text-neutral-500">Return On Ad Spend</div>
            <div className="text-xl font-extrabold text-[#6D28D9] mt-1 tabular-nums">4.4x</div>
            <div className="text-[11px] text-cyan-600 font-bold flex items-center mt-1">
              Compounding Lift
            </div>
          </div>
        </div>

        {/* Interactive Budget & Return Forecaster */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7FF] border border-[#E9E7F2] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-neutral-900">Interactive Ad Spend & Yield Forecaster</div>
              <div className="text-[11px] text-neutral-500">Simulate monthly ad spend against targeted commercial search inventory</div>
            </div>
            <div className="text-sm font-extrabold text-[#6D28D9] font-mono">
              ${budget.toLocaleString()} / month
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-1">
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#6D28D9] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>$1,000</span>
              <span>$5,000</span>
              <span>$10,000</span>
              <span>$15,000+</span>
            </div>
          </div>

          {/* Forecasted Outputs */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-neutral-200/80">
            <div className="text-center p-2 rounded-xl bg-white border border-[#E9E7F2]">
              <div className="text-[10px] text-neutral-500">Projected Clicks</div>
              <div className="text-sm sm:text-base font-bold text-neutral-900 tabular-nums">~{estClicks.toLocaleString()}</div>
            </div>
            <div className="text-center p-2 rounded-xl bg-white border border-[#E9E7F2]">
              <div className="text-[10px] text-neutral-500">Target Inbound Leads</div>
              <div className="text-sm sm:text-base font-bold text-violet-700 tabular-nums">~{estConversions}</div>
            </div>
            <div className="text-center p-2 rounded-xl bg-white border border-[#E9E7F2]">
              <div className="text-[10px] text-neutral-500">Estimated Pipeline</div>
              <div className="text-sm sm:text-base font-bold text-emerald-600 tabular-nums">${estPipeline}</div>
            </div>
          </div>
        </div>

        {/* Campaign Hierarchy Preview */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-neutral-800">Laser-Focused Campaign Architecture</div>
          <div className="space-y-1.5 text-xs">
            {[
              { name: 'Search_HighIntent_ExactMatch', type: 'Bottom-of-Funnel', cpa: '$18.40', status: 'Optimal' },
              { name: 'Shopping_SmartAssetGroup_TargetROAS', type: 'Product Feed', cpa: '$12.20', status: 'Optimal' },
              { name: 'Remarketing_DynamicVisitors_30Day', type: 'Warm Retargeting', cpa: '$9.10', status: 'Optimal' },
            ].map((camp, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-neutral-900 font-medium">{camp.name}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-neutral-500">{camp.type}</span>
                  <span className="font-mono font-bold text-neutral-800">CPA: {camp.cpa}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">
                    {camp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
