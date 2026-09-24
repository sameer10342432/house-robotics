import { config } from './config';

async function runTests() {
  console.log('====================================================');
  console.log('HOUSE ROBOTICS — COMPREHENSIVE BACKEND & API AUDIT');
  console.log('====================================================\n');

  const BASE = 'http://localhost:5000';
  let passed = 0;
  let failed = 0;

  function assert(name: string, condition: boolean, details?: any) {
    if (condition) {
      console.log(`✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${name}`, details || '');
      failed++;
    }
  }

  // 1. Health check
  try {
    const res = await fetch(`${BASE}/api/health`).then(r => r.json());
    assert('Health Endpoint /api/health', res.status === 'ok' && res.app === 'House Robotics');
  } catch (e: any) {
    assert('Health Endpoint /api/health', false, e.message);
  }

  // 2. Public Services
  try {
    const res = await fetch(`${BASE}/api/services`).then(r => r.json());
    assert('Public Services Endpoint (21 Services)', res.success && res.data.length === 21);
    const seoService = res.data.find((s: any) => s.slug === 'seo');
    assert('Service details populated with deliverables', seoService && seoService.features.length > 0);
  } catch (e: any) {
    assert('Public Services Endpoint', false, e.message);
  }

  // 3. Public Blog
  try {
    const res = await fetch(`${BASE}/api/blog`).then(r => r.json());
    assert('Public Blog Endpoint', res.success && res.data.length > 0);
  } catch (e: any) {
    assert('Public Blog Endpoint', false, e.message);
  }

  // 4. Public FAQs & Testimonials
  try {
    const [faqsRes, testRes] = await Promise.all([
      fetch(`${BASE}/api/faqs`).then(r => r.json()),
      fetch(`${BASE}/api/testimonials`).then(r => r.json())
    ]);
    assert('Public FAQs Endpoint', faqsRes.success && faqsRes.data.length >= 5);
    assert('Public Testimonials Endpoint', testRes.success && testRes.data.length >= 4);
  } catch (e: any) {
    assert('Public FAQs & Testimonials', false, e.message);
  }

  // 5. Contact Inbound & Lead Creation
  let newInquiryId = '';
  try {
    const res = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Automated Audit Prospect',
        email: 'audit.prospect@nexusenterprises.com',
        phone: '+1 415 800 9000',
        company: 'Nexus Enterprises',
        service: 'Custom Web Development',
        budget: '$10,000+ / mo',
        message: 'Requesting full enterprise web audit and automated qualification flow.'
      })
    }).then(r => r.json());

    newInquiryId = res.data?.inquiryId;
    assert('Contact Form Submission & Lead Creation', res.success && !!newInquiryId);
  } catch (e: any) {
    assert('Contact Form Submission', false, e.message);
  }

  // 6. Newsletter Subscription & Duplicate Prevention
  try {
    const subEmail = `test_${Date.now()}@growthco.org`;
    const res1 = await fetch(`${BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: subEmail })
    }).then(r => r.json());
    assert('Newsletter Subscription', res1.success);

    const res2 = await fetch(`${BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: subEmail })
    }).then(r => r.json());
    assert('Newsletter Duplicate Subscription Handling', res2.success && res2.message.includes('already subscribed'));
  } catch (e: any) {
    assert('Newsletter Subscription', false, e.message);
  }

  // 7. Sitemap.xml & Robots.txt
  try {
    const [sitemap, robots] = await Promise.all([
      fetch(`${BASE}/sitemap.xml`).then(r => r.text()),
      fetch(`${BASE}/robots.txt`).then(r => r.text())
    ]);
    assert('Dynamic Sitemap.xml Generation', sitemap.includes('<?xml') && sitemap.includes('/services/seo'));
    assert('Robots.txt Security Disallow Rules', robots.includes('Disallow: /admin') && robots.includes('Sitemap:'));
  } catch (e: any) {
    assert('Sitemap & Robots', false, e.message);
  }

  // 8. Admin Authentication & Role-Based Security
  let adminToken = '';
  try {
    // Bad credentials
    const badLogin = await fetch(`${BASE}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sameerliaqat81@gmail.com', password: 'WrongPassword123!' })
    }).then(r => r.json());
    assert('Admin Login Rejection on Bad Password', !badLogin.success);

    // Official credentials
    const goodLogin = await fetch(`${BASE}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sameerliaqat81@gmail.com', password: 'Admin@HouseRobotics2026!' })
    }).then(r => r.json());

    adminToken = goodLogin.data?.token;
    assert('Super Admin Login with Official Credentials', goodLogin.success && !!adminToken && goodLogin.data?.user?.role === 'SUPER_ADMIN');
  } catch (e: any) {
    assert('Admin Authentication', false, e.message);
  }

  // 9. Protected Admin Dashboard API
  try {
    const dashRes = await fetch(`${BASE}/api/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }).then(r => r.json());

    assert('Admin Dashboard Metrics Aggregation', dashRes.success && dashRes.data?.counts?.publishedServices === 21);
  } catch (e: any) {
    assert('Admin Dashboard API', false, e.message);
  }

  // 10. Admin Leads CRM & Status Transition
  try {
    const leadsRes = await fetch(`${BASE}/api/admin/leads`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }).then(r => r.json());

    const createdLead = leadsRes.data.find((l: any) => l.inquiryId === newInquiryId);
    assert('Newly Created Lead Appears in Admin CRM', !!createdLead);

    if (createdLead) {
      // Transition status to QUALIFIED
      const statusRes = await fetch(`${BASE}/api/admin/leads/${createdLead.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'QUALIFIED' })
      }).then(r => r.json());
      assert('Admin Lead Status Transition to QUALIFIED', statusRes.success && statusRes.data?.status === 'QUALIFIED');

      // Add timeline note
      const noteRes = await fetch(`${BASE}/api/admin/leads/${createdLead.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ note: 'Scheduled 30-min growth consultation call.' })
      }).then(r => r.json());
      assert('Admin Timeline Note Recording', noteRes.success && noteRes.data?.note.includes('consultation'));
    }
  } catch (e: any) {
    assert('Admin Leads CRM', false, e.message);
  }

  // 11. Admin Site Settings API (Official Details Persistence)
  try {
    const settingsRes = await fetch(`${BASE}/api/admin/settings`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    }).then(r => r.json());

    const officialWhatsapp = settingsRes.data?.settings?.contact_whatsapp;
    const officialEmail = settingsRes.data?.settings?.contact_email;
    assert('Site Settings: Verified Official WhatsApp (+92 347 4542881)', officialWhatsapp === '+92 347 4542881');
    assert('Site Settings: Verified Official Email (sameerliaqat81@gmail.com)', officialEmail === 'sameerliaqat81@gmail.com');
  } catch (e: any) {
    assert('Admin Site Settings API', false, e.message);
  }

  console.log('\n====================================================');
  console.log(`AUDIT RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(e => {
  console.error('Test runner fatal error', e);
  process.exit(1);
});
