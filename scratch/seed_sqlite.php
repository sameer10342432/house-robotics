<?php
/**
 * Local SQLite database initializer for PHP API testing
 */

$dbPath = __DIR__ . '/../database/dev.sqlite';
if (file_exists($dbPath)) {
    @unlink($dbPath);
}

$pdo = new PDO('sqlite:' . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Read schema and data from database.sql
$sql = file_get_contents(__DIR__ . '/../database/database.sql');

// Clean MySQL-specific syntax for SQLite
$statements = [
    "CREATE TABLE admin_users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        last_login DATETIME NULL,
        reset_password_token VARCHAR(255) NULL,
        reset_password_expires DATETIME NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE services (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(191) NOT NULL UNIQUE,
        category VARCHAR(100) NOT NULL DEFAULT 'Marketing',
        short_description TEXT NOT NULL,
        long_description TEXT NOT NULL,
        hero_image VARCHAR(255) NULL,
        icon VARCHAR(100) NOT NULL DEFAULT 'Sparkles',
        status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
        featured TINYINT(1) NOT NULL DEFAULT 0,
        sort_order INT NOT NULL DEFAULT 0,
        metrics_label VARCHAR(100) NULL,
        metrics_value VARCHAR(100) NULL,
        gradient VARCHAR(150) DEFAULT 'from-violet-600 to-blue-600',
        seo_title VARCHAR(255) NULL,
        meta_description TEXT NULL,
        focus_keyword VARCHAR(150) NULL,
        canonical_url VARCHAR(255) NULL,
        og_image VARCHAR(255) NULL,
        no_index TINYINT(1) NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE service_features (
        id VARCHAR(36) PRIMARY KEY,
        service_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        icon VARCHAR(100) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE service_benefits (
        id VARCHAR(36) PRIMARY KEY,
        service_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        icon VARCHAR(100) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE service_process_steps (
        id VARCHAR(36) PRIMARY KEY,
        service_id VARCHAR(36) NOT NULL,
        step_number VARCHAR(20) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        icon VARCHAR(100) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE service_faqs (
        id VARCHAR(36) PRIMARY KEY,
        service_id VARCHAR(36) NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE blog_categories (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(191) NOT NULL UNIQUE,
        description TEXT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE blog_tags (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(191) NOT NULL UNIQUE,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE blog_posts (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(191) NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        featured_image VARCHAR(255) NULL,
        featured_image_alt VARCHAR(255) NULL,
        featured_image_caption VARCHAR(255) NULL,
        author VARCHAR(150) NOT NULL DEFAULT 'House Robotics Strategy Team',
        author_role VARCHAR(150) DEFAULT 'Growth Strategist',
        author_bio TEXT NULL,
        author_avatar VARCHAR(255) DEFAULT '/images/avatar-marcus.svg',
        read_time VARCHAR(50) NOT NULL DEFAULT '5 min read',
        category_id VARCHAR(36) NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
        featured TINYINT(1) NOT NULL DEFAULT 0,
        views INT NOT NULL DEFAULT 0,
        published_at DATETIME NULL,
        scheduled_at DATETIME NULL,
        seo_title VARCHAR(255) NULL,
        meta_description TEXT NULL,
        focus_keyword VARCHAR(150) NULL,
        canonical_url VARCHAR(255) NULL,
        og_title VARCHAR(255) NULL,
        og_description TEXT NULL,
        og_image VARCHAR(255) NULL,
        twitter_title VARCHAR(255) NULL,
        twitter_description TEXT NULL,
        twitter_image VARCHAR(255) NULL,
        no_index TINYINT(1) NOT NULL DEFAULT 0,
        related_post_ids TEXT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE blog_post_tags (
        id VARCHAR(36) PRIMARY KEY,
        post_id VARCHAR(36) NOT NULL,
        tag_id VARCHAR(36) NOT NULL
    )",
    "CREATE TABLE blog_revisions (
        id VARCHAR(36) PRIMARY KEY,
        post_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        author VARCHAR(150) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE authors (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        role VARCHAR(150) NULL,
        bio TEXT NULL,
        avatar VARCHAR(255) NULL,
        email VARCHAR(191) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE testimonials (
        id VARCHAR(36) PRIMARY KEY,
        client_name VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        photo VARCHAR(255) NULL,
        rating INT NOT NULL DEFAULT 5,
        review TEXT NOT NULL,
        highlight VARCHAR(255) NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'APPROVED',
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE faqs (
        id VARCHAR(36) PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'General',
        sort_order INT NOT NULL DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE contact_messages (
        id VARCHAR(36) PRIMARY KEY,
        inquiry_id VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(191) NOT NULL,
        phone VARCHAR(50) NULL,
        company VARCHAR(150) NULL,
        service VARCHAR(100) NULL,
        budget VARCHAR(100) NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'UNREAD',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE leads (
        id VARCHAR(36) PRIMARY KEY,
        inquiry_id VARCHAR(100) NULL UNIQUE,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(191) NOT NULL,
        phone VARCHAR(50) NULL,
        company VARCHAR(150) NULL,
        service VARCHAR(100) NULL,
        budget VARCHAR(100) NULL,
        message TEXT NULL,
        source VARCHAR(100) NOT NULL DEFAULT 'Website',
        status VARCHAR(50) NOT NULL DEFAULT 'NEW',
        assigned_to VARCHAR(150) DEFAULT NULL,
        score INT NOT NULL DEFAULT 50,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE lead_notes (
        id VARCHAR(36) PRIMARY KEY,
        lead_id VARCHAR(36) NOT NULL,
        admin_id VARCHAR(36) NULL,
        author_name VARCHAR(150) NOT NULL DEFAULT 'Admin',
        note TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE newsletter_subscribers (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(191) NOT NULL UNIQUE,
        name VARCHAR(150) DEFAULT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'SUBSCRIBED',
        source VARCHAR(100) NOT NULL DEFAULT 'Website Footer',
        subscribed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at DATETIME NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE seo_metadata (
        id VARCHAR(36) PRIMARY KEY,
        page_path VARCHAR(191) NOT NULL UNIQUE,
        seo_title VARCHAR(255) NOT NULL,
        meta_description TEXT NOT NULL,
        focus_keyword VARCHAR(150) DEFAULT NULL,
        canonical_url VARCHAR(255) DEFAULT NULL,
        og_title VARCHAR(255) DEFAULT NULL,
        og_description TEXT NULL,
        og_image VARCHAR(255) DEFAULT NULL,
        twitter_title VARCHAR(255) DEFAULT NULL,
        twitter_description TEXT NULL,
        twitter_image VARCHAR(255) DEFAULT NULL,
        no_index TINYINT(1) NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE site_settings (
        id VARCHAR(36) PRIMARY KEY,
        key VARCHAR(191) NOT NULL UNIQUE,
        value TEXT NOT NULL,
        `group` VARCHAR(50) NOT NULL DEFAULT 'general',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE media (
        id VARCHAR(36) PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        alt_text VARCHAR(255) DEFAULT NULL,
        title VARCHAR(255) DEFAULT NULL,
        caption TEXT DEFAULT NULL,
        description TEXT DEFAULT NULL,
        width INT NULL,
        height INT NULL,
        uploaded_by VARCHAR(150) DEFAULT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE analytics_events (
        id VARCHAR(36) PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        event_name VARCHAR(100) NOT NULL,
        page_url VARCHAR(500) DEFAULT NULL,
        referrer VARCHAR(500) DEFAULT NULL,
        user_agent VARCHAR(255) DEFAULT NULL,
        ip_hash VARCHAR(64) DEFAULT NULL,
        metadata TEXT DEFAULT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE activity_logs (
        id VARCHAR(36) PRIMARY KEY,
        admin_id VARCHAR(36) DEFAULT NULL,
        admin_name VARCHAR(150) NOT NULL DEFAULT 'System',
        action VARCHAR(100) NOT NULL,
        entity VARCHAR(100) NOT NULL,
        entity_id VARCHAR(100) DEFAULT NULL,
        metadata TEXT DEFAULT NULL,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE password_resets (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(191) NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )"
];

foreach ($statements as $stmt) {
    $pdo->exec($stmt);
}

// Extract INSERT statements from database.sql and execute
preg_match_all('/INSERT INTO `?([a-zA-Z0-9_]+)`? \((.*?)\) VALUES\s*(.*?);/s', $sql, $matches, PREG_SET_ORDER);

foreach ($matches as $m) {
    $table = $m[1];
    $cols = $m[2];
    $vals = $m[3];

    // Remove MySQL ON DUPLICATE KEY UPDATE
    $valsClean = preg_replace('/ON DUPLICATE KEY UPDATE.*$/is', '', $vals);
    // Replace NOW() with CURRENT_TIMESTAMP or datetime
    $valsClean = str_replace('NOW()', "'" . date('Y-m-d H:i:s') . "'", $valsClean);

    $insertSql = "INSERT OR IGNORE INTO `{$table}` ({$cols}) VALUES {$valsClean}";
    try {
        $pdo->exec($insertSql);
    } catch (Exception $e) {
        echo "Error inserting into {$table}: " . $e->getMessage() . "\n";
    }
}

echo "Local SQLite database successfully seeded with full schema and data!\n";
