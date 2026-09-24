import React from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  Navigation, 
  ShieldCheck, 
  MessageSquare,
  Clock
} from 'lucide-react';

export const GbpProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Google Business Profile (GBP)</div>
            <div className="text-[10px] text-neutral-500 font-mono">Verified Primary Listing</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> 100% Optimized
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-neutral-900">Apex Specialty Care & Wellness</h4>
            <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-0.5 font-bold">
              <span>5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-neutral-500 font-normal">(412 reviews) · Medical Center</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#6D28D9] bg-violet-50 px-2 py-1 rounded-lg">
            Rank #1
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Open 24/7 Mon–Sun</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span>+1 (555) 438-9201</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" /> Directions
          </button>
          <button className="flex-1 py-2 rounded-xl bg-white border border-[#E9E7F2] text-neutral-800 text-xs font-bold hover:bg-[#FAF9FF] transition-colors flex items-center justify-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#E9E7F2] pt-2">
        <span>Photo Geotagging: Active</span>
        <span className="text-blue-600 font-bold">Weekly Posts Scheduled</span>
      </div>
    </div>
  );
};

export const LocalCitationsVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">NAP Citation Synchronization</div>
            <div className="text-[10px] text-neutral-500">65+ Authoritative Directories</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
          100% NAP Match
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {[
          { directory: 'Apple Maps / Siri Suggestions', status: 'Verified & Synced', latency: 'Instant' },
          { directory: 'Bing Places & Microsoft Copilot', status: 'Verified & Synced', latency: 'Instant' },
          { directory: 'Yelp & Local Chamber Network', status: 'Verified & Synced', latency: 'Instant' },
          { directory: 'YellowPages & Regional Healthcare Index', status: 'Verified & Synced', latency: 'Instant' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center justify-between">
            <div className="font-semibold text-neutral-900">{item.directory}</div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#E9E7F2] pt-2">
        <span>Duplicate Suppressions: 18 Removed</span>
        <span className="text-violet-700 font-bold">Zero NAP Conflict</span>
      </div>
    </div>
  );
};

export const ReviewEngineVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Automated Review Generation Engine</div>
            <div className="text-[10px] text-neutral-500">SMS & Email Post-Visit Trigger</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          +64 Reviews/mo
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-neutral-900">SMS Trigger: "How was your appointment today?"</span>
          <span className="text-[10px] font-mono text-neutral-400">Delivered</span>
        </div>
        <p className="text-[11px] text-neutral-600">
          Happy customers are automatically routed to one-click Google review submission, cementing your 5-star local dominance.
        </p>
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
            Response Rate: 34%
          </span>
          <span className="text-neutral-500 text-[11px]">Avg Rating Given: 4.9★</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#E9E7F2] pt-2">
        <span>Negative Feedback Catch Mechanism</span>
        <span className="text-emerald-600 font-bold">Reputation Guarded</span>
      </div>
    </div>
  );
};
