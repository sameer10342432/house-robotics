const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const stagingDir = path.resolve(rootDir, 'cpanel_staging');
const verifyDir = path.resolve(rootDir, 'cpanel_verify');
const zipFile = path.resolve(rootDir, 'House-Robotics-Blog-Restoration-Final.zip');

console.log('=== STEP 1: Clean Staging and Verify Directories ===');
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
if (fs.existsSync(verifyDir)) {
  fs.rmSync(verifyDir, { recursive: true, force: true });
}
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}
fs.mkdirSync(stagingDir, { recursive: true });

console.log('=== STEP 2: Copy Frontend dist/ into staging ===');
const distDir = path.resolve(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  throw new Error('dist/ directory does not exist! Please build first.');
}

function copyRecursiveSync(src, dest, ignore = []) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      if (ignore.includes(childItemName)) return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), ignore);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(distDir, stagingDir, ['.git']);

console.log('=== STEP 3: Copy Backend Infrastructure ===');
// Copy api/
copyRecursiveSync(path.resolve(rootDir, 'api'), path.resolve(stagingDir, 'api'), ['.git', 'scratch']);
// Copy includes/
copyRecursiveSync(path.resolve(rootDir, 'includes'), path.resolve(stagingDir, 'includes'), ['.git']);
// Copy config/
copyRecursiveSync(path.resolve(rootDir, 'config'), path.resolve(stagingDir, 'config'), ['.git', 'config.local.php']);
// Copy database folder (database.sql, restore_blogs.sql only)
const stagingDbDir = path.resolve(stagingDir, 'database');
fs.mkdirSync(stagingDbDir, { recursive: true });
fs.copyFileSync(path.resolve(rootDir, 'database.sql'), path.join(stagingDbDir, 'database.sql'));
fs.copyFileSync(path.resolve(rootDir, 'database/restore_blogs.sql'), path.join(stagingDbDir, 'restore_blogs.sql'));

// Copy root SQL files for convenience
fs.copyFileSync(path.resolve(rootDir, 'database.sql'), path.resolve(stagingDir, 'database.sql'));
fs.copyFileSync(path.resolve(rootDir, 'database/restore_blogs.sql'), path.resolve(stagingDir, 'restore_blogs.sql'));

// Copy sitemap.php and robots.php
fs.copyFileSync(path.resolve(rootDir, 'sitemap.php'), path.resolve(stagingDir, 'sitemap.php'));
fs.copyFileSync(path.resolve(rootDir, 'robots.php'), path.resolve(stagingDir, 'robots.php'));

// Ensure uploads/ contains all 5 WebP images and .htaccess
const stagingUploadsDir = path.resolve(stagingDir, 'uploads');
fs.mkdirSync(stagingUploadsDir, { recursive: true });
copyRecursiveSync(path.resolve(rootDir, 'uploads'), stagingUploadsDir, ['.git']);

// Ensure images/ contains all 5 WebP images
const stagingImagesDir = path.resolve(stagingDir, 'images');
fs.mkdirSync(stagingImagesDir, { recursive: true });
const restoredImages = [
  'how-much-does-seo-cost-in-the-uk.webp',
  'what-is-seo-and-why-does-your-business-need-it.webp',
  'seo-vs-ppc-which-is-better-for-your-business.webp',
  'how-google-business-profile-helps-local-businesses.webp',
  'how-to-improve-your-google-rankings-in-2026.webp'
];

restoredImages.forEach(img => {
  const srcImg = path.resolve(rootDir, 'public/images', img);
  if (fs.existsSync(srcImg)) {
    fs.copyFileSync(srcImg, path.resolve(stagingImagesDir, img));
    fs.copyFileSync(srcImg, path.resolve(stagingUploadsDir, img));
  }
});

// Ensure .htaccess in root is up-to-date from dist/.htaccess
fs.copyFileSync(path.resolve(distDir, '.htaccess'), path.resolve(stagingDir, '.htaccess'));

console.log('=== STEP 4: Sanitize Staging ===');
// Remove any forbidden or development artifacts
const forbiddenPatterns = ['.git', '.env', '.env.local', 'dev.sqlite', 'node_modules', 'scratch'];
function sanitize(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (forbiddenPatterns.includes(item)) {
      console.log(`Removing forbidden item: ${fullPath}`);
      fs.rmSync(fullPath, { recursive: true, force: true });
      continue;
    }
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      sanitize(fullPath);
    }
  }
}
sanitize(stagingDir);

console.log('=== STEP 5: Create Production ZIP ===');
// Use PowerShell .NET ZipFile to create clean zip archive
const psCommand = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${stagingDir}', '${zipFile}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;
console.log('Executing PowerShell Zip command...');
execSync(psCommand, { stdio: 'inherit' });

const zipStats = fs.statSync(zipFile);
console.log(`ZIP created successfully: ${zipFile} (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);

console.log('=== STEP 6: Verify ZIP Archive ===');
fs.mkdirSync(verifyDir, { recursive: true });
const psExtract = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${zipFile}', '${verifyDir}')"`;
execSync(psExtract, { stdio: 'inherit' });

console.log('Verifying extracted contents:');
const requiredFiles = [
  'index.html',
  '.htaccess',
  'sitemap.xml',
  'sitemap.php',
  'robots.txt',
  'robots.php',
  'database.sql',
  'restore_blogs.sql',
  'uploads/.htaccess',
  'api/.htaccess',
  'api/index.php',
  'includes/Database.php',
  'includes/Auth.php',
  'includes/Upload.php',
  'config/config.php'
];

let allPassed = true;
requiredFiles.forEach(file => {
  const p = path.resolve(verifyDir, file);
  if (fs.existsSync(p)) {
    console.log(` [PASS] Found ${file}`);
  } else {
    console.error(` [FAIL] MISSING ${file}`);
    allPassed = false;
  }
});

restoredImages.forEach(img => {
  const pImg = path.resolve(verifyDir, 'images', img);
  const pUpload = path.resolve(verifyDir, 'uploads', img);
  if (fs.existsSync(pImg)) {
    console.log(` [PASS] Found images/${img}`);
  } else {
    console.error(` [FAIL] MISSING images/${img}`);
    allPassed = false;
  }
  if (fs.existsSync(pUpload)) {
    console.log(` [PASS] Found uploads/${img}`);
  } else {
    console.error(` [FAIL] MISSING uploads/${img}`);
    allPassed = false;
  }
});

// Check for any forbidden files in extracted
function checkForbidden(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (forbiddenPatterns.includes(item)) {
      console.error(` [FAIL] Found forbidden item in ZIP: ${fullPath}`);
      allPassed = false;
    }
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkForbidden(fullPath);
    }
  }
}
checkForbidden(verifyDir);

if (allPassed) {
  console.log('\n>>> ALL PACKAGE VERIFICATION CHECKS PASSED! <<<');
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
