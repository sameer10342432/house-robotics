const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'cpanel_production');
const zipFile = path.join(rootDir, 'House-Robotics-cPanel-Production.zip');

console.log('--- Cleaning Staging Directory ---');
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy Frontend Build files from dist
console.log('Copying compiled frontend from dist...');
copyRecursive(path.join(rootDir, 'dist'), outDir);

// 2. Copy root .htaccess
console.log('Copying .htaccess...');
fs.copyFileSync(path.join(rootDir, '.htaccess'), path.join(outDir, '.htaccess'));

// 3. Copy sitemap.php & robots.php
fs.copyFileSync(path.join(rootDir, 'sitemap.php'), path.join(outDir, 'sitemap.php'));
fs.copyFileSync(path.join(rootDir, 'robots.php'), path.join(outDir, 'robots.php'));

// 4. Copy api/
console.log('Copying api/...');
copyRecursive(path.join(rootDir, 'api'), path.join(outDir, 'api'));

// 5. Copy config/
console.log('Copying config/...');
fs.mkdirSync(path.join(outDir, 'config'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'config', 'config.example.php'), path.join(outDir, 'config', 'config.example.php'));
fs.copyFileSync(path.join(rootDir, 'config', 'config.php'), path.join(outDir, 'config', 'config.php'));

// 6. Copy includes/
console.log('Copying includes/...');
copyRecursive(path.join(rootDir, 'includes'), path.join(outDir, 'includes'));

// 7. Copy database/
console.log('Copying database/...');
fs.mkdirSync(path.join(outDir, 'database'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'database', 'database.sql'), path.join(outDir, 'database', 'database.sql'));

// 8. Setup uploads/ with protection
console.log('Setting up uploads directory...');
fs.mkdirSync(path.join(outDir, 'uploads'), { recursive: true });
if (fs.existsSync(path.join(rootDir, 'public', 'uploads', '.htaccess'))) {
  fs.copyFileSync(path.join(rootDir, 'public', 'uploads', '.htaccess'), path.join(outDir, 'uploads', '.htaccess'));
}

// 9. Copy documentation
console.log('Copying deployment guides...');
fs.copyFileSync(path.join(rootDir, 'CPANEL-DEPLOYMENT.md'), path.join(outDir, 'CPANEL-DEPLOYMENT.md'));
if (fs.existsSync(path.join(rootDir, 'README.md'))) {
  fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(outDir, 'README.md'));
}

console.log('Staging structure assembled in cpanel_production successfully!');

// 10. Create House-Robotics-cPanel-Production.zip
console.log('Creating House-Robotics-cPanel-Production.zip...');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

// Compress cpanel_production contents directly into zip root
const psZipCmd = `powershell -Command "[System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null; [System.IO.Compression.ZipFile]::CreateFromDirectory('${outDir.replace(/\\/g, '\\\\')}', '${zipFile.replace(/\\/g, '\\\\')}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;

try {
  execSync(psZipCmd, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  console.log(`Successfully created ${zipFile} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
} catch (err) {
  console.error('Failed to create ZIP via PowerShell:', err.message);
  process.exit(1);
}
