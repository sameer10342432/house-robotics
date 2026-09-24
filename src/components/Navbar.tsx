import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Sparkles, Bot, Search, MapPin, Share2, TrendingUp, Cpu, Code, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { smoothEasing, dropdownMenuVariant } from '../utils/animations';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenConsultation: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutions = [
    { title: 'SEO Dominance', slug: 'seo', desc: 'Compound organic search rankings', icon: Search },
    { title: 'Local SEO & Maps', slug: 'local-seo', desc: 'Capture local 3-pack searchers', icon: MapPin },
    { title: 'Paid Advertising', slug: 'ppc', desc: 'High-ROI Google & Meta ads', icon: TrendingUp },
    { title: 'Social Media Growth', slug: 'social-media', desc: 'Audience building & distribution', icon: Share2 },
    { title: 'AI Automation', slug: 'ai-automation', desc: 'Autonomous CRM & lead workflows', icon: Cpu },
    { title: 'Custom Web Dev', slug: 'web-development', desc: 'Sub-second modern web applications', icon: Code },
    { title: 'E-commerce & Shopify', slug: 'web-development', desc: 'High-conversion retail storefronts', icon: ShoppingBag },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: smoothEasing }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(109,40,217,0.06)] py-3 border-[#E9E7F2]' 
          : 'bg-white/90 backdrop-blur-xs py-4 border-[#E9E7F2]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#2563EB] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_14px_rgba(109,40,217,0.3)]">
            <span className="font-extrabold text-lg tracking-tighter">H</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 font-['Space_Grotesk']">
            House<span className="text-[#6D28D9]">Robotics</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-600">
          <button
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`relative py-1 hover:text-[#6D28D9] transition-colors ${
              currentPage === 'home' ? 'text-[#6D28D9] font-bold' : ''
            }`}
          >
            Home
            {currentPage === 'home' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D28D9] rounded-full" 
                transition={{ duration: 0.25, ease: smoothEasing }}
              />
            )}
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`relative py-1 hover:text-[#6D28D9] transition-colors ${
              currentPage === 'about' ? 'text-[#6D28D9] font-bold' : ''
            }`}
          >
            About
            {currentPage === 'about' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D28D9] rounded-full" 
                transition={{ duration: 0.25, ease: smoothEasing }}
              />
            )}
          </button>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('services')}
              className={`relative flex items-center gap-1 hover:text-[#6D28D9] transition-colors py-2 ${
                currentPage === 'services' ? 'text-[#6D28D9] font-bold' : ''
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${servicesDropdownOpen ? 'rotate-180 text-[#6D28D9]' : 'text-neutral-400'}`} />
              {currentPage === 'services' && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#6D28D9] rounded-full" 
                  transition={{ duration: 0.25, ease: smoothEasing }}
                />
              )}
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  variants={dropdownMenuVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white/98 backdrop-blur-md rounded-2xl border border-[#E9E7F2] shadow-[0_20px_45px_rgba(109,40,217,0.12)] p-4 grid grid-cols-2 gap-2 z-50 origin-top"
                >
                  <div className="col-span-2 px-3 py-1.5 bg-[#FAF9FF] rounded-xl text-[11px] font-bold text-violet-800 flex items-center justify-between mb-1 border border-violet-100/60">
                    <span>Full-Service Agency Capabilities</span>
                    <button onClick={() => { setServicesDropdownOpen(false); onNavigate('services'); }} className="text-[#6D28D9] hover:underline font-extrabold">
                      View All 22+ Services →
                    </button>
                  </div>
                  {solutions.slice(0, 6).map((sol) => {
                    const Icon = sol.icon;
                    return (
                      <button
                        key={sol.title}
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate(sol.slug as PageView);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF9FF] text-left transition-all duration-200 group hover:translate-x-0.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-50 text-[#6D28D9] group-hover:bg-[#EDE9FE] group-hover:text-[#5B21B6] group-hover:scale-105 flex items-center justify-center shrink-0 transition-all shadow-xs border border-violet-100/60">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors">
                            {sol.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 leading-tight">
                            {sol.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsDropdownOpen(true)}
            onMouseLeave={() => setSolutionsDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-[#6D28D9] transition-colors py-2"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${solutionsDropdownOpen ? 'rotate-180 text-[#6D28D9]' : 'text-neutral-400'}`} />
            </button>

            <AnimatePresence>
              {solutionsDropdownOpen && (
                <motion.div
                  variants={dropdownMenuVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 w-64 bg-white/98 backdrop-blur-md rounded-2xl border border-[#E9E7F2] shadow-[0_20px_45px_rgba(109,40,217,0.12)] p-2 space-y-1 z-50 origin-top"
                >
                  {solutions.map((sol) => (
                    <button
                      key={sol.title}
                      onClick={() => {
                        setSolutionsDropdownOpen(false);
                        onNavigate(sol.slug as PageView);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF9FF] text-left text-xs font-semibold text-neutral-700 hover:text-[#6D28D9] transition-all duration-200 group hover:translate-x-0.5"
                    >
                      <span>{sol.title}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-[#6D28D9] transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className={`relative py-1 hover:text-[#6D28D9] transition-colors ${
              currentPage === 'blog' ? 'text-[#6D28D9] font-bold' : ''
            }`}
          >
            Insights & Blog
            {currentPage === 'blog' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D28D9] rounded-full" 
                transition={{ duration: 0.25, ease: smoothEasing }}
              />
            )}
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`relative py-1 hover:text-[#6D28D9] transition-colors ${
              currentPage === 'contact' ? 'text-[#6D28D9] font-bold' : ''
            }`}
          >
            Contact
            {currentPage === 'contact' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D28D9] rounded-full" 
                transition={{ duration: 0.25, ease: smoothEasing }}
              />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: smoothEasing }}
            onClick={() => onOpenConsultation()}
            className="btn-micro inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-[0_4px_14px_rgba(109,40,217,0.25)] transition-shadow hover:shadow-[0_8px_25px_rgba(109,40,217,0.35)] whitespace-nowrap"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
          </motion.button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenConsultation()}
            className="px-3 py-1.5 rounded-lg bg-[#6D28D9] text-white text-xs font-bold shadow-xs"
          >
            Consultation
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#E9E7F2] text-neutral-700 hover:bg-neutral-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Framer Motion slide & stagger */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: smoothEasing }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-b border-[#E9E7F2] px-5 py-4 space-y-3 overflow-hidden"
          >
            <div className="space-y-1 text-sm font-semibold text-neutral-800">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-[#6D28D9] border-b border-neutral-100 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-[#6D28D9] border-b border-neutral-100 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-[#6D28D9] border-b border-neutral-100 transition-colors"
              >
                Services Overview
              </button>
              <div className="py-2 pl-3 space-y-1.5 border-b border-neutral-100 text-xs bg-[#FAF9FF] rounded-xl p-2.5 my-1">
                <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Specific Solutions:</span>
                {solutions.map((sol) => (
                  <button
                    key={sol.title}
                    onClick={() => { onNavigate(sol.slug as PageView); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-neutral-600 hover:text-[#6D28D9] py-1 transition-colors"
                  >
                    · {sol.title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-[#6D28D9] border-b border-neutral-100 transition-colors"
              >
                Insights & Blog
              </button>
              <button
                onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-[#6D28D9] transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { onOpenConsultation(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-md"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="pt-2 text-center text-xs text-neutral-500">
              WhatsApp: <a href={AGENCY_INFO.whatsappUrl} className="font-bold text-emerald-700">{AGENCY_INFO.whatsapp}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

