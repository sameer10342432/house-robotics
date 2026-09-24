import React, { useState } from 'react';
import { 
  Users, 
  Bot, 
  Database, 
  Mail, 
  CalendarCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  MessageSquare,
  HelpCircle,
  Headphones,
  Sliders
} from 'lucide-react';

export const LeadToCalendarWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const nodes = [
    { id: 0, label: 'Website Visitor', desc: 'High-intent prospect lands on site', icon: Users, tag: 'Inbound' },
    { id: 1, label: 'AI Assistant', desc: 'Evaluates project scope & budget', icon: Bot, tag: 'Evaluation' },
    { id: 2, label: 'Lead Capture', desc: 'Enriches company & verified email', icon: Sparkles, tag: 'Enrichment' },
    { id: 3, label: 'CRM Sync', desc: 'Auto-creates HubSpot / Salesforce deal', icon: Database, tag: 'Pipeline' },
    { id: 4, label: 'Email Follow-up', desc: 'Contextual case study dispatched', icon: Mail, tag: 'Outreach' },
    { id: 5, label: 'Sales Team', desc: 'Direct calendar booking on WhatsApp', icon: CalendarCheck, tag: 'Closing' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_12px_35px_rgba(109,40,217,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E7F2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider">
              Workflow Blueprint 01 · Live Pipeline
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-neutral-900 mt-1">
            Inbound Lead to Sales Calendar Automation
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold w-max">
          Response Latency: &lt; 30s
        </div>
      </div>

      {/* Connected Nodes Diagram (Responsive Horizontal / Vertical) */}
      <div className="relative">
        {/* Desktop connection line */}
        <div className="hidden lg:block absolute top-7 left-6 right-6 h-0.5 bg-gradient-to-r from-violet-300 via-blue-300 to-emerald-400 z-0" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={node.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 group ${
                  isSelected
                    ? 'bg-[#FAF9FF] border-[#6D28D9] shadow-md ring-2 ring-[#6D28D9]/20 -translate-y-1'
                    : 'bg-white border-[#E9E7F2] hover:border-violet-300 hover:bg-[#FAF9FF]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-[#6D28D9] text-white shadow-xs' 
                        : 'bg-[#F3F0FF] text-[#6D28D9] group-hover:bg-[#EDE9FE] group-hover:text-[#5B21B6] border border-violet-100/60'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-neutral-900 leading-snug">
                    {node.label}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-neutral-400">{node.tag}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-ping" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Panel */}
      <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="text-[11px] font-bold text-[#6D28D9] uppercase tracking-wider">
            Active Node Detail: {nodes[activeStep].label}
          </div>
          <div className="text-xs text-neutral-700 font-medium">
            {nodes[activeStep].desc}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-white px-3 py-1.5 rounded-xl border border-[#E9E7F2] shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Webhook Triggered Zero-Data-Entry</span>
        </div>
      </div>
    </div>
  );
};

export const SupportCopilotWorkflow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'triage' | 'escalation'>('triage');

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] p-6 sm:p-7 shadow-[0_12px_35px_rgba(109,40,217,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E7F2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              Workflow Blueprint 02 · 24/7 Support Desk
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-neutral-900 mt-1">
            24/7 AI Customer Support &amp; Instant Escalation
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold w-max">
          92% Autonomous Resolution
        </div>
      </div>

      {/* Support Visual Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {[
          { step: '01', title: 'Customer Query', desc: 'WhatsApp, Web Chat or Email ticket submitted', icon: MessageSquare },
          { step: '02', title: 'Semantic Triage', desc: 'Classifies intent, sentiment & account tier', icon: HelpCircle },
          { step: '03', title: 'RAG Knowledge Base', desc: 'Synthesizes accurate solution from company docs', icon: Sparkles },
          { step: '04', title: 'Instant Hand-off', desc: 'Routes complex issues with full chat summary', icon: Headphones },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] flex flex-col justify-between text-left hover:border-violet-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E7F2] text-[#6D28D9] flex items-center justify-center shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400">
                    {item.step}
                  </span>
                </div>
                <div className="text-xs font-bold text-neutral-900">{item.title}</div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-snug">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolution Guarantee Strip */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF9FF] to-[#F3F0FF] border border-violet-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium text-neutral-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No hallucinated pricing · Strict company policy guardrails enforced</span>
        </div>
        <div className="font-mono text-neutral-500 text-[11px]">
          Target Resolution: <strong>&lt; 45 Seconds</strong>
        </div>
      </div>
    </div>
  );
};
