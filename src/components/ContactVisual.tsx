import React from 'react';
import { 
  MessageSquare, 
  Mail, 
  PhoneCall, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  Clock,
  Zap,
  Globe
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const ContactVisual: React.FC = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-[#FAF9FF] via-white to-violet-50/50 rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_15px_40px_rgba(109,40,217,0.05)] overflow-hidden select-none">
      {/* Decorative background circle */}
      <div 
        aria-hidden="true" 
        className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" 
      />

      <div className="flex items-center justify-between pb-4 border-b border-[#E9E7F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Direct Strategy Communication</div>
            <div className="text-[10px] text-neutral-500">Fast human response within 24 business hours</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </span>
      </div>

      {/* Visual Communication Flow Diagram */}
      <div className="py-6 space-y-3">
        {/* Step 1: Inbound Discovery */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#6D28D9] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-neutral-900">1. Discovery & Strategy Audit</div>
            <div className="text-[11px] text-neutral-500 truncate">We analyze your rankings, site speed & growth gaps.</div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
            Free 30m
          </span>
        </div>

        {/* Step 2: Custom Blueprint */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-neutral-900">2. Tailored Growth Architecture</div>
            <div className="text-[11px] text-neutral-500 truncate">Concrete milestone roadmaps with zero fluff or vanity fees.</div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
            Custom
          </span>
        </div>

        {/* Step 3: Direct WhatsApp / Sprint Delivery */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E9E7F2] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-neutral-900">3. Direct Channel Collaboration</div>
            <div className="text-[11px] text-neutral-500 truncate">Direct access to the engineers & marketers doing the work.</div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            Dedicated
          </span>
        </div>
      </div>

      {/* Official Credentials Banner */}
      <div className="p-4 rounded-2xl bg-[#F3F0FF]/80 border border-violet-100 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-neutral-900">Direct Partner Access</div>
          <div className="text-[11px] text-neutral-600 font-mono">WhatsApp: {AGENCY_INFO.whatsapp}</div>
        </div>
        <a
          href={AGENCY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-xl bg-[#6D28D9] text-white text-[11px] font-bold hover:bg-[#5B21B6] transition-colors flex items-center gap-1 shadow-xs"
        >
          <span>Chat Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
