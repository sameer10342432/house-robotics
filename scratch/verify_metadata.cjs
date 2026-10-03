const metadata = [
  {
    path: '/',
    title: 'Digital Marketing & Technology Agency | House Robotics',
    desc: 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.'
  },
  {
    path: '/services',
    title: 'Digital Marketing & Technology Services | House Robotics',
    desc: 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.'
  },
  {
    path: '/about',
    title: 'About House Robotics | Digital Marketing & Tech Agency',
    desc: 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.'
  },
  {
    path: '/contact',
    title: 'Contact House Robotics | Free Growth Consultation',
    desc: 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.'
  },
  {
    path: '/blog',
    title: 'Digital Marketing & Tech Insights | House Robotics Blog',
    desc: 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.'
  },
  {
    path: '/seo',
    title: 'Professional SEO Services | Organic Search Optimization',
    desc: 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.'
  },
  {
    path: '/local-seo',
    title: 'Local SEO Services & Google Maps Ranking | House Robotics',
    desc: 'Dominate local search results and Google Maps 3-Pack rankings. Our local SEO services turn nearby search queries into booked appointments.'
  },
  {
    path: '/social-media',
    title: 'Social Media Marketing Services | House Robotics',
    desc: 'Build loyal brand communities and acquire customers with performance-driven social media marketing services across LinkedIn, Meta, and TikTok.'
  },
  {
    path: '/ppc',
    title: 'PPC Management Services & Google Ads | House Robotics',
    desc: 'Maximize ad returns with data-driven PPC management services. We build high-converting Google Ads campaigns that reduce CAC and boost ROAS.'
  },
  {
    path: '/ai-automation',
    title: 'AI Automation Services & Workflows | House Robotics',
    desc: 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.'
  },
  {
    path: '/web-development',
    title: 'Custom Web Development Services | House Robotics',
    desc: 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.'
  },
  {
    path: '/wordpress',
    title: 'WordPress Development Services | House Robotics',
    desc: 'Fast, secure, lightweight WordPress development services with custom Gutenberg block architecture, plugin audits, and top Lighthouse scores.'
  },
  {
    path: '/shopify',
    title: 'Shopify Development Services | House Robotics',
    desc: 'Build high-converting e-commerce storefronts with expert Shopify development services, bespoke Liquid themes, and frictionless checkout flows.'
  },
  {
    path: '/ecommerce',
    title: 'E-commerce Development Services | House Robotics',
    desc: 'Scale sales with enterprise ecommerce development services featuring headless architecture, 1-click upsells, and lightning-fast checkout velocity.'
  },
  {
    path: '/email-marketing',
    title: 'Email Marketing Services & Retention | House Robotics',
    desc: 'Boost lifetime value and repeat sales with automated email marketing services, behavioral drip sequences, and high-deliverability campaigns.'
  },
  {
    path: '/content-marketing',
    title: 'Content Marketing & Copywriting Services | House Robotics',
    desc: 'Establish industry authority and generate organic leads with data-driven content marketing services, deep research, and persuasive copywriting.'
  },
  {
    path: '/cro',
    title: 'Conversion Rate Optimization Services | House Robotics',
    desc: 'Turn existing website visitors into buyers with scientific conversion rate optimization services, user session heatmaps, and A/B test experiments.'
  },
  {
    path: '/lead-generation',
    title: 'B2B Lead Generation Services | House Robotics',
    desc: 'Fill your sales pipeline with predictable, qualified prospects using multi-channel lead generation services, targeted funnels, and CRM routing.'
  },
  {
    path: '/analytics',
    title: 'Digital Marketing Analytics & GA4 | House Robotics',
    desc: 'Gain clarity into customer acquisition costs and campaign ROI with custom digital marketing analytics dashboards and server-side GA4 tracking.'
  },
  {
    path: '/branding',
    title: 'Strategic Branding & Design Services | House Robotics',
    desc: 'Elevate brand prestige with cohesive branding services, comprehensive design systems, logo guidelines, and conversion-ready visual collateral.'
  },
  {
    path: '/video-marketing',
    title: 'Video Marketing & Creative Production | House Robotics',
    desc: 'Capture attention and boost conversions with video marketing services, high-retention short-form clips, product demos, and social video ads.'
  },
  {
    path: '/online-reputation',
    title: 'Online Reputation Management Services | House Robotics',
    desc: 'Protect and elevate brand authority with online reputation management services, automated 5-star customer review funnels, and sentiment tracking.'
  },
  {
    path: '/blog/the-modern-seo-playbook',
    title: 'Modern SEO Playbook: Ranking in AI Search | House Robotics',
    desc: 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.'
  },
  {
    path: '/blog/practical-ai-automation',
    title: 'Practical AI Automation for Businesses | House Robotics',
    desc: 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.'
  },
  {
    path: '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier',
    title: 'Why Page Speed Multiplies Conversions | House Robotics',
    desc: 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.'
  },
  {
    path: '/blog/google-ads-in-2026-eliminating-wasteful-spend',
    title: 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics',
    desc: 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.'
  },
  {
    path: '/blog/google-maps-3-pack-mastery',
    title: 'Google Maps 3-Pack Mastery & Local SEO | House Robotics',
    desc: 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.'
  },
  {
    path: '/blog/high-converting-short-form-video-systems',
    title: 'Short-Form Video Systems That Convert | House Robotics',
    desc: 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.'
  },
  {
    path: '/404',
    title: 'Page Not Found (404) | House Robotics',
    desc: 'The requested page could not be found. Explore House Robotics digital marketing services, read our growth blog, or return to the homepage.'
  }
];

let failed = false;
metadata.forEach(m => {
  const tLen = m.title.length;
  const dLen = m.desc.length;
  const tOk = tLen <= 60 && tLen >= 30;
  const dOk = dLen <= 160 && dLen >= 120;
  if (!tOk || !dOk) {
    console.error(`FAIL: ${m.path} -> Title (${tLen}): ${m.title} | Desc (${dLen}): ${m.desc}`);
    failed = true;
  } else {
    console.log(`PASS [${m.path}]: Title (${tLen} chars) | Desc (${dLen} chars)`);
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('\nALL 29 PAGES STRICTLY PASS TITLE (<=60 chars) AND DESC (<=160 chars) REQUIREMENTS!');
}
