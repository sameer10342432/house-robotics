<?php
/**
 * HOUSE ROBOTICS — Production PHP REST API Router & Controller
 * PHP 8.2+ • PDO • MySQL / MariaDB • cPanel Production Ready
 */

// Error reporting: Log to error_log, do not leak raw stack traces to users
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Buffer output to prevent accidental header corruption
ob_start();

// Guarantee JSON output on fatal PHP shutdowns
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        if (ob_get_length()) {
            ob_clean();
        }
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=UTF-8');
            header('X-Content-Type-Options: nosniff');
        }
        echo json_encode([
            'success' => false,
            'message' => 'Internal Server Error: An unexpected fatal error occurred.',
            'error'   => $error['message']
        ], JSON_UNESCAPED_SLASHES);
        exit;
    }
});

// Set default timezone
date_default_timezone_set('UTC');

// Load Core Infrastructure
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Response.php';
require_once __DIR__ . '/../includes/Security.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/Mailer.php';
require_once __DIR__ . '/../includes/Upload.php';
require_once __DIR__ . '/../includes/Audit.php';

// Handle CORS Pre-flight Options Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    Response::json(['status' => 'ok']);
}

// Parse Request URI and Method
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

// Allow method overriding via header or _method param
if ($method === 'POST' && !empty($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = strtoupper($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']);
}

// Normalize path relative to /api
$apiPrefix = '/api';
if (str_starts_with($path, $apiPrefix)) {
    $path = substr($path, strlen($apiPrefix));
}
$path = '/' . trim($path, '/');
if ($path === '//') {
    $path = '/';
}

$segments = explode('/', trim($path, '/'));
if (empty($segments[0])) {
    $segments = [];
}

try {
    // -------------------------------------------------------------------------
    // 1. Health Check
    // -------------------------------------------------------------------------
    if ($path === '/health' && $method === 'GET') {
        $dbStatus = 'disconnected';
        try {
            Database::fetchColumn("SELECT 1");
            $dbStatus = 'connected';
        } catch (Throwable $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }

        Response::json([
            'status'    => ($dbStatus === 'connected') ? 'ok' : 'degraded',
            'app'       => 'House Robotics',
            'php'       => PHP_VERSION,
            'database'  => $dbStatus,
            'timestamp' => date('c')
        ]);
    }

    // -------------------------------------------------------------------------
    // 2. Public Services API
    // -------------------------------------------------------------------------
    if (($segments[0] ?? '') === 'services' && !isset($segments[1]) && $method === 'GET') {
        // GET /api/services
        $services = Database::fetchAll(
            "SELECT * FROM services WHERE status = 'PUBLISHED' ORDER BY sort_order ASC"
        );

        // Attach features, benefits, process steps, faqs
        foreach ($services as &$srv) {
            $srv['features'] = Database::fetchAll(
                "SELECT * FROM service_features WHERE service_id = ? ORDER BY sort_order ASC",
                [$srv['id']]
            );
            $srv['benefits'] = Database::fetchAll(
                "SELECT * FROM service_benefits WHERE service_id = ? ORDER BY sort_order ASC",
                [$srv['id']]
            );
            $srv['processSteps'] = Database::fetchAll(
                "SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY sort_order ASC",
                [$srv['id']]
            );
            $srv['faqs'] = Database::fetchAll(
                "SELECT * FROM service_faqs WHERE service_id = ? AND status = 'PUBLISHED' ORDER BY sort_order ASC",
                [$srv['id']]
            );
        }

        Response::success($services);
    }

    if (($segments[0] ?? '') === 'services' && isset($segments[1]) && ($segments[1] !== '') && ($segments[1] !== 'index.php') && $method === 'GET') {
        // GET /api/services/:slug
        $slug = $segments[1];
        $service = Database::fetchOne("SELECT * FROM services WHERE slug = ? LIMIT 1", [$slug]);

        if (!$service || $service['status'] !== 'PUBLISHED') {
            Response::notFound("Service with slug '{$slug}' was not found.");
        }

        $service['features'] = Database::fetchAll(
            "SELECT * FROM service_features WHERE service_id = ? ORDER BY sort_order ASC",
            [$service['id']]
        );
        $service['benefits'] = Database::fetchAll(
            "SELECT * FROM service_benefits WHERE service_id = ? ORDER BY sort_order ASC",
            [$service['id']]
        );
        $service['processSteps'] = Database::fetchAll(
            "SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY sort_order ASC",
            [$service['id']]
        );
        $service['faqs'] = Database::fetchAll(
            "SELECT * FROM service_faqs WHERE service_id = ? AND status = 'PUBLISHED' ORDER BY sort_order ASC",
            [$service['id']]
        );

        Response::success($service);
    }

    // -------------------------------------------------------------------------
    // 3. Public Blog API
    // -------------------------------------------------------------------------
    $formatPostRecord = function(array &$p): void {
        $img = $p['featured_image'] ?? $p['featuredImage'] ?? null;
        $p['featuredImage'] = $img;
        $p['featured_image'] = $img;
        $p['image'] = $img;
        $p['featuredImageAlt'] = $p['featured_image_alt'] ?? $p['featuredImageAlt'] ?? '';
        $p['featured_image_alt'] = $p['featuredImageAlt'];
        $p['featuredImageCaption'] = $p['featured_image_caption'] ?? $p['featuredImageCaption'] ?? '';
        $p['featured_image_caption'] = $p['featuredImageCaption'];
        $p['readTime'] = $p['read_time'] ?? $p['readTime'] ?? '5 min read';
        $p['read_time'] = $p['readTime'];
        $p['publishedAt'] = $p['published_at'] ?? $p['publishedAt'] ?? $p['created_at'] ?? null;
        $p['published_at'] = $p['publishedAt'];
        $p['createdAt'] = $p['created_at'] ?? null;
        $p['updatedAt'] = $p['updated_at'] ?? null;
    };

    if ($path === '/blog/categories' && $method === 'GET') {
        // GET /api/blog/categories
        $categories = Database::fetchAll(
            "SELECT c.*, COUNT(p.id) as post_count 
             FROM blog_categories c 
             LEFT JOIN blog_posts p ON p.category_id = c.id AND p.status = 'PUBLISHED' 
             GROUP BY c.id 
             ORDER BY c.sort_order ASC"
        );
        Response::success($categories);
    }

    if ($path === '/blog' && $method === 'GET') {
        // GET /api/blog
        $category = $_GET['category'] ?? null;
        $tag      = $_GET['tag'] ?? null;
        $search   = $_GET['search'] ?? null;
        $featured = ($_GET['featured'] ?? '') === 'true';
        $page     = max(1, (int)($_GET['page'] ?? 1));
        $limit    = min(50, max(1, (int)($_GET['limit'] ?? 12)));
        $offset   = ($page - 1) * $limit;

        $where = ["p.status = 'PUBLISHED'"];
        $params = [];

        if ($category && $category !== 'All') {
            $where[] = "(c.name = ? OR c.slug = ?)";
            $params[] = $category;
            $params[] = $category;
        }

        if ($featured) {
            $where[] = "p.featured = 1";
        }

        if ($search) {
            $where[] = "(p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?)";
            $term = "%{$search}%";
            $params[] = $term;
            $params[] = $term;
            $params[] = $term;
        }

        $whereClause = implode(' AND ', $where);

        $totalSql = "SELECT COUNT(DISTINCT p.id) FROM blog_posts p LEFT JOIN blog_categories c ON p.category_id = c.id WHERE {$whereClause}";
        $total = (int)Database::fetchColumn($totalSql, $params);

        $dataSql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                    FROM blog_posts p 
                    LEFT JOIN blog_categories c ON p.category_id = c.id 
                    WHERE {$whereClause} 
                    ORDER BY p.published_at DESC, p.created_at DESC 
                    LIMIT {$limit} OFFSET {$offset}";
        $posts = Database::fetchAll($dataSql, $params);

        foreach ($posts as &$post) {
            $formatPostRecord($post);
            $post['category'] = !empty($post['category_id']) ? [
                'id'   => $post['category_id'],
                'name' => $post['category_name'] ?? 'General',
                'slug' => $post['category_slug'] ?? 'general'
            ] : null;
        }

        Response::success($posts, 'Posts fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    if (($segments[0] ?? '') === 'blog' && isset($segments[1]) && ($segments[1] !== '') && ($segments[1] !== 'categories') && $method === 'GET') {
        // GET /api/blog/:slug
        $slug = $segments[1];
        $preview = ($_GET['preview'] ?? '') === 'true';

        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM blog_posts p 
                LEFT JOIN blog_categories c ON p.category_id = c.id 
                WHERE p.slug = ? LIMIT 1";
        $post = Database::fetchOne($sql, [$slug]);

        if (!$post || (!$preview && $post['status'] !== 'PUBLISHED')) {
            Response::notFound("Blog article '{$slug}' not found.");
        }

        // Increment view count
        Database::execute("UPDATE blog_posts SET views = views + 1 WHERE id = ?", [$post['id']]);

        $formatPostRecord($post);

        $post['category'] = !empty($post['category_id']) ? [
            'id'   => $post['category_id'],
            'name' => $post['category_name'] ?? 'General',
            'slug' => $post['category_slug'] ?? 'general'
        ] : null;

        // Fetch tags
        $post['tags'] = Database::fetchAll(
            "SELECT t.* FROM blog_tags t 
             INNER JOIN blog_post_tags pt ON pt.tag_id = t.id 
             WHERE pt.post_id = ?",
            [$post['id']]
        );

        Response::success($post);
    }

    // -------------------------------------------------------------------------
    // 4. Public Testimonials API
    // -------------------------------------------------------------------------
    if ($path === '/testimonials' && $method === 'GET') {
        $testimonials = Database::fetchAll(
            "SELECT * FROM testimonials WHERE status = 'APPROVED' ORDER BY sort_order ASC"
        );
        Response::success($testimonials);
    }

    // -------------------------------------------------------------------------
    // 5. Public FAQs API
    // -------------------------------------------------------------------------
    if ($path === '/faqs' && $method === 'GET') {
        $category = $_GET['category'] ?? null;
        if ($category) {
            $faqs = Database::fetchAll(
                "SELECT * FROM faqs WHERE status = 'PUBLISHED' AND category = ? ORDER BY sort_order ASC",
                [$category]
            );
        } else {
            $faqs = Database::fetchAll(
                "SELECT * FROM faqs WHERE status = 'PUBLISHED' ORDER BY sort_order ASC"
            );
        }
        Response::success($faqs);
    }

    // -------------------------------------------------------------------------
    // 6. Public Contact & Consultation API
    // -------------------------------------------------------------------------
    if (($path === '/contact' || $path === '/consultation' || $path === '/contact/submit' || $path === '/contact/submit.php' || $path === '/inquiries' || $path === '/leads') && $method === 'POST') {
        if (!Security::checkRateLimit('contact_form', 15, 300)) {
            Response::rateLimited('Too many inquiries submitted from this connection. Please wait a few minutes.');
        }

        $input = Security::getJsonInput();
        $name    = Security::sanitizeString($input['name'] ?? '', 100);
        $email   = strtolower(trim($input['email'] ?? ''));
        $phone   = Security::sanitizeString($input['phone'] ?? '', 50);
        $company = Security::sanitizeString($input['company'] ?? '', 150);
        $service = Security::sanitizeString($input['service'] ?? 'General Digital Marketing', 100);
        $budget  = Security::sanitizeString($input['budget'] ?? 'Not specified', 100);
        $rawMessage = trim($input['message'] ?? '');
        $message = !empty($rawMessage) 
            ? Security::sanitizeString($rawMessage, 3000) 
            : Security::sanitizeString("Prospective client requested a strategic consultation regarding {$service}.", 1000);
        
        $page    = Security::sanitizeString($input['page'] ?? $input['page_url'] ?? $_SERVER['HTTP_REFERER'] ?? 'https://houserobotics.online/', 500);
        $referrer = Security::sanitizeString($input['referrer'] ?? $_SERVER['HTTP_REFERER'] ?? '', 500);
        $source  = Security::sanitizeString($input['source'] ?? ($path === '/consultation' ? 'Consultation Modal' : 'Website Inquiry Form'), 100);
        $utmSource = Security::sanitizeString($input['utm_source'] ?? $input['utmSource'] ?? '', 100);
        $utmMedium = Security::sanitizeString($input['utm_medium'] ?? $input['utmMedium'] ?? '', 100);
        $utmCampaign = Security::sanitizeString($input['utm_campaign'] ?? $input['utmCampaign'] ?? '', 100);
        $ip = $_SERVER['REMOTE_ADDR'] ?? '';
        $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

        $errors = [];
        if (mb_strlen($name) < 2) {
            $errors['name'] = 'Name must be at least 2 characters.';
        }
        if (!Security::isValidEmail($email)) {
            $errors['email'] = 'A valid business email address is required.';
        }

        if (!empty($errors)) {
            Response::validationError($errors);
        }

        // Generate Inquiry ID: HR-INQ-YYYYMMDD-XXXX
        $inquiryId = sprintf('HR-INQ-%s-%04d', date('Ymd'), mt_rand(1000, 9999));
        $now = date('Y-m-d H:i:s');
        $msgId = Database::generateUuid();
        $leadId = Database::generateUuid();

        // 1. Save Contact Message in MySQL
        Database::execute(
            "INSERT INTO contact_messages (id, inquiry_id, name, email, phone, company, service, budget, message, page_url, referrer, ip_address, user_agent, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'UNREAD', ?, ?)",
            [$msgId, $inquiryId, $name, $email, $phone, $company, $service, $budget, $message, $page, $referrer, $ip, $userAgent, $now, $now]
        );

        // 2. Automatically Create CRM Lead in MySQL (Immediately visible in Admin Panel)
        Database::execute(
            "INSERT INTO leads (id, inquiry_id, name, email, phone, company, service, budget, message, page_url, referrer, ip_address, user_agent, utm_source, utm_medium, utm_campaign, source, status, score, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', 60, ?, ?)",
            [$leadId, $inquiryId, $name, $email, $phone, $company, $service, $budget, $message, $page, $referrer, $ip, $userAgent, $utmSource, $utmMedium, $utmCampaign, $source, $now, $now]
        );

        // 3. Dispatch Professional HTML Email Notification to sameerliaqat81@gmail.com
        // Note: Even if email dispatch fails or times out, the MySQL record is already committed.
        $mailSent = false;
        try {
            $mailSent = Mailer::sendContactNotification([
                'inquiryId' => $inquiryId,
                'name'      => $name,
                'email'     => $email,
                'phone'     => $phone,
                'company'   => $company,
                'service'   => $service,
                'budget'    => $budget,
                'message'   => $message,
                'page'      => $page,
                'source'    => $source,
                'date'      => $now
            ]);
        } catch (Throwable $mailEx) {
            error_log("[Inquiry Email Warning] " . $mailEx->getMessage());
        }

        Response::success([
            'id'             => $msgId,
            'inquiryId'      => $inquiryId,
            'receivedAt'     => $now,
            'mailDispatched' => $mailSent
        ], 'Inquiry submitted successfully', 201);
    }

    // -------------------------------------------------------------------------
    // 7. Public Newsletter API
    // -------------------------------------------------------------------------
    if ($path === '/newsletter/subscribe' && $method === 'POST') {
        if (!Security::checkRateLimit('newsletter_sub', 10, 300)) {
            Response::rateLimited();
        }

        $input = Security::getJsonInput();
        $email = strtolower(trim($input['email'] ?? ''));
        $name  = Security::sanitizeString($input['name'] ?? '', 150);
        $source= Security::sanitizeString($input['source'] ?? 'Website Footer', 100);

        if (!Security::isValidEmail($email)) {
            Response::error('Please enter a valid email address.', 422, ['email' => 'Invalid email']);
        }

        $existing = Database::fetchOne("SELECT * FROM newsletter_subscribers WHERE email = ? LIMIT 1", [$email]);
        $now = date('Y-m-d H:i:s');

        if ($existing) {
            if ($existing['status'] === 'SUBSCRIBED') {
                Response::success(['email' => $email], 'You are already subscribed to House Robotics intelligence insights.');
            }
            Database::execute(
                "UPDATE newsletter_subscribers SET status = 'SUBSCRIBED', unsubscribed_at = NULL, subscribed_at = ?, source = ? WHERE email = ?",
                [$now, $source, $email]
            );
            Response::success(['email' => $email], 'Welcome back! Your subscription has been reactivated.');
        }

        $subId = Database::generateUuid();
        Database::execute(
            "INSERT INTO newsletter_subscribers (id, email, name, status, source, subscribed_at, created_at, updated_at) 
             VALUES (?, ?, ?, 'SUBSCRIBED', ?, ?, ?, ?)",
            [$subId, $email, $name, $source, $now, $now, $now]
        );

        Response::success(['email' => $email], 'Thank you for subscribing to House Robotics growth insights.', 201);
    }

    if ($path === '/newsletter/unsubscribe' && $method === 'POST') {
        $input = Security::getJsonInput();
        $email = strtolower(trim($input['email'] ?? ''));

        if (!Security::isValidEmail($email)) {
            Response::error('Please enter a valid email address.', 422);
        }

        Database::execute(
            "UPDATE newsletter_subscribers SET status = 'UNSUBSCRIBED', unsubscribed_at = ? WHERE email = ?",
            [date('Y-m-d H:i:s'), $email]
        );

        Response::success(null, 'You have been successfully unsubscribed from newsletter updates.');
    }

    // -------------------------------------------------------------------------
    // 8. Public SEO API
    // -------------------------------------------------------------------------
    if ($path === '/seo' && $method === 'GET') {
        $pagePath = $_GET['path'] ?? '/';
        $pagePath = '/' . ltrim($pagePath, '/');

        $seo = Database::fetchOne("SELECT * FROM seo_metadata WHERE page_path = ? LIMIT 1", [$pagePath]);
        if (!$seo) {
            $defaultTitle = Database::fetchColumn("SELECT value FROM site_settings WHERE `key` = 'seo_default_title' LIMIT 1") 
                ?: 'House Robotics — Full-Service Digital Marketing & Technology Agency';
            $defaultDesc = Database::fetchColumn("SELECT value FROM site_settings WHERE `key` = 'seo_default_description' LIMIT 1") 
                ?: 'Scale your revenue with high-impact SEO, Google & Meta Ads, Custom Web Applications, and AI Automation workflows.';

            Response::success([
                'pagePath'        => $pagePath,
                'seoTitle'        => $defaultTitle,
                'metaDescription' => $defaultDesc,
                'ogTitle'         => $defaultTitle,
                'ogDescription'   => $defaultDesc,
                'noIndex'         => false
            ]);
        }

        Response::success([
            'id'              => $seo['id'],
            'pagePath'        => $seo['page_path'],
            'seoTitle'        => $seo['seo_title'],
            'metaDescription' => $seo['meta_description'],
            'focusKeyword'    => $seo['focus_keyword'] ?? null,
            'canonicalUrl'    => $seo['canonical_url'] ?? null,
            'ogTitle'         => $seo['og_title'] ?? $seo['seo_title'],
            'ogDescription'   => $seo['og_description'] ?? $seo['meta_description'],
            'ogImage'         => $seo['og_image'] ?? null,
            'twitterTitle'    => $seo['twitter_title'] ?? $seo['seo_title'],
            'twitterDescription' => $seo['twitter_description'] ?? $seo['meta_description'],
            'twitterImage'    => $seo['twitter_image'] ?? null,
            'noIndex'         => (bool)($seo['no_index'] ?? false)
        ]);
    }

    // -------------------------------------------------------------------------
    // 9. Public Analytics Tracking API
    // -------------------------------------------------------------------------
    if ($path === '/analytics/event' && $method === 'POST') {
        $input = Security::getJsonInput();
        $eventType = Security::sanitizeString($input['eventType'] ?? 'PAGE_VIEW', 50);
        $eventName = Security::sanitizeString($input['eventName'] ?? 'unnamed', 100);
        $pageUrl   = Security::sanitizeString($input['pageUrl'] ?? '', 500);
        $referrer  = Security::sanitizeString($input['referrer'] ?? '', 500);
        $rawMeta   = $input['metadata'] ?? null;
        $metaStr   = is_string($rawMeta) ? $rawMeta : (is_array($rawMeta) ? json_encode($rawMeta) : null);

        $clientIp  = Security::getClientIp();
        $ipHash    = substr(hash('sha256', $clientIp), 0, 16);
        $ua        = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);
        $now       = date('Y-m-d H:i:s');
        $id        = Database::generateUuid();

        Database::execute(
            "INSERT INTO analytics_events (id, event_type, event_name, page_url, referrer, user_agent, ip_hash, metadata, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [$id, $eventType, $eventName, $pageUrl, $referrer, $ua, $ipHash, $metaStr, $now]
        );

        Response::success(null, 'Event recorded');
    }

    // -------------------------------------------------------------------------
    // 10. Administrator Authentication API
    // -------------------------------------------------------------------------
    if (($path === '/admin/auth/login' || $path === '/auth/login') && $method === 'POST') {
        $input = Security::getJsonInput();
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            Response::error('Please fill in both email and password.', 422);
        }

        $result = Auth::login($email, $password);
        Audit::log([
            'adminId'   => $result['user']['id'],
            'adminName' => $result['user']['name'],
            'action'    => 'LOGIN',
            'entity'    => 'AdminUser',
            'entityId'  => $result['user']['id']
        ]);

        Response::success($result, "Welcome back, {$result['user']['name']}.");
    }

    if (($path === '/admin/auth/logout' || $path === '/auth/logout') && $method === 'POST') {
        $user = Auth::user();
        if ($user) {
            Audit::log([
                'adminId'   => $user['id'],
                'adminName' => $user['name'],
                'action'    => 'LOGOUT',
                'entity'    => 'AdminUser',
                'entityId'  => $user['id']
            ]);
        }
        Auth::logout();
        Response::success(null, 'Logged out successfully.');
    }

    if (($path === '/admin/auth/me' || $path === '/auth/me') && $method === 'GET') {
        $user = Auth::requireAuth();
        Response::success($user);
    }

    if (($path === '/admin/auth/change-password' || $path === '/auth/change-password') && $method === 'POST') {
        $user = Auth::requireAuth();
        $input = Security::getJsonInput();
        $currentPass = $input['currentPassword'] ?? '';
        $newPass = $input['newPassword'] ?? '';

        if (strlen($newPass) < 8) {
            Response::error('New password must be at least 8 characters long.', 422);
        }

        $currentRecord = Database::fetchOne("SELECT password_hash FROM admin_users WHERE id = ? LIMIT 1", [$user['id']]);
        if (!$currentRecord || !password_verify($currentPass, $currentRecord['password_hash'])) {
            Response::error('Current password does not match.', 400);
        }

        $newHash = password_hash($newPass, PASSWORD_BCRYPT, ['cost' => 12]);
        Database::execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [$newHash, $user['id']]);

        Audit::log([
            'adminId'   => $user['id'],
            'adminName' => $user['name'],
            'action'    => 'CHANGE_PASSWORD',
            'entity'    => 'AdminUser',
            'entityId'  => $user['id']
        ]);

        Response::success(null, 'Password changed successfully.');
    }

    // -------------------------------------------------------------------------
    // 11. Administrator Dashboard API
    // -------------------------------------------------------------------------
    if (($path === '/admin/dashboard' || $path === '/admin/dashboard/stats') && $method === 'GET') {
        Auth::requireAuth();

        $totalLeads        = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads");
        $newLeads          = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads WHERE status = 'NEW'");
        $qualifiedLeads    = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads WHERE status = 'QUALIFIED'");
        $wonLeads          = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads WHERE status = 'WON'");
        $totalMessages     = (int)Database::fetchColumn("SELECT COUNT(*) FROM contact_messages");
        $unreadMessages    = (int)Database::fetchColumn("SELECT COUNT(*) FROM contact_messages WHERE status = 'UNREAD'");
        $totalSubscribers  = (int)Database::fetchColumn("SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'SUBSCRIBED'");
        $totalPosts        = (int)Database::fetchColumn("SELECT COUNT(*) FROM blog_posts");
        $publishedPosts    = (int)Database::fetchColumn("SELECT COUNT(*) FROM blog_posts WHERE status = 'PUBLISHED'");
        $draftPosts        = (int)Database::fetchColumn("SELECT COUNT(*) FROM blog_posts WHERE status = 'DRAFT'");
        $totalServices     = (int)Database::fetchColumn("SELECT COUNT(*) FROM services");
        $publishedServices = (int)Database::fetchColumn("SELECT COUNT(*) FROM services WHERE status = 'PUBLISHED'");
        $totalTestimonials = (int)Database::fetchColumn("SELECT COUNT(*) FROM testimonials WHERE status = 'APPROVED'");

        // Lead stage distribution
        $statusCounts = Database::fetchAll("SELECT status, COUNT(*) as count FROM leads GROUP BY status");
        $leadStatusMap = [
            'NEW'           => 0,
            'CONTACTED'     => 0,
            'QUALIFIED'     => 0,
            'PROPOSAL_SENT' => 0,
            'WON'           => 0,
            'LOST'          => 0
        ];
        foreach ($statusCounts as $row) {
            $leadStatusMap[$row['status']] = (int)$row['count'];
        }

        // Recent leads
        $recentLeads = Database::fetchAll(
            "SELECT id, inquiry_id as inquiryId, name, email, company, service, budget, status, created_at as createdAt 
             FROM leads ORDER BY created_at DESC LIMIT 6"
        );

        // Recent messages
        $recentMessages = Database::fetchAll(
            "SELECT id, inquiry_id as inquiryId, name, email, service, status, created_at as createdAt 
             FROM contact_messages ORDER BY created_at DESC LIMIT 6"
        );

        // Recent posts
        $recentPosts = Database::fetchAll(
            "SELECT id, title, slug, status, created_at as createdAt 
             FROM blog_posts ORDER BY created_at DESC LIMIT 5"
        );

        Response::success([
            'counts' => [
                'totalInquiries'        => $totalMessages,
                'newInquiries'          => $unreadMessages,
                'totalLeads'            => $totalLeads,
                'newLeads'              => $newLeads,
                'contactedLeads'        => $leadStatusMap['CONTACTED'] ?? 0,
                'qualifiedLeads'        => $qualifiedLeads,
                'proposalSentLeads'     => $leadStatusMap['PROPOSAL_SENT'] ?? 0,
                'wonLeads'              => $wonLeads,
                'lostLeads'             => $leadStatusMap['LOST'] ?? 0,
                'contactMessages'       => $totalMessages,
                'unreadMessages'        => $unreadMessages,
                'newsletterSubscribers' => $totalSubscribers,
                'blogPosts'             => $totalPosts,
                'publishedPosts'        => $publishedPosts,
                'draftPosts'            => $draftPosts,
                'services'              => $totalServices,
                'publishedServices'     => $publishedServices,
                'testimonials'          => $totalTestimonials
            ],
            'leadStatusCounts' => $leadStatusMap,
            'recentLeads'      => $recentLeads,
            'recentMessages'   => $recentMessages,
            'recentPosts'      => $recentPosts
        ]);
    }

    // -------------------------------------------------------------------------
    // 12. Administrator Leads CRM API
    // -------------------------------------------------------------------------
    if ($path === '/admin/leads' && $method === 'GET') {
        Auth::requireAuth();

        $status  = $_GET['status'] ?? null;
        $service = $_GET['service'] ?? null;
        $source  = $_GET['source'] ?? null;
        $search  = $_GET['search'] ?? null;
        $page    = max(1, (int)($_GET['page'] ?? 1));
        $limit   = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset  = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if ($status && $status !== 'ALL') {
            $where[] = "status = ?";
            $params[] = $status;
        }
        if ($service && $service !== 'ALL') {
            $where[] = "service LIKE ?";
            $params[] = "%{$service}%";
        }
        if ($source && $source !== 'ALL') {
            $where[] = "source = ?";
            $params[] = $source;
        }
        if ($search) {
            $where[] = "(name LIKE ? OR email LIKE ? OR company LIKE ? OR inquiry_id LIKE ?)";
            $s = "%{$search}%";
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads {$whereClause}", $params);
        $leads = Database::fetchAll(
            "SELECT id, inquiry_id as inquiryId, name, email, phone, company, service, budget, message, source, status, score, assigned_to as assignedTo, created_at as createdAt, updated_at as updatedAt 
             FROM leads {$whereClause} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        // Attach last notes
        foreach ($leads as &$ld) {
            $ld['notes'] = Database::fetchAll(
                "SELECT id, lead_id as leadId, author_name as authorName, note, created_at as createdAt 
                 FROM lead_notes WHERE lead_id = ? ORDER BY created_at DESC LIMIT 3",
                [$ld['id']]
            );
        }

        Response::success($leads, 'Leads fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // Lead detail
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'leads' && isset($segments[2]) && !isset($segments[3]) && $method === 'GET') {
        Auth::requireAuth();
        $leadId = $segments[2];
        $lead = Database::fetchOne(
            "SELECT id, inquiry_id as inquiryId, name, email, phone, company, service, budget, message, source, status, score, assigned_to as assignedTo, created_at as createdAt, updated_at as updatedAt 
             FROM leads WHERE id = ? LIMIT 1",
            [$leadId]
        );
        if (!$lead) {
            Response::notFound('Lead not found.');
        }
        $lead['notes'] = Database::fetchAll(
            "SELECT id, lead_id as leadId, author_name as authorName, note, created_at as createdAt 
             FROM lead_notes WHERE lead_id = ? ORDER BY created_at DESC",
            [$leadId]
        );
        Response::success($lead);
    }

    // Update lead status: PATCH /api/admin/leads/:id/status
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'leads' && isset($segments[2], $segments[3]) && $segments[3] === 'status' && ($method === 'PATCH' || $method === 'PUT')) {
        $admin = Auth::requireAuth();
        $leadId = $segments[2];
        $input = Security::getJsonInput();
        $newStatus = $input['status'] ?? '';

        $allowedStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'];
        if (!in_array($newStatus, $allowedStatuses, true)) {
            Response::error('Invalid lead status.', 422);
        }

        $lead = Database::fetchOne("SELECT * FROM leads WHERE id = ? LIMIT 1", [$leadId]);
        if (!$lead) {
            Response::notFound('Lead not found.');
        }

        Database::execute(
            "UPDATE leads SET status = ?, updated_at = ? WHERE id = ?",
            [$newStatus, date('Y-m-d H:i:s'), $leadId]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'UPDATE_LEAD_STATUS',
            'entity'    => 'Lead',
            'entityId'  => $leadId,
            'metadata'  => ['oldStatus' => $lead['status'], 'newStatus' => $newStatus]
        ]);

        Response::success(['id' => $leadId, 'status' => $newStatus], 'Lead status updated.');
    }

    // Add note to lead: POST /api/admin/leads/:id/notes
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'leads' && isset($segments[2], $segments[3]) && $segments[3] === 'notes' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $leadId = $segments[2];
        $input = Security::getJsonInput();
        $noteText = Security::sanitizeString($input['note'] ?? '', 2000);

        if (empty($noteText)) {
            Response::error('Note text cannot be empty.', 422);
        }

        $noteId = Database::generateUuid();
        $now = date('Y-m-d H:i:s');
        Database::execute(
            "INSERT INTO lead_notes (id, lead_id, admin_id, author_name, note, created_at) 
             VALUES (?, ?, ?, ?, ?, ?)",
            [$noteId, $leadId, $admin['id'], $admin['name'], $noteText, $now]
        );

        Response::success([
            'id'         => $noteId,
            'leadId'     => $leadId,
            'authorName' => $admin['name'],
            'note'       => $noteText,
            'createdAt'  => $now
        ], 'Note added.', 201);
    }

    // -------------------------------------------------------------------------
    // 13. Administrator Inquiries / Messages API
    // -------------------------------------------------------------------------
    if ($path === '/admin/messages' && $method === 'GET') {
        Auth::requireAuth();

        $status  = $_GET['status'] ?? null;
        $isRead  = isset($_GET['isRead']) ? (($_GET['isRead'] === 'true' || $_GET['isRead'] === '1') ? 1 : 0) : null;
        $search  = $_GET['search'] ?? null;
        $page    = max(1, (int)($_GET['page'] ?? 1));
        $limit   = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset  = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if ($status) {
            $where[] = "status = ?";
            $params[] = $status;
        }
        if ($isRead !== null) {
            $where[] = $isRead ? "status != 'UNREAD'" : "status = 'UNREAD'";
        }
        if ($search) {
            $where[] = "(name LIKE ? OR email LIKE ? OR inquiry_id LIKE ? OR message LIKE ?)";
            $s = "%{$search}%";
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM contact_messages {$whereClause}", $params);
        $messages = Database::fetchAll(
            "SELECT id, inquiry_id as inquiryId, name, email, phone, company, service, budget, message, status, created_at as createdAt, updated_at as updatedAt 
             FROM contact_messages {$whereClause} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        Response::success($messages, 'Messages fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // Mark message read: PATCH /api/admin/messages/:id/read or /api/admin/messages/:id/status
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'messages' && isset($segments[2]) && ($method === 'PATCH' || $method === 'PUT')) {
        Auth::requireAuth();
        $msgId = $segments[2];
        $input = Security::getJsonInput();

        $status = $input['status'] ?? null;
        if (isset($input['isRead'])) {
            $status = $input['isRead'] ? 'READ' : 'UNREAD';
        }
        if (!$status) {
            $status = 'READ';
        }

        Database::execute(
            "UPDATE contact_messages SET status = ?, updated_at = ? WHERE id = ?",
            [$status, date('Y-m-d H:i:s'), $msgId]
        );

        Response::success(['id' => $msgId, 'status' => $status], 'Message updated.');
    }

    // Delete message: DELETE /api/admin/messages/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'messages' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        $msgId = $segments[2];
        Database::execute("DELETE FROM contact_messages WHERE id = ?", [$msgId]);
        Response::success(null, 'Message deleted.');
    }

    // -------------------------------------------------------------------------
    // 14. Administrator Services CRUD API
    // -------------------------------------------------------------------------
    if ($path === '/admin/services' && $method === 'GET') {
        Auth::requireAuth();
        $services = Database::fetchAll("SELECT * FROM services ORDER BY sort_order ASC");
        foreach ($services as &$srv) {
            $srv['features'] = Database::fetchAll("SELECT * FROM service_features WHERE service_id = ? ORDER BY sort_order ASC", [$srv['id']]);
            $srv['benefits'] = Database::fetchAll("SELECT * FROM service_benefits WHERE service_id = ? ORDER BY sort_order ASC", [$srv['id']]);
            $srv['processSteps'] = Database::fetchAll("SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY sort_order ASC", [$srv['id']]);
            $srv['faqs'] = Database::fetchAll("SELECT * FROM service_faqs WHERE service_id = ? ORDER BY sort_order ASC", [$srv['id']]);
        }
        Response::success($services);
    }

    // Service detail
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'services' && isset($segments[2]) && !isset($segments[3]) && $method === 'GET') {
        Auth::requireAuth();
        $srvId = $segments[2];
        $srv = Database::fetchOne("SELECT * FROM services WHERE id = ? LIMIT 1", [$srvId]);
        if (!$srv) {
            Response::notFound('Service not found.');
        }
        $srv['features'] = Database::fetchAll("SELECT * FROM service_features WHERE service_id = ? ORDER BY sort_order ASC", [$srvId]);
        $srv['benefits'] = Database::fetchAll("SELECT * FROM service_benefits WHERE service_id = ? ORDER BY sort_order ASC", [$srvId]);
        $srv['processSteps'] = Database::fetchAll("SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY sort_order ASC", [$srvId]);
        $srv['faqs'] = Database::fetchAll("SELECT * FROM service_faqs WHERE service_id = ? ORDER BY sort_order ASC", [$srvId]);
        Response::success($srv);
    }

    // Create service: POST /api/admin/services
    if ($path === '/admin/services' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $input = Security::getJsonInput();

        $title = Security::sanitizeString($input['title'] ?? '', 255);
        $slug  = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? '')));
        if (empty($title) || empty($slug)) {
            Response::error('Title and unique slug are required.', 422);
        }

        // Check unique slug
        $existing = Database::fetchOne("SELECT id FROM services WHERE slug = ? LIMIT 1", [$slug]);
        if ($existing) {
            Response::error("Slug '{$slug}' is already taken.", 400);
        }

        $srvId = Database::generateUuid();
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO services (id, title, slug, category, short_description, long_description, hero_image, icon, status, featured, sort_order, metrics_label, metrics_value, gradient, seo_title, meta_description, focus_keyword, canonical_url, og_image, no_index, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $srvId,
                $title,
                $slug,
                $input['category'] ?? 'Marketing',
                $input['shortDescription'] ?? $input['short_description'] ?? '',
                $input['longDescription'] ?? $input['long_description'] ?? '',
                $input['heroImage'] ?? $input['hero_image'] ?? null,
                $input['icon'] ?? 'Sparkles',
                $input['status'] ?? 'PUBLISHED',
                !empty($input['featured']) ? 1 : 0,
                (int)($input['sortOrder'] ?? $input['sort_order'] ?? 0),
                $input['metricsLabel'] ?? $input['metrics_label'] ?? null,
                $input['metricsValue'] ?? $input['metrics_value'] ?? null,
                $input['gradient'] ?? 'from-violet-600 to-blue-600',
                $input['seoTitle'] ?? $input['seo_title'] ?? null,
                $input['metaDescription'] ?? $input['meta_description'] ?? null,
                $input['focusKeyword'] ?? $input['focus_keyword'] ?? null,
                $input['canonicalUrl'] ?? $input['canonical_url'] ?? null,
                $input['ogImage'] ?? $input['og_image'] ?? null,
                !empty($input['noIndex']) ? 1 : 0,
                $now,
                $now
            ]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'CREATE_SERVICE',
            'entity'    => 'Service',
            'entityId'  => $srvId
        ]);

        Response::success(['id' => $srvId, 'slug' => $slug], 'Service created.', 201);
    }

    // Update service: PUT /api/admin/services/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'services' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        $admin = Auth::requireAuth();
        $srvId = $segments[2];
        $input = Security::getJsonInput();

        $srv = Database::fetchOne("SELECT * FROM services WHERE id = ? LIMIT 1", [$srvId]);
        if (!$srv) {
            Response::notFound('Service not found.');
        }

        $title = Security::sanitizeString($input['title'] ?? $srv['title'], 255);
        $slug  = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? $srv['slug'])));

        // Check slug collision
        $collision = Database::fetchOne("SELECT id FROM services WHERE slug = ? AND id != ? LIMIT 1", [$slug, $srvId]);
        if ($collision) {
            Response::error("Slug '{$slug}' is already in use by another service.", 400);
        }

        Database::execute(
            "UPDATE services SET title = ?, slug = ?, category = ?, short_description = ?, long_description = ?, hero_image = ?, icon = ?, status = ?, featured = ?, sort_order = ?, metrics_label = ?, metrics_value = ?, gradient = ?, seo_title = ?, meta_description = ?, focus_keyword = ?, canonical_url = ?, og_image = ?, no_index = ?, updated_at = ? WHERE id = ?",
            [
                $title,
                $slug,
                $input['category'] ?? $srv['category'],
                $input['shortDescription'] ?? $input['short_description'] ?? $srv['short_description'],
                $input['longDescription'] ?? $input['long_description'] ?? $srv['long_description'],
                $input['heroImage'] ?? $input['hero_image'] ?? $srv['hero_image'],
                $input['icon'] ?? $srv['icon'],
                $input['status'] ?? $srv['status'],
                isset($input['featured']) ? ($input['featured'] ? 1 : 0) : $srv['featured'],
                isset($input['sortOrder']) ? (int)$input['sortOrder'] : (isset($input['sort_order']) ? (int)$input['sort_order'] : $srv['sort_order']),
                $input['metricsLabel'] ?? $input['metrics_label'] ?? $srv['metrics_label'],
                $input['metricsValue'] ?? $input['metrics_value'] ?? $srv['metrics_value'],
                $input['gradient'] ?? $srv['gradient'],
                $input['seoTitle'] ?? $input['seo_title'] ?? $srv['seo_title'],
                $input['metaDescription'] ?? $input['meta_description'] ?? $srv['meta_description'],
                $input['focusKeyword'] ?? $input['focus_keyword'] ?? $srv['focus_keyword'],
                $input['canonicalUrl'] ?? $input['canonical_url'] ?? $srv['canonical_url'],
                $input['ogImage'] ?? $input['og_image'] ?? $srv['og_image'],
                isset($input['noIndex']) ? ($input['noIndex'] ? 1 : 0) : $srv['no_index'],
                date('Y-m-d H:i:s'),
                $srvId
            ]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'UPDATE_SERVICE',
            'entity'    => 'Service',
            'entityId'  => $srvId
        ]);

        Response::success(['id' => $srvId, 'slug' => $slug], 'Service updated.');
    }

    // Delete service: DELETE /api/admin/services/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'services' && isset($segments[2]) && $method === 'DELETE') {
        $admin = Auth::requireAuth();
        $srvId = $segments[2];
        Database::execute("DELETE FROM services WHERE id = ?", [$srvId]);
        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'DELETE_SERVICE',
            'entity'    => 'Service',
            'entityId'  => $srvId
        ]);
        Response::success(null, 'Service deleted.');
    }

    // -------------------------------------------------------------------------
    // 15. Administrator Blog CMS API
    // -------------------------------------------------------------------------
    // Internal links destinations: GET /api/admin/blog/internal-links/destinations
    if ($path === '/admin/blog/internal-links/destinations' && $method === 'GET') {
        Auth::requireAuth();

        $corePages = [
            ['id' => 'page-home', 'title' => 'Home Page', 'url' => '/', 'type' => 'Site Page'],
            ['id' => 'page-services', 'title' => 'Services Overview', 'url' => '/services', 'type' => 'Site Page'],
            ['id' => 'page-about', 'title' => 'About Us', 'url' => '/about', 'type' => 'Site Page'],
            ['id' => 'page-blog', 'title' => 'Blog Listing', 'url' => '/blog', 'type' => 'Site Page'],
            ['id' => 'page-contact', 'title' => 'Contact & Consultation', 'url' => '/contact', 'type' => 'Site Page']
        ];

        $services = Database::fetchAll("SELECT id, title, slug, category FROM services WHERE status = 'PUBLISHED' ORDER BY title ASC");
        $serviceLinks = array_map(fn($s) => [
            'id'    => $s['id'],
            'title' => "{$s['title']} ({$s['category']})",
            'url'   => "/services/{$s['slug']}",
            'type'  => 'Service Page'
        ], $services);

        $posts = Database::fetchAll("SELECT id, title, slug FROM blog_posts WHERE status = 'PUBLISHED' ORDER BY title ASC");
        $blogLinks = array_map(fn($p) => [
            'id'    => $p['id'],
            'title' => $p['title'],
            'url'   => "/blog/{$p['slug']}",
            'type'  => 'Blog Article'
        ], $posts);

        Response::success(array_merge($corePages, $serviceLinks, $blogLinks));
    }

    // Blog Categories (Admin)
    if (($path === '/admin/blog/categories/all' || $path === '/admin/blog/categories') && $method === 'GET') {
        Auth::requireAuth();
        $cats = Database::fetchAll("SELECT * FROM blog_categories ORDER BY sort_order ASC, name ASC");
        Response::success($cats);
    }
    if ($path === '/admin/blog/categories' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();
        $name = Security::sanitizeString($input['name'] ?? '', 100);
        $slug = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? '')));
        if (empty($slug)) {
            $slug = preg_replace('/[^a-z0-9_-]/', '-', strtolower($name));
        }
        $desc = Security::sanitizeString($input['description'] ?? '', 500);

        $id = Database::generateUuid();
        $now = date('Y-m-d H:i:s');
        Database::execute(
            "INSERT INTO blog_categories (id, name, slug, description, sort_order, created_at, updated_at) 
             VALUES (?, ?, ?, ?, 0, ?, ?)",
            [$id, $name, $slug, $desc, $now, $now]
        );
        Response::success(['id' => $id, 'name' => $name, 'slug' => $slug], 'Category created', 201);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && ($segments[2] ?? '') === 'categories' && isset($segments[3]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM blog_categories WHERE id = ?", [$segments[3]]);
        Response::success(null, 'Category deleted');
    }

    // Blog Tags (Admin)
    if (($path === '/admin/blog/tags/all' || $path === '/admin/blog/tags') && $method === 'GET') {
        Auth::requireAuth();
        $tags = Database::fetchAll("SELECT * FROM blog_tags ORDER BY name ASC");
        Response::success($tags);
    }
    if ($path === '/admin/blog/tags' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();
        $name = Security::sanitizeString($input['name'] ?? '', 100);
        $slug = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? $name)));

        $id = Database::generateUuid();
        $now = date('Y-m-d H:i:s');
        Database::execute("INSERT INTO blog_tags (id, name, slug, created_at, updated_at) VALUES (?, ?, ?, ?, ?)", [$id, $name, $slug, $now, $now]);
        Response::success(['id' => $id, 'name' => $name, 'slug' => $slug], 'Tag created', 201);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && ($segments[2] ?? '') === 'tags' && isset($segments[3]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM blog_tags WHERE id = ?", [$segments[3]]);
        Response::success(null, 'Tag deleted');
    }

    // Blog Authors (Admin)
    if (($path === '/admin/blog/authors/all' || $path === '/admin/blog/authors') && $method === 'GET') {
        Auth::requireAuth();
        $authors = Database::fetchAll("SELECT * FROM authors ORDER BY name ASC");
        Response::success($authors);
    }
    if ($path === '/admin/blog/authors' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();
        $id = Database::generateUuid();
        $now = date('Y-m-d H:i:s');
        Database::execute(
            "INSERT INTO authors (id, name, role, bio, avatar, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [$id, $input['name'] ?? '', $input['role'] ?? null, $input['bio'] ?? null, $input['avatar'] ?? null, $input['email'] ?? null, $now, $now]
        );
        Response::success(['id' => $id], 'Author created', 201);
    }

    // Blog Posts List (Admin): GET /api/admin/blog
    if ($path === '/admin/blog' && $method === 'GET') {
        Auth::requireAuth();

        $search     = $_GET['search'] ?? null;
        $status     = $_GET['status'] ?? null;
        $categoryId = $_GET['categoryId'] ?? null;
        $author     = $_GET['author'] ?? null;
        $featured   = isset($_GET['featured']) ? (($_GET['featured'] === 'true' || $_GET['featured'] === '1') ? 1 : 0) : null;
        $page       = max(1, (int)($_GET['page'] ?? 1));
        $limit      = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset     = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if ($status && $status !== 'ALL') {
            $where[] = "p.status = ?";
            $params[] = $status;
        }
        if ($categoryId && $categoryId !== 'ALL') {
            $where[] = "p.category_id = ?";
            $params[] = $categoryId;
        }
        if ($author && $author !== 'ALL') {
            $where[] = "p.author LIKE ?";
            $params[] = "%{$author}%";
        }
        if ($featured !== null) {
            $where[] = "p.featured = ?";
            $params[] = $featured;
        }
        if ($search) {
            $where[] = "(p.title LIKE ? OR p.slug LIKE ? OR p.excerpt LIKE ?)";
            $s = "%{$search}%";
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM blog_posts p {$whereClause}", $params);

        $posts = Database::fetchAll(
            "SELECT p.*, c.name as category_name, c.slug as category_slug 
             FROM blog_posts p 
             LEFT JOIN blog_categories c ON p.category_id = c.id 
             {$whereClause} 
             ORDER BY p.created_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        foreach ($posts as &$post) {
            $formatPostRecord($post);
            $post['category'] = !empty($post['category_id']) ? [
                'id'   => $post['category_id'],
                'name' => $post['category_name'] ?? 'General',
                'slug' => $post['category_slug'] ?? 'general'
            ] : null;

            $post['postTags'] = Database::fetchAll(
                "SELECT t.id, t.name, t.slug FROM blog_tags t 
                 INNER JOIN blog_post_tags pt ON pt.tag_id = t.id 
                 WHERE pt.post_id = ?",
                [$post['id']]
            );
        }

        Response::success($posts, 'Posts fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // Blog Post Detail (Admin): GET /api/admin/blog/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && isset($segments[2]) && !in_array($segments[2], ['categories', 'tags', 'authors', 'internal-links'], true) && !isset($segments[3]) && $method === 'GET') {
        Auth::requireAuth();
        $postId = $segments[2];

        $post = Database::fetchOne(
            "SELECT p.*, c.name as category_name, c.slug as category_slug 
             FROM blog_posts p 
             LEFT JOIN blog_categories c ON p.category_id = c.id 
             WHERE p.id = ? LIMIT 1",
            [$postId]
        );

        if (!$post) {
            Response::notFound('Article not found.');
        }

        $formatPostRecord($post);

        $post['category'] = !empty($post['category_id']) ? [
            'id'   => $post['category_id'],
            'name' => $post['category_name'] ?? 'General',
            'slug' => $post['category_slug'] ?? 'general'
        ] : null;

        $post['tags'] = Database::fetchAll(
            "SELECT t.* FROM blog_tags t 
             INNER JOIN blog_post_tags pt ON pt.tag_id = t.id 
             WHERE pt.post_id = ?",
            [$postId]
        );

        $post['revisions'] = Database::fetchAll(
            "SELECT id, post_id as postId, title, author, created_at as createdAt 
             FROM blog_revisions WHERE post_id = ? ORDER BY created_at DESC LIMIT 10",
            [$postId]
        );

        Response::success($post);
    }

    // Blog Post Revisions: GET /api/admin/blog/:id/revisions
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && isset($segments[2], $segments[3]) && $segments[3] === 'revisions' && $method === 'GET') {
        Auth::requireAuth();
        $postId = $segments[2];
        $revisions = Database::fetchAll(
            "SELECT id, post_id as postId, title, content, excerpt, author, created_at as createdAt 
             FROM blog_revisions WHERE post_id = ? ORDER BY created_at DESC LIMIT 20",
            [$postId]
        );
        Response::success($revisions);
    }

    // Create Blog Post: POST /api/admin/blog
    if ($path === '/admin/blog' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $input = Security::getJsonInput();

        $title   = Security::sanitizeString($input['title'] ?? '', 255);
        $slug    = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? '')));
        if (empty($slug)) {
            $slug = preg_replace('/[^a-z0-9_-]/', '-', strtolower($title));
        }
        $excerpt = Security::sanitizeString($input['excerpt'] ?? '', 1000);
        $content = Security::sanitizeHtml($input['content'] ?? '');

        if (empty($title) || empty($slug)) {
            Response::error('Article title and unique slug are required.', 422);
        }

        $existing = Database::fetchOne("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1", [$slug]);
        if ($existing) {
            $slug .= '-' . date('Ymd');
        }

        $postId = Database::generateUuid();
        $status = in_array($input['status'] ?? '', ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'], true) ? $input['status'] : 'PUBLISHED';
        $now = date('Y-m-d H:i:s');
        $pubAt = ($status === 'PUBLISHED') ? ($input['publishedAt'] ?? $now) : null;

        Database::execute(
            "INSERT INTO blog_posts (id, title, slug, excerpt, content, featured_image, featured_image_alt, featured_image_caption, author, author_role, author_bio, author_avatar, read_time, category_id, status, featured, published_at, scheduled_at, seo_title, meta_description, focus_keyword, canonical_url, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image, no_index, related_post_ids, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $postId,
                $title,
                $slug,
                $excerpt,
                $content,
                $input['featuredImage'] ?? null,
                $input['featuredImageAlt'] ?? null,
                $input['featuredImageCaption'] ?? null,
                $input['author'] ?? $admin['name'],
                $input['authorRole'] ?? 'Strategist',
                $input['authorBio'] ?? null,
                $input['authorAvatar'] ?? '/images/avatar-marcus.svg',
                $input['readTime'] ?? '5 min read',
                $input['categoryId'] ?? null,
                $status,
                !empty($input['featured']) ? 1 : 0,
                $pubAt,
                $input['scheduledAt'] ?? null,
                $input['seoTitle'] ?? null,
                $input['metaDescription'] ?? null,
                $input['focusKeyword'] ?? null,
                $input['canonicalUrl'] ?? null,
                $input['ogTitle'] ?? null,
                $input['ogDescription'] ?? null,
                $input['ogImage'] ?? null,
                $input['twitterTitle'] ?? null,
                $input['twitterDescription'] ?? null,
                $input['twitterImage'] ?? null,
                !empty($input['noIndex']) ? 1 : 0,
                !empty($input['relatedPostIds']) ? (is_array($input['relatedPostIds']) ? json_encode($input['relatedPostIds']) : $input['relatedPostIds']) : null,
                $now,
                $now
            ]
        );

        // Tags association
        if (!empty($input['tagIds']) && is_array($input['tagIds'])) {
            foreach ($input['tagIds'] as $tagId) {
                Database::execute(
                    "INSERT IGNORE INTO blog_post_tags (id, post_id, tag_id) VALUES (?, ?, ?)",
                    [Database::generateUuid(), $postId, $tagId]
                );
            }
        }

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'CREATE_BLOG_POST',
            'entity'    => 'BlogPost',
            'entityId'  => $postId
        ]);

        Response::success(['id' => $postId, 'slug' => $slug], 'Article published successfully.', 201);
    }

    // Update Blog Post: PUT /api/admin/blog/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        $admin = Auth::requireAuth();
        $postId = $segments[2];
        $input = Security::getJsonInput();

        $post = Database::fetchOne("SELECT * FROM blog_posts WHERE id = ? LIMIT 1", [$postId]);
        if (!$post) {
            Response::notFound('Article not found.');
        }

        // Save a revision before updating
        Database::execute(
            "INSERT INTO blog_revisions (id, post_id, title, content, excerpt, author, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Database::generateUuid(), $postId, $post['title'], $post['content'], $post['excerpt'], $admin['name'], date('Y-m-d H:i:s')]
        );

        $title   = Security::sanitizeString($input['title'] ?? $post['title'], 255);
        $slug    = preg_replace('/[^a-z0-9_-]/', '-', strtolower(trim($input['slug'] ?? $post['slug'])));
        $excerpt = Security::sanitizeString($input['excerpt'] ?? $post['excerpt'], 1000);
        $content = Security::sanitizeHtml($input['content'] ?? $post['content']);
        $status  = $input['status'] ?? $post['status'];

        Database::execute(
            "UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, featured_image_alt = ?, featured_image_caption = ?, author = ?, author_role = ?, author_bio = ?, author_avatar = ?, read_time = ?, category_id = ?, status = ?, featured = ?, seo_title = ?, meta_description = ?, focus_keyword = ?, canonical_url = ?, og_title = ?, og_description = ?, og_image = ?, twitter_title = ?, twitter_description = ?, twitter_image = ?, no_index = ?, updated_at = ? WHERE id = ?",
            [
                $title,
                $slug,
                $excerpt,
                $content,
                $input['featuredImage'] ?? $post['featured_image'],
                $input['featuredImageAlt'] ?? $post['featured_image_alt'],
                $input['featuredImageCaption'] ?? $post['featured_image_caption'],
                $input['author'] ?? $post['author'],
                $input['authorRole'] ?? $post['author_role'],
                $input['authorBio'] ?? $post['author_bio'],
                $input['authorAvatar'] ?? $post['author_avatar'],
                $input['readTime'] ?? $post['read_time'],
                $input['categoryId'] ?? $post['category_id'],
                $status,
                isset($input['featured']) ? ($input['featured'] ? 1 : 0) : $post['featured'],
                $input['seoTitle'] ?? $post['seo_title'],
                $input['metaDescription'] ?? $post['meta_description'],
                $input['focusKeyword'] ?? $post['focus_keyword'],
                $input['canonicalUrl'] ?? $post['canonical_url'],
                $input['ogTitle'] ?? $post['og_title'],
                $input['ogDescription'] ?? $post['og_description'],
                $input['ogImage'] ?? $post['og_image'],
                $input['twitterTitle'] ?? $post['twitter_title'],
                $input['twitterDescription'] ?? $post['twitter_description'],
                $input['twitterImage'] ?? $post['twitter_image'],
                isset($input['noIndex']) ? ($input['noIndex'] ? 1 : 0) : $post['no_index'],
                date('Y-m-d H:i:s'),
                $postId
            ]
        );

        // Update tags
        if (isset($input['tagIds']) && is_array($input['tagIds'])) {
            Database::execute("DELETE FROM blog_post_tags WHERE post_id = ?", [$postId]);
            foreach ($input['tagIds'] as $tId) {
                Database::execute(
                    "INSERT IGNORE INTO blog_post_tags (id, post_id, tag_id) VALUES (?, ?, ?)",
                    [Database::generateUuid(), $postId, $tId]
                );
            }
        }

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'UPDATE_BLOG_POST',
            'entity'    => 'BlogPost',
            'entityId'  => $postId
        ]);

        Response::success(['id' => $postId, 'slug' => $slug], 'Article updated.');
    }

    // Duplicate blog post: POST /api/admin/blog/:id/duplicate
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && isset($segments[2], $segments[3]) && $segments[3] === 'duplicate' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $srcId = $segments[2];

        $src = Database::fetchOne("SELECT * FROM blog_posts WHERE id = ? LIMIT 1", [$srcId]);
        if (!$src) {
            Response::notFound('Source post not found.');
        }

        $newId = Database::generateUuid();
        $newTitle = $src['title'] . ' (Copy)';
        $newSlug  = $src['slug'] . '-copy-' . time();
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO blog_posts (id, title, slug, excerpt, content, featured_image, featured_image_alt, featured_image_caption, author, author_role, author_bio, author_avatar, read_time, category_id, status, featured, published_at, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'DRAFT', 0, NULL, ?, ?)",
            [
                $newId,
                $newTitle,
                $newSlug,
                $src['excerpt'],
                $src['content'],
                $src['featured_image'],
                $src['featured_image_alt'],
                $src['featured_image_caption'],
                $src['author'],
                $src['author_role'],
                $src['author_bio'],
                $src['author_avatar'],
                $src['read_time'],
                $src['category_id'],
                $now,
                $now
            ]
        );

        Response::success(['id' => $newId, 'slug' => $newSlug], 'Article duplicated as draft.');
    }

    // Delete Blog Post: DELETE /api/admin/blog/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'blog' && isset($segments[2]) && $method === 'DELETE') {
        $admin = Auth::requireAuth();
        $postId = $segments[2];
        Database::execute("DELETE FROM blog_posts WHERE id = ?", [$postId]);

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'DELETE_BLOG_POST',
            'entity'    => 'BlogPost',
            'entityId'  => $postId
        ]);

        Response::success(null, 'Article deleted.');
    }

    // -------------------------------------------------------------------------
    // 16. Administrator Media Library API
    // -------------------------------------------------------------------------
    if ($path === '/admin/media' && $method === 'GET') {
        Auth::requireAuth();

        $search = $_GET['search'] ?? null;
        $page   = max(1, (int)($_GET['page'] ?? 1));
        $limit  = min(100, max(1, (int)($_GET['limit'] ?? 24)));
        $offset = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if ($search) {
            $where[] = "(original_name LIKE ? OR filename LIKE ? OR alt_text LIKE ? OR title LIKE ?)";
            $s = "%{$search}%";
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
            $params[] = $s;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM media {$whereClause}", $params);
        $items = Database::fetchAll(
            "SELECT id, filename, original_name as originalName, mime_type as mimeType, size, url, alt_text as altText, title, caption, description, width, height, uploaded_by as uploadedBy, created_at as createdAt 
             FROM media {$whereClause} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        Response::success($items, 'Media fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // Media Upload: POST /api/admin/media/upload
    if ($path === '/admin/media/upload' && $method === 'POST') {
        $admin = Auth::requireAuth();

        if (empty($_FILES['files']) && empty($_FILES['file'])) {
            Response::error('No files were received in upload request.', 400);
        }

        $rawFiles = $_FILES['files'] ?? $_FILES['file'];
        $metadata = [
            'altText'     => $_POST['altText'] ?? '',
            'title'       => $_POST['title'] ?? '',
            'caption'     => $_POST['caption'] ?? '',
            'description' => $_POST['description'] ?? '',
        ];

        $results = [];

        // Single or multiple file normalization
        if (is_array($rawFiles['name'])) {
            $count = count($rawFiles['name']);
            for ($i = 0; $i < $count; $i++) {
                if ($rawFiles['error'][$i] === UPLOAD_ERR_NO_FILE) {
                    continue;
                }
                $fileItem = [
                    'name'     => $rawFiles['name'][$i],
                    'type'     => $rawFiles['type'][$i],
                    'tmp_name' => $rawFiles['tmp_name'][$i],
                    'error'    => $rawFiles['error'][$i],
                    'size'     => $rawFiles['size'][$i],
                ];
                $results[] = Upload::process($fileItem, $metadata, $admin['name']);
            }
        } else {
            $results[] = Upload::process($rawFiles, $metadata, $admin['name']);
        }

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'MEDIA_UPLOAD',
            'entity'    => 'Media',
            'metadata'  => ['count' => count($results)]
        ]);

        $payloadData = count($results) === 1 ? $results[0] : $results;
        $firstItem = count($results) === 1 ? $results[0] : ($results[0] ?? null);
        $extraPayload = [
            'media' => $payloadData,
            'url'   => $firstItem ? $firstItem['url'] : null,
        ];
        Response::success($payloadData, 'Image uploaded successfully', 201, $extraPayload);
    }

    // Update Media Metadata: PUT /api/admin/media/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'media' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        Auth::requireAuth();
        $mediaId = $segments[2];
        $input = Security::getJsonInput();

        Database::execute(
            "UPDATE media SET alt_text = ?, title = ?, caption = ?, description = ? WHERE id = ?",
            [
                $input['altText'] ?? null,
                $input['title'] ?? null,
                $input['caption'] ?? null,
                $input['description'] ?? null,
                $mediaId
            ]
        );

        Response::success(['id' => $mediaId], 'Media metadata updated.');
    }

    // Delete Media: DELETE /api/admin/media/:id
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'media' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        $mediaId = $segments[2];

        $media = Database::fetchOne("SELECT filename FROM media WHERE id = ? LIMIT 1", [$mediaId]);
        if ($media) {
            $filePath = __DIR__ . '/../uploads/' . $media['filename'];
            if (file_exists($filePath)) {
                @unlink($filePath);
            }
            Database::execute("DELETE FROM media WHERE id = ?", [$mediaId]);
        }

        Response::success(null, 'Media file removed.');
    }

    // -------------------------------------------------------------------------
    // 17. Administrator Testimonials CRUD API
    // -------------------------------------------------------------------------
    if ($path === '/admin/testimonials' && $method === 'GET') {
        Auth::requireAuth();
        $items = Database::fetchAll("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC");
        Response::success($items);
    }
    if ($path === '/admin/testimonials' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();
        $id = Database::generateUuid();
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO testimonials (id, client_name, company, role, review, rating, sort_order, photo, highlight, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $input['clientName'] ?? $input['client_name'] ?? '',
                $input['company'] ?? '',
                $input['role'] ?? '',
                $input['review'] ?? '',
                (int)($input['rating'] ?? 5),
                (int)($input['sortOrder'] ?? $input['sort_order'] ?? 0),
                $input['photo'] ?? null,
                $input['highlight'] ?? null,
                $input['status'] ?? 'APPROVED',
                $now,
                $now
            ]
        );
        Response::success(['id' => $id], 'Testimonial created', 201);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'testimonials' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        Auth::requireAuth();
        $id = $segments[2];
        $input = Security::getJsonInput();

        Database::execute(
            "UPDATE testimonials SET client_name = ?, company = ?, role = ?, review = ?, rating = ?, sort_order = ?, photo = ?, highlight = ?, status = ?, updated_at = ? WHERE id = ?",
            [
                $input['clientName'] ?? $input['client_name'] ?? '',
                $input['company'] ?? '',
                $input['role'] ?? '',
                $input['review'] ?? '',
                (int)($input['rating'] ?? 5),
                (int)($input['sortOrder'] ?? $input['sort_order'] ?? 0),
                $input['photo'] ?? null,
                $input['highlight'] ?? null,
                $input['status'] ?? 'APPROVED',
                date('Y-m-d H:i:s'),
                $id
            ]
        );
        Response::success(['id' => $id], 'Testimonial updated');
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'testimonials' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM testimonials WHERE id = ?", [$segments[2]]);
        Response::success(null, 'Testimonial deleted');
    }

    // -------------------------------------------------------------------------
    // 18. Administrator FAQs CRUD API
    // -------------------------------------------------------------------------
    if ($path === '/admin/faqs' && $method === 'GET') {
        Auth::requireAuth();
        $faqs = Database::fetchAll("SELECT * FROM faqs ORDER BY sort_order ASC, created_at ASC");
        Response::success($faqs);
    }
    if ($path === '/admin/faqs' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();
        $id = Database::generateUuid();
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO faqs (id, question, answer, category, sort_order, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $input['question'] ?? '',
                $input['answer'] ?? '',
                $input['category'] ?? 'General',
                (int)($input['sortOrder'] ?? $input['sort_order'] ?? 0),
                $input['status'] ?? 'PUBLISHED',
                $now,
                $now
            ]
        );
        Response::success(['id' => $id], 'FAQ created', 201);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'faqs' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        Auth::requireAuth();
        $id = $segments[2];
        $input = Security::getJsonInput();

        Database::execute(
            "UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, status = ?, updated_at = ? WHERE id = ?",
            [
                $input['question'] ?? '',
                $input['answer'] ?? '',
                $input['category'] ?? 'General',
                (int)($input['sortOrder'] ?? $input['sort_order'] ?? 0),
                $input['status'] ?? 'PUBLISHED',
                date('Y-m-d H:i:s'),
                $id
            ]
        );
        Response::success(['id' => $id], 'FAQ updated');
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'faqs' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM faqs WHERE id = ?", [$segments[2]]);
        Response::success(null, 'FAQ deleted');
    }

    // -------------------------------------------------------------------------
    // 19. Administrator Newsletter Subscribers API
    // -------------------------------------------------------------------------
    if ($path === '/admin/newsletter' && $method === 'GET') {
        Auth::requireAuth();

        $status = $_GET['status'] ?? null;
        $search = $_GET['search'] ?? null;
        $page   = max(1, (int)($_GET['page'] ?? 1));
        $limit  = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;

        $where = [];
        $params = [];
        if ($status && $status !== 'ALL') {
            $where[] = "status = ?";
            $params[] = $status;
        }
        if ($search) {
            $where[] = "(email LIKE ? OR name LIKE ?)";
            $s = "%{$search}%";
            $params[] = $s;
            $params[] = $s;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM newsletter_subscribers {$whereClause}", $params);
        $subs = Database::fetchAll(
            "SELECT id, email, name, status, source, subscribed_at as subscribedAt, unsubscribed_at as unsubscribedAt, created_at as createdAt 
             FROM newsletter_subscribers {$whereClause} ORDER BY subscribed_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        Response::success($subs, 'Subscribers fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'newsletter' && isset($segments[2], $segments[3]) && $segments[3] === 'status' && ($method === 'PATCH' || $method === 'PUT')) {
        Auth::requireAuth();
        $id = $segments[2];
        $input = Security::getJsonInput();
        $status = $input['status'] ?? 'SUBSCRIBED';
        $unsubAt = ($status === 'UNSUBSCRIBED') ? date('Y-m-d H:i:s') : null;

        Database::execute(
            "UPDATE newsletter_subscribers SET status = ?, unsubscribed_at = ?, updated_at = ? WHERE id = ?",
            [$status, $unsubAt, date('Y-m-d H:i:s'), $id]
        );
        Response::success(['id' => $id, 'status' => $status], 'Subscriber status updated');
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'newsletter' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM newsletter_subscribers WHERE id = ?", [$segments[2]]);
        Response::success(null, 'Subscriber removed');
    }

    // -------------------------------------------------------------------------
    // 20. Administrator SEO Configurations API
    // -------------------------------------------------------------------------
    if ($path === '/admin/seo' && $method === 'GET') {
        Auth::requireAuth();
        $configs = Database::fetchAll("SELECT * FROM seo_metadata ORDER BY page_path ASC");
        Response::success($configs);
    }
    if ($path === '/admin/seo' && $method === 'POST') {
        Auth::requireAuth();
        $input = Security::getJsonInput();

        $pagePath = '/' . ltrim($input['pagePath'] ?? $input['page_path'] ?? '', '/');
        $seoTitle = Security::sanitizeString($input['seoTitle'] ?? $input['seo_title'] ?? '', 255);
        $metaDesc = Security::sanitizeString($input['metaDescription'] ?? $input['meta_description'] ?? '', 1000);

        if (empty($pagePath) || empty($seoTitle)) {
            Response::error('Page path and SEO Title are required.', 422);
        }

        $existing = Database::fetchOne("SELECT id FROM seo_metadata WHERE page_path = ? LIMIT 1", [$pagePath]);
        $now = date('Y-m-d H:i:s');

        if ($existing) {
            Database::execute(
                "UPDATE seo_metadata SET seo_title = ?, meta_description = ?, focus_keyword = ?, canonical_url = ?, og_title = ?, og_description = ?, og_image = ?, twitter_title = ?, twitter_description = ?, twitter_image = ?, no_index = ?, updated_at = ? WHERE page_path = ?",
                [
                    $seoTitle,
                    $metaDesc,
                    $input['focusKeyword'] ?? $input['focus_keyword'] ?? null,
                    $input['canonicalUrl'] ?? $input['canonical_url'] ?? null,
                    $input['ogTitle'] ?? $input['og_title'] ?? null,
                    $input['ogDescription'] ?? $input['og_description'] ?? null,
                    $input['ogImage'] ?? $input['og_image'] ?? null,
                    $input['twitterTitle'] ?? $input['twitter_title'] ?? null,
                    $input['twitterDescription'] ?? $input['twitter_description'] ?? null,
                    $input['twitterImage'] ?? $input['twitter_image'] ?? null,
                    !empty($input['noIndex']) ? 1 : 0,
                    $now,
                    $pagePath
                ]
            );
            $seoId = $existing['id'];
        } else {
            $seoId = Database::generateUuid();
            Database::execute(
                "INSERT INTO seo_metadata (id, page_path, seo_title, meta_description, focus_keyword, canonical_url, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image, no_index, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    $seoId,
                    $pagePath,
                    $seoTitle,
                    $metaDesc,
                    $input['focusKeyword'] ?? $input['focus_keyword'] ?? null,
                    $input['canonicalUrl'] ?? $input['canonical_url'] ?? null,
                    $input['ogTitle'] ?? $input['og_title'] ?? null,
                    $input['ogDescription'] ?? $input['og_description'] ?? null,
                    $input['ogImage'] ?? $input['og_image'] ?? null,
                    $input['twitterTitle'] ?? $input['twitter_title'] ?? null,
                    $input['twitterDescription'] ?? $input['twitter_description'] ?? null,
                    $input['twitterImage'] ?? $input['twitter_image'] ?? null,
                    !empty($input['noIndex']) ? 1 : 0,
                    $now,
                    $now
                ]
            );
        }

        Response::success(['id' => $seoId, 'pagePath' => $pagePath], 'SEO configuration saved.');
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'seo' && isset($segments[2]) && $method === 'DELETE') {
        Auth::requireAuth();
        Database::execute("DELETE FROM seo_metadata WHERE id = ?", [$segments[2]]);
        Response::success(null, 'SEO configuration removed.');
    }

    // -------------------------------------------------------------------------
    // 21. Administrator Site Settings API
    // -------------------------------------------------------------------------
    if ($path === '/admin/settings' && $method === 'GET') {
        Auth::requireAuth();
        $list = Database::fetchAll("SELECT * FROM site_settings ORDER BY `group` ASC, `key` ASC");
        $dict = [];
        foreach ($list as $item) {
            $dict[$item['key']] = $item['value'];
        }
        Response::success(['list' => $list, 'settings' => $dict]);
    }
    if ($path === '/admin/settings' && ($method === 'PUT' || $method === 'POST')) {
        $admin = Auth::requireAuth();
        $input = Security::getJsonInput();
        $settings = $input['settings'] ?? $input;

        if (is_array($settings)) {
            $now = date('Y-m-d H:i:s');
            foreach ($settings as $key => $val) {
                if (!is_string($key)) continue;
                $valStr = is_string($val) ? $val : (is_scalar($val) ? (string)$val : json_encode($val));
                $group = str_starts_with($key, 'contact_') ? 'contact'
                       : (str_starts_with($key, 'social_') ? 'social'
                       : (str_starts_with($key, 'seo_') ? 'seo'
                       : (str_starts_with($key, 'analytics_') ? 'analytics' : 'general')));

                $existing = Database::fetchOne("SELECT id FROM site_settings WHERE `key` = ? LIMIT 1", [$key]);
                if ($existing) {
                    Database::execute("UPDATE site_settings SET value = ?, updated_at = ? WHERE `key` = ?", [$valStr, $now, $key]);
                } else {
                    Database::execute(
                        "INSERT INTO site_settings (id, `key`, value, `group`, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                        [Database::generateUuid(), $key, $valStr, $group, $now, $now]
                    );
                }
            }
        }

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'SETTINGS_UPDATE',
            'entity'    => 'SiteSetting'
        ]);

        Response::success($settings, 'Settings updated successfully.');
    }

    // -------------------------------------------------------------------------
    // 22. Administrator Activity Logs API
    // -------------------------------------------------------------------------
    if ($path === '/admin/activity-logs' && $method === 'GET') {
        Auth::requireAuth();

        $action = $_GET['action'] ?? null;
        $entity = $_GET['entity'] ?? null;
        $page   = max(1, (int)($_GET['page'] ?? 1));
        $limit  = min(100, max(1, (int)($_GET['limit'] ?? 30)));
        $offset = ($page - 1) * $limit;

        $where = [];
        $params = [];
        if ($action) {
            $where[] = "action = ?";
            $params[] = $action;
        }
        if ($entity) {
            $where[] = "entity = ?";
            $params[] = $entity;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM activity_logs {$whereClause}", $params);
        $logs = Database::fetchAll(
            "SELECT id, admin_id as adminId, admin_name as adminName, action, entity, entity_id as entityId, metadata, timestamp 
             FROM activity_logs {$whereClause} ORDER BY timestamp DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        Response::success($logs, 'Logs fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // -------------------------------------------------------------------------
    // 23. Administrator Users API
    // -------------------------------------------------------------------------
    if ($path === '/admin/users' && $method === 'GET') {
        Auth::requireRole('SUPER_ADMIN', 'ADMIN');
        $users = Database::fetchAll(
            "SELECT id, name, email, role, is_active as isActive, last_login as lastLogin, created_at as createdAt 
             FROM admin_users ORDER BY created_at ASC"
        );
        Response::success($users);
    }
    if ($path === '/admin/users' && $method === 'POST') {
        $admin = Auth::requireRole('SUPER_ADMIN');
        $input = Security::getJsonInput();

        $name     = Security::sanitizeString($input['name'] ?? '', 150);
        $email    = strtolower(trim($input['email'] ?? ''));
        $password = $input['password'] ?? '';
        $role     = in_array($input['role'] ?? '', ['SUPER_ADMIN', 'ADMIN', 'EDITOR'], true) ? $input['role'] : 'ADMIN';

        if (empty($name) || !Security::isValidEmail($email) || strlen($password) < 8) {
            Response::error('Please provide valid name, email, and password (at least 8 chars).', 422);
        }

        $existing = Database::fetchOne("SELECT id FROM admin_users WHERE email = ? LIMIT 1", [$email]);
        if ($existing) {
            Response::error('An administrator with this email already exists.', 400);
        }

        $id = Database::generateUuid();
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO admin_users (id, name, email, password_hash, role, is_active, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, 1, ?, ?)",
            [$id, $name, $email, $hash, $role, $now, $now]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'CREATE_ADMIN_USER',
            'entity'    => 'AdminUser',
            'entityId'  => $id
        ]);

        Response::success(['id' => $id, 'name' => $name, 'email' => $email, 'role' => $role], 'Admin created', 201);
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'users' && isset($segments[2]) && ($method === 'PUT' || $method === 'POST')) {
        $admin = Auth::requireRole('SUPER_ADMIN');
        $targetId = $segments[2];
        $input = Security::getJsonInput();

        $updates = [];
        $params = [];

        if (!empty($input['name'])) {
            $updates[] = "name = ?";
            $params[] = Security::sanitizeString($input['name'], 150);
        }
        if (!empty($input['email']) && Security::isValidEmail($input['email'])) {
            $updates[] = "email = ?";
            $params[] = strtolower(trim($input['email']));
        }
        if (!empty($input['role']) && in_array($input['role'], ['SUPER_ADMIN', 'ADMIN', 'EDITOR'], true)) {
            $updates[] = "role = ?";
            $params[] = $input['role'];
        }
        if (isset($input['isActive'])) {
            $updates[] = "is_active = ?";
            $params[] = $input['isActive'] ? 1 : 0;
        }
        if (!empty($input['password']) && strlen($input['password']) >= 8) {
            $updates[] = "password_hash = ?";
            $params[] = password_hash($input['password'], PASSWORD_BCRYPT, ['cost' => 12]);
        }

        if (!empty($updates)) {
            $updates[] = "updated_at = ?";
            $params[] = date('Y-m-d H:i:s');
            $params[] = $targetId;
            Database::execute("UPDATE admin_users SET " . implode(', ', $updates) . " WHERE id = ?", $params);
        }

        Response::success(['id' => $targetId], 'User updated.');
    }
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'users' && isset($segments[2]) && $method === 'DELETE') {
        $admin = Auth::requireRole('SUPER_ADMIN');
        $targetId = $segments[2];

        if ($targetId === $admin['id']) {
            Response::error('You cannot delete your own administrative account.', 400);
        }

        Database::execute("DELETE FROM admin_users WHERE id = ?", [$targetId]);
        Response::success(null, 'Administrator removed.');
    }

    // -------------------------------------------------------------------------
    // Fallback: 404 Endpoint Not Found
    // -------------------------------------------------------------------------
    Response::notFound("API endpoint '{$method} /api{$path}' was not found.");

} catch (Throwable $e) {
    error_log("[API Server Exception] " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    Response::serverError($e->getMessage());
}
