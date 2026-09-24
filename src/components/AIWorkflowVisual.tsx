import React, { useState } from 'react';
import { 
  Cpu, 
  ArrowRight, 
  Check, 
  Play, 
  Zap, 
  Database, 
  Mail, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Bot
} from 'lucide-react';

export const AIWorkflowVisual: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'lead' | 'chat'>('lead');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(2);

  const leadSteps = [
    { id: 1, title: 'Inbound Inquiry', desc: 'Form or lead magnet submit', icon: Users, role: 'Trigger' },
    { id: 2, title: 'AI Qualification', desc: 'Score budget, urgency & ICP', icon: Bot, role: 'Decision' },
    { id: 3, title: 'CRM Synchronization', desc: 'Sync contact & tags to HubSpot', icon: Database, role: 'Data' },
    { id: 4, title: 'Tailored Outreach', desc: 'Dynamic AI email drafted', icon: Mail, role: 'Action' },
    { id: 5, title: 'Sales Rep Alert', desc: 'Calendar invite via WhatsApp', icon: CheckCircle2, role: 'Handoff' },
  ];

  const chatSteps = [
    { id: 1, title: 'Site Visitor Enters', desc: 'High-intent buyer lands', icon: Users, role: 'Trigger' },
    { id: 2, title: 'AI Copilot Engage', desc: 'Real-time contextual answer', icon: MessageSquare, role: 'Response' },
    { id: 3, title: 'Contact Capture', desc: 'Verified phone & company', icon: Sparkles, role: 'Capture' },
    { id: 4, title: 'Workflow Trigger', desc: 'Pushes into pipeline silo', icon: Zap, role: 'Automation' },
    { id: 5, title: 'Closed Opportunity', desc: 'Booked consultation call', icon: CheckCircle2, role: 'Conversion' },
  ];

  const currentSteps = activeWorkflow === 'lead' ? leadSteps : chatSteps;

  const handleSimulate = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentSteps.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 700);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E9E7F2] shadow-[0_15px_40px_rgba(109,40,217,0.06)] overflow-hidden">
      {/* Visual Header */}
      <div className="p-4 sm:p-5 border-b border-[#E9E7F2] bg-[#FAF9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Automated Pipeline Engine</div>
            <div className="text-[11px] text-neutral-500">Autonomous 24/7 Agent Orchestration</div>
          </div>
        </div>

        {/* Workflow Switcher & Run Button */}
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-0.5 rounded-xl flex items-center text-xs">
            <button
              onClick={() => { setActiveWorkflow('lead'); setCurrentStepIndex(2); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeWorkflow === 'lead' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Lead to Sales
            </button>
            <button
              onClick={() => { setActiveWorkflow('chat'); setCurrentStepIndex(2); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeWorkflow === 'chat' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Visitor to Demo
            </button>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
          >
            <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Graph Flow */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Node Line / Progress Bar */}
        <div className="relative">
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-1 bg-neutral-100 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (currentSteps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
            {currentSteps.map((item, idx) => {
              const Icon = item.icon;
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#6D28D9] bg-[#FAF9FF] shadow-[0_8px_20px_rgba(109,40,217,0.12)] ring-2 ring-[#6D28D9]/20'
                      : isPast
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-[#E9E7F2] bg-white opacity-80 hover:opacity-100 hover:bg-[#FAF9FF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-[#6D28D9] text-white'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {isPast ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 leading-snug">{item.title}</h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{item.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-neutral-400">{item.role}</span>
                    {isCurrent && (
                      <span className="text-violet-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-ping" /> Active
                      </span>
                    )}
                    {isPast && <span className="text-emerald-600 font-bold">Done</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Preview Card */}
        <div className="p-4 rounded-2xl bg-[#F8F7FF] border border-[#E9E7F2] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E9E7F2] text-[#6D28D9] flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">
                Current Execution: {currentSteps[currentStepIndex].title}
              </div>
              <div className="text-[11px] text-neutral-600">
                Payload parsed with 99.8% precision · Zero manual human intervention required
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs w-full md:w-auto justify-end">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E9E7F2] font-mono text-[11px] text-neutral-700">
              Latency: <strong>&lt; 380ms</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-violet-100 text-violet-800 font-bold text-[11px]">
              Reliability: 99.99%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
