<?php
/**
 * HOUSE ROBOTICS — Production Database Diagnostic & Auto-Setup Utility
 * Accessible at: https://houserobotics.online/api/test-db.php
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

$configPath = __DIR__ . '/../config/config.php';
$config = file_exists($configPath) ? require $configPath : [];
$dbCfg = $config['db'] ?? [];

$host     = $dbCfg['host'] ?? 'localhost';
$port     = (int)($dbCfg['port'] ?? 3306);
$database = $dbCfg['database'] ?? 'muhamma1_houserobotics';
$username = $dbCfg['username'] ?? 'muhamma1_houserobotics';
$password = $dbCfg['password'] ?? '####Sameer1234567890';

$message = '';
$actionStatus = null;

// Handle manual credential test & save
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_config') {
    $testHost = trim($_POST['db_host'] ?? 'localhost');
    $testPort = (int)($_POST['db_port'] ?? 3306);
    $testDb   = trim($_POST['db_name'] ?? 'muhamma1_houserobotics');
    $testUser = trim($_POST['db_user'] ?? 'muhamma1_houserobotics');
    $testPass = trim($_POST['db_pass'] ?? '');

    $testDsns = [
        "mysql:host={$testHost};port={$testPort};dbname={$testDb};charset=utf8mb4",
        "mysql:host=localhost;dbname={$testDb};charset=utf8mb4",
        "mysql:host=127.0.0.1;port={$testPort};dbname={$testDb};charset=utf8mb4",
        "mysql:unix_socket=/var/lib/mysql/mysql.sock;dbname={$testDb};charset=utf8mb4",
        "mysql:unix_socket=/tmp/mysql.sock;dbname={$testDb};charset=utf8mb4",
    ];

    $savedPdo = null;
    $saveError = null;

    foreach ($testDsns as $dsn) {
        try {
            $savedPdo = new PDO($dsn, $testUser, $testPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 4
            ]);
            break;
        } catch (PDOException $e) {
            $saveError = $e->getMessage();
        }
    }

    if ($savedPdo) {
        // Save to config/config.local.php
        $localCfgPath = __DIR__ . '/../config/config.local.php';
        $exportContent = "<?php\n// House Robotics Production Database Connection\nreturn [\n    'db' => [\n        'driver'    => 'mysql',\n        'host'      => " . var_export($testHost, true) . ",\n        'port'      => {$testPort},\n        'database'  => " . var_export($testDb, true) . ",\n        'username'  => " . var_export($testUser, true) . ",\n        'password'  => " . var_export($testPass, true) . ",\n        'charset'   => 'utf8mb4',\n        'collation' => 'utf8mb4_unicode_ci',\n        'options'   => [\n            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,\n            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n            PDO::ATTR_EMULATE_PREPARES   => false,\n        ],\n    ]\n];\n";
        file_put_contents($localCfgPath, $exportContent);

        // Run schema check & super admin seed
        require_once __DIR__ . '/../includes/Database.php';
        Database::ensureSchema();

        $actionStatus = 'success';
        $message = "Database connected successfully and saved to config/config.local.php! All tables verified.";
        // Refresh variables
        $host = $testHost;
        $port = $testPort;
        $database = $testDb;
        $username = $testUser;
        $password = $testPass;
    } else {
        $actionStatus = 'error';
        $message = "Connection failed with entered credentials: " . $saveError;
    }
}

// Handle 1-click database import request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'init_db') {
    try {
        require_once __DIR__ . '/../includes/Database.php';
        $pdo = Database::getInstance();
        $sqlFile = __DIR__ . '/../database/database.sql';
        if (file_exists($sqlFile)) {
            $sql = file_get_contents($sqlFile);
            $pdo->exec($sql);
            Database::ensureSchema();
            $actionStatus = 'success';
            $message = 'Database structure & seed data successfully imported from database.sql!';
        } else {
            $actionStatus = 'error';
            $message = 'database/database.sql file was not found on server.';
        }
    } catch (Throwable $e) {
        $actionStatus = 'error';
        $message = 'Failed to initialize database: ' . $e->getMessage();
    }
}

// Candidate Passwords
$passwords = array_values(array_unique(array_filter([
    $password,
    ltrim($password, '#'),
    trim($password),
    '####Sameer1234567890',
    'Sameer1234567890',
    'Y&VO{(w0J3A6}',
    'Y&VO{(w0J3A6',
    '#Sameer1234567890',
    '##Sameer1234567890',
    '###Sameer1234567890'
])));

// Candidate Usernames (configured, cPanel master account, truncated 16-char)
$usernames = array_values(array_unique(array_filter([
    $username,
    'muhamma1_robotic',
    'muhamma1_prettypuff',
    'muhamma1_houserobotics',
    'muhamma1',
    substr($username, 0, 16)
])));

// Test connection across targets (only valid hosts and real existent sockets)
$targets = [
    'localhost' => "mysql:host=localhost;dbname={$database};charset=utf8mb4",
    '127.0.0.1' => "mysql:host=127.0.0.1;port={$port};dbname={$database};charset=utf8mb4",
];

$possibleSockets = array_filter(array_unique([
    ini_get('pdo_mysql.default_socket'),
    ini_get('mysqli.default_socket'),
    ini_get('mysql.default_socket'),
    '/var/lib/mysql/mysql.sock',
    '/tmp/mysql.sock'
]));

foreach ($possibleSockets as $sock) {
    if (!empty($sock) && @file_exists($sock)) {
        $targets["Socket ({$sock})"] = "mysql:unix_socket={$sock};dbname={$database};charset=utf8mb4";
    }
}

$connResult = null;
$connError = null;
$authError = null;
$connectedTarget = null;
$connectedUser = null;
$connectedPass = null;
$pdoInstance = null;

foreach ($usernames as $u) {
    foreach ($passwords as $p) {
        foreach ($targets as $label => $dsn) {
            try {
                $pdo = new PDO($dsn, $u, $p, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_TIMEOUT => 4
                ]);
                $connResult = 'SUCCESS';
                $connectedTarget = $label;
                $connectedUser = $u;
                $connectedPass = $p;
                $pdoInstance = $pdo;
                break 3;
            } catch (PDOException $e) {
                $connError = $e->getMessage();
                if (str_contains($e->getMessage(), '1045') || str_contains($e->getMessage(), '1049')) {
                    $authError = $e->getMessage();
                }
            }
        }
    }
}

if ($connResult !== 'SUCCESS' && $authError) {
    $connError = $authError;
}

// If connected and config.local.php does not exist, auto-create it
if ($connResult === 'SUCCESS' && $connectedUser && $connectedPass) {
    $localCfgPath = __DIR__ . '/../config/config.local.php';
    if (!file_exists($localCfgPath) && is_writable(__DIR__ . '/../config')) {
        $exportContent = "<?php\n// House Robotics Production Database Connection\nreturn [\n    'db' => [\n        'driver'    => 'mysql',\n        'host'      => 'localhost',\n        'port'      => {$port},\n        'database'  => " . var_export($database, true) . ",\n        'username'  => " . var_export($connectedUser, true) . ",\n        'password'  => " . var_export($connectedPass, true) . ",\n        'charset'   => 'utf8mb4',\n        'collation' => 'utf8mb4_unicode_ci',\n        'options'   => [\n            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,\n            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n            PDO::ATTR_EMULATE_PREPARES   => false,\n        ],\n    ]\n];\n";
        @file_put_contents($localCfgPath, $exportContent);
    }
}

$tables = [];
$adminCount = 0;
if ($pdoInstance) {
    try {
        $stmt = $pdoInstance->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (in_array('admin_users', $tables)) {
            $adminCount = (int)$pdoInstance->query("SELECT COUNT(*) FROM admin_users")->fetchColumn();
        } else {
            // Auto ensure schema if admin_users missing
            require_once __DIR__ . '/../includes/Database.php';
            Database::ensureSchema();
            $tables = $pdoInstance->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
            $adminCount = (int)$pdoInstance->query("SELECT COUNT(*) FROM admin_users")->fetchColumn();
        }
    } catch (Throwable $e) {
        // Ignore
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>House Robotics — Database Diagnostic &amp; Setup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0a1d; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { background: #171431; border: 1px solid #2e265c; border-radius: 16px; max-width: 840px; margin: 0 auto; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    h1 { margin-top: 0; font-size: 24px; color: #fff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .badge-ok { background: #065f46; color: #34d399; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: bold; }
    .badge-err { background: #881337; color: #fb7185; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: bold; }
    .alert-box { padding: 16px; border-radius: 12px; margin-bottom: 24px; font-size: 14px; line-height: 1.5; }
    .alert-box.success { background: #064e3b; border: 1px solid #059669; color: #a7f3d0; }
    .alert-box.error { background: #4c0519; border: 1px solid #be123c; color: #fecdd3; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    td, th { padding: 10px 12px; text-align: left; border-bottom: 1px solid #241e45; }
    th { color: #94a3b8; font-weight: 600; text-transform: uppercase; font-size: 11px; }
    .guide-box { background: #1f1b40; border: 1px solid #3b3172; border-radius: 12px; padding: 20px; margin-top: 24px; }
    .guide-box h3 { margin-top: 0; color: #a78bfa; font-size: 16px; }
    .step { margin-bottom: 12px; padding-left: 20px; position: relative; font-size: 14px; color: #cbd5e1; line-height: 1.6; }
    .step strong { color: #fff; }
    .btn { display: inline-block; background: #6D28D9; color: #fff; text-decoration: none; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: background 0.2s; }
    .btn:hover { background: #5B21B6; }
    .btn-success { background: #059669; }
    .btn-success:hover { background: #047857; }
    .btn-return { display: inline-block; margin-top: 20px; color: #a78bfa; text-decoration: none; font-size: 13px; }
    .form-group { margin-bottom: 14px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; }
    .form-group input { width: 100%; padding: 10px 14px; background: #0c0a1d; border: 1px solid #3b3172; border-radius: 8px; color: #fff; font-size: 14px; font-family: inherit; }
    .form-group input:focus { outline: none; border-color: #6D28D9; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="card">
    <h1>
      <span>House Robotics — Database Diagnostic</span>
      <?php if ($connResult === 'SUCCESS'): ?>
        <span class="badge-ok">CONNECTED</span>
      <?php else: ?>
        <span class="badge-err">CONNECTION FAILED</span>
      <?php endif; ?>
    </h1>

    <?php if ($message): ?>
      <div class="alert-box <?= $actionStatus ?>">
        <?= htmlspecialchars($message) ?>
      </div>
    <?php endif; ?>

    <table>
      <tr>
        <th>Parameter</th>
        <th>Configured Value</th>
        <th>Connection Result</th>
      </tr>
      <tr>
        <td><strong>Database Host</strong></td>
        <td><?= htmlspecialchars($host) ?> (Port: <?= htmlspecialchars((string)$port) ?>)</td>
        <td><?= $connectedTarget ? "Resolved via {$connectedTarget}" : "Tried localhost, 127.0.0.1 & Unix Sockets" ?></td>
      </tr>
      <tr>
        <td><strong>Database Name</strong></td>
        <td><code><?= htmlspecialchars($database) ?></code></td>
        <td><?= $connResult === 'SUCCESS' ? '✅ Database Found' : '❌ Verify Name in cPanel' ?></td>
      </tr>
      <tr>
        <td><strong>Database User</strong></td>
        <td><code><?= htmlspecialchars($username) ?></code></td>
        <td><?= $connectedUser ? "✅ Authenticated as '{$connectedUser}'" : '❌ Access Denied (Error 1045)' ?></td>
      </tr>
      <tr>
        <td><strong>Tables in Database</strong></td>
        <td><?= count($tables) ?> tables found</td>
        <td><?= count($tables) >= 20 ? '✅ Full Schema Active' : (count($tables) > 0 ? '⚠️ Partial Schema' : '❌ 0 Tables') ?></td>
      </tr>
      <tr>
        <td><strong>Admin Accounts</strong></td>
        <td><?= $adminCount ?> admin accounts</td>
        <td><?= $adminCount > 0 ? '✅ Ready for Login' : '❌ Super Admin Missing' ?></td>
      </tr>
    </table>

    <?php if ($connResult === 'SUCCESS'): ?>
      <div class="guide-box" style="border-color: #059669; background: #064e3b15;">
        <h3 style="color: #34d399;">✅ Database Connected Successfully!</h3>
        <p style="font-size: 14px; color: #cbd5e1;">
          Your MySQL connection is 100% active. You can now login to the Admin Panel:
        </p>
        <div style="background: #171431; padding: 14px; border-radius: 8px; margin: 14px 0; font-size: 13px;">
          <div><strong>Email:</strong> <code>sameerliaqat81@gmail.com</code></div>
          <div style="margin-top: 6px;"><strong>Password:</strong> <code>Y&amp;VO{(w0J3A6}</code> (ya <code>Y&amp;VO{(w0J3A6</code>)</div>
        </div>
        <p>
          <a href="/admin" class="btn btn-success">Go to Admin Login (/admin) →</a>
        </p>
        <?php if ($adminCount === 0 || count($tables) < 5): ?>
          <hr style="border: none; border-top: 1px solid #05966944; margin: 20px 0;">
          <p style="font-size: 13px; color: #fbbf24;">
            <strong>Notice:</strong> Your database tables have not been fully populated yet. Click below to initialize all 24 tables and seed the admin:
          </p>
          <form method="POST">
            <input type="hidden" name="action" value="init_db">
            <button type="submit" class="btn" style="background: #059669;">1-Click: Initialize All Tables &amp; Seed Admin</button>
          </form>
        <?php endif; ?>
      </div>
    <?php else: ?>
      <div class="alert-box error" style="margin-top: 24px;">
        <strong>Exact Error from MySQL:</strong><br>
        <code><?= htmlspecialchars($connError ?? 'Could not establish connection to MySQL') ?></code>
      </div>

      <!-- Live Test & Save Credentials Form -->
      <div class="guide-box" style="border-color: #6D28D9;">
        <h3>🔑 Direct Test &amp; Save Credentials</h3>
        <p style="font-size: 13px; color: #cbd5e1;">
          Agar aap nay cPanel mein password change kiya hai ya koi aur password rakha hai, toh yahan direct enter kar kay test aur save kar saktay hain:
        </p>
        <form method="POST" style="margin-top: 16px;">
          <input type="hidden" name="action" value="save_config">
          <div class="grid-2">
            <div class="form-group">
              <label>Database Host</label>
              <input type="text" name="db_host" value="localhost" required>
            </div>
            <div class="form-group">
              <label>Database Name</label>
              <input type="text" name="db_name" value="<?= htmlspecialchars($database) ?>" required>
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label>MySQL Username</label>
              <input type="text" name="db_user" value="<?= htmlspecialchars($username) ?>" required>
            </div>
            <div class="form-group">
              <label>MySQL Password</label>
              <input type="text" name="db_pass" value="<?= htmlspecialchars($password) ?>" placeholder="Enter MySQL Password" required>
            </div>
          </div>
          <button type="submit" class="btn" style="margin-top: 8px;">Test &amp; Save Connection Live</button>
        </form>
      </div>

      <!-- cPanel Step by Step Guide -->
      <div class="guide-box">
        <h3>How to Fix in cPanel (2 Minutes):</h3>
        <div class="step">
          <strong>Step 1: Check or Reset Password in cPanel</strong><br>
          cPanel login karein &gt; <strong>MySQL® Databases</strong> par click karein.<br>
          Neechay scroll karein <strong>"Current Users"</strong> table par.<br>
          <code>muhamma1_robotic</code> kay samnay <strong>"Change Password"</strong> par click karein aur password <code>####Sameer1234567890</code> set karein.
        </div>
        <div class="step">
          <strong>Step 2: Ensure User is Added to Database</strong><br>
          Usi page par <strong>"Add User to Database"</strong> section mein:<br>
          • <strong>User:</strong> <code>muhamma1_robotic</code><br>
          • <strong>Database:</strong> <code>muhamma1_robotic</code><br>
          • <strong>Add</strong> button dabayein &gt; Agli screen par <strong>ALL PRIVILEGES</strong> tick karein &gt; <strong>Make Changes</strong> dabayein.
        </div>
        <div class="step">
          <strong>Step 3: Refresh this page</strong><br>
          Upar refresh karein ya form mein password likh kar <strong>"Test &amp; Save Connection Live"</strong> dabayein.
        </div>
      </div>
    <?php endif; ?>

    <p style="text-align: center;">
      <a href="/admin" class="btn-return">← Back to Admin Login</a> |
      <a href="/" class="btn-return">Website Homepage →</a>
    </p>
  </div>
</body>
</html>
