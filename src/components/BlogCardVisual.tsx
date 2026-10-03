import React from 'react';
import { 
  Search, 
  Cpu, 
  Code, 
  TrendingUp, 
  Globe, 
  Zap 
} from 'lucide-react';

interface BlogCardVisualProps {
  category: string;
  title: string;
  image?: string;
}

export const BlogCardVisual: React.FC<BlogCardVisualProps> = ({ category, title, image }) => {
  const [imageError, setImageError] = React.useState(false);

  // If a valid image is provided and hasn't errored, display cover image
  if (image && !imageError) {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#E9E7F2] bg-[#0A071B] group shadow-inner">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Category Pill Tag */}
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-bold text-white shadow-xs">
          {category}
        </div>

        {/* Bottom Title Substring */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium truncate drop-shadow">
          {title}
        </div>
      </div>
    );
  }

  const normCategory = category.toLowerCase();

  if (normCategory.includes('seo') || normCategory.includes('search')) {
    return (
      <div className="relative w-full h-40 bg-gradient-to-br from-[#FAF9FF] via-white to-violet-50/60 rounded-2xl border border-[#E9E7F2] p-3.5 overflow-hidden flex flex-col justify-between group-hover:border-violet-300 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#E9E7F2] text-[10px] font-bold text-violet-700">
            <Search className="w-3 h-3" />
            <span>Search Analytics</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +142%
          </span>
        </div>

        <div className="space-y-1.5 my-auto">
          <div className="h-6 rounded-lg bg-white border border-[#E9E7F2] px-2 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] text-neutral-600 truncate font-mono">ai overviews entity authority</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-violet-100 overflow-hidden">
              <div className="h-full w-4/5 bg-[#6D28D9] rounded-full" />
            </div>
            <span className="text-[10px] font-mono font-bold text-neutral-700">Pos #1</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1 border-t border-[#E9E7F2]/60">
          <span>Core Web Vitals: 99/100</span>
          <span className="text-violet-600 font-bold">Topical Silo</span>
        </div>
      </div>
    );
  }

  if (normCategory.includes('ai') || normCategory.includes('automation')) {
    return (
      <div className="relative w-full h-40 bg-gradient-to-br from-[#FAF9FF] via-white to-cyan-50/60 rounded-2xl border border-[#E9E7F2] p-3.5 overflow-hidden flex flex-col justify-between group-hover:border-cyan-300 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#E9E7F2] text-[10px] font-bold text-cyan-700">
            <Cpu className="w-3 h-3" />
            <span>AI Neural Pipeline</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
            Autonomous
          </span>
        </div>

        <div className="flex items-center justify-between my-auto px-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100/70 border border-violet-200 flex items-center justify-center text-[#6D28D9] shadow-xs">
            <Globe className="w-4 h-4" />
          </div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-violet-300 to-cyan-400 mx-1 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3F0FF] border-2 border-violet-400 flex items-center justify-center text-[#6D28D9] shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-400 to-emerald-300 mx-1" />
          <div className="w-8 h-8 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1 border-t border-[#E9E7F2]/60">
          <span>Latency: &lt;30s</span>
          <span className="text-cyan-600 font-bold">CRM Synced</span>
        </div>
      </div>
    );
  }

  if (normCategory.includes('web') || normCategory.includes('code') || normCategory.includes('dev')) {
    return (
      <div className="relative w-full h-40 bg-gradient-to-br from-[#FAF9FF] via-white to-blue-50/60 rounded-2xl border border-[#E9E7F2] p-3.5 overflow-hidden flex flex-col justify-between group-hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#E9E7F2] text-[10px] font-bold text-blue-700">
            <Code className="w-3 h-3" />
            <span>High-Speed Architecture</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            &lt; 0.8s FCP
          </span>
        </div>

        <div className="p-2 rounded-xl bg-neutral-900 text-white font-mono text-[9px] my-auto space-y-0.5 shadow-sm">
          <div className="flex items-center gap-1 text-neutral-500 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] text-neutral-400 ml-1">app.renderSpeed()</span>
          </div>
          <div className="text-violet-300">const speed = await optimizeReactBundle();</div>
          <div className="text-emerald-400">return LighthouseScore(100);</div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1 border-t border-[#E9E7F2]/60">
          <span>TypeScript + React</span>
          <span className="text-blue-600 font-bold">100 Core Web Vitals</span>
        </div>
      </div>
    );
  }

  // Paid Advertising / PPC / Social default
  return (
    <div className="relative w-full h-40 bg-gradient-to-br from-[#FAF9FF] via-white to-pink-50/60 rounded-2xl border border-[#E9E7F2] p-3.5 overflow-hidden flex flex-col justify-between group-hover:border-violet-300 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#E9E7F2] text-[10px] font-bold text-pink-700">
          <TrendingUp className="w-3 h-3" />
          <span>Paid Performance</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#6D28D9] bg-violet-50 px-2 py-0.5 rounded-full">
          ROAS 4.2x
        </span>
      </div>

      <div className="space-y-1.5 my-auto">
        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-neutral-600">
          <span>Google Search Auction</span>
          <span className="text-violet-700">CPA -38%</span>
        </div>
        <div className="grid grid-cols-4 gap-1 h-7 items-end">
          <div className="bg-violet-200 h-3 rounded-t" />
          <div className="bg-violet-300 h-4 rounded-t" />
          <div className="bg-violet-400 h-5 rounded-t" />
          <div className="bg-[#6D28D9] h-7 rounded-t" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1 border-t border-[#E9E7F2]/60">
        <span>Negative Keyword Shield</span>
        <span className="text-pink-600 font-bold">High Intent</span>
      </div>
    </div>
  );
};
