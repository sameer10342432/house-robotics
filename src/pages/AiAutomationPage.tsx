import React from 'react';
import { Cpu, ArrowRight, Zap, Bot, Database, Mail, Users, CheckCircle2, Sparkles, Sliders, ChevronRight } from 'lucide-react';
import { AIWorkflowVisual } from '../components/AIWorkflowVisual';
import { LeadToCalendarWorkflow, SupportCopilotWorkflow } from '../components/WorkflowBlueprintVisual';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { PageView } from '../types';
import { motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant } from '../utils/animations';

interface AiAutomationPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const AiAutomationPage: React.FC<AiAutomationPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] via-white to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" />
        <DecorativeBackground variant="gradient-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              variants={heroContainerVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Visual Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-2">
                <span onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span onClick={() => onNavigate('services')} className="hover:text-neutral-900 cursor-pointer">Services</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[#6D28D9]">AI & Marketing Automation</span>
              </div>

              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>Intelligent Agentic Pipelines</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Automate the Work.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]">
                  Accelerate the Growth.
                </span>
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                Free your team from repetitive manual data entry, slow lead response times, and disorganized spreadsheets. We architect intelligent AI workflows that qualify leads 24/7, sync CRMs instantly, and trigger automated sales follow-ups in seconds.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => onOpenConsultation('AI Automation')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_8px_25px_rgba(109,40,217,0.28)]"
                >
                  <span>Build Your AI Pipeline</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-micro inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#6D28D9] text-sm font-bold border-2 border-[#6D28D9] hover:bg-[#FAF9FF]"
                >
                  <span>Request Automation Audit</span>
                </button>
              </motion.div>

              <motion.div variants={heroItemVariant} className="pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-semibold text-neutral-500">
                <span>Autonomous Lead Qualification</span>
                <span>·</span>
                <span>CRM Webhooks</span>
                <span>·</span>
                <span>24/7 AI Chat Copilots</span>
                <span>·</span>
                <span>Dynamic Follow-up</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <AIWorkflowVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Two Real-World Architecture Workflows (Connected Animated Nodes) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9FF] text-[#6D28D9] text-xs font-bold border border-[#E9E7F2]">
              <Sparkles className="w-3.5 h-3.5" /> Autonomous System Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Engineered Pipeline Architectures
            </h2>
            <p className="text-base text-neutral-600">
              Clear visual blueprints of how House Robotics connects your tech stack to eliminate friction, automate lead intake, and deliver sub-30 second response times.
            </p>
          </div>

          <div className="space-y-10">
            <ScrollReveal animation="fade-up" delay={50}>
              <LeadToCalendarWorkflow />
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <SupportCopilotWorkflow />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Supported Integrations & Ecosystem */}
      <section className="py-20 bg-[#FAF9FF] border-y border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/70 text-[#6D28D9] text-xs font-bold">
              <Database className="w-3.5 h-3.5" /> Integration Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-['Space_Grotesk']">
              Seamlessly Integrated With Your Existing Tech Stack
            </h2>
            <p className="text-base text-neutral-600">
              We don't force you onto expensive new software. We connect and automate the platforms you already rely on.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'HubSpot CRM', category: 'CRM & Pipeline' },
              { name: 'Salesforce', category: 'Enterprise CRM' },
              { name: 'Pipedrive', category: 'Deal Tracking' },
              { name: 'Make & Zapier', category: 'iPaaS Pipelines' },
              { name: 'OpenAI & Claude', category: 'LLM Reasoning' },
              { name: 'WhatsApp Business', category: 'Direct Messaging' },
              { name: 'Slack & Teams', category: 'Internal Alerts' },
              { name: 'Stripe & QuickBooks', category: 'Financial Sync' },
              { name: 'Google Workspace', category: 'Docs & Sheets' },
              { name: 'PostgreSQL / MySQL', category: 'Custom Database' },
              { name: 'Twilio SMS', category: 'SMS Automation' },
              { name: 'Calendly & Cal.com', category: 'Booking Engine' }
            ].map((tool, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#E9E7F2] p-4 text-center space-y-1 shadow-xs hover:border-[#6D28D9] transition-colors">
                <div className="text-xs font-extrabold text-neutral-900">{tool.name}</div>
                <div className="text-[10px] text-neutral-400 font-medium">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Intake & Success Metrics */}
      <section className="py-20 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What You Need to Provide */}
            <div className="bg-[#FAF9FF] rounded-3xl p-8 border border-[#E9E7F2] space-y-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-[#6D28D9] text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" /> Project Intake Checklist
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                What You Need to Provide to Begin
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We make workflow automation implementation rapid and non-disruptive to your daily operations:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-neutral-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Current Workflow Mapping:</strong> A 45-minute walkthrough of your current manual lead, booking, or data-entry bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Platform API Access:</strong> Standard developer or admin invites to your CRM, email service, or webhook destination.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Qualification Criteria:</strong> Exact parameters that define an ideal sales-ready prospect (budget, company size, timeline).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span><strong>Team Alert Preferences:</strong> Channel routing rules (e.g., WhatsApp alert for high-ticket deals, Slack notification for standard inquiries).</span>
                </li>
              </ul>
            </div>

            {/* How Success is Measured */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E7F2] shadow-xs space-y-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operational ROI
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                How We Measure Automation Success
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We evaluate automation impact by hard operational hours recovered and conversion lift:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Benchmark 01</div>
                  <div className="text-sm font-extrabold text-neutral-900">&lt; 30s Lead Latency</div>
                  <p className="text-[11px] text-neutral-500">Inbound inquiries receive immediate qualification and calendar invitations.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Benchmark 02</div>
                  <div className="text-sm font-extrabold text-neutral-900">Zero Lost Leads</div>
                  <p className="text-[11px] text-neutral-500">100% data fidelity between landing forms and your production CRM.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Benchmark 03</div>
                  <div className="text-sm font-extrabold text-neutral-900">10+ Hours Saved / Wk</div>
                  <p className="text-[11px] text-neutral-500">Elimination of repetitive manual copy-pasting and spreadsheet updates.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-[#E9E7F2] space-y-1">
                  <div className="text-xs font-bold text-[#6D28D9] uppercase">Benchmark 04</div>
                  <div className="text-sm font-extrabold text-neutral-900">Enterprise Security</div>
                  <p className="text-[11px] text-neutral-500">Encrypted webhook payloads and strict compliance with client data privacy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation FAQs */}
      <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-neutral-950 font-['Space_Grotesk'] tracking-tight">
              Frequently Asked Questions About AI &amp; Automation
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Clear answers regarding privacy, hallucination prevention, timelines, and remote setup.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How do you prevent AI assistants from hallucinating or sharing incorrect pricing?',
                a: 'We architect AI copilots using strict Retrieval-Augmented Generation (RAG) and deterministic guardrails. The AI model is strictly restricted to your verified knowledge documents, price sheets, and service bounds. If a prospective customer asks a question outside the approved boundary, the system gracefully escalates to a human team member.'
              },
              {
                q: 'Is our customer data and proprietary business logic safe?',
                a: 'Yes. We strictly utilize enterprise API endpoints with zero data-retention training policies. Your customer data is never used to train public foundation models, and all webhook payloads are encrypted in transit.'
              },
              {
                q: 'How long does it take to deploy a custom business workflow automation?',
                a: 'Standard inbound lead routing and CRM synchronization pipelines are typically deployed and tested within 5 to 10 business days. Complex multi-agent customer support copilots or custom database automations typically require 2 to 3 weeks.'
              },
              {
                q: 'What ongoing maintenance is required for automated pipelines?',
                a: 'Once deployed and stress-tested, automated workflows operate autonomously. We provide error-alert webhooks that immediately notify our team if a third-party API changes, ensuring continuous uninterrupted operation.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#E9E7F2] p-5 shadow-xs space-y-2">
                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 text-[#6D28D9] text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white border-b border-[#E9E7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-['Space_Grotesk']">
                Explore Synergistic Digital Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Combine automated pipelines with custom web development and high-intent organic traffic.
              </p>
            </div>
            <button
              onClick={() => onNavigate('usa')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            >
              <span>Explore USA Target Cities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigate('web-dev')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-[#6D28D9]">Engineering</div>
              <h4 className="text-base font-bold text-neutral-900">Custom Web Development</h4>
              <p className="text-xs text-neutral-600">High-speed React platforms built with native API webhooks for instant automation.</p>
            </div>

            <div 
              onClick={() => onNavigate('seo')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-blue-600">Search Engine</div>
              <h4 className="text-base font-bold text-neutral-900">National SEO Services</h4>
              <p className="text-xs text-neutral-600">Drive continuous qualified inbound traffic into your automated qualification pipeline.</p>
            </div>

            <div 
              onClick={() => onNavigate('ppc')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-amber-600">Paid Media</div>
              <h4 className="text-base font-bold text-neutral-900">Google Ads &amp; PPC</h4>
              <p className="text-xs text-neutral-600">Convert high-intent paid clicks with instant automated lead response.</p>
            </div>

            <div 
              onClick={() => onNavigate('local-seo')}
              className="agency-card p-5 space-y-2 cursor-pointer hover:border-[#6D28D9] transition-all"
            >
              <div className="text-xs font-bold text-purple-600">Proximity</div>
              <h4 className="text-base font-bold text-neutral-900">Local SEO &amp; Maps</h4>
              <p className="text-xs text-neutral-600">Capture nearby local customers and route inquiries directly to your mobile phone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('AI Automation')} />
    </div>
  );
};

