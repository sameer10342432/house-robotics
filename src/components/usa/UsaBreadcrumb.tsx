import React from 'react';
import { ChevronRight, Home, MapPin, Globe } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface UsaBreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  pageTitle?: string;
  pageDescription?: string;
  canonicalUrl?: string;
  serviceType?: string;
}

export const UsaBreadcrumb: React.FC<UsaBreadcrumbProps> = ({
  items,
  onNavigate,
  pageTitle,
  pageDescription,
  canonicalUrl,
  serviceType
}) => {
  const baseUrl = 'https://houserobotics.online';

  // Construct Google-compliant BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `${baseUrl}${item.path}` : `${baseUrl}/`
    }))
  };

  // Construct WebPage / ProfessionalService Schema
  const serviceSchema = serviceType ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceType,
    provider: {
      '@type': 'Organization',
      name: 'House Robotics',
      url: baseUrl,
      logo: `${baseUrl}/images/logo.svg`,
      email: 'sameerliaqat81@gmail.com',
      telephone: '+92 347 4542881'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    description: pageDescription || 'High-performance digital marketing, custom website engineering, and AI automation workflows.'
  } : null;

  return (
    <>
      {/* Inject Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 font-medium">
          <li className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate && onNavigate('/')}
              className="flex items-center gap-1 hover:text-[#6D28D9] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-neutral-400" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5">
                {!isLast && item.path ? (
                  <button
                    onClick={() => onNavigate && onNavigate(item.path!)}
                    className="hover:text-[#6D28D9] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="font-semibold text-neutral-900 truncate max-w-[220px] sm:max-w-none" aria-current="page">
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
