const fs = require('fs');
const path = require('path');

function searchFolder(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        searchFolder(fullPath);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const imgTags = content.match(/<img[^>]*>/gi) || [];
      const imgFallbacks = content.match(/<ImageWithFallback[^>]*>/gi) || [];
      if (imgTags.length > 0 || imgFallbacks.length > 0) {
        console.log(`\nFile: ${path.relative(process.cwd(), fullPath)}`);
        imgTags.forEach(t => console.log('  img:', t.replace(/\s+/g, ' ').substring(0, 120)));
        imgFallbacks.forEach(t => console.log('  fallback:', t.replace(/\s+/g, ' ').substring(0, 120)));
      }
    }
  }
}

console.log('SEARCHING FOR ALL IMAGES IN src:');
searchFolder(path.join(__dirname, '..', 'src'));
