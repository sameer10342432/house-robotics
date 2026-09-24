<?php
/**
 * HOUSE ROBOTICS — Production Configuration Template
 * 
 * Instructions:
 * 1. Copy this file to 'config.php' in the same directory (or parent directory).
 * 2. Fill in your cPanel MySQL database credentials created via cPanel MySQL Databases.
 * 3. Fill in your SMTP credentials for email notifications (optional but recommended).
 * 4. Never commit your production config.php to public version control.
 */

return [
    // ------------------------------------------------------------------------
    // Database Configuration (cPanel MySQL / MariaDB)
    // ------------------------------------------------------------------------
    'db' => [
        'driver'    => 'mysql',                     // 'mysql' or 'sqlite'
        'host'      => 'localhost',                 // Usually 'localhost' or '127.0.0.1' on cPanel
        'port'      => 3306,
        'database'  => 'cpaneluser_houserobotics',  // cPanel database name (e.g. username_dbname)
        'username'  => 'cpaneluser_dbuser',         // cPanel MySQL username
        'password'  => 'YOUR_STRONG_DB_PASSWORD',   // cPanel MySQL user password
        'charset'   => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'options'   => [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ],
    ],

    // ------------------------------------------------------------------------
    // Application & Domain Settings
    // ------------------------------------------------------------------------
    'app' => [
        'name'          => 'House Robotics',
        'tagline'       => 'Smart Digital Solutions. Powerful Business Growth.',
        'url'           => 'https://example.com',    // Your production domain (no trailing slash)
        'env'           => 'production',             // 'production' or 'development'
        'debug'         => false,                    // Set to false in production
        'timezone'      => 'UTC',
        'official_email'=> 'sameerliaqat81@gmail.com',
        'official_phone'=> '+92 347 4542881',
    ],

    // ------------------------------------------------------------------------
    // Session & Security Settings
    // ------------------------------------------------------------------------
    'security' => [
        'session_name'    => 'HR_ADMIN_SESS',
        'session_lifetime'=> 604800,                 // 7 days in seconds
        'session_secret'  => 'CHANGE_THIS_TO_A_RANDOM_SECURE_KEY_1234567890',
        'login_max_attempts' => 5,                  // Max failed logins before 15-min lockout
        'login_lockout_time' => 900,                 // 15 minutes lockout
    ],

    // ------------------------------------------------------------------------
    // Email & SMTP Notification Settings
    // ------------------------------------------------------------------------
    'mail' => [
        'enabled'       => true,
        'driver'        => 'smtp',                   // 'smtp' or 'mail'
        'host'          => 'smtp.gmail.com',         // or mail.yourdomain.com
        'port'          => 587,                      // 587 (TLS) or 465 (SSL)
        'encryption'    => 'tls',                    // 'tls' or 'ssl'
        'username'      => 'sameerliaqat81@gmail.com',
        'password'      => 'YOUR_SMTP_OR_APP_PASSWORD',
        'from_address'  => 'notifications@house-robotics.com',
        'from_name'     => 'House Robotics Notifications',
        'notify_address'=> 'sameerliaqat81@gmail.com', // Official recipient for leads
    ],

    // ------------------------------------------------------------------------
    // Upload Storage Settings
    // ------------------------------------------------------------------------
    'upload' => [
        'dir'           => __DIR__ . '/../uploads',
        'url_prefix'    => '/uploads',
        'max_file_size' => 10 * 1024 * 1024,         // 10 Megabytes
        'allowed_types' => [
            'image/jpeg'  => 'jpg',
            'image/png'   => 'png',
            'image/webp'  => 'webp',
            'image/gif'   => 'gif',
            'image/svg+xml' => 'svg',
            'application/pdf' => 'pdf'
        ],
    ]
];
