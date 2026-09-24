<?php
/**
 * HOUSE ROBOTICS — Security, Sanitization & Rate Limiter
 */

class Security {
    /**
     * Get JSON body or $_POST data
     */
    public static function getJsonInput(): array {
        $raw = file_get_contents('php://input');
        if (empty($raw) && php_sapi_name() === 'cli') {
            $raw = file_get_contents('php://stdin');
        }
        if (!empty($raw)) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }
        return $_POST ?? [];
    }

    /**
     * Sanitize string for output / storage
     */
    public static function sanitizeString(mixed $val, int $maxLength = 2000): string {
        if ($val === null) {
            return '';
        }
        $str = is_string($val) ? $val : (string)$val;
        $clean = trim(strip_tags($str));
        if ($maxLength > 0 && mb_strlen($clean) > $maxLength) {
            $clean = mb_substr($clean, 0, $maxLength);
        }
        return $clean;
    }

    /**
     * Sanitize rich HTML content (e.g. for blog posts)
     * Keeps safe formatting tags while stripping scripts, iframes, and dangerous handlers
     */
    public static function sanitizeHtml(string $html): string {
        // Strip out script tags and contents
        $html = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html);
        // Strip out iframe tags
        $html = preg_replace('#<iframe(.*?)>(.*?)</iframe>#is', '', $html);
        // Strip on* event handlers (onclick, onload, onerror, etc.)
        $html = preg_replace('#\s*on[a-zA-Z]+\s*=\s*(["\']?).*?\1#is', '', $html);
        // Strip javascript: pseudo-protocols
        $html = preg_replace('#href\s*=\s*(["\']?)\s*javascript:[^"\'>]*\1#is', 'href="#"', $html);
        return trim($html);
    }

    /**
     * Validate email format
     */
    public static function isValidEmail(string $email): bool {
        return filter_var(trim($email), FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Get real client IP address
     */
    public static function getClientIp(): string {
        $headers = [
            'HTTP_CF_CONNECTING_IP',
            'HTTP_X_REAL_IP',
            'HTTP_X_FORWARDED_FOR',
            'REMOTE_ADDR'
        ];
        foreach ($headers as $header) {
            if (!empty($_SERVER[$header])) {
                $ips = explode(',', $_SERVER[$header]);
                $ip = trim($ips[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    /**
     * Lightweight rate limiter
     * Returns true if within limits, false if exceeded.
     */
    public static function checkRateLimit(string $key, int $maxAttempts = 10, int $decaySeconds = 60): bool {
        $ip = self::getClientIp();
        $cacheKey = "rate_" . md5($key . '_' . $ip);
        $tempDir = sys_get_temp_dir() . '/hr_rate_limits';
        if (!is_dir($tempDir)) {
            @mkdir($tempDir, 0755, true);
        }

        $file = $tempDir . '/' . $cacheKey . '.json';
        $now = time();

        if (file_exists($file)) {
            $data = json_decode(@file_get_contents($file), true);
            if (is_array($data) && isset($data['start'], $data['count'])) {
                if ($now - $data['start'] < $decaySeconds) {
                    if ($data['count'] >= $maxAttempts) {
                        return false;
                    }
                    $data['count']++;
                    @file_put_contents($file, json_encode($data));
                    return true;
                }
            }
        }

        @file_put_contents($file, json_encode(['start' => $now, 'count' => 1]));
        return true;
    }
}
