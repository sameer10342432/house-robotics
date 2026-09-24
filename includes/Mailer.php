<?php
/**
 * HOUSE ROBOTICS — Email & SMTP Notification Dispatcher
 * Sends instant notifications to sameerliaqat81@gmail.com
 * Supports direct SMTP socket (Gmail / cPanel) and native mail() fallback
 * Supports direct Reply-To headers for 1-click lead replies
 */

class Mailer {
    private static array $config = [];

    public static function init(array $config): void {
        self::$config = $config;
    }

    private static function getConfig(): array {
        if (empty(self::$config)) {
            $configPath = __DIR__ . '/../config/config.php';
            if (file_exists($configPath)) {
                $appConfig = require $configPath;
                self::$config = $appConfig['mail'] ?? [];
            }
        }
        return self::$config;
    }

    /**
     * Send email via SMTP socket or PHP mail() fallback
     */
    public static function send(string $to, string $subject, string $htmlBody, string $textBody = '', string $replyTo = '', string $replyToName = ''): bool {
        $mailConfig = self::getConfig();
        if (empty($mailConfig['enabled'])) {
            return true;
        }

        $fromAddress = $mailConfig['from_address'] ?? 'notifications@houserobotics.online';
        $fromName    = $mailConfig['from_name'] ?? 'House Robotics Notifications';
        $host        = $mailConfig['host'] ?? '';
        $port        = (int)($mailConfig['port'] ?? 587);
        $user        = $mailConfig['username'] ?? '';
        $pass        = $mailConfig['password'] ?? '';

        // Format Reply-To header
        $replyToHeader = !empty($replyTo) 
            ? (!empty($replyToName) ? "{$replyToName} <{$replyTo}>" : $replyTo) 
            : $fromAddress;

        // If credentials are present, attempt direct socket SMTP
        if (!empty($host) && !empty($user) && !empty($pass)) {
            try {
                $smtpSuccess = self::sendSmtp($host, $port, $user, $pass, $fromAddress, $fromName, $to, $subject, $htmlBody, $replyToHeader);
                if ($smtpSuccess) {
                    return true;
                }
            } catch (Throwable $e) {
                error_log("[SMTP Dispatch Warning] " . $e->getMessage());
            }
        }

        // Standard PHP mail() fallback (built into cPanel Apache / Exim MTA)
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            "From: {$fromName} <{$fromAddress}>",
            "Reply-To: {$replyToHeader}",
            'X-Mailer: PHP/' . phpversion()
        ];

        return @mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    }

    /**
     * Send Lead / Contact Inbound Notification to Gmail
     */
    public static function sendContactNotification(array $leadData): bool {
        $mailConfig = self::getConfig();
        $recipient = $mailConfig['notify_address'] ?? 'sameerliaqat81@gmail.com';

        $inquiryId = htmlspecialchars($leadData['inquiryId'] ?? $leadData['inquiry_id'] ?? 'HR-INQ-NEW');
        $rawName   = $leadData['name'] ?? 'Prospective Client';
        $rawEmail  = $leadData['email'] ?? '';
        $name      = htmlspecialchars($rawName);
        $email     = htmlspecialchars($rawEmail ?: 'Not provided');
        $phone     = htmlspecialchars($leadData['phone'] ?? 'Not provided');
        $company   = htmlspecialchars($leadData['company'] ?? 'Not provided');
        $service   = htmlspecialchars($leadData['service'] ?? 'General Consultation');
        $budget    = htmlspecialchars($leadData['budget'] ?? 'Not specified');
        $rawMsg    = $leadData['message'] ?? 'No message entered';
        $message   = nl2br(htmlspecialchars($rawMsg));
        $page      = htmlspecialchars($leadData['page'] ?? $leadData['page_url'] ?? 'https://houserobotics.online/');
        $source    = htmlspecialchars($leadData['source'] ?? 'Website Inquiry Form');
        $submitted = htmlspecialchars($leadData['date'] ?? date('Y-m-d H:i:s T'));
        $adminUrl  = 'https://houserobotics.online/admin';

        $subject = "New Website Inquiry — House Robotics — {$service} [{$inquiryId}]";

        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Inquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9FF; color: #1e1b4b; padding: 24px; margin: 0; }
    .card { background: #ffffff; border-radius: 16px; border: 1px solid #E9E7F2; padding: 32px; max-width: 620px; margin: 0 auto; box-shadow: 0 10px 30px rgba(109,40,217,0.06); }
    .header { border-bottom: 2px solid #F3F0FF; padding-bottom: 18px; margin-bottom: 24px; }
    .badge { background: #EDE9FE; color: #6D28D9; font-weight: 700; font-size: 12px; padding: 5px 12px; border-radius: 12px; display: inline-block; letter-spacing: 0.5px; }
    .title { margin: 12px 0 4px 0; color: #0f172a; font-size: 22px; font-weight: 800; }
    .subtitle { margin: 0; color: #6D28D9; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .grid { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .grid td { padding: 8px 0; vertical-align: top; }
    .label { width: 140px; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.5px; }
    .value { font-size: 14px; color: #111827; font-weight: 600; }
    .value a { color: #6D28D9; text-decoration: none; font-weight: 700; }
    .value a:hover { text-decoration: underline; }
    .message-box { background: #FAF9FF; border: 1px solid #E9E7F2; border-radius: 12px; padding: 18px; margin-top: 22px; font-size: 14px; line-height: 1.6; color: #374151; }
    .btn-bar { margin-top: 26px; text-align: center; }
    .btn { display: inline-block; background-color: #6D28D9; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 13px; font-weight: 700; }
    .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 26px; border-top: 1px solid #F3F0FF; padding-top: 18px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="subtitle">HOUSE ROBOTICS</div>
      <div class="title">New Website Inquiry</div>
      <div style="margin-top: 8px;"><span class="badge">Inquiry ID: {$inquiryId}</span></div>
    </div>

    <table class="grid">
      <tr>
        <td class="label">Inquiry ID:</td>
        <td class="value"><strong>{$inquiryId}</strong></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td class="value"><strong>{$name}</strong></td>
      </tr>
      <tr>
        <td class="label">Email:</td>
        <td class="value"><a href="mailto:{$email}">{$email}</a></td>
      </tr>
      <tr>
        <td class="label">Phone:</td>
        <td class="value"><a href="tel:{$phone}">{$phone}</a></td>
      </tr>
      <tr>
        <td class="label">Company:</td>
        <td class="value">{$company}</td>
      </tr>
      <tr>
        <td class="label">Service:</td>
        <td class="value"><span style="color: #6D28D9; font-weight: 700;">{$service}</span></td>
      </tr>
      <tr>
        <td class="label">Budget:</td>
        <td class="value">{$budget}</td>
      </tr>
      <tr>
        <td class="label">Page:</td>
        <td class="value">{$page}</td>
      </tr>
      <tr>
        <td class="label">Source:</td>
        <td class="value">{$source}</td>
      </tr>
      <tr>
        <td class="label">Submitted:</td>
        <td class="value">{$submitted}</td>
      </tr>
    </table>

    <div class="message-box">
      <div style="font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 700; margin-bottom: 6px;">Message / Brief:</div>
      <div>{$message}</div>
    </div>

    <div class="btn-bar">
      <a href="{$adminUrl}" class="btn" target="_blank">Open in Admin Panel →</a>
    </div>

    <div class="footer">
      House Robotics Production Engine • Automated Lead Routing Protocol<br>
      You can reply directly to this email to contact <strong>{$name}</strong> ({$email}).
    </div>
  </div>
</body>
</html>
HTML;

        // Dispatch with Reply-To set to the client's email & name
        return self::send($recipient, $subject, $html, '', $rawEmail, $rawName);
    }

    /**
     * Direct standard SMTP socket implementation
     */
    private static function sendSmtp(string $host, int $port, string $user, string $pass, string $from, string $fromName, string $to, string $subject, string $body, string $replyTo = ''): bool {
        $timeout = 10;
        $socket = @fsockopen($port === 465 ? "ssl://{$host}" : $host, $port, $errno, $errstr, $timeout);
        if (!$socket) {
            return false;
        }

        $read = fn() => fgets($socket, 515);
        $write = fn($cmd) => fputs($socket, $cmd . "\r\n");

        $read(); // banner
        $write("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'houserobotics.online'));
        $read();

        if ($port === 587) {
            $write("STARTTLS");
            $res = $read();
            if (str_starts_with($res, '220')) {
                stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                $write("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'houserobotics.online'));
                $read();
            }
        }

        $write("AUTH LOGIN");
        $read();
        $write(base64_encode($user));
        $read();
        $write(base64_encode($pass));
        $authRes = $read();
        if (!str_starts_with($authRes, '235')) {
            fclose($socket);
            return false;
        }

        $write("MAIL FROM: <{$from}>");
        $read();
        $write("RCPT TO: <{$to}>");
        $read();
        $write("DATA");
        $read();

        $headers = [
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=UTF-8",
            "From: {$fromName} <{$from}>",
            "To: <{$to}>",
            "Subject: {$subject}",
            "Date: " . date('r')
        ];

        if (!empty($replyTo)) {
            $headers[] = "Reply-To: {$replyTo}";
        }

        $payload = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.";
        $write($payload);
        $read();

        $write("QUIT");
        fclose($socket);
        return true;
    }
}
