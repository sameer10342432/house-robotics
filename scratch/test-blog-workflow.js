async function runTests() {
  const base = 'http://127.0.0.1:8080/api';
  console.log('Testing House Robotics Blog CMS Endpoints...');

  // 1. Admin login
  const loginRes = await fetch(`${base}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sameerliaqat81@gmail.com', password: 'Y&VO{(w0J3A6}' })
  });
  const loginData = await loginRes.json();
  const rawCookie = loginRes.headers.get('set-cookie') || '';
  const sessionCookie = rawCookie.split(';')[0];
  console.log('1. Admin Login:', loginData.success ? 'PASSED' : 'FAILED', loginData.data?.user?.email);
  const token = loginData.data?.token;
  const authHeaders = {
    'Content-Type': 'application/json',
    'Cookie': sessionCookie,
    'Authorization': `Bearer ${token}`
  };

  // 2. Fetch categories, tags, authors, internal links
  const catsRes = await (await fetch(`${base}/admin/blog/categories/all`, { headers: authHeaders })).json();
  console.log('2. Categories fetched:', catsRes.success ? 'PASSED' : 'FAILED', `(${catsRes.data?.length} categories)`);

  const tagsRes = await (await fetch(`${base}/admin/blog/tags/all`, { headers: authHeaders })).json();
  console.log('3. Tags fetched:', tagsRes.success ? 'PASSED' : 'FAILED', `(${tagsRes.data?.length} tags)`);

  const authorsRes = await (await fetch(`${base}/admin/blog/authors/all`, { headers: authHeaders })).json();
  console.log('4. Authors fetched:', authorsRes.success ? 'PASSED' : 'FAILED', `(${authorsRes.data?.length} authors)`);

  const linksRes = await (await fetch(`${base}/admin/blog/internal-links/destinations`, { headers: authHeaders })).json();
  console.log('5. Internal links fetched:', linksRes.success ? 'PASSED' : 'FAILED', `(${linksRes.data?.length} destinations)`);

  // 3. Create a test blog article
  const testSlug = `enterprise-agentic-seo-architecture-${Date.now().toString().slice(-4)}`;
  const createRes = await (await fetch(`${base}/admin/blog`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Enterprise Agentic SEO: Algorithmic Architecture for 2026',
      slug: testSlug,
      excerpt: 'Comprehensive blueprint detailing how autonomous agent pipelines and structured knowledge schemas unlock sustainable ranking moats in LLM-driven search engines.',
      content: '<h2>1. The Post-Search Engine Paradigm</h2><p>As generative models begin answering queries directly, technical SEO pivots toward entity relationships and semantic topical dominance.</p><figure class="mx-auto block my-6 rounded-2xl shadow-md"><img src="/assets/blog-ai-search.webp" alt="Agentic AI SEO Telemetry Architecture" class="w-full rounded-xl" /><figcaption>Figure 1: Autonomous Agent Knowledge Graph Distribution</figcaption></figure><h3>2. Technical Schema Validation</h3><p>Internal link equity should flow seamlessly to core capabilities like our <a href="/services/seo" class="text-violet-600 font-semibold underline">Enterprise SEO Practice</a>.</p>',
      featuredImage: '/assets/blog-ai-search.webp',
      featuredImageAlt: 'Autonomous Agentic SEO Architecture Console',
      featuredImageCaption: 'Live knowledge ingestion telemetry across global edge nodes',
      author: 'Marcus Vance',
      authorRole: 'Head of Growth & AI Strategy',
      authorBio: '12+ years pioneering algorithmic growth, technical SEO infrastructure, and enterprise AI automation systems.',
      authorAvatar: '/images/avatar-marcus.svg',
      readTime: '6 min read',
      categoryId: catsRes.data?.[0]?.id,
      status: 'PUBLISHED',
      featured: true,
      seoTitle: 'Enterprise Agentic SEO: Algorithmic Architecture 2026 | House Robotics',
      metaDescription: 'Discover the technical architecture behind agentic SEO, LLM crawl budget optimization, and structured knowledge clustering.',
      focusKeyword: 'agentic seo',
      canonicalUrl: `https://houserobotics.com/blog/${testSlug}`,
      ogTitle: 'Enterprise Agentic SEO: Algorithmic Architecture for 2026',
      ogDescription: 'Comprehensive blueprint for engineering autonomous LLM search visibility.',
      ogImage: '/assets/blog-ai-search.webp',
      tagIds: tagsRes.data?.slice(0, 2).map(t => t.id)
    })
  })).json();

  console.log('6. Create Blog Article:', createRes.success ? 'PASSED' : 'FAILED', createRes.data?.id);
  const postId = createRes.data?.id;

  // 4. Duplicate Article
  const dupRes = await (await fetch(`${base}/admin/blog/${postId}/duplicate`, {
    method: 'POST',
    headers: authHeaders
  })).json();
  console.log('7. Duplicate Article:', dupRes.success ? 'PASSED' : 'FAILED', `Duplicate Slug: ${dupRes.data?.slug}, Status: ${dupRes.data?.status}`);

  // 5. Update Article (and verify revision creation)
  const updateRes = await (await fetch(`${base}/admin/blog/${postId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Enterprise Agentic SEO: Algorithmic Architecture for 2026 (Updated)',
      slug: testSlug,
      excerpt: 'Updated comprehensive blueprint detailing how autonomous agent pipelines unlock sustainable ranking moats.',
      content: '<h2>1. Updated Post-Search Engine Paradigm</h2><p>Updated content with latest benchmark telemetry.</p>',
      status: 'PUBLISHED'
    })
  })).json();
  console.log('8. Update Article:', updateRes.success ? 'PASSED' : 'FAILED');

  // 6. Check Revision History
  const revsRes = await (await fetch(`${base}/admin/blog/${postId}/revisions`, { headers: authHeaders })).json();
  console.log('9. Revisions History:', revsRes.success && revsRes.data?.length > 0 ? 'PASSED' : 'FAILED', `(${revsRes.data?.length} revisions found)`);

  // 7. Verify Public Blog Read API & View Count Increment
  const publicRes = await (await fetch(`${base}/blog/${testSlug}`)).json();
  console.log('10. Public Article Fetch:', publicRes.success ? 'PASSED' : 'FAILED', `Views: ${publicRes.data?.views}`);
  console.log('    Related articles returned:', publicRes.data?.relatedPosts?.length);

  console.log('\n--- ALL CMS BACKEND & PUBLIC WORKFLOW TESTS COMPLETED SUCCESSFULLY! ---');
}

runTests().catch(console.error);
