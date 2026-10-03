import React, { useState, useEffect } from 'react';
import { PageView, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ScrollProgress } from './components/ScrollProgress';
import { MouseFollower } from './components/MouseFollower';
import { pageTransitionVariant } from './utils/animations';
import { AnimatePresence, motion } from 'motion/react';
import { HomePage } from './pages/HomePage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { SeoPage } from './pages/SeoPage';
import { LocalSeoPage } from './pages/LocalSeoPage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { PpcPage } from './pages/PpcPage';
import { AiAutomationPage } from './pages/AiAutomationPage';
import { WebDevPage } from './pages/WebDevPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLayout } from './admin/AdminLayout';
import { AGENCY_INFO } from './data/agencyData';
import { applyPageSeo } from './utils/seo';
import { MessageSquare, ArrowUp, X, Sparkles } from 'lucide-react';

const RESTORED_BLOG_SLUGS = [
  'how-much-does-seo-cost-in-the-uk',
  'what-is-seo-and-why-does-your-business-need-it',
  'seo-vs-ppc-which-is-better-for-your-business',
  'how-google-business-profile-helps-local-businesses',
  'how-to-improve-your-google-rankings-in-2026'
];

const getPageFromPath = (pathname: string): PageView => {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return 'home';
  if (clean.startsWith('admin')) return 'admin';
  if (clean === 'about') return 'about';
  if (clean === 'services') return 'services';
  if (clean === 'seo') return 'seo';
  if (clean === 'local-seo' || clean === 'google-maps-ranking') return 'local-seo';
  if (clean === 'social-media' || clean === 'social-media-marketing' || clean === 'meta-ads') return 'social-media';
  if (clean === 'ppc' || clean === 'ppc-google-ads') return 'ppc';
  if (clean === 'ai-automation' || clean === 'marketing-automation') return 'ai-automation';
  if (clean === 'web-development' || clean === 'custom-web-development') return 'web-development';
  if (clean === 'contact') return 'contact';
  if (clean === 'blog' || clean.startsWith('blog/') || RESTORED_BLOG_SLUGS.includes(clean)) return 'blog';
  if (clean === 'wordpress' || clean === 'wordpress-development') return 'wordpress';
  if (clean === 'shopify' || clean === 'shopify-development') return 'shopify';
  if (clean === 'ecommerce' || clean === 'ecommerce-development') return 'ecommerce';
  if (clean === 'email-marketing') return 'email-marketing';
  if (clean === 'content-marketing') return 'content-marketing';
  if (clean === 'cro' || clean === 'conversion-rate-optimization') return 'cro';
  if (clean === 'lead-generation') return 'lead-generation';
  if (clean === 'analytics' || clean === 'analytics-reporting') return 'analytics';
  if (clean === 'branding' || clean === 'branding-graphic-design') return 'branding';
  if (clean === 'video-marketing') return 'video-marketing';
  if (clean === 'online-reputation' || clean === 'online-reputation-management') return 'online-reputation';
  if (clean === '404' || clean === 'not-found') return 'not-found';
  return 'not-found';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromPath(window.location.pathname);
    }
    return 'home';
  });

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string>('SEO');
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<BlogPost | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (currentPage !== 'admin' && currentPage !== 'blog') {
      applyPageSeo(currentPage === 'home' ? '/' : `/${currentPage}`);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname);
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      const targetUrl = page === 'home' ? '/' : page === 'not-found' ? '/404' : `/${page}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
    }
  };

  const handleOpenConsultation = (service: string = 'SEO') => {
    setConsultationService(service);
    setConsultationModalOpen(true);
  };

  if (currentPage === 'admin') {
    return <AdminLayout onBackToWebsite={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-purple-100 selection:text-[#6D28D9] relative">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Subtle Desktop Ambient Glow Follower */}
      <MouseFollower />

      {/* Top Banner Notice - Clean Trust Signal */}
      <div className="bg-[#FAF9FF] border-b border-[#E9E7F2] py-2 px-4 text-center text-xs font-semibold text-neutral-600 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Accepting New Q2 Strategic Client Partnerships</span>
        <span className="text-neutral-300">|</span>
        <button
          onClick={() => handleOpenConsultation('Full Agency Discovery')}
          className="text-[#6D28D9] hover:underline font-bold"
        >
          Claim Your Free 30-Minute Growth Audit →
        </button>
      </div>

      {/* Main Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Content Router with Smooth Page Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageTransitionVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1"
        >
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
            onOpenBlog={(post) => setSelectedBlogArticle(post)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesOverviewPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'seo' && (
          <SeoPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'local-seo' && (
          <LocalSeoPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'social-media' && (
          <SocialMediaPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'ppc' && (
          <PpcPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'ai-automation' && (
          <AiAutomationPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'web-development' && (
          <WebDevPage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation('Agency Partnership')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation('Content Strategy')}
          />
        )}

        {[
          'wordpress',
          'shopify',
          'ecommerce',
          'email-marketing',
          'content-marketing',
          'cro',
          'lead-generation',
          'analytics',
          'branding',
          'video-marketing',
          'online-reputation'
        ].includes(currentPage) && (
          <ServiceDetailPage
            serviceSlug={currentPage}
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'not-found' && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </motion.main>
    </AnimatePresence>

      {/* Global Light Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation('Agency Partnership')}
      />

      {/* Floating Action Buttons: WhatsApp & Scroll to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white border border-[#E9E7F2] text-neutral-600 hover:text-neutral-900 shadow-md flex items-center justify-center transition-all hover:-translate-y-0.5"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* WhatsApp Floating Instant Chat Button */}
        <a
          href={AGENCY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-white border border-[#E9E7F2] text-neutral-800 shadow-[0_10px_30px_rgba(109,40,217,0.12)] hover:shadow-[0_15px_35px_rgba(109,40,217,0.2)] transition-all hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Quick WhatsApp</div>
            <div className="text-xs font-bold text-neutral-900">{AGENCY_INFO.whatsapp}</div>
          </div>
        </a>
      </div>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={consultationService}
      />

      {/* Single Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedBlogArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
            onClick={() => setSelectedBlogArticle(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.26 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E9E7F2] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-[#6D28D9] bg-white px-2.5 py-1 rounded-md border border-[#E9E7F2]">
                      {selectedBlogArticle.category}
                    </span>
                    <span className="text-neutral-500 font-mono">{selectedBlogArticle.date}</span>
                    <span>·</span>
                    <span className="text-neutral-500">{selectedBlogArticle.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                    {selectedBlogArticle.title}
                  </h2>
                  <div className="text-xs text-neutral-500">
                    By {selectedBlogArticle.author}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlogArticle(null)}
                  className="w-9 h-9 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center shrink-0 transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                {Array.isArray(selectedBlogArticle.content) ? (
                  selectedBlogArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <div 
                    className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: selectedBlogArticle.content }} 
                  />
                )}

                <div className="pt-6 mt-6 border-t border-[#E9E7F2] p-5 rounded-2xl bg-[#F3F0FF] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Want to implement this framework in your company?</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">Let our engineers and strategists audit your setup for free.</p>
                  </div>
                  <button
                    onClick={() => { setSelectedBlogArticle(null); handleOpenConsultation(selectedBlogArticle.category); }}
                    className="btn-micro px-5 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shrink-0 hover:bg-[#5B21B6]"
                  >
                    Book Free Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
