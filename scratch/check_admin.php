<?php
$pdo = new PDO('sqlite:' . __DIR__ . '/../cpanel_production/database/dev.sqlite');
$admins = $pdo->query('SELECT id, name, email, password_hash, role, is_active FROM admin_users')->fetchAll(PDO::FETCH_ASSOC);
echo "Admins found: " . count($admins) . "\n";
foreach ($admins as $a) {
    echo "ID: {$a['id']}, Email: {$a['email']}\n";
    echo "Stored hash: {$a['password_hash']}\n";
    $verify = password_verify('Y&VO{(w0J3A6}', $a['password_hash']);
    echo "Verify 'Y&VO{(w0J3A6}': " . ($verify ? 'MATCH' : 'NO MATCH') . "\n";
}
