const http = require('http');

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run() {
  console.log("=================================================");
  console.log("HOUSE ROBOTICS — FULL PRODUCTION API TEST SUITE");
  console.log("Testing on PHP 8.3 Server: http://127.0.0.1:8080");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Health
  const r1 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/health', method: 'GET' });
  const d1 = JSON.parse(r1.data);
  assert(r1.statusCode === 200 && d1.database === 'connected', `Health check (DB: ${d1.database}, PHP: ${d1.php})`);

  // 2. Services List
  const r2 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/services', method: 'GET' });
  const d2 = JSON.parse(r2.data);
  assert(r2.statusCode === 200 && d2.data.length >= 21, `Public Services API (${d2.data.length} services loaded)`);

  // 3. Service Detail
  const r3 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/services/seo', method: 'GET' });
  const d3 = JSON.parse(r3.data);
  assert(r3.statusCode === 200 && d3.data.slug === 'seo' && d3.data.features.length > 0, `Service Detail API for '/seo' (${d3.data.features.length} features, ${d3.data.benefits.length} benefits)`);

  // 4. Blog Posts
  const r4 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/blog', method: 'GET' });
  const d4 = JSON.parse(r4.data);
  assert(r4.statusCode === 200 && d4.data.length > 0, `Public Blog Posts API (${d4.data.length} posts retrieved)`);

  // 5. Blog Categories
  const r5 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/blog/categories', method: 'GET' });
  const d5 = JSON.parse(r5.data);
  assert(r5.statusCode === 200 && d5.data.length >= 5, `Blog Categories API (${d5.data.length} categories loaded)`);

  // 6. Testimonials
  const r6 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/testimonials', method: 'GET' });
  const d6 = JSON.parse(r6.data);
  assert(r6.statusCode === 200 && d6.data.length >= 4, `Testimonials API (${d6.data.length} client reviews)`);

  // 7. FAQs
  const r7 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/faqs', method: 'GET' });
  const d7 = JSON.parse(r7.data);
  assert(r7.statusCode === 200 && d7.data.length >= 5, `Agency FAQs API (${d7.data.length} FAQs loaded)`);

  // 8. Contact Form Submission
  const contactPayload = JSON.stringify({
    name: 'Emily Watson',
    email: 'emily.watson@horizontech.com',
    phone: '+1 415 555 2671',
    company: 'Horizon Technologies',
    service: 'custom-web-development',
    budget: '$10,000+',
    message: 'We are planning a full-stack platform migration in Q4.'
  });
  const r8 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(contactPayload)
    }
  }, contactPayload);
  const d8 = JSON.parse(r8.data);
  assert(r8.statusCode === 201 && d8.success, `Contact Form Submission (Inquiry ID: ${d8.data?.inquiry_id || 'generated'})`);

  // 9. Newsletter Subscribe
  const subPayload = JSON.stringify({ email: `newsletter.test.${Date.now()}@example.com` });
  const r9 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/newsletter/subscribe',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(subPayload)
    }
  }, subPayload);
  const d9 = JSON.parse(r9.data);
  assert(r9.statusCode === 200 || r9.statusCode === 201, `Newsletter Subscription (${d9.message})`);

  // 10. SEO Metadata
  const r10 = await request({ hostname: '127.0.0.1', port: 8080, path: '/api/seo?path=%2Fservices', method: 'GET' });
  const d10 = JSON.parse(r10.data);
  assert(r10.statusCode === 200 && (d10.data?.seoTitle || d10.data?.seo_title), `SEO Metadata API for '/services' ('${d10.data?.seoTitle || d10.data?.seo_title}')`);

  // 11. Admin Login & Session / Token Capture
  const loginPayload = JSON.stringify({
    email: 'sameerliaqat81@gmail.com',
    password: 'Y&VO{(w0J3A6}'
  });
  const r11 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginPayload)
    }
  }, loginPayload);
  const d11 = JSON.parse(r11.data);
  const rawCookie = r11.headers['set-cookie'] ? r11.headers['set-cookie'][0] : '';
  const sessionCookie = rawCookie.split(';')[0];
  const adminToken = d11.data?.token || '';
  const authHeaders = {
    'Cookie': sessionCookie,
    'Authorization': `Bearer ${adminToken}`
  };
  assert(r11.statusCode === 200 && d11.success && d11.data?.user?.email, `Admin Authentication (${d11.data?.user?.email}, Role: ${d11.data?.user?.role})`);

  // 12. Admin Authenticated Dashboard
  const r12 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/dashboard',
    method: 'GET',
    headers: authHeaders
  });
  const d12 = JSON.parse(r12.data);
  assert(r12.statusCode === 200 && d12.data?.counts, `Admin Dashboard Metrics (Leads: ${d12.data?.counts?.totalLeads}, Posts: ${d12.data?.counts?.publishedPosts}, Services: ${d12.data?.counts?.publishedServices})`);

  // 13. Admin Leads Management
  const r13 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/leads',
    method: 'GET',
    headers: authHeaders
  });
  const d13 = JSON.parse(r13.data);
  const leadsList = Array.isArray(d13.data) ? d13.data : (d13.data?.leads || []);
  assert(r13.statusCode === 200 && leadsList.length > 0, `Admin Leads CRM API (${leadsList.length} leads in pipeline)`);

  // 14. Admin Contact Messages
  const r14 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/messages',
    method: 'GET',
    headers: authHeaders
  });
  const d14 = JSON.parse(r14.data);
  const messagesList = Array.isArray(d14.data) ? d14.data : (d14.data?.messages || []);
  assert(r14.statusCode === 200 && messagesList.length > 0, `Admin Messages API (${messagesList.length} messages)`);

  // 15. Admin Blog CMS
  const r15 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/blog',
    method: 'GET',
    headers: authHeaders
  });
  const d15 = JSON.parse(r15.data);
  const postsList = Array.isArray(d15.data) ? d15.data : (d15.data?.posts || []);
  assert(r15.statusCode === 200 && postsList.length > 0, `Admin Blog CMS API (${postsList.length} posts in CMS)`);

  // 16. Admin Activity Audit Logs
  const r16 = await request({
    hostname: '127.0.0.1',
    port: 8080,
    path: '/api/admin/activity-logs',
    method: 'GET',
    headers: authHeaders
  });
  const d16 = JSON.parse(r16.data);
  const logsList = Array.isArray(d16.data) ? d16.data : (d16.data?.logs || []);
  assert(r16.statusCode === 200 && logsList.length >= 0, `Admin Audit Activity Logs (${logsList.length} logged events)`);

  // 17. XML Sitemap
  const r17 = await request({ hostname: '127.0.0.1', port: 8080, path: '/sitemap.xml', method: 'GET' });
  assert(r17.statusCode === 200 && r17.data.includes('<?xml') && r17.data.includes('<urlset'), `Dynamic XML Sitemap (/sitemap.xml)`);

  // 18. Robots.txt
  const r18 = await request({ hostname: '127.0.0.1', port: 8080, path: '/robots.txt', method: 'GET' });
  assert(r18.statusCode === 200 && r18.data.includes('User-agent: *'), `Robots.txt Directive Generator (/robots.txt)`);

  // 19. React Single Page Entrypoint
  const r19 = await request({ hostname: '127.0.0.1', port: 8080, path: '/', method: 'GET' });
  assert(r19.statusCode === 200 && r19.data.includes('<div id="root"></div>'), `React SPA Entrypoint (index.html directly at root)`);

  console.log(`\nRESULTS: ${passed} PASSED, ${failed} FAILED.`);
  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
