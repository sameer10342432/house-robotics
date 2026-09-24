import React from 'react';
import { ArrowRight, MessageSquare, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';
import { DecorativeBackground } from './DecorativeBackground';

interface CTASectionProps {
  onOpenConsultation: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative py-20 bg-[#F3F0FF] overflow-hidden border-y border-[#E9E7F2]">
      <DecorativeBackground variant="gradient-mesh" className="opacity-40" />

      {/* Subtle Violet Gradient Shapes in background */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 -right-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <ScrollReveal direction="fade-up" delay={50}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6D28D9] text-xs font-bold border border-[#E9E7F2] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Digital & AI Partnership
          </div>
        </ScrollReveal>

        <ScrollReveal direction="fade-up" delay={150}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight max-w-3xl mx-auto font-['Space_Grotesk']">
            Ready to Build Your Next Stage of Growth?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="fade-up" delay={250}>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Let's create a smarter digital strategy built around your specific business goals, unit economics, and competitive search landscape.
          </p>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal direction="fade-up" delay={350}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-bold shadow-[0_10px_25px_rgba(109,40,217,0.25)] transition-all hover:-translate-y-0.5"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>

            <a
              href={AGENCY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-micro w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-[#FAF9FF] text-neutral-900 text-sm font-bold border border-[#E9E7F2] shadow-xs transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 btn-arrow" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Trust markers */}
        <ScrollReveal direction="fade-up" delay={450}>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" />
              <span>Zero Long-Term Lock-in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" />
              <span>Senior Technical Strategists</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" />
              <span>Transparent Weekly Attribution</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
