<?php
/**
 * HOUSE ROBOTICS — Automated CRM & USA Prospects Follow-Up Reminder Cron Job
 * 
 * Recommended cPanel Cron Schedule:
 * Run once daily at 08:00 AM / 09:00 AM server time:
 * 0 8 * * * /usr/local/bin/php /home/YOUR_CPANEL_USER/public_html/cron_followups.php > /dev/null 2>&1
 */

// Error logging
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Security check: CLI or secret token
$isCli = (php_sapi_name() === 'cli');
$cronKey = $_GET['key'] ?? ($_GET['token'] ?? '');
$expectedKeys = ['hr_crm_cron_2026', 'HR_CRON_2026_LEAD_FOLLOWUP_SECRET'];

if (!$isCli && !in_array($cronKey, $expectedKeys)) {
    http_response_code(403);
    echo "Forbidden: Invalid cron authorization key.\n";
    exit;
}

require_once __DIR__ . '/includes/Database.php';
require_once __DIR__ . '/includes/Mailer.php';

echo "=== House Robotics CRM & Prospect Follow-Up Cron Job ===\n";
echo "Execution Time: " . date('Y-m-d H:i:s T') . "\n";

try {
    $now = date('Y-m-d H:i:s');
    $today = date('Y-m-d');

    // 1. Identify Overdue Leads
    $overdueLeads = Database::fetchAll(
        "SELECT id, inquiry_id as inquiryId, name, email, phone, company, service, follow_up_date as followUpDate, follow_up_note as followUpNote 
         FROM leads 
         WHERE follow_up_date < CURDATE() AND follow_up_status = 'PENDING' 
         ORDER BY follow_up_date ASC"
    );

    if (!empty($overdueLeads)) {
        Database::execute(
            "UPDATE leads SET follow_up_status = 'OVERDUE', updated_at = NOW() 
             WHERE follow_up_date < CURDATE() AND follow_up_status = 'PENDING'"
        );
        echo "Updated " . count($overdueLeads) . " leads to OVERDUE status.\n";
    }

    // 2. Identify Leads Due Today
    $todayLeads = Database::fetchAll(
        "SELECT id, inquiry_id as inquiryId, name, email, phone, company, service, follow_up_date as followUpDate, follow_up_note as followUpNote 
         FROM leads 
         WHERE DATE(follow_up_date) = CURDATE() AND follow_up_status IN ('PENDING', 'NONE') 
         ORDER BY follow_up_date ASC"
    );

    // 3. Phase 5: Identify Overdue USA Prospects
    $overdueProspects = Database::fetchAll(
        "SELECT id, business_name as businessName, website_url as websiteUrl, potential_service_fit as service, 
                follow_up_date as followUpDate, follow_up_note as followUpNote 
         FROM prospects 
         WHERE follow_up_date < CURDATE() AND follow_up_status != 'COMPLETED' AND status != 'DO_NOT_CONTACT' 
         ORDER BY follow_up_date ASC"
    );

    // 4. Phase 5: Identify USA Prospects Due Today
    $todayProspects = Database::fetchAll(
        "SELECT id, business_name as businessName, website_url as websiteUrl, potential_service_fit as service, 
                follow_up_date as followUpDate, follow_up_note as followUpNote 
         FROM prospects 
         WHERE DATE(follow_up_date) = CURDATE() AND follow_up_status != 'COMPLETED' AND status != 'DO_NOT_CONTACT' 
         ORDER BY follow_up_date ASC"
    );

    $totalActionRequired = count($overdueLeads) + count($todayLeads) + count($overdueProspects) + count($todayProspects);
    echo "Total Action Required Items: {$totalActionRequired}\n";
    echo " - Overdue Leads: " . count($overdueLeads) . "\n";
    echo " - Today Leads: " . count($todayLeads) . "\n";
    echo " - Overdue USA Prospects: " . count($overdueProspects) . "\n";
    echo " - Today USA Prospects: " . count($todayProspects) . "\n";

    if ($totalActionRequired > 0) {
        $subject = "[House Robotics CRM] Action Required: {$totalActionRequired} Follow-Up Reminders (" . date('M j, Y') . ")";
        
        $html = '<!DOCTYPE html><html><head><meta charset="utf-8">';
        $html .= '<style>body{font-family:sans-serif;background:#FAF9FF;padding:20px;color:#1e1b4b;}';
        $html .= '.card{background:#fff;border-radius:12px;padding:24px;max-width:650px;margin:0 auto;border:1px solid #E9E7F2;}';
        $html .= '.badge-red{background:#FEE2E2;color:#991B1B;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:bold;}';
        $html .= '.badge-amber{background:#FEF3C7;color:#92400E;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:bold;}';
        $html .= '.badge-purple{background:#EDE9FE;color:#6D28D9;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:bold;}';
        $html .= 'table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px;}';
        $html .= 'th,td{padding:8px;border-bottom:1px solid #E9E7F2;text-align:left;}';
        $html .= '.btn{display:inline-block;background:#6D28D9;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:20px;}';
        $html .= '</style></head><body><div class="card">';
        $html .= '<h2 style="color:#0f172a;margin-top:0;">CRM & Prospect Follow-Up Morning Digest</h2>';
        $html .= '<p style="color:#6b7280;font-size:13px;">You have <strong>' . $totalActionRequired . '</strong> scheduled outreach/lead actions due today or overdue.</p>';

        $html .= '<table><thead><tr style="background:#FAF9FF;"><th>Type</th><th>Status</th><th>Entity</th><th>Service</th><th>Follow-Up Note</th></tr></thead><tbody>';

        // Overdue Leads
        foreach ($overdueLeads as $ol) {
            $html .= '<tr>';
            $html .= '<td><span class="badge-purple">INBOUND LEAD</span></td>';
            $html .= '<td><span class="badge-red">OVERDUE</span></td>';
            $html .= '<td><strong>' . htmlspecialchars($ol['name']) . '</strong><br><small>' . htmlspecialchars($ol['company'] ?: $ol['email']) . '</small></td>';
            $html .= '<td>' . htmlspecialchars($ol['service'] ?: 'Inbound') . '</td>';
            $html .= '<td>' . htmlspecialchars($ol['followUpNote'] ?: 'No note recorded') . '</td>';
            $html .= '</tr>';
        }

        // Today Leads
        foreach ($todayLeads as $tl) {
            $html .= '<tr>';
            $html .= '<td><span class="badge-purple">INBOUND LEAD</span></td>';
            $html .= '<td><span class="badge-amber">DUE TODAY</span></td>';
            $html .= '<td><strong>' . htmlspecialchars($tl['name']) . '</strong><br><small>' . htmlspecialchars($tl['company'] ?: $tl['email']) . '</small></td>';
            $html .= '<td>' . htmlspecialchars($tl['service'] ?: 'Inbound') . '</td>';
            $html .= '<td>' . htmlspecialchars($tl['followUpNote'] ?: 'Follow up with prospect') . '</td>';
            $html .= '</tr>';
        }

        // Overdue Prospects
        foreach ($overdueProspects as $op) {
            $html .= '<tr>';
            $html .= '<td><span class="badge-purple">USA PROSPECT</span></td>';
            $html .= '<td><span class="badge-red">OVERDUE</span></td>';
            $html .= '<td><strong>' . htmlspecialchars($op['businessName']) . '</strong><br><small>' . htmlspecialchars($op['websiteUrl']) . '</small></td>';
            $html .= '<td>' . htmlspecialchars($op['service'] ?: 'Web Dev') . '</td>';
            $html .= '<td>' . htmlspecialchars($op['followUpNote'] ?: 'Scheduled prospect follow-up') . '</td>';
            $html .= '</tr>';
        }

        // Today Prospects
        foreach ($todayProspects as $tp) {
            $html .= '<tr>';
            $html .= '<td><span class="badge-purple">USA PROSPECT</span></td>';
            $html .= '<td><span class="badge-amber">DUE TODAY</span></td>';
            $html .= '<td><strong>' . htmlspecialchars($tp['businessName']) . '</strong><br><small>' . htmlspecialchars($tp['websiteUrl']) . '</small></td>';
            $html .= '<td>' . htmlspecialchars($tp['service'] ?: 'Web Dev') . '</td>';
            $html .= '<td>' . htmlspecialchars($tp['followUpNote'] ?: 'Scheduled prospect follow-up') . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        $html .= '<div style="text-align:center;"><a href="https://houserobotics.online/admin" class="btn">Open Admin CRM & Prospect Manager →</a></div>';
        $html .= '</div></body></html>';

        Mailer::send('sameerliaqat81@gmail.com', $subject, $html);
        echo "Dispatched daily digest notification to sameerliaqat81@gmail.com\n";
    } else {
        echo "No pending follow-ups due today.\n";
    }

    echo "=== Follow-Up Cron Completed Successfully ===\n";
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    error_log("[Cron Error] " . $e->getMessage());
}
