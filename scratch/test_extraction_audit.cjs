const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const zipFile = path.join(rootDir, 'House-Robotics-Production-Final.zip');
const tempExtractDir = path.join(rootDir, 'scratch', 'temp_zip_verify');

console.log('=====================================================');
console.log('PHASE 37: FINAL PRODUCTION ZIP EXTRACTION AUDIT');
console.log('=====================================================\n');

if (!fs.existsSync(zipFile)) {
  console.error('[FAIL] ZIP file does not exist:', zipFile);
  process.exit(1);
}

// Clean and recreate temp extraction directory
if (fs.existsSync(tempExtractDir)) {
  fs.rmSync(tempExtractDir, { recursive: true, force: true });
}
fs.mkdirSync(tempExtractDir, { recursive: true });

console.log('Extracting ZIP into temporary test directory...');
const psExtractCmd = `powershell -Command "[System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null; [System.IO.Compression.ZipFile]::ExtractToDirectory('${zipFile.replace(/\\/g, '\\\\')}', '${tempExtractDir.replace(/\\/g, '\\\\')}')"`;
execSync(psExtractCmd, { stdio: 'inherit' });
console.log('Extraction complete.\n');

let passCount = 0;
let failCount = 0;

function check(name, condition, details = '') {
  if (condition) {
    console.log(` [PASS] ${name}`);
    passCount++;
  } else {
    console.error(` [FAIL] ${name} - ${details}`);
    failCount++;
  }
}

// 1. Check critical root files
check('index.html exists at root', fs.existsSync(path.join(tempExtractDir, 'index.html')));
check('.htaccess exists at root', fs.existsSync(path.join(tempExtractDir, '.htaccess')));
check('database.sql exists at root', fs.existsSync(path.join(tempExtractDir, 'database.sql')));
check('README-CPANEL.md exists at root', fs.existsSync(path.join(tempExtractDir, 'README-CPANEL.md')));
check('sitemap.xml exists at root', fs.existsSync(path.join(tempExtractDir, 'sitemap.xml')));
check('sitemap.php exists at root', fs.existsSync(path.join(tempExtractDir, 'sitemap.php')));
check('robots.txt exists at root', fs.existsSync(path.join(tempExtractDir, 'robots.txt')));
check('robots.php exists at root', fs.existsSync(path.join(tempExtractDir, 'robots.php')));

// 2. Check directories
check('assets/ directory exists', fs.existsSync(path.join(tempExtractDir, 'assets')));
check('api/ directory exists', fs.existsSync(path.join(tempExtractDir, 'api')));
check('api/index.php exists', fs.existsSync(path.join(tempExtractDir, 'api', 'index.php')));
check('api/.htaccess exists', fs.existsSync(path.join(tempExtractDir, 'api', '.htaccess')));
check('config/ directory exists', fs.existsSync(path.join(tempExtractDir, 'config')));
check('config/config.php exists', fs.existsSync(path.join(tempExtractDir, 'config', 'config.php')));
check('includes/ directory exists', fs.existsSync(path.join(tempExtractDir, 'includes')));
check('includes/Database.php exists', fs.existsSync(path.join(tempExtractDir, 'includes', 'Database.php')));
check('uploads/ directory exists', fs.existsSync(path.join(tempExtractDir, 'uploads')));
check('uploads/.htaccess exists', fs.existsSync(path.join(tempExtractDir, 'uploads', '.htaccess')));

// 3. Check that development artifacts are NOT present
check('NO node_modules in package', !fs.existsSync(path.join(tempExtractDir, 'node_modules')));
check('NO .git in package', !fs.existsSync(path.join(tempExtractDir, '.git')));
check('NO .env in package', !fs.existsSync(path.join(tempExtractDir, '.env')));
check('NO sqlite database files in package', !fs.existsSync(path.join(tempExtractDir, 'dev.sqlite')) && !fs.existsSync(path.join(tempExtractDir, 'database', 'dev.sqlite')));
check('NO nested dist/ folder', !fs.existsSync(path.join(tempExtractDir, 'dist')));

// 4. Verify index.html content
const indexHtml = fs.readFileSync(path.join(tempExtractDir, 'index.html'), 'utf-8');
check('index.html contains root mount div', indexHtml.includes('<div id="root"></div>'));
check('index.html uses absolute asset paths (/assets/)', indexHtml.includes('/assets/index-') && !indexHtml.includes('./assets/index-'));

// 5. Verify .htaccess rules
const htaccess = fs.readFileSync(path.join(tempExtractDir, '.htaccess'), 'utf-8');
check('.htaccess excludes /api from SPA rewrite', htaccess.includes('!^/api'));
check('.htaccess routes api to api/index.php', htaccess.includes('RewriteRule ^api/(.*)$ api/index.php'));
check('.htaccess excludes /uploads from SPA rewrite', htaccess.includes('!^/uploads'));

// 6. Verify api/.htaccess
const apiHtaccess = fs.readFileSync(path.join(tempExtractDir, 'api', '.htaccess'), 'utf-8');
check('api/.htaccess has rewrite rules', apiHtaccess.includes('RewriteRule ^(.*)$ index.php'));

// 7. Verify uploads/.htaccess blocks php execution
const uploadsHtaccess = fs.readFileSync(path.join(tempExtractDir, 'uploads', '.htaccess'), 'utf-8');
check('uploads/.htaccess forbids php execution', uploadsHtaccess.includes('FilesMatch') && uploadsHtaccess.includes('Deny from all'));

// 8. Verify database.sql has all tables
const dbSql = fs.readFileSync(path.join(tempExtractDir, 'database.sql'), 'utf-8');
const tables = [
  'admin_users', 'services', 'service_features', 'service_benefits',
  'service_process_steps', 'service_faqs', 'blog_categories', 'blog_tags',
  'blog_posts', 'blog_post_tags', 'blog_revisions', 'authors',
  'testimonials', 'faqs', 'contact_messages', 'leads',
  'lead_notes', 'newsletter_subscribers', 'seo_metadata', 'site_settings',
  'media', 'analytics_events', 'activity_logs', 'password_resets'
];
let allTablesFound = true;
for (const tbl of tables) {
  if (!dbSql.includes(`\`${tbl}\``)) {
    allTablesFound = false;
    console.error(`Missing table in database.sql: ${tbl}`);
  }
}
check('database.sql contains all 24 production tables', allTablesFound);

console.log('\n-----------------------------------------------------');
console.log(`EXTRACTION AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('-----------------------------------------------------\n');

// Clean up temporary test extraction directory
fs.rmSync(tempExtractDir, { recursive: true, force: true });

if (failCount > 0) {
  process.exit(1);
}
