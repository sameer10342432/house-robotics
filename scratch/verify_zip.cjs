const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const zipPath = path.resolve('House-Robotics-cPanel-Production.zip');
if (!fs.existsSync(zipPath)) {
  console.error("ZIP does not exist!");
  process.exit(1);
}

const stats = fs.statSync(zipPath);
console.log(`ZIP Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

// Use PowerShell to list files
const psCmd = `powershell -Command "[System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null; [System.IO.Compression.ZipFile]::OpenRead('${zipPath.replace(/\\/g, '\\\\')}').Entries.FullName"`;
try {
  const output = execSync(psCmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  const files = output.split(/\r?\n/).map(f => f.trim()).filter(Boolean);
  console.log(`Total files in zip: ${files.length}`);
  console.log("Has index.html:", files.includes('index.html'));
  console.log("Has .htaccess:", files.includes('.htaccess'));
  console.log("Has uploads/.htaccess:", files.some(f => f.includes('uploads/.htaccess') || f.includes('uploads\\.htaccess')));
  console.log("Has api/index.php:", files.some(f => f.includes('api/index.php') || f.includes('api\\index.php')));
  console.log("Has database/database.sql:", files.some(f => f.includes('database.sql')));
  console.log("Has config/config.php:", files.some(f => f.includes('config.php')));
  console.log("Has CPANEL-DEPLOYMENT.md:", files.includes('CPANEL-DEPLOYMENT.md'));
  console.log("Has README.md:", files.includes('README.md'));
  console.log("Has node_modules:", files.some(f => f.includes('node_modules')));
  console.log("Has .git:", files.some(f => f.includes('.git')));
  console.log("Sample files:", files.slice(0, 15));
} catch (e) {
  console.error("Error inspecting zip:", e.message);
}
