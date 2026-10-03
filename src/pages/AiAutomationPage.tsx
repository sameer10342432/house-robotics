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

      {/* CTA */}
      <CTASection onOpenConsultation={() => onOpenConsultation('AI Automation')} />
    </div>
  );
};
