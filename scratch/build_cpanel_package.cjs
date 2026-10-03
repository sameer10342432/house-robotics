const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'cpanel_production');
const zipFile = path.join(rootDir, 'House-Robotics-Production-Final.zip');

console.log('--- Cleaning Staging Directory ---');
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyRecursive(src, dest, filterFn = null) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      if (filterFn && !filterFn(item, path.join(src, item))) continue;
      copyRecursive(path.join(src, item), path.join(dest, item), filterFn);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const ignorePatterns = [
  '.git',
  'node_modules',
  '.env',
  '.sqlite',
  '.log',
  'dev.sqlite',
  'dev.db',
  '.DS_Store',
  'Thumbs.db'
];

function shouldInclude(name, fullPath) {
  for (const pat of ignorePatterns) {
    if (name === pat || name.endsWith(pat)) return false;
  }
  return true;
}

// 1. Copy Frontend Build files from dist
console.log('Copying compiled frontend from dist/ ...');
copyRecursive(path.join(rootDir, 'dist'), outDir, shouldInclude);

// 2. Copy root .htaccess
console.log('Copying hardened production .htaccess ...');
fs.copyFileSync(path.join(rootDir, '.htaccess'), path.join(outDir, '.htaccess'));

// 3. Copy sitemap.php & robots.php
console.log('Copying sitemap.php and robots.php ...');
fs.copyFileSync(path.join(rootDir, 'sitemap.php'), path.join(outDir, 'sitemap.php'));
fs.copyFileSync(path.join(rootDir, 'robots.php'), path.join(outDir, 'robots.php'));

// 4. Copy api/ (with api/.htaccess)
console.log('Copying api/ with dedicated .htaccess ...');
copyRecursive(path.join(rootDir, 'api'), path.join(outDir, 'api'), shouldInclude);

// 5. Copy config/
console.log('Copying config/ ...');
fs.mkdirSync(path.join(outDir, 'config'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'config', 'config.example.php'), path.join(outDir, 'config', 'config.example.php'));
fs.copyFileSync(path.join(rootDir, 'config', 'config.php'), path.join(outDir, 'config', 'config.php'));

// 6. Copy includes/
console.log('Copying includes/ ...');
copyRecursive(path.join(rootDir, 'includes'), path.join(outDir, 'includes'), shouldInclude);

// 7. Copy database/ and database.sql
console.log('Copying database.sql ...');
fs.mkdirSync(path.join(outDir, 'database'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'database', 'database.sql'), path.join(outDir, 'database', 'database.sql'));
fs.copyFileSync(path.join(rootDir, 'database.sql'), path.join(outDir, 'database.sql'));

// 8. Setup uploads/ with protection
console.log('Setting up uploads/ with execution protection .htaccess ...');
fs.mkdirSync(path.join(outDir, 'uploads'), { recursive: true });
if (fs.existsSync(path.join(rootDir, 'uploads', '.htaccess'))) {
  fs.copyFileSync(path.join(rootDir, 'uploads', '.htaccess'), path.join(outDir, 'uploads', '.htaccess'));
}

// 9. Copy documentation
console.log('Copying deployment guides ...');
fs.copyFileSync(path.join(rootDir, 'README-CPANEL.md'), path.join(outDir, 'README-CPANEL.md'));
if (fs.existsSync(path.join(rootDir, 'README.md'))) {
  fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(outDir, 'README.md'));
}

console.log('Staging structure assembled in cpanel_production successfully!');

// 10. Create House-Robotics-Production-Final.zip
console.log('Creating House-Robotics-Production-Final.zip ...');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

// Compress cpanel_production contents directly into zip root
const psZipCmd = `powershell -Command "[System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null; [System.IO.Compression.ZipFile]::CreateFromDirectory('${outDir.replace(/\\/g, '\\\\')}', '${zipFile.replace(/\\/g, '\\\\')}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;

try {
  execSync(psZipCmd, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  console.log(`\n======================================================`);
  console.log(`SUCCESS: Created ${zipFile}`);
  console.log(`Package Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`======================================================\n`);
} catch (err) {
  console.error('Failed to create ZIP via PowerShell:', err.message);
  process.exit(1);
}
