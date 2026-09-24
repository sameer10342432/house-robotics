import React, { useState } from 'react';
import { Share2, Heart, MessageCircle, Send, Bookmark, Calendar, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export const SocialVisual: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'instagram' | 'linkedin' | 'calendar'>('instagram');

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Social Channel & Creative Architecture</div>
            <div className="text-[11px] text-neutral-500">Multi-Channel Organic & Performance Distribution</div>
          </div>
        </div>

        {/* Channel Switcher */}
        <div className="bg-neutral-100 p-0.5 rounded-xl flex items-center text-xs">
          <button
            onClick={() => setActiveChannel('instagram')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeChannel === 'instagram' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Instagram / Meta
          </button>
          <button
            onClick={() => setActiveChannel('linkedin')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeChannel === 'linkedin' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            LinkedIn B2B
          </button>
          <button
            onClick={() => setActiveChannel('calendar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeChannel === 'calendar' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Content Calendar
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Instagram / Meta Showcase */}
        {activeChannel === 'instagram' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left simulated mobile post */}
            <div className="md:col-span-5 max-w-[280px] mx-auto w-full bg-white rounded-2xl border border-[#E9E7F2] shadow-sm overflow-hidden text-xs">
              <div className="p-3 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    H
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 text-[11px]">house.robotics</div>
                    <div className="text-[9px] text-neutral-400">Sponsored · Growth Case</div>
                  </div>
                </div>
                <span className="text-neutral-400">•••</span>
              </div>

              {/* Post Creative Card */}
              <div className="h-56 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-5 flex flex-col justify-between text-white relative">
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold w-max">
                  <Sparkles className="w-3 h-3 text-cyan-300" /> Case Study
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight leading-tight">+210%</div>
                  <div className="text-xs font-medium text-purple-100">Local Maps Visibility & Phone Leads</div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-200 border-t border-white/20 pt-2">
                  <span>House Robotics Agency</span>
                  <span className="font-bold">Swipe →</span>
                </div>
              </div>

              {/* Actions & Caption */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-neutral-700">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <MessageCircle className="w-4 h-4" />
                    <Send className="w-4 h-4" />
                  </div>
                  <Bookmark className="w-4 h-4 text-neutral-500" />
                </div>
                <div className="text-[11px] font-bold text-neutral-900">1,248 likes</div>
                <p className="text-[11px] text-neutral-600 leading-snug">
                  <strong className="text-neutral-900">house.robotics</strong> How we helped a multi-location brand capture 340+ five-star reviews...
                </p>
              </div>
            </div>

            {/* Right side analytics */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8F7FF] border border-[#E9E7F2] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span>Creative Performance Benchmarks</span>
                  <span className="text-emerald-600 font-semibold flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> High Engagement
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-[#E9E7F2]">
                    <div className="text-[10px] text-neutral-500">Save Rate</div>
                    <div className="text-lg font-bold text-neutral-900 tabular-nums">8.4%</div>
                    <div className="text-[10px] text-emerald-600 font-medium">3x above baseline</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E9E7F2]">
                    <div className="text-[10px] text-neutral-500">Profile Visits</div>
                    <div className="text-lg font-bold text-violet-700 tabular-nums">4,820</div>
                    <div className="text-[10px] text-neutral-500">High intent visitors</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E9E7F2] text-xs text-neutral-600 space-y-1.5">
                  <div className="font-semibold text-neutral-900">Creative Production Workflow</div>
                  <p className="text-[11px]">
                    Every post is engineered with high-contrast thumb-stopping typography, brand-aligned color grading, and concrete value propositions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn B2B */}
        {activeChannel === 'linkedin' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#F8F7FF] border border-[#E9E7F2] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs">
                    in
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">B2B Thought Leadership Carousel</div>
                    <div className="text-[10px] text-neutral-500">Targeting VP Marketing & C-Suite Founders</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Avg. CTR: 4.8%
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E9E7F2] space-y-2 text-xs">
                <div className="font-bold text-neutral-900">
                  "Why your marketing team spends 20 hours a week on manual lead routing (and how to fix it)"
                </div>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  We audited 40 high-growth service businesses. Over 68% suffered lead decay because incoming inquiries waited more than 3 hours for a human response. Here is the automated AI architecture that solves it...
                </p>
                <div className="pt-2 flex items-center gap-4 text-[11px] text-neutral-400 border-t border-neutral-100">
                  <span>842 Reactions</span>
                  <span>146 Comments</span>
                  <span>94 Reposts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Calendar */}
        {activeChannel === 'calendar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-600" />
                <span>Structured Weekly Content Rhythm</span>
              </div>
              <span className="text-[11px] text-neutral-400">Pre-approved Sprints</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-violet-700 uppercase">
                  <span>Monday</span>
                  <span className="bg-violet-100 px-1.5 py-0.5 rounded">SEO Tear-Down</span>
                </div>
                <div className="font-bold text-neutral-900 text-xs">Technical Ranking Breakdown</div>
                <p className="text-[11px] text-neutral-500">Carousel analyzing domain authority growth in e-commerce.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-blue-700 uppercase">
                  <span>Wednesday</span>
                  <span className="bg-blue-100 px-1.5 py-0.5 rounded">AI Video Reel</span>
                </div>
                <div className="font-bold text-neutral-900 text-xs">Behind-The-Scenes Automation</div>
                <p className="text-[11px] text-neutral-500">60-second video demo of live webhook integrations.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-700 uppercase">
                  <span>Friday</span>
                  <span className="bg-emerald-100 px-1.5 py-0.5 rounded">Case Study</span>
                </div>
                <div className="font-bold text-neutral-900 text-xs">Client Revenue Transformation</div>
                <p className="text-[11px] text-neutral-500">Detailed metric breakdown with transparent before-and-after graphs.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
