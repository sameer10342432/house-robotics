const https = require('https');
https.get('https://windows.php.net/download/', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const regex = /href="\/downloads\/releases\/(php-8\.[23]\.[0-9]+-Win32-vs16-x64\.zip)"/g;
    let m;
    while ((m = regex.exec(data)) !== null) {
      console.log('Found:', m[1]);
    }
    const regex2 = /href="\/downloads\/releases\/(php-8\.[23]\.[0-9]+-nts-Win32-vs16-x64\.zip)"/g;
    while ((m = regex2.exec(data)) !== null) {
      console.log('Found NTS:', m[1]);
    }
  });
});
