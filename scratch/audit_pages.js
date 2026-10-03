const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

console.log('AUDITING PAGES IN src/pages:');
files.forEach(f => {
  const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  const h1Matches = content.match(/<h1[\s\S]*?<\/h1>|<motion\.h1[\s\S]*?<\/motion\.h1>/gi) || [];
  const h2Matches = content.match(/<h2[\s\S]*?<\/h2>|<motion\.h2[\s\S]*?<\/motion\.h2>/gi) || [];
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
  const h1Text = h1Matches.map(h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  console.log(`\nPage: ${f}`);
  console.log(`  H1 count: ${h1Matches.length} -> ${JSON.stringify(h1Text)}`);
  console.log(`  H2 count: ${h2Matches.length}`);
  console.log(`  Img count: ${imgMatches.length}, without alt: ${imgsWithoutAlt.length}`);
});
