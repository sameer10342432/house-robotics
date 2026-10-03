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
    } else {
      config = SEO_METADATA_REGISTRY['/404'];
    }
  }

  // Merge any custom overrides (from CMS or props)
  const finalConfig: PageSeoConfig = {
    ...config,
    ...(overrides || {})
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
