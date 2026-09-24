import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  ThumbsUp,
  Repeat,
  Send,
  MoreHorizontal
} from 'lucide-react';

export const InstagramMockup: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(482);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_35px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* IG Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-500 p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-[#6D28D9]">
              HR
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
              <span>house_robotics</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <div className="text-[10px] text-neutral-400">Sponsored & Organic Mix</div>
          </div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-neutral-400" />
      </div>

      {/* Visual Creative Content Card */}
      <div className="relative aspect-square bg-gradient-to-br from-[#FAF9FF] via-violet-100/40 to-blue-50 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-violet-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-violet-100">
            Case Breakdown
          </span>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            +140% ROAS
          </span>
        </div>

        <div className="space-y-2 text-center my-auto">
          <h4 className="text-lg font-extrabold text-neutral-900 leading-snug tracking-tight">
            How We Rebuilt D2C Paid Funnels For 4.1x Return
          </h4>
          <p className="text-xs text-neutral-600">
            No bloated creative agencies. Pure data-backed video hooks and retargeting silos.
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-violet-200/50 text-[10px] text-neutral-500 font-mono">
          <span>Hook Rate: 48.2%</span>
          <span className="text-violet-700 font-bold">Swipe to Inspect →</span>
        </div>
      </div>

      {/* IG Action Bar */}
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLike}
              className="text-neutral-700 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <MessageCircle className="w-5 h-5 text-neutral-700" />
            <Share2 className="w-5 h-5 text-neutral-700" />
          </div>
          <Bookmark className="w-5 h-5 text-neutral-700" />
        </div>

        <div className="text-xs font-bold text-neutral-900">
          {likesCount.toLocaleString()} likes
        </div>

        <div className="text-xs text-neutral-700 leading-relaxed">
          <strong className="text-neutral-900 mr-1.5">house_robotics</strong>
          Stop burning budget on generic ads. Here is the exact creative framework we use to scale brands...
        </div>
      </div>
    </div>
  );
};

export const LinkedInMockup: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_35px_rgba(109,40,217,0.06)] p-5 space-y-3">
      {/* LinkedIn Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            HR
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">House Robotics</div>
            <div className="text-[10px] text-neutral-500">14,800+ followers · Technology & Growth</div>
            <div className="text-[10px] text-neutral-400 font-mono">1d · Edited · 🌐</div>
          </div>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
          + Follow
        </button>
      </div>

      {/* Post Text */}
      <p className="text-xs text-neutral-700 leading-relaxed">
        Why most B2B websites fail at lead generation: They treat their website as an online brochure rather than an automated qualification machine.
      </p>

      {/* Carousel Slide Card */}
      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
          <span>SLIDE 03 / 08</span>
          <span className="text-blue-600 font-bold">B2B Growth Engine</span>
        </div>
        <h5 className="text-sm font-bold text-neutral-900">
          The 3 Pillars of Frictionless Inbound Pipelines
        </h5>
        <div className="space-y-1 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Sub-second page loading speed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Autonomous AI qualification (24/7)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Instant calendar & CRM synchronization</span>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px]">👍</span>
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">💡</span>
          <span className="ml-1 font-semibold text-neutral-800">328</span>
        </div>
        <span>42 comments · 18 reposts</span>
      </div>
    </div>
  );
};

export const ContentCalendarVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 shadow-[0_15px_40px_rgba(109,40,217,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Structured Monthly Content Matrix</div>
            <div className="text-[10px] text-neutral-500">Multichannel Batch Calendar</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">
          24 Posts Scheduled
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-pink-600">INSTAGRAM / REELS</span>
            <span className="text-neutral-400">Tue & Fri</span>
          </div>
          <div className="text-xs font-bold text-neutral-900">High-Retention Hooks</div>
          <p className="text-[11px] text-neutral-500">Short video breakdowns explaining industry secrets and ROI benchmarks.</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-blue-600">LINKEDIN B2B</span>
            <span className="text-neutral-400">Mon, Wed, Thu</span>
          </div>
          <div className="text-xs font-bold text-neutral-900">Authority Carousels</div>
          <p className="text-[11px] text-neutral-500">Detailed frameworks and data slides targeting executive decision makers.</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-purple-600">COMMUNITY DM</span>
            <span className="text-neutral-400">Daily 24/7</span>
          </div>
          <div className="text-xs font-bold text-neutral-900">Inbound Lead Capture</div>
          <p className="text-[11px] text-neutral-500">Automated keyword triggers route warm comments directly to consultation links.</p>
        </div>
      </div>
    </div>
  );
};
