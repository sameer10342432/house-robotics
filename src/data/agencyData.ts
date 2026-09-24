import { ServiceItem, CaseStudy, BlogPost, Testimonial, ProcessStep } from '../types';

export const AGENCY_INFO = {
  name: 'House Robotics',
  tagline: 'Smart Digital Solutions. Powerful Business Growth.',
  description: 'House Robotics combines digital marketing, AI automation and technology to help ambitious businesses grow faster and smarter.',
  whatsapp: '+92 347 4542881',
  whatsappUrl: 'https://wa.me/923474542881',
  email: 'sameerliaqat81@gmail.com',
  emailUrl: 'mailto:sameerliaqat81@gmail.com',
};

export const CORE_CAPABILITIES = [
  'SEO',
  'Local SEO',
  'Google Maps Ranking',
  'Social Media Marketing',
  'PPC / Google Ads',
  'Meta Ads',
  'Email Marketing',
  'Content Marketing',
  'AI Automation',
  'Marketing Automation',
  'WordPress Development',
  'Shopify Development',
  'Custom Website Development',
  'E-commerce Development',
  'Website Maintenance',
  'Conversion Rate Optimization',
  'Lead Generation',
  'Analytics & Performance Reporting',
  'Branding & Graphic Design',
  'Video Marketing',
  'Online Reputation Management',
  'Mobile App Development',
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo',
    category: 'Marketing',
    shortDesc: 'Drive predictable, compounding organic traffic through technical SEO, authoritative link building, and intent-driven content.',
    fullDesc: 'Comprehensive organic search architecture tailored to dominate competitive keywords, boost domain authority, and generate high-intent search leads.',
    iconName: 'Search',
    deliverables: ['Technical SEO Audits & Core Web Vitals', 'High-Intent Keyword Architecture', 'Editorial Content Roadmaps', 'Enterprise Backlink Acquisition', 'Rank Tracking & Attribution'],
    metrics: { label: 'Avg. Organic Lift', value: '+140%' },
    gradient: 'from-violet-600 to-indigo-600'
  },
  {
    id: 'local-seo',
    title: 'Local SEO & Google Maps',
    slug: 'local-seo',
    category: 'Marketing',
    shortDesc: 'Dominate Google Local 3-Pack rankings, optimize Google Business Profile, and capture nearby ready-to-buy customers.',
    fullDesc: 'Turn geographical proximity into inbound phone calls and foot traffic with hyper-localized citation networks, review engines, and geo-targeted landing pages.',
    iconName: 'MapPin',
    deliverables: ['Google Business Profile Optimization', 'Local Citation & NAP Synchronization', 'Geo-Targeted Content Silos', 'Automated Review Capture Systems', 'Google Maps 3-Pack Tracking'],
    metrics: { label: 'Local Visibility Gain', value: '+210%' },
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    slug: 'social-media',
    category: 'Marketing',
    shortDesc: 'Build an engaged audience and predictable sales pipeline across Instagram, LinkedIn, Facebook, and TikTok.',
    fullDesc: 'Multi-platform social strategies blending organic creative direction, community building, and retargeting workflows.',
    iconName: 'Share2',
    deliverables: ['Platform Creative Strategy', 'Monthly Content Calendars', 'High-Converting Short-Form Video', 'Community Management & Engagement', 'Social Inbound Funnels'],
    metrics: { label: 'Audience Engagement', value: '+3.4x' },
    gradient: 'from-violet-500 to-pink-500'
  },
  {
    id: 'ppc',
    title: 'PPC & Paid Search Advertising',
    slug: 'ppc',
    category: 'Growth',
    shortDesc: 'High-ROI Google Search, Shopping, and Display campaigns designed to convert clicks into high-ticket customers.',
    fullDesc: 'Data-driven paid search architecture eliminating ad waste with laser-targeted negative keyword filtering, bidding models, and landing page alignment.',
    iconName: 'TrendingUp',
    deliverables: ['Google Ads Architecture & Setup', 'Target CPA & ROAS Optimization', 'Landing Page Split Testing', 'Audience Retargeting Silos', 'Live Performance Attribution'],
    metrics: { label: 'Cost Per Acquisition', value: '-38%' },
    gradient: 'from-blue-600 to-violet-600'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Workflows',
    slug: 'ai-automation',
    category: 'AI & Automation',
    shortDesc: 'Automate repetitive workflows, qualify leads instantly 24/7, and connect CRMs with custom intelligent pipelines.',
    fullDesc: 'Harness practical generative AI and orchestration tools to automate lead intake, instant email personalization, customer support, and sales pipeline updates.',
    iconName: 'Cpu',
    deliverables: ['Automated Lead Intake & Routing', 'CRM & ERP Synchronization', 'Intelligent 24/7 Chat Qualification', 'Dynamic Email Workflow Triggers', 'Zero-Code & Custom API Pipelines'],
    metrics: { label: 'Hours Saved Weekly', value: '45+ hrs' },
    gradient: 'from-purple-600 to-cyan-500'
  },
  {
    id: 'web-dev',
    title: 'Custom Website Development',
    slug: 'web-development',
    category: 'Technology',
    shortDesc: 'Fast, responsive, conversion-first web applications engineered in modern React, Next.js, and TypeScript.',
    fullDesc: 'Clean codebases designed for ultra-fast loading, seamless mobile experiences, airtight security, and maximum conversion rates.',
    iconName: 'Code',
    deliverables: ['Full-Stack Web Applications', 'Ultra-Fast Performance Optimization', 'Interactive Component Systems', 'SEO-Ready Semantic Architecture', 'Ongoing Tech Maintenance'],
    metrics: { label: 'Page Load Speed', value: '<0.8s' },
    gradient: 'from-violet-600 to-blue-500'
  },
  {
    id: 'shopify',
    title: 'Shopify & E-commerce Stores',
    slug: 'shopify',
    category: 'Technology',
    shortDesc: 'Turn store visitors into loyal buyers with bespoke Shopify themes, frictionless checkouts, and custom apps.',
    fullDesc: 'E-commerce storefronts built for high conversion velocity, seamless product discovery, and recurring subscription models.',
    iconName: 'ShoppingBag',
    deliverables: ['Bespoke Shopify Theme Engineering', 'Checkout & Upsell Optimization', 'Third-Party App Integrations', 'Inventory & ERP Connections', 'Speed & Mobile Tuning'],
    metrics: { label: 'Checkout Conversion', value: '+42%' },
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'wordpress',
    title: 'WordPress & CMS Development',
    slug: 'wordpress',
    category: 'Technology',
    shortDesc: 'Scalable, lightweight WordPress platforms built without bloated plugins for effortless in-house content editing.',
    fullDesc: 'Custom Gutenberg blocks, headless architectures, and enterprise security setups built for content teams and marketing agility.',
    iconName: 'Layers',
    deliverables: ['Custom Theme Architecture', 'Plugin Security Auditing', 'Headless WordPress Options', 'Advanced Custom Fields Setup', 'Staging & Automated Backups'],
    metrics: { label: 'Lighthouse Score', value: '98/100' },
    gradient: 'from-indigo-600 to-violet-600'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Architecture & Stores',
    slug: 'ecommerce',
    category: 'Technology',
    shortDesc: 'Engineered retail architectures, headless storefronts, multi-currency checkouts, and high-AOV product funnels.',
    fullDesc: 'End-to-end commerce platforms designed for rapid checkout velocity, recurring revenue subscriptions, and enterprise ERP integration.',
    iconName: 'ShoppingBag',
    deliverables: ['Headless Storefront Architecture', '1-Click Upsell & Retention Funnels', 'Multi-Currency Payment Gateways', 'Inventory & Logistics Synchronization', 'Omnichannel Customer Portals'],
    metrics: { label: 'AOV Increase', value: '+34%' },
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'cro',
    title: 'Conversion Rate Optimization (CRO)',
    slug: 'cro',
    category: 'Growth',
    shortDesc: 'Squeeze more pipeline and revenue from your current website traffic with scientific A/B testing and UX heuristics.',
    fullDesc: 'Empirical user session analysis, heatmapping, friction removal, and hypothesis-backed split tests that transform passive browsers into paying clients.',
    iconName: 'PieChart',
    deliverables: ['Friction & Funnel Heatmap Audits', 'A/B & Multivariate Testing', 'Value Proposition Refinement', 'Micro-Copy & CTA Optimization', 'Mobile Experience Enhancement'],
    metrics: { label: 'Conversion Velocity', value: '+54%' },
    gradient: 'from-violet-600 to-purple-500'
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing & Retention',
    slug: 'email-marketing',
    category: 'Growth',
    shortDesc: 'Automated lifecycle emails, customer onboarding sequences, and weekly broadcast newsletters that retain buyers.',
    fullDesc: 'Segmented customer journeys triggered by live user behavior, maximizing customer lifetime value (LTV) and reducing churn.',
    iconName: 'Mail',
    deliverables: ['Behavior-Triggered Drip Campaigns', 'Klaviyo & HubSpot Workflows', 'Template Design & Responsive Layouts', 'Deliverability & Domain Warming', 'Dynamic List Segmentation'],
    metrics: { label: 'Open Rate Benchmark', value: '46%' },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing & Copywriting',
    slug: 'content-marketing',
    category: 'Marketing',
    shortDesc: 'Authoritative, research-backed articles, whitepapers, and guides that establish industry thought leadership.',
    fullDesc: 'Content created by experienced writers and subject-matter analysts to earn backlinks, educate prospects, and drive qualified discovery.',
    iconName: 'FileText',
    deliverables: ['Editorial Calendar Architecture', 'Bottom-of-Funnel Conversion Copy', 'Whitepapers & Industry Reports', 'Case Study Production', 'Content Syndication'],
    metrics: { label: 'Content ROI', value: '+3.8x' },
    gradient: 'from-violet-500 to-indigo-500'
  },
  {
    id: 'lead-generation',
    title: 'B2B Lead Generation Engines',
    slug: 'lead-generation',
    category: 'Growth',
    shortDesc: 'Predictable multi-touch inbound and outbound funnels connecting qualified decision makers with your sales calendar.',
    fullDesc: 'Integrated lead generation blending search visibility, gated assets, cold outreach workflows, and automated pipeline hygiene.',
    iconName: 'UserCheck',
    deliverables: ['Ideal Customer Profile Mapping', 'Interactive Lead Magnets & Calculators', 'Outbound Sequence Orchestration', 'Calendar Booking Integrations', 'Revenue Attribution Reporting'],
    metrics: { label: 'Pipeline Growth', value: '+85%' },
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 'analytics',
    title: 'Analytics & Performance Reporting',
    slug: 'analytics',
    category: 'Growth',
    shortDesc: 'Unified multi-channel attribution, custom GA4 dashboards, and real-time ROI tracking across all marketing investments.',
    fullDesc: 'Eliminate data silos with consolidated executive dashboards connecting paid ad spend, search traffic, and CRM deal values.',
    iconName: 'BarChart2',
    deliverables: ['Server-Side Tracking & CAPI Setup', 'Multi-Touch Attribution Modeling', 'Custom Looker Studio Dashboards', 'Customer Acquisition Cost Audits', 'Weekly Executive KPI Summaries'],
    metrics: { label: 'Attribution Accuracy', value: '99.4%' },
    gradient: 'from-blue-600 to-violet-600'
  },
  {
    id: 'branding',
    title: 'Branding & Graphic Design',
    slug: 'branding',
    category: 'Marketing',
    shortDesc: 'High-end visual identities, design systems, vector graphics, and collateral that elevate brand prestige.',
    fullDesc: 'Distinctive brand positioning translating strategic market differentiators into unforgettable visual aesthetics and typography.',
    iconName: 'Sparkles',
    deliverables: ['Comprehensive Design Systems', 'Logo & Visual Identity Guidelines', 'Marketing Collateral & Pitch Decks', 'UI/UX Design Libraries', 'Digital Asset Production'],
    metrics: { label: 'Brand Recognition', value: '+3.2x' },
    gradient: 'from-violet-600 to-fuchsia-600'
  },
  {
    id: 'video-marketing',
    title: 'Video Marketing & Creative Production',
    slug: 'video-marketing',
    category: 'Marketing',
    shortDesc: 'High-retention short-form video, product demos, motion graphics, and brand stories engineered for conversion.',
    fullDesc: 'Engaging motion and video production optimized for Meta Reels, YouTube Shorts, LinkedIn feeds, and high-converting landing page embeds.',
    iconName: 'TrendingUp',
    deliverables: ['Short-Form Video Production (Reels/Shorts)', 'Product Walkthrough & Demo Videos', 'Motion Graphics & 3D Renders', 'Scriptwriting & Storyboarding', 'Multi-Platform Video Ad Iterations'],
    metrics: { label: 'Video View Duration', value: '+72%' },
    gradient: 'from-fuchsia-600 to-purple-600'
  },
  {
    id: 'online-reputation',
    title: 'Online Reputation Management',
    slug: 'online-reputation',
    category: 'Growth',
    shortDesc: 'Automated 5-star review acquisition, brand sentiment monitoring, and proactive public relations defense.',
    fullDesc: 'Systematic customer feedback loops that protect brand reputation on Google, Trustpilot, and industry-specific review sites.',
    iconName: 'ShieldCheck',
    deliverables: ['Automated Review Request SMS/Email', 'Sentiment & Social Listening Alerts', 'Google & Trustpilot Dispute Management', 'Crisis Mitigation Protocols', 'Authority PR Placement'],
    metrics: { label: '5-Star Velocity', value: '+4.8★' },
    gradient: 'from-emerald-600 to-cyan-600'
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Strategy First',
    description: 'We never write a line of code or launch an ad without analyzing your market positioning, margins, and customer lifetime value.',
    highlight: 'Rooted in unit economics'
  },
  {
    number: '02',
    title: 'Technology Driven',
    description: 'Modern tech stacks, headless architectures, and clean engineering practices replace clunky plugins and slow legacy systems.',
    highlight: 'Next-gen toolchains'
  },
  {
    number: '03',
    title: 'Data Focused',
    description: 'Every recommendation is backed by real conversion metrics, analytics instrumentation, and verifiable attribution models.',
    highlight: 'No vanity metrics'
  },
  {
    number: '04',
    title: 'Transparent Communication',
    description: 'Direct Slack and WhatsApp access with weekly sprint recaps. You speak directly to the engineers and marketers doing the work.',
    highlight: 'Zero agency runaround'
  },
  {
    number: '05',
    title: 'Scalable Solutions',
    description: 'Everything we construct is engineered to handle 10x traffic spikes, seasonal sales surges, and expanding product catalogs.',
    highlight: 'Built for longevity'
  },
  {
    number: '06',
    title: 'Continuous Optimization',
    description: 'Launch day is just step one. We relentlessly test, refine copy, tweak automations, and expand your market footprint each month.',
    highlight: 'Compounding returns'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Deep audit of your current digital footprint, competitor gaps, unit economics, and growth bottlenecks.',
    activities: ['Technical and SEO baseline audit', 'Competitor keyword & ad intelligence', 'Conversion funnel friction analysis']
  },
  {
    number: '02',
    title: 'Plan',
    description: 'A comprehensive growth roadmap with milestone timelines, technical architecture, and priority initiatives.',
    activities: ['Channel mix and budget allocation', 'Information architecture & wireframes', 'Automation logic & trigger mapping']
  },
  {
    number: '03',
    title: 'Build',
    description: 'Agile sprints delivering custom web platforms, automated workflows, and high-converting ad creative.',
    activities: ['Full-stack clean code development', 'Ad copy, creatives & landing pages', 'CRM integrations & webhook triggers']
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Meticulous quality assurance, cross-browser validation, tracking verification, and coordinated go-live.',
    activities: ['Core Web Vitals & speed verification', 'Attribution & pixel tracking audit', 'Controlled rollout with zero downtime']
  },
  {
    number: '05',
    title: 'Optimise',
    description: 'Live performance monitoring, hypothesis-driven A/B testing, and compounding campaign refinements.',
    activities: ['Weekly keyword rank momentum', 'Bid adjustments & negative keyword mining', 'Continuous CRO & user session testing']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-ecommerce',
    title: 'D2C Lifestyle Brand Scale-Up',
    industry: 'E-commerce & Retail',
    service: 'SEO + Custom Shopify + PPC',
    challenge: 'High customer acquisition cost (CAC) on Meta Ads, slow legacy theme loading in 4.2 seconds, and flatlining organic traffic.',
    solution: 'Re-engineered the store with a bespoke Shopify architecture loading in 0.9s, restructured Google Shopping product feeds, and executed a topical authority content cluster.',
    outcome: 'Decreased CAC by 34%, doubled organic search orders, and sustained a 4.1x return on ad spend through holiday peak sales.',
    metrics: [
      { label: 'Organic Revenue', value: '+142%' },
      { label: 'Blended ROAS', value: '4.1x' },
      { label: 'Mobile Page Speed', value: '0.9s' }
    ],
    tags: ['Shopify', 'SEO', 'PPC', 'CRO'],
    image: '/images/case-urbanstride.svg'
  },
  {
    id: 'cs-local',
    title: 'Multi-Location Healthcare Practice',
    industry: 'Healthcare & Professional Services',
    service: 'Local SEO + Google Maps 3-Pack',
    challenge: 'Invisible across Google Maps outside a 0.5-mile radius, inconsistent NAP citations across 14 directories, and low patient appointment volume.',
    solution: 'Cleaned directory citations, instituted automated SMS review capture workflows, and built geo-optimized service neighborhood landing pages.',
    outcome: 'Secured #1–#3 Google Maps rankings across 22 priority service keywords across all target clinic territories.',
    metrics: [
      { label: 'Inbound Phone Calls', value: '+188%' },
      { label: 'Google Maps Views', value: '+260%' },
      { label: '5-Star Reviews', value: '340+' }
    ],
    tags: ['Local SEO', 'Google Maps', 'Reputation'],
    image: '/images/case-lumina.svg'
  },
  {
    id: 'cs-automation',
    title: 'B2B Logistics Platform Workflow',
    industry: 'Logistics & Supply Chain',
    service: 'AI Automation + Custom Web Portal',
    challenge: 'Manual quote generation required 6 hours of staff time per request; high lead drop-off due to delayed email follow-ups.',
    solution: 'Engineered an AI-assisted quote calculator with instant PDF generation, automatic CRM record creation, and dynamic SMS/email alerts.',
    outcome: 'Reduced response time from 6 hours to under 30 seconds; increased qualified demo bookings by 78%.',
    metrics: [
      { label: 'Response Latency', value: '<30 sec' },
      { label: 'Lead-to-Demo Rate', value: '+78%' },
      { label: 'Admin Hours Saved', value: '35 hrs/wk' }
    ],
    tags: ['AI Automation', 'CRM Integration', 'Web App'],
    image: '/images/case-apex.svg'
  },
  {
    id: 'cs-wealth',
    title: 'FinTech & Capital Deal Acceleration',
    industry: 'Financial Technology & Asset Advisory',
    service: 'Custom Web Engineering + Paid Media',
    challenge: 'Stale lead forms resulting in low-intent inquiries, $180+ CPL, and manual qualification backlog.',
    solution: 'Built interactive institutional financial calculators and AI-routed pipeline forms that pre-qualify high net worth prospects in real-time.',
    outcome: 'Acquired $28M+ in qualified pipeline volume while cutting client acquisition cost by 61%.',
    metrics: [
      { label: 'New AUM Pipeline', value: '$28M+' },
      { label: 'Acquisition Cost', value: '-61%' },
      { label: 'Speed-to-Lead', value: '<40s' }
    ],
    tags: ['React App', 'ABM Ads', 'AI Routing'],
    image: '/images/case-nexus.svg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'Vanguard Retail Tech',
    industry: 'E-commerce Solutions',
    quote: 'House Robotics completely rebuilt our web platform and automated our inbound lead pipeline. Their technical depth and responsiveness on WhatsApp made the entire project seamless.',
    rating: 5,
    highlight: 'Technical depth & fast turnaround',
    avatar: '/images/avatar-marcus.svg'
  },
  {
    id: 't-2',
    name: 'Dr. Sophia Bennett',
    role: 'Clinical Director & Founder',
    company: 'Lumina Aesthetic Institute',
    industry: 'Aesthetic Medicine',
    quote: 'Our Google Maps calls tripled within 90 days. We now own the #1 spot in every surrounding district, and the automated patient review workflow runs completely on autopilot.',
    rating: 5,
    highlight: 'Rank #1 territory dominance',
    avatar: '/images/avatar-sophia.svg'
  },
  {
    id: 't-3',
    name: 'David Sterling',
    role: 'Managing Director',
    company: 'UrbanStride Footwear',
    industry: 'Global DTC Brand',
    quote: 'Our site went from loading in 4.2 seconds to 0.4 seconds flat. That single engineering upgrade increased our checkout conversion rate by 34% immediately.',
    rating: 5,
    highlight: 'Sub-second checkout conversion',
    avatar: '/images/avatar-david.svg'
  },
  {
    id: 't-4',
    name: 'Charlotte Dubois',
    role: 'Managing Partner',
    company: 'Nexus Capital Advisory',
    industry: 'Asset Advisory & Private Equity',
    quote: 'Unlike typical digital agencies that drown you in vanity graphs, House Robotics focuses purely on qualified deal flow, clean technology, and transparent attribution.',
    rating: 5,
    highlight: 'Pure focus on qualified deal flow',
    avatar: '/images/avatar-charlotte.svg'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'The Modern SEO Playbook: How AI Overviews Are Changing Search Rankings',
    category: 'SEO',
    excerpt: 'How search engines prioritize conversational answers and how your brand can secure citations in AI-generated summary panels.',
    readTime: '6 min read',
    date: 'March 2026',
    author: 'House Robotics Strategy Team',
    image: '/images/blog-ai-search.svg',
    content: [
      'Search engines are transitioning from ten blue links to synthesized conversational answers. To maintain visibility, websites must optimize for entity authority, verified schema markups, and clear factual citations.',
      'We break down the three fundamental pillars of ranking in modern generative search: factual entity clarity, semantic content depth, and lightning-fast technical foundations.',
      'By organizing your site into structured topical clusters, you provide search engines with unequivocal proof of your subject matter leadership.'
    ]
  },
  {
    id: 'b-2',
    title: 'Practical AI Automation: Replacing Busywork with Connected Workflows',
    category: 'AI',
    excerpt: 'Step-by-step framework for connecting your marketing channels directly to your CRM with zero manual data entry.',
    readTime: '5 min read',
    date: 'February 2026',
    author: 'Automation Architecture Group',
    image: '/images/blog-autonomous-agents.svg',
    content: [
      'Most businesses waste 15 to 25 hours every week transferring leads between spreadsheets, answering basic repetitive inquiries, and manually sending follow-ups.',
      'With modern webhook integrations and structured AI qualification models, you can instantly score incoming prospects, enrich their profile data, and assign them directly to your sales reps calendar.',
      'We review real architecture diagrams that deliver instant responses to buyers while keeping human reps focused solely on closing deals.'
    ]
  },
  {
    id: 'b-3',
    title: 'Why Page Speed Is the Ultimate Conversion Rate Multiplier',
    category: 'Web Development',
    excerpt: 'Every 100ms delay in page load diminishes checkout completions. How clean modern stacks outperform heavy legacy themes.',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'Engineering Team',
    image: '/images/blog-react-perf.svg',
    content: [
      'A delay of just one second in mobile page rendering drops conversion rates by up to 20%. Cluttered plugin stacks and uncompressed media drag down customer experience.',
      'By decoupling your frontend with modern React and streamlined Tailwind CSS, your business achieves instant page transitions, perfect Core Web Vitals, and superior mobile conversion rates.',
      'Explore the architectural differences between bloated legacy CMS themes and modern high-performance engineering.'
    ]
  },
  {
    id: 'b-4',
    title: 'Google Ads in 2026: Eliminating Wasteful Spend with Precision Negative Lists',
    category: 'Paid Advertising',
    excerpt: 'How to audit broad-match keyword bleed, protect your budget, and capture high-intent commercial buyers.',
    readTime: '7 min read',
    date: 'January 2026',
    author: 'Performance Marketing Group',
    image: '/images/blog-b2b-funnels.svg',
    content: [
      'Ad auction prices continue to rise across high-demand business keywords. Running default automated campaigns often allocates up to 35% of ad spend to unqualified search terms.',
      'By pairing targeted match types with continuous negative keyword hygiene and dedicated landing pages, brands can drastically drop their cost per acquisition.',
      'Learn how we structure ad account hierarchies to guarantee every ad dollar is tracked to an actual revenue milestone.'
    ]
  },
  {
    id: 'b-5',
    title: 'Google Maps 3-Pack Mastery: Local Geo-Grid Dominance',
    category: 'SEO',
    excerpt: 'How multi-location practices and local service businesses expand their 5-star ranking radius across entire metro territories.',
    readTime: '5 min read',
    date: 'December 2025',
    author: 'Local SEO Division',
    image: '/images/blog-local-maps.svg',
    content: [
      'Local searchers convert at an incredible 28% within 24 hours. If your business drops out of the Google 3-Pack past a two-mile radius, you are losing high-ticket patients and customers.',
      'We reveal the exact geo-grid expansion framework, automated SMS review velocity strategies, and entity citation methods to secure #1 rankings across all surrounding zip codes.',
      'Case study data proves a direct correlation between consistent high-resolution image uploads, review responses, and Google Maps call conversions.'
    ]
  },
  {
    id: 'b-6',
    title: 'High-Converting Short-Form Video Systems for Modern Brands',
    category: 'Digital Marketing',
    excerpt: 'Turning viral TikTok and Instagram views into bottom-of-funnel customer conversions and measurable pipeline.',
    readTime: '6 min read',
    date: 'November 2025',
    author: 'Creative Studio Lab',
    image: '/images/blog-short-form.svg',
    content: [
      'Vanity views mean nothing without conversion hooks. We break down the 3-second hook taxonomy that captures immediate audience attention.',
      'Discover how to syndicate high-fidelity video production across Reels, Shorts, and TikTok with automated CRM link retargeting.',
      'Learn how direct attribution tracking connects organic social content to actual sales conversations.'
    ]
  }
];

export const FAQS = [
  {
    question: 'How does House Robotics differ from traditional digital agencies?',
    answer: 'We unify modern software engineering with high-performance digital marketing. Instead of just running ads or handing off static designs, we build connected systems—speed-optimized web applications, custom AI workflows, automated lead qualification, and measurable search strategies with direct transparent communication.'
  },
  {
    question: 'What is the onboarding process and timeline?',
    answer: 'Our typical onboarding takes 3–5 business days. We begin with a deep discovery audit of your analytics, current rankings, and technical stack, establish dedicated communication channels via WhatsApp or Slack, and present a prioritized 90-day growth roadmap.'
  },
  {
    question: 'Can you work with our existing WordPress or Shopify website?',
    answer: 'Yes. We frequently audit, speed-optimize, and redesign existing WordPress and Shopify storefronts without requiring a complete teardown, eliminating bloated plugins and improving Core Web Vitals to elevate conversion rates.'
  },
  {
    question: 'How do you measure and report campaign performance?',
    answer: 'We do not report vanity impressions. You receive live access to custom dashboards detailing qualified leads, cost-per-acquisition (CPA), search ranking momentum, and revenue attribution, backed by regular strategic sprint recaps.'
  },
  {
    question: 'How do we get started?',
    answer: 'Simply click "Get a Free Consultation" or reach out directly on WhatsApp at +92 347 4542881 or via email at sameerliaqat81@gmail.com. We will review your digital presence and provide an actionable growth analysis.'
  }
];
