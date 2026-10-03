<?php
/**
 * HOUSE ROBOTICS — Dynamic XML Sitemap Generator
 */

require_once __DIR__ . '/includes/Database.php';

header('Content-Type: application/xml; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$configPath = __DIR__ . '/config/config.php';
$appConfig = file_exists($configPath) ? require $configPath : [];
$baseUrl = rtrim($appConfig['app']['url'] ?? '', '/');
if (empty($baseUrl)) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $baseUrl = "{$protocol}://{$host}";
}

$staticRoutes = [
    ['path' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
    ['path' => '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['path' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/blog', 'priority' => '0.8', 'changefreq' => 'weekly'],
    // 17 Primary Service Pages
    ['path' => '/seo', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['path' => '/local-seo', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['path' => '/social-media', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['path' => '/ppc', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['path' => '/ai-automation', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['path' => '/web-development', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['path' => '/wordpress', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/shopify', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/ecommerce', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/email-marketing', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/content-marketing', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/cro', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/lead-generation', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/analytics', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/branding', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/video-marketing', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['path' => '/online-reputation', 'priority' => '0.8', 'changefreq' => 'weekly'],
    // 5 Restored Core Article Pages
    ['path' => '/how-much-does-seo-cost-in-the-uk/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/what-is-seo-and-why-does-your-business-need-it/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/seo-vs-ppc-which-is-better-for-your-business/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/how-google-business-profile-helps-local-businesses/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/how-to-improve-your-google-rankings-in-2026/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    // 6 Legacy Topic Guides
    ['path' => '/blog/the-modern-seo-playbook', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => '/blog/practical-ai-automation', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => '/blog/why-page-speed-is-the-ultimate-conversion-rate-multiplier', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => '/blog/google-ads-in-2026-eliminating-wasteful-spend', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => '/blog/google-maps-3-pack-mastery', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => '/blog/high-converting-short-form-video-systems', 'priority' => '0.7', 'changefreq' => 'monthly'],
];

try {
    $posts = Database::fetchAll("SELECT slug, canonical_url, published_at, updated_at FROM blog_posts WHERE status = 'PUBLISHED' AND no_index = 0");
} catch (Throwable $e) {
    $posts = [];
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

$emitted = [];
foreach ($staticRoutes as $r) {
    $loc = "{$baseUrl}{$r['path']}";
    $emitted[$loc] = true;
    echo "  <url>\n";
    echo "    <loc>{$loc}</loc>\n";
    echo "    <changefreq>{$r['changefreq']}</changefreq>\n";
    echo "    <priority>{$r['priority']}</priority>\n";
    echo "  </url>\n";
}

foreach ($posts as $p) {
    $slug = $p['slug'] ?? '';
    if (empty($slug)) continue;
    $customCanonical = $p['canonical_url'] ?? '';
    $loc = !empty($customCanonical) ? $customCanonical : "{$baseUrl}/blog/{$slug}";
    if (isset($emitted[$loc])) continue;
    $emitted[$loc] = true;
    $dateSource = !empty($p['published_at']) ? $p['published_at'] : ($p['updated_at'] ?? 'now');
    $lastmod = date('Y-m-d', strtotime($dateSource));
    echo "  <url>\n";
    echo "    <loc>{$loc}</loc>\n";
    echo "    <lastmod>{$lastmod}</lastmod>\n";
    echo "    <changefreq>monthly</changefreq>\n";
    echo "    <priority>0.7</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>';
