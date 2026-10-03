<?php
putenv('DB_DRIVER=sqlite');
putenv('DB_SQLITE_PATH=' . __DIR__ . '/../database/dev.sqlite');
// Local router script to emulate Apache .htaccess during local testing with PHP built-in server
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . '/../cpanel_production' . $uri;

if ($uri === '/sitemap.xml') {
    require __DIR__ . '/../cpanel_production/sitemap.php';
    return;
}

if ($uri === '/robots.txt') {
    require __DIR__ . '/../cpanel_production/robots.php';
    return;
}

if (str_starts_with($uri, '/api/')) {
    $_SERVER['SCRIPT_NAME'] = '/api/index.php';
    require __DIR__ . '/../cpanel_production/api/index.php';
    return;
}

if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // serve requested resource as-is
}

// Fallback to React index.html for client-side routing
require __DIR__ . '/../cpanel_production/index.html';
