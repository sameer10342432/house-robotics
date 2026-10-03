const fs = require('fs');
const path = require('path');

const articles = [
  {
    id: 'post-seo-cost-uk',
    title: 'How Much Does SEO Cost in the UK?',
    slug: 'how-much-does-seo-cost-in-the-uk',
    excerpt: 'A comprehensive breakdown of UK SEO pricing in 2026: typical monthly retainers (£500–£5,000+), one-off audits, hourly rates, scope factors, and how to assess true ROI.',
    content: '<h2>Understanding SEO Pricing in the United Kingdom</h2><p>One of the most frequent questions business owners ask when looking to scale organic search traffic is: <em>"How much does SEO cost in the UK?"</em> The short answer is that professional SEO services in the UK typically range from <strong>£500 to £5,000+ per month</strong> for ongoing monthly retainers, with one-off technical audits costing between <strong>£750 and £3,500</strong>, and specialist hourly consultancy ranging between <strong>£80 and £200 per hour</strong>.</p><p>However, comparing SEO agency quotes is notoriously challenging because the deliverables, technical expertise, and depth of execution vary dramatically. In this guide, we break down typical UK SEO costs, what different price brackets include, the key factors determining your budget, and how to evaluate real return on investment (ROI) with <a href="/seo">professional SEO services</a>.</p><h3>Typical UK SEO Pricing Tiers (2026 Benchmarks)</h3><p>Depending on your business size, competitive landscape, and market ambitions, UK SEO pricing typically falls into four distinct investment tiers:</p><ul><li><strong>Tier 1: Local SME Retainers (£500 – £1,500 / month):</strong> Ideal for regional service companies, trades, and medical or professional practices targeting specific towns or postcodes. Focuses heavily on Google Business Profile optimization, local citation building, and regional keyword silos through <a href="/local-seo">local SEO services</a>.</li><li><strong>Tier 2: Mid-Market & Growing E-Commerce (£1,500 – £4,000 / month):</strong> Suitable for established UK businesses competing regionally or nationally. Includes comprehensive technical SEO audits, site speed optimization, continuous editorial topic clustering, and authoritative digital PR link acquisition.</li><li><strong>Tier 3: Enterprise & High-Competition Sectors (£4,000 – £10,000+ / month):</strong> Geared towards fintech, legal, national SaaS, and high-SKU retailers competing for the UK’s most lucrative search queries. Encompasses dedicated engineering sprints, bespoke schema architecture, and high-velocity digital PR campaigns.</li><li><strong>One-Off Technical Audits (£750 – £3,500):</strong> A forensic deep dive into indexability, crawl budget, Core Web Vitals, server architecture, and topical gap analysis, delivering an actionable remediation roadmap.</li></ul><h3>Key Factors That Influence Your UK SEO Costs</h3><p>Why does one agency quote £800/month while another quotes £3,500/month? Several critical factors dictate the scope of work:</p><ol><li><strong>Current Domain Authority & Technical Debt:</strong> A brand-new website or a legacy site plagued with indexation errors and bloated CMS code requires extensive foundational engineering through <a href="/web-development">custom web development</a> before organic gains materialize.</li><li><strong>Market Competitiveness:</strong> Dominating search for "commercial solicitors London" requires far more resources, original research, and digital PR than ranking for a niche B2B tool in Bristol.</li><li><strong>Strategy vs. Execution (Who Does the Work?):</strong> Low-cost agencies frequently hand off a PDF of recommendations and expect your internal team to implement them. High-tier agencies handle full-stack execution: writing content, refactoring code, and managing link acquisition.</li><li><strong>Geographic Scope:</strong> Single-city targeting requires less resource expenditure than national or pan-European campaigns.</li></ol><h3>The Dangers of "Cheap" £99/Month SEO Packages</h3><p>Businesses operating on tight margins are often tempted by offshore or automated "cheap SEO" packages advertised at £99 to £250 per month. In organic search, cheap SEO is almost always more expensive in the long run. These low-cost packages invariably rely on automated bot-generated backlinks from low-quality link farms and Private Blog Networks (PBNs), triggering manual or algorithmic Google penalties, as well as thin, unedited AI-generated content that fails Google’s helpful content standards.</p><h3>Calculating Your Expected Return on Investment (ROI)</h3><p>To determine what you should budget for SEO, assess your Customer Lifetime Value (LTV) and average transaction margin. For instance, if an average client is worth £3,000 to your business, securing just two qualified organic inquiries per month generates £72,000 in annual revenue—making an ongoing £2,000/month retainer deliver an extraordinary 3x net return on investment.</p><p>At House Robotics, we focus strictly on commercial pipeline value rather than vanity impressions. Ready to evaluate your organic growth opportunities? <a href="/contact">Schedule a free SEO audit and consultation</a> with our search engineers today.</p>',
    featured_image: '/images/how-much-does-seo-cost-in-the-uk.webp',
    featured_image_alt: 'SEO pricing and digital marketing strategy for UK businesses',
    featured_image_caption: 'UK SEO pricing benchmarks, retainer tiers, and ROI breakdown for growing businesses.',
    author: 'House Robotics Strategy Team',
    author_role: 'Senior SEO & Growth Strategist',
    read_time: '8 min read',
    category_id: 'bcat001',
    status: 'PUBLISHED',
    featured: 1,
    published_at: '2026-03-10 10:00:00',
    seo_title: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    meta_description: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    focus_keyword: 'how much does SEO cost in the UK',
    canonical_url: 'https://houserobotics.online/how-much-does-seo-cost-in-the-uk/',
    og_title: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    og_description: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    og_image: 'https://houserobotics.online/images/how-much-does-seo-cost-in-the-uk.webp',
    twitter_title: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    twitter_description: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    twitter_image: 'https://houserobotics.online/images/how-much-does-seo-cost-in-the-uk.webp'
  },
  {
    id: 'post-what-is-seo',
    title: 'What Is SEO and Why Does Your Business Need It?',
    slug: 'what-is-seo-and-why-does-your-business-need-it',
    excerpt: 'Understand how modern search engine optimization works, why search visibility compounds revenue, and how technical, on-page, and authority pillars fuel sustainable growth.',
    content: '<h2>What Is Search Engine Optimization (SEO)?</h2><p>Search Engine Optimization (SEO) is the scientific and continuous practice of improving a website’s architecture, content quality, and digital authority to maximize its visibility in organic (unpaid) search results. Whenever prospective clients search for solutions, products, or questions on search engines like Google, search algorithms evaluate billions of web pages to surface the most relevant, reliable, and authoritative answers.</p><p>Unlike paid advertising—which requires you to pay for every single click—organic search visibility delivers compounding traffic that continues to generate inquiries long after publication. Investing in <a href="/seo">enterprise SEO services</a> builds permanent digital equity for your brand.</p><h3>The Four Pillars of Modern Organic Search</h3><p>Achieving top Google rankings requires a cohesive strategy spanning four foundational pillars:</p><ol><li><strong>1. Technical SEO:</strong> Ensuring search engine spiders can crawl, render, and index your website without friction. This includes optimizing Core Web Vitals, HTTPS security, XML sitemaps, clean canonicalization, and lightning-fast page loading speeds engineered via <a href="/web-development">custom web development</a>.</li><li><strong>2. On-Page SEO & Content Relevance:</strong> Crafting high-quality, comprehensive content that directly addresses user search intent. It involves strategic semantic keyword targeting, natural entity relationships, structured headings (H1, H2, H3), and descriptive schema markup.</li><li><strong>3. Off-Page SEO & Digital Authority:</strong> Earning trust signals from reputable external websites through high-tier backlinks, press coverage, podcast appearances, and authoritative industry citations.</li><li><strong>4. User Experience & Conversion Optimization:</strong> Retaining visitors with intuitive UX, sub-second response times, and frictionless paths to conversion supported by <a href="/cro">conversion rate optimization</a>.</li></ol><h3>Why Your Business Needs SEO</h3><p>Whether you operate a B2B consultancy, local clinic, or international e-commerce storefront, SEO serves as the primary engine of customer discovery with high commercial intent, compounding return on investment, unshakable market credibility, and competitive moat.</p><p>Building an authoritative search engine footprint takes time, discipline, and engineering rigor. <a href="/contact">Connect with House Robotics for a strategic organic search consultation</a> and see where your brand stands today.</p>',
    featured_image: '/images/what-is-seo-and-why-does-your-business-need-it.webp',
    featured_image_alt: 'Search engine optimization fundamentals and organic business growth strategy',
    featured_image_caption: 'The fundamental pillars of search engine optimization: Technical, on-page, and authority building.',
    author: 'House Robotics Strategy Team',
    author_role: 'Search Engine Strategist',
    read_time: '7 min read',
    category_id: 'bcat001',
    status: 'PUBLISHED',
    featured: 1,
    published_at: '2026-03-08 10:00:00',
    seo_title: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    meta_description: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    focus_keyword: 'what is SEO and why does your business need it',
    canonical_url: 'https://houserobotics.online/what-is-seo-and-why-does-your-business-need-it/',
    og_title: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    og_description: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    og_image: 'https://houserobotics.online/images/what-is-seo-and-why-does-your-business-need-it.webp',
    twitter_title: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    twitter_description: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    twitter_image: 'https://houserobotics.online/images/what-is-seo-and-why-does-your-business-need-it.webp'
  },
  {
    id: 'post-seo-vs-ppc',
    title: 'SEO vs PPC: Which Is Better for Your Business?',
    slug: 'seo-vs-ppc-which-is-better-for-your-business',
    excerpt: 'An educational, data-driven comparison of Organic SEO and Pay-Per-Click (PPC) advertising: speed to results, cost efficiency, conversion rates, and the power of a unified search strategy.',
    content: '<h2>The Great Search Debate: SEO vs. PPC</h2><p>When developing a digital acquisition strategy, businesses inevitably confront the core decision: <em>Should we invest in Search Engine Optimization (SEO) or Pay-Per-Click (PPC) advertising?</em></p><p>Both channels deliver traffic from search engines like Google, but they operate on fundamentally different mechanics, timelines, and financial models. Rather than viewing them as competing disciplines, top-performing brands treat SEO and PPC as complementary pillars of a unified revenue engine. In this comprehensive guide, we compare advantages, disadvantages, costs, and strategic use cases for each channel.</p><h3>Understanding Organic SEO: The Long-Term Compounding Asset</h3><p>SEO focuses on earning high rankings within Google’s unpaid organic results through technical excellence, topical authority, and quality backlinks. It delivers zero cost per click, high consumer trust (70%+ of clicks), and durable compounding momentum over a 3 to 6-month ramp-up.</p><h3>Understanding PPC: Instant Commercial Acquisition</h3><p>Pay-Per-Click advertising—primarily Google Search Ads, Performance Max, and Meta Ads—allows you to bid on target keywords and place your website at the very top of search result pages immediately with granular audience targeting, immediate traffic in our <a href="/ppc">PPC management services</a>, and direct measurable CAC.</p><h3>The Winning Hybrid Approach: Unifying SEO and PPC</h3><p>The most profitable businesses do not choose between SEO and PPC; they integrate both into an interconnected growth engine: using PPC search query data to identify winning organic topic clusters, dominating total SERP real estate, retargeting organic readers with PPC display funnels, and tracking unified attribution via server-side <a href="/analytics">analytics</a>.</p><p>Need guidance choosing the optimal balance for your growth goals? <a href="/contact">Speak with House Robotics strategy team today</a> for a holistic channel review.</p>',
    featured_image: '/images/seo-vs-ppc-which-is-better-for-your-business.webp',
    featured_image_alt: 'Comparison of SEO organic search and PPC paid advertising strategies',
    featured_image_caption: 'Comparing organic search longevity with rapid paid advertising acquisition.',
    author: 'Performance Marketing Group',
    author_role: 'Lead Performance Strategist',
    read_time: '8 min read',
    category_id: 'bcat005',
    status: 'PUBLISHED',
    featured: 1,
    published_at: '2026-03-05 10:00:00',
    seo_title: 'SEO vs PPC: Which Is Better for Your Business?',
    meta_description: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    focus_keyword: 'SEO vs PPC',
    canonical_url: 'https://houserobotics.online/seo-vs-ppc-which-is-better-for-your-business/',
    og_title: 'SEO vs PPC: Which Is Better for Your Business?',
    og_description: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    og_image: 'https://houserobotics.online/images/seo-vs-ppc-which-is-better-for-your-business.webp',
    twitter_title: 'SEO vs PPC: Which Is Better for Your Business?',
    twitter_description: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    twitter_image: 'https://houserobotics.online/images/seo-vs-ppc-which-is-better-for-your-business.webp'
  },
  {
    id: 'post-google-business-profile',
    title: 'How Google Business Profile Helps Local Businesses',
    slug: 'how-google-business-profile-helps-local-businesses',
    excerpt: 'How local service providers, clinics, and retailers leverage Google Business Profile to capture top Google Maps 3-Pack rankings, build instant trust, and drive high-intent inquiries.',
    content: '<h2>The Digital Storefront: What Is Google Business Profile?</h2><p>For any business serving customers within a specific geographical territory, your Google Business Profile (GBP)—formerly known as Google My Business—is your single most valuable digital marketing asset. It serves as your official verified storefront across Google Search, Google Maps, and Google Assistant, displaying your contact information, customer reviews, operational hours, services, and photos.</p><p>When prospective customers search for queries like <em>"commercial architect near me"</em> or <em>"emergency dental clinic Manchester"</em>, Google displays the prominent <strong>Local 3-Pack</strong>—a map module showcasing the top three local businesses above standard organic results. Appearing in this 3-Pack drives up to <strong>70% of all mobile phone calls and driving direction requests</strong>. Optimizing your profile through <a href="/local-seo">local SEO services</a> is the fastest way to turn local proximity into paying clients.</p><h3>Five Ways Google Business Profile Powers Local Growth</h3><ol><li><strong>1. Direct Inbound Phone Calls & Direction Inquiries:</strong> Mobile users can call or navigate in 1 click.</li><li><strong>2. Building Trust Through Customer Reviews:</strong> High ratings accelerate conversion through <a href="/online-reputation">online reputation management</a>.</li><li><strong>3. Visual Authority:</strong> High-resolution workplace and delivery photos generate 42% more direction requests.</li><li><strong>4. Google Posts for Offers:</strong> Direct announcements and promotions on your Knowledge Panel.</li><li><strong>5. Local Search Insights:</strong> Granular query attribution and peak engagement timing data.</li></ol><h3>Integrating Google Business Profile with Your Website SEO</h3><p>A high-ranking Google Business Profile must be anchored to an equally high-performing website. Ensure your profile links to a speed-optimized local landing page built with modern standards in <a href="/web-development">custom web development</a>, featuring embedded local schema markup and synchronized business hours.</p><p>Ready to dominate the Google 3-Pack across your regional territory? <a href="/contact">Contact House Robotics for a local SEO audit</a> and turn your Google Business Profile into a consistent inbound lead generator.</p>',
    featured_image: '/images/how-google-business-profile-helps-local-businesses.webp',
    featured_image_alt: 'Google Business Profile optimization and Google Maps local 3-pack marketing',
    featured_image_caption: 'Maximizing local search footprint and Google Maps 3-Pack calls with Google Business Profile.',
    author: 'Local SEO Division',
    author_role: 'Local Search Director',
    read_time: '7 min read',
    category_id: 'bcat001',
    status: 'PUBLISHED',
    featured: 0,
    published_at: '2026-02-28 10:00:00',
    seo_title: 'How Google Business Profile Helps Local Businesses | Guide',
    meta_description: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    focus_keyword: 'how Google Business Profile helps local businesses',
    canonical_url: 'https://houserobotics.online/how-google-business-profile-helps-local-businesses/',
    og_title: 'How Google Business Profile Helps Local Businesses | Guide',
    og_description: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    og_image: 'https://houserobotics.online/images/how-google-business-profile-helps-local-businesses.webp',
    twitter_title: 'How Google Business Profile Helps Local Businesses | Guide',
    twitter_description: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    twitter_image: 'https://houserobotics.online/images/how-google-business-profile-helps-local-businesses.webp'
  },
  {
    id: 'post-improve-google-rankings-2026',
    title: 'How to Improve Your Google Rankings in 2026',
    slug: 'how-to-improve-your-google-rankings-in-2026',
    excerpt: 'A tactical roadmap for dominating Google search in 2026: optimizing for AI Overviews, building entity authority graphs, mastering Core Web Vitals, and earning tier-1 digital PR citations.',
    content: '<h2>The 2026 Search Paradigm: What Has Changed?</h2><p>Search engine optimization has undergone its most profound evolution in decades. In 2026, Google is no longer just an index matching keywords on a page—it is a sophisticated neural answer engine powered by Gemini, AI Overviews, and multimodal retrieval systems.</p><p>Websites relying on outdated keyword stuffing, automated low-tier AI slop, or superficial 500-word articles have seen their visibility plummet. To rank in 2026, brands must demonstrate undeniable <strong>E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness)</strong>, solve complex user queries comprehensively, and maintain flawless technical performance. Here is our actionable, battle-tested playbook for improving your Google rankings in 2026 using <a href="/seo">modern SEO strategies</a>.</p><h3>Pillar 1: Optimizing for AI Overviews & Generative Engine Optimization (GEO)</h3><p>Google’s AI Overviews now synthesize conversational answers directly at the top of search result pages for a vast percentage of queries. Securing citations inside these AI answer panels requires information gain, original data, factual entity clarity, and topical cluster silos connecting to core <a href="/services">services</a>.</p><h3>Pillar 2: Technical SEO & Core Web Vitals in 2026</h3><p>Google has zero tolerance for slow, shifting websites. Sub-second response times (LCP < 1.2s), zero layout shift (CLS < 0.05), and instant responsiveness (INP < 150ms) are fundamental prerequisites delivered by our <a href="/web-development">custom web development</a> team.</p><h3>Pillar 3: Digital PR & Authoritative Entity Citations</h3><p>Traditional mass backlink schemes are dead. In 2026, link building is synonymous with Digital PR: earning citations from tier-1 national publications, respected industry journals, and verified educational institutions, complemented by intelligent lead routing via <a href="/ai-automation">AI automation</a>.</p><p>Ready to build a search strategy engineered for the 2026 environment? <a href="/contact">Schedule a free 30-minute growth audit with House Robotics</a> today.</p>',
    featured_image: '/images/how-to-improve-your-google-rankings-in-2026.webp',
    featured_image_alt: 'Guide to improving Google search rankings and AI search visibility in 2026',
    featured_image_caption: 'Optimizing for Google rankings in 2026: AI Overviews, entity authority, and Core Web Vitals.',
    author: 'House Robotics Strategy Team',
    author_role: 'Senior Search Architect',
    read_time: '9 min read',
    category_id: 'bcat001',
    status: 'PUBLISHED',
    featured: 1,
    published_at: '2026-02-25 10:00:00',
    seo_title: 'How to Improve Google Rankings in 2026 | Full Guide',
    meta_description: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    focus_keyword: 'how to improve your Google rankings in 2026',
    canonical_url: 'https://houserobotics.online/how-to-improve-your-google-rankings-in-2026/',
    og_title: 'How to Improve Google Rankings in 2026 | Full Guide',
    og_description: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    og_image: 'https://houserobotics.online/images/how-to-improve-your-google-rankings-in-2026.webp',
    twitter_title: 'How Improve Google Rankings in 2026 | Full Guide',
    twitter_description: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    twitter_image: 'https://houserobotics.online/images/how-to-improve-your-google-rankings-in-2026.webp'
  }
];

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

let sqlLines = [
  '-- =====================================================================',
  '-- HOUSE ROBOTICS — Restored Blog Posts & Articles Migration SQL',
  '-- Compatible with cPanel MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+',
  '-- =====================================================================',
  '',
  'SET FOREIGN_KEY_CHECKS = 0;',
  ''
];

articles.forEach(a => {
  sqlLines.push(
    `INSERT INTO \`blog_posts\` (\n` +
    `  \`id\`, \`title\`, \`slug\`, \`excerpt\`, \`content\`, \`featured_image\`, \`featured_image_alt\`, \`featured_image_caption\`,\n` +
    `  \`author\`, \`author_role\`, \`read_time\`, \`category_id\`, \`status\`, \`featured\`,\n` +
    `  \`published_at\`, \`seo_title\`, \`meta_description\`, \`focus_keyword\`, \`canonical_url\`,\n` +
    `  \`og_title\`, \`og_description\`, \`og_image\`, \`twitter_title\`, \`twitter_description\`, \`twitter_image\`,\n` +
    `  \`created_at\`, \`updated_at\`\n` +
    `) VALUES (\n` +
    `  ${escapeSql(a.id)}, ${escapeSql(a.title)}, ${escapeSql(a.slug)}, ${escapeSql(a.excerpt)}, ${escapeSql(a.content)},\n` +
    `  ${escapeSql(a.featured_image)}, ${escapeSql(a.featured_image_alt)}, ${escapeSql(a.featured_image_caption)},\n` +
    `  ${escapeSql(a.author)}, ${escapeSql(a.author_role)}, ${escapeSql(a.read_time)}, ${escapeSql(a.category_id)},\n` +
    `  ${escapeSql(a.status)}, ${a.featured}, ${escapeSql(a.published_at)},\n` +
    `  ${escapeSql(a.seo_title)}, ${escapeSql(a.meta_description)}, ${escapeSql(a.focus_keyword)}, ${escapeSql(a.canonical_url)},\n` +
    `  ${escapeSql(a.og_title)}, ${escapeSql(a.og_description)}, ${escapeSql(a.og_image)},\n` +
    `  ${escapeSql(a.twitter_title)}, ${escapeSql(a.twitter_description)}, ${escapeSql(a.twitter_image)},\n` +
    `  NOW(), NOW()\n` +
    `) ON DUPLICATE KEY UPDATE\n` +
    `  \`title\`=VALUES(\`title\`),\n` +
    `  \`excerpt\`=VALUES(\`excerpt\`),\n` +
    `  \`content\`=VALUES(\`content\`),\n` +
    `  \`featured_image\`=VALUES(\`featured_image\`),\n` +
    `  \`featured_image_alt\`=VALUES(\`featured_image_alt\`),\n` +
    `  \`featured_image_caption\`=VALUES(\`featured_image_caption\`),\n` +
    `  \`seo_title\`=VALUES(\`seo_title\`),\n` +
    `  \`meta_description\`=VALUES(\`meta_description\`),\n` +
    `  \`focus_keyword\`=VALUES(\`focus_keyword\`),\n` +
    `  \`canonical_url\`=VALUES(\`canonical_url\`),\n` +
    `  \`og_image\`=VALUES(\`og_image\`),\n` +
    `  \`twitter_image\`=VALUES(\`twitter_image\`);\n`
  );
});

sqlLines.push('SET FOREIGN_KEY_CHECKS = 1;');
sqlLines.push('');

const migrationSql = sqlLines.join('\n');
fs.writeFileSync(path.resolve(__dirname, '../database/restore_blogs.sql'), migrationSql, 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../restore_blogs.sql'), migrationSql, 'utf8');
console.log('Saved database/restore_blogs.sql & restore_blogs.sql');

// Also append to main database.sql
const mainDbPath = path.resolve(__dirname, '../database.sql');
let mainDb = fs.readFileSync(mainDbPath, 'utf8');
if (!mainDb.includes('how-much-does-seo-cost-in-the-uk')) {
  const insertMarker = "('post003', 'Why Page Speed Is the Ultimate Conversion Rate Multiplier'";
  const insertIdx = mainDb.indexOf(insertMarker);
  if (insertIdx !== -1) {
    const endOfPost003 = mainDb.indexOf('ON DUPLICATE KEY UPDATE', insertIdx);
    const endSemicolon = mainDb.indexOf(';', endOfPost003);
    const beforePart = mainDb.slice(0, endSemicolon + 1);
    const afterPart = mainDb.slice(endSemicolon + 1);
    const combined = beforePart + '\n\n-- Restored Old Blog Posts\n' + migrationSql.replace('SET FOREIGN_KEY_CHECKS = 0;\n', '').replace('SET FOREIGN_KEY_CHECKS = 1;\n', '') + afterPart;
    fs.writeFileSync(mainDbPath, combined, 'utf8');
    console.log('Updated database.sql with restored posts');
  }
}
