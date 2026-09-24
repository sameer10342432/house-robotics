<?php
/**
 * HOUSE ROBOTICS — Automated PHP API Integration Test Suite
 */

require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Audit.php';

$phpBin = 'C:\\Users\\sameer\\AppData\\Local\\Microsoft\\WinGet\\Packages\\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\\php.exe';

echo "=======================================================\n";
echo "HOUSE ROBOTICS — COMPREHENSIVE PHP BACKEND TEST SUITE\n";
echo "=======================================================\n\n";

$passCount = 0;
$failCount = 0;

function runApiTest(string $method, string $uri, array $body = [], array $cookies = []): array {
    $script = __DIR__ . '/../api/index.php';
    
    // Simulate HTTP environment
    $env = [
        'REQUEST_METHOD' => $method,
        'REQUEST_URI'    => $uri,
        'HTTP_HOST'      => 'localhost:8000',
        'REMOTE_ADDR'    => '127.0.0.1'
    ];
    
    $jsonBody = !empty($body) ? json_encode($body) : '';
    $cookieHeader = '';
    if (!empty($cookies)) {
        $pairs = [];
        foreach ($cookies as $k => $v) {
            $pairs[] = "{$k}={$v}";
        }
        $cookieHeader = implode('; ', $pairs);
    }

    $descriptorSpec = [
        0 => ["pipe", "r"], // stdin
        1 => ["pipe", "w"], // stdout
        2 => ["pipe", "w"]  // stderr
    ];

    $cmd = '"' . 'C:\\Users\\sameer\\AppData\\Local\\Microsoft\\WinGet\\Packages\\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\\php.exe' . '" ' . escapeshellarg($script);

    $cleanServer = [];
    foreach ($_SERVER as $k => $v) {
        if (is_scalar($v)) {
            $cleanServer[$k] = (string)$v;
        }
    }
    $fullEnv = array_merge($cleanServer, $env);
    if (!empty($cookieHeader)) {
        $fullEnv['HTTP_COOKIE'] = $cookieHeader;
    }

    $process = proc_open($cmd, $descriptorSpec, $pipes, dirname($script), $fullEnv);

    if (is_resource($process)) {
        if (!empty($jsonBody)) {
            fwrite($pipes[0], $jsonBody);
        }
        fclose($pipes[0]);

        $stdout = stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);

        proc_close($process);

        $json = json_decode($stdout, true);
        return [
            'raw'    => $stdout,
            'json'   => $json,
            'stderr' => $stderr
        ];
    }

    return ['raw' => '', 'json' => null, 'stderr' => 'Process spawn failed'];
}

function assertTest(string $name, bool $condition, string $details = ''): void {
    global $passCount, $failCount;
    if ($condition) {
        echo " [PASS] {$name}\n";
        $passCount++;
    } else {
        echo " [FAIL] {$name} - {$details}\n";
        $failCount++;
    }
}

// 1. Health API Test
$healthRes = runApiTest('GET', '/api/health');
assertTest(
    'Health Check Endpoint',
    isset($healthRes['json']['status']) && $healthRes['json']['status'] === 'ok',
    $healthRes['raw']
);

// 2. Public Services Test
$srvRes = runApiTest('GET', '/api/services');
assertTest(
    'Public Services List (21 services)',
    isset($srvRes['json']['success']) && $srvRes['json']['success'] === true && count($srvRes['json']['data']) >= 21,
    'Returned: ' . count($srvRes['json']['data'] ?? [])
);

// 3. Single Service Test (SEO)
$singleSrvRes = runApiTest('GET', '/api/services/seo');
assertTest(
    'Public Single Service (SEO slug)',
    isset($singleSrvRes['json']['data']['slug']) && $singleSrvRes['json']['data']['slug'] === 'seo',
    $singleSrvRes['raw']
);

// 4. Public Blog List Test
$blogRes = runApiTest('GET', '/api/blog');
assertTest(
    'Public Blog Posts List',
    isset($blogRes['json']['success']) && $blogRes['json']['success'] === true && count($blogRes['json']['data']) >= 3,
    $blogRes['raw']
);

// 5. Public Blog Categories Test
$catRes = runApiTest('GET', '/api/blog/categories');
assertTest(
    'Public Blog Categories',
    isset($catRes['json']['data']) && count($catRes['json']['data']) >= 5,
    $catRes['raw']
);

// 6. Public Testimonials Test
$testRes = runApiTest('GET', '/api/testimonials');
assertTest(
    'Public Testimonials List',
    isset($testRes['json']['data']) && count($testRes['json']['data']) >= 4,
    $testRes['raw']
);

// 7. Public FAQs Test
$faqsRes = runApiTest('GET', '/api/faqs');
assertTest(
    'Public FAQs List',
    isset($faqsRes['json']['data']) && count($faqsRes['json']['data']) >= 5,
    $faqsRes['raw']
);

// 8. Public Contact Form Submission Test
$contactPayload = [
    'name'    => 'Test Client Lead',
    'email'   => 'client@acmecorp.com',
    'phone'   => '+1 555 123 4567',
    'company' => 'Acme Corporation',
    'service' => 'Search Engine Optimization (SEO)',
    'budget'  => '$5,000 - $10,000',
    'message' => 'We are interested in an enterprise SEO audit and custom web application.',
    'source'  => 'Test Suite'
];
$contactRes = runApiTest('POST', '/api/contact', $contactPayload);
assertTest(
    'Public Contact Submission & Inquiry Generation',
    isset($contactRes['json']['success']) && $contactRes['json']['success'] === true && !empty($contactRes['json']['data']['inquiryId']),
    $contactRes['raw']
);

// Verify lead and contact message in database
$savedMsg = Database::fetchOne("SELECT * FROM contact_messages WHERE email = 'client@acmecorp.com' LIMIT 1");
assertTest(
    'Contact Message Record in Database',
    !empty($savedMsg) && $savedMsg['company'] === 'Acme Corporation'
);

$savedLead = Database::fetchOne("SELECT * FROM leads WHERE email = 'client@acmecorp.com' LIMIT 1");
assertTest(
    'Automatic CRM Lead Created from Contact',
    !empty($savedLead) && $savedLead['status'] === 'NEW'
);

// 9. Public Newsletter Subscribe Test
$newsRes = runApiTest('POST', '/api/newsletter/subscribe', ['email' => 'subscriber.test@growth.com']);
assertTest(
    'Newsletter Subscription',
    isset($newsRes['json']['success']) && $newsRes['json']['success'] === true,
    $newsRes['raw']
);

// 10. Public SEO Metadata Test
$seoRes = runApiTest('GET', '/api/seo?path=/');
assertTest(
    'Public SEO Metadata for Homepage',
    isset($seoRes['json']['data']['seoTitle']) && str_contains($seoRes['json']['data']['seoTitle'], 'House Robotics'),
    $seoRes['raw']
);

// 11. Public Analytics Event Test
$eventRes = runApiTest('POST', '/api/analytics/event', [
    'eventType' => 'CTA_CLICK',
    'eventName' => 'Claim Free Audit Click',
    'pageUrl'   => '/services'
]);
assertTest(
    'Analytics Event Recording',
    isset($eventRes['json']['success']) && $eventRes['json']['success'] === true,
    $eventRes['raw']
);

// 12. Admin Authentication (Login with Super Admin Credentials)
$loginRes = runApiTest('POST', '/api/admin/auth/login', [
    'email'    => 'sameerliaqat81@gmail.com',
    'password' => 'Y&VO{(w0J3A6'
]);
assertTest(
    'Admin Login Authentication',
    isset($loginRes['json']['success']) && $loginRes['json']['success'] === true && !empty($loginRes['json']['data']['user']),
    $loginRes['raw']
);

// 13. Admin Login Alias Test ('admin' alias)
$aliasLoginRes = runApiTest('POST', '/api/admin/auth/login', [
    'email'    => 'admin',
    'password' => 'Y&VO{(w0J3A6'
]);
assertTest(
    'Admin Login with "admin" Username Alias',
    isset($aliasLoginRes['json']['success']) && $aliasLoginRes['json']['success'] === true,
    $aliasLoginRes['raw']
);

// 14. Admin Brute Force / Invalid Password Rejection Test
$badLoginRes = runApiTest('POST', '/api/admin/auth/login', [
    'email'    => 'sameerliaqat81@gmail.com',
    'password' => 'WrongPassword123!'
]);
assertTest(
    'Admin Authentication Rejects Invalid Password',
    isset($badLoginRes['json']['success']) && $badLoginRes['json']['success'] === false,
    $badLoginRes['raw']
);

// 15. Admin Dashboard Direct Data Query
$dashLeads = (int)Database::fetchColumn("SELECT COUNT(*) FROM leads");
$dashMessages = (int)Database::fetchColumn("SELECT COUNT(*) FROM contact_messages");
$dashPosts = (int)Database::fetchColumn("SELECT COUNT(*) FROM blog_posts");
$dashServices = (int)Database::fetchColumn("SELECT COUNT(*) FROM services");
assertTest(
    'Admin Dashboard Data Aggregation Queries',
    $dashLeads >= 3 && $dashMessages >= 3 && $dashPosts >= 3 && $dashServices >= 21,
    "Leads: {$dashLeads}, Messages: {$dashMessages}, Posts: {$dashPosts}, Services: {$dashServices}"
);

// 16. Admin Activity Audit Logging Test
Audit::log([
    'adminId'   => 'c0000000-0000-0000-0000-000000000001',
    'adminName' => 'Sameer Liaqat',
    'action'    => 'SYSTEM_TEST_RUN',
    'entity'    => 'TestSuite',
    'metadata'  => ['test' => 'completed']
]);
$savedAudit = Database::fetchOne("SELECT * FROM activity_logs WHERE action = 'SYSTEM_TEST_RUN' LIMIT 1");
assertTest(
    'Admin Activity Audit Trail Logging',
    !empty($savedAudit) && $savedAudit['admin_name'] === 'Sameer Liaqat'
);

echo "\n-------------------------------------------------------\n";
echo "TEST RESULTS SUMMARY: {$passCount} PASSED, {$failCount} FAILED\n";
echo "-------------------------------------------------------\n";

if ($failCount > 0) {
    exit(1);
}
