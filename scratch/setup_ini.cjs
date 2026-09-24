const fs = require('fs');
const dir = 'C:/Users/sameer/AppData/Local/Microsoft/WinGet/Packages/PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe';
let ini = fs.readFileSync(dir + '/php.ini-development', 'utf8');
ini = ini.replace(';extension_dir = "ext"', 'extension_dir = "ext"');
const exts = ['curl', 'fileinfo', 'gd', 'mbstring', 'mysqli', 'openssl', 'pdo_mysql', 'pdo_sqlite'];
for (const ext of exts) {
  ini = ini.replace(';extension=' + ext, 'extension=' + ext);
}
fs.writeFileSync(dir + '/php.ini', ini);
console.log('php.ini created successfully!');
