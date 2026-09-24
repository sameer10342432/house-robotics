import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, ShieldCheck } from 'lucide-react';

interface SeoChecklistProps {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  focusKeyword?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
}

export const SeoChecklist: React.FC<SeoChecklistProps> = ({
  title,
  slug,
  content,
  excerpt,
  featuredImage,
  featuredImageAlt,
  focusKeyword,
  seoTitle,
  metaDescription,
  canonicalUrl
}) => {
  const safeContent = content || '';
  const safeTitle = title || '';
  const safeSlug = slug || '';
  const safeExcerpt = excerpt || '';
  const effectiveSeoTitle = seoTitle || safeTitle;
  const effectiveMetaDesc = metaDescription || safeExcerpt;
  const keyword = (focusKeyword || '').toLowerCase().trim();

  // Helper checks
  const wordCount = safeContent.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const hasHeadings = /<h[2-4][^>]*>/i.test(safeContent);
  const hasInternalLinks = /href=["'](\/|https?:\/\/(www\.)?houserobotics\.com)/i.test(safeContent);
  const hasImages = /<img[^>]*>/i.test(safeContent) || Boolean(featuredImage);
  const isSlugValid = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(safeSlug);

  const checks = [
    {
      id: 'focus-keyword',
      label: 'Focus Keyword Defined',
      status: keyword.length >= 2 ? 'pass' : 'fail',
      message: keyword ? `Target: "${keyword}"` : 'Add a primary focus keyword to focus semantic relevance.'
    },
    {
      id: 'keyword-in-title',
      label: 'Focus Keyword in SEO Title',
      status: !keyword ? 'neutral' : effectiveSeoTitle.toLowerCase().includes(keyword) ? 'pass' : 'warn',
      message: !keyword ? 'Set focus keyword first' : effectiveSeoTitle.toLowerCase().includes(keyword) ? 'Focus keyword is present in the title.' : 'Include your focus keyword near the beginning of the title.'
    },
    {
      id: 'title-length',
      label: 'SEO Title Length (50–60 chars)',
      status: effectiveSeoTitle.length >= 40 && effectiveSeoTitle.length <= 60 ? 'pass' : effectiveSeoTitle.length > 60 ? 'warn' : 'fail',
      message: `${effectiveSeoTitle.length} characters (Recommended: 50–60).`
    },
    {
      id: 'meta-desc-length',
      label: 'Meta Description Length (120–160 chars)',
      status: effectiveMetaDesc.length >= 120 && effectiveMetaDesc.length <= 165 ? 'pass' : effectiveMetaDesc.length > 165 ? 'warn' : 'fail',
      message: `${effectiveMetaDesc.length} characters (Recommended: 120–160).`
    },
    {
      id: 'slug-format',
      label: 'Clean & URL-Safe Slug',
      status: isSlugValid ? 'pass' : 'fail',
      message: isSlugValid ? `/${slug} is lowercase and URL-friendly.` : 'Slug must only contain lowercase alphanumeric characters and single hyphens.'
    },
    {
      id: 'featured-image',
      label: 'Featured Image & Descriptive ALT',
      status: featuredImage && (featuredImageAlt || '').length >= 5 ? 'pass' : featuredImage ? 'warn' : 'fail',
      message: !featuredImage ? 'No featured image selected.' : !featuredImageAlt ? 'Featured image is missing descriptive ALT text.' : 'Featured image with descriptive ALT text configured.'
    },
    {
      id: 'content-length',
      label: 'Comprehensive Content Depth (> 300 words)',
      status: wordCount >= 600 ? 'pass' : wordCount >= 300 ? 'warn' : 'fail',
      message: `${wordCount} words written (Recommended: 600+ for authority rankings).`
    },
    {
      id: 'heading-structure',
      label: 'Semantic Headings (H2 / H3)',
      status: hasHeadings ? 'pass' : 'fail',
      message: hasHeadings ? 'Subsections organized with H2/H3 tags.' : 'Break content into readable sections using H2 and H3 tags.'
    },
    {
      id: 'internal-links',
      label: 'Internal Links to Agency Services/Articles',
      status: hasInternalLinks ? 'pass' : 'warn',
      message: hasInternalLinks ? 'Internal linking verified.' : 'Add internal links to relevant services or articles to pass SEO equity.'
    },
    {
      id: 'canonical',
      label: 'Canonical Tag Configuration',
      status: 'pass',
      message: canonicalUrl ? `Manual canonical: ${canonicalUrl}` : `Defaults to clean article path: /blog/${slug || 'slug'}`
    }
  ];

  const passCount = checks.filter(c => c.status === 'pass').length;
  const scorePercent = Math.round((passCount / checks.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E9E7F2] p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#6D28D9]" />
          <div>
            <h4 className="text-sm font-bold text-neutral-900 font-['Space_Grotesk']">SEO Optimization Checklist</h4>
            <p className="text-[11px] text-neutral-500">Essential search engine guidelines (Editorial best-practices checklist)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            scorePercent >= 80 
              ? 'bg-emerald-100 text-emerald-800' 
              : scorePercent >= 50 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {scorePercent}% Readiness ({passCount}/{checks.length})
          </span>
        </div>
      </div>

      <div className="space-y-2.5 divide-y divide-neutral-100">
        {checks.map((check) => {
          let Icon = CheckCircle2;
          let colorClass = 'text-emerald-500';
          let bgClass = 'bg-emerald-50/50';

          if (check.status === 'warn') {
            Icon = AlertCircle;
            colorClass = 'text-amber-500';
            bgClass = 'bg-amber-50/50';
          } else if (check.status === 'fail') {
            Icon = XCircle;
            colorClass = 'text-red-500';
            bgClass = 'bg-red-50/50';
          } else if (check.status === 'neutral') {
            Icon = Info;
            colorClass = 'text-neutral-400';
            bgClass = 'bg-neutral-50/50';
          }

          return (
            <div key={check.id} className={`pt-2 flex items-start gap-2.5 text-xs p-2 rounded-xl transition-colors ${bgClass}`}>
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${colorClass}`} />
              <div className="flex-1">
                <span className="font-bold text-neutral-900">{check.label}</span>
                <p className="text-[11px] text-neutral-600 mt-0.5">{check.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
