<?php
/**
 * HOUSE ROBOTICS — Active Runtime Configuration
 */

// If custom config exists outside, load it; otherwise use default settings
$customConfigFile = __DIR__ . '/config.local.php';
if (file_exists($customConfigFile)) {
    return require $customConfigFile;
}

// Auto-detect environment variables if present
$dbHost = !empty(getenv('DB_HOST')) ? getenv('DB_HOST') : 'localhost';
$dbPort = (int)(!empty(getenv('DB_PORT')) ? getenv('DB_PORT') : 3306);
$dbName = !empty(getenv('DB_NAME')) ? getenv('DB_NAME') : 'muhamma1_robotic';
$dbUser = !empty(getenv('DB_USER')) ? getenv('DB_USER') : 'muhamma1_robotic';
$dbPass = !empty(getenv('DB_PASSWORD')) ? getenv('DB_PASSWORD') : '####Sameer1234567890';

$driver = getenv('DB_DRIVER') ?: 'mysql';
// If local dev environment without MySQL connection specified, allow sqlite fallback for testing
$sqlitePath = __DIR__ . '/../database/dev.sqlite';

return [
    'db' => [
        'driver'    => $driver,
        'host'      => $dbHost,
        'port'      => $dbPort,
        'database'  => $dbName,
        'username'  => $dbUser,
        'password'  => $dbPass,
        'sqlite_path' => $sqlitePath,
        'charset'   => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'options'   => [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ],
    ],

    'app' => [
        'name'          => 'House Robotics',
        'tagline'       => 'Smart Digital Solutions. Powerful Business Growth.',
        'url'           => getenv('SITE_URL') ?: 'https://houserobotics.online',
        'env'           => getenv('APP_ENV') ?: 'production',
        'debug'         => getenv('APP_DEBUG') === 'true',
        'timezone'      => 'UTC',
        'official_email'=> 'sameerliaqat81@gmail.com',
        'official_phone'=> '+92 347 4542881',
    ],

    'security' => [
        'session_name'    => 'HR_ADMIN_SESS',
        'session_lifetime'=> 604800,
        'session_secret'  => getenv('SESSION_SECRET') ?: 'house_robotics_cpanel_secure_session_token_2026',
        'login_max_attempts' => 5,
        'login_lockout_time' => 900,
    ],

    'mail' => [
        'enabled'       => true,
        'driver'        => getenv('MAIL_DRIVER') ?: 'smtp',
        'host'          => getenv('MAIL_HOST') ?: 'smtp.gmail.com',
        'port'          => (int)(getenv('MAIL_PORT') ?: 587),
        'encryption'    => getenv('MAIL_ENCRYPTION') ?: 'tls',
        'username'      => getenv('MAIL_USERNAME') ?: 'sameerliaqat81@gmail.com',
        'password'      => getenv('MAIL_PASSWORD') ?: '',
        'from_address'  => getenv('MAIL_FROM') ?: 'notifications@houserobotics.online',
        'from_name'     => getenv('MAIL_FROM_NAME') ?: 'House Robotics Notifications',
        'notify_address'=> 'sameerliaqat81@gmail.com',
    ],

    'upload' => [
        'dir'           => __DIR__ . '/../uploads',
        'url_prefix'    => '/uploads',
        'max_file_size' => 10 * 1024 * 1024,
        'allowed_types' => [
            'image/jpeg'      => 'jpg',
            'image/png'       => 'png',
            'image/webp'      => 'webp',
            'image/gif'       => 'gif',
            'image/svg+xml'   => 'svg',
            'application/pdf' => 'pdf'
        ],
    ]
];
