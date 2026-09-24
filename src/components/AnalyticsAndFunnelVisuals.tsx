import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Filter, 
  Activity, 
  CheckCircle2, 
  Calendar,
  Layers,
  Sparkles,
  PieChart
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const AnalyticsDashboardVisual: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d'>('30d');

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] select-none text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Revenue &amp; Conversion Attribution</div>
            <div className="text-[10px] text-neutral-500 font-mono">Real-Time Data Pipeline (Illustrative)</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              timeRange === '30d' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-500'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              timeRange === '90d' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-500'
            }`}
          >
            Last 90 Days
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Closed Revenue</div>
          <div className="text-xl font-black text-neutral-950 font-mono mt-0.5">
            <AnimatedCounter value="$284.6K" />
          </div>
          <div className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +48.2% vs prev
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Qualified Leads</div>
          <div className="text-xl font-black text-[#6D28D9] font-mono mt-0.5">
            <AnimatedCounter value="142 Leads" />
          </div>
          <div className="text-[10px] font-bold text-violet-700 mt-0.5">
            High-ICP Threshold
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Avg. CPA</div>
          <div className="text-xl font-black text-neutral-900 font-mono mt-0.5">
            <AnimatedCounter value="$48.20" />
          </div>
          <div className="text-[10px] font-bold text-emerald-600 mt-0.5">
            -34% reduction
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2]">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Conversion Rate</div>
          <div className="text-xl font-black text-cyan-600 font-mono mt-0.5">
            <AnimatedCounter value="5.8%" />
          </div>
          <div className="text-[10px] font-bold text-cyan-700 mt-0.5">
            Sub-second UX lift
          </div>
        </div>
      </div>

      {/* Visual Chart Bars (Multi-Channel Mix) */}
      <div className="space-y-3 pt-2">
        <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Attribution Share by Acquisition Channel
        </div>
        {[
          { channel: 'High-Intent SEO Silos', share: 44, amount: '$125.2K', color: 'bg-violet-600' },
          { channel: 'Google Search & Shopping Ads', share: 31, amount: '$88.2K', color: 'bg-blue-600' },
          { channel: 'Meta & LinkedIn B2B Retargeting', share: 17, amount: '$48.3K', color: 'bg-cyan-500' },
          { channel: 'Automated Lifecycle Email', share: 8, amount: '$22.9K', color: 'bg-emerald-500' },
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800">{item.channel}</span>
              <span className="font-mono text-neutral-600 font-bold">{item.amount} ({item.share}%)</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.color} transition-all duration-700`}
                style={{ width: `${item.share}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LeadGenDashboardVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] select-none text-left">
      <div className="flex items-center justify-between pb-4 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">B2B Lead Generation Engine</div>
            <div className="text-[10px] text-neutral-500 font-mono">Automated Qualification Silo</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Sync Active
        </span>
      </div>

      {/* Funnel Stages */}
      <div className="space-y-3 my-5">
        {[
          { stage: '1. Inbound Traffic & Search Visits', count: '12,450', drop: '100%', bg: 'bg-[#F3F0FF] text-[#6D28D9]' },
          { stage: '2. High-Intent Form Submissions', count: '680', drop: '5.4% CVR', bg: 'bg-violet-100 text-violet-800' },
          { stage: '3. Autonomous AI Scored (ICP 85+)', count: '294', drop: '43.2% Qual.', bg: 'bg-blue-100 text-blue-800' },
          { stage: '4. Sales Consultations Booked', count: '118', drop: '40.1% Booked', bg: 'bg-emerald-100 text-emerald-800' },
        ].map((f, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] text-xs"
          >
            <div className="font-semibold text-neutral-800">{f.stage}</div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-neutral-900">{f.count}</span>
              <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${f.bg}`}>
                {f.drop}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF9FF] to-[#F3F0FF] border border-violet-100 flex items-center justify-between text-xs">
        <span className="text-neutral-600 font-medium">Pipeline Velocity:</span>
        <span className="font-bold text-[#6D28D9]">Average 18 Hours from Click to Qualified Demo</span>
      </div>
    </div>
  );
};
