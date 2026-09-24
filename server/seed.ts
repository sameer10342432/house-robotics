import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

async function main() {
  console.log('[SEED] Starting House Robotics database seed...');

  // 1. Seed Super Admin
  const adminEmail = 'sameerliaqat81@gmail.com';
  const adminPassword = 'Y&VO{(w0J3A6';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Sameer Liaqat',
      passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true
    },
    create: {
      email: adminEmail,
      name: 'Sameer Liaqat',
      passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true
    }
  });
  console.log(`[SEED] Super Admin verified: ${superAdmin.email}`);

  // 2. Seed Site Settings
  const defaultSettings = [
    { key: 'company_name', value: 'House Robotics', group: 'general' },
    { key: 'company_tagline', value: 'Smart Digital Solutions. Powerful Business Growth.', group: 'general' },
    { key: 'company_description', value: 'House Robotics combines digital marketing, AI automation and technology to help ambitious businesses grow faster and smarter.', group: 'general' },
    { key: 'contact_whatsapp', value: '+92 347 4542881', group: 'contact' },
    { key: 'contact_whatsapp_url', value: 'https://wa.me/923474542881', group: 'contact' },
    { key: 'contact_email', value: 'sameerliaqat81@gmail.com', group: 'contact' },
    { key: 'contact_address', value: 'Lahore, Pakistan / Remote Global Client Delivery', group: 'contact' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/house-robotics', group: 'social' },
    { key: 'social_instagram', value: 'https://instagram.com/houserobotics', group: 'social' },
    { key: 'social_facebook', value: 'https://facebook.com/houserobotics', group: 'social' },
    { key: 'seo_default_title', value: 'House Robotics — Full-Service Digital Marketing & Technology Agency', group: 'seo' },
    { key: 'seo_default_description', value: 'House Robotics delivers cutting-edge SEO, Google Ads, Meta Ads, Custom Web Development, AI Automation, and CRO for ambitious brands worldwide.', group: 'seo' },
    { key: 'analytics_ga_id', value: 'G-HOUSEROBOTICS', group: 'analytics' }
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: { key: s.key, value: s.value, group: s.group }
    });
  }
  console.log('[SEED] Site settings configured.');

  // 3. Seed Page SEO Metadata
  const pagesSeo = [
    {
      pagePath: '/',
      seoTitle: 'House Robotics — Full-Service Digital Marketing & Technology Agency',
      metaDescription: 'Scale your revenue with high-impact SEO, Google & Meta Ads, Custom Web Applications, and AI Automation workflows.',
      focusKeyword: 'digital marketing agency'
    },
    {
      pagePath: '/services',
      seoTitle: 'Our Capabilities & Services | House Robotics',
      metaDescription: 'Explore our full spectrum of services: SEO, PPC, AI Automation, Web Engineering, CRO, and Marketing Operations.',
      focusKeyword: 'digital agency services'
    },
    {
      pagePath: '/about',
      seoTitle: 'About Us | House Robotics Digital Marketing & Technology',
      metaDescription: 'Learn why hyper-growth brands choose House Robotics for transparent ROI, agile development, and performance marketing.',
      focusKeyword: 'about house robotics'
    },
    {
      pagePath: '/contact',
      seoTitle: 'Contact House Robotics — WhatsApp +92 347 4542881 & Consultation',
      metaDescription: 'Get in touch for a comprehensive audit of your digital presence. Reach us on WhatsApp at +92 347 4542881 or email sameerliaqat81@gmail.com.',
      focusKeyword: 'contact house robotics'
    },
    {
      pagePath: '/blog',
      seoTitle: 'Insights & Technology Playbooks | House Robotics Blog',
      metaDescription: 'Actionable strategies on generative search SEO, practical business automation, Core Web Vitals, and ad optimization.',
      focusKeyword: 'digital marketing insights'
    }
  ];

  for (const p of pagesSeo) {
    await prisma.seoMetadata.upsert({
      where: { pagePath: p.pagePath },
      update: p,
      create: p
    });
  }
  console.log('[SEED] SEO metadata seeded.');

  // 4. Seed FAQs
  const defaultFaqs = [
    {
      question: 'How does House Robotics differ from traditional digital agencies?',
      answer: 'We unify modern software engineering with high-performance digital marketing. Instead of just running ads or handing off static designs, we build connected systems—speed-optimized web applications, custom AI workflows, automated lead qualification, and measurable search strategies with direct transparent communication.',
      category: 'General',
      sortOrder: 1
    },
    {
      question: 'What is the onboarding process and timeline?',
      answer: 'Our typical onboarding takes 3–5 business days. We begin with a deep discovery audit of your analytics, current rankings, and technical stack, establish dedicated communication channels via WhatsApp or Slack, and present a prioritized 90-day growth roadmap.',
      category: 'General',
      sortOrder: 2
    },
    {
      question: 'Can you work with our existing WordPress or Shopify website?',
      answer: 'Yes. We frequently audit, speed-optimize, and redesign existing WordPress and Shopify storefronts without requiring a complete teardown, eliminating bloated plugins and improving Core Web Vitals to elevate conversion rates.',
      category: 'Technical',
      sortOrder: 3
    },
    {
      question: 'How do you measure and report campaign performance?',
      answer: 'We do not report vanity impressions. You receive live access to custom dashboards detailing qualified leads, cost-per-acquisition (CPA), search ranking momentum, and revenue attribution, backed by regular strategic sprint recaps.',
      category: 'Reporting',
      sortOrder: 4
    },
    {
      question: 'How do we get started?',
      answer: 'Simply click "Get a Free Consultation" or reach out directly on WhatsApp at +92 347 4542881 or via email at sameerliaqat81@gmail.com. We will review your digital presence and provide an actionable growth analysis.',
      category: 'Contact',
      sortOrder: 5
    }
  ];

  for (const f of defaultFaqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({ data: { ...f, status: 'PUBLISHED' } });
    }
  }
  console.log('[SEED] FAQs seeded.');

  // 5. Seed Testimonials
  const defaultTestimonials = [
    {
      clientName: 'Marcus Vance',
      company: 'Vanguard Retail Tech',
      role: 'Founder & CEO',
      review: 'House Robotics completely rebuilt our web platform and automated our inbound lead pipeline. Their technical depth and responsiveness on WhatsApp made the entire project seamless.',
      rating: 5,
      sortOrder: 1,
      photo: '/images/avatar-marcus.svg'
    },
    {
      clientName: 'Dr. Sophia Bennett',
      company: 'Lumina Aesthetic Institute',
      role: 'Clinical Director & Founder',
      review: 'Our Google Maps calls tripled within 90 days. We now own the #1 spot in every surrounding district, and the automated patient review workflow runs completely on autopilot.',
      rating: 5,
      sortOrder: 2,
      photo: '/images/avatar-sophia.svg'
    },
    {
      clientName: 'David Sterling',
      company: 'UrbanStride Footwear',
      role: 'Managing Director',
      review: 'Our site went from loading in 4.2 seconds to 0.4 seconds flat. That single engineering upgrade increased our checkout conversion rate by 34% immediately.',
      rating: 5,
      sortOrder: 3,
      photo: '/images/avatar-david.svg'
    },
    {
      clientName: 'Charlotte Dubois',
      company: 'Nexus Capital Advisory',
      role: 'Managing Partner',
      review: 'Unlike typical digital agencies that drown you in vanity graphs, House Robotics focuses purely on qualified deal flow, clean technology, and transparent attribution.',
      rating: 5,
      sortOrder: 4,
      photo: '/images/avatar-charlotte.svg'
    }
  ];

  for (const t of defaultTestimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...t, status: 'APPROVED' } });
    }
  }
  console.log('[SEED] Testimonials seeded.');

  // 6. Seed Blog Categories & Posts
  const categoriesData = [
    { name: 'SEO', slug: 'seo', description: 'Search engine optimization strategies and AI search developments' },
    { name: 'AI & Automation', slug: 'ai-automation', description: 'Practical workflow automations and intelligent agents' },
    { name: 'Web Development', slug: 'web-dev', description: 'High-speed web architecture, React, and e-commerce engineering' },
    { name: 'Paid Advertising', slug: 'paid-ads', description: 'Google Ads, Meta Ads, and ROAS optimization' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Multi-channel brand growth and conversion tactics' }
  ];

  const catMap: Record<string, string> = {};
  for (const c of categoriesData) {
    const cat = await prisma.blogCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: c
    });
    catMap[c.slug] = cat.id;
  }

  const postsData = [
    {
      title: 'The Modern SEO Playbook: How AI Overviews Are Changing Search Rankings',
      slug: 'the-modern-seo-playbook-ai-overviews',
      excerpt: 'How search engines prioritize conversational answers and how your brand can secure citations in AI-generated summary panels.',
      content: `<h2>The Evolution of Search in 2026</h2>
<p>Search engines are transitioning from ten blue links to synthesized conversational answers. To maintain visibility, websites must optimize for entity authority, verified schema markups, and clear factual citations.</p>
<h3>Three Fundamental Pillars</h3>
<p>We break down the three fundamental pillars of ranking in modern generative search:</p>
<ul>
  <li><strong>Factual Entity Clarity:</strong> Structuring content so search models understand who you are and what you deliver without ambiguity.</li>
  <li><strong>Semantic Content Depth:</strong> Answering buyer objections comprehensively rather than stuffing superficial keywords.</li>
  <li><strong>Lightning-Fast Technical Foundations:</strong> Providing sub-second response times that search crawlers reward.</li>
</ul>
<p>By organizing your site into structured topical clusters, you provide search engines with unequivocal proof of your subject matter leadership.</p>`,
      featuredImage: '/images/blog-ai-search.svg',
      author: 'House Robotics Strategy Team',
      readTime: '6 min read',
      categorySlug: 'seo',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-03-01T10:00:00Z')
    },
    {
      title: 'Practical AI Automation: Replacing Busywork with Connected Workflows',
      slug: 'practical-ai-automation-connected-workflows',
      excerpt: 'Step-by-step framework for connecting your marketing channels directly to your CRM with zero manual data entry.',
      content: `<h2>Stop Wasting 20+ Hours Every Week</h2>
<p>Most businesses waste 15 to 25 hours every week transferring leads between spreadsheets, answering basic repetitive inquiries, and manually sending follow-ups.</p>
<h3>Intelligent Qualification Pipelines</h3>
<p>With modern webhook integrations and structured AI qualification models, you can instantly score incoming prospects, enrich their profile data, and assign them directly to your sales reps calendar.</p>
<p>We review real architecture diagrams that deliver instant responses to buyers while keeping human reps focused solely on closing high-value deals.</p>`,
      featuredImage: '/images/blog-autonomous-agents.svg',
      author: 'Automation Architecture Group',
      readTime: '5 min read',
      categorySlug: 'ai-automation',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-02-15T10:00:00Z')
    },
    {
      title: 'Why Page Speed Is the Ultimate Conversion Rate Multiplier',
      slug: 'page-speed-conversion-rate-multiplier',
      excerpt: 'Every 100ms delay in page load diminishes checkout completions. How clean modern stacks outperform heavy legacy themes.',
      content: `<h2>The Direct Financial Impact of Latency</h2>
<p>A delay of just one second in mobile page rendering drops conversion rates by up to 20%. Cluttered plugin stacks and uncompressed media drag down customer experience.</p>
<h3>Engineering High-Performance Frontends</h3>
<p>By decoupling your frontend with modern React and streamlined Tailwind CSS, your business achieves instant page transitions, perfect Core Web Vitals, and superior mobile conversion rates.</p>
<p>Explore the architectural differences between bloated legacy CMS themes and modern high-performance engineering.</p>`,
      featuredImage: '/images/blog-react-perf.svg',
      author: 'Engineering Team',
      readTime: '4 min read',
      categorySlug: 'web-dev',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-01-20T10:00:00Z')
    }
  ];

  for (const post of postsData) {
    const { categorySlug, ...data } = post;
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...data,
        categoryId: catMap[categorySlug] || null
      },
      create: {
        ...data,
        categoryId: catMap[categorySlug] || null
      }
    });
  }
  console.log('[SEED] Blog posts seeded.');

  // 7. Seed Services (21 Official Services)
  const defaultServices = [
    {
      slug: 'seo',
      title: 'Search Engine Optimization (SEO)',
      shortDescription: 'Drive predictable, compounding organic traffic through technical SEO, authoritative link building, and intent-driven content.',
      longDescription: 'Comprehensive organic search architecture tailored to dominate competitive keywords, boost domain authority, and generate high-intent search leads.',
      icon: 'Search',
      featured: true,
      sortOrder: 1,
      features: ['Technical SEO Audits & Core Web Vitals', 'High-Intent Keyword Architecture', 'Editorial Content Roadmaps', 'Enterprise Backlink Acquisition', 'Rank Tracking & Attribution'],
      benefits: [
        { title: 'Predictable Organic Inbound', description: 'Generate high-intent buyer inquiries month after month without paying for every click.' },
        { title: 'Top Google Rankings', description: 'Establish market authority by ranking for the keywords your customers search most.' }
      ]
    },
    {
      slug: 'local-seo',
      title: 'Local SEO & Google Maps',
      shortDescription: 'Dominate Google Local 3-Pack rankings, optimize Google Business Profile, and capture nearby ready-to-buy customers.',
      longDescription: 'Turn geographical proximity into inbound phone calls and foot traffic with hyper-localized citation networks, review engines, and geo-targeted landing pages.',
      icon: 'MapPin',
      featured: true,
      sortOrder: 2,
      features: ['Google Business Profile Optimization', 'Local Citation & NAP Synchronization', 'Geo-Targeted Content Silos', 'Automated Review Capture Systems', 'Google Maps 3-Pack Tracking'],
      benefits: [
        { title: '3-Pack Dominance', description: 'Capture 70%+ of clicks from local prospects searching on their mobile devices.' },
        { title: 'Inbound Phone Calls', description: 'Direct click-to-call conversions straight to your sales or clinic desk.' }
      ]
    },
    {
      slug: 'google-maps-ranking',
      title: 'Google Maps Ranking',
      shortDescription: 'Geo-grid optimization, local citation architecture, and review acceleration to rank #1 across target radiuses.',
      longDescription: 'Systematic geo-targeted optimization that expands your Google Maps radius to capture surrounding zip codes.',
      icon: 'Navigation',
      featured: false,
      sortOrder: 3,
      features: ['Geo-Grid Tracking', 'Review Generation Funnels', 'Local Backlink Networks', 'Photo Geotagging & Optimization'],
      benefits: [
        { title: 'Expanded Radius', description: 'Appear in maps rankings across your entire city, not just immediate blocks.' }
      ]
    },
    {
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      shortDescription: 'Build an engaged audience and predictable sales pipeline across Instagram, LinkedIn, Facebook, and TikTok.',
      longDescription: 'Multi-platform social strategies blending organic creative direction, community building, and retargeting workflows.',
      icon: 'Share2',
      featured: true,
      sortOrder: 4,
      features: ['Platform Creative Strategy', 'Monthly Content Calendars', 'High-Converting Short-Form Video', 'Community Management & Engagement', 'Social Inbound Funnels'],
      benefits: [
        { title: 'Brand Affinity', description: 'Create memorable touchpoints that keep your brand top-of-mind.' }
      ]
    },
    {
      slug: 'ppc-google-ads',
      title: 'PPC & Google Ads',
      shortDescription: 'High-ROI Google Search, Shopping, and Display campaigns designed to convert clicks into high-ticket customers.',
      longDescription: 'Data-driven paid search architecture eliminating ad waste with laser-targeted negative keyword filtering, bidding models, and landing page alignment.',
      icon: 'TrendingUp',
      featured: true,
      sortOrder: 5,
      features: ['Google Ads Architecture & Setup', 'Target CPA & ROAS Optimization', 'Landing Page Split Testing', 'Audience Retargeting Silos', 'Live Performance Attribution'],
      benefits: [
        { title: 'Immediate High-Intent Traffic', description: 'Reach prospects actively searching for your service right now.' }
      ]
    },
    {
      slug: 'meta-ads',
      title: 'Meta Ads (Facebook & Instagram)',
      shortDescription: 'Scalable paid social funnels leveraging high-performing creatives, custom lookalikes, and dynamic retargeting.',
      longDescription: 'Full-funnel Meta advertising campaigns designed to generate predictable customer acquisitions at scale.',
      icon: 'Layers',
      featured: false,
      sortOrder: 6,
      features: ['Creative Split Testing', 'Advantage+ Audience Models', 'Pixel & CAPI Server Tracking', 'Conversion Retargeting Funnels'],
      benefits: [
        { title: 'Scalable Customer Acquisition', description: 'Consistent volume of customer acquisitions across Instagram & Facebook.' }
      ]
    },
    {
      slug: 'email-marketing',
      title: 'Email Marketing & Retention',
      shortDescription: 'Automated email flows, segmentation, and weekly campaigns that maximize customer lifetime value (LTV).',
      longDescription: 'Turn existing lists into steady revenue through lifecycle flows, behavioral segmentation, and personalized email nurture sequences.',
      icon: 'Mail',
      featured: false,
      sortOrder: 7,
      features: ['Klaviyo & ActiveCampaign Setups', 'Cart Abandonment Flows', 'Customer Onboarding Sequences', 'Segmented Broadcasts'],
      benefits: [
        { title: 'Zero Cost Per Reach', description: 'Drive repeat sales and referrals from an asset you completely own.' }
      ]
    },
    {
      slug: 'content-marketing',
      title: 'Content Marketing',
      shortDescription: 'Authority-building articles, lead magnets, whitepapers, and guides that educate prospects and drive organic conversions.',
      longDescription: 'Strategic editorial production that establishes domain dominance and answers critical commercial buyer questions.',
      icon: 'FileText',
      featured: false,
      sortOrder: 8,
      features: ['Topic Cluster Planning', 'Technical Copywriting', 'Lead Magnet Creation', 'Editorial Content Distribution'],
      benefits: [
        { title: 'Authority & Trust', description: 'Shorten sales cycles by answering questions before calls happen.' }
      ]
    },
    {
      slug: 'ai-automation',
      title: 'AI Automation & Workflows',
      shortDescription: 'Automate repetitive workflows, qualify leads instantly 24/7, and connect CRMs with custom intelligent pipelines.',
      longDescription: 'Harness practical generative AI and orchestration tools to automate lead intake, instant email personalization, customer support, and sales pipeline updates.',
      icon: 'Cpu',
      featured: true,
      sortOrder: 9,
      features: ['Automated Lead Intake & Routing', 'CRM & ERP Synchronization', 'Intelligent 24/7 Chat Qualification', 'Dynamic Email Workflow Triggers', 'Zero-Code & Custom API Pipelines'],
      benefits: [
        { title: 'Save 20+ Hours Weekly', description: 'Eliminate manual data transfers and focus human talent on revenue tasks.' },
        { title: 'Instant Lead Response', description: 'Respond to incoming inquiries within 60 seconds 24/7.' }
      ]
    },
    {
      slug: 'marketing-automation',
      title: 'Marketing Automation',
      shortDescription: 'Streamline lead attribution, CRM scoring, multi-channel follow-ups, and customer journey orchestration.',
      longDescription: 'Unify sales and marketing data streams into a cohesive pipeline that tracks buyer journeys from first click to closed deal.',
      icon: 'Zap',
      featured: false,
      sortOrder: 10,
      features: ['Multi-Touch Attribution', 'HubSpot & CRM Setups', 'Automated Lead Scoring', 'Dynamic Workflow Webhooks'],
      benefits: [
        { title: 'Synchronized Pipeline', description: 'Give your sales team full context on every prospect before outreach.' }
      ]
    },
    {
      slug: 'custom-web-development',
      title: 'Custom Web Development',
      shortDescription: 'Bespoke web applications and responsive corporate portals engineered with Next.js, React, and Node.js for lightning speed.',
      longDescription: 'High-performance web architecture engineered for speed, clean UX, and seamless backend integrations.',
      icon: 'Code',
      featured: true,
      sortOrder: 11,
      features: ['React & Next.js Architecture', 'Sub-Second Page Loads', 'Mobile-First Responsive Layouts', 'REST & GraphQL APIs', 'Enterprise Security'],
      benefits: [
        { title: 'Maximum Speed & Conversion', description: 'Delight visitors with sub-second page loads and zero layout shift.' }
      ]
    },
    {
      slug: 'wordpress-development',
      title: 'WordPress Development',
      shortDescription: 'Custom, secure, and bloat-free WordPress platforms built for ease of editing, Core Web Vitals, and scale.',
      longDescription: 'Modern headless and custom WordPress engineering that eliminates plugin bloat and guarantees top Google PageSpeed scores.',
      icon: 'Globe',
      featured: false,
      sortOrder: 12,
      features: ['Custom Theme Development', 'ACF Pro Architecture', 'Speed Optimization & Caching', 'Security Hardening'],
      benefits: [
        { title: 'Effortless Content Management', description: 'Empower your marketing team to edit pages easily without breaking layouts.' }
      ]
    },
    {
      slug: 'shopify-development',
      title: 'Shopify Development',
      shortDescription: 'High-converting Shopify and Shopify Plus storefronts optimized for mobile shopping and frictionless checkouts.',
      longDescription: 'Enterprise e-commerce storefronts tailored to boost average order value (AOV) and conversion rates.',
      icon: 'ShoppingBag',
      featured: false,
      sortOrder: 13,
      features: ['Custom Liquid & 2.0 Themes', 'Checkout Customization', 'App Integration & Speed', 'AOV Upsell Systems'],
      benefits: [
        { title: 'Higher Checkout Rates', description: 'Eliminate friction at checkout and maximize revenue per visitor.' }
      ]
    },
    {
      slug: 'ecommerce-development',
      title: 'E-commerce Development',
      shortDescription: 'Scalable e-commerce infrastructure, payment gateway integrations, and omnichannel catalog sync.',
      longDescription: 'End-to-end e-commerce solutions that handle complex catalog variations, wholesale pricing, and automated inventory sync.',
      icon: 'ShoppingCart',
      featured: false,
      sortOrder: 14,
      features: ['Payment Gateways', 'Inventory Sync', 'Custom Cart Systems', 'Multi-Currency Support'],
      benefits: [
        { title: 'Global Commerce Ready', description: 'Sell seamlessly across currencies, payment methods, and channels.' }
      ]
    },
    {
      slug: 'website-maintenance',
      title: 'Website Maintenance & Security',
      shortDescription: 'Proactive 24/7 uptime monitoring, security patching, Core Web Vitals maintenance, and regular backups.',
      longDescription: 'Protect your digital asset with regular security audits, automated cloud backups, and proactive updates.',
      icon: 'Shield',
      featured: false,
      sortOrder: 15,
      features: ['24/7 Uptime Monitoring', 'Weekly Off-Site Backups', 'Core & Plugin Updates', 'Firewall & Malware Protection'],
      benefits: [
        { title: 'Peace of Mind', description: 'Never worry about site downtime, broken checkouts, or security breaches.' }
      ]
    },
    {
      slug: 'conversion-rate-optimization',
      title: 'Conversion Rate Optimization (CRO)',
      shortDescription: 'Turn more of your existing traffic into revenue through heatmaps, user session analysis, and rigorous A/B testing.',
      longDescription: 'Systematic conversion optimization removing user friction points to unlock higher returns from your current ad spend.',
      icon: 'BarChart2',
      featured: false,
      sortOrder: 16,
      features: ['Heatmap & Session Recording Audits', 'A/B & Multivariate Testing', 'Form & Checkout Optimization', 'Mobile UX Audits'],
      benefits: [
        { title: 'Double ROI Without Extra Ad Spend', description: 'Get 2x the customers from your existing website traffic.' }
      ]
    },
    {
      slug: 'lead-generation',
      title: 'B2B Lead Generation',
      shortDescription: 'Multi-touch outbound and inbound systems generating high-value qualified appointments for your sales team.',
      longDescription: 'Predictable pipeline development utilizing LinkedIn outreach, automated email enrichment, and targeted lead magnets.',
      icon: 'Target',
      featured: false,
      sortOrder: 17,
      features: ['ICP Prospect List Building', 'Automated Email Outreach', 'CRM Lead Routing', 'Appointment Setting Systems'],
      benefits: [
        { title: 'Full Sales Pipeline', description: 'Book qualified discovery calls with decision-makers consistently.' }
      ]
    },
    {
      slug: 'analytics-reporting',
      title: 'Analytics & Performance Reporting',
      shortDescription: 'Clean server-side tracking, GA4 configuration, and executive dashboards displaying real revenue impact.',
      longDescription: 'Eliminate data fog with custom BI reporting dashboards that track cost-per-lead, lifetime value, and channel attribution.',
      icon: 'PieChart',
      featured: false,
      sortOrder: 18,
      features: ['GA4 & Server-Side GTM', 'Custom Looker Studio Dashboards', 'Lead Attribution Models', 'Monthly Strategic Reviews'],
      benefits: [
        { title: 'Transparent Attribution', description: 'Know exactly which campaigns and keywords generate your profit.' }
      ]
    },
    {
      slug: 'branding-graphic-design',
      title: 'Branding & Graphic Design',
      shortDescription: 'Memorable brand identity, modern logos, pitch decks, and digital asset systems that command authority.',
      longDescription: 'Comprehensive visual identity design that differentiates your company in competitive markets.',
      icon: 'Feather',
      featured: false,
      sortOrder: 19,
      features: ['Brand Identity & Guidelines', 'Modern Logo Systems', 'Social Media Asset Kits', 'Presentation Decks'],
      benefits: [
        { title: 'Premium Perception', description: 'Command premium pricing with a world-class visual presence.' }
      ]
    },
    {
      slug: 'video-marketing',
      title: 'Video Marketing & Production',
      shortDescription: 'High-impact product demos, client case study videos, and short-form video systems for social growth.',
      longDescription: 'Engaging video assets that explain complex products clearly and build immediate emotional connection with buyers.',
      icon: 'Video',
      featured: false,
      sortOrder: 20,
      features: ['Product Demos & Motion Graphics', 'Short-Form Reels & TikToks', 'Customer Video Testimonials', 'Ad Video Iterations'],
      benefits: [
        { title: 'High Engagement', description: 'Drive 3x more retention and click-throughs compared to static imagery.' }
      ]
    },
    {
      slug: 'online-reputation-management',
      title: 'Online Reputation Management',
      shortDescription: 'Automated 5-star review collection, review gating, and brand perception protection across public search.',
      longDescription: 'Cultivate an unshakeable 5-star reputation on Google, Trustpilot, and Yelp to win customer trust instantly.',
      icon: 'Award',
      featured: false,
      sortOrder: 21,
      features: ['Automated Review Request SMS/Email', 'Review Monitoring & Alerts', 'Reputation Recovery Strategies', 'Trust Badge Integration'],
      benefits: [
        { title: 'Unshakeable Trust', description: 'Turn positive client feedback into an automatic social proof engine.' }
      ]
    }
  ];

  const defaultProcessSteps = [
    { stepNumber: '01', title: 'Discovery & Audit', description: 'Deep technical, competitive, and analytics review to isolate high-leverage growth opportunities.' },
    { stepNumber: '02', title: 'Growth Architecture', description: 'Develop custom 90-day execution roadmaps with clear KPIs and milestone targets.' },
    { stepNumber: '03', title: 'Agile Implementation', description: 'Deploy campaigns, develop web applications, and launch automated workflows.' },
    { stepNumber: '04', title: 'Data Optimization', description: 'Rigorous A/B split-testing, negative spend filtering, and conversion rate enhancement.' },
    { stepNumber: '05', title: 'Executive Reporting', description: 'Real-time dashboard access, attribution clarity, and ongoing strategic sprint reviews.' }
  ];

  for (const s of defaultServices) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDescription: s.shortDescription,
        longDescription: s.longDescription,
        icon: s.icon,
        featured: s.featured,
        sortOrder: s.sortOrder,
        status: 'PUBLISHED'
      },
      create: {
        slug: s.slug,
        title: s.title,
        shortDescription: s.shortDescription,
        longDescription: s.longDescription,
        icon: s.icon,
        featured: s.featured,
        sortOrder: s.sortOrder,
        status: 'PUBLISHED'
      }
    });

    // Seed features
    for (let i = 0; i < s.features.length; i++) {
      const featTitle = s.features[i];
      const existing = await prisma.serviceFeature.findFirst({
        where: { serviceId: service.id, title: featTitle }
      });
      if (!existing) {
        await prisma.serviceFeature.create({
          data: {
            serviceId: service.id,
            title: featTitle,
            sortOrder: i + 1
          }
        });
      }
    }

    // Seed benefits
    if (s.benefits) {
      for (let i = 0; i < s.benefits.length; i++) {
        const ben = s.benefits[i];
        const existing = await prisma.serviceBenefit.findFirst({
          where: { serviceId: service.id, title: ben.title }
        });
        if (!existing) {
          await prisma.serviceBenefit.create({
            data: {
              serviceId: service.id,
              title: ben.title,
              description: ben.description,
              sortOrder: i + 1
            }
          });
        }
      }
    }

    // Seed process steps
    for (const step of defaultProcessSteps) {
      const existing = await prisma.serviceProcessStep.findFirst({
        where: { serviceId: service.id, stepNumber: step.stepNumber }
      });
      if (!existing) {
        await prisma.serviceProcessStep.create({
          data: {
            serviceId: service.id,
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description
          }
        });
      }
    }
  }
  console.log('[SEED] All 21 Services with features, benefits, and process steps seeded.');

  // 8. Seed Demo Leads & Contact Inquiries
  const demoLeads = [
    {
      inquiryId: 'HR-INQ-202609-1001',
      name: 'Alexander Hayes',
      email: 'alex.hayes@globalenterprises.com',
      phone: '+1 415 555 0192',
      company: 'Global Enterprises Ltd',
      service: 'SEO & AI Automation',
      budget: '$5,000 - $10,000',
      message: 'Looking to overhaul our organic search visibility and connect incoming leads to HubSpot CRM automatically.',
      source: 'Contact Form',
      status: 'QUALIFIED'
    },
    {
      inquiryId: 'HR-INQ-202609-1002',
      name: 'Elena Rostova',
      email: 'elena@novatech.io',
      phone: '+44 20 7946 0912',
      company: 'NovaTech Solutions',
      service: 'Custom Web Development',
      budget: '$10,000+',
      message: 'We require a high-speed corporate web platform built with React and automated consultation booking.',
      source: 'Website',
      status: 'CONTACTED'
    },
    {
      inquiryId: 'HR-INQ-202609-1003',
      name: 'Tariq Mehmood',
      email: 'tariq@vertexproperties.pk',
      phone: '+92 300 1234567',
      company: 'Vertex Properties',
      service: 'Google Maps Ranking & Local SEO',
      budget: '$2,500 - $5,000',
      message: 'Need local 3-pack dominance across Lahore and Islamabad branches.',
      source: 'WhatsApp',
      status: 'NEW'
    }
  ];

  for (const l of demoLeads) {
    const existing = await prisma.lead.findUnique({ where: { inquiryId: l.inquiryId } });
    if (!existing) {
      const createdLead = await prisma.lead.create({
        data: l
      });
      // Add initial note
      await prisma.leadNote.create({
        data: {
          leadId: createdLead.id,
          note: `Lead received via ${l.source}. Inquiry validated.`
        }
      });
      // Also record in contact_messages
      await prisma.contactMessage.create({
        data: {
          inquiryId: l.inquiryId,
          name: l.name,
          email: l.email,
          phone: l.phone,
          company: l.company,
          service: l.service,
          budget: l.budget,
          message: l.message
        }
      });
    }
  }
  console.log('[SEED] Demo leads and messages seeded.');

  // 9. Seed Newsletter Subscribers
  const demoSubscribers = [
    { email: 'director@growthbrands.co', name: 'Growth Brands Lab', source: 'FOOTER' },
    { email: 'marketing@techventures.com', name: 'Tech Ventures Group', source: 'FOOTER' }
  ];
  for (const sub of demoSubscribers) {
    await prisma.newsletterSubscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: { ...sub, status: 'SUBSCRIBED' }
    });
  }
  console.log('[SEED] Newsletter subscribers seeded.');

  console.log('[SEED] House Robotics database successfully seeded with 100% production data!');
}

main()
  .catch((e) => {
    console.error('[SEED ERROR]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
