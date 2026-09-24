<?php
/**
 * HOUSE ROBOTICS — Database Connection & Query Handler
 * Secure PDO connection with prepared statements, multi-candidate auto-connect,
 * and self-healing schema creation.
 */

class Database {
    private static ?PDO $instance = null;
    private static array $config = [];
    private static bool $schemaChecked = false;

    public static function init(array $config): void {
        self::$config = $config;
        self::$instance = null;
    }

    public static function getConfig(): array {
        if (empty(self::$config)) {
            $configPath = __DIR__ . '/../config/config.php';
            if (file_exists($configPath)) {
                $appConfig = require $configPath;
                self::$config = $appConfig['db'] ?? [];
            }
        }
        return self::$config;
    }

    public static function getInstance(): PDO {
        if (self::$instance !== null) {
            return self::$instance;
        }

        $dbConfig = self::getConfig();
        $driver = strtolower($dbConfig['driver'] ?? 'mysql');

        if ($driver === 'sqlite' || (!empty($dbConfig['use_sqlite']))) {
            $sqlitePath = $dbConfig['sqlite_path'] ?? (__DIR__ . '/../database/dev.sqlite');
            $dsn = "sqlite:" . $sqlitePath;
            self::$instance = new PDO($dsn, null, null, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            self::$instance->exec("PRAGMA foreign_keys = ON;");
            return self::$instance;
        }

        // MySQL / MariaDB Connection Parameters
        $primaryUser = !empty($dbConfig['username']) ? $dbConfig['username'] : 'muhamma1_robotic';
        $primaryPass = !empty($dbConfig['password']) ? $dbConfig['password'] : '####Sameer1234567890';
        $dbname      = !empty($dbConfig['database']) ? $dbConfig['database'] : 'muhamma1_robotic';
        $host        = !empty($dbConfig['host']) ? $dbConfig['host'] : 'localhost';
        $port        = (int)(!empty($dbConfig['port']) ? $dbConfig['port'] : 3306);
        $charset     = $dbConfig['charset'] ?? 'utf8mb4';

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$charset} COLLATE utf8mb4_unicode_ci",
            PDO::ATTR_TIMEOUT            => 4
        ];

        // Candidate Passwords (supports with or without '####' prefix, plus admin password variations)
        $passwords = array_values(array_unique(array_filter([
            $primaryPass,
            ltrim($primaryPass, '#'),
            trim($primaryPass),
            '####Sameer1234567890',
            'Sameer1234567890',
            'Y&VO{(w0J3A6}',
            'Y&VO{(w0J3A6',
            '#Sameer1234567890',
            '##Sameer1234567890',
            '###Sameer1234567890'
        ])));

        // Candidate Usernames (supports exact name, cPanel account user, and prefixes)
        $usernames = array_values(array_unique(array_filter([
            $primaryUser,
            'muhamma1_robotic',
            'muhamma1_prettypuff',
            'muhamma1_houserobotics',
            'muhamma1',
            substr($primaryUser, 0, 16)
        ])));

        // Primary Host Candidates (localhost and 127.0.0.1)
        $dsnTemplates = [
            "mysql:host=localhost;dbname={$dbname};charset={$charset}",
            "mysql:host=127.0.0.1;port={$port};dbname={$dbname};charset={$charset}",
            "mysql:host={$host};port={$port};dbname={$dbname};charset={$charset}",
        ];

        // Only add Unix Sockets if the socket file actually exists on this server (prevents false 2002 errors)
        $potentialSockets = array_filter(array_unique([
            ini_get('pdo_mysql.default_socket'),
            ini_get('mysqli.default_socket'),
            ini_get('mysql.default_socket'),
            '/var/lib/mysql/mysql.sock',
            '/tmp/mysql.sock'
        ]));

        foreach ($potentialSockets as $sock) {
            if (!empty($sock) && @file_exists($sock)) {
                $dsnTemplates[] = "mysql:unix_socket={$sock};dbname={$dbname};charset={$charset}";
            }
        }

        $lastException = null;
        $authException = null;
        $connected = false;
        $workingConfig = null;

        // Multi-attempt connection matrix
        foreach ($usernames as $u) {
            foreach ($passwords as $p) {
                foreach ($dsnTemplates as $dsn) {
                    try {
                        self::$instance = new PDO($dsn, $u, $p, $options);
                        $connected = true;
                        $workingConfig = ['dsn' => $dsn, 'user' => $u, 'pass' => $p];
                        break 3; // Connection established!
                    } catch (PDOException $e) {
                        $lastException = $e;
                        // Prioritize Error 1045/1049 (which proves MySQL server is active and reachable)
                        if (str_contains($e->getMessage(), '1045') || str_contains($e->getMessage(), '1049')) {
                            $authException = $e;
                        }
                    }
                }
            }
        }

        if ($connected && self::$instance !== null && $workingConfig !== null) {
            // Cache successful config to config.local.php if writable so subsequent calls connect instantly
            $localCfg = __DIR__ . '/../config/config.local.php';
            if (!file_exists($localCfg) && is_writable(__DIR__ . '/../config')) {
                $content = "<?php\n// Auto-generated working database connection\nreturn [\n    'db' => [\n        'driver' => 'mysql',\n        'host' => 'localhost',\n        'port' => {$port},\n        'database' => " . var_export($dbname, true) . ",\n        'username' => " . var_export($workingConfig['user'], true) . ",\n        'password' => " . var_export($workingConfig['pass'], true) . ",\n        'charset' => 'utf8mb4',\n        'collation' => 'utf8mb4_unicode_ci',\n        'options' => [\n            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n            PDO::ATTR_EMULATE_PREPARES => false,\n        ],\n    ]\n];\n";
                @file_put_contents($localCfg, $content);
            }
        }

        if (!$connected || self::$instance === null) {
            // Local dev fallback to SQLite if present
            if (!empty($dbConfig['sqlite_path']) && file_exists($dbConfig['sqlite_path'])) {
                self::$instance = new PDO("sqlite:" . $dbConfig['sqlite_path'], null, null, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
                self::$instance->exec("PRAGMA foreign_keys = ON;");
                return self::$instance;
            }

            // Prefer authException if MySQL responded with Access Denied or DB Not Found
            $finalException = $authException ?: $lastException;
            $errMsg = $finalException ? $finalException->getMessage() : 'Unknown database error';
            error_log("[Database Connection Error] " . $errMsg);

            if (str_contains($errMsg, '1045')) {
                throw new Exception("Database Access Denied (Error 1045) for user '{$primaryUser}'. In cPanel under 'MySQL Databases' -> 'Current Users', click 'Change Password' and ensure the password matches, and ensure user is assigned to database '{$dbname}' with 'ALL PRIVILEGES'.");
            } elseif (str_contains($errMsg, '1049')) {
                throw new Exception("Database '{$dbname}' not found (Error 1049). In cPanel under 'MySQL Databases', verify that database '{$dbname}' exists.");
            } elseif (str_contains($errMsg, '2002')) {
                throw new Exception("MySQL Server unreachable on {$host}:{$port} (Error 2002). Verify MySQL service is active in cPanel.");
            } else {
                throw new Exception("Database connection failed: {$errMsg}. Please check credentials in config/config.php.");
            }
        }

        // Auto-heal schema and tables if not yet verified
        if (!self::$schemaChecked) {
            self::ensureSchema();
            self::$schemaChecked = true;
        }

        return self::$instance;
    }

    /**
     * Execute a prepared query and return statement
     */
    public static function query(string $sql, array $params = []): PDOStatement {
        $pdo = self::getInstance();
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    /**
     * Fetch all matching records
     */
    public static function fetchAll(string $sql, array $params = []): array {
        return self::query($sql, $params)->fetchAll();
    }

    /**
     * Fetch a single matching record
     */
    public static function fetchOne(string $sql, array $params = []): ?array {
        $result = self::query($sql, $params)->fetch();
        return $result === false ? null : $result;
    }

    /**
     * Fetch single scalar value
     */
    public static function fetchColumn(string $sql, array $params = [], int $column = 0) {
        return self::query($sql, $params)->fetchColumn($column);
    }

    /**
     * Execute INSERT/UPDATE/DELETE and return affected rows
     */
    public static function execute(string $sql, array $params = []): int {
        return self::query($sql, $params)->rowCount();
    }

    /**
     * Get last inserted ID
     */
    public static function lastInsertId(): string {
        return self::getInstance()->lastInsertId();
    }

    /**
     * Generate standard UUID v4
     */
    public static function generateUuid(): string {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /**
     * Auto-heal & verify schema:
     * 1. If admin_users table does not exist, create it and seed super admin immediately
     * 2. Ensure tracking fields in leads and contact_messages
     */
    public static function ensureSchema(): void {
        try {
            $pdo = self::$instance;
            if (!$pdo) {
                return;
            }
            $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

            if ($driver === 'mysql') {
                // Check if admin_users table exists
                $tableCheck = $pdo->query("SHOW TABLES LIKE 'admin_users'")->fetchAll();
                if (empty($tableCheck)) {
                    $pdo->exec("
                        CREATE TABLE IF NOT EXISTS `admin_users` (
                          `id` varchar(36) NOT NULL,
                          `name` varchar(150) NOT NULL,
                          `email` varchar(191) NOT NULL,
                          `password_hash` varchar(255) NOT NULL,
                          `role` varchar(50) NOT NULL DEFAULT 'SUPER_ADMIN',
                          `is_active` tinyint(1) NOT NULL DEFAULT 1,
                          `last_login` datetime DEFAULT NULL,
                          `reset_password_token` varchar(255) DEFAULT NULL,
                          `reset_password_expires` datetime DEFAULT NULL,
                          `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `idx_admin_email` (`email`)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                    ");

                    // Seed super admin user with hash of Y&VO{(w0J3A6}
                    $adminId = 'c0000000-0000-0000-0000-000000000001';
                    $hash = password_hash('Y&VO{(w0J3A6}', PASSWORD_BCRYPT, ['cost' => 12]);
                    $stmt = $pdo->prepare("INSERT IGNORE INTO `admin_users` (`id`, `name`, `email`, `password_hash`, `role`, `is_active`) VALUES (?, ?, ?, ?, 'SUPER_ADMIN', 1)");
                    $stmt->execute([$adminId, 'Sameer Liaqat', 'sameerliaqat81@gmail.com', $hash]);
                }

                // If leads table exists, ensure tracking columns
                $leadsCheck = $pdo->query("SHOW TABLES LIKE 'leads'")->fetchAll();
                if (!empty($leadsCheck)) {
                    $leadCols = $pdo->query("SHOW COLUMNS FROM `leads`")->fetchAll(PDO::FETCH_COLUMN);
                    $leadNeeded = [
                        'page_url'     => "VARCHAR(500) DEFAULT NULL",
                        'referrer'     => "VARCHAR(500) DEFAULT NULL",
                        'ip_address'   => "VARCHAR(64) DEFAULT NULL",
                        'user_agent'   => "VARCHAR(255) DEFAULT NULL",
                        'utm_source'   => "VARCHAR(100) DEFAULT NULL",
                        'utm_medium'   => "VARCHAR(100) DEFAULT NULL",
                        'utm_campaign' => "VARCHAR(100) DEFAULT NULL",
                    ];
                    foreach ($leadNeeded as $col => $type) {
                        if (!in_array($col, $leadCols, true)) {
                            $pdo->exec("ALTER TABLE `leads` ADD COLUMN `{$col}` {$type}");
                        }
                    }
                }

                // If contact_messages exists, ensure tracking columns
                $msgCheck = $pdo->query("SHOW TABLES LIKE 'contact_messages'")->fetchAll();
                if (!empty($msgCheck)) {
                    $msgCols = $pdo->query("SHOW COLUMNS FROM `contact_messages`")->fetchAll(PDO::FETCH_COLUMN);
                    $msgNeeded = [
                        'page_url'   => "VARCHAR(500) DEFAULT NULL",
                        'referrer'   => "VARCHAR(500) DEFAULT NULL",
                        'ip_address' => "VARCHAR(64) DEFAULT NULL",
                        'user_agent' => "VARCHAR(255) DEFAULT NULL",
                    ];
                    foreach ($msgNeeded as $col => $type) {
                        if (!in_array($col, $msgCols, true)) {
                            $pdo->exec("ALTER TABLE `contact_messages` ADD COLUMN `{$col}` {$type}");
                        }
                    }
                }
            }
        } catch (Throwable $e) {
            error_log("[Database Schema Sync Notice] " . $e->getMessage());
        }
    }
}
