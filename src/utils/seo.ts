/**
 * HOUSE ROBOTICS — Production SEO Metadata Engine & Schema Infrastructure
 * Canonical Domain: https://houserobotics.online/
 * 
 * Strict Standards:
 * - Meta Title: <= 60 characters (ideal 50–60)
 * - Meta Description: <= 160 characters (ideal 140–160)
 * - Canonical: Absolute https://houserobotics.online/...
 * - Schema: Valid JSON-LD (Organization, WebSite, Service, Article, BreadcrumbList, FAQPage)
 */

export const BASE_URL = 'https://houserobotics.online';

export interface PageSeoConfig {
  path: string;
  name: string;
  primaryKeyword: string;
  focusKeyword?: string;
  secondaryKeywords: string[];
  searchIntent: 'Commercial' | 'Informational' | 'Transactional' | 'Navigational' | 'Brand';
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  h1: string;
  breadcrumbs: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
  serviceSchema?: {
    name: string;
    description: string;
    category: string;
  };
}

export const SEO_METADATA_REGISTRY: Record<string, PageSeoConfig> = {
  '/': {
    path: '/',
    name: 'Homepage',
    primaryKeyword: 'digital marketing agency',
    secondaryKeywords: ['technology agency', 'business growth', 'AI automation', 'SEO services', 'web development'],
    searchIntent: 'Commercial',
    seoTitle: 'Digital Marketing & Technology Agency | House Robotics', // 56 chars
    metaDescription: 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.', // 135 chars
    canonicalUrl: `${BASE_URL}/`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Digital Marketing & Technology Agency | House Robotics',
    ogDescription: 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.',
    ogImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Digital Marketing & Technology Agency | House Robotics',
    twitterDescription: 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.',
    twitterImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    h1: 'Digital Marketing & Technology for Scalable Business Growth',
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }]
  },

  '/services': {
    path: '/services',
    name: 'Services Overview',
    primaryKeyword: 'digital marketing services',
    secondaryKeywords: ['technology solutions', 'full service agency', 'marketing automation', 'growth engineering'],
    searchIntent: 'Commercial',
    seoTitle: 'Digital Marketing & Technology Services | House Robotics', // 56 chars
    metaDescription: 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.', // 140 chars
    canonicalUrl: `${BASE_URL}/services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Digital Marketing & Technology Services | House Robotics',
    ogDescription: 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.',
    ogImage: `${BASE_URL}/assets/home-services-overview.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Digital Marketing & Technology Services | House Robotics',
    twitterDescription: 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.',
    twitterImage: `${BASE_URL}/assets/home-services-overview.webp`,
    h1: 'Full-Spectrum Digital Marketing & Technology Solutions',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` }
    ]
  },

  '/about': {
    path: '/about',
    name: 'About Us',
    primaryKeyword: 'digital agency team',
    secondaryKeywords: ['about House Robotics', 'marketing engineers', 'agency mission', 'technology consultants'],
    searchIntent: 'Brand',
    seoTitle: 'About House Robotics | Digital Marketing & Tech Agency', // 54 chars
    metaDescription: 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.', // 145 chars
    canonicalUrl: `${BASE_URL}/about`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'About House Robotics | Digital Marketing & Tech Agency',
    ogDescription: 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.',
    ogImage: `${BASE_URL}/assets/about-company-overview.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'About House Robotics | Digital Marketing & Tech Agency',
    twitterDescription: 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.',
    twitterImage: `${BASE_URL}/assets/about-company-overview.webp`,
    h1: 'Engineered for Businesses That Refuse Generic Marketing',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'About', url: `${BASE_URL}/about` }
    ]
  },

  '/contact': {
    path: '/contact',
    name: 'Contact',
    primaryKeyword: 'hire digital marketing agency',
    secondaryKeywords: ['contact House Robotics', 'marketing consultation', 'project inquiry', 'schedule growth audit'],
    searchIntent: 'Transactional',
    seoTitle: 'Contact House Robotics | Free Growth Consultation', // 49 chars
    metaDescription: 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.', // 137 chars
    canonicalUrl: `${BASE_URL}/contact`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Contact House Robotics | Free Growth Consultation',
    ogDescription: 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.',
    ogImage: `${BASE_URL}/assets/contact-page-visual.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Contact House Robotics | Free Growth Consultation',
    twitterDescription: 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.',
    twitterImage: `${BASE_URL}/assets/contact-page-visual.webp`,
    h1: "Let's Build Something That Moves Your Business Forward.",
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Contact', url: `${BASE_URL}/contact` }
    ]
  },

  '/blog': {
    path: '/blog',
    name: 'Blog',
    primaryKeyword: 'digital marketing insights',
    secondaryKeywords: ['SEO playbooks', 'AI automation guides', 'web performance tips', 'growth marketing articles'],
    searchIntent: 'Informational',
    seoTitle: 'Digital Marketing & Tech Insights | House Robotics Blog', // 55 chars
    metaDescription: 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.', // 137 chars
    canonicalUrl: `${BASE_URL}/blog`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Digital Marketing & Tech Insights | House Robotics Blog',
    ogDescription: 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.',
    ogImage: `${BASE_URL}/assets/blog-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Digital Marketing & Tech Insights | House Robotics Blog',
    twitterDescription: 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.',
    twitterImage: `${BASE_URL}/assets/blog-page-hero.webp`,
    h1: 'Insights for Smarter Digital Growth',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` }
    ]
  },

  '/seo': {
    path: '/seo',
    name: 'SEO Services',
    primaryKeyword: 'SEO services',
    secondaryKeywords: ['organic search optimization', 'technical SEO audit', 'enterprise SEO', 'link building', 'keyword strategy'],
    searchIntent: 'Commercial',
    seoTitle: 'Professional SEO Services | Organic Search Optimization', // 55 chars
    metaDescription: 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.', // 142 chars
    canonicalUrl: `${BASE_URL}/seo`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Professional SEO Services | Organic Search Optimization',
    ogDescription: 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional SEO Services | Organic Search Optimization',
    twitterDescription: 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'SEO That Turns Search Visibility Into Business Growth',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'SEO Services', url: `${BASE_URL}/seo` }
    ],
    serviceSchema: {
      name: 'Search Engine Optimization (SEO) Services',
      description: 'Comprehensive organic search architecture tailored to dominate competitive keywords, boost domain authority, and generate high-intent search leads.',
      category: 'Digital Marketing'
    }
  },

  '/local-seo': {
    path: '/local-seo',
    name: 'Local SEO Services',
    primaryKeyword: 'local SEO services',
    secondaryKeywords: ['Google Maps 3-pack', 'Google Business Profile', 'local search ranking', 'geo-targeted citations'],
    searchIntent: 'Commercial',
    seoTitle: 'Local SEO Services & Google Maps Ranking | House Robotics', // 57 chars
    metaDescription: 'Dominate local search results and Google Maps 3-Pack rankings. Our local SEO services turn nearby search queries into booked appointments.', // 138 chars
    canonicalUrl: `${BASE_URL}/local-seo`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Local SEO Services & Google Maps Ranking | House Robotics',
    ogDescription: 'Dominate local search results and Google Maps 3-Pack rankings. Our local SEO services turn nearby search queries into booked appointments.',
    ogImage: `${BASE_URL}/assets/local-seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Local SEO Services & Google Maps Ranking | House Robotics',
    twitterDescription: 'Dominate local search results and Google Maps 3-Pack rankings. Our local SEO services turn nearby search queries into booked appointments.',
    twitterImage: `${BASE_URL}/assets/local-seo-page-hero.webp`,
    h1: 'Local SEO Services & Google Maps 3-Pack Optimization',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Local SEO', url: `${BASE_URL}/local-seo` }
    ],
    serviceSchema: {
      name: 'Local SEO & Google Maps Marketing',
      description: 'Turn geographical proximity into inbound phone calls and foot traffic with hyper-localized citation networks, review engines, and geo-targeted landing pages.',
      category: 'Digital Marketing'
    }
  },

  '/social-media': {
    path: '/social-media',
    name: 'Social Media Marketing',
    primaryKeyword: 'social media marketing services',
    secondaryKeywords: ['social media management', 'Instagram marketing', 'LinkedIn B2B ads', 'TikTok brand campaigns'],
    searchIntent: 'Commercial',
    seoTitle: 'Social Media Marketing Services | House Robotics', // 48 chars
    metaDescription: 'Build loyal brand communities and acquire customers with performance-driven social media marketing services across LinkedIn, Meta, and TikTok.', // 142 chars
    canonicalUrl: `${BASE_URL}/social-media`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Social Media Marketing Services | House Robotics',
    ogDescription: 'Build loyal brand communities and acquire customers with performance-driven social media marketing services across LinkedIn, Meta, and TikTok.',
    ogImage: `${BASE_URL}/assets/social-media-marketing-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Social Media Marketing Services | House Robotics',
    twitterDescription: 'Build loyal brand communities and acquire customers with performance-driven social media marketing services across LinkedIn, Meta, and TikTok.',
    twitterImage: `${BASE_URL}/assets/social-media-marketing-page-hero.webp`,
    h1: 'Social Media Marketing Services That Drive Pipeline',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Social Media Marketing', url: `${BASE_URL}/social-media` }
    ],
    serviceSchema: {
      name: 'Social Media Marketing Services',
      description: 'Multi-platform social strategies blending organic creative direction, community building, and retargeting workflows.',
      category: 'Digital Marketing'
    }
  },

  '/ppc': {
    path: '/ppc',
    name: 'PPC & Google Ads',
    primaryKeyword: 'PPC management services',
    secondaryKeywords: ['Google Ads agency', 'paid search marketing', 'ROAS optimization', 'search advertising management'],
    searchIntent: 'Commercial',
    seoTitle: 'PPC Management Services & Google Ads | House Robotics', // 53 chars
    metaDescription: 'Maximize ad returns with data-driven PPC management services. We build high-converting Google Ads campaigns that reduce CAC and boost ROAS.', // 139 chars
    canonicalUrl: `${BASE_URL}/ppc`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'PPC Management Services & Google Ads | House Robotics',
    ogDescription: 'Maximize ad returns with data-driven PPC management services. We build high-converting Google Ads campaigns that reduce CAC and boost ROAS.',
    ogImage: `${BASE_URL}/assets/ppc-google-ads-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'PPC Management Services & Google Ads | House Robotics',
    twitterDescription: 'Maximize ad returns with data-driven PPC management services. We build high-converting Google Ads campaigns that reduce CAC and boost ROAS.',
    twitterImage: `${BASE_URL}/assets/ppc-google-ads-page-hero.webp`,
    h1: 'PPC Management Services & High-ROAS Google Ads',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'PPC & Google Ads', url: `${BASE_URL}/ppc` }
    ],
    serviceSchema: {
      name: 'PPC & Paid Search Advertising Services',
      description: 'Data-driven paid search architecture eliminating ad waste with laser-targeted negative keyword filtering, bidding models, and landing page alignment.',
      category: 'Performance Advertising'
    }
  },

  '/ai-automation': {
    path: '/ai-automation',
    name: 'AI Automation',
    primaryKeyword: 'AI automation services',
    secondaryKeywords: ['marketing automation agency', 'business workflow automation', 'CRM AI integration', 'lead routing automation'],
    searchIntent: 'Commercial',
    seoTitle: 'AI Automation Services & Workflows | House Robotics', // 51 chars
    metaDescription: 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.', // 137 chars
    canonicalUrl: `${BASE_URL}/ai-automation`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'AI Automation Services & Workflows | House Robotics',
    ogDescription: 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.',
    ogImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'AI Automation Services & Workflows | House Robotics',
    twitterDescription: 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.',
    twitterImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    h1: 'AI Automation Services & Connected Business Workflows',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'AI Automation', url: `${BASE_URL}/ai-automation` }
    ],
    serviceSchema: {
      name: 'AI Automation & Business Workflows',
      description: 'Harness practical generative AI and orchestration tools to automate lead intake, instant email personalization, customer support, and CRM pipelines.',
      category: 'Technology & AI'
    }
  },

  '/web-development': {
    path: '/web-development',
    name: 'Web Development',
    primaryKeyword: 'web development services',
    secondaryKeywords: ['custom web engineering', 'React development', 'modern web applications', 'fast responsive websites'],
    searchIntent: 'Commercial',
    seoTitle: 'Custom Web Development Services | House Robotics', // 48 chars
    metaDescription: 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.', // 146 chars
    canonicalUrl: `${BASE_URL}/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Custom Web Development Services | House Robotics',
    ogDescription: 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Custom Web Development Services | House Robotics',
    twitterDescription: 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Custom Web Development Services Engineered for Speed & Conversion',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Web Development', url: `${BASE_URL}/web-development` }
    ],
    serviceSchema: {
      name: 'Custom Web Development Services',
      description: 'Clean codebases designed for ultra-fast loading, seamless mobile experiences, airtight security, and maximum conversion rates.',
      category: 'Technology'
    }
  },

  '/wordpress': {
    path: '/wordpress',
    name: 'WordPress Development',
    primaryKeyword: 'WordPress development services',
    secondaryKeywords: ['custom WordPress themes', 'WooCommerce development', 'headless WordPress', 'WordPress speed optimization'],
    searchIntent: 'Commercial',
    seoTitle: 'WordPress Development Services | House Robotics', // 47 chars
    metaDescription: 'Fast, secure, lightweight WordPress development services with custom Gutenberg block architecture, plugin audits, and top Lighthouse scores.', // 140 chars
    canonicalUrl: `${BASE_URL}/wordpress`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'WordPress Development Services | House Robotics',
    ogDescription: 'Fast, secure, lightweight WordPress development services with custom Gutenberg block architecture, plugin audits, and top Lighthouse scores.',
    ogImage: `${BASE_URL}/assets/wordpress-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'WordPress Development Services | House Robotics',
    twitterDescription: 'Fast, secure, lightweight WordPress development services with custom Gutenberg block architecture, plugin audits, and top Lighthouse scores.',
    twitterImage: `${BASE_URL}/assets/wordpress-page-hero.webp`,
    h1: 'WordPress & CMS Development',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'WordPress Development', url: `${BASE_URL}/wordpress` }
    ],
    serviceSchema: {
      name: 'WordPress & CMS Development Services',
      description: 'Custom Gutenberg blocks, headless architectures, and enterprise security setups built for content teams and marketing agility.',
      category: 'Technology'
    }
  },

  '/shopify': {
    path: '/shopify',
    name: 'Shopify Development',
    primaryKeyword: 'Shopify development services',
    secondaryKeywords: ['Shopify theme customization', 'e-commerce store design', 'Shopify app integrations', 'checkout optimization'],
    searchIntent: 'Commercial',
    seoTitle: 'Shopify Development Services | House Robotics', // 45 chars
    metaDescription: 'Build high-converting e-commerce storefronts with expert Shopify development services, bespoke Liquid themes, and frictionless checkout flows.', // 142 chars
    canonicalUrl: `${BASE_URL}/shopify`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Shopify Development Services | House Robotics',
    ogDescription: 'Build high-converting e-commerce storefronts with expert Shopify development services, bespoke Liquid themes, and frictionless checkout flows.',
    ogImage: `${BASE_URL}/assets/shopify-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Shopify Development Services | House Robotics',
    twitterDescription: 'Build high-converting e-commerce storefronts with expert Shopify development services, bespoke Liquid themes, and frictionless checkout flows.',
    twitterImage: `${BASE_URL}/assets/shopify-page-hero.webp`,
    h1: 'Shopify & E-commerce Store Development',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Shopify Development', url: `${BASE_URL}/shopify` }
    ],
    serviceSchema: {
      name: 'Shopify Development & Storefront Engineering',
      description: 'E-commerce storefronts built for high conversion velocity, seamless product discovery, and recurring subscription models.',
      category: 'Technology'
    }
  },

  '/ecommerce': {
    path: '/ecommerce',
    name: 'E-commerce Development',
    primaryKeyword: 'ecommerce development services',
    secondaryKeywords: ['online retail architecture', 'headless ecommerce', 'multi-currency checkout', 'high AOV product funnels'],
    searchIntent: 'Commercial',
    seoTitle: 'E-commerce Development Services | House Robotics', // 48 chars
    metaDescription: 'Scale sales with enterprise ecommerce development services featuring headless architecture, 1-click upsells, and lightning-fast checkout velocity.', // 146 chars
    canonicalUrl: `${BASE_URL}/ecommerce`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'E-commerce Development Services | House Robotics',
    ogDescription: 'Scale sales with enterprise ecommerce development services featuring headless architecture, 1-click upsells, and lightning-fast checkout velocity.',
    ogImage: `${BASE_URL}/assets/ecommerce-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'E-commerce Development Services | House Robotics',
    twitterDescription: 'Scale sales with enterprise ecommerce development services featuring headless architecture, 1-click upsells, and lightning-fast checkout velocity.',
    twitterImage: `${BASE_URL}/assets/ecommerce-page-hero.webp`,
    h1: 'E-commerce Architecture & Digital Store Engineering',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'E-commerce', url: `${BASE_URL}/ecommerce` }
    ],
    serviceSchema: {
      name: 'E-commerce Architecture & Online Retail Systems',
      description: 'End-to-end commerce platforms designed for rapid checkout velocity, recurring revenue subscriptions, and enterprise ERP integration.',
      category: 'Technology'
    }
  },

  '/email-marketing': {
    path: '/email-marketing',
    name: 'Email Marketing',
    primaryKeyword: 'email marketing services',
    secondaryKeywords: ['lifecycle marketing', 'Klaviyo workflows', 'automated email drip', 'customer retention sequences'],
    searchIntent: 'Commercial',
    seoTitle: 'Email Marketing Services & Retention | House Robotics', // 53 chars
    metaDescription: 'Boost lifetime value and repeat sales with automated email marketing services, behavioral drip sequences, and high-deliverability campaigns.', // 140 chars
    canonicalUrl: `${BASE_URL}/email-marketing`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Email Marketing Services & Retention | House Robotics',
    ogDescription: 'Boost lifetime value and repeat sales with automated email marketing services, behavioral drip sequences, and high-deliverability campaigns.',
    ogImage: `${BASE_URL}/assets/email-marketing-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Email Marketing Services & Retention | House Robotics',
    twitterDescription: 'Boost lifetime value and repeat sales with automated email marketing services, behavioral drip sequences, and high-deliverability campaigns.',
    twitterImage: `${BASE_URL}/assets/email-marketing-page-hero.webp`,
    h1: 'Email Marketing & Customer Retention Automation',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Email Marketing', url: `${BASE_URL}/email-marketing` }
    ],
    serviceSchema: {
      name: 'Email Marketing & Retention Sequences',
      description: 'Segmented customer journeys triggered by live user behavior, maximizing customer lifetime value (LTV) and reducing churn.',
      category: 'Growth'
    }
  },

  '/content-marketing': {
    path: '/content-marketing',
    name: 'Content Marketing',
    primaryKeyword: 'content marketing services',
    secondaryKeywords: ['B2B copywriting', 'editorial content roadmap', 'thought leadership articles', 'whitepapers and case studies'],
    searchIntent: 'Commercial',
    seoTitle: 'Content Marketing & Copywriting Services | House Robotics', // 57 chars
    metaDescription: 'Establish industry authority and generate organic leads with data-driven content marketing services, deep research, and persuasive copywriting.', // 143 chars
    canonicalUrl: `${BASE_URL}/content-marketing`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Content Marketing & Copywriting Services | House Robotics',
    ogDescription: 'Establish industry authority and generate organic leads with data-driven content marketing services, deep research, and persuasive copywriting.',
    ogImage: `${BASE_URL}/assets/content-marketing-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Content Marketing & Copywriting Services | House Robotics',
    twitterDescription: 'Establish industry authority and generate organic leads with data-driven content marketing services, deep research, and persuasive copywriting.',
    twitterImage: `${BASE_URL}/assets/content-marketing-page-hero.webp`,
    h1: 'Content Marketing & Authority Copywriting',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Content Marketing', url: `${BASE_URL}/content-marketing` }
    ],
    serviceSchema: {
      name: 'Content Marketing & Copywriting Services',
      description: 'Content created by experienced writers and subject-matter analysts to earn backlinks, educate prospects, and drive qualified discovery.',
      category: 'Digital Marketing'
    }
  },

  '/cro': {
    path: '/cro',
    name: 'Conversion Rate Optimization',
    primaryKeyword: 'conversion rate optimization',
    secondaryKeywords: ['CRO services', 'website A/B testing', 'UX heuristics audit', 'checkout conversion rate'],
    searchIntent: 'Commercial',
    seoTitle: 'Conversion Rate Optimization Services | House Robotics', // 54 chars
    metaDescription: 'Turn existing website visitors into buyers with scientific conversion rate optimization services, user session heatmaps, and A/B test experiments.', // 146 chars
    canonicalUrl: `${BASE_URL}/cro`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Conversion Rate Optimization Services | House Robotics',
    ogDescription: 'Turn existing website visitors into buyers with scientific conversion rate optimization services, user session heatmaps, and A/B test experiments.',
    ogImage: `${BASE_URL}/assets/cro-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Conversion Rate Optimization Services | House Robotics',
    twitterDescription: 'Turn existing website visitors into buyers with scientific conversion rate optimization services, user session heatmaps, and A/B test experiments.',
    twitterImage: `${BASE_URL}/assets/cro-page-hero.webp`,
    h1: 'Conversion Rate Optimization (CRO)',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'CRO', url: `${BASE_URL}/cro` }
    ],
    serviceSchema: {
      name: 'Conversion Rate Optimization (CRO) Services',
      description: 'Empirical user session analysis, heatmapping, friction removal, and hypothesis-backed split tests that transform passive browsers into paying clients.',
      category: 'Growth'
    }
  },

  '/lead-generation': {
    path: '/lead-generation',
    name: 'Lead Generation',
    primaryKeyword: 'lead generation services',
    secondaryKeywords: ['B2B lead generation', 'inbound sales pipeline', 'appointment setting', 'lead qualification funnels'],
    searchIntent: 'Commercial',
    seoTitle: 'B2B Lead Generation Services | House Robotics', // 45 chars
    metaDescription: 'Fill your sales pipeline with predictable, qualified prospects using multi-channel lead generation services, targeted funnels, and CRM routing.', // 143 chars
    canonicalUrl: `${BASE_URL}/lead-generation`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'B2B Lead Generation Services | House Robotics',
    ogDescription: 'Fill your sales pipeline with predictable, qualified prospects using multi-channel lead generation services, targeted funnels, and CRM routing.',
    ogImage: `${BASE_URL}/assets/lead-generation-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'B2B Lead Generation Services | House Robotics',
    twitterDescription: 'Fill your sales pipeline with predictable, qualified prospects using multi-channel lead generation services, targeted funnels, and CRM routing.',
    twitterImage: `${BASE_URL}/assets/lead-generation-page-hero.webp`,
    h1: 'B2B Lead Generation Engines & Pipeline Systems',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Lead Generation', url: `${BASE_URL}/lead-generation` }
    ],
    serviceSchema: {
      name: 'B2B Lead Generation Engines',
      description: 'Integrated lead generation blending search visibility, gated assets, cold outreach workflows, and automated pipeline hygiene.',
      category: 'Growth'
    }
  },

  '/analytics': {
    path: '/analytics',
    name: 'Analytics & Reporting',
    primaryKeyword: 'digital marketing analytics',
    secondaryKeywords: ['GA4 setup', 'server side tracking', 'multi touch attribution', 'Looker Studio dashboards'],
    searchIntent: 'Commercial',
    seoTitle: 'Digital Marketing Analytics & GA4 | House Robotics', // 50 chars
    metaDescription: 'Gain clarity into customer acquisition costs and campaign ROI with custom digital marketing analytics dashboards and server-side GA4 tracking.', // 142 chars
    canonicalUrl: `${BASE_URL}/analytics`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Digital Marketing Analytics & GA4 | House Robotics',
    ogDescription: 'Gain clarity into customer acquisition costs and campaign ROI with custom digital marketing analytics dashboards and server-side GA4 tracking.',
    ogImage: `${BASE_URL}/assets/analytics-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Digital Marketing Analytics & GA4 | House Robotics',
    twitterDescription: 'Gain clarity into customer acquisition costs and campaign ROI with custom digital marketing analytics dashboards and server-side GA4 tracking.',
    twitterImage: `${BASE_URL}/assets/analytics-page-hero.webp`,
    h1: 'Analytics & Performance Attribution Reporting',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Analytics', url: `${BASE_URL}/analytics` }
    ],
    serviceSchema: {
      name: 'Analytics & Performance Attribution Reporting',
      description: 'Eliminate data silos with consolidated executive dashboards connecting paid ad spend, search traffic, and CRM deal values.',
      category: 'Growth'
    }
  },

  '/branding': {
    path: '/branding',
    name: 'Branding & Design',
    primaryKeyword: 'branding services',
    secondaryKeywords: ['brand identity design', 'logo design system', 'creative design agency', 'visual collateral'],
    searchIntent: 'Commercial',
    seoTitle: 'Strategic Branding & Design Services | House Robotics', // 53 chars
    metaDescription: 'Elevate brand prestige with cohesive branding services, comprehensive design systems, logo guidelines, and conversion-ready visual collateral.', // 142 chars
    canonicalUrl: `${BASE_URL}/branding`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Strategic Branding & Design Services | House Robotics',
    ogDescription: 'Elevate brand prestige with cohesive branding services, comprehensive design systems, logo guidelines, and conversion-ready visual collateral.',
    ogImage: `${BASE_URL}/assets/branding-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Strategic Branding & Design Services | House Robotics',
    twitterDescription: 'Elevate brand prestige with cohesive branding services, comprehensive design systems, logo guidelines, and conversion-ready visual collateral.',
    twitterImage: `${BASE_URL}/assets/branding-page-hero.webp`,
    h1: 'Branding & Graphic Design Systems',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Branding', url: `${BASE_URL}/branding` }
    ],
    serviceSchema: {
      name: 'Branding & Graphic Design Systems',
      description: 'Distinctive brand positioning translating strategic market differentiators into unforgettable visual aesthetics and typography.',
      category: 'Design & Marketing'
    }
  },

  '/video-marketing': {
    path: '/video-marketing',
    name: 'Video Marketing',
    primaryKeyword: 'video marketing services',
    secondaryKeywords: ['short form video ads', 'YouTube video production', 'video marketing strategy', 'product demo videos'],
    searchIntent: 'Commercial',
    seoTitle: 'Video Marketing & Creative Production | House Robotics', // 54 chars
    metaDescription: 'Capture attention and boost conversions with video marketing services, high-retention short-form clips, product demos, and social video ads.', // 140 chars
    canonicalUrl: `${BASE_URL}/video-marketing`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Video Marketing & Creative Production | House Robotics',
    ogDescription: 'Capture attention and boost conversions with video marketing services, high-retention short-form clips, product demos, and social video ads.',
    ogImage: `${BASE_URL}/assets/video-marketing-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Video Marketing & Creative Production | House Robotics',
    twitterDescription: 'Capture attention and boost conversions with video marketing services, high-retention short-form clips, product demos, and social video ads.',
    twitterImage: `${BASE_URL}/assets/video-marketing-page-hero.webp`,
    h1: 'Video Marketing & Creative Video Production',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Video Marketing', url: `${BASE_URL}/video-marketing` }
    ],
    serviceSchema: {
      name: 'Video Marketing & Creative Production',
      description: 'Engaging motion and video production optimized for Meta Reels, YouTube Shorts, LinkedIn feeds, and high-converting landing page embeds.',
      category: 'Creative Marketing'
    }
  },

  '/online-reputation': {
    path: '/online-reputation',
    name: 'Online Reputation Management',
    primaryKeyword: 'online reputation management',
    secondaryKeywords: ['review management software', 'Google review generation', 'brand sentiment monitoring', '5 star review acquisition'],
    searchIntent: 'Commercial',
    seoTitle: 'Online Reputation Management Services | House Robotics', // 54 chars
    metaDescription: 'Protect and elevate brand authority with online reputation management services, automated 5-star customer review funnels, and sentiment tracking.', // 145 chars
    canonicalUrl: `${BASE_URL}/online-reputation`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Online Reputation Management Services | House Robotics',
    ogDescription: 'Protect and elevate brand authority with online reputation management services, automated 5-star customer review funnels, and sentiment tracking.',
    ogImage: `${BASE_URL}/assets/online-reputation-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Online Reputation Management Services | House Robotics',
    twitterDescription: 'Protect and elevate brand authority with online reputation management services, automated 5-star customer review funnels, and sentiment tracking.',
    twitterImage: `${BASE_URL}/assets/online-reputation-page-hero.webp`,
    h1: 'Online Reputation Management & Review Acceleration',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Online Reputation', url: `${BASE_URL}/online-reputation` }
    ],
    serviceSchema: {
      name: 'Online Reputation Management',
      description: 'Systematic customer feedback loops that protect brand reputation on Google, Trustpilot, and industry-specific review sites.',
      category: 'Growth'
    }
  },

  '/blog/the-modern-seo-playbook': {
    path: '/blog/the-modern-seo-playbook',
    name: 'The Modern SEO Playbook',
    primaryKeyword: 'modern SEO playbook',
    secondaryKeywords: ['AI Overviews ranking', 'generative engine optimization', 'GEO search citations', 'entity authority SEO'],
    searchIntent: 'Informational',
    seoTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics', // 58 chars
    metaDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.', // 145 chars
    canonicalUrl: `${BASE_URL}/blog/the-modern-seo-playbook`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics',
    ogDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.',
    ogImage: `${BASE_URL}/images/blog-ai-search.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics',
    twitterDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.',
    twitterImage: `${BASE_URL}/images/blog-ai-search.svg`,
    h1: 'The Modern SEO Playbook: How AI Overviews Are Changing Search Rankings',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'The Modern SEO Playbook', url: `${BASE_URL}/blog/the-modern-seo-playbook` }
    ]
  },

  '/blog/practical-ai-automation': {
    path: '/blog/practical-ai-automation',
    name: 'Practical AI Automation',
    primaryKeyword: 'practical AI automation',
    secondaryKeywords: ['connected workflows CRM', 'business automation playbook', 'automated lead intake', 'eliminate busywork AI'],
    searchIntent: 'Informational',
    seoTitle: 'Practical AI Automation for Businesses | House Robotics', // 55 chars
    metaDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.', // 145 chars
    canonicalUrl: `${BASE_URL}/blog/practical-ai-automation`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Practical AI Automation for Businesses | House Robotics',
    ogDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.',
    ogImage: `${BASE_URL}/images/blog-autonomous-agents.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Practical AI Automation for Businesses | House Robotics',
    twitterDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.',
    twitterImage: `${BASE_URL}/images/blog-autonomous-agents.svg`,
    h1: 'Practical AI Automation: Replacing Busywork with Connected Workflows',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Practical AI Automation', url: `${BASE_URL}/blog/practical-ai-automation` }
    ]
  },

  '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier': {
    path: '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier',
    name: 'Page Speed & Conversions',
    primaryKeyword: 'page speed conversion rate',
    secondaryKeywords: ['Core Web Vitals CRO', 'fast website loading', 'mobile latency impact', 'React website speed'],
    searchIntent: 'Informational',
    seoTitle: 'Why Page Speed Multiplies Conversions | House Robotics', // 54 chars
    metaDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.', // 142 chars
    canonicalUrl: `${BASE_URL}/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Why Page Speed Multiplies Conversions | House Robotics',
    ogDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.',
    ogImage: `${BASE_URL}/images/blog-react-perf.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Why Page Speed Multiplies Conversions | House Robotics',
    twitterDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.',
    twitterImage: `${BASE_URL}/images/blog-react-perf.svg`,
    h1: 'Why Page Speed Is the Ultimate Conversion Rate Multiplier',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Page Speed & Conversions', url: `${BASE_URL}/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier` }
    ]
  },

  '/blog/google-ads-in-2026-eliminating-wasteful-spend': {
    path: '/blog/google-ads-in-2026-eliminating-wasteful-spend',
    name: 'Google Ads Spend Optimization',
    primaryKeyword: 'eliminate wasteful Google Ads spend',
    secondaryKeywords: ['precision negative keyword lists', 'Google Ads ROAS', 'broad match keyword bleed', 'PPC budget protection'],
    searchIntent: 'Informational',
    seoTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics', // 59 chars
    metaDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.', // 142 chars
    canonicalUrl: `${BASE_URL}/blog/google-ads-in-2026-eliminating-wasteful-spend`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics',
    ogDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.',
    ogImage: `${BASE_URL}/images/blog-b2b-funnels.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics',
    twitterDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.',
    twitterImage: `${BASE_URL}/images/blog-b2b-funnels.svg`,
    h1: 'Google Ads in 2026: Eliminating Wasteful Spend with Precision Negative Lists',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Google Ads Optimization', url: `${BASE_URL}/blog/google-ads-in-2026-eliminating-wasteful-spend` }
    ]
  },

  '/blog/google-maps-3-pack-mastery': {
    path: '/blog/google-maps-3-pack-mastery',
    name: 'Google Maps 3-Pack Mastery',
    primaryKeyword: 'Google Maps 3 pack mastery',
    secondaryKeywords: ['local geo grid ranking', 'local SEO territory dominance', 'automated SMS review velocity', 'Google Business Profile strategy'],
    searchIntent: 'Informational',
    seoTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics', // 55 chars
    metaDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.', // 140 chars
    canonicalUrl: `${BASE_URL}/blog/google-maps-3-pack-mastery`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics',
    ogDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.',
    ogImage: `${BASE_URL}/images/blog-local-maps.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics',
    twitterDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.',
    twitterImage: `${BASE_URL}/images/blog-local-maps.svg`,
    h1: 'Google Maps 3-Pack Mastery: Local Geo-Grid Dominance',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Google Maps 3-Pack Mastery', url: `${BASE_URL}/blog/google-maps-3-pack-mastery` }
    ]
  },

  '/blog/high-converting-short-form-video-systems': {
    path: '/blog/high-converting-short-form-video-systems',
    name: 'Short-Form Video Systems',
    primaryKeyword: 'short form video marketing',
    secondaryKeywords: ['Reels and Shorts for business', 'video conversion taxonomy', 'viral video ROI', 'social video attribution'],
    searchIntent: 'Informational',
    seoTitle: 'Short-Form Video Systems That Convert | House Robotics', // 54 chars
    metaDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.', // 139 chars
    canonicalUrl: `${BASE_URL}/blog/high-converting-short-form-video-systems`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Short-Form Video Systems That Convert | House Robotics',
    ogDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.',
    ogImage: `${BASE_URL}/images/blog-short-form.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Short-Form Video Systems That Convert | House Robotics',
    twitterDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.',
    twitterImage: `${BASE_URL}/images/blog-short-form.svg`,
    h1: 'High-Converting Short-Form Video Systems for Modern Brands',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Short-Form Video Systems', url: `${BASE_URL}/blog/high-converting-short-form-video-systems` }
    ]
  },

  '/how-much-does-seo-cost-in-the-uk': {
    path: '/how-much-does-seo-cost-in-the-uk',
    name: 'How Much Does SEO Cost in the UK?',
    primaryKeyword: 'how much does SEO cost in the UK',
    secondaryKeywords: ['SEO pricing UK', 'SEO cost UK', 'SEO retainer cost', 'SEO agency pricing'],
    searchIntent: 'Informational',
    seoTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide', // 51 chars
    metaDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.', // 154 chars
    canonicalUrl: `${BASE_URL}/how-much-does-seo-cost-in-the-uk/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    ogDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    ogImage: `${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    twitterDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    twitterImage: `${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp`,
    h1: 'How Much Does SEO Cost in the UK? (2026 Pricing Guide)',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'How Much Does SEO Cost in the UK?', url: `${BASE_URL}/how-much-does-seo-cost-in-the-uk/` }
    ]
  },

  '/what-is-seo-and-why-does-your-business-need-it': {
    path: '/what-is-seo-and-why-does-your-business-need-it',
    name: 'What Is SEO and Why Does Your Business Need It?',
    primaryKeyword: 'what is SEO and why does your business need it',
    secondaryKeywords: ['what is SEO', 'why businesses need SEO', 'benefits of SEO', 'organic search growth'],
    searchIntent: 'Informational',
    seoTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)', // 52 chars
    metaDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.', // 147 chars
    canonicalUrl: `${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    ogDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    ogImage: `${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    twitterDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    twitterImage: `${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp`,
    h1: 'What Is SEO and Why Does Your Business Need It?',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'What Is SEO and Why Does Your Business Need It?', url: `${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/` }
    ]
  },

  '/seo-vs-ppc-which-is-better-for-your-business': {
    path: '/seo-vs-ppc-which-is-better-for-your-business',
    name: 'SEO vs PPC: Which Is Better for Your Business?',
    primaryKeyword: 'SEO vs PPC',
    secondaryKeywords: ['SEO vs PPC comparison', 'organic vs paid search', 'Google Ads vs SEO', 'PPC or SEO for business'],
    searchIntent: 'Informational',
    seoTitle: 'SEO vs PPC: Which Is Better for Your Business?', // 46 chars
    metaDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.', // 154 chars
    canonicalUrl: `${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    ogDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    ogImage: `${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    twitterDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    twitterImage: `${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp`,
    h1: 'SEO vs PPC: Which Is Better for Your Business?',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'SEO vs PPC', url: `${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/` }
    ]
  },

  '/how-google-business-profile-helps-local-businesses': {
    path: '/how-google-business-profile-helps-local-businesses',
    name: 'How Google Business Profile Helps Local Businesses',
    primaryKeyword: 'how Google Business Profile helps local businesses',
    secondaryKeywords: ['Google Business Profile benefits', 'Google Maps marketing', 'local SEO Google Business', 'Google 3-pack ranking'],
    searchIntent: 'Informational',
    seoTitle: 'How Google Business Profile Helps Local Businesses | Guide', // 58 chars
    metaDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.', // 160 chars
    canonicalUrl: `${BASE_URL}/how-google-business-profile-helps-local-businesses/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    ogDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    ogImage: `${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    twitterDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    twitterImage: `${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp`,
    h1: 'How Google Business Profile Helps Local Businesses',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Google Business Profile for Local Businesses', url: `${BASE_URL}/how-google-business-profile-helps-local-businesses/` }
    ]
  },

  '/how-to-improve-your-google-rankings-in-2026': {
    path: '/how-to-improve-your-google-rankings-in-2026',
    name: 'How to Improve Your Google Rankings in 2026',
    primaryKeyword: 'how to improve your Google rankings in 2026',
    secondaryKeywords: ['improve Google rankings 2026', 'SEO strategy 2026', 'AI Overviews SEO', 'Google ranking factors 2026'],
    searchIntent: 'Informational',
    seoTitle: 'How to Improve Google Rankings in 2026 | Full Guide', // 50 chars
    metaDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.', // 154 chars
    canonicalUrl: `${BASE_URL}/how-to-improve-your-google-rankings-in-2026/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    ogDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    ogImage: `${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    twitterDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    twitterImage: `${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp`,
    h1: 'How to Improve Your Google Rankings in 2026: The Complete Guide',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Improve Google Rankings in 2026', url: `${BASE_URL}/how-to-improve-your-google-rankings-in-2026/` }
    ]
  },

  '/usa': {
    path: '/usa',
    name: 'USA National Hub',
    primaryKeyword: 'USA digital marketing and technology agency',
    secondaryKeywords: ['USA SEO agency', 'US web development', 'national digital marketing', 'AI automation USA'],
    searchIntent: 'Commercial',
    seoTitle: 'USA Digital Marketing, SEO & Web Dev | House Robotics', // 53 chars
    metaDescription: 'Specialized digital marketing, technical SEO, custom web development, and AI automation for high-growth businesses across all 50 US states.', // 140 chars
    canonicalUrl: `${BASE_URL}/usa`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'USA Digital Marketing, SEO & Web Dev | House Robotics',
    ogDescription: 'Specialized digital marketing, technical SEO, custom web development, and AI automation for high-growth businesses across all 50 US states.',
    ogImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'USA Digital Marketing, SEO & Web Dev | House Robotics',
    twitterDescription: 'Specialized digital marketing, technical SEO, custom web development, and AI automation for high-growth businesses across all 50 US states.',
    twitterImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    h1: 'Digital Marketing & Technology for High-Growth US Businesses',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` }
    ]
  },

  '/usa/texas/austin/seo-services': {
    path: '/usa/texas/austin/seo-services',
    name: 'Austin SEO Services',
    primaryKeyword: 'Austin SEO Services',
    secondaryKeywords: ['Austin SEO agency', 'Silicon Hills organic search', 'SaaS SEO Austin', 'technical SEO Austin Texas'],
    searchIntent: 'Commercial',
    seoTitle: 'Austin SEO Services & Organic Growth | House Robotics', // 53 chars
    metaDescription: 'Specialized technical SEO, enterprise keyword architecture, and organic search growth for Austin SaaS startups, tech firms, and commercial services.', // 148 chars
    canonicalUrl: `${BASE_URL}/usa/texas/austin/seo-services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Austin SEO Services & Organic Growth | House Robotics',
    ogDescription: 'Specialized technical SEO, enterprise keyword architecture, and organic search growth for Austin SaaS startups, tech firms, and commercial services.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Austin SEO Services & Organic Growth | House Robotics',
    twitterDescription: 'Specialized technical SEO, enterprise keyword architecture, and organic search growth for Austin SaaS startups, tech firms, and commercial services.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'High-Performance SEO Services for Austin Tech, SaaS & Enterprise Brands',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Texas', url: `${BASE_URL}/usa/texas` },
      { name: 'Austin', url: `${BASE_URL}/usa/texas/austin` },
      { name: 'SEO Services', url: `${BASE_URL}/usa/texas/austin/seo-services` }
    ]
  },

  '/usa/texas/austin/web-development': {
    path: '/usa/texas/austin/web-development',
    name: 'Austin Web Development',
    primaryKeyword: 'Austin Website Development',
    secondaryKeywords: ['Austin web design', 'custom web development Austin', 'React developer Austin'],
    searchIntent: 'Commercial',
    seoTitle: 'Austin Custom Website Development | House Robotics', // 50 chars
    metaDescription: 'Custom website development and modern web applications for Austin businesses. Ultra-fast performance, responsive design, and enterprise-grade code.', // 147 chars
    canonicalUrl: `${BASE_URL}/usa/texas/austin/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Austin Custom Website Development | House Robotics',
    ogDescription: 'Custom website development and modern web applications for Austin businesses. Ultra-fast performance, responsive design, and enterprise-grade code.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Austin Custom Website Development | House Robotics',
    twitterDescription: 'Custom website development and modern web applications for Austin businesses. Ultra-fast performance, responsive design, and enterprise-grade code.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Custom Website Development & Modern Engineering in Austin, Texas',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Texas', url: `${BASE_URL}/usa/texas` },
      { name: 'Austin', url: `${BASE_URL}/usa/texas/austin` },
      { name: 'Web Development', url: `${BASE_URL}/usa/texas/austin/web-development` }
    ]
  },

  '/usa/new-york/new-york-city/web-development': {
    path: '/usa/new-york/new-york-city/web-development',
    name: 'NYC Web Development',
    primaryKeyword: 'NYC Website Development',
    secondaryKeywords: ['New York web design', 'custom web engineering NYC', 'Manhattan website developers'],
    searchIntent: 'Commercial',
    seoTitle: 'NYC Website Development & Engineering | House Robotics', // 54 chars
    metaDescription: 'Custom website development and high-performance digital engineering for New York City enterprises, financial institutions, and creative agencies.', // 145 chars
    canonicalUrl: `${BASE_URL}/usa/new-york/new-york-city/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'NYC Website Development & Engineering | House Robotics',
    ogDescription: 'Custom website development and high-performance digital engineering for New York City enterprises, financial institutions, and creative agencies.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'NYC Website Development & Engineering | House Robotics',
    twitterDescription: 'Custom website development and high-performance digital engineering for New York City enterprises, financial institutions, and creative agencies.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Bespoke Website Development for New York City Financial & Enterprise Brands',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'New York', url: `${BASE_URL}/usa/new-york` },
      { name: 'New York City', url: `${BASE_URL}/usa/new-york/new-york-city` },
      { name: 'Web Development', url: `${BASE_URL}/usa/new-york/new-york-city/web-development` }
    ]
  },

  '/usa/new-york/new-york-city/seo-services': {
    path: '/usa/new-york/new-york-city/seo-services',
    name: 'NYC SEO Services',
    primaryKeyword: 'NYC SEO Services',
    secondaryKeywords: ['New York City SEO', 'Manhattan enterprise SEO', 'organic search NYC'],
    searchIntent: 'Commercial',
    seoTitle: 'NYC SEO Services & Search Strategy | House Robotics', // 51 chars
    metaDescription: 'Dominant enterprise SEO and organic search strategy for New York City businesses. Technical audits, high-intent keyword ranking, and compounding pipeline.', // 154 chars
    canonicalUrl: `${BASE_URL}/usa/new-york/new-york-city/seo-services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'NYC SEO Services & Search Strategy | House Robotics',
    ogDescription: 'Dominant enterprise SEO and organic search strategy for New York City businesses. Technical audits, high-intent keyword ranking, and compounding pipeline.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'NYC SEO Services & Search Strategy | House Robotics',
    twitterDescription: 'Dominant enterprise SEO and organic search strategy for New York City businesses. Technical audits, high-intent keyword ranking, and compounding pipeline.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'Enterprise SEO Services in New York City: Outrank High-Value Manhattan Competitors',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'New York', url: `${BASE_URL}/usa/new-york` },
      { name: 'New York City', url: `${BASE_URL}/usa/new-york/new-york-city` },
      { name: 'SEO Services', url: `${BASE_URL}/usa/new-york/new-york-city/seo-services` }
    ]
  },

  '/usa/california/los-angeles/digital-marketing': {
    path: '/usa/california/los-angeles/digital-marketing',
    name: 'Los Angeles Digital Marketing',
    primaryKeyword: 'Los Angeles Digital Marketing',
    secondaryKeywords: ['LA marketing agency', 'digital marketing Los Angeles', 'Silicon Beach marketing'],
    searchIntent: 'Commercial',
    seoTitle: 'Los Angeles Digital Marketing Agency | House Robotics', // 53 chars
    metaDescription: 'Strategic digital marketing, paid advertising, and conversion funnels for Los Angeles businesses. Proven customer acquisition systems for LA enterprises.', // 153 chars
    canonicalUrl: `${BASE_URL}/usa/california/los-angeles/digital-marketing`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Los Angeles Digital Marketing Agency | House Robotics',
    ogDescription: 'Strategic digital marketing, paid advertising, and conversion funnels for Los Angeles businesses. Proven customer acquisition systems for LA enterprises.',
    ogImage: `${BASE_URL}/assets/social-media-marketing-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Los Angeles Digital Marketing Agency | House Robotics',
    twitterDescription: 'Strategic digital marketing, paid advertising, and conversion funnels for Los Angeles businesses. Proven customer acquisition systems for LA enterprises.',
    twitterImage: `${BASE_URL}/assets/social-media-marketing-page-hero.webp`,
    h1: 'Strategic Digital Marketing & Customer Acquisition in Los Angeles',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'California', url: `${BASE_URL}/usa/california` },
      { name: 'Los Angeles', url: `${BASE_URL}/usa/california/los-angeles` },
      { name: 'Digital Marketing', url: `${BASE_URL}/usa/california/los-angeles/digital-marketing` }
    ]
  },

  '/usa/california/san-francisco/ai-automation': {
    path: '/usa/california/san-francisco/ai-automation',
    name: 'San Francisco AI Automation',
    primaryKeyword: 'San Francisco AI Automation',
    secondaryKeywords: ['Bay Area AI workflows', 'automated lead routing SF', 'enterprise AI integration'],
    searchIntent: 'Commercial',
    seoTitle: 'San Francisco AI Automation Systems | House Robotics', // 52 chars
    metaDescription: 'Custom AI automation and intelligent workflow engineering for San Francisco tech companies and scaling ventures. Automate operations and accelerate growth.', // 155 chars
    canonicalUrl: `${BASE_URL}/usa/california/san-francisco/ai-automation`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'San Francisco AI Automation Systems | House Robotics',
    ogDescription: 'Custom AI automation and intelligent workflow engineering for San Francisco tech companies and scaling ventures. Automate operations and accelerate growth.',
    ogImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'San Francisco AI Automation Systems | House Robotics',
    twitterDescription: 'Custom AI automation and intelligent workflow engineering for San Francisco tech companies and scaling ventures. Automate operations and accelerate growth.',
    twitterImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    h1: 'AI Automation & Intelligent Workflow Engineering in San Francisco',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'California', url: `${BASE_URL}/usa/california` },
      { name: 'San Francisco', url: `${BASE_URL}/usa/california/san-francisco` },
      { name: 'AI Automation', url: `${BASE_URL}/usa/california/san-francisco/ai-automation` }
    ]
  },

  '/usa/illinois/chicago/seo-services': {
    path: '/usa/illinois/chicago/seo-services',
    name: 'Chicago B2B SEO Services',
    primaryKeyword: 'Chicago B2B SEO Services',
    secondaryKeywords: ['Chicago SEO agency', 'industrial SEO Chicago', 'B2B search engine optimization Illinois'],
    searchIntent: 'Commercial',
    seoTitle: 'Chicago B2B SEO Services & Growth | House Robotics', // 50 chars
    metaDescription: 'Specialized B2B and industrial SEO services in Chicago. Technical search optimization, commercial keyword architecture, and qualified pipeline generation.', // 154 chars
    canonicalUrl: `${BASE_URL}/usa/illinois/chicago/seo-services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Chicago B2B SEO Services & Growth | House Robotics',
    ogDescription: 'Specialized B2B and industrial SEO services in Chicago. Technical search optimization, commercial keyword architecture, and qualified pipeline generation.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Chicago B2B SEO Services & Growth | House Robotics',
    twitterDescription: 'Specialized B2B and industrial SEO services in Chicago. Technical search optimization, commercial keyword architecture, and qualified pipeline generation.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'B2B SEO & Organic Lead Generation for Chicago Enterprises',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Illinois', url: `${BASE_URL}/usa/illinois` },
      { name: 'Chicago', url: `${BASE_URL}/usa/illinois/chicago` },
      { name: 'SEO Services', url: `${BASE_URL}/usa/illinois/chicago/seo-services` }
    ]
  },

  '/usa/florida/miami/web-development': {
    path: '/usa/florida/miami/web-development',
    name: 'Miami Web Development',
    primaryKeyword: 'Miami Website Development',
    secondaryKeywords: ['Miami web design', 'custom web developers Miami', 'luxury web design Florida'],
    searchIntent: 'Commercial',
    seoTitle: 'Miami Custom Website Development | House Robotics', // 49 chars
    metaDescription: 'Custom website development and modern web applications for Miami businesses. Ultra-fast performance, luxury design, and conversion-focused architecture.', // 152 chars
    canonicalUrl: `${BASE_URL}/usa/florida/miami/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Miami Custom Website Development | House Robotics',
    ogDescription: 'Custom website development and modern web applications for Miami businesses. Ultra-fast performance, luxury design, and conversion-focused architecture.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Miami Custom Website Development | House Robotics',
    twitterDescription: 'Custom website development and modern web applications for Miami businesses. Ultra-fast performance, luxury design, and conversion-focused architecture.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'High-Performance Custom Website Development in Miami, Florida',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Florida', url: `${BASE_URL}/usa/florida` },
      { name: 'Miami', url: `${BASE_URL}/usa/florida/miami` },
      { name: 'Web Development', url: `${BASE_URL}/usa/florida/miami/web-development` }
    ]
  },

  '/usa/texas/dallas/ppc-management': {
    path: '/usa/texas/dallas/ppc-management',
    name: 'Dallas PPC Management',
    primaryKeyword: 'Dallas PPC Management',
    secondaryKeywords: ['Google Ads agency Dallas', 'DFW PPC management', 'paid search Texas'],
    searchIntent: 'Commercial',
    seoTitle: 'Dallas PPC Management & Google Ads | House Robotics', // 51 chars
    metaDescription: 'Disciplined Google Ads and PPC management for Dallas-Fort Worth businesses. High-intent conversion capture, negative keyword architecture, and proven ROAS.', // 155 chars
    canonicalUrl: `${BASE_URL}/usa/texas/dallas/ppc-management`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Dallas PPC Management & Google Ads | House Robotics',
    ogDescription: 'Disciplined Google Ads and PPC management for Dallas-Fort Worth businesses. High-intent conversion capture, negative keyword architecture, and proven ROAS.',
    ogImage: `${BASE_URL}/assets/ppc-google-ads-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Dallas PPC Management & Google Ads | House Robotics',
    twitterDescription: 'Disciplined Google Ads and PPC management for Dallas-Fort Worth businesses. High-intent conversion capture, negative keyword architecture, and proven ROAS.',
    twitterImage: `${BASE_URL}/assets/ppc-google-ads-page-hero.webp`,
    h1: 'PPC Management & High-Converting Google Ads in Dallas-Fort Worth',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Texas', url: `${BASE_URL}/usa/texas` },
      { name: 'Dallas', url: `${BASE_URL}/usa/texas/dallas` },
      { name: 'PPC Management', url: `${BASE_URL}/usa/texas/dallas/ppc-management` }
    ]
  },

  '/usa/washington/seattle/web-development': {
    path: '/usa/washington/seattle/web-development',
    name: 'Seattle Web Development',
    primaryKeyword: 'Seattle Website Development',
    secondaryKeywords: ['Seattle web design', 'custom web development Seattle', 'cloud web engineering WA'],
    searchIntent: 'Commercial',
    seoTitle: 'Seattle Custom Website Development | House Robotics', // 51 chars
    metaDescription: 'Custom website development and modern web applications for Seattle businesses. Sub-second load times, cloud architecture, and conversion-focused UX.', // 148 chars
    canonicalUrl: `${BASE_URL}/usa/washington/seattle/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Seattle Custom Website Development | House Robotics',
    ogDescription: 'Custom website development and modern web applications for Seattle businesses. Sub-second load times, cloud architecture, and conversion-focused UX.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Seattle Custom Website Development | House Robotics',
    twitterDescription: 'Custom website development and modern web applications for Seattle businesses. Sub-second load times, cloud architecture, and conversion-focused UX.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'High-Performance Custom Website Development in Seattle, Washington',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Washington', url: `${BASE_URL}/usa/washington` },
      { name: 'Seattle', url: `${BASE_URL}/usa/washington/seattle` },
      { name: 'Web Development', url: `${BASE_URL}/usa/washington/seattle/web-development` }
    ]
  },

  '/usa/georgia/atlanta/seo-services': {
    path: '/usa/georgia/atlanta/seo-services',
    name: 'Atlanta SEO Services',
    primaryKeyword: 'Atlanta SEO Services',
    secondaryKeywords: ['Atlanta SEO agency', 'organic search Atlanta GA', 'commercial SEO Georgia'],
    searchIntent: 'Commercial',
    seoTitle: 'Atlanta SEO Services & Organic Search | House Robotics', // 54 chars
    metaDescription: 'Strategic SEO and organic search dominance for Atlanta businesses. Technical audits, high-intent keyword ranking, and compounding revenue pipeline.', // 147 chars
    canonicalUrl: `${BASE_URL}/usa/georgia/atlanta/seo-services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Atlanta SEO Services & Organic Search | House Robotics',
    ogDescription: 'Strategic SEO and organic search dominance for Atlanta businesses. Technical audits, high-intent keyword ranking, and compounding revenue pipeline.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Atlanta SEO Services & Organic Search | House Robotics',
    twitterDescription: 'Strategic SEO and organic search dominance for Atlanta businesses. Technical audits, high-intent keyword ranking, and compounding revenue pipeline.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'High-Performance SEO Services for Atlanta Commercial Leaders',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Georgia', url: `${BASE_URL}/usa/georgia` },
      { name: 'Atlanta', url: `${BASE_URL}/usa/georgia/atlanta` },
      { name: 'SEO Services', url: `${BASE_URL}/usa/georgia/atlanta/seo-services` }
    ]
  },

  '/usa/massachusetts/boston/ai-automation': {
    path: '/usa/massachusetts/boston/ai-automation',
    name: 'Boston AI Automation',
    primaryKeyword: 'Boston AI Automation',
    secondaryKeywords: ['Boston AI workflow engineering', 'biotech AI automation', 'business process automation Boston'],
    searchIntent: 'Commercial',
    seoTitle: 'Boston AI Automation & Workflows | House Robotics', // 49 chars
    metaDescription: 'Custom AI automation and intelligent workflow engineering for Boston biotechnology, education, and tech ventures. Streamline operations and save hours.', // 151 chars
    canonicalUrl: `${BASE_URL}/usa/massachusetts/boston/ai-automation`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Boston AI Automation & Workflows | House Robotics',
    ogDescription: 'Custom AI automation and intelligent workflow engineering for Boston biotechnology, education, and tech ventures. Streamline operations and save hours.',
    ogImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Boston AI Automation & Workflows | House Robotics',
    twitterDescription: 'Custom AI automation and intelligent workflow engineering for Boston biotechnology, education, and tech ventures. Streamline operations and save hours.',
    twitterImage: `${BASE_URL}/assets/home-ai-automation.webp`,
    h1: 'AI Automation & Intelligent Workflow Systems in Boston, Massachusetts',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Massachusetts', url: `${BASE_URL}/usa/massachusetts` },
      { name: 'Boston', url: `${BASE_URL}/usa/massachusetts/boston` },
      { name: 'AI Automation', url: `${BASE_URL}/usa/massachusetts/boston/ai-automation` }
    ]
  },

  '/usa/colorado/denver/web-development': {
    path: '/usa/colorado/denver/web-development',
    name: 'Denver Web Development',
    primaryKeyword: 'Denver Website Development',
    secondaryKeywords: ['Denver web design', 'custom web development Colorado', 'Rocky Mountain web engineering'],
    searchIntent: 'Commercial',
    seoTitle: 'Denver Custom Website Development | House Robotics', // 50 chars
    metaDescription: 'Custom website development and modern web applications for Denver tech, clean energy, and commercial leaders. Built for high speed and conversion.', // 146 chars
    canonicalUrl: `${BASE_URL}/usa/colorado/denver/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Denver Custom Website Development | House Robotics',
    ogDescription: 'Custom website development and modern web applications for Denver tech, clean energy, and commercial leaders. Built for high speed and conversion.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Denver Custom Website Development | House Robotics',
    twitterDescription: 'Custom website development and modern web applications for Denver tech, clean energy, and commercial leaders. Built for high speed and conversion.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Custom Website Development & Modern Engineering in Denver, Colorado',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Colorado', url: `${BASE_URL}/usa/colorado` },
      { name: 'Denver', url: `${BASE_URL}/usa/colorado/denver` },
      { name: 'Web Development', url: `${BASE_URL}/usa/colorado/denver/web-development` }
    ]
  },

  '/usa/arizona/phoenix/local-seo': {
    path: '/usa/arizona/phoenix/local-seo',
    name: 'Phoenix Local SEO',
    primaryKeyword: 'Phoenix Local SEO',
    secondaryKeywords: ['Phoenix local search', 'Google Maps 3 pack Phoenix', 'Valley of the Sun SEO'],
    searchIntent: 'Commercial',
    seoTitle: 'Phoenix Local SEO & Maps Ranking | House Robotics', // 49 chars
    metaDescription: 'Targeted local SEO, Google Business Profile optimization, and local citation architecture for commercial service leaders across Greater Phoenix, Arizona.', // 153 chars
    canonicalUrl: `${BASE_URL}/usa/arizona/phoenix/local-seo`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Phoenix Local SEO & Maps Ranking | House Robotics',
    ogDescription: 'Targeted local SEO, Google Business Profile optimization, and local citation architecture for commercial service leaders across Greater Phoenix, Arizona.',
    ogImage: `${BASE_URL}/assets/local-seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Phoenix Local SEO & Maps Ranking | House Robotics',
    twitterDescription: 'Targeted local SEO, Google Business Profile optimization, and local citation architecture for commercial service leaders across Greater Phoenix, Arizona.',
    twitterImage: `${BASE_URL}/assets/local-seo-page-hero.webp`,
    h1: 'Local SEO & Google Maps 3-Pack Marketing in Phoenix, Arizona',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Arizona', url: `${BASE_URL}/usa/arizona` },
      { name: 'Phoenix', url: `${BASE_URL}/usa/arizona/phoenix` },
      { name: 'Local SEO', url: `${BASE_URL}/usa/arizona/phoenix/local-seo` }
    ]
  },

  '/usa/texas/houston/seo-services': {
    path: '/usa/texas/houston/seo-services',
    name: 'Houston SEO Services',
    primaryKeyword: 'Houston SEO Services',
    secondaryKeywords: ['Houston SEO agency', 'industrial SEO Houston TX', 'energy sector organic search'],
    searchIntent: 'Commercial',
    seoTitle: 'Houston SEO Services & Organic Search | House Robotics', // 54 chars
    metaDescription: 'Strategic technical SEO, enterprise keyword architecture, and organic lead acquisition for Houston energy, manufacturing, and commercial leaders.', // 145 chars
    canonicalUrl: `${BASE_URL}/usa/texas/houston/seo-services`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Houston SEO Services & Organic Search | House Robotics',
    ogDescription: 'Strategic technical SEO, enterprise keyword architecture, and organic lead acquisition for Houston energy, manufacturing, and commercial leaders.',
    ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Houston SEO Services & Organic Search | House Robotics',
    twitterDescription: 'Strategic technical SEO, enterprise keyword architecture, and organic lead acquisition for Houston energy, manufacturing, and commercial leaders.',
    twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
    h1: 'B2B & Industrial SEO Services in Houston, Texas',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'Texas', url: `${BASE_URL}/usa/texas` },
      { name: 'Houston', url: `${BASE_URL}/usa/texas/houston` },
      { name: 'SEO Services', url: `${BASE_URL}/usa/texas/houston/seo-services` }
    ]
  },

  '/usa/california/san-diego/web-development': {
    path: '/usa/california/san-diego/web-development',
    name: 'San Diego Web Development',
    primaryKeyword: 'San Diego Website Development',
    secondaryKeywords: ['San Diego web design', 'custom web apps San Diego CA', 'biotech web development'],
    searchIntent: 'Commercial',
    seoTitle: 'San Diego Website Development Services | House Robotics', // 55 chars
    metaDescription: 'Modern custom web development, React applications, and enterprise CMS engineering for San Diego biotechnology, defense, and technology companies.', // 145 chars
    canonicalUrl: `${BASE_URL}/usa/california/san-diego/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'San Diego Website Development Services | House Robotics',
    ogDescription: 'Modern custom web development, React applications, and enterprise CMS engineering for San Diego biotechnology, defense, and technology companies.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'San Diego Website Development Services | House Robotics',
    twitterDescription: 'Modern custom web development, React applications, and enterprise CMS engineering for San Diego biotechnology, defense, and technology companies.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Custom Website Development & Modern Engineering in San Diego, California',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'California', url: `${BASE_URL}/usa/california` },
      { name: 'San Diego', url: `${BASE_URL}/usa/california/san-diego` },
      { name: 'Web Development', url: `${BASE_URL}/usa/california/san-diego/web-development` }
    ]
  },

  '/usa/north-carolina/charlotte/web-development': {
    path: '/usa/north-carolina/charlotte/web-development',
    name: 'Charlotte Web Development',
    primaryKeyword: 'Charlotte Website Development',
    secondaryKeywords: ['Charlotte web design', 'banking tech web development NC', 'custom web engineering Charlotte'],
    searchIntent: 'Commercial',
    seoTitle: 'Charlotte Website Development Services | House Robotics', // 55 chars
    metaDescription: 'Custom website development and modern web apps for Charlotte financial, healthcare, and corporate firms. Ultra-fast performance and security.', // 141 chars
    canonicalUrl: `${BASE_URL}/usa/north-carolina/charlotte/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'Charlotte Website Development Services | House Robotics',
    ogDescription: 'Custom website development and modern web apps for Charlotte financial, healthcare, and corporate firms. Ultra-fast performance and security.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Charlotte Website Development Services | House Robotics',
    twitterDescription: 'Custom website development and modern web apps for Charlotte financial, healthcare, and corporate firms. Ultra-fast performance and security.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Enterprise Website Development in Charlotte, North Carolina',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'North Carolina', url: `${BASE_URL}/usa/north-carolina` },
      { name: 'Charlotte', url: `${BASE_URL}/usa/north-carolina/charlotte` },
      { name: 'Web Development', url: `${BASE_URL}/usa/north-carolina/charlotte/web-development` }
    ]
  },

  '/usa/california/san-francisco/web-development': {
    path: '/usa/california/san-francisco/web-development',
    name: 'San Francisco Web Development',
    primaryKeyword: 'San Francisco Website Development',
    secondaryKeywords: ['San Francisco web design', 'startup web development SF', 'Silicon Valley web apps'],
    searchIntent: 'Commercial',
    seoTitle: 'San Francisco Website Development | House Robotics', // 50 chars
    metaDescription: 'High-performance custom website development and React engineering for San Francisco technology companies, AI startups, and SaaS platforms.', // 138 chars
    canonicalUrl: `${BASE_URL}/usa/california/san-francisco/web-development`,
    robots: 'index, follow',
    ogType: 'website',
    ogTitle: 'San Francisco Website Development | House Robotics',
    ogDescription: 'High-performance custom website development and React engineering for San Francisco technology companies, AI startups, and SaaS platforms.',
    ogImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'San Francisco Website Development | House Robotics',
    twitterDescription: 'High-performance custom website development and React engineering for San Francisco technology companies, AI startups, and SaaS platforms.',
    twitterImage: `${BASE_URL}/assets/web-development-page-hero.webp`,
    h1: 'Next-Gen Custom Website Development in San Francisco, California',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'USA', url: `${BASE_URL}/usa` },
      { name: 'California', url: `${BASE_URL}/usa/california` },
      { name: 'San Francisco', url: `${BASE_URL}/usa/california/san-francisco` },
      { name: 'Web Development', url: `${BASE_URL}/usa/california/san-francisco/web-development` }
    ]
  },

  '/how-much-does-seo-cost-in-the-uk': {
    path: '/how-much-does-seo-cost-in-the-uk',
    name: 'UK SEO Cost Guide 2026',
    primaryKeyword: 'how much does SEO cost in the UK',
    secondaryKeywords: ['UK SEO pricing', 'SEO retainers UK', 'SEO agency costs'],
    searchIntent: 'Informational',
    seoTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide', // 52 chars
    metaDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.', // 154 chars
    canonicalUrl: `${BASE_URL}/how-much-does-seo-cost-in-the-uk/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    ogDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    ogImage: `${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    twitterDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    twitterImage: `${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp`,
    h1: 'How Much Does SEO Cost in the UK? Complete 2026 Pricing Guide',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'UK SEO Costs', url: `${BASE_URL}/how-much-does-seo-cost-in-the-uk/` }
    ]
  },

  '/what-is-seo-and-why-does-your-business-need-it': {
    path: '/what-is-seo-and-why-does-your-business-need-it',
    name: 'What Is SEO Guide',
    primaryKeyword: 'what is SEO and why does your business need it',
    secondaryKeywords: ['organic search visibility', 'why SEO matters', 'benefits of SEO'],
    searchIntent: 'Informational',
    seoTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)', // 53 chars
    metaDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.', // 146 chars
    canonicalUrl: `${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    ogDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    ogImage: `${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    twitterDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    twitterImage: `${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp`,
    h1: 'What Is SEO and Why Does Your Business Need It in 2026?',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'What Is SEO', url: `${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/` }
    ]
  },

  '/seo-vs-ppc-which-is-better-for-your-business': {
    path: '/seo-vs-ppc-which-is-better-for-your-business',
    name: 'SEO vs PPC Comparison',
    primaryKeyword: 'SEO vs PPC',
    secondaryKeywords: ['organic search vs paid ads', 'SEO vs Google ads', 'search engine marketing comparison'],
    searchIntent: 'Informational',
    seoTitle: 'SEO vs PPC: Which Is Better for Your Business?', // 46 chars
    metaDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.', // 153 chars
    canonicalUrl: `${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    ogDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    ogImage: `${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    twitterDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    twitterImage: `${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp`,
    h1: 'SEO vs PPC: Which Search Strategy Is Better for Your Business?',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'SEO vs PPC', url: `${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/` }
    ]
  },

  '/how-google-business-profile-helps-local-businesses': {
    path: '/how-google-business-profile-helps-local-businesses',
    name: 'Google Business Profile Guide',
    primaryKeyword: 'how Google Business Profile helps local businesses',
    secondaryKeywords: ['Google Business Profile local SEO', 'Google Maps 3 pack guide', 'local listing management'],
    searchIntent: 'Informational',
    seoTitle: 'How Google Business Profile Helps Local Businesses | Guide', // 58 chars
    metaDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.', // 159 chars
    canonicalUrl: `${BASE_URL}/how-google-business-profile-helps-local-businesses/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    ogDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    ogImage: `${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    twitterDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    twitterImage: `${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp`,
    h1: 'How Google Business Profile Helps Local Businesses Win Customers',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Google Business Profile', url: `${BASE_URL}/how-google-business-profile-helps-local-businesses/` }
    ]
  },

  '/how-to-improve-your-google-rankings-in-2026': {
    path: '/how-to-improve-your-google-rankings-in-2026',
    name: 'Improve Google Rankings 2026',
    primaryKeyword: 'how to improve your Google rankings in 2026',
    secondaryKeywords: ['boost Google rankings', '2026 SEO roadmap', 'AI overviews optimization'],
    searchIntent: 'Informational',
    seoTitle: 'How to Improve Google Rankings in 2026 | Full Guide', // 51 chars
    metaDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.', // 154 chars
    canonicalUrl: `${BASE_URL}/how-to-improve-your-google-rankings-in-2026/`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    ogDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    ogImage: `${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    twitterDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    twitterImage: `${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp`,
    h1: 'How to Improve Your Google Rankings in 2026: The Tactical Playbook',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Improve Google Rankings', url: `${BASE_URL}/how-to-improve-your-google-rankings-in-2026/` }
    ]
  },

  '/blog/the-modern-seo-playbook': {
    path: '/blog/the-modern-seo-playbook',
    name: 'Modern SEO Playbook',
    primaryKeyword: 'modern SEO playbook',
    secondaryKeywords: ['generative engine optimization', 'AI overviews SEO', 'entity search'],
    searchIntent: 'Informational',
    seoTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics', // 58 chars
    metaDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.', // 145 chars
    canonicalUrl: `${BASE_URL}/blog/the-modern-seo-playbook`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics',
    ogDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.',
    ogImage: `${BASE_URL}/images/blog-ai-search.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Modern SEO Playbook: Ranking in AI Search | House Robotics',
    twitterDescription: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.',
    twitterImage: `${BASE_URL}/images/blog-ai-search.svg`,
    h1: 'The Modern SEO Playbook: How AI Overviews Are Changing Search Rankings',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Modern SEO Playbook', url: `${BASE_URL}/blog/the-modern-seo-playbook` }
    ]
  },

  '/blog/practical-ai-automation': {
    path: '/blog/practical-ai-automation',
    name: 'Practical AI Automation Guide',
    primaryKeyword: 'practical AI automation',
    secondaryKeywords: ['business workflow automation', 'CRM AI webhooks', 'eliminate manual busywork'],
    searchIntent: 'Informational',
    seoTitle: 'Practical AI Automation for Businesses | House Robotics', // 55 chars
    metaDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.', // 145 chars
    canonicalUrl: `${BASE_URL}/blog/practical-ai-automation`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Practical AI Automation for Businesses | House Robotics',
    ogDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.',
    ogImage: `${BASE_URL}/images/blog-autonomous-agents.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Practical AI Automation for Businesses | House Robotics',
    twitterDescription: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.',
    twitterImage: `${BASE_URL}/images/blog-autonomous-agents.svg`,
    h1: 'Practical AI Automation: Replacing Busywork with Connected Workflows',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Practical AI Automation', url: `${BASE_URL}/blog/practical-ai-automation` }
    ]
  },

  '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier': {
    path: '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier',
    name: 'Why Page Speed Multiplies Conversions',
    primaryKeyword: 'page speed conversion rate',
    secondaryKeywords: ['Core Web Vitals CRO', 'website speed optimization', 'bounce rate reduction'],
    searchIntent: 'Informational',
    seoTitle: 'Why Page Speed Multiplies Conversions | House Robotics', // 54 chars
    metaDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.', // 142 chars
    canonicalUrl: `${BASE_URL}/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Why Page Speed Multiplies Conversions | House Robotics',
    ogDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.',
    ogImage: `${BASE_URL}/images/blog-react-perf.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Why Page Speed Multiplies Conversions | House Robotics',
    twitterDescription: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.',
    twitterImage: `${BASE_URL}/images/blog-react-perf.svg`,
    h1: 'Why Page Speed Is the Ultimate Conversion Rate Multiplier',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Page Speed & Conversion', url: `${BASE_URL}/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier` }
    ]
  },

  '/blog/google-ads-in-2026-eliminating-wasteful-spend': {
    path: '/blog/google-ads-in-2026-eliminating-wasteful-spend',
    name: 'Google Ads 2026 Strategy',
    primaryKeyword: 'eliminate wasteful Google Ads spend',
    secondaryKeywords: ['negative keyword lists', 'Google ads audit', 'reduce paid acquisition cost'],
    searchIntent: 'Informational',
    seoTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics', // 59 chars
    metaDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.', // 142 chars
    canonicalUrl: `${BASE_URL}/blog/google-ads-in-2026-eliminating-wasteful-spend`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics',
    ogDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.',
    ogImage: `${BASE_URL}/images/blog-b2b-funnels.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics',
    twitterDescription: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.',
    twitterImage: `${BASE_URL}/images/blog-b2b-funnels.svg`,
    h1: 'Google Ads in 2026: Eliminating Wasteful Spend with Precision Negative Lists',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Google Ads 2026 Strategy', url: `${BASE_URL}/blog/google-ads-in-2026-eliminating-wasteful-spend` }
    ]
  },

  '/blog/google-maps-3-pack-mastery': {
    path: '/blog/google-maps-3-pack-mastery',
    name: 'Google Maps 3-Pack Mastery',
    primaryKeyword: 'Google Maps 3 pack mastery',
    secondaryKeywords: ['local geo grid ranking', 'Google Business Profile 3-pack', 'local proximity SEO'],
    searchIntent: 'Informational',
    seoTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics', // 55 chars
    metaDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.', // 140 chars
    canonicalUrl: `${BASE_URL}/blog/google-maps-3-pack-mastery`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics',
    ogDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.',
    ogImage: `${BASE_URL}/images/blog-local-maps.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics',
    twitterDescription: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.',
    twitterImage: `${BASE_URL}/images/blog-local-maps.svg`,
    h1: 'Google Maps 3-Pack Mastery: Local Geo-Grid Dominance',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Maps 3-Pack Mastery', url: `${BASE_URL}/blog/google-maps-3-pack-mastery` }
    ]
  },

  '/blog/high-converting-short-form-video-systems': {
    path: '/blog/high-converting-short-form-video-systems',
    name: 'Short-Form Video Systems',
    primaryKeyword: 'short form video marketing',
    secondaryKeywords: ['TikTok marketing funnel', 'Instagram Reels for business', 'video conversion hooks'],
    searchIntent: 'Informational',
    seoTitle: 'Short-Form Video Systems That Convert | House Robotics', // 54 chars
    metaDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.', // 139 chars
    canonicalUrl: `${BASE_URL}/blog/high-converting-short-form-video-systems`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'Short-Form Video Systems That Convert | House Robotics',
    ogDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.',
    ogImage: `${BASE_URL}/images/blog-short-form.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Short-Form Video Systems That Convert | House Robotics',
    twitterDescription: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.',
    twitterImage: `${BASE_URL}/images/blog-short-form.svg`,
    h1: 'High-Converting Short-Form Video Systems for Modern Brands',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: 'Short-Form Video Systems', url: `${BASE_URL}/blog/high-converting-short-form-video-systems` }
    ]
  },

  '/404': {
    path: '/404',
    name: '404 Not Found',
    primaryKeyword: 'page not found',
    secondaryKeywords: ['404 error', 'missing page'],
    searchIntent: 'Navigational',
    seoTitle: 'Page Not Found (404) | House Robotics', // 37 chars
    metaDescription: 'The requested page could not be found. Explore House Robotics digital marketing services, read our growth blog, or return to the homepage.', // 138 chars
    canonicalUrl: `${BASE_URL}/404`,
    robots: 'noindex, follow',
    ogType: 'website',
    ogTitle: 'Page Not Found (404) | House Robotics',
    ogDescription: 'The requested page could not be found. Explore House Robotics digital marketing services, read our growth blog, or return to the homepage.',
    ogImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    twitterCard: 'summary',
    twitterTitle: 'Page Not Found (404) | House Robotics',
    twitterDescription: 'The requested page could not be found. Explore House Robotics digital marketing services, read our growth blog, or return to the homepage.',
    twitterImage: `${BASE_URL}/assets/home-hero-visual.webp`,
    h1: '404 — Page Not Found',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: '404', url: `${BASE_URL}/404` }
    ]
  }
};

/**
 * Universal helper to update or create DOM meta tags
 */
function setMetaTag(selector: string, attributeName: string, attributeValue: string, contentValue: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', contentValue);
}

/**
 * Universal helper to update or create DOM link tags
 */
function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Universal helper to inject or replace JSON-LD script tags
 */
function setJsonLdScript(id: string, data: object) {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

/**
 * Organization Schema structured data
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'House Robotics',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/favicon.svg`,
    caption: 'House Robotics Logo'
  },
  description: 'House Robotics combines digital marketing, AI automation, SEO, and web development to help ambitious businesses scale faster.',
  email: 'sameerliaqat81@gmail.com',
  telephone: '+92 347 4542881',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+92 347 4542881',
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu']
    }
  ],
  sameAs: [
    'https://wa.me/923474542881'
  ]
};

/**
 * WebSite Schema structured data
 */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'House Robotics',
  description: 'Full-Service Digital Marketing & Technology Agency',
  publisher: {
    '@id': `${BASE_URL}/#organization`
  },
  inLanguage: 'en-US'
};

/**
 * Apply SEO metadata and structured data to the current page document
 */
export function applyPageSeo(
  pathOrKey: string,
  overrides?: Partial<PageSeoConfig>
): PageSeoConfig {
  if (typeof document === 'undefined') {
    return SEO_METADATA_REGISTRY['/'];
  }

  // Normalize path
  let cleanPath = pathOrKey.startsWith('/') ? pathOrKey : `/${pathOrKey}`;
  cleanPath = cleanPath.replace(/\/+$/, '') || '/';

  // Find matching config or alias
  let config: PageSeoConfig = SEO_METADATA_REGISTRY[cleanPath];

  if (!config) {
    // Check aliases
    const aliases: Record<string, string> = {
      '/blog/how-much-does-seo-cost-in-the-uk': '/how-much-does-seo-cost-in-the-uk',
      '/blog/what-is-seo-and-why-does-your-business-need-it': '/what-is-seo-and-why-does-your-business-need-it',
      '/blog/seo-vs-ppc-which-is-better-for-your-business': '/seo-vs-ppc-which-is-better-for-your-business',
      '/blog/how-google-business-profile-helps-local-businesses': '/how-google-business-profile-helps-local-businesses',
      '/blog/how-to-improve-your-google-rankings-in-2026': '/how-to-improve-your-google-rankings-in-2026',
      '/home': '/',
      '/google-maps-ranking': '/local-seo',
      '/social-media-marketing': '/social-media',
      '/meta-ads': '/social-media',
      '/ppc-google-ads': '/ppc',
      '/marketing-automation': '/ai-automation',
      '/custom-web-development': '/web-development',
      '/wordpress-development': '/wordpress',
      '/shopify-development': '/shopify',
      '/ecommerce-development': '/ecommerce',
      '/conversion-rate-optimization': '/cro',
      '/analytics-reporting': '/analytics',
      '/branding-graphic-design': '/branding',
      '/online-reputation-management': '/online-reputation'
    };

    const aliased = aliases[cleanPath];
    if (aliased && SEO_METADATA_REGISTRY[aliased]) {
      config = SEO_METADATA_REGISTRY[aliased];
    } else if (cleanPath.startsWith('/blog/')) {
      // Dynamic blog post fallback
      const slug = cleanPath.replace('/blog/', '');
      config = {
        path: cleanPath,
        name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        primaryKeyword: slug.replace(/-/g, ' '),
        secondaryKeywords: ['House Robotics blog', 'digital marketing strategy'],
        searchIntent: 'Informational',
        seoTitle: `${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ').substring(0, 44)} | House Robotics`,
        metaDescription: `Read expert insights and tactical guides on ${slug.replace(/-/g, ' ')} from the House Robotics digital marketing and tech desk.`,
        canonicalUrl: `${BASE_URL}${cleanPath}`,
        robots: 'index, follow',
        ogType: 'article',
        ogTitle: `${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ').substring(0, 44)} | House Robotics`,
        ogDescription: `Read expert insights and tactical guides on ${slug.replace(/-/g, ' ')} from the House Robotics digital marketing and tech desk.`,
        ogImage: `${BASE_URL}/assets/blog-page-hero.webp`,
        twitterCard: 'summary_large_image',
        twitterTitle: `${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ').substring(0, 44)} | House Robotics`,
        twitterDescription: `Read expert insights and tactical guides on ${slug.replace(/-/g, ' ')} from the House Robotics digital marketing and tech desk.`,
        twitterImage: `${BASE_URL}/assets/blog-page-hero.webp`,
        h1: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Blog', url: `${BASE_URL}/blog` },
          { name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), url: `${BASE_URL}${cleanPath}` }
        ]
      };
    } else if (cleanPath.startsWith('/usa/')) {
      // Dynamic USA location page handling
      const segments = cleanPath.split('/').filter(Boolean);
      // segments[0] === 'usa'
      const stateSegment = segments[1];
      const citySegment = segments[2];
      const serviceSegment = segments[3];

      if (stateSegment && !citySegment) {
        // State Overview Page
        const stateName = stateSegment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        const seoTitle = `Web Dev, SEO & AI in ${stateName} | House Robotics`;
        const metaDescription = `Scalable web development, technical SEO, and AI automation for businesses across ${stateName}. Remote excellence for commercial growth.`;
        config = {
          path: cleanPath,
          name: `${stateName} Market Overview`,
          primaryKeyword: `digital marketing and web development ${stateName}`,
          secondaryKeywords: [`${stateName} SEO agency`, `${stateName} web development`, `AI automation ${stateName}`],
          searchIntent: 'Commercial',
          seoTitle,
          metaDescription,
          canonicalUrl: `${BASE_URL}${cleanPath}`,
          robots: 'index, follow',
          ogType: 'website',
          ogTitle: seoTitle,
          ogDescription: metaDescription,
          ogImage: `${BASE_URL}/assets/home-hero-visual.webp`,
          twitterCard: 'summary_large_image',
          twitterTitle: seoTitle,
          twitterDescription: metaDescription,
          twitterImage: `${BASE_URL}/assets/home-hero-visual.webp`,
          h1: `Digital Marketing, SEO & Web Development in ${stateName}`,
          breadcrumbs: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'USA', url: `${BASE_URL}/usa` },
            { name: stateName, url: `${BASE_URL}${cleanPath}` }
          ]
        };
      } else if (stateSegment && citySegment && !serviceSegment) {
        // City Overview Page
        const stateCodeMap: Record<string, string> = {
          'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
          'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'district-of-columbia': 'DC', 'florida': 'FL',
          'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN',
          'iowa': 'IA', 'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME',
          'maryland': 'MD', 'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
          'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new-hampshire': 'NH',
          'new-jersey': 'NJ', 'new-mexico': 'NM', 'new-york': 'NY', 'north-carolina': 'NC', 'north-dakota': 'ND',
          'ohio': 'OH', 'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode-island': 'RI',
          'south-carolina': 'SC', 'south-dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
          'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west-virginia': 'WV', 'wisconsin': 'WI',
          'wyoming': 'WY'
        };
        const stCode = stateCodeMap[stateSegment] || stateSegment.toUpperCase();
        const cityName = citySegment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        const seoTitle = `Web Dev, SEO & AI in ${cityName}, ${stCode} | House Robotics`;
        const metaDescription = `Expand your commercial reach in ${cityName}, ${stCode} with custom web engineering, high-ranking SEO, and smart AI automation. Book a discovery call.`;
        config = {
          path: cleanPath,
          name: `${cityName}, ${stCode} Profile`,
          primaryKeyword: `web development and SEO ${cityName} ${stCode}`,
          secondaryKeywords: [`${cityName} SEO services`, `${cityName} web design`, `AI automation ${cityName}`],
          searchIntent: 'Commercial',
          seoTitle,
          metaDescription,
          canonicalUrl: `${BASE_URL}${cleanPath}`,
          robots: 'index, follow',
          ogType: 'website',
          ogTitle: seoTitle,
          ogDescription: metaDescription,
          ogImage: `${BASE_URL}/assets/home-hero-visual.webp`,
          twitterCard: 'summary_large_image',
          twitterTitle: seoTitle,
          twitterDescription: metaDescription,
          twitterImage: `${BASE_URL}/assets/home-hero-visual.webp`,
          h1: `Custom Web Engineering, SEO & AI Automation in ${cityName}`,
          breadcrumbs: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'USA', url: `${BASE_URL}/usa` },
            { name: stateSegment.replace(/-/g, ' ').toUpperCase(), url: `${BASE_URL}/usa/${stateSegment}` },
            { name: cityName, url: `${BASE_URL}${cleanPath}` }
          ]
        };
      } else if (stateSegment && citySegment && serviceSegment) {
        // City-Service Landing Page
        const cityName = citySegment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        const serviceName = serviceSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const seoTitle = `${serviceName} in ${cityName} | House Robotics`;
        const metaDescription = `Explore ${serviceSegment.replace(/-/g, ' ')} in ${cityName} with custom technical execution and performance tracking tailored to your business goals.`;
        config = {
          path: cleanPath,
          name: `${serviceName} in ${cityName}`,
          primaryKeyword: `${serviceSegment.replace(/-/g, ' ')} ${cityName}`,
          secondaryKeywords: [`${cityName} ${serviceSegment.replace(/-/g, ' ')}`, `${serviceName} agency`],
          searchIntent: 'Commercial',
          seoTitle,
          metaDescription,
          canonicalUrl: `${BASE_URL}${cleanPath}`,
          robots: 'index, follow',
          ogType: 'website',
          ogTitle: seoTitle,
          ogDescription: metaDescription,
          ogImage: `${BASE_URL}/assets/seo-page-hero.webp`,
          twitterCard: 'summary_large_image',
          twitterTitle: seoTitle,
          twitterDescription: metaDescription,
          twitterImage: `${BASE_URL}/assets/seo-page-hero.webp`,
          h1: `${serviceName} Engineered for Businesses in ${cityName}`,
          breadcrumbs: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'USA', url: `${BASE_URL}/usa` },
            { name: stateSegment.replace(/-/g, ' ').toUpperCase(), url: `${BASE_URL}/usa/${stateSegment}` },
            { name: cityName, url: `${BASE_URL}/usa/${stateSegment}/${citySegment}` },
            { name: serviceName, url: `${BASE_URL}${cleanPath}` }
          ]
        };
      } else {
        config = SEO_METADATA_REGISTRY['/404'];
      }
    } else {
      config = SEO_METADATA_REGISTRY['/404'];
    }
  }

  // Normalize legacy override keys if passed
  const cleanOverrides = { ...overrides } as any;
  if (cleanOverrides.title && !cleanOverrides.seoTitle) cleanOverrides.seoTitle = cleanOverrides.title;
  if (cleanOverrides.description && !cleanOverrides.metaDescription) cleanOverrides.metaDescription = cleanOverrides.description;
  if (cleanOverrides.canonical && !cleanOverrides.canonicalUrl) cleanOverrides.canonicalUrl = cleanOverrides.canonical;

  // Merge any custom overrides (from CMS or props)
  const finalConfig: PageSeoConfig = {
    ...config,
    ...cleanOverrides
  };

  // 1. Update Title Tag
  document.title = finalConfig.seoTitle;

  // 2. Update Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', finalConfig.metaDescription);

  // 3. Update Robots Directive
  setMetaTag('meta[name="robots"]', 'name', 'robots', finalConfig.robots);

  // 4. Update Canonical Link
  setLinkTag('canonical', finalConfig.canonicalUrl);

  // 5. Update Open Graph Meta
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalConfig.ogTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalConfig.ogDescription);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalConfig.canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', finalConfig.ogType);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalConfig.ogImage);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'House Robotics');

  // 6. Update Twitter Card Meta
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', finalConfig.twitterCard);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalConfig.twitterTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalConfig.twitterDescription);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalConfig.twitterImage);

  // 7. Inject Base Organization and WebSite Schema
  setJsonLdScript('hr-schema-org', ORGANIZATION_SCHEMA);
  setJsonLdScript('hr-schema-website', WEBSITE_SCHEMA);

  // 8. Inject BreadcrumbList Schema
  if (finalConfig.breadcrumbs && finalConfig.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: finalConfig.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
    setJsonLdScript('hr-schema-breadcrumbs', breadcrumbSchema);
  }

  // 9. Inject Service Schema if applicable
  if (finalConfig.serviceSchema) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: finalConfig.serviceSchema.name,
      description: finalConfig.serviceSchema.description,
      provider: {
        '@type': 'Organization',
        name: 'House Robotics',
        url: BASE_URL
      },
      serviceType: finalConfig.serviceSchema.category,
      areaServed: 'Worldwide',
      url: finalConfig.canonicalUrl
    };
    setJsonLdScript('hr-schema-service', serviceSchema);
  } else {
    // Clean up service schema if not a service page
    const existing = document.getElementById('hr-schema-service');
    if (existing) existing.remove();
  }

  // 10. Inject Article Schema if applicable
  if (finalConfig.ogType === 'article') {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: finalConfig.seoTitle,
      description: finalConfig.metaDescription,
      image: finalConfig.ogImage,
      author: {
        '@type': 'Organization',
        name: 'House Robotics Strategy Team',
        url: BASE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'House Robotics',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/favicon.svg`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': finalConfig.canonicalUrl
      }
    };
    setJsonLdScript('hr-schema-article', articleSchema);
  } else {
    const existing = document.getElementById('hr-schema-article');
    if (existing) existing.remove();
  }

  return finalConfig;
}
