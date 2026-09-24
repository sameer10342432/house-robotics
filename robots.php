<?php
/**
 * HOUSE ROBOTICS — Dynamic Robots.txt Handler
 */

header('Content-Type: text/plain; charset=UTF-8');

$configPath = __DIR__ . '/config/config.php';
$appConfig = file_exists($configPath) ? require $configPath : [];
$baseUrl = rtrim($appConfig['app']['url'] ?? '', '/');
if (empty($baseUrl)) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $baseUrl = "{$protocol}://{$host}";
}

echo "# House Robotics Crawler Directives\n";
echo "User-agent: *\n";
echo "Allow: /\n";
echo "Disallow: /admin\n";
echo "Disallow: /api/admin/\n";
echo "Disallow: /config/\n";
echo "Disallow: /includes/\n";
echo "Disallow: /database/\n\n";
echo "Sitemap: {$baseUrl}/sitemap.xml\n";
