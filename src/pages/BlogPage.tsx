import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  User, 
  Clock, 
  Search, 
  X, 
  Share2, 
  Copy, 
  Check, 
  ChevronRight,
  Eye,
  Bookmark
} from 'lucide-react';
import { BlogPost, PageView } from '../types';
import { BLOG_POSTS } from '../data/agencyData';
import { fetchBlogPosts, fetchBlogCategories } from '../utils/api';
import { BlogCardVisual } from '../components/BlogCardVisual';
import { BlogHeroVisual } from '../components/BlogHeroVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { CTASection } from '../components/CTASection';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { AnimatePresence, motion } from 'motion/react';
import { heroContainerVariant, heroItemVariant, smoothEasing } from '../utils/animations';

import { applyPageSeo } from '../utils/seo';

interface BlogPageProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>(BLOG_POSTS);
  const [categories, setCategories] = useState<string[]>(['All', 'SEO', 'AI', 'Digital Marketing', 'Web Development', 'Paid Advertising']);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const RESTORED_BLOG_SLUGS = [
    'how-much-does-seo-cost-in-the-uk',
    'what-is-seo-and-why-does-your-business-need-it',
    'seo-vs-ppc-which-is-better-for-your-business',
    'how-google-business-profile-helps-local-businesses',
    'how-to-improve-your-google-rankings-in-2026'
  ];

  useEffect(() => {
    loadPublicBlogData();
    checkUrlSlug(BLOG_POSTS);
  }, []);

  const checkUrlSlug = (availablePosts: any[]) => {
    if (typeof window === 'undefined') return;
    const clean = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const parts = clean.split('/');
    let targetSlug = '';
    let isRootSlug = false;

    if (parts[0] === 'blog' && parts[1]) {
      targetSlug = parts[1];
    } else if (parts[0] && parts[0] !== 'blog') {
      targetSlug = parts[0];
      isRootSlug = true;
    }

    if (targetSlug) {
      const found = availablePosts.find(p => p.slug === targetSlug || p.id === targetSlug);
      if (found) {
        openArticle(found, false, isRootSlug || RESTORED_BLOG_SLUGS.includes(targetSlug));
        return;
      }
    }
    applyPageSeo('/blog');
  };

  const openArticle = (article: any, updateHistory = true, forceRootUrl = false) => {
    setActiveArticle(article);
    const slug = article.slug || article.id;
    const isRoot = forceRootUrl || RESTORED_BLOG_SLUGS.includes(slug) || (article.canonicalUrl && !article.canonicalUrl.includes('/blog/'));
    const targetPath = isRoot ? `/${slug}/` : `/blog/${slug}`;
    const canonical = article.canonicalUrl || `https://houserobotics.online${targetPath}`;

    if (updateHistory && typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
    applyPageSeo(targetPath, {
      seoTitle: article.seoTitle || `${article.title.substring(0, 44)} | House Robotics`,
      metaDescription: article.metaDescription || (article.excerpt?.substring(0, 155)),
      focusKeyword: article.focusKeyword,
      canonicalUrl: canonical,
      ogImage: article.featuredImage || article.image || 'https://houserobotics.online/assets/blog-page-hero.webp',
      twitterImage: article.featuredImage || article.image || 'https://houserobotics.online/assets/blog-page-hero.webp'
    });
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/blog');
    }
    applyPageSeo('/blog');
  };

  const loadPublicBlogData = async () => {
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetchBlogPosts(),
        fetchBlogCategories()
      ]);

      if (postsRes && Array.isArray(postsRes) && postsRes.length > 0) {
        // Normalize DB posts to match Blog structure
        const normalized = postsRes.map((p: any) => {
          const img = p.featuredImage || p.featured_image || p.image || null;
          return {
            ...p,
            category: p.category?.name || p.category || 'Strategy',
            image: img,
            featuredImage: img,
            featuredImageAlt: p.featuredImageAlt || p.featured_image_alt || p.title || '',
            featuredImageCaption: p.featuredImageCaption || p.featured_image_caption || '',
            readTime: p.readTime || p.read_time || '5 min read',
            date: p.publishedAt || p.published_at ? new Date(p.publishedAt || p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'
          };
        });
        setPosts(normalized);
        checkUrlSlug(normalized);
      }

      if (catsRes && catsRes.success && Array.isArray(catsRes.data) && catsRes.data.length > 0) {
        const catNames = ['All', ...catsRes.data.map((c: any) => c.name)];
        setCategories(catNames);
      }
    } catch (e) {
      console.error('Failed to load public blog data', e);
    }
  };

  const filteredPosts = posts.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory || (p.category?.name === selectedCategory);
    const matchSearch = !searchQuery || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const getArticleUrl = (article: any) => {
    const slug = article.slug || article.id;
    if (RESTORED_BLOG_SLUGS.includes(slug) || (article.canonicalUrl && !article.canonicalUrl.includes('/blog/'))) {
      return `https://houserobotics.online/${slug}/`;
    }
    return `https://houserobotics.online/blog/${slug}`;
  };

  const handleShare = (platform: string, article: any) => {
    const articleUrl = getArticleUrl(article);
    const url = encodeURIComponent(articleUrl);
    const text = encodeURIComponent(article.title);

    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    else if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    else if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;

    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = (slug: string) => {
    const isRoot = RESTORED_BLOG_SLUGS.includes(slug);
    const fullUrl = isRoot ? `https://houserobotics.online/${slug}/` : `https://houserobotics.online/blog/${slug}`;
    navigator.clipboard?.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Structured Data Schema generator
  const getArticleSchema = (article: any) => {
    const articleUrl = article.canonicalUrl || getArticleUrl(article);
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.seoTitle || article.title,
      description: article.metaDescription || article.excerpt,
      image: article.featuredImage || article.image || 'https://houserobotics.online/assets/blog-page-hero.webp',
      author: {
        '@type': 'Organization',
        name: article.author || 'House Robotics Strategy Team',
        url: 'https://houserobotics.online'
      },
      publisher: {
        '@type': 'Organization',
        name: 'House Robotics',
        url: 'https://houserobotics.online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://houserobotics.online/favicon.svg'
        }
      },
      datePublished: article.publishedAt || article.createdAt || '2026-03-01T10:00:00Z',
      dateModified: article.updatedAt || '2026-03-24T12:00:00Z',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl
      }
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 bg-gradient-to-b from-[#FAF9FF] via-white to-white border-b border-[#E9E7F2] overflow-hidden">
        <DecorativeBackground variant="grid" />
        <DecorativeBackground variant="gradient-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              variants={heroContainerVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-6 text-left"
            >
              <motion.div variants={heroItemVariant} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FF] text-[#6D28D9] text-xs font-bold border border-violet-100 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Research &amp; Growth Intelligence</span>
              </motion.div>

              <motion.h1 variants={heroItemVariant} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                Insights for Smarter Digital Growth
              </motion.h1>

              <motion.p variants={heroItemVariant} className="text-lg text-neutral-600 leading-relaxed">
                Technical analysis, generative AI workflows, and empirical marketing frameworks from the House Robotics strategy desk.
              </motion.p>

              <motion.div variants={heroItemVariant} className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold">Generative AI</span>
                <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold">Technical SEO</span>
                <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold">React Performance</span>
                <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold">Paid Acquisition</span>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6">
              <ScrollReveal direction="scale-in" delay={200}>
                <div className="relative group">
                  <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E9E7F2] shadow-[0_10px_25px_rgba(109,40,217,0.08)] animate-subtle-float">
                    <div className="w-7 h-7 rounded-xl bg-violet-100 text-[#6D28D9] flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Editorial Papers</div>
                      <div className="text-xs font-extrabold text-neutral-900">Peer-Reviewed Insights</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#E9E7F2] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden bg-white p-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                      <ImageWithFallback
                        src="/assets/blog-page-hero.webp"
                        alt="House Robotics editorial intelligence and digital insights hero visual"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        zoomOnHover={false}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Featured Article Console */}
          <div className="pt-4">
            <BlogHeroVisual onSelectPost={(p) => openArticle(p)} />
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-4 border-b border-[#E9E7F2] bg-white sticky top-[69px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-[#FAF9FF] text-neutral-600 hover:text-neutral-900 border border-[#E9E7F2] hover:border-violet-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs text-neutral-900 bg-[#FAF9FF] focus:outline-none focus:border-[#6D28D9]"
            />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 bg-[#FAF9FF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <ScrollReveal
                key={post.id}
                animation="fade-up"
                delay={(idx % 3) * 80}
              >
                <div
                  onClick={() => openArticle(post)}
                  className="agency-card overflow-hidden flex flex-col justify-between cursor-pointer group h-full"
                >
                  <div className="p-3 bg-[#FAF9FF]/60 border-b border-[#E9E7F2]">
                    <BlogCardVisual category={post.category} title={post.title} image={post.image || post.featuredImage} />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                        <span className="font-bold text-[#6D28D9] bg-violet-50 px-2.5 py-1 rounded-md">
                          {typeof post.category === 'object' ? post.category?.name : post.category}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime || '5 min read'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                      <span className="text-[11px] text-neutral-400 font-normal">{post.date}</span>
                      <div className="flex items-center gap-1">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenConsultation={onOpenConsultation} />

      {/* Complete Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: smoothEasing }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-900/70 backdrop-blur-md"
            onClick={closeArticle}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.26, ease: smoothEasing }}
              className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#E9E7F2] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Structured Data Script */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: getArticleSchema(activeArticle) }}
              />

              {/* Reader Header */}
              <div className="p-6 sm:p-8 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-start justify-between gap-4">
                <div className="space-y-3 text-left">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold">
                    <span onClick={() => { closeArticle(); onNavigate('home'); }} className="hover:text-neutral-900 cursor-pointer">Home</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                    <span onClick={closeArticle} className="hover:text-neutral-900 cursor-pointer">Blog</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="text-[#6D28D9]">
                      {typeof activeArticle.category === 'object' ? activeArticle.category?.name : activeArticle.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight font-['Space_Grotesk']">
                    {activeArticle.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                    <span className="font-bold text-neutral-900">
                      By {activeArticle.author || 'House Robotics Strategy Team'}
                    </span>
                    <span>·</span>
                    <span>{activeArticle.date || 'Published Recently'}</span>
                    <span>·</span>
                    <span className="font-mono">{activeArticle.readTime || '5 min read'}</span>
                  </div>
                </div>

                <button
                  onClick={closeArticle}
                  className="w-9 h-9 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center shrink-0 transition-colors shadow-xs"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
                {/* Featured Image */}
                {(activeArticle.featuredImage || activeArticle.image) && (
                  <figure className="space-y-2">
                    <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-100 border border-[#E9E7F2]">
                      <img
                        src={activeArticle.featuredImage || activeArticle.image}
                        alt={activeArticle.featuredImageAlt || activeArticle.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                        }}
                      />
                    </div>
                    {activeArticle.featuredImageCaption && (
                      <figcaption className="text-center text-xs text-neutral-500 italic">
                        {activeArticle.featuredImageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Excerpt Lead */}
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border-l-4 border-[#6D28D9] text-sm sm:text-base font-medium text-neutral-700 leading-relaxed italic">
                  {activeArticle.excerpt}
                </div>

                {/* Rich HTML Content or Array of Strings */}
                <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-4 text-sm sm:text-base
                  [&>h1]:text-2xl [&>h1]:font-extrabold [&>h1]:text-neutral-900 [&>h1]:mt-6 [&>h1]:mb-3
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-neutral-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:border-b [&>h2]:border-neutral-100 [&>h2]:pb-2
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-neutral-900 [&>h3]:mt-5 [&>h3]:mb-2
                  [&>p]:text-neutral-700 [&>p]:leading-relaxed
                  [&>blockquote]:border-l-4 [&>blockquote]:border-[#6D28D9] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:bg-[#FAF9FF] [&>blockquote]:py-2
                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5
                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5
                  [&>a]:text-[#6D28D9] [&>a]:underline font-semibold
                  [&>img]:rounded-xl [&>img]:shadow-sm [&>img]:max-w-full
                ">
                  {typeof activeArticle.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
                  ) : Array.isArray(activeArticle.content) ? (
                    activeArticle.content.map((p: string, i: number) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))
                  ) : null}
                </div>

                {/* Social Sharing & Link Copy Bar */}
                <div className="pt-6 border-t border-[#E9E7F2] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500">Share Article:</span>
                    <button
                      onClick={() => handleShare('twitter', activeArticle)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                    >
                      X / Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin', activeArticle)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp', activeArticle)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                    >
                      WhatsApp
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyLink(activeArticle.slug || '')}
                    className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied' : 'Copy Article Link'}</span>
                  </button>
                </div>

                {/* Author Box */}
                <div className="p-6 rounded-3xl bg-[#FAF9FF] border border-[#E9E7F2] flex items-center gap-4">
                  <img
                    src={activeArticle.authorAvatar || '/images/avatar-marcus.svg'}
                    alt={activeArticle.author}
                    className="w-12 h-12 rounded-full border border-violet-200 object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider">Written By</span>
                    <h4 className="text-sm font-bold text-neutral-900">{activeArticle.author || 'House Robotics Strategy Team'}</h4>
                    <p className="text-xs text-neutral-500">{activeArticle.authorRole || 'Lead Growth & AI Strategist'}</p>
                  </div>
                </div>

                {/* Consultation Conversion Box */}
                <div className="p-6 rounded-2xl bg-[#F3F0FF] border border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Want to implement this framework in your company?</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">Let our engineers and strategists audit your setup for free.</p>
                  </div>
                  <button
                    onClick={() => { setActiveArticle(null); onOpenConsultation(); }}
                    className="btn-micro px-5 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shrink-0 hover:bg-[#5B21B6] shadow-xs"
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
};
