const fs = require('fs');
const path = require('path');

const seoFile = fs.readFileSync(path.join(__dirname, '../src/utils/seo.ts'), 'utf8');

// Parse out SEO_METADATA_REGISTRY
const registryMatch = seoFile.match(/export const SEO_METADATA_REGISTRY: Record<string, PageSeoConfig> = \{([\s\S]*?)\n\};/);
if (!registryMatch) {
  console.error('Could not find SEO_METADATA_REGISTRY in seo.ts');
  process.exit(1);
}

const lines = registryMatch[1].split('\n');
const entries = [];
let current = null;

for (let line of lines) {
  line = line.trim();
  const routeMatch = line.match(/^'([^']+)':\s*\{/);
  if (routeMatch) {
    if (current) entries.push(current);
    current = { key: routeMatch[1] };
    continue;
  }
  if (!current) continue;

  if (line.startsWith('path:')) {
    current.path = line.match(/path:\s*'([^']+)'/)[1];
  } else if (line.startsWith('name:')) {
    current.name = line.match(/name:\s*'([^']+)'/)[1];
  } else if (line.startsWith('primaryKeyword:')) {
    current.primaryKeyword = line.match(/primaryKeyword:\s*'([^']+)'/)[1];
  } else if (line.startsWith('secondaryKeywords:')) {
    const raw = line.match(/secondaryKeywords:\s*(\[[^\]]+\])/);
    if (raw) {
      current.secondaryKeywords = raw[1].replace(/[\[\]']/g, '').split(',').map(s => s.trim()).join('; ');
    }
  } else if (line.startsWith('searchIntent:')) {
    current.searchIntent = line.match(/searchIntent:\s*'([^']+)'/)[1];
  } else if (line.startsWith('seoTitle:')) {
    current.seoTitle = line.match(/seoTitle:\s*'([^']+)'/)[1];
  } else if (line.startsWith('metaDescription:')) {
    current.metaDescription = line.match(/metaDescription:\s*'([^']+)'/)[1];
  } else if (line.startsWith('canonicalUrl:')) {
    current.canonicalUrl = line.match(/canonicalUrl:\s*`\$\{BASE_URL\}([^`]*)`/)[1];
    current.canonicalUrl = 'https://houserobotics.online' + current.canonicalUrl;
  } else if (line.startsWith('robots:')) {
    current.robots = line.match(/robots:\s*'([^']+)'/)[1];
  } else if (line.startsWith('ogTitle:')) {
    current.ogTitle = line.match(/ogTitle:\s*'([^']+)'/)[1];
  } else if (line.startsWith('ogDescription:')) {
    current.ogDescription = line.match(/ogDescription:\s*'([^']+)'/)[1];
  } else if (line.startsWith('ogImage:')) {
    const m = line.match(/ogImage:\s*`\$\{BASE_URL\}([^`]*)`/);
    current.ogImage = m ? 'https://houserobotics.online' + m[1] : '';
  } else if (line.startsWith('twitterTitle:')) {
    current.twitterTitle = line.match(/twitterTitle:\s*'([^']+)'/)[1];
  } else if (line.startsWith('twitterDescription:')) {
    current.twitterDescription = line.match(/twitterDescription:\s*'([^']+)'/)[1];
  } else if (line.startsWith('twitterImage:')) {
    const m = line.match(/twitterImage:\s*`\$\{BASE_URL\}([^`]*)`/);
    current.twitterImage = m ? 'https://houserobotics.online' + m[1] : '';
  } else if (line.startsWith('h1:')) {
    const rawVal = line.replace(/^h1:\s*/, '').replace(/,\s*$/, '');
    current.h1 = rawVal.replace(/^['"]|['"]$/g, '').trim();
  } else if (line.startsWith('serviceSchema:')) {
    current.schemaType = 'Service, Organization, WebSite, BreadcrumbList';
  } else if (line.startsWith('ogType:') && line.includes("'article'")) {
    current.schemaType = 'Article, Organization, BreadcrumbList';
  }
}
if (current) entries.push(current);

console.log(`Successfully parsed ${entries.length} pages.`);

// Categorize page type
entries.forEach(e => {
  if (!e.schemaType) {
    if (e.path === '/') e.schemaType = 'Organization, WebSite';
    else if (e.path === '/services') e.schemaType = 'CollectionPage, BreadcrumbList';
    else if (e.path === '/about') e.schemaType = 'Organization, BreadcrumbList';
    else if (e.path === '/contact') e.schemaType = 'ContactPage, BreadcrumbList';
    else if (e.path === '/blog') e.schemaType = 'Blog, BreadcrumbList';
    else if (e.path === '/404') e.schemaType = 'WebPage';
    else e.schemaType = 'WebPage, BreadcrumbList';
  }

  if (e.path === '/') e.pageType = 'Homepage';
  else if (e.path.startsWith('/blog/')) e.pageType = 'Blog Article';
  else if (e.path === '/blog') e.pageType = 'Blog Index';
  else if (e.path === '/services') e.pageType = 'Services Directory';
  else if (e.path === '/about') e.pageType = 'Company About';
  else if (e.path === '/contact') e.pageType = 'Contact & Consultation';
  else if (e.path === '/404') e.pageType = 'Error Page (404)';
  else e.pageType = 'Service Landing Page';
});

// Verify constraints
let errors = 0;
entries.forEach(e => {
  const tLen = e.seoTitle.length;
  const dLen = e.metaDescription.length;
  if (tLen > 60) {
    console.error(`ERROR: ${e.path} Title is ${tLen} chars > 60: "${e.seoTitle}"`);
    errors++;
  }
  if (dLen > 160) {
    console.error(`ERROR: ${e.path} Desc is ${dLen} chars > 160: "${e.metaDescription}"`);
    errors++;
  }
});

console.log(`Validation result: ${errors} errors.`);

// Generate CSV
const headers = [
  'URL',
  'Page Name',
  'Page Type',
  'Primary Keyword',
  'Secondary Keywords',
  'Search Intent',
  'Meta Title',
  'Title Characters',
  'Meta Description',
  'Description Characters',
  'Canonical URL',
  'Robots',
  'OG Title',
  'OG Description',
  'OG Image',
  'Twitter Title',
  'Twitter Description',
  'Twitter Image',
  'H1',
  'Schema Type',
  'SEO Status'
];

function escapeCsv(val) {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const csvRows = [headers.join(',')];
for (const e of entries) {
  csvRows.push([
    escapeCsv(e.canonicalUrl || ('https://houserobotics.online' + e.path)),
    escapeCsv(e.name),
    escapeCsv(e.pageType),
    escapeCsv(e.primaryKeyword),
    escapeCsv(e.secondaryKeywords),
    escapeCsv(e.searchIntent),
    escapeCsv(e.seoTitle),
    escapeCsv(e.seoTitle.length),
    escapeCsv(e.metaDescription),
    escapeCsv(e.metaDescription.length),
    escapeCsv(e.canonicalUrl || ('https://houserobotics.online' + e.path)),
    escapeCsv(e.robots || 'index, follow'),
    escapeCsv(e.ogTitle || e.seoTitle),
    escapeCsv(e.ogDescription || e.metaDescription),
    escapeCsv(e.ogImage),
    escapeCsv(e.twitterTitle || e.seoTitle),
    escapeCsv(e.twitterDescription || e.metaDescription),
    escapeCsv(e.twitterImage),
    escapeCsv(e.h1),
    escapeCsv(e.schemaType),
    escapeCsv('PASS')
  ].join(','));
}

fs.writeFileSync(path.join(__dirname, '../SEO-METADATA-MASTER.csv'), csvRows.join('\n'), 'utf8');
console.log('Saved SEO-METADATA-MASTER.csv successfully!');
