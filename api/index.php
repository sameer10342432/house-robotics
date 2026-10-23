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

        // 1. Anti-spam honeypot defense (silent trap)
        $honeypot = trim($input['hp_field'] ?? '');
        if (!empty($honeypot)) {
            error_log('[SPAM TRAP] Honeypot field filled by remote bot: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
            $fakeInq = sprintf('HR-INQ-%s-%04d', date('Ymd'), mt_rand(1000, 9999));
            Response::success(['id' => Database::generateUuid(), 'inquiryId' => $fakeInq, 'receivedAt' => date('Y-m-d H:i:s')], 'Inquiry submitted successfully', 201);
        }

        // 2. Minimum form fill-out duration (anti-bot speed check)
        $formRenderTime = $input['formRenderTime'] ?? null;
        if ($formRenderTime && is_numeric($formRenderTime)) {
            $durationMs = (time() * 1000) - (float)$formRenderTime;
            if ($durationMs > 0 && $durationMs < 1200) {
                Response::error('Submission received unusually quickly. Please review your details and submit again.', 422, ['speed' => 'Too fast']);
            }
        }

        $name       = Security::sanitizeString($input['name'] ?? '', 100);
        $email      = strtolower(trim($input['email'] ?? ''));
        $phone      = Security::sanitizeString($input['phone'] ?? '', 50);
        $company    = Security::sanitizeString($input['company'] ?? '', 150);
        $websiteUrl = Security::sanitizeString($input['websiteUrl'] ?? $input['website_url'] ?? '', 255);
        $city       = Security::sanitizeString($input['city'] ?? '', 100);
        $state      = Security::sanitizeString($input['state'] ?? '', 100);
        $service    = Security::sanitizeString($input['service'] ?? 'General Digital Marketing', 100);
        $budget     = Security::sanitizeString($input['budget'] ?? 'Not specified', 100);
        $timeline   = Security::sanitizeString($input['timeline'] ?? '', 100);
        $rawMessage = trim($input['message'] ?? '');
        $message    = !empty($rawMessage) 
            ? Security::sanitizeString($rawMessage, 3000) 
            : Security::sanitizeString("Prospective client requested a strategic consultation regarding {$service}.", 1000);
        
        $serviceDetailsRaw = $input['serviceDetails'] ?? $input['service_details'] ?? null;
        $serviceDetails = !empty($serviceDetailsRaw) 
            ? (is_string($serviceDetailsRaw) ? Security::sanitizeString($serviceDetailsRaw, 4000) : json_encode($serviceDetailsRaw, JSON_UNESCAPED_SLASHES))
            : null;

        $consentGiven = isset($input['consentGiven']) ? ($input['consentGiven'] ? 1 : 0) : 1;
        
        $page    = Security::sanitizeString($input['page'] ?? $input['page_url'] ?? $input['pageUrl'] ?? $_SERVER['HTTP_REFERER'] ?? 'https://houserobotics.online/', 500);
        $referrer = Security::sanitizeString($input['referrer'] ?? $_SERVER['HTTP_REFERER'] ?? '', 500);
        $source  = Security::sanitizeString($input['source'] ?? ($path === '/consultation' ? 'Consultation Modal' : (str_contains($page, '/usa/') ? 'USA Location Landing Page' : 'Website Inquiry Form')), 100);
        $utmSource   = Security::sanitizeString($input['utm_source'] ?? $input['utmSource'] ?? '', 100);
        $utmMedium   = Security::sanitizeString($input['utm_medium'] ?? $input['utmMedium'] ?? '', 100);
        $utmCampaign = Security::sanitizeString($input['utm_campaign'] ?? $input['utmCampaign'] ?? '', 100);
        $utmContent  = Security::sanitizeString($input['utm_content'] ?? $input['utmContent'] ?? '', 100);
        $utmTerm     = Security::sanitizeString($input['utm_term'] ?? $input['utmTerm'] ?? '', 100);
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

        // 3. Duplicate submission prevention (60-second window)
        $recentDuplicate = Database::fetchOne(
            "SELECT id, inquiry_id as inquiryId, created_at as createdAt 
             FROM leads WHERE email = ? AND service = ? AND created_at >= (NOW() - INTERVAL 60 SECOND) LIMIT 1",
            [$email, $service]
        );

        if ($recentDuplicate) {
            Response::success([
                'id'          => $recentDuplicate['id'],
                'inquiryId'   => $recentDuplicate['inquiryId'],
                'receivedAt'  => $recentDuplicate['createdAt'],
                'isDuplicate' => true
            ], 'Your inquiry has already been received. Our strategy team is currently reviewing your brief.', 200);
        }

        // Generate Inquiry ID: HR-INQ-YYYYMMDD-XXXX
        $inquiryId = sprintf('HR-INQ-%s-%04d', date('Ymd'), mt_rand(1000, 9999));
        $now = date('Y-m-d H:i:s');
        $msgId = Database::generateUuid();
        $leadId = Database::generateUuid();

        // 4. Save Contact Message in MySQL
        Database::execute(
            "INSERT INTO contact_messages (id, inquiry_id, name, email, phone, company, website_url, city, state, service, budget, timeline, message, service_details, consent_given, page_url, referrer, ip_address, user_agent, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'UNREAD', ?, ?)",
            [$msgId, $inquiryId, $name, $email, $phone, $company, $websiteUrl, $city, $state, $service, $budget, $timeline, $message, $serviceDetails, $consentGiven, $page, $referrer, $ip, $userAgent, $now, $now]
        );

        // 5. Automatically Create CRM Lead in MySQL (Immediately visible in Admin Panel)
        Database::execute(
            "INSERT INTO leads (id, inquiry_id, name, email, phone, company, website_url, city, state, service, budget, timeline, message, service_details, consent_given, page_url, referrer, ip_address, user_agent, utm_source, utm_medium, utm_campaign, utm_content, utm_term, source, status, score, follow_up_status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', 60, 'NONE', ?, ?)",
            [$leadId, $inquiryId, $name, $email, $phone, $company, $websiteUrl, $city, $state, $service, $budget, $timeline, $message, $serviceDetails, $consentGiven, $page, $referrer, $ip, $userAgent, $utmSource, $utmMedium, $utmCampaign, $utmContent, $utmTerm, $source, $now, $now]
        );

        // If from USA location page, increment lead counter
        if (str_contains($page, '/usa/')) {
            try {
                $cleanPath = '/' . trim(parse_url($page, PHP_URL_PATH) ?? '', '/');
                Database::execute("UPDATE usa_location_pages SET leads_count = leads_count + 1 WHERE url_path = ?", [$cleanPath]);
            } catch (Throwable $ignore) {}
        }

        // 6. Dispatch Professional HTML Email Notification to sameerliaqat81@gmail.com
        $mailSent = false;
        $commId = Database::generateUuid();
        try {
            $mailSent = Mailer::sendContactNotification([
                'inquiryId'   => $inquiryId,
                'name'        => $name,
                'email'       => $email,
                'phone'       => $phone,
                'company'     => $company,
                'websiteUrl'  => $websiteUrl,
                'service'     => $service,
                'budget'      => $budget,
                'timeline'    => $timeline,
                'message'     => $message,
                'serviceDetails' => $serviceDetails,
                'page'        => $page,
                'source'      => $source,
                'date'        => $now
            ]);

            Database::execute(
                "INSERT INTO lead_communications (id, lead_id, type, channel, recipient, subject, status, sent_at, created_at)
                 VALUES (?, ?, 'ADMIN_NOTIFICATION', 'EMAIL', 'sameerliaqat81@gmail.com', ?, ?, ?, ?)",
                [$commId, $leadId, "New Website Inquiry — House Robotics — {$service} [{$inquiryId}]", ($mailSent ? 'SENT' : 'LOGGED'), ($mailSent ? $now : null), $now]
            );
        } catch (Throwable $mailEx) {
            error_log("[Inquiry Email Warning] " . $mailEx->getMessage());
            try {
                Database::execute(
                    "INSERT INTO lead_communications (id, lead_id, type, channel, recipient, subject, status, error_message, created_at)
                     VALUES (?, ?, 'ADMIN_NOTIFICATION', 'EMAIL', 'sameerliaqat81@gmail.com', ?, 'FAILED', ?, ?)",
                    [$commId, $leadId, "New Website Inquiry — House Robotics — {$service} [{$inquiryId}]", substr($mailEx->getMessage(), 0, 500), $now]
                );
            } catch (Throwable $logEx) {}
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
    // 9.5 Public USA Locations API
    // -------------------------------------------------------------------------
    if ($path === '/locations/hub' && $method === 'GET') {
        $states = Database::fetchAll("SELECT id, name, code, slug, region, capital, major_industries FROM usa_states WHERE status = 'PUBLISHED' ORDER BY name ASC");
        $priorityCities = Database::fetchAll("SELECT id, name, slug, state_slug, metro_area, population, major_industries, digital_demand_tier, priority_tier FROM usa_cities WHERE status = 'PUBLISHED' AND priority_tier = 1 ORDER BY population DESC LIMIT 36");
        $pilotPages = Database::fetchAll("SELECT id, page_type, state_slug, city_slug, service_slug, url_path, h1_title, hero_kicker, focus_keyword FROM usa_location_pages WHERE status = 'PUBLISHED'");
        $totalCities = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_cities WHERE status = 'PUBLISHED'");

        Response::success([
            'totalStates' => count($states),
            'totalCities' => $totalCities,
            'totalPublishedLandingPages' => count($pilotPages),
            'states' => $states,
            'priorityCities' => $priorityCities,
            'pilotPages' => $pilotPages
        ]);
    }

    if ($path === '/locations/states' && $method === 'GET') {
        $states = Database::fetchAll("SELECT s.*, (SELECT COUNT(*) FROM usa_cities c WHERE c.state_id = s.id AND c.status = 'PUBLISHED') as city_count FROM usa_states s WHERE s.status = 'PUBLISHED' ORDER BY s.name ASC");
        Response::success($states);
    }

    if (str_starts_with($path, '/locations/state/') && $method === 'GET') {
        $stateSlug = $segments[2] ?? '';
        $state = Database::fetchOne("SELECT * FROM usa_states WHERE slug = ? LIMIT 1", [$stateSlug]);
        if (!$state) {
            Response::notFound("State '{$stateSlug}' not found.");
        }
        $cities = Database::fetchAll("SELECT * FROM usa_cities WHERE state_slug = ? AND status = 'PUBLISHED' ORDER BY priority_tier ASC, population DESC", [$stateSlug]);
        $pages = Database::fetchAll("SELECT * FROM usa_location_pages WHERE state_slug = ? AND status = 'PUBLISHED'", [$stateSlug]);
        Response::success([
            'state' => $state,
            'cities' => $cities,
            'pages' => $pages
        ]);
    }

    if (str_starts_with($path, '/locations/city/') && $method === 'GET') {
        $stateSlug = $segments[2] ?? '';
        $citySlug = $segments[3] ?? '';
        $city = Database::fetchOne("SELECT * FROM usa_cities WHERE state_slug = ? AND slug = ? LIMIT 1", [$stateSlug, $citySlug]);
        if (!$city) {
            Response::notFound("City '{$citySlug}' in state '{$stateSlug}' not found.");
        }
        $state = Database::fetchOne("SELECT * FROM usa_states WHERE slug = ? LIMIT 1", [$stateSlug]);
        $pages = Database::fetchAll("SELECT * FROM usa_location_pages WHERE state_slug = ? AND city_slug = ? AND status = 'PUBLISHED'", [$stateSlug, $citySlug]);
        Response::success([
            'city' => $city,
            'state' => $state,
            'pages' => $pages
        ]);
    }

    if (str_starts_with($path, '/locations/page/') && $method === 'GET') {
        $stateSlug = $segments[2] ?? '';
        $citySlug = $segments[3] ?? '';
        $serviceSlug = $segments[4] ?? '';
        $urlPath = "/usa/{$stateSlug}/{$citySlug}/{$serviceSlug}";

        $page = Database::fetchOne("SELECT * FROM usa_location_pages WHERE url_path = ? LIMIT 1", [$urlPath]);
        $isPreview = ($_GET['preview'] ?? '') === 'true';
        if (!$page || ($page['status'] !== 'PUBLISHED' && !$isPreview)) {
            Response::notFound("Location service page not found.");
        }

        $city = Database::fetchOne("SELECT * FROM usa_cities WHERE state_slug = ? AND slug = ? LIMIT 1", [$stateSlug, $citySlug]);
        $state = Database::fetchOne("SELECT * FROM usa_states WHERE slug = ? LIMIT 1", [$stateSlug]);

        $page['localIndustryFocus'] = json_decode($page['local_industry_focus'] ?? '[]', true);
        $page['businessProblemsSolved'] = json_decode($page['business_problems_solved'] ?? '[]', true);
        $page['serviceDeliverables'] = json_decode($page['service_deliverables'] ?? '[]', true);
        $page['suitableCustomerTypes'] = json_decode($page['suitable_customer_types'] ?? '[]', true);
        $page['processSteps'] = json_decode($page['process_steps'] ?? '[]', true);
        $page['illustrativeScenarios'] = json_decode($page['illustrative_scenarios'] ?? '{}', true);
        $page['faqs'] = json_decode($page['faqs'] ?? '[]', true);

        Response::success([
            'page' => $page,
            'city' => $city,
            'state' => $state
        ]);
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
    // CSV Export: GET /api/admin/leads/export (with formula injection protection)
    if ($path === '/admin/leads/export' && $method === 'GET') {
        Auth::requireAuth();

        $status   = $_GET['status'] ?? null;
        $service  = $_GET['service'] ?? null;
        $source   = $_GET['source'] ?? null;
        $city     = $_GET['city'] ?? null;
        $state    = $_GET['state'] ?? null;
        $search   = $_GET['search'] ?? null;
        $followUp = $_GET['followUp'] ?? null;

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
        if ($city && $city !== 'ALL') {
            $where[] = "city LIKE ?";
            $params[] = "%{$city}%";
        }
        if ($state && $state !== 'ALL') {
            $where[] = "state LIKE ?";
            $params[] = "%{$state}%";
        }
        if ($followUp === 'OVERDUE') {
            $where[] = "follow_up_date < CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'TODAY') {
            $where[] = "DATE(follow_up_date) = CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'UPCOMING') {
            $where[] = "follow_up_date > CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'COMPLETED') {
            $where[] = "follow_up_status = 'COMPLETED'";
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
        $leads = Database::fetchAll(
            "SELECT * FROM leads {$whereClause} ORDER BY created_at DESC",
            $params
        );

        $headers = [
            'Inquiry Reference', 'Contact Name', 'Business Email', 'Phone', 'Company Name',
            'Website URL', 'Requested Service', 'City', 'State', 'Project Budget', 'Target Timeline',
            'Inbound Brief', 'Lead Source', 'CRM Status', 'Follow-Up Date', 'Follow-Up Status',
            'Follow-Up Note', 'Consent Confirmed', 'Landing Page', 'UTM Source', 'UTM Medium',
            'UTM Campaign', 'Submission Timestamp'
        ];

        // Sanitize helper to prevent CSV formula injection (=, +, -, @)
        $sanitizeCell = function($val) {
            if ($val === null || $val === '') return '""';
            $str = str_replace('"', '""', (string)$val);
            if (preg_match('/^[=+\-@\t\r]/', $str)) {
                $str = "'" . $str;
            }
            return '"' . $str . '"';
        };

        $out = fopen('php://temp', 'r+');
        fputs($out, "\xEF\xBB\xBF"); // UTF-8 BOM for Excel
        fputcsv($out, $headers);

        foreach ($leads as $l) {
            fputs($out, implode(',', [
                $sanitizeCell($l['inquiry_id'] ?? ''),
                $sanitizeCell($l['name'] ?? ''),
                $sanitizeCell($l['email'] ?? ''),
                $sanitizeCell($l['phone'] ?? ''),
                $sanitizeCell($l['company'] ?? ''),
                $sanitizeCell($l['website_url'] ?? ''),
                $sanitizeCell($l['service'] ?? ''),
                $sanitizeCell($l['city'] ?? ''),
                $sanitizeCell($l['state'] ?? ''),
                $sanitizeCell($l['budget'] ?? ''),
                $sanitizeCell($l['timeline'] ?? ''),
                $sanitizeCell($l['message'] ?? ''),
                $sanitizeCell($l['source'] ?? ''),
                $sanitizeCell($l['status'] ?? ''),
                $sanitizeCell($l['follow_up_date'] ?? ''),
                $sanitizeCell($l['follow_up_status'] ?? 'NONE'),
                $sanitizeCell($l['follow_up_note'] ?? ''),
                $sanitizeCell(!empty($l['consent_given']) ? 'YES' : 'NO'),
                $sanitizeCell($l['page_url'] ?? ''),
                $sanitizeCell($l['utm_source'] ?? ''),
                $sanitizeCell($l['utm_medium'] ?? ''),
                $sanitizeCell($l['utm_campaign'] ?? ''),
                $sanitizeCell($l['created_at'] ?? '')
            ]) . "\n");
        }

        rewind($out);
        $csvData = stream_get_contents($out);
        fclose($out);

        $filename = 'house-robotics-leads-' . date('Y-m-d') . '.csv';
        header('Content-Type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Content-Length: ' . strlen($csvData));
        echo $csvData;
        exit;
    }

    if ($path === '/admin/leads' && $method === 'GET') {
        Auth::requireAuth();

        $status   = $_GET['status'] ?? null;
        $service  = $_GET['service'] ?? null;
        $source   = $_GET['source'] ?? null;
        $city     = $_GET['city'] ?? null;
        $state    = $_GET['state'] ?? null;
        $search   = $_GET['search'] ?? null;
        $followUp = $_GET['followUp'] ?? null;
        $dateRange= $_GET['dateRange'] ?? null;
        $page     = max(1, (int)($_GET['page'] ?? 1));
        $limit    = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset   = ($page - 1) * $limit;

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
        if ($city && $city !== 'ALL') {
            $where[] = "city LIKE ?";
            $params[] = "%{$city}%";
        }
        if ($state && $state !== 'ALL') {
            $where[] = "state LIKE ?";
            $params[] = "%{$state}%";
        }
        if ($followUp === 'OVERDUE') {
            $where[] = "follow_up_date < CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'TODAY') {
            $where[] = "DATE(follow_up_date) = CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'UPCOMING') {
            $where[] = "follow_up_date > CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'COMPLETED') {
            $where[] = "follow_up_status = 'COMPLETED'";
        }
        if ($dateRange && $dateRange !== 'all') {
            $days = 30;
            if ($dateRange === 'today') $days = 1;
            elseif ($dateRange === '7d') $days = 7;
            elseif ($dateRange === '30d') $days = 30;
            elseif ($dateRange === '90d') $days = 90;
            $where[] = "created_at >= (NOW() - INTERVAL {$days} DAY)";
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
            "SELECT id, inquiry_id as inquiryId, name, email, phone, company, website_url as websiteUrl, city, state, service, budget, timeline, message, service_details as serviceDetails, consent_given as consentGiven, page_url as pageUrl, referrer, utm_source as utmSource, utm_medium as utmMedium, utm_campaign as utmCampaign, source, status, score, follow_up_date as followUpDate, follow_up_status as followUpStatus, follow_up_note as followUpNote, assigned_to as assignedTo, created_at as createdAt, updated_at as updatedAt 
             FROM leads {$whereClause} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}",
            $params
        );

        // Attach last notes & dynamic follow-up status
        $todayStr = date('Y-m-d');
        foreach ($leads as &$ld) {
            if (!empty($ld['followUpDate']) && ($ld['followUpStatus'] ?? '') !== 'COMPLETED') {
                $fDateStr = substr($ld['followUpDate'], 0, 10);
                if ($fDateStr < $todayStr) {
                    $ld['followUpStatus'] = 'OVERDUE';
                } elseif ($fDateStr === $todayStr) {
                    $ld['followUpStatus'] = 'TODAY';
                } else {
                    $ld['followUpStatus'] = 'UPCOMING';
                }
            }
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
            "SELECT id, inquiry_id as inquiryId, name, email, phone, company, website_url as websiteUrl, city, state, service, budget, timeline, message, service_details as serviceDetails, consent_given as consentGiven, page_url as pageUrl, referrer, utm_source as utmSource, utm_medium as utmMedium, utm_campaign as utmCampaign, source, status, score, follow_up_date as followUpDate, follow_up_status as followUpStatus, follow_up_note as followUpNote, assigned_to as assignedTo, created_at as createdAt, updated_at as updatedAt 
             FROM leads WHERE id = ? LIMIT 1",
            [$leadId]
        );
        if (!$lead) {
            Response::notFound('Lead not found.');
        }

        $todayStr = date('Y-m-d');
        if (!empty($lead['followUpDate']) && ($lead['followUpStatus'] ?? '') !== 'COMPLETED') {
            $fDateStr = substr($lead['followUpDate'], 0, 10);
            if ($fDateStr < $todayStr) {
                $lead['followUpStatus'] = 'OVERDUE';
            } elseif ($fDateStr === $todayStr) {
                $lead['followUpStatus'] = 'TODAY';
            } else {
                $lead['followUpStatus'] = 'UPCOMING';
            }
        }

        $lead['notes'] = Database::fetchAll(
            "SELECT id, lead_id as leadId, author_name as authorName, note, created_at as createdAt 
             FROM lead_notes WHERE lead_id = ? ORDER BY created_at DESC",
            [$leadId]
        );

        $lead['communications'] = Database::fetchAll(
            "SELECT id, lead_id as leadId, type, channel, recipient, subject, status, error_message as errorMessage, sent_at as sentAt, created_at as createdAt 
             FROM lead_communications WHERE lead_id = ? ORDER BY created_at DESC",
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

    // Schedule Follow-Up: POST /api/admin/leads/:id/followup
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'leads' && isset($segments[2], $segments[3]) && $segments[3] === 'followup' && !isset($segments[4]) && $method === 'POST') {
        $admin = Auth::requireAuth();
        $leadId = $segments[2];
        $input = Security::getJsonInput();
        $followUpDate = Security::sanitizeString($input['followUpDate'] ?? '', 50);
        $followUpNote = Security::sanitizeString($input['followUpNote'] ?? '', 1000);

        if (empty($followUpDate)) {
            Response::error('Follow-up date is required.', 422);
        }

        Database::execute(
            "UPDATE leads SET follow_up_date = ?, follow_up_status = 'PENDING', follow_up_note = ?, updated_at = ? WHERE id = ?",
            [$followUpDate, $followUpNote, date('Y-m-d H:i:s'), $leadId]
        );

        // Add to timeline notes
        $noteId = Database::generateUuid();
        $now = date('Y-m-d H:i:s');
        $noteText = "Scheduled follow-up for " . substr($followUpDate, 0, 10) . (!empty($followUpNote) ? ": {$followUpNote}" : '');
        Database::execute(
            "INSERT INTO lead_notes (id, lead_id, admin_id, author_name, note, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            [$noteId, $leadId, $admin['id'], $admin['name'], $noteText, $now]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'SCHEDULE_LEAD_FOLLOWUP',
            'entity'    => 'Lead',
            'entityId'  => $leadId,
            'metadata'  => ['followUpDate' => $followUpDate, 'note' => $followUpNote]
        ]);

        Response::success(['id' => $leadId, 'followUpDate' => $followUpDate, 'followUpStatus' => 'PENDING'], 'Follow-up scheduled.');
    }

    // Mark Follow-Up Complete: PATCH /api/admin/leads/:id/followup/complete
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'leads' && isset($segments[2], $segments[3], $segments[4]) && $segments[3] === 'followup' && $segments[4] === 'complete' && ($method === 'PATCH' || $method === 'POST')) {
        $admin = Auth::requireAuth();
        $leadId = $segments[2];
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "UPDATE leads SET follow_up_status = 'COMPLETED', updated_at = ? WHERE id = ?",
            [$now, $leadId]
        );

        $noteId = Database::generateUuid();
        Database::execute(
            "INSERT INTO lead_notes (id, lead_id, admin_id, author_name, note, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            [$noteId, $leadId, $admin['id'], $admin['name'], 'Marked scheduled follow-up as completed.', $now]
        );

        Audit::log([
            'adminId'   => $admin['id'],
            'adminName' => $admin['name'],
            'action'    => 'COMPLETE_LEAD_FOLLOWUP',
            'entity'    => 'Lead',
            'entityId'  => $leadId
        ]);

        Response::success(['id' => $leadId, 'followUpStatus' => 'COMPLETED'], 'Follow-up completed.');
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
    // 12b. Phase 5: USA Prospect Management & Outreach Automation API
    // -------------------------------------------------------------------------

    // Helper: Normalize domain in PHP
    $normalizeDomainPhp = function($url) {
        if (empty($url)) return '';
        $clean = strtolower(trim($url));
        $clean = preg_replace('#^https?://#i', '', $clean);
        $clean = preg_replace('#^www\.#i', '', $clean);
        $clean = explode('/', $clean)[0];
        $clean = explode('?', $clean)[0];
        $clean = explode(':', $clean)[0];
        return $clean;
    };

    // Helper: CSV cell formula injection escape
    $sanitizeCsvCellPhp = function($value) {
        if ($value === null || $value === '') return '""';
        $str = str_replace('"', '""', (string)$value);
        if (preg_match('/^[=+\-@\t\r]/', $str)) {
            $str = "'" . $str;
        }
        return '"' . $str . '"';
    };

    // CSV Export: GET /api/admin/prospects/export
    if ($path === '/admin/prospects/export' && $method === 'GET') {
        Auth::requireAuth();

        $status     = $_GET['status'] ?? null;
        $service    = $_GET['service'] ?? null;
        $priority   = $_GET['priority'] ?? null;
        $confidence = $_GET['confidence'] ?? null;
        $city       = $_GET['city'] ?? null;
        $state      = $_GET['state'] ?? null;
        $followUp   = $_GET['followUp'] ?? null;
        $search     = $_GET['search'] ?? null;

        $where = ["1=1"];
        $params = [];

        if ($status && $status !== 'ALL') {
            $where[] = "status = ?";
            $params[] = $status;
        }
        if ($service && $service !== 'ALL') {
            $where[] = "potential_service_fit = ?";
            $params[] = $service;
        }
        if ($priority && $priority !== 'ALL') {
            $where[] = "priority = ?";
            $params[] = $priority;
        }
        if ($confidence && $confidence !== 'ALL') {
            $where[] = "confidence = ?";
            $params[] = $confidence;
        }
        if ($city && $city !== 'ALL') {
            $where[] = "city LIKE ?";
            $params[] = "%{$city}%";
        }
        if ($state && $state !== 'ALL') {
            $where[] = "state LIKE ?";
            $params[] = "%{$state}%";
        }

        $todayStr = date('Y-m-d');
        if ($followUp === 'OVERDUE') {
            $where[] = "follow_up_date < CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'TODAY') {
            $where[] = "DATE(follow_up_date) = CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'UPCOMING') {
            $where[] = "follow_up_date > CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'COMPLETED') {
            $where[] = "follow_up_status = 'COMPLETED'";
        }

        if ($search) {
            $where[] = "(business_name LIKE ? OR website_url LIKE ? OR normalized_domain LIKE ? OR category LIKE ? OR email LIKE ? OR city LIKE ? OR state LIKE ?)";
            $term = "%{$search}%";
            $params = array_merge($params, array_fill(0, 7, $term));
        }

        $whereClause = implode(' AND ', $where);
        $prospects = Database::fetchAll(
            "SELECT * FROM prospects WHERE {$whereClause} ORDER BY created_at DESC",
            $params
        );

        $headers = [
            'Business Name', 'Website URL', 'Domain', 'Category', 'City', 'State', 'Country',
            'Public Email', 'Phone', 'Contact Page URL', 'Service Fit', 'Benefit Rationale',
            'Priority', 'Confidence', 'Status', 'Follow-Up Date', 'Follow-Up Status',
            'Source Type', 'Research Date', 'Created At'
        ];

        $rows = [];
        foreach ($prospects as $p) {
            $rows[] = implode(',', [
                $sanitizeCsvCellPhp($p['business_name']),
                $sanitizeCsvCellPhp($p['website_url']),
                $sanitizeCsvCellPhp($p['normalized_domain']),
                $sanitizeCsvCellPhp($p['category'] ?? ''),
                $sanitizeCsvCellPhp($p['city'] ?? ''),
                $sanitizeCsvCellPhp($p['state'] ?? ''),
                $sanitizeCsvCellPhp($p['country'] ?? 'USA'),
                $sanitizeCsvCellPhp($p['email'] ?? ''),
                $sanitizeCsvCellPhp($p['phone'] ?? ''),
                $sanitizeCsvCellPhp($p['contact_page_url'] ?? ''),
                $sanitizeCsvCellPhp($p['potential_service_fit']),
                $sanitizeCsvCellPhp($p['benefit_reason'] ?? ''),
                $sanitizeCsvCellPhp($p['priority']),
                $sanitizeCsvCellPhp($p['confidence']),
                $sanitizeCsvCellPhp($p['status']),
                $sanitizeCsvCellPhp(!empty($p['follow_up_date']) ? substr($p['follow_up_date'], 0, 10) : ''),
                $sanitizeCsvCellPhp($p['follow_up_status']),
                $sanitizeCsvCellPhp($p['source_type']),
                $sanitizeCsvCellPhp(!empty($p['research_date']) ? substr($p['research_date'], 0, 10) : ''),
                $sanitizeCsvCellPhp($p['created_at'])
            ]);
        }

        $filename = 'house-robotics-prospects-' . date('Y-m-d') . '.csv';
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        echo "\xEF\xBB\xBF"; // UTF-8 BOM
        echo implode(',', array_map(function($h) { return '"' . str_replace('"', '""', $h) . '"'; }, $headers)) . "\n";
        echo implode("\n", $rows);
        exit;
    }

    // Reports: GET /api/admin/prospects/reports/summary
    if ($path === '/admin/prospects/reports/summary' && $method === 'GET') {
        Auth::requireAuth();

        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM prospects");

        $statusRows = Database::fetchAll("SELECT status, COUNT(*) as count FROM prospects GROUP BY status");
        $statusMap = [];
        foreach ($statusRows as $r) { $statusMap[$r['status']] = (int)$r['count']; }

        $priorityRows = Database::fetchAll("SELECT priority, COUNT(*) as count FROM prospects GROUP BY priority");
        $priorityMap = [];
        foreach ($priorityRows as $r) { $priorityMap[$r['priority']] = (int)$r['count']; }

        $serviceRows = Database::fetchAll("SELECT potential_service_fit as service, COUNT(*) as count FROM prospects GROUP BY potential_service_fit");
        $serviceMap = [];
        foreach ($serviceRows as $r) { $serviceMap[$r['service']] = (int)$r['count']; }

        $activityRows = Database::fetchAll("SELECT activity_type as type, COUNT(*) as count FROM prospect_activities GROUP BY activity_type");
        $activityMap = [];
        foreach ($activityRows as $r) { $activityMap[$r['type']] = (int)$r['count']; }

        $topStates = Database::fetchAll(
            "SELECT state, COUNT(*) as count FROM prospects WHERE state IS NOT NULL AND state != '' GROUP BY state ORDER BY count DESC LIMIT 8"
        );

        $recentActivities = Database::fetchAll(
            "SELECT a.*, p.business_name as businessName, p.website_url as websiteUrl 
             FROM prospect_activities a 
             LEFT JOIN prospects p ON a.prospect_id = p.id 
             ORDER BY a.performed_at DESC LIMIT 10"
        );

        Response::success([
            'total'            => $total,
            'statusMap'        => $statusMap,
            'priorityMap'      => $priorityMap,
            'serviceMap'       => $serviceMap,
            'activityMap'      => $activityMap,
            'topStates'        => $topStates,
            'recentActivities' => $recentActivities
        ]);
    }

    // Campaigns List: GET /api/admin/prospects/campaigns/list
    if ($path === '/admin/prospects/campaigns/list' && $method === 'GET') {
        Auth::requireAuth();
        $campaigns = Database::fetchAll(
            "SELECT c.*, COUNT(m.id) as membersCount 
             FROM prospect_campaigns c 
             LEFT JOIN prospect_campaign_members m ON c.id = m.campaign_id 
             GROUP BY c.id 
             ORDER BY c.created_at DESC"
        );
        foreach ($campaigns as &$c) {
            $c['_count'] = ['members' => (int)($c['membersCount'] ?? 0)];
        }
        Response::success($campaigns);
    }

    // Campaign Create: POST /api/admin/prospects/campaigns/create
    if ($path === '/admin/prospects/campaigns/create' && $method === 'POST') {
        Auth::requireAuth();
        $body = Request::json();
        $name = trim($body['name'] ?? '');
        if (empty($name)) {
            Response::error('Campaign name is required.', 422);
        }

        $cId = Database::generateUuid();
        Database::execute(
            "INSERT INTO prospect_campaigns (id, name, goal, service, city, state, category, target_audience, message_template, status, notes, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $cId, $name, $body['goal'] ?? null, $body['service'] ?? null,
                $body['city'] ?? null, $body['state'] ?? null, $body['category'] ?? null,
                $body['targetAudience'] ?? null, $body['messageTemplate'] ?? null,
                $body['status'] ?? 'DRAFT', $body['notes'] ?? null
            ]
        );

        $created = Database::fetchOne("SELECT * FROM prospect_campaigns WHERE id = ?", [$cId]);
        Response::success($created, 'Campaign created.', 201);
    }

    // Assign Members to Campaign: POST /api/admin/prospects/campaigns/{id}/members
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && ($segments[2] ?? '') === 'campaigns' && isset($segments[3]) && ($segments[4] ?? '') === 'members' && $method === 'POST') {
        Auth::requireAuth();
        $campaignId = $segments[3];
        $body = Request::json();
        $prospectIds = $body['prospectIds'] ?? [];
        if (!is_array($prospectIds) || empty($prospectIds)) {
            Response::error('prospectIds must be a non-empty array.', 422);
        }

        $added = 0;
        foreach ($prospectIds as $pId) {
            $mId = Database::generateUuid();
            try {
                Database::execute(
                    "INSERT IGNORE INTO prospect_campaign_members (id, campaign_id, prospect_id, status, assigned_at) 
                     VALUES (?, ?, ?, 'PLANNED', NOW())",
                    [$mId, $campaignId, $pId]
                );
                $added++;
            } catch (Throwable $e) {}
        }
        Response::success(['added' => $added], "{$added} prospects assigned to campaign.");
    }

    // Suppression List: GET /api/admin/prospects/suppressions/list
    if ($path === '/admin/prospects/suppressions/list' && $method === 'GET') {
        Auth::requireAuth();
        $list = Database::fetchAll("SELECT * FROM suppressed_contacts ORDER BY created_at DESC");
        Response::success($list);
    }

    // Add Suppression: POST /api/admin/prospects/suppressions/add
    if ($path === '/admin/prospects/suppressions/add' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $body = Request::json();
        $email = !empty($body['email']) ? strtolower(trim($body['email'])) : null;
        $domain = !empty($body['domain']) ? $normalizeDomainPhp($body['domain']) : null;
        $reason = trim($body['reason'] ?? 'DO_NOT_CONTACT_REQUEST');

        if (!$email && !$domain) {
            Response::error('Email or domain is required.', 422);
        }

        $sId = Database::generateUuid();
        Database::execute(
            "INSERT INTO suppressed_contacts (id, email, domain, reason, source, created_at) 
             VALUES (?, ?, ?, ?, ?, NOW())",
            [$sId, $email, $domain, $reason, "Admin: " . ($admin['name'] ?? 'Admin')]
        );

        Response::success(['id' => $sId, 'email' => $email, 'domain' => $domain, 'reason' => $reason], 'Contact/domain suppressed.', 201);
    }

    // List Prospects: GET /api/admin/prospects
    if ($path === '/admin/prospects' && $method === 'GET') {
        Auth::requireAuth();

        $status     = $_GET['status'] ?? null;
        $service    = $_GET['service'] ?? null;
        $priority   = $_GET['priority'] ?? null;
        $confidence = $_GET['confidence'] ?? null;
        $city       = $_GET['city'] ?? null;
        $state      = $_GET['state'] ?? null;
        $followUp   = $_GET['followUp'] ?? null;
        $search     = $_GET['search'] ?? null;
        $page       = max(1, (int)($_GET['page'] ?? 1));
        $limit      = min(100, max(1, (int)($_GET['limit'] ?? 20)));
        $offset     = ($page - 1) * $limit;

        $where = ["1=1"];
        $params = [];

        if ($status && $status !== 'ALL') {
            $where[] = "status = ?";
            $params[] = $status;
        }
        if ($service && $service !== 'ALL') {
            $where[] = "potential_service_fit = ?";
            $params[] = $service;
        }
        if ($priority && $priority !== 'ALL') {
            $where[] = "priority = ?";
            $params[] = $priority;
        }
        if ($confidence && $confidence !== 'ALL') {
            $where[] = "confidence = ?";
            $params[] = $confidence;
        }
        if ($city && $city !== 'ALL') {
            $where[] = "city LIKE ?";
            $params[] = "%{$city}%";
        }
        if ($state && $state !== 'ALL') {
            $where[] = "state LIKE ?";
            $params[] = "%{$state}%";
        }

        $todayStr = date('Y-m-d');
        if ($followUp === 'OVERDUE') {
            $where[] = "follow_up_date < CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'TODAY') {
            $where[] = "DATE(follow_up_date) = CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'UPCOMING') {
            $where[] = "follow_up_date > CURDATE() AND follow_up_status != 'COMPLETED'";
        } elseif ($followUp === 'COMPLETED') {
            $where[] = "follow_up_status = 'COMPLETED'";
        }

        if ($search) {
            $where[] = "(business_name LIKE ? OR website_url LIKE ? OR normalized_domain LIKE ? OR category LIKE ? OR email LIKE ? OR city LIKE ? OR state LIKE ?)";
            $term = "%{$search}%";
            $params = array_merge($params, array_fill(0, 7, $term));
        }

        $whereClause = implode(' AND ', $where);
        $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM prospects WHERE {$whereClause}", $params);

        $dataSql = "SELECT id, business_name as businessName, website_url as websiteUrl, normalized_domain as normalizedDomain, 
                           category, city, state, country, contact_page_url as contactPageUrl, email, phone, source_url as sourceUrl, 
                           source_type as sourceType, research_date as researchDate, potential_service_fit as potentialServiceFit, 
                           benefit_reason as benefitReason, priority, confidence, status, follow_up_date as followUpDate, 
                           follow_up_status as followUpStatus, follow_up_note as followUpNote, internal_notes as internalNotes, 
                           converted_lead_id as convertedLeadId, converted_at as convertedAt, created_at as createdAt, updated_at as updatedAt 
                    FROM prospects 
                    WHERE {$whereClause} 
                    ORDER BY created_at DESC 
                    LIMIT {$limit} OFFSET {$offset}";

        $prospects = Database::fetchAll($dataSql, $params);

        foreach ($prospects as &$p) {
            if (!empty($p['followUpDate']) && ($p['followUpStatus'] ?? '') !== 'COMPLETED') {
                $fStr = substr($p['followUpDate'], 0, 10);
                if ($fStr < $todayStr) {
                    $p['followUpStatus'] = 'OVERDUE';
                } elseif ($fStr === $todayStr) {
                    $p['followUpStatus'] = 'TODAY';
                } else {
                    $p['followUpStatus'] = 'UPCOMING';
                }
            }
            $p['_count'] = [
                'notes'      => (int)Database::fetchColumn("SELECT COUNT(*) FROM prospect_notes WHERE prospect_id = ?", [$p['id']]),
                'activities' => (int)Database::fetchColumn("SELECT COUNT(*) FROM prospect_activities WHERE prospect_id = ?", [$p['id']])
            ];
        }

        Response::success($prospects, 'Prospects fetched', 200, [
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => ceil($total / $limit)
            ]
        ]);
    }

    // Create Prospect: POST /api/admin/prospects
    if ($path === '/admin/prospects' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $body = Request::json();

        $bName = trim($body['businessName'] ?? '');
        $wUrl  = trim($body['websiteUrl'] ?? '');
        if (empty($bName) || empty($wUrl)) {
            Response::error('businessName and websiteUrl are required.', 422);
        }

        $normDomain = $normalizeDomainPhp($wUrl);
        $email = !empty($body['email']) ? strtolower(trim($body['email'])) : null;

        // Check suppression
        $suppWhere = ["domain = ?"];
        $suppParams = [$normDomain];
        if ($email) {
            $suppWhere[] = "email = ?";
            $suppParams[] = $email;
        }
        $suppCheck = Database::fetchOne("SELECT * FROM suppressed_contacts WHERE " . implode(' OR ', $suppWhere) . " LIMIT 1", $suppParams);
        if ($suppCheck) {
            Response::error("This contact or domain ({$normDomain}) is suppressed: {$suppCheck['reason']}. Outreach prohibited.", 409);
        }

        // Check duplicate
        $dupCheck = Database::fetchOne("SELECT * FROM prospects WHERE normalized_domain = ? LIMIT 1", [$normDomain]);
        if ($dupCheck) {
            Response::error("A prospect record already exists for {$dupCheck['business_name']} ({$dupCheck['normalized_domain']}).", 409);
        }

        $pId = Database::generateUuid();
        $fDate = !empty($body['followUpDate']) ? $body['followUpDate'] : null;

        Database::execute(
            "INSERT INTO prospects (id, business_name, website_url, normalized_domain, category, city, state, country, 
                                   contact_page_url, email, phone, source_url, source_type, research_date, 
                                   potential_service_fit, benefit_reason, priority, confidence, status, 
                                   follow_up_date, follow_up_status, follow_up_note, internal_notes, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $pId, $bName, $wUrl, $normDomain, $body['category'] ?? null, $body['city'] ?? null, $body['state'] ?? null, $body['country'] ?? 'USA',
                $body['contactPageUrl'] ?? null, $email, $body['phone'] ?? null, $body['sourceUrl'] ?? null, $body['sourceType'] ?? 'MANUAL_RESEARCH',
                $body['potentialServiceFit'] ?? 'Web Development', $body['benefitReason'] ?? null,
                $body['priority'] ?? 'MEDIUM', $body['confidence'] ?? 'INFERRED', $body['status'] ?? 'NEW',
                $fDate, $fDate ? 'PENDING' : 'NONE', $body['followUpNote'] ?? null, $body['internalNotes'] ?? null
            ]
        );

        $created = Database::fetchOne("SELECT * FROM prospects WHERE id = ?", [$pId]);
        Response::success($created, 'Prospect added.', 201);
    }

    // CSV Bulk Import: POST /api/admin/prospects/import
    if ($path === '/admin/prospects/import' && $method === 'POST') {
        Auth::requireAuth();
        $body = Request::json();
        $items = $body['prospects'] ?? [];
        $handling = $body['duplicateHandling'] ?? 'SKIP';

        $inserted = 0; $skipped = 0; $flagged = 0;
        $dupList = [];

        foreach ($items as $item) {
            $wUrl = trim($item['websiteUrl'] ?? '');
            $bName = trim($item['businessName'] ?? '');
            if (empty($wUrl) || empty($bName)) {
                $skipped++;
                continue;
            }

            $norm = $normalizeDomainPhp($wUrl);
            $email = !empty($item['email']) ? strtolower(trim($item['email'])) : null;

            // Suppression check
            $supp = Database::fetchOne("SELECT id FROM suppressed_contacts WHERE domain = ? OR (email IS NOT NULL AND email = ?) LIMIT 1", [$norm, $email]);
            if ($supp) {
                $skipped++;
                continue;
            }

            $existing = Database::fetchOne("SELECT * FROM prospects WHERE normalized_domain = ? LIMIT 1", [$norm]);
            if ($existing) {
                if ($handling === 'SKIP') {
                    $skipped++;
                    $dupList[] = ['businessName' => $bName, 'domain' => $norm];
                } elseif ($handling === 'FLAG') {
                    $flagged++;
                    Database::execute(
                        "UPDATE prospects SET confidence = 'NEEDS_REVIEW', updated_at = NOW() WHERE id = ?",
                        [$existing['id']]
                    );
                } elseif ($handling === 'OVERWRITE') {
                    $inserted++;
                    Database::execute(
                        "UPDATE prospects SET business_name = ?, category = ?, city = ?, state = ?, email = ?, phone = ?, updated_at = NOW() WHERE id = ?",
                        [$bName, $item['category'] ?? $existing['category'], $item['city'] ?? $existing['city'], $item['state'] ?? $existing['state'], $email ?? $existing['email'], $item['phone'] ?? $existing['phone'], $existing['id']]
                    );
                }
                continue;
            }

            $pId = Database::generateUuid();
            Database::execute(
                "INSERT INTO prospects (id, business_name, website_url, normalized_domain, category, city, state, country, 
                                       contact_page_url, email, phone, source_type, research_date, potential_service_fit, 
                                       benefit_reason, priority, confidence, status, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'USA', ?, ?, ?, 'CSV_IMPORT', NOW(), ?, ?, ?, ?, 'NEW', NOW(), NOW())",
                [
                    $pId, $bName, $wUrl, $norm, $item['category'] ?? null, $item['city'] ?? null, $item['state'] ?? null,
                    $item['contactPageUrl'] ?? null, $email, $item['phone'] ?? null,
                    $item['potentialServiceFit'] ?? 'Web Development', $item['benefitReason'] ?? null,
                    $item['priority'] ?? 'MEDIUM', $item['confidence'] ?? 'INFERRED'
                ]
            );
            $inserted++;
        }

        Response::success([
            'insertedCount' => $inserted,
            'skippedCount'  => $skipped,
            'flaggedCount'  => $flagged,
            'duplicates'    => $dupList
        ], "Import processed: {$inserted} inserted, {$skipped} skipped.");
    }

    // Detail Prospect: GET /api/admin/prospects/{id}
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && !isset($segments[3]) && $method === 'GET') {
        Auth::requireAuth();
        $pId = $segments[2];
        $prospect = Database::fetchOne(
            "SELECT id, business_name as businessName, website_url as websiteUrl, normalized_domain as normalizedDomain, 
                    category, city, state, country, contact_page_url as contactPageUrl, email, phone, source_url as sourceUrl, 
                    source_type as sourceType, research_date as researchDate, potential_service_fit as potentialServiceFit, 
                    benefit_reason as benefitReason, priority, confidence, status, follow_up_date as followUpDate, 
                    follow_up_status as followUpStatus, follow_up_note as followUpNote, internal_notes as internalNotes, 
                    converted_lead_id as convertedLeadId, converted_at as convertedAt, created_at as createdAt, updated_at as updatedAt 
             FROM prospects WHERE id = ? LIMIT 1",
            [$pId]
        );
        if (!$prospect) {
            Response::notFound('Prospect not found.');
        }

        $todayStr = date('Y-m-d');
        if (!empty($prospect['followUpDate']) && ($prospect['followUpStatus'] ?? '') !== 'COMPLETED') {
            $fStr = substr($prospect['followUpDate'], 0, 10);
            if ($fStr < $todayStr) {
                $prospect['followUpStatus'] = 'OVERDUE';
            } elseif ($fStr === $todayStr) {
                $prospect['followUpStatus'] = 'TODAY';
            } else {
                $prospect['followUpStatus'] = 'UPCOMING';
            }
        }

        $prospect['notes'] = Database::fetchAll("SELECT * FROM prospect_notes WHERE prospect_id = ? ORDER BY created_at DESC", [$pId]);
        $prospect['activities'] = Database::fetchAll("SELECT * FROM prospect_activities WHERE prospect_id = ? ORDER BY performed_at DESC", [$pId]);
        $prospect['campaignMembers'] = Database::fetchAll(
            "SELECT m.*, c.name as campaignName, c.status as campaignStatus 
             FROM prospect_campaign_members m 
             LEFT JOIN prospect_campaigns c ON m.campaign_id = c.id 
             WHERE m.prospect_id = ?",
            [$pId]
        );

        Response::success($prospect);
    }

    // Update Prospect: PATCH /api/admin/prospects/{id}
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && !isset($segments[3]) && $method === 'PATCH') {
        $admin = Auth::requireAuth();
        $pId = $segments[2];
        $body = Request::json();

        $existing = Database::fetchOne("SELECT * FROM prospects WHERE id = ? LIMIT 1", [$pId]);
        if (!$existing) {
            Response::notFound('Prospect not found.');
        }

        // If status changed to DO_NOT_CONTACT, add to suppression
        $newStatus = $body['status'] ?? $existing['status'];
        if ($newStatus === 'DO_NOT_CONTACT' && $existing['status'] !== 'DO_NOT_CONTACT') {
            $sId = Database::generateUuid();
            Database::execute(
                "INSERT INTO suppressed_contacts (id, email, domain, reason, source, created_at) 
                 VALUES (?, ?, ?, 'DO_NOT_CONTACT_STATUS_SET_BY_ADMIN', ?, NOW())",
                [$sId, $existing['email'], $existing['normalized_domain'], "Admin: " . ($admin['name'] ?? 'Admin')]
            );
        }

        $bName = $body['businessName'] ?? $existing['business_name'];
        $wUrl  = $body['websiteUrl'] ?? $existing['website_url'];
        $norm  = $normalizeDomainPhp($wUrl);

        Database::execute(
            "UPDATE prospects SET business_name = ?, website_url = ?, normalized_domain = ?, category = ?, 
                                 city = ?, state = ?, contact_page_url = ?, email = ?, phone = ?, 
                                 potential_service_fit = ?, benefit_reason = ?, priority = ?, confidence = ?, 
                                 status = ?, internal_notes = ?, updated_at = NOW() 
             WHERE id = ?",
            [
                $bName, $wUrl, $norm, $body['category'] ?? $existing['category'],
                $body['city'] ?? $existing['city'], $body['state'] ?? $existing['state'],
                $body['contactPageUrl'] ?? $existing['contact_page_url'],
                !empty($body['email']) ? strtolower(trim($body['email'])) : $existing['email'],
                $body['phone'] ?? $existing['phone'],
                $body['potentialServiceFit'] ?? $existing['potential_service_fit'],
                $body['benefitReason'] ?? $existing['benefit_reason'],
                $body['priority'] ?? $existing['priority'],
                $body['confidence'] ?? $existing['confidence'],
                $newStatus, $body['internalNotes'] ?? $existing['internal_notes'],
                $pId
            ]
        );

        if ($newStatus !== $existing['status']) {
            $actId = Database::generateUuid();
            Database::execute(
                "INSERT INTO prospect_activities (id, prospect_id, admin_id, author_name, activity_type, subject, outcome, performed_at, created_at) 
                 VALUES (?, ?, ?, ?, 'STATUS_CHANGED', ?, ?, NOW(), NOW())",
                [$actId, $pId, $admin['id'], $admin['name'], "Status changed from {$existing['status']} to {$newStatus}", $newStatus]
            );
        }

        $updated = Database::fetchOne("SELECT * FROM prospects WHERE id = ?", [$pId]);
        Response::success($updated, 'Prospect updated.');
    }

    // Schedule Follow-Up: POST /api/admin/prospects/{id}/followup
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && ($segments[3] ?? '') === 'followup' && !isset($segments[4]) && $method === 'POST') {
        $admin = Auth::requireAuth();
        $pId = $segments[2];
        $body = Request::json();
        $fDate = trim($body['followUpDate'] ?? '');
        if (empty($fDate)) {
            Response::error('Follow-up date is required.', 422);
        }

        $fNote = trim($body['followUpNote'] ?? '');
        Database::execute(
            "UPDATE prospects SET follow_up_date = ?, follow_up_status = 'PENDING', follow_up_note = ?, updated_at = NOW() WHERE id = ?",
            [$fDate, $fNote ?: null, $pId]
        );

        $nId = Database::generateUuid();
        Database::execute(
            "INSERT INTO prospect_notes (id, prospect_id, admin_id, author_name, note, created_at) 
             VALUES (?, ?, ?, ?, ?, NOW())",
            [$nId, $pId, $admin['id'], $admin['name'], "Scheduled follow-up for {$fDate}" . ($fNote ? ": {$fNote}" : "")]
        );

        $updated = Database::fetchOne("SELECT * FROM prospects WHERE id = ?", [$pId]);
        Response::success($updated, 'Follow-up scheduled.');
    }

    // Mark Follow-Up Complete: PATCH /api/admin/prospects/{id}/followup/complete
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && ($segments[3] ?? '') === 'followup' && ($segments[4] ?? '') === 'complete' && $method === 'PATCH') {
        $admin = Auth::requireAuth();
        $pId = $segments[2];

        Database::execute("UPDATE prospects SET follow_up_status = 'COMPLETED', updated_at = NOW() WHERE id = ?", [$pId]);

        $nId = Database::generateUuid();
        Database::execute(
            "INSERT INTO prospect_notes (id, prospect_id, admin_id, author_name, note, created_at) 
             VALUES (?, ?, ?, ?, 'Marked scheduled follow-up as completed.', NOW())",
            [$nId, $pId, $admin['id'], $admin['name']]
        );

        $updated = Database::fetchOne("SELECT * FROM prospects WHERE id = ?", [$pId]);
        Response::success($updated, 'Follow-up completed.');
    }

    // Log Outreach Activity: POST /api/admin/prospects/{id}/activities
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && ($segments[3] ?? '') === 'activities' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $pId = $segments[2];
        $body = Request::json();

        $prospect = Database::fetchOne("SELECT * FROM prospects WHERE id = ? LIMIT 1", [$pId]);
        if (!$prospect) {
            Response::notFound('Prospect not found.');
        }

        $type = $body['activityType'] ?? 'EMAIL_DRAFTED';
        if ($prospect['status'] === 'DO_NOT_CONTACT' && in_array($type, ['EMAIL_SENT_MANUAL', 'CONTACT_FORM_SUBMITTED', 'PHONE_CALL'])) {
            Response::error('Cannot perform active outreach. This prospect is marked DO_NOT_CONTACT.', 403);
        }

        $actId = Database::generateUuid();
        Database::execute(
            "INSERT INTO prospect_activities (id, prospect_id, admin_id, author_name, activity_type, channel, subject, content, outcome, next_follow_up, performed_at, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $actId, $pId, $admin['id'], $admin['name'], $type,
                $body['channel'] ?? 'EMAIL', $body['subject'] ?? null, $body['content'] ?? null,
                $body['outcome'] ?? null, $body['nextFollowUp'] ?? null
            ]
        );

        $statusUpdates = [
            'EMAIL_SENT_MANUAL'      => 'CONTACTED',
            'CONTACT_FORM_SUBMITTED' => 'CONTACTED',
            'REPLY_RECEIVED'         => 'REPLIED',
            'MEETING_BOOKED'         => 'MEETING_REQUESTED',
            'PROPOSAL_SENT'          => 'PROPOSAL_SENT'
        ];

        if (isset($statusUpdates[$type]) && $prospect['status'] !== 'WON' && $prospect['status'] !== 'DO_NOT_CONTACT') {
            Database::execute("UPDATE prospects SET status = ?, updated_at = NOW() WHERE id = ?", [$statusUpdates[$type], $pId]);
        }

        $created = Database::fetchOne("SELECT * FROM prospect_activities WHERE id = ?", [$actId]);
        Response::success($created, 'Outreach activity logged.', 201);
    }

    // Generate Personalized Draft: POST /api/admin/prospects/{id}/draft
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && ($segments[3] ?? '') === 'draft' && $method === 'POST') {
        Auth::requireAuth();
        $pId = $segments[2];
        $body = Request::json();

        $prospect = Database::fetchOne("SELECT * FROM prospects WHERE id = ? LIMIT 1", [$pId]);
        if (!$prospect) {
            Response::notFound('Prospect not found.');
        }

        if ($prospect['status'] === 'DO_NOT_CONTACT') {
            Response::error('Draft generation blocked. This prospect is on the suppression list.', 403);
        }

        $service = $body['service'] ?? $prospect['potential_service_fit'];
        $bName   = $prospect['business_name'];
        $citySt  = ($prospect['city'] && $prospect['state']) ? "{$prospect['city']}, {$prospect['state']}" : ($prospect['city'] ?: 'your region');
        $oppText = $body['observedOpportunity'] ?? $prospect['benefit_reason'] ?: "enhancing your digital web architecture and conversion pipeline in {$citySt}";
        $valText = $body['proposedValue'] ?? "senior web engineering consultation with transparent milestone delivery and dedicated remote collaboration";
        $nextSt  = $body['desiredNextStep'] ?? "a brief 15-minute introductory video consultation to review your technical requirements";

        if ($service === 'SEO' || $service === 'SEO Services') {
            $subject = "Technical Organic Visibility & Search Architecture for {$bName}";
            $content = "Hi {$bName} Team,\n\nI was reviewing digital presences across {$citySt} and came across {$bName} ({$prospect['website_url']}).\n\nSpecifically, I noted an opportunity around: {$oppText}.\n\nAt House Robotics, we deliver technical SEO architecture, structured schema implementation, and search performance tuning for regional and national enterprises: {$valText}.\n\nWould you be open to {$nextSt}?\n\nWarm regards,\nSameer Liaqat\nPrincipal Strategist, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/";
        } elseif ($service === 'AI Automation' || $service === 'AI & Automation') {
            $subject = "Workflow Automation & Process Optimization for {$bName}";
            $content = "Hi {$bName} Team,\n\nI am reaching out regarding repetitive digital workflows at {$bName}.\n\nIn our research into businesses in {$citySt}, we observed an opportunity for: {$oppText}.\n\nHouse Robotics develops custom API workflows, CRM integration pipelines, and intelligent operational automations that save enterprise teams dozens of manual hours every week without disrupting existing software: {$valText}.\n\nCould we coordinate {$nextSt} to see if custom automations fit your roadmap this quarter?\n\nBest regards,\nSameer Liaqat\nLead Engineering Consultant, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/";
        } else {
            $subject = "Custom Web Engineering & Digital Platform for {$bName}";
            $content = "Hi {$bName} Team,\n\nI came across {$bName} ({$prospect['website_url']}) while reviewing commercial service websites in {$citySt}.\n\nI noticed an opportunity for: {$oppText}.\n\nAt House Robotics, we build custom high-performance web applications, client portals, and modern digital platforms. We pair senior architectural engineering with seamless remote collaboration aligned with US business hours: {$valText}.\n\nWould you have 15 minutes this week for {$nextSt}?\n\nBest regards,\nSameer Liaqat\nFounder & Engineering Lead, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/\nTransparent Remote Collaboration with US Enterprises";
        }

        $optOut = "\n\n----------------------------------------\nHouse Robotics | Strategic Web Engineering & AI Solutions\nLahore, Pakistan | Serving Remote Clients Across the USA\nOfficial Contact: sameerliaqat81@gmail.com | +92 347 4542881\nOpt-out: If you prefer not to receive strategic engineering briefings from House Robotics, simply reply with \"Unsubscribe\" or \"Do Not Contact\" to be immediately removed from our research list.";

        $fullDraft = $content . $optOut;

        $actId = Database::generateUuid();
        Database::execute(
            "INSERT INTO prospect_activities (id, prospect_id, admin_id, author_name, activity_type, channel, subject, content, outcome, performed_at, created_at) 
             VALUES (?, ?, ?, 'Admin', 'EMAIL_DRAFTED', ?, ?, ?, 'DRAFT_GENERATED', NOW(), NOW())",
            [$actId, $pId, $body['channel'] ?? 'EMAIL', $subject, $fullDraft]
        );

        if ($prospect['status'] === 'NEW' || $prospect['status'] === 'RESEARCHED') {
            Database::execute("UPDATE prospects SET status = 'READY_FOR_OUTREACH', updated_at = NOW() WHERE id = ?", [$pId]);
        }

        Response::success([
            'channel'      => $body['channel'] ?? 'EMAIL',
            'subject'      => $subject,
            'body'         => $content,
            'optOutFooter' => $optOut,
            'fullDraft'    => $fullDraft
        ]);
    }

    // Convert Prospect to Lead: POST /api/admin/prospects/{id}/convert
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && ($segments[3] ?? '') === 'convert' && $method === 'POST') {
        $admin = Auth::requireAuth();
        $pId = $segments[2];
        $body = Request::json();

        $prospect = Database::fetchOne("SELECT * FROM prospects WHERE id = ? LIMIT 1", [$pId]);
        if (!$prospect) {
            Response::notFound('Prospect not found.');
        }

        if (!empty($prospect['converted_lead_id'])) {
            $existingLead = Database::fetchOne("SELECT * FROM leads WHERE id = ? LIMIT 1", [$prospect['converted_lead_id']]);
            if ($existingLead) {
                Response::error("Prospect has already been converted to lead inquiry {$existingLead['inquiry_id']}.", 409);
            }
        }

        $email = !empty($prospect['email']) ? $prospect['email'] : "contact@{$prospect['normalized_domain']}";

        // Check if lead already exists
        $dupLead = Database::fetchOne("SELECT * FROM leads WHERE email = ? OR website_url LIKE ? LIMIT 1", [$email, "%{$prospect['normalized_domain']}%"]);
        if ($dupLead) {
            Database::execute("UPDATE prospects SET converted_lead_id = ?, converted_at = NOW(), status = 'QUALIFIED' WHERE id = ?", [$dupLead['id'], $pId]);
            Response::success($dupLead, "Prospect linked to existing lead {$dupLead['inquiry_id']}.");
        }

        $inquiryId = 'HR-INQ-' . date('Ymd') . '-' . rand(1000, 9999);
        $leadId = Database::generateUuid();

        Database::execute(
            "INSERT INTO leads (id, inquiry_id, name, email, phone, company, website_url, city, state, service, budget, timeline, message, source, status, score, follow_up_date, follow_up_status, follow_up_note, consent_given, prospect_id, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'QUALIFIED', 75, ?, ?, ?, 1, ?, NOW(), NOW())",
            [
                $leadId, $inquiryId, $prospect['business_name'], $email, $prospect['phone'], $prospect['business_name'], $prospect['website_url'],
                $prospect['city'], $prospect['state'], $body['service'] ?? $prospect['potential_service_fit'],
                $body['budget'] ?? null, $body['timeline'] ?? null,
                "Converted from USA Prospect Manager ({$prospect['normalized_domain']}). Benefit rationale: " . ($prospect['benefit_reason'] ?: 'Direct research'),
                "Outreach ({$prospect['source_type']})",
                $prospect['follow_up_date'], $prospect['follow_up_status'], $prospect['follow_up_note'], $pId
            ]
        );

        Database::execute("UPDATE prospects SET converted_lead_id = ?, converted_at = NOW(), status = 'QUALIFIED' WHERE id = ?", [$leadId, $pId]);

        // Copy notes
        $pNotes = Database::fetchAll("SELECT * FROM prospect_notes WHERE prospect_id = ?", [$pId]);
        foreach ($pNotes as $pn) {
            $lnId = Database::generateUuid();
            Database::execute(
                "INSERT INTO lead_notes (id, lead_id, admin_id, author_name, note, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
                [$lnId, $leadId, $pn['admin_id'], $pn['author_name'], "[Transferred from Prospect Notes]: {$pn['note']}"]
            );
        }

        $createdLead = Database::fetchOne("SELECT * FROM leads WHERE id = ?", [$leadId]);
        Response::success($createdLead, "Prospect converted to CRM Lead ({$inquiryId}).", 201);
    }

    // Delete Prospect: DELETE /api/admin/prospects/{id}
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'prospects' && isset($segments[2]) && !isset($segments[3]) && $method === 'DELETE') {
        Auth::requireAuth();
        $pId = $segments[2];
        Database::execute("DELETE FROM prospects WHERE id = ?", [$pId]);
        Response::success([], 'Prospect deleted.');
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
    // 24. Admin USA Locations & Landing Pages CMS
    // -------------------------------------------------------------------------
    if (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'locations') {
        $admin = Auth::requireAuth();

        // GET /api/admin/locations/stats
        if (($segments[2] ?? '') === 'stats' && $method === 'GET') {
            $totalStates = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_states");
            $totalCities = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_cities");
            $totalPages = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_location_pages");
            $publishedPages = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_location_pages WHERE status = 'PUBLISHED'");
            $draftPages = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_location_pages WHERE status = 'DRAFT'");
            $leadsByLocation = Database::fetchAll("SELECT id, name, email, city, state, service, page_url, created_at FROM leads WHERE page_url LIKE '%/usa/%' OR city IS NOT NULL ORDER BY created_at DESC LIMIT 20");

            Response::success([
                'totalStates' => $totalStates,
                'totalCities' => $totalCities,
                'totalPages' => $totalPages,
                'publishedPages' => $publishedPages,
                'draftPages' => $draftPages,
                'leadsByLocation' => $leadsByLocation
            ]);
        }

        // GET /api/admin/locations - Paginated & filtered list
        if (!isset($segments[2]) && $method === 'GET') {
            $state = $_GET['state'] ?? '';
            $status = $_GET['status'] ?? '';
            $search = $_GET['search'] ?? '';
            $page = max(1, (int)($_GET['page'] ?? 1));
            $limit = max(1, min(100, (int)($_GET['limit'] ?? 25)));
            $offset = ($page - 1) * $limit;

            $whereClauses = [];
            $params = [];

            if (!empty($state)) {
                $whereClauses[] = "state_slug = ?";
                $params[] = $state;
            }
            if (!empty($status)) {
                $whereClauses[] = "status = ?";
                $params[] = $status;
            }
            if (!empty($search)) {
                $whereClauses[] = "(h1_title LIKE ? OR url_path LIKE ? OR focus_keyword LIKE ? OR city_slug LIKE ?)";
                $s = "%{$search}%";
                $params[] = $s; $params[] = $s; $params[] = $s; $params[] = $s;
            }

            $whereSql = !empty($whereClauses) ? "WHERE " . implode(' AND ', $whereClauses) : "";
            $total = (int)Database::fetchColumn("SELECT COUNT(*) FROM usa_location_pages {$whereSql}", $params);

            $pages = Database::fetchAll("SELECT * FROM usa_location_pages {$whereSql} ORDER BY updated_at DESC LIMIT {$limit} OFFSET {$offset}", $params);
            $states = Database::fetchAll("SELECT slug, name, code FROM usa_states ORDER BY name ASC");

            Response::success([
                'data' => $pages,
                'states' => $states,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'totalPages' => ceil($total / $limit),
                    'total' => $total
                ]
            ]);
        }

        // POST /api/admin/locations/page - Create page
        if (($segments[2] ?? '') === 'page' && !isset($segments[3]) && $method === 'POST') {
            $input = Security::getJsonInput();
            $id = Database::generateUuid();
            $cleanUrl = '/' . trim($input['urlPath'] ?? '', '/');
            $now = date('Y-m-d H:i:s');

            Database::execute(
                "INSERT INTO usa_location_pages (id, page_type, state_slug, city_slug, service_slug, url_path, h1_title, hero_kicker, hero_subtitle, meta_title, meta_description, focus_keyword, secondary_keywords, canonical_url, og_title, og_description, og_image, content_intro, local_industry_focus, business_problems_solved, service_deliverables, suitable_customer_types, remote_collaboration_model, process_steps, illustrative_scenarios, faqs, quality_gate_passed, quality_review_notes, verified_at, status, no_index, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    $id,
                    $input['pageType'] ?? 'CITY_SERVICE',
                    $input['stateSlug'] ?? '',
                    $input['citySlug'] ?? null,
                    $input['serviceSlug'] ?? null,
                    $cleanUrl,
                    $input['h1Title'] ?? '',
                    $input['heroKicker'] ?? null,
                    $input['heroSubtitle'] ?? null,
                    $input['metaTitle'] ?? '',
                    $input['metaDescription'] ?? '',
                    $input['focusKeyword'] ?? null,
                    $input['secondaryKeywords'] ?? null,
                    $input['canonicalUrl'] ?? "https://houserobotics.online{$cleanUrl}",
                    $input['ogTitle'] ?? $input['metaTitle'] ?? null,
                    $input['ogDescription'] ?? $input['metaDescription'] ?? null,
                    $input['ogImage'] ?? '/images/services/seo-hero.webp',
                    $input['contentIntro'] ?? '',
                    is_array($input['localIndustryFocus'] ?? null) ? json_encode($input['localIndustryFocus']) : ($input['localIndustryFocus'] ?? null),
                    is_array($input['businessProblemsSolved'] ?? null) ? json_encode($input['businessProblemsSolved']) : ($input['businessProblemsSolved'] ?? null),
                    is_array($input['serviceDeliverables'] ?? null) ? json_encode($input['serviceDeliverables']) : ($input['serviceDeliverables'] ?? null),
                    is_array($input['suitableCustomerTypes'] ?? null) ? json_encode($input['suitableCustomerTypes']) : ($input['suitableCustomerTypes'] ?? null),
                    $input['remoteCollaborationModel'] ?? '',
                    is_array($input['processSteps'] ?? null) ? json_encode($input['processSteps']) : ($input['processSteps'] ?? null),
                    is_array($input['illustrativeScenarios'] ?? null) ? json_encode($input['illustrativeScenarios']) : ($input['illustrativeScenarios'] ?? null),
                    is_array($input['faqs'] ?? null) ? json_encode($input['faqs']) : ($input['faqs'] ?? null),
                    !empty($input['qualityGatePassed']) ? 1 : 0,
                    $input['qualityReviewNotes'] ?? 'Quality gate passed.',
                    $now,
                    $input['status'] ?? 'PUBLISHED',
                    !empty($input['noIndex']) ? 1 : 0,
                    $now,
                    $now
                ]
            );

            Response::success(['id' => $id, 'urlPath' => $cleanUrl], 'Location page created successfully.', 201);
        }

        // PUT /api/admin/locations/page/{id} - Update page
        if (($segments[2] ?? '') === 'page' && isset($segments[3]) && $method === 'PUT') {
            $pageId = $segments[3];
            $input = Security::getJsonInput();
            $now = date('Y-m-d H:i:s');

            Database::execute(
                "UPDATE usa_location_pages SET 
                    h1_title = COALESCE(?, h1_title),
                    hero_kicker = COALESCE(?, hero_kicker),
                    hero_subtitle = COALESCE(?, hero_subtitle),
                    meta_title = COALESCE(?, meta_title),
                    meta_description = COALESCE(?, meta_description),
                    focus_keyword = COALESCE(?, focus_keyword),
                    secondary_keywords = COALESCE(?, secondary_keywords),
                    canonical_url = COALESCE(?, canonical_url),
                    og_title = COALESCE(?, og_title),
                    og_description = COALESCE(?, og_description),
                    og_image = COALESCE(?, og_image),
                    content_intro = COALESCE(?, content_intro),
                    quality_review_notes = COALESCE(?, quality_review_notes),
                    status = COALESCE(?, status),
                    updated_at = ?
                 WHERE id = ?",
                [
                    $input['h1Title'] ?? null,
                    $input['heroKicker'] ?? null,
                    $input['heroSubtitle'] ?? null,
                    $input['metaTitle'] ?? null,
                    $input['metaDescription'] ?? null,
                    $input['focusKeyword'] ?? null,
                    $input['secondaryKeywords'] ?? null,
                    $input['canonicalUrl'] ?? null,
                    $input['ogTitle'] ?? null,
                    $input['ogDescription'] ?? null,
                    $input['ogImage'] ?? null,
                    $input['contentIntro'] ?? null,
                    $input['qualityReviewNotes'] ?? null,
                    $input['status'] ?? null,
                    $now,
                    $pageId
                ]
            );

            Response::success(['id' => $pageId], 'Location page updated successfully.');
        }

        // DELETE /api/admin/locations/page/{id} - Delete page
        if (($segments[2] ?? '') === 'page' && isset($segments[3]) && $method === 'DELETE') {
            $pageId = $segments[3];
            Database::execute("DELETE FROM usa_location_pages WHERE id = ?", [$pageId]);
            Response::success(null, 'Location page deleted.');
        }
    }

    // -------------------------------------------------------------------------
    // 25. Administrator SEO & Lead Reports API
    // -------------------------------------------------------------------------
    if (($path === '/admin/reports' || (($segments[0] ?? '') === 'admin' && ($segments[1] ?? '') === 'reports')) && $method === 'GET') {
        Auth::requireAuth();

        $dateRange = $_GET['dateRange'] ?? 'all';
        $service   = $_GET['service'] ?? null;
        $city      = $_GET['city'] ?? null;
        $state     = $_GET['state'] ?? null;
        $status    = $_GET['status'] ?? null;
        $pageUrl   = $_GET['pageUrl'] ?? null;

        $where = [];
        $params = [];

        if ($dateRange === '7d') {
            $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        } elseif ($dateRange === '30d') {
            $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        } elseif ($dateRange === '90d') {
            $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)";
        }

        if ($service && $service !== 'all') {
            $where[] = "service LIKE ?";
            $params[] = "%{$service}%";
        }
        if ($city && $city !== 'all') {
            $where[] = "city LIKE ?";
            $params[] = "%{$city}%";
        }
        if ($state && $state !== 'all') {
            $where[] = "state LIKE ?";
            $params[] = "%{$state}%";
        }
        if ($status && $status !== 'all') {
            $where[] = "status = ?";
            $params[] = $status;
        }

        $whereClause = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

        $leads = Database::fetchAll(
            "SELECT id, inquiry_id as inquiryId, name, email, company, service, budget, source, status, city, state, page_url as pageUrl, utm_source as utmSource, created_at as createdAt 
             FROM leads {$whereClause} ORDER BY created_at DESC",
            $params
        );

        $totalAllTime = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads");

        // Breakdowns
        $serviceCounts = [];
        $cityCounts = [];
        $statusCounts = ['NEW' => 0, 'CONTACTED' => 0, 'QUALIFIED' => 0, 'PROPOSAL_SENT' => 0, 'WON' => 0, 'LOST' => 0];
        $sourceCounts = [];

        foreach ($leads as $l) {
            $s = !empty($l['service']) ? $l['service'] : 'Unspecified';
            $serviceCounts[$s] = ($serviceCounts[$s] ?? 0) + 1;

            if (!empty($l['city'])) {
                $c = trim($l['city'] . ', ' . ($l['state'] ?? ''), ', ');
                $cityCounts[$c] = ($cityCounts[$c] ?? 0) + 1;
            }

            $st = $l['status'] ?? 'NEW';
            if (isset($statusCounts[$st])) {
                $statusCounts[$st]++;
            } else {
                $statusCounts[$st] = 1;
            }

            $src = !empty($l['utmSource']) ? $l['utmSource'] : (!empty($l['source']) ? $l['source'] : 'Organic Search');
            $sourceCounts[$src] = ($sourceCounts[$src] ?? 0) + 1;
        }

        arsort($serviceCounts);
        arsort($cityCounts);
        arsort($sourceCounts);

        $topServices = [];
        foreach ($serviceCounts as $k => $v) $topServices[] = ['name' => $k, 'count' => $v];

        $topCities = [];
        foreach ($cityCounts as $k => $v) $topCities[] = ['name' => $k, 'count' => $v];

        $topSources = [];
        foreach ($sourceCounts as $k => $v) $topSources[] = ['name' => $k, 'count' => $v];

        $locationPages = Database::fetchAll(
            "SELECT id, h1_title as title, url_path as urlPath, city_slug as city, state_slug as state, service_slug as service, leads_count as leadsCount 
             FROM usa_location_pages WHERE status = 'PUBLISHED' ORDER BY leads_count DESC LIMIT 15"
        );

        $eventCounts = Database::fetchAll(
            "SELECT event_type as eventType, COUNT(*) as count FROM analytics_events GROUP BY event_type"
        );

        $gaSetting = Database::fetchColumn("SELECT value FROM site_settings WHERE `key` = 'analytics_ga_id' LIMIT 1");
        $gscSetting = Database::fetchColumn("SELECT value FROM site_settings WHERE `key` = 'gsc_verification' LIMIT 1");

        Response::success([
            'summary' => [
                'totalMatchingLeads' => count($leads),
                'totalAllTimeLeads'  => $totalAllTime,
                'qualifiedLeads'     => $statusCounts['QUALIFIED'] ?? 0,
                'wonLeads'           => $statusCounts['WON'] ?? 0
            ],
            'statusDistribution' => $statusCounts,
            'topServices'        => $topServices,
            'topCities'          => $topCities,
            'topSources'         => $topSources,
            'topLocationPages'   => $locationPages,
            'eventsSummary'      => $eventCounts,
            'recentLeads'        => array_slice($leads, 0, 10),
            'externalAnalytics'  => [
                'googleAnalytics' => [
                    'connected'  => !empty($gaSetting) && $gaSetting !== 'G-HOUSEROBOTICS',
                    'trackingId' => $gaSetting ?: 'Not Configured (Requires GA4 Measurement ID in Site Settings)'
                ],
                'searchConsole' => [
                    'connected'    => !empty($gscSetting),
                    'verification' => $gscSetting ?: 'Pending GSC HTML Tag / Domain DNS Verification'
                ]
            ]
        ]);
    }


    // -------------------------------------------------------------------------
    // Fallback: 404 Endpoint Not Found
    // -------------------------------------------------------------------------
    Response::notFound("API endpoint '{$method} /api{$path}' was not found.");

} catch (Throwable $e) {
    error_log("[API Server Exception] " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    Response::serverError($e->getMessage());
}
