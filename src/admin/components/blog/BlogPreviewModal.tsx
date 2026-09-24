import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Eye,
  Bookmark
} from 'lucide-react';

interface BlogPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string | null;
    featuredImageAlt?: string | null;
    featuredImageCaption?: string | null;
    author: string;
    authorRole?: string | null;
    authorBio?: string | null;
    authorAvatar?: string | null;
    readTime?: string;
    category?: { name: string; slug: string } | string;
    status: string;
    publishedAt?: string | null;
    updatedAt?: string | null;
    seoTitle?: string | null;
    metaDescription?: string | null;
  };
}

export const BlogPreviewModal: React.FC<BlogPreviewModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const categoryName = typeof data.category === 'object' && data.category !== null 
    ? data.category.name 
    : (data.category || 'Strategic Insights');

  const publishedDateStr = data.publishedAt 
    ? new Date(data.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '/blog/' + data.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-900/80 backdrop-blur-md">
      <div 
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-[#E9E7F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Preview Bar */}
        <div className="px-6 py-3 border-b border-[#E9E7F2] bg-[#FAF9FF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>LIVE CMS PREVIEW MODE</span>
            </span>
            <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
              /blog/{data.slug}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl border border-[#E9E7F2] bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Article Link'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E9E7F2] text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Public Website Article Render */}
        <div className="flex-1 overflow-y-auto bg-white">
          <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="hover:text-neutral-900 cursor-pointer">Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className="hover:text-neutral-900 cursor-pointer">Blog</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className="text-[#6D28D9]">{categoryName}</span>
            </nav>

            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-extrabold text-[#6D28D9] bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                  {categoryName}
                </span>
                <span className="flex items-center gap-1 text-neutral-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{publishedDateStr}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-neutral-500 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{data.readTime || '5 min read'}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 font-['Space_Grotesk'] leading-[1.15] tracking-tight">
                {data.title}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                {data.excerpt}
              </p>
            </div>

            {/* Author Box Bar */}
            <div className="flex items-center justify-between py-4 border-y border-[#E9E7F2] gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={data.authorAvatar || '/images/avatar-marcus.svg'}
                  alt={data.author}
                  className="w-11 h-11 rounded-full border-2 border-violet-100 object-cover bg-violet-50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/avatar-marcus.svg';
                  }}
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">{data.author}</h4>
                  <p className="text-xs text-neutral-500">{data.authorRole || 'Lead Agency Strategist'}</p>
                </div>
              </div>

              {/* Social Share Mock */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-semibold hidden sm:inline">Share:</span>
                <div className="flex items-center gap-1.5">
                  {['Twitter / X', 'LinkedIn', 'Facebook', 'WhatsApp'].map((platform) => (
                    <button
                      key={platform}
                      title={`Share on ${platform}`}
                      className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-violet-100 hover:text-[#6D28D9] text-neutral-600 flex items-center justify-center text-xs font-bold transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {data.featuredImage && (
              <figure className="space-y-2">
                <div className="rounded-3xl overflow-hidden border border-[#E9E7F2] aspect-[16/9] bg-neutral-100 shadow-md">
                  <img
                    src={data.featuredImage}
                    alt={data.featuredImageAlt || data.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/blog-ai-search.webp';
                    }}
                  />
                </div>
                {data.featuredImageCaption && (
                  <figcaption className="text-center text-xs text-neutral-500 italic">
                    {data.featuredImageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Rich Article Content Body */}
            <div 
              className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-5 text-base
                [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-neutral-900 [&>h1]:mt-8 [&>h1]:mb-4
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-neutral-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:border-b [&>h2]:border-[#E9E7F2] [&>h2]:pb-2
                [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-neutral-900 [&>h3]:mt-6 [&>h3]:mb-2
                [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-neutral-900 [&>h4]:mt-4
                [&>p]:text-neutral-700 [&>p]:leading-relaxed [&>p]:text-base
                [&>blockquote]:border-l-4 [&>blockquote]:border-[#6D28D9] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:bg-[#FAF9FF] [&>blockquote]:py-2 [&>blockquote]:rounded-r-xl
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2
                [&>a]:text-[#6D28D9] [&>a]:font-semibold [&>a]:underline hover:[&>a]:text-[#5B21B6]
                [&>table]:w-full [&>table]:border [&>table]:border-[#E9E7F2] [&>table]:rounded-xl [&>table]:overflow-hidden
                [&>table_th]:bg-neutral-100 [&>table_th]:p-3 [&>table_th]:text-left [&>table_th]:text-xs [&>table_th]:font-bold
                [&>table_td]:p-3 [&>table_td]:border-t [&>table_td]:border-[#E9E7F2] [&>table_td]:text-xs
                [&>pre]:bg-neutral-950 [&>pre]:text-neutral-100 [&>pre]:p-4 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:text-xs
                [&>img]:rounded-2xl [&>img]:shadow-md [&>img]:my-6 [&>img]:max-w-full
              "
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

            {/* Author Biography Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF9FF] border border-[#E9E7F2] flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-12 text-center sm:text-left">
              <img
                src={data.authorAvatar || '/images/avatar-marcus.svg'}
                alt={data.author}
                className="w-16 h-16 rounded-full border-2 border-[#6D28D9] object-cover shrink-0"
              />
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#6D28D9]">Author Overview</span>
                <h4 className="text-base font-extrabold text-neutral-900">{data.author}</h4>
                <p className="text-xs font-semibold text-neutral-600">{data.authorRole || 'Strategy Team Member'}</p>
                <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                  {data.authorBio || 'Pioneering growth intelligence, search algorithms, and high-performance digital systems at House Robotics.'}
                </p>
              </div>
            </div>

            {/* Bottom Conversion Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold font-['Space_Grotesk']">Ready to implement this framework?</h4>
                <p className="text-xs text-violet-100">Schedule a free 30-minute growth &amp; technical audit with our engineering leads.</p>
              </div>
              <button
                onClick={onClose}
                className="btn-micro px-6 py-3 rounded-2xl bg-white text-[#6D28D9] text-xs font-extrabold shrink-0 shadow-lg hover:bg-neutral-100"
              >
                Claim Free Growth Audit →
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
