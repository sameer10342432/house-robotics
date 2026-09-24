import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  Cpu, 
  Code, 
  CheckCircle2, 
  Clock, 
  Tag
} from 'lucide-react';
import { BLOG_POSTS } from '../data/agencyData';
import { BlogPost } from '../types';

interface BlogHeroVisualProps {
  onSelectPost?: (post: BlogPost) => void;
}

export const BlogHeroVisual: React.FC<BlogHeroVisualProps> = ({ onSelectPost }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = BLOG_POSTS[activeIdx] || BLOG_POSTS[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none mt-8">
      {/* Soft gradient aura */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -right-8 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-8 -left-8 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Floating Pill - Top Left */}
      <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
        <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Research Desk</div>
          <div className="text-xs font-extrabold text-neutral-900">Weekly Engineering Papers</div>
        </div>
      </div>

      {/* Main Console Window */}
      <div className="relative z-10 bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.07)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-b border-[#E9E7F2] bg-[#FAF9FF] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="text-xs font-mono font-bold text-neutral-500 ml-2">
              HouseRobotics::Editorial_Intelligence_Feed
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {BLOG_POSTS.slice(0, 4).map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                  activeIdx === idx
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 bg-white border border-[#E9E7F2]'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Insight Preview */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3.5 text-left">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-[#6D28D9] bg-[#F3F0FF] px-2.5 py-0.5 rounded-md border border-violet-100">
                {featured.category}
              </span>
              <span className="text-neutral-400 font-mono">{featured.date}</span>
              <span className="text-neutral-300">·</span>
              <span className="flex items-center gap-1 text-neutral-500 font-mono text-[11px]">
                <Clock className="w-3 h-3" /> {featured.readTime}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-snug">
              {featured.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {featured.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#6D28D9]">
              <span className="text-neutral-400 font-normal">Authored by {featured.author}</span>
            </div>
          </div>

          {/* Quick Stats Pill Panel */}
          <div className="lg:col-span-4 bg-[#FAF9FF] p-5 rounded-2xl border border-[#E9E7F2] space-y-3">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-left">
              Key Focus Areas
            </div>
            <div className="space-y-2 text-xs text-neutral-700 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Generative AI Search Overviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sub-Second React 19 Stacks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Autonomous CRM Inbound Pipelines</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200/60 text-left">
              <span className="text-[11px] text-neutral-500">
                Peer-reviewed by Senior Full-Stack Engineers &amp; Search Strategists
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
