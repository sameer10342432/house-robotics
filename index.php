<?php
/**
 * HOUSE ROBOTICS — Production Initial HTML Pre-Renderer & Metadata Injector
 * Canonical Website: https://houserobotics.online/
 * 
 * Strict SEO Compliance:
 * - Meta Title: <= 60 characters
 * - Meta Description: <= 160 characters
 * - Canonical: Absolute HTTPS URL
 * - Pre-renders server-side HTML for search engines, social crawlers, and instant visual load
 * - Fully compatible with cPanel Apache + PHP 8.2/8.3
 */

// 1. Resolve Requested URL Path
$rawUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestPath = parse_url($rawUri, PHP_URL_PATH) ?? '/';

// Normalize trailing slash (keep root as '/')
$cleanPath = rtrim($requestPath, '/');
if (empty($cleanPath)) {
    $cleanPath = '/';
}

$baseUrl = 'https://houserobotics.online';

// 2. Canonical URL Aliases & Redirects
$aliases = [
    '/home' => '/',
    '/google-maps-ranking' => '/local-seo',
    '/social-media-marketing' => '/social-media',
    '/meta-ads' => '/social-media',
    '/ppc-google-ads' => '/ppc',
    '/marketing-automation' => '/ai-automation',
    '/custom-web-development' => '/web-development',
    '/wordpress-development' => '/wordpress',
    '/shopify-development' => '/shopify',
    '/ecommerce-development' => '/ecommerce',
    '/conversion-rate-optimization' => '/cro',
    '/analytics-reporting' => '/analytics',
    '/branding-graphic-design' => '/branding',
    '/online-reputation-management' => '/online-reputation'
];

if (isset($aliases[$cleanPath])) {
    header("Location: {$baseUrl}{$aliases[$cleanPath]}", true, 301);
    exit;
}

// Redirect blog aliases for restored articles
$restoredSlugs = [
    'website-security-essentials-for-small-businesses',
    'how-to-improve-landing-pages-for-more-enquiries',
    'email-marketing-for-small-businesses-guide',
    'how-to-create-content-marketing-strategy',
    'ecommerce-seo-improve-product-page-visibility',
    'how-to-optimise-google-business-profile',
    'on-page-seo-practical-step-by-step-guide',
    'how-to-find-the-right-keywords-for-seo',
    'how-to-improve-website-loading-speed',
    'technical-seo-checklist-for-business-websites',
    'what-is-seo-and-how-it-helps-businesses-grow',
    'how-much-does-seo-cost-in-the-uk',
    'local-seo-guide-for-small-businesses',
    'seo-vs-ppc-which-is-better-for-your-business',
    'how-to-choose-a-web-development-agency',
    'wordpress-vs-shopify-which-platform-should-you-choose',
    'how-to-improve-website-conversion-rates',
    'google-ads-vs-seo-where-should-small-business-invest',
    'how-ai-automation-saves-time-for-small-businesses',
    'practical-digital-marketing-strategy-for-small-businesses'
];
foreach ($restoredSlugs as $slug) {
    if ($cleanPath === "/blog/{$slug}") {
        header("Location: {$baseUrl}/{$slug}/", true, 301);
        exit;
    }
}

// 3. Master SEO Metadata Dictionary (Strictly audited: Titles <= 60, Descriptions <= 160)
$masterRegistry = [
    'website-security-essentials-for-small-businesses' => [
        'title' => 'Website Security Essentials for Businesses | House Robotics',
        'meta_description' => 'Protect your digital operations with website security essentials for small businesses. Master SSL encryption, automated backups, 2FA, WAF defense, and updates.',
        'canonical_url' => 'https://houserobotics.online/website-security-essentials-for-small-businesses',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/website-security-essentials-for-small-businesses.jpg'
    ],
    'how-to-improve-landing-pages-for-more-enquiries' => [
        'title' => 'How to Improve Landing Pages for Enquiries | House Robotics',
        'meta_description' => 'Master landing page optimisation to capture more qualified leads. Optimize value propositions, form friction, mobile responsiveness, and trust signals.',
        'canonical_url' => 'https://houserobotics.online/how-to-improve-landing-pages-for-more-enquiries',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/how-to-improve-landing-pages-for-more-enquiries.jpg'
    ],
    'email-marketing-for-small-businesses-guide' => [
        'title' => 'Email Marketing for Small Businesses | House Robotics',
        'meta_description' => 'A practical guide to email marketing for small businesses. Learn list building, GDPR compliance, segmentation, automated drip sequences, and deliverability.',
        'canonical_url' => 'https://houserobotics.online/email-marketing-for-small-businesses-guide',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/email-marketing-for-small-businesses-guide.jpg'
    ],
    'how-to-create-content-marketing-strategy' => [
        'title' => 'How to Create a Content Marketing Strategy | House Robotics',
        'meta_description' => 'Learn how to create a content marketing strategy that drives inbound leads. Build topic clusters, establish editorial workflows, and track business ROI.',
        'canonical_url' => 'https://houserobotics.online/how-to-create-content-marketing-strategy',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/how-to-create-content-marketing-strategy.jpg'
    ],
    'ecommerce-seo-improve-product-page-visibility' => [
        'title' => 'E-commerce SEO: Product Visibility Guide | House Robotics',
        'meta_description' => 'Boost your store\'s search rankings with proven e-commerce SEO tactics. Optimize product descriptions, schema markup, faceted navigation, and internal linking.',
        'canonical_url' => 'https://houserobotics.online/ecommerce-seo-improve-product-page-visibility',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/ecommerce-seo-improve-product-page-visibility.jpg'
    ],
    'how-to-optimise-google-business-profile' => [
        'title' => 'How to Optimise Google Business Profile | House Robotics',
        'meta_description' => 'Learn Google Business Profile optimisation strategies to rank in local 3-packs, generate customer reviews, optimize primary categories, and drive phone calls.',
        'canonical_url' => 'https://houserobotics.online/how-to-optimise-google-business-profile',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/how-to-optimise-google-business-profile.jpg'
    ],
    'on-page-seo-practical-step-by-step-guide' => [
        'title' => 'On-Page SEO: Practical Step-by-Step Guide | House Robotics',
        'meta_description' => 'Master on-page SEO with this step-by-step guide. Optimize titles, meta descriptions, heading structures, internal links, image alt text, and semantic relevance.',
        'canonical_url' => 'https://houserobotics.online/on-page-seo-practical-step-by-step-guide',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/on-page-seo-practical-step-by-step-guide.jpg'
    ],
    'how-to-find-the-right-keywords-for-seo' => [
        'title' => 'How to Find the Right Keywords for SEO | House Robotics',
        'meta_description' => 'Discover how to conduct keyword research for SEO. Map search intent, discover high-value terms, analyze competitor gaps, and build profitable topic clusters.',
        'canonical_url' => 'https://houserobotics.online/how-to-find-the-right-keywords-for-seo',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/how-to-find-the-right-keywords-for-seo.jpg'
    ],
    'how-to-improve-website-loading-speed' => [
        'title' => 'How to Improve Website Loading Speed | House Robotics',
        'meta_description' => 'Learn how to improve website loading speed with actionable optimizations for images, browser caching, script minification, TTFB, and Core Web Vitals.',
        'canonical_url' => 'https://houserobotics.online/how-to-improve-website-loading-speed',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/how-to-improve-website-loading-speed.jpg'
    ],
    'technical-seo-checklist-for-business-websites' => [
        'title' => 'Technical SEO Checklist for Websites | House Robotics',
        'meta_description' => 'Audit your business website with our technical SEO checklist covering crawlability, indexation, XML sitemaps, robots.txt, Core Web Vitals, and schema markup.',
        'canonical_url' => 'https://houserobotics.online/technical-seo-checklist-for-business-websites',
        'og_type' => 'article',
        'og_image' => 'https://houserobotics.online/images/technical-seo-checklist-for-business-websites.jpg'
    ],
    '/what-is-seo-and-how-it-helps-businesses-grow' => [
        'title' => 'What Is SEO and How Does It Help Businesses Grow? Guide',
        'description' => 'Learn what SEO is, how search engines crawl and rank websites, and how organic search optimization drives compounding revenue for growing businesses.',
        'canonical' => "{$baseUrl}/what-is-seo-and-how-it-helps-businesses-grow/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/what-is-seo-and-how-it-helps-businesses-grow.jpg"
    ],
    '/what-is-seo-and-how-it-helps-businesses-grow/' => [
        'title' => 'What Is SEO and How Does It Help Businesses Grow? Guide',
        'description' => 'Learn what SEO is, how search engines crawl and rank websites, and how organic search optimization drives compounding revenue for growing businesses.',
        'canonical' => "{$baseUrl}/what-is-seo-and-how-it-helps-businesses-grow/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/what-is-seo-and-how-it-helps-businesses-grow.jpg"
    ],
    '/blog/what-is-seo-and-how-it-helps-businesses-grow' => [
        'title' => 'What Is SEO and How Does It Help Businesses Grow? Guide',
        'description' => 'Learn what SEO is, how search engines crawl and rank websites, and how organic search optimization drives compounding revenue for growing businesses.',
        'canonical' => "{$baseUrl}/what-is-seo-and-how-it-helps-businesses-grow/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/what-is-seo-and-how-it-helps-businesses-grow.jpg"
    ],
    '/how-much-does-seo-cost-in-the-uk' => [
        'title' => 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
        'description' => 'Discover realistic UK SEO costs in 2026. Explore typical monthly retainers (£750–£5,000+), one-off audit rates, pricing factors, and how to assess real ROI.',
        'canonical' => "{$baseUrl}/how-much-does-seo-cost-in-the-uk/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-much-does-seo-cost-in-the-uk.jpg"
    ],
    '/how-much-does-seo-cost-in-the-uk/' => [
        'title' => 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
        'description' => 'Discover realistic UK SEO costs in 2026. Explore typical monthly retainers (£750–£5,000+), one-off audit rates, pricing factors, and how to assess real ROI.',
        'canonical' => "{$baseUrl}/how-much-does-seo-cost-in-the-uk/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-much-does-seo-cost-in-the-uk.jpg"
    ],
    '/blog/how-much-does-seo-cost-in-the-uk' => [
        'title' => 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
        'description' => 'Discover realistic UK SEO costs in 2026. Explore typical monthly retainers (£750–£5,000+), one-off audit rates, pricing factors, and how to assess real ROI.',
        'canonical' => "{$baseUrl}/how-much-does-seo-cost-in-the-uk/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-much-does-seo-cost-in-the-uk.jpg"
    ],
    '/local-seo-guide-for-small-businesses' => [
        'title' => 'Local SEO Guide for Small Businesses: Rankings to Revenue',
        'description' => 'Master local SEO for small businesses. Discover how to optimize Google Business Profile, capture the Local 3-Pack, build citations, and drive inbound leads.',
        'canonical' => "{$baseUrl}/local-seo-guide-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/local-seo-guide-for-small-businesses.jpg"
    ],
    '/local-seo-guide-for-small-businesses/' => [
        'title' => 'Local SEO Guide for Small Businesses: Rankings to Revenue',
        'description' => 'Master local SEO for small businesses. Discover how to optimize Google Business Profile, capture the Local 3-Pack, build citations, and drive inbound leads.',
        'canonical' => "{$baseUrl}/local-seo-guide-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/local-seo-guide-for-small-businesses.jpg"
    ],
    '/blog/local-seo-guide-for-small-businesses' => [
        'title' => 'Local SEO Guide for Small Businesses: Rankings to Revenue',
        'description' => 'Master local SEO for small businesses. Discover how to optimize Google Business Profile, capture the Local 3-Pack, build citations, and drive inbound leads.',
        'canonical' => "{$baseUrl}/local-seo-guide-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/local-seo-guide-for-small-businesses.jpg"
    ],
    '/seo-vs-ppc-which-is-better-for-your-business' => [
        'title' => 'SEO vs PPC: Which Is Better for Your Business Growth?',
        'description' => 'SEO vs PPC comprehensive comparison guide: compare costs, speed, conversion intent, click share, and learn how to build an integrated search growth engine.',
        'canonical' => "{$baseUrl}/seo-vs-ppc-which-is-better-for-your-business/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/seo-vs-ppc-which-is-better-for-your-business.jpg"
    ],
    '/seo-vs-ppc-which-is-better-for-your-business/' => [
        'title' => 'SEO vs PPC: Which Is Better for Your Business Growth?',
        'description' => 'SEO vs PPC comprehensive comparison guide: compare costs, speed, conversion intent, click share, and learn how to build an integrated search growth engine.',
        'canonical' => "{$baseUrl}/seo-vs-ppc-which-is-better-for-your-business/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/seo-vs-ppc-which-is-better-for-your-business.jpg"
    ],
    '/blog/seo-vs-ppc-which-is-better-for-your-business' => [
        'title' => 'SEO vs PPC: Which Is Better for Your Business Growth?',
        'description' => 'SEO vs PPC comprehensive comparison guide: compare costs, speed, conversion intent, click share, and learn how to build an integrated search growth engine.',
        'canonical' => "{$baseUrl}/seo-vs-ppc-which-is-better-for-your-business/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/seo-vs-ppc-which-is-better-for-your-business.jpg"
    ],
    '/how-to-choose-a-web-development-agency' => [
        'title' => 'How to Choose a Web Development Agency: Buyer\'s Guide',
        'description' => 'A practical guide on how to choose a web development agency. Evaluate technical capabilities, portfolios, contracts, security, accessibility, and ownership.',
        'canonical' => "{$baseUrl}/how-to-choose-a-web-development-agency/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-choose-a-web-development-agency.jpg"
    ],
    '/how-to-choose-a-web-development-agency/' => [
        'title' => 'How to Choose a Web Development Agency: Buyer\'s Guide',
        'description' => 'A practical guide on how to choose a web development agency. Evaluate technical capabilities, portfolios, contracts, security, accessibility, and ownership.',
        'canonical' => "{$baseUrl}/how-to-choose-a-web-development-agency/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-choose-a-web-development-agency.jpg"
    ],
    '/blog/how-to-choose-a-web-development-agency' => [
        'title' => 'How to Choose a Web Development Agency: Buyer\'s Guide',
        'description' => 'A practical guide on how to choose a web development agency. Evaluate technical capabilities, portfolios, contracts, security, accessibility, and ownership.',
        'canonical' => "{$baseUrl}/how-to-choose-a-web-development-agency/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-choose-a-web-development-agency.jpg"
    ],
    '/wordpress-vs-shopify-which-platform-should-you-choose' => [
        'title' => 'WordPress vs Shopify: Which Platform Should You Choose?',
        'description' => 'WordPress vs Shopify comparison: compare e-commerce tools, customization freedom, hosting, maintenance, fees, scalability, and discover the best fit.',
        'canonical' => "{$baseUrl}/wordpress-vs-shopify-which-platform-should-you-choose/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/wordpress-vs-shopify-which-platform-should-you-choose.jpg"
    ],
    '/wordpress-vs-shopify-which-platform-should-you-choose/' => [
        'title' => 'WordPress vs Shopify: Which Platform Should You Choose?',
        'description' => 'WordPress vs Shopify comparison: compare e-commerce tools, customization freedom, hosting, maintenance, fees, scalability, and discover the best fit.',
        'canonical' => "{$baseUrl}/wordpress-vs-shopify-which-platform-should-you-choose/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/wordpress-vs-shopify-which-platform-should-you-choose.jpg"
    ],
    '/blog/wordpress-vs-shopify-which-platform-should-you-choose' => [
        'title' => 'WordPress vs Shopify: Which Platform Should You Choose?',
        'description' => 'WordPress vs Shopify comparison: compare e-commerce tools, customization freedom, hosting, maintenance, fees, scalability, and discover the best fit.',
        'canonical' => "{$baseUrl}/wordpress-vs-shopify-which-platform-should-you-choose/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/wordpress-vs-shopify-which-platform-should-you-choose.jpg"
    ],
    '/how-to-improve-website-conversion-rates' => [
        'title' => 'How to Improve Website Conversion Rates: Proven CRO Guide',
        'description' => 'Learn how to improve website conversion rates with proven CRO strategies: landing page clarity, CTA friction reduction, mobile speed, trust, and A/B testing.',
        'canonical' => "{$baseUrl}/how-to-improve-website-conversion-rates/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-improve-website-conversion-rates.jpg"
    ],
    '/how-to-improve-website-conversion-rates/' => [
        'title' => 'How to Improve Website Conversion Rates: Proven CRO Guide',
        'description' => 'Learn how to improve website conversion rates with proven CRO strategies: landing page clarity, CTA friction reduction, mobile speed, trust, and A/B testing.',
        'canonical' => "{$baseUrl}/how-to-improve-website-conversion-rates/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-improve-website-conversion-rates.jpg"
    ],
    '/blog/how-to-improve-website-conversion-rates' => [
        'title' => 'How to Improve Website Conversion Rates: Proven CRO Guide',
        'description' => 'Learn how to improve website conversion rates with proven CRO strategies: landing page clarity, CTA friction reduction, mobile speed, trust, and A/B testing.',
        'canonical' => "{$baseUrl}/how-to-improve-website-conversion-rates/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-improve-website-conversion-rates.jpg"
    ],
    '/google-ads-vs-seo-where-should-small-business-invest' => [
        'title' => 'Google Ads vs SEO: Where Should a Small Business Invest?',
        'description' => 'Google Ads vs SEO investment analysis for small businesses: budget allocation, speed of results, CAC, search intent, and how to allocate your marketing spend.',
        'canonical' => "{$baseUrl}/google-ads-vs-seo-where-should-small-business-invest/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/google-ads-vs-seo-where-should-small-business-invest.jpg"
    ],
    '/google-ads-vs-seo-where-should-small-business-invest/' => [
        'title' => 'Google Ads vs SEO: Where Should a Small Business Invest?',
        'description' => 'Google Ads vs SEO investment analysis for small businesses: budget allocation, speed of results, CAC, search intent, and how to allocate your marketing spend.',
        'canonical' => "{$baseUrl}/google-ads-vs-seo-where-should-small-business-invest/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/google-ads-vs-seo-where-should-small-business-invest.jpg"
    ],
    '/blog/google-ads-vs-seo-where-should-small-business-invest' => [
        'title' => 'Google Ads vs SEO: Where Should a Small Business Invest?',
        'description' => 'Google Ads vs SEO investment analysis for small businesses: budget allocation, speed of results, CAC, search intent, and how to allocate your marketing spend.',
        'canonical' => "{$baseUrl}/google-ads-vs-seo-where-should-small-business-invest/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/google-ads-vs-seo-where-should-small-business-invest.jpg"
    ],
    '/how-ai-automation-saves-time-for-small-businesses' => [
        'title' => 'How AI Automation Saves Time for Small Businesses in 2026',
        'description' => 'Discover realistic AI automation use cases for small businesses: automated lead routing, customer enquiry triage, reporting, and workflow integration.',
        'canonical' => "{$baseUrl}/how-ai-automation-saves-time-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-ai-automation-saves-time-for-small-businesses.jpg"
    ],
    '/how-ai-automation-saves-time-for-small-businesses/' => [
        'title' => 'How AI Automation Saves Time for Small Businesses in 2026',
        'description' => 'Discover realistic AI automation use cases for small businesses: automated lead routing, customer enquiry triage, reporting, and workflow integration.',
        'canonical' => "{$baseUrl}/how-ai-automation-saves-time-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-ai-automation-saves-time-for-small-businesses.jpg"
    ],
    '/blog/how-ai-automation-saves-time-for-small-businesses' => [
        'title' => 'How AI Automation Saves Time for Small Businesses in 2026',
        'description' => 'Discover realistic AI automation use cases for small businesses: automated lead routing, customer enquiry triage, reporting, and workflow integration.',
        'canonical' => "{$baseUrl}/how-ai-automation-saves-time-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-ai-automation-saves-time-for-small-businesses.jpg"
    ],
    '/practical-digital-marketing-strategy-for-small-businesses' => [
        'title' => 'Digital Marketing Strategy for Small Businesses: 90-Day Plan',
        'description' => 'A practical digital marketing strategy for small businesses: audience research, SEO, paid ads, content, email retention, analytics, and a 90-day action plan.',
        'canonical' => "{$baseUrl}/practical-digital-marketing-strategy-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/practical-digital-marketing-strategy-for-small-businesses.jpg"
    ],
    '/practical-digital-marketing-strategy-for-small-businesses/' => [
        'title' => 'Digital Marketing Strategy for Small Businesses: 90-Day Plan',
        'description' => 'A practical digital marketing strategy for small businesses: audience research, SEO, paid ads, content, email retention, analytics, and a 90-day action plan.',
        'canonical' => "{$baseUrl}/practical-digital-marketing-strategy-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/practical-digital-marketing-strategy-for-small-businesses.jpg"
    ],
    '/blog/practical-digital-marketing-strategy-for-small-businesses' => [
        'title' => 'Digital Marketing Strategy for Small Businesses: 90-Day Plan',
        'description' => 'A practical digital marketing strategy for small businesses: audience research, SEO, paid ads, content, email retention, analytics, and a 90-day action plan.',
        'canonical' => "{$baseUrl}/practical-digital-marketing-strategy-for-small-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/practical-digital-marketing-strategy-for-small-businesses.jpg"
    ],

    '/' => [
        'title' => 'Digital Marketing & Technology Agency | House Robotics', // 56 chars
        'description' => 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.', // 135 chars
        'canonical' => "{$baseUrl}/",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-hero-visual.webp"
    ],
    '/services' => [
        'title' => 'Digital Marketing & Technology Services | House Robotics', // 56 chars
        'description' => 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.', // 140 chars
        'canonical' => "{$baseUrl}/services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-services-overview.webp"
    ],
    '/about' => [
        'title' => 'About House Robotics | Digital Marketing & Tech Agency', // 54 chars
        'description' => 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.', // 145 chars
        'canonical' => "{$baseUrl}/about",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/about-company-overview.webp"
    ],
    '/contact' => [
        'title' => 'Contact House Robotics | Free Growth Consultation', // 49 chars
        'description' => 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.', // 137 chars
        'canonical' => "{$baseUrl}/contact",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/contact-page-visual.webp"
    ],
    '/blog' => [
        'title' => 'Digital Marketing & Tech Insights | House Robotics Blog', // 55 chars
        'description' => 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.', // 137 chars
        'canonical' => "{$baseUrl}/blog",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/blog-page-hero.webp"
    ],
    '/seo' => [
        'title' => 'Professional SEO Services | Organic Search Optimization', // 55 chars
        'description' => 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.', // 142 chars
        'canonical' => "{$baseUrl}/seo",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/local-seo' => [
        'title' => 'Local SEO Services & Google Maps Ranking | House Robotics', // 57 chars
        'description' => 'Dominate local search results and Google Maps 3-Pack rankings. Our local SEO services turn nearby search queries into booked appointments.', // 138 chars
        'canonical' => "{$baseUrl}/local-seo",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/local-seo-page-hero.webp"
    ],
    '/social-media' => [
        'title' => 'Social Media Marketing Services | House Robotics', // 48 chars
        'description' => 'Build loyal brand communities and acquire customers with performance-driven social media marketing services across LinkedIn, Meta, and TikTok.', // 142 chars
        'canonical' => "{$baseUrl}/social-media",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/social-media-marketing-page-hero.webp"
    ],
    '/ppc' => [
        'title' => 'PPC Management Services & Google Ads | House Robotics', // 53 chars
        'description' => 'Maximize ad returns with data-driven PPC management services. We build high-converting Google Ads campaigns that reduce CAC and boost ROAS.', // 139 chars
        'canonical' => "{$baseUrl}/ppc",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/ppc-google-ads-page-hero.webp"
    ],
    '/ai-automation' => [
        'title' => 'AI Automation Services & Workflows | House Robotics', // 51 chars
        'description' => 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.', // 137 chars
        'canonical' => "{$baseUrl}/ai-automation",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-ai-automation.webp"
    ],
    '/web-development' => [
        'title' => 'Custom Web Development Services | House Robotics', // 48 chars
        'description' => 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.', // 146 chars
        'canonical' => "{$baseUrl}/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/wordpress' => [
        'title' => 'WordPress Development Services | House Robotics', // 47 chars
        'description' => 'Fast, secure, lightweight WordPress development services with custom Gutenberg block architecture, plugin audits, and top Lighthouse scores.', // 140 chars
        'canonical' => "{$baseUrl}/wordpress",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/wordpress-page-hero.webp"
    ],
    '/shopify' => [
        'title' => 'Shopify Development Services | House Robotics', // 45 chars
        'description' => 'Build high-converting e-commerce storefronts with expert Shopify development services, bespoke Liquid themes, and frictionless checkout flows.', // 142 chars
        'canonical' => "{$baseUrl}/shopify",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/shopify-page-hero.webp"
    ],
    '/ecommerce' => [
        'title' => 'E-commerce Development Services | House Robotics', // 48 chars
        'description' => 'Scale sales with enterprise ecommerce development services featuring headless architecture, 1-click upsells, and lightning-fast checkout velocity.', // 146 chars
        'canonical' => "{$baseUrl}/ecommerce",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/ecommerce-page-hero.webp"
    ],
    '/email-marketing' => [
        'title' => 'Email Marketing Services & Retention | House Robotics', // 53 chars
        'description' => 'Boost lifetime value and repeat sales with automated email marketing services, behavioral drip sequences, and high-deliverability campaigns.', // 140 chars
        'canonical' => "{$baseUrl}/email-marketing",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/email-marketing-page-hero.webp"
    ],
    '/content-marketing' => [
        'title' => 'Content Marketing & Copywriting Services | House Robotics', // 57 chars
        'description' => 'Establish industry authority and generate organic leads with data-driven content marketing services, deep research, and persuasive copywriting.', // 143 chars
        'canonical' => "{$baseUrl}/content-marketing",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/content-marketing-page-hero.webp"
    ],
    '/cro' => [
        'title' => 'Conversion Rate Optimization Services | House Robotics', // 54 chars
        'description' => 'Turn existing website visitors into buyers with scientific conversion rate optimization services, user session heatmaps, and A/B test experiments.', // 146 chars
        'canonical' => "{$baseUrl}/cro",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/cro-page-hero.webp"
    ],
    '/lead-generation' => [
        'title' => 'B2B Lead Generation Services | House Robotics', // 45 chars
        'description' => 'Fill your sales pipeline with predictable, qualified prospects using multi-channel lead generation services, targeted funnels, and CRM routing.', // 143 chars
        'canonical' => "{$baseUrl}/lead-generation",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/lead-generation-page-hero.webp"
    ],
    '/analytics' => [
        'title' => 'Digital Marketing Analytics & GA4 | House Robotics', // 50 chars
        'description' => 'Gain clarity into customer acquisition costs and campaign ROI with custom digital marketing analytics dashboards and server-side GA4 tracking.', // 142 chars
        'canonical' => "{$baseUrl}/analytics",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/analytics-page-hero.webp"
    ],
    '/branding' => [
        'title' => 'Strategic Branding & Design Services | House Robotics', // 53 chars
        'description' => 'Elevate brand prestige with cohesive branding services, comprehensive design systems, logo guidelines, and conversion-ready visual collateral.', // 142 chars
        'canonical' => "{$baseUrl}/branding",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/branding-page-hero.webp"
    ],
    '/video-marketing' => [
        'title' => 'Video Marketing & Creative Production | House Robotics', // 54 chars
        'description' => 'Capture attention and boost conversions with video marketing services, high-retention short-form clips, product demos, and social video ads.', // 140 chars
        'canonical' => "{$baseUrl}/video-marketing",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/video-marketing-page-hero.webp"
    ],
    '/online-reputation' => [
        'title' => 'Online Reputation Management Services | House Robotics', // 54 chars
        'description' => 'Protect and elevate brand authority with online reputation management services, automated 5-star customer review funnels, and sentiment tracking.', // 145 chars
        'canonical' => "{$baseUrl}/online-reputation",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/online-reputation-page-hero.webp"
    ],
    '/usa' => [
        'title' => 'USA Digital Marketing, SEO & Web Dev | House Robotics', // 53 chars
        'description' => 'Specialized digital marketing, technical SEO, custom web development, and AI automation for high-growth businesses across all 50 US states.', // 140 chars
        'canonical' => "{$baseUrl}/usa",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-hero-visual.webp"
    ],
    '/how-much-does-seo-cost-in-the-uk' => [
        'title' => 'How Much Does SEO Cost in the UK? 2026 Pricing Guide', // 52 chars
        'description' => 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.', // 154 chars
        'canonical' => "{$baseUrl}/how-much-does-seo-cost-in-the-uk/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-much-does-seo-cost-in-the-uk.webp"
    ],
    '/what-is-seo-and-why-does-your-business-need-it' => [
        'title' => 'What Is SEO & Why Does Your Business Need It? (Guide)', // 53 chars
        'description' => 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.', // 146 chars
        'canonical' => "{$baseUrl}/what-is-seo-and-why-does-your-business-need-it/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/what-is-seo-and-why-does-your-business-need-it.webp"
    ],
    '/seo-vs-ppc-which-is-better-for-your-business' => [
        'title' => 'SEO vs PPC: Which Is Better for Your Business?', // 46 chars
        'description' => 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.', // 153 chars
        'canonical' => "{$baseUrl}/seo-vs-ppc-which-is-better-for-your-business/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/seo-vs-ppc-which-is-better-for-your-business.webp"
    ],
    '/how-google-business-profile-helps-local-businesses' => [
        'title' => 'How Google Business Profile Helps Local Businesses | Guide', // 58 chars
        'description' => 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.', // 159 chars
        'canonical' => "{$baseUrl}/how-google-business-profile-helps-local-businesses/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-google-business-profile-helps-local-businesses.webp"
    ],
    '/how-to-improve-your-google-rankings-in-2026' => [
        'title' => 'How to Improve Google Rankings in 2026 | Full Guide', // 51 chars
        'description' => 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.', // 154 chars
        'canonical' => "{$baseUrl}/how-to-improve-your-google-rankings-in-2026/",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/how-to-improve-your-google-rankings-in-2026.webp"
    ],
    '/blog/the-modern-seo-playbook' => [
        'title' => 'Modern SEO Playbook: Ranking in AI Search | House Robotics', // 58 chars
        'description' => 'Discover how AI Overviews and answer engines reshape search rankings, and learn how to optimize entity authority for generative search citations.', // 145 chars
        'canonical' => "{$baseUrl}/blog/the-modern-seo-playbook",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-ai-search.svg"
    ],
    '/blog/practical-ai-automation' => [
        'title' => 'Practical AI Automation for Businesses | House Robotics', // 55 chars
        'description' => 'Learn how to connect sales and marketing channels directly to your CRM with practical AI automation workflows that eliminate repetitive busywork.', // 145 chars
        'canonical' => "{$baseUrl}/blog/practical-ai-automation",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-autonomous-agents.svg"
    ],
    '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier' => [
        'title' => 'Why Page Speed Multiplies Conversions | House Robotics', // 54 chars
        'description' => 'Discover why every 100ms delay hurts checkout rates and how modern, clean frontend stacks deliver superior Core Web Vitals and higher revenue.', // 142 chars
        'canonical' => "{$baseUrl}/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-react-perf.svg"
    ],
    '/blog/google-ads-in-2026-eliminating-wasteful-spend' => [
        'title' => 'Google Ads Strategy: Cut Wasteful Ad Spend | House Robotics', // 59 chars
        'description' => 'Audit broad-match keyword bleed, protect your ad budget, and acquire high-intent commercial buyers with precision negative keyword strategies.', // 142 chars
        'canonical' => "{$baseUrl}/blog/google-ads-in-2026-eliminating-wasteful-spend",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-b2b-funnels.svg"
    ],
    '/blog/google-maps-3-pack-mastery' => [
        'title' => 'Google Maps 3-Pack Mastery & Local SEO | House Robotics', // 55 chars
        'description' => 'Master the Google Maps 3-Pack with local geo-grid optimization, automated review velocity, and entity citations to dominate regional search.', // 140 chars
        'canonical' => "{$baseUrl}/blog/google-maps-3-pack-mastery",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-local-maps.svg"
    ],
    '/blog/high-converting-short-form-video-systems' => [
        'title' => 'Short-Form Video Systems That Convert | House Robotics', // 54 chars
        'description' => 'Turn viral views into qualified pipeline. Learn the 3-second hook taxonomy and attribution workflows for high-converting short-form videos.', // 139 chars
        'canonical' => "{$baseUrl}/blog/high-converting-short-form-video-systems",
        'robots' => 'index, follow',
        'ogType' => 'article',
        'ogImage' => "{$baseUrl}/images/blog-short-form.svg"
    ],
    // 18 Pilot USA Location Pages (Strictly Audited & Verified)
    '/usa/texas/austin/seo-services' => [
        'title' => 'Austin SEO Services & Organic Growth | House Robotics', // 53 chars
        'description' => 'Specialized technical SEO, enterprise keyword architecture, and organic search growth for Austin SaaS startups, tech firms, and commercial services.', // 148 chars
        'canonical' => "{$baseUrl}/usa/texas/austin/seo-services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/usa/texas/austin/web-development' => [
        'title' => 'Austin Custom Website Development | House Robotics', // 50 chars
        'description' => 'Custom website development and modern web applications for Austin businesses. Ultra-fast performance, responsive design, and enterprise-grade code.', // 147 chars
        'canonical' => "{$baseUrl}/usa/texas/austin/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/new-york/new-york-city/web-development' => [
        'title' => 'NYC Website Development & Engineering | House Robotics', // 54 chars
        'description' => 'Custom website development and high-performance digital engineering for New York City enterprises, financial institutions, and creative agencies.', // 145 chars
        'canonical' => "{$baseUrl}/usa/new-york/new-york-city/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/new-york/new-york-city/seo-services' => [
        'title' => 'NYC SEO Services & Search Strategy | House Robotics', // 51 chars
        'description' => 'Dominant enterprise SEO and organic search strategy for New York City businesses. Technical audits, high-intent keyword ranking, and compounding pipeline.', // 154 chars
        'canonical' => "{$baseUrl}/usa/new-york/new-york-city/seo-services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/usa/california/los-angeles/digital-marketing' => [
        'title' => 'Los Angeles Digital Marketing Agency | House Robotics', // 53 chars
        'description' => 'Strategic digital marketing, paid advertising, and conversion funnels for Los Angeles businesses. Proven customer acquisition systems for LA enterprises.', // 153 chars
        'canonical' => "{$baseUrl}/usa/california/los-angeles/digital-marketing",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/social-media-marketing-page-hero.webp"
    ],
    '/usa/california/san-francisco/ai-automation' => [
        'title' => 'San Francisco AI Automation Systems | House Robotics', // 52 chars
        'description' => 'Custom AI automation and intelligent workflow engineering for San Francisco tech companies and scaling ventures. Automate operations and accelerate growth.', // 155 chars
        'canonical' => "{$baseUrl}/usa/california/san-francisco/ai-automation",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-ai-automation.webp"
    ],
    '/usa/illinois/chicago/seo-services' => [
        'title' => 'Chicago B2B SEO Services & Growth | House Robotics', // 50 chars
        'description' => 'Specialized B2B and industrial SEO services in Chicago. Technical search optimization, commercial keyword architecture, and qualified pipeline generation.', // 154 chars
        'canonical' => "{$baseUrl}/usa/illinois/chicago/seo-services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/usa/florida/miami/web-development' => [
        'title' => 'Miami Custom Website Development | House Robotics', // 49 chars
        'description' => 'Custom website development and modern web applications for Miami businesses. Ultra-fast performance, luxury design, and conversion-focused architecture.', // 152 chars
        'canonical' => "{$baseUrl}/usa/florida/miami/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/texas/dallas/ppc-management' => [
        'title' => 'Dallas PPC Management & Google Ads | House Robotics', // 51 chars
        'description' => 'Disciplined Google Ads and PPC management for Dallas-Fort Worth businesses. High-intent conversion capture, negative keyword architecture, and proven ROAS.', // 155 chars
        'canonical' => "{$baseUrl}/usa/texas/dallas/ppc-management",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/ppc-google-ads-page-hero.webp"
    ],
    '/usa/washington/seattle/web-development' => [
        'title' => 'Seattle Custom Website Development | House Robotics', // 51 chars
        'description' => 'Custom website development and modern web applications for Seattle businesses. Sub-second load times, cloud architecture, and conversion-focused UX.', // 148 chars
        'canonical' => "{$baseUrl}/usa/washington/seattle/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/georgia/atlanta/seo-services' => [
        'title' => 'Atlanta SEO Services & Organic Search | House Robotics', // 54 chars
        'description' => 'Strategic SEO and organic search dominance for Atlanta businesses. Technical audits, high-intent keyword ranking, and compounding revenue pipeline.', // 147 chars
        'canonical' => "{$baseUrl}/usa/georgia/atlanta/seo-services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/usa/massachusetts/boston/ai-automation' => [
        'title' => 'Boston AI Automation & Workflows | House Robotics', // 49 chars
        'description' => 'Custom AI automation and intelligent workflow engineering for Boston biotechnology, education, and tech ventures. Streamline operations and save hours.', // 151 chars
        'canonical' => "{$baseUrl}/usa/massachusetts/boston/ai-automation",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-ai-automation.webp"
    ],
    '/usa/colorado/denver/web-development' => [
        'title' => 'Denver Custom Website Development | House Robotics', // 50 chars
        'description' => 'Custom website development and modern web applications for Denver tech, clean energy, and commercial leaders. Built for high speed and conversion.', // 146 chars
        'canonical' => "{$baseUrl}/usa/colorado/denver/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/arizona/phoenix/local-seo' => [
        'title' => 'Phoenix Local SEO & Maps Ranking | House Robotics', // 49 chars
        'description' => 'Targeted local SEO, Google Business Profile optimization, and local citation architecture for commercial service leaders across Greater Phoenix, Arizona.', // 153 chars
        'canonical' => "{$baseUrl}/usa/arizona/phoenix/local-seo",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/local-seo-page-hero.webp"
    ],
    '/usa/texas/houston/seo-services' => [
        'title' => 'Houston SEO Services & Organic Search | House Robotics', // 54 chars
        'description' => 'Strategic technical SEO, enterprise keyword architecture, and organic lead acquisition for Houston energy, manufacturing, and commercial leaders.', // 145 chars
        'canonical' => "{$baseUrl}/usa/texas/houston/seo-services",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/seo-page-hero.webp"
    ],
    '/usa/california/san-diego/web-development' => [
        'title' => 'San Diego Website Development Services | House Robotics', // 55 chars
        'description' => 'Modern custom web development, React applications, and enterprise CMS engineering for San Diego biotechnology, defense, and technology companies.', // 145 chars
        'canonical' => "{$baseUrl}/usa/california/san-diego/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/north-carolina/charlotte/web-development' => [
        'title' => 'Charlotte Website Development Services | House Robotics', // 55 chars
        'description' => 'Custom website development and modern web apps for Charlotte financial, healthcare, and corporate firms. Ultra-fast performance and security.', // 141 chars
        'canonical' => "{$baseUrl}/usa/north-carolina/charlotte/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/usa/california/san-francisco/web-development' => [
        'title' => 'San Francisco Website Development | House Robotics', // 50 chars
        'description' => 'High-performance custom website development and React engineering for San Francisco technology companies, AI startups, and SaaS platforms.', // 138 chars
        'canonical' => "{$baseUrl}/usa/california/san-francisco/web-development",
        'robots' => 'index, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/web-development-page-hero.webp"
    ],
    '/404' => [
        'title' => 'Page Not Found (404) | House Robotics', // 37 chars
        'description' => 'The requested page could not be found. Explore House Robotics digital marketing services, read our growth blog, or return to the homepage.', // 138 chars
        'canonical' => "{$baseUrl}/404",
        'robots' => 'noindex, follow',
        'ogType' => 'website',
        'ogImage' => "{$baseUrl}/assets/home-hero-visual.webp"
    ]
];

// 4. Resolve Target Metadata
$matched = null;
$is404 = false;

// 4a. Check static dictionary
if (isset($masterRegistry[$cleanPath])) {
    $matched = $masterRegistry[$cleanPath];
}

// 4b. Check database for dynamic overrides or location pages
if (!$matched && file_exists(__DIR__ . '/includes/Database.php')) {
    try {
        require_once __DIR__ . '/includes/Database.php';
        
        // Check usa_location_pages
        $dbLoc = Database::fetchOne("SELECT meta_title, meta_description, canonical_url, og_title, og_description, og_image, no_index FROM usa_location_pages WHERE url_path = ? AND status = 'PUBLISHED' LIMIT 1", [$cleanPath]);
        if ($dbLoc && !empty($dbLoc['meta_title'])) {
            $matched = [
                'title' => $dbLoc['meta_title'],
                'description' => $dbLoc['meta_description'] ?? '',
                'canonical' => $dbLoc['canonical_url'] ?? "{$baseUrl}{$cleanPath}",
                'robots' => (!empty($dbLoc['no_index'])) ? 'noindex, follow' : 'index, follow',
                'ogType' => 'website',
                'ogImage' => $dbLoc['og_image'] ?? "{$baseUrl}/assets/seo-page-hero.webp"
            ];
        }

        // Check seo_metadata table
        if (!$matched) {
            $dbSeo = Database::fetchOne("SELECT seo_title, meta_description, canonical_url, og_title, og_description, og_image, no_index FROM seo_metadata WHERE page_path = ? LIMIT 1", [$cleanPath]);
            if ($dbSeo && !empty($dbSeo['seo_title'])) {
                $matched = [
                    'title' => $dbSeo['seo_title'],
                    'description' => $dbSeo['meta_description'] ?? '',
                    'canonical' => $dbSeo['canonical_url'] ?? "{$baseUrl}{$cleanPath}",
                    'robots' => (!empty($dbSeo['no_index'])) ? 'noindex, follow' : 'index, follow',
                    'ogType' => 'website',
                    'ogImage' => $dbSeo['og_image'] ?? "{$baseUrl}/assets/home-hero-visual.webp"
                ];
            }
        }
    } catch (Throwable $e) {
        // Gracefully ignore database errors and proceed to dynamic synthesizers
    }
}

// 4c. Dynamic Synthesizer for USA State and City pages
if (!$matched && str_starts_with($cleanPath, '/usa/')) {
    $segments = array_values(array_filter(explode('/', $cleanPath)));
    $stateSlug = $segments[1] ?? null;
    $citySlug = $segments[2] ?? null;
    $serviceSlug = $segments[3] ?? null;

    if ($stateSlug && !$citySlug) {
        // State Overview Page
        $stateWords = explode('-', $stateSlug);
        $stateName = ucwords(implode(' ', $stateWords));
        $seoTitle = "Web Dev, SEO & AI in {$stateName} | House Robotics";
        $metaDescription = "Scalable web development, technical SEO, and AI automation for businesses across {$stateName}. Remote excellence for commercial growth.";
        $matched = [
            'title' => $seoTitle,
            'description' => $metaDescription,
            'canonical' => "{$baseUrl}{$cleanPath}",
            'robots' => 'index, follow',
            'ogType' => 'website',
            'ogImage' => "{$baseUrl}/assets/home-hero-visual.webp"
        ];
    } elseif ($stateSlug && $citySlug && !$serviceSlug) {
        // City Overview Page
        $stateCodes = [
            'alabama' => 'AL', 'alaska' => 'AK', 'arizona' => 'AZ', 'arkansas' => 'AR', 'california' => 'CA',
            'colorado' => 'CO', 'connecticut' => 'CT', 'delaware' => 'DE', 'district-of-columbia' => 'DC', 'florida' => 'FL',
            'georgia' => 'GA', 'hawaii' => 'HI', 'idaho' => 'ID', 'illinois' => 'IL', 'indiana' => 'IN',
            'iowa' => 'IA', 'kansas' => 'KS', 'kentucky' => 'KY', 'louisiana' => 'LA', 'maine' => 'ME',
            'maryland' => 'MD', 'massachusetts' => 'MA', 'michigan' => 'MI', 'minnesota' => 'MN', 'mississippi' => 'MS',
            'missouri' => 'MO', 'montana' => 'MT', 'nebraska' => 'NE', 'nevada' => 'NV', 'new-hampshire' => 'NH',
            'new-jersey' => 'NJ', 'new-mexico' => 'NM', 'new-york' => 'NY', 'north-carolina' => 'NC', 'north-dakota' => 'ND',
            'ohio' => 'OH', 'oklahoma' => 'OK', 'oregon' => 'OR', 'pennsylvania' => 'PA', 'rhode-island' => 'RI',
            'south-carolina' => 'SC', 'south-dakota' => 'SD', 'tennessee' => 'TN', 'texas' => 'TX', 'utah' => 'UT',
            'vermont' => 'VT', 'virginia' => 'VA', 'washington' => 'WA', 'west-virginia' => 'WV', 'wisconsin' => 'WI',
            'wyoming' => 'WY'
        ];
        $stCode = $stateCodes[$stateSlug] ?? strtoupper(substr($stateSlug, 0, 2));
        $cityWords = explode('-', $citySlug);
        $cityName = ucwords(implode(' ', $cityWords));
        $seoTitle = "Web Dev, SEO & AI in {$cityName}, {$stCode} | House Robotics";
        $metaDescription = "Expand your commercial reach in {$cityName}, {$stCode} with custom web engineering, high-ranking SEO, and smart AI automation. Book a discovery call.";
        $matched = [
            'title' => $seoTitle,
            'description' => $metaDescription,
            'canonical' => "{$baseUrl}{$cleanPath}",
            'robots' => 'index, follow',
            'ogType' => 'website',
            'ogImage' => "{$baseUrl}/assets/home-hero-visual.webp"
        ];
    }
}

// 4d. Fallback to 404 Not Found if unknown
if (!$matched) {
    $matched = $masterRegistry['/404'];
    $is404 = true;
    http_response_code(404);
} else {
    http_response_code(200);
}

// 5. Strict Character Limit Safeguards
$finalTitle = trim($matched['title'] ?? 'House Robotics | Digital Marketing & Tech');
if (mb_strlen($finalTitle, 'UTF-8') > 60) {
    $finalTitle = mb_substr($finalTitle, 0, 60, 'UTF-8');
}

$finalDesc = trim($matched['description'] ?? '');
if (mb_strlen($finalDesc, 'UTF-8') > 160) {
    $finalDesc = mb_substr($finalDesc, 0, 160, 'UTF-8');
}

$finalCanonical = $matched['canonical'] ?? "{$baseUrl}{$cleanPath}";
$finalRobots = $is404 ? 'noindex, follow' : ($matched['robots'] ?? 'index, follow');
$finalOgType = $matched['ogType'] ?? 'website';
$finalOgImage = $matched['ogImage'] ?? "{$baseUrl}/assets/home-hero-visual.webp";

// 6. Read Built HTML Shell
$htmlFile = file_exists(__DIR__ . '/index.html') ? __DIR__ . '/index.html' : (__DIR__ . '/dist/index.html');
if (!file_exists($htmlFile)) {
    header('Content-Type: text/plain');
    echo "House Robotics application template not found.";
    exit;
}

$html = file_get_contents($htmlFile);

// 7. Inject Meta Tags into HTML Head
$escapedTitle = htmlspecialchars($finalTitle, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$escapedDesc = htmlspecialchars($finalDesc, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$escapedCanonical = htmlspecialchars($finalCanonical, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$escapedRobots = htmlspecialchars($finalRobots, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$escapedOgImage = htmlspecialchars($finalOgImage, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Replace Title
$html = preg_replace('/<title>.*?<\/title>/is', "<title>{$escapedTitle}</title>", $html, 1);

// Replace Meta Description
$html = preg_replace('/<meta\s+name=["\']description["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"description\" content=\"{$escapedDesc}\" />", $html, 1);

// Replace Canonical Link
$html = preg_replace('/<link\s+rel=["\']canonical["\']\s+href=["\'].*?["\']\s*\/?>/is', "<link rel=\"canonical\" href=\"{$escapedCanonical}\" />", $html, 1);

// Replace Robots Directive
$html = preg_replace('/<meta\s+name=["\']robots["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"robots\" content=\"{$escapedRobots}\" />", $html, 1);

// Replace Open Graph Tags
$html = preg_replace('/<meta\s+property=["\']og:title["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta property=\"og:title\" content=\"{$escapedTitle}\" />", $html, 1);
$html = preg_replace('/<meta\s+property=["\']og:description["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta property=\"og:description\" content=\"{$escapedDesc}\" />", $html, 1);
$html = preg_replace('/<meta\s+property=["\']og:url["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta property=\"og:url\" content=\"{$escapedCanonical}\" />", $html, 1);
$html = preg_replace('/<meta\s+property=["\']og:type["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta property=\"og:type\" content=\"{$finalOgType}\" />", $html, 1);
$html = preg_replace('/<meta\s+property=["\']og:image["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta property=\"og:image\" content=\"{$escapedOgImage}\" />", $html, 1);

// Replace Twitter Card Tags
$html = preg_replace('/<meta\s+name=["\']twitter:title["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"twitter:title\" content=\"{$escapedTitle}\" />", $html, 1);
$html = preg_replace('/<meta\s+name=["\']twitter:description["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"twitter:description\" content=\"{$escapedDesc}\" />", $html, 1);
$html = preg_replace('/<meta\s+name=["\']twitter:image["\']\s+content=["\'].*?["\']\s*\/?>/is', "<meta name=\"twitter:image\" content=\"{$escapedOgImage}\" />", $html, 1);

// 8. Send Output
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
if ($is404) {
    header('Cache-Control: no-cache, no-store, must-revalidate');
} else {
    header('Cache-Control: public, max-age=3600');
}

echo $html;
