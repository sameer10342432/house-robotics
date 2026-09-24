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
    ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
    ['path' => '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['path' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => '/blog', 'priority' => '0.8', 'changefreq' => 'daily'],
];

try {
    $services = Database::fetchAll("SELECT slug, updated_at FROM services WHERE status = 'PUBLISHED' AND no_index = 0");
    $posts = Database::fetchAll("SELECT slug, published_at, updated_at FROM blog_posts WHERE status = 'PUBLISHED' AND no_index = 0");
} catch (Throwable $e) {
    $services = [];
    $posts = [];
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($staticRoutes as $r) {
    echo "  <url>\n";
    echo "    <loc>{$baseUrl}{$r['path']}</loc>\n";
    echo "    <changefreq>{$r['changefreq']}</changefreq>\n";
    echo "    <priority>{$r['priority']}</priority>\n";
    echo "  </url>\n";
}

foreach ($services as $srv) {
    $lastmod = date('Y-m-d', strtotime($srv['updated_at'] ?? 'now'));
    echo "  <url>\n";
    echo "    <loc>{$baseUrl}/services/{$srv['slug']}</loc>\n";
    echo "    <lastmod>{$lastmod}</lastmod>\n";
    echo "    <changefreq>weekly</changefreq>\n";
    echo "    <priority>0.85</priority>\n";
    echo "  </url>\n";
}

foreach ($posts as $p) {
    $dateSource = !empty($p['published_at']) ? $p['published_at'] : ($p['updated_at'] ?? 'now');
    $lastmod = date('Y-m-d', strtotime($dateSource));
    echo "  <url>\n";
    echo "    <loc>{$baseUrl}/blog/{$p['slug']}</loc>\n";
    echo "    <lastmod>{$lastmod}</lastmod>\n";
    echo "    <changefreq>monthly</changefreq>\n";
    echo "    <priority>0.7</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>';
