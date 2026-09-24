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
  | 'admin';

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
  category: 'SEO' | 'AI' | 'Digital Marketing' | 'Web Development' | 'Paid Advertising';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  content: string[];
  image?: string;
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
