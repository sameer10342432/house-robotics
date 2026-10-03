const fs = require('fs');
const path = require('path');

const seoPath = path.resolve(__dirname, '../src/utils/seo.ts');
let code = fs.readFileSync(seoPath, 'utf8');

if (code.includes('/how-much-does-seo-cost-in-the-uk')) {
  console.log('SEO config already present in src/utils/seo.ts');
  process.exit(0);
}

const entries = `  '/how-much-does-seo-cost-in-the-uk': {
    path: '/how-much-does-seo-cost-in-the-uk',
    name: 'How Much Does SEO Cost in the UK?',
    primaryKeyword: 'how much does SEO cost in the UK',
    secondaryKeywords: ['SEO pricing UK', 'SEO cost UK', 'SEO retainer cost', 'SEO agency pricing'],
    searchIntent: 'Informational',
    seoTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide', // 51 chars
    metaDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.', // 154 chars
    canonicalUrl: \`\${BASE_URL}/how-much-does-seo-cost-in-the-uk/\`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    ogDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    ogImage: \`\${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp\`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Much Does SEO Cost in the UK? 2026 Pricing Guide',
    twitterDescription: 'Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI.',
    twitterImage: \`\${BASE_URL}/images/how-much-does-seo-cost-in-the-uk.webp\`,
    h1: 'How Much Does SEO Cost in the UK? (2026 Pricing Guide)',
    breadcrumbs: [
      { name: 'Home', url: \`\${BASE_URL}/\` },
      { name: 'Blog', url: \`\${BASE_URL}/blog\` },
      { name: 'How Much Does SEO Cost in the UK?', url: \`\${BASE_URL}/how-much-does-seo-cost-in-the-uk/\` }
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
    canonicalUrl: \`\${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/\`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    ogDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    ogImage: \`\${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp\`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'What Is SEO & Why Does Your Business Need It? (Guide)',
    twitterDescription: 'Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue.',
    twitterImage: \`\${BASE_URL}/images/what-is-seo-and-why-does-your-business-need-it.webp\`,
    h1: 'What Is SEO and Why Does Your Business Need It?',
    breadcrumbs: [
      { name: 'Home', url: \`\${BASE_URL}/\` },
      { name: 'Blog', url: \`\${BASE_URL}/blog\` },
      { name: 'What Is SEO and Why Does Your Business Need It?', url: \`\${BASE_URL}/what-is-seo-and-why-does-your-business-need-it/\` }
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
    canonicalUrl: \`\${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/\`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    ogDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    ogImage: \`\${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp\`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'SEO vs PPC: Which Is Better for Your Business?',
    twitterDescription: 'SEO vs PPC comparison guide: discover differences in speed, cost, long-term ROI, and learn how to build a unified search strategy that maximizes revenue.',
    twitterImage: \`\${BASE_URL}/images/seo-vs-ppc-which-is-better-for-your-business.webp\`,
    h1: 'SEO vs PPC: Which Is Better for Your Business?',
    breadcrumbs: [
      { name: 'Home', url: \`\${BASE_URL}/\` },
      { name: 'Blog', url: \`\${BASE_URL}/blog\` },
      { name: 'SEO vs PPC', url: \`\${BASE_URL}/seo-vs-ppc-which-is-better-for-your-business/\` }
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
    canonicalUrl: \`\${BASE_URL}/how-google-business-profile-helps-local-businesses/\`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    ogDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    ogImage: \`\${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp\`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How Google Business Profile Helps Local Businesses | Guide',
    twitterDescription: 'Discover how Google Business Profile drives local visibility, Google Maps 3-Pack rankings, customer trust, and steady inbound phone calls for local businesses.',
    twitterImage: \`\${BASE_URL}/images/how-google-business-profile-helps-local-businesses.webp\`,
    h1: 'How Google Business Profile Helps Local Businesses',
    breadcrumbs: [
      { name: 'Home', url: \`\${BASE_URL}/\` },
      { name: 'Blog', url: \`\${BASE_URL}/blog\` },
      { name: 'Google Business Profile for Local Businesses', url: \`\${BASE_URL}/how-google-business-profile-helps-local-businesses/\` }
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
    canonicalUrl: \`\${BASE_URL}/how-to-improve-your-google-rankings-in-2026/\`,
    robots: 'index, follow',
    ogType: 'article',
    ogTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    ogDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    ogImage: \`\${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp\`,
    twitterCard: 'summary_large_image',
    twitterTitle: 'How to Improve Google Rankings in 2026 | Full Guide',
    twitterDescription: 'Actionable playbook on improving Google rankings in 2026. Master AI Overviews, semantic entity optimization, Core Web Vitals, and authoritative backlinks.',
    twitterImage: \`\${BASE_URL}/images/how-to-improve-your-google-rankings-in-2026.webp\`,
    h1: 'How to Improve Your Google Rankings in 2026: The Complete Guide',
    breadcrumbs: [
      { name: 'Home', url: \`\${BASE_URL}/\` },
      { name: 'Blog', url: \`\${BASE_URL}/blog\` },
      { name: 'Improve Google Rankings in 2026', url: \`\${BASE_URL}/how-to-improve-your-google-rankings-in-2026/\` }
    ]
  },
`;

const insertMarker = "  '/404': {";
const insertIdx = code.indexOf(insertMarker);
if (insertIdx === -1) {
  console.error("'/404': { not found in src/utils/seo.ts");
  process.exit(1);
}

code = code.slice(0, insertIdx) + entries + '\n' + code.slice(insertIdx);

// Also add to aliases
const aliasMarker = '    const aliases: Record<string, string> = {';
const aliasIdx = code.indexOf(aliasMarker);
if (aliasIdx !== -1) {
  const aliasEntries = `\n      '/blog/how-much-does-seo-cost-in-the-uk': '/how-much-does-seo-cost-in-the-uk',\n` +
    `      '/blog/what-is-seo-and-why-does-your-business-need-it': '/what-is-seo-and-why-does-your-business-need-it',\n` +
    `      '/blog/seo-vs-ppc-which-is-better-for-your-business': '/seo-vs-ppc-which-is-better-for-your-business',\n` +
    `      '/blog/how-google-business-profile-helps-local-businesses': '/how-google-business-profile-helps-local-businesses',\n` +
    `      '/blog/how-to-improve-your-google-rankings-in-2026': '/how-to-improve-your-google-rankings-in-2026',`;
  code = code.slice(0, aliasIdx + aliasMarker.length) + aliasEntries + code.slice(aliasIdx + aliasMarker.length);
}

fs.writeFileSync(seoPath, code, 'utf8');
console.log('Successfully updated src/utils/seo.ts with 5 restored articles and aliases');
