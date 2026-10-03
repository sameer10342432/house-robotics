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
