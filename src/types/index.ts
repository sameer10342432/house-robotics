export type PageView = 
  | 'home'
  | 'about'
  | 'services'
  | 'seo'
  | 'local-seo'
  | 'social-media'
  | 'ppc'
  | 'ai-automation'
  | 'web-development'
  | 'wordpress'
  | 'shopify'
  | 'ecommerce'
  | 'email-marketing'
  | 'content-marketing'
  | 'cro'
  | 'lead-generation'
  | 'analytics'
  | 'branding'
  | 'video-marketing'
  | 'online-reputation'
  | 'contact'
  | 'blog'
  | 'admin'
  | 'usa'
  | 'not-found';

export interface ServiceItem {
  id: string;
  title: string;
  slug: PageView | string;
  category: 'Marketing' | 'Technology' | 'AI & Automation' | 'Growth';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  metrics: { label: string; value: string };
  gradient: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  category: 'SEO' | 'AI' | 'Digital Marketing' | 'Web Development' | 'Paid Advertising';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  authorRole?: string;
  content: string[] | string;
  image?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  rating: number;
  highlight: string;
  avatar?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  activities: string[];
}

export interface UsaStateRecord {
  id: string;
  name: string;
  code: string;
  slug: string;
  region: string;
  capital: string;
  majorIndustries: string;
  economicOverview: string;
  seoTitle?: string;
  metaDescription?: string;
  status: string;
  _count?: { cities: number };
}

export interface UsaCityRecord {
  id: string;
  stateId: string;
  stateSlug: string;
  name: string;
  slug: string;
  county: string;
  metroArea: string;
  population: number;
  populationYear: string;
  majorIndustries: string;
  digitalDemandTier: string;
  priorityTier: number;
  commercialProfile: string;
  remoteDeliveryFit: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  status: string;
  state?: UsaStateRecord;
}

export interface UsaLocationPageRecord {
  id: string;
  pageType: 'USA_HUB' | 'STATE_OVERVIEW' | 'CITY_OVERVIEW' | 'CITY_SERVICE';
  stateSlug: string;
  citySlug?: string;
  serviceSlug?: string;
  urlPath: string;
  h1Title: string;
  heroKicker?: string;
  heroSubtitle?: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  contentIntro: string;
  localIndustryFocus?: any;
  businessProblemsSolved?: any;
  serviceDeliverables?: any;
  suitableCustomerTypes?: any;
  remoteCollaborationModel?: string;
  processSteps?: any;
  illustrativeScenarios?: any;
  faqs?: any;
  qualityGatePassed: boolean;
  qualityReviewNotes?: string;
  verifiedAt?: string;
  status: string;
  noIndex: boolean;
  leadsCount: number;
  createdAt: string;
  updatedAt: string;
}
