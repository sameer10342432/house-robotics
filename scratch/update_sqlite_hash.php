<?php
$hash = '$2y$12$uau1llmY6KsagUJ2U1ZQ3OxsRLfnDfWcbklDPApPUFflPWcSUPSZS';
foreach ([__DIR__ . '/../cpanel_production/database/dev.sqlite', __DIR__ . '/../database/dev.sqlite'] as $path) {
    if (file_exists($path)) {
        $pdo = new PDO('sqlite:' . $path);
        $pdo->exec("UPDATE admin_users SET password_hash = '{$hash}' WHERE email = 'sameerliaqat81@gmail.com'");
        echo "Updated {$path} successfully\n";
    }
}
