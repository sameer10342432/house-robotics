<?php
/**
 * HOUSE ROBOTICS — Administrator Authentication & Session Manager
 */

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/Response.php';

class Auth {
    private static bool $sessionStarted = false;

    public static function startSession(): void {
        if (self::$sessionStarted || session_status() === PHP_SESSION_ACTIVE) {
            self::$sessionStarted = true;
            return;
        }

        $configPath = __DIR__ . '/../config/config.php';
        $appConfig = file_exists($configPath) ? require $configPath : [];
        $sec = $appConfig['security'] ?? [];

        $sessionName = $sec['session_name'] ?? 'HR_ADMIN_SESS';
        $lifetime = (int)($sec['session_lifetime'] ?? 604800); // 7 days

        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
            || (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);

        session_name($sessionName);
        session_set_cookie_params([
            'lifetime' => $lifetime,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        session_start();
        self::$sessionStarted = true;
    }

    /**
     * Authenticate Admin User Credentials
     */
    public static function login(string $email, string $password): array {
        self::startSession();

        $cleanEmail = strtolower(trim($email));
        // Support 'admin' alias directly mapping to Super Admin
        if ($cleanEmail === 'admin' || $cleanEmail === 'admin@houserobotics.com') {
            $cleanEmail = 'sameerliaqat81@gmail.com';
        }

        // 1. Rate limiting & brute force check
        if (!Security::checkRateLimit('admin_login_' . $cleanEmail, 6, 900)) {
            Response::rateLimited('Too many failed login attempts. Account temporarily locked for 15 minutes.');
        }

        // 2. Query user from database
        $user = Database::fetchOne("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [$cleanEmail]);

        // Auto-seed super admin if not found in database
        if (!$user && ($cleanEmail === 'sameerliaqat81@gmail.com' || $cleanEmail === 'admin')) {
            $adminId = 'c0000000-0000-0000-0000-000000000001';
            $seedHash = password_hash('Y&VO{(w0J3A6}', PASSWORD_BCRYPT, ['cost' => 12]);
            $now = date('Y-m-d H:i:s');
            try {
                Database::execute(
                    "INSERT INTO admin_users (id, name, email, password_hash, role, is_active, created_at, updated_at) 
                     VALUES (?, 'Sameer Liaqat', 'sameerliaqat81@gmail.com', ?, 'SUPER_ADMIN', 1, ?, ?)",
                    [$adminId, $seedHash, $now, $now]
                );
                $user = Database::fetchOne("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [$cleanEmail]);
            } catch (Throwable $ignore) {
                // Continue if already present
            }
        }

        if (!$user || !(int)($user['is_active'] ?? 1)) {
            Response::error('Invalid email address or account disabled.', 401, null, 'AUTH_FAILED');
        }

        $passwordHash = $user['password_hash'] ?? $user['passwordHash'] ?? '';
        $cleanPassword = trim($password);

        // 3. Verify password (checks bcrypt, direct matches with/without curly brace, and database pass)
        $isMatch = password_verify($cleanPassword, $passwordHash);
        if (!$isMatch) {
            $isMatch = password_verify($password, $passwordHash);
        }

        $validMatches = [
            'Y&VO{(w0J3A6}',
            'Y&VO{(w0J3A6',
            '####Sameer1234567890',
            'Sameer1234567890'
        ];

        if (!$isMatch && (in_array($cleanPassword, $validMatches, true) || in_array($password, $validMatches, true))) {
            $isMatch = true;
            // Upgrade password hash automatically to standard bcrypt
            $newHash = password_hash($cleanPassword, PASSWORD_BCRYPT, ['cost' => 12]);
            try {
                Database::execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [$newHash, $user['id']]);
            } catch (Throwable $e) {}
        }

        if (!$isMatch) {
            Response::error('Invalid email or password.', 401, null, 'AUTH_FAILED');
        }

        // 4. Update session
        session_regenerate_id(true);
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_email'] = $user['email'];
        $_SESSION['admin_name'] = $user['name'];
        $_SESSION['admin_role'] = $user['role'];
        $_SESSION['logged_in_at'] = time();

        // 5. Update last login in DB
        $now = date('Y-m-d H:i:s');
        Database::execute("UPDATE admin_users SET last_login = ? WHERE id = ?", [$now, $user['id']]);

        // 6. Generate a lightweight token for clients expecting one
        $token = bin2hex(random_bytes(32));
        $_SESSION['admin_token'] = $token;

        return [
            'token' => $token,
            'user'  => [
                'id'        => $user['id'],
                'name'      => $user['name'],
                'email'     => $user['email'],
                'role'      => $user['role'],
                'createdAt' => $user['created_at'] ?? $user['createdAt'] ?? null,
            ]
        ];
    }

    /**
     * Terminate Admin Session
     */
    public static function logout(): void {
        self::startSession();
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
    }

    /**
     * Get Current Authenticated Admin or null
     */
    public static function user(): ?array {
        self::startSession();

        if (empty($_SESSION['admin_id'])) {
            return null;
        }

        $user = Database::fetchOne(
            "SELECT id, name, email, role, is_active, last_login, created_at FROM admin_users WHERE id = ? LIMIT 1",
            [$_SESSION['admin_id']]
        );

        if (!$user || !(int)($user['is_active'] ?? 1)) {
            self::logout();
            return null;
        }

        return [
            'id'        => $user['id'],
            'name'      => $user['name'],
            'email'     => $user['email'],
            'role'      => $user['role'],
            'isActive'  => (bool)($user['is_active'] ?? true),
            'lastLogin' => $user['last_login'] ?? null,
            'createdAt' => $user['created_at'] ?? null,
        ];
    }

    /**
     * Require authentication; aborts with 401 if unauthenticated
     */
    public static function requireAuth(): array {
        $user = self::user();
        if (!$user) {
            Response::unauthorized('Administrative session expired or unauthorized. Please log in.');
        }
        return $user;
    }

    /**
     * Require specific roles (e.g. SUPER_ADMIN)
     */
    public static function requireRole(string ...$roles): array {
        $user = self::requireAuth();
        if (!in_array($user['role'], $roles)) {
            Response::forbidden('You do not have the required permissions to perform this action.');
        }
        return $user;
    }
}
