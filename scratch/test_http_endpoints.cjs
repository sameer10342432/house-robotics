const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:8080${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    }).on('error', reject);
  });
}

function post(path, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8080,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log("=== Testing HTTP Endpoints on PHP server (Port 8080) ===");
  
  // 1. Health
  const health = await get('/api/health');
  console.log("1. /api/health -> Status:", health.status, JSON.parse(health.data).database === 'connected' ? 'PASS' : 'FAIL');

  // 2. Services
  const services = await get('/api/services');
  const servicesJson = JSON.parse(services.data);
  console.log("2. /api/services -> Status:", services.status, "Count:", servicesJson.data.length, servicesJson.data.length >= 21 ? 'PASS' : 'FAIL');

  // 3. Blog
  const blog = await get('/api/blog');
  const blogJson = JSON.parse(blog.data);
  const postsCount = Array.isArray(blogJson.data) ? blogJson.data.length : (blogJson.data?.posts?.length || 0);
  console.log("3. /api/blog -> Status:", blog.status, "Posts:", postsCount, postsCount > 0 ? 'PASS' : 'FAIL');

  // 4. Testimonials & FAQs
  const testimonials = await get('/api/testimonials');
  console.log("4. /api/testimonials -> Status:", testimonials.status, JSON.parse(testimonials.data).data.length > 0 ? 'PASS' : 'FAIL');
  
  const faqs = await get('/api/faqs');
  console.log("5. /api/faqs -> Status:", faqs.status, JSON.parse(faqs.data).data.length > 0 ? 'PASS' : 'FAIL');

  // 6. Contact Submission
  const contactRes = await post('/api/contact', {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@growthco.io',
    phone: '+1 555-0199',
    company: 'GrowthCo Brands',
    service: 'seo',
    budget: '$5,000 - $10,000',
    message: 'We need full SEO and PPC scaling for Q4.'
  });
  const contactJson = JSON.parse(contactRes.data);
  console.log("6. /api/contact -> Status:", contactRes.status, "Inquiry ID:", contactJson.data?.inquiry_id, contactJson.success ? 'PASS' : 'FAIL');

  // 7. Newsletter Subscribe
  const subRes = await post('/api/newsletter/subscribe', { email: 'http_test_user@example.com' });
  const subJson = JSON.parse(subRes.data);
  console.log("7. /api/newsletter/subscribe -> Status:", subRes.status, subJson.success ? 'PASS' : 'FAIL');

  // 8. Admin Login
  const loginRes = await post('/api/admin/auth/login', {
    email: 'sameerliaqat81@gmail.com',
    password: 'Y&VO{(w0J3A6}'
  });
  const loginJson = JSON.parse(loginRes.data);
  console.log("8. /api/admin/auth/login -> Status:", loginRes.status, "User:", loginJson.data?.user?.email, loginJson.success ? 'PASS' : 'FAIL');

  // 9. Static assets & Index
  const index = await get('/');
  console.log("9. / (index.html) -> Status:", index.status, index.data.includes('House Robotics') ? 'PASS' : 'FAIL');

  const sitemap = await get('/sitemap.xml');
  console.log("10. /sitemap.xml -> Status:", sitemap.status, sitemap.data.includes('<?xml') ? 'PASS' : 'FAIL');

  const robots = await get('/robots.txt');
  console.log("11. /robots.txt -> Status:", robots.status, robots.data.includes('User-agent') ? 'PASS' : 'FAIL');

  console.log("=== All HTTP endpoint tests executed! ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
