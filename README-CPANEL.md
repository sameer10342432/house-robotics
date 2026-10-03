# HOUSE ROBOTICS — cPanel Production Deployment Guide
**Live Domain:** `https://houserobotics.online/`  
**Architecture:** React 19 SPA + PHP 8.2+ REST API + MySQL/MariaDB (PDO) + Admin Panel CMS

---

## 📋 Pre-Deployment Prerequisites

| Requirement | Specification |
|---|---|
| **Hosting Platform** | cPanel Shared / VPS / Dedicated / Cloud |
| **Web Server** | Apache 2.4+ with `mod_rewrite` & `mod_headers` enabled |
| **PHP Version** | **PHP 8.2 or 8.3** (Select via cPanel *MultiPHP Manager*) |
| **PHP Extensions** | `pdo`, `pdo_mysql`, `mbstring`, `fileinfo`, `gd`, `json`, `openssl`, `curl` |
| **Database Server** | MySQL 5.7+ / 8.0+ or MariaDB 10.3+ |
| **Database Name** | `muhamma1_houserobotics` |
| **Database User** | `muhamma1_houserobotics` |
| **Database Host** | `localhost` |
| **Notification Email** | `sameerliaqat81@gmail.com` |
| **Node.js / PM2 / Docker** | **NOT REQUIRED on the live server** |

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Backup Current Website & Database
1. In cPanel, navigate to **Backup** or **Backup Wizard**.
2. Download a full backup of your `public_html` directory.
3. In **phpMyAdmin**, export your existing database to a `.sql` file on your computer.

### Step 2: Upload `House-Robotics-Production-Final.zip`
1. In cPanel, click **File Manager**.
2. Navigate into your document root: **`public_html/`**.
3. In the top toolbar, click **Upload**.
4. Select `House-Robotics-Production-Final.zip` and upload it.
5. Wait for the upload progress bar to reach 100% and turn green.

### Step 3: Extract the ZIP
1. In `public_html/`, select `House-Robotics-Production-Final.zip`.
2. Click **Extract** in the top toolbar (or right-click → **Extract**).
3. Specify the destination folder as `/public_html`.
4. Click **Extract Files**.
5. Once extracted, you may delete the `.zip` archive from `public_html/`.

### Step 4: Verify File Placement in `public_html/`
Ensure all files sit directly in `public_html/` (NOT inside a nested subdirectory like `public_html/dist/` or `public_html/cpanel_production/`):
```text
public_html/
├── index.html                  <-- React SPA Entrypoint
├── assets/                     <-- Compiled JS/CSS bundles
├── api/                        <-- PHP REST API endpoints
│   ├── .htaccess               <-- Guarantees API routing to index.php
│   ├── index.php               <-- API Router & Controllers
│   ├── test-db.php             <-- Database connection diagnostic
│   ├── auth/                   <-- Auth compatibility endpoints
│   ├── contact/                <-- Contact form endpoint
│   └── newsletter/             <-- Newsletter subscription endpoint
├── config/                     <-- Secure backend configuration
│   ├── config.php              <-- Production configuration
│   └── config.example.php      <-- Template configuration
├── includes/                   <-- Core PHP OOP classes
│   ├── Database.php            <-- PDO with auto-reconnection
│   ├── Auth.php                <-- Session & bcrypt authentication
│   ├── Upload.php              <-- Secure file validation & metadata
│   ├── Response.php            <-- Standardized JSON response handler
│   ├── Security.php            <-- CSRF, XSS, rate-limiter
│   ├── Mailer.php              <-- Notification dispatcher
│   └── Audit.php               <-- Admin action audit logger
├── uploads/                    <-- Media storage directory
│   └── .htaccess               <-- Forbids script execution
├── .htaccess                   <-- Root Apache routing, HTTPS, caching
├── robots.txt                  <-- Search engine crawl directives
├── robots.php                  <-- Dynamic robots generator
├── sitemap.xml                 <-- Dynamic/Static XML Sitemap
├── sitemap.php                 <-- Dynamic sitemap generator
├── database.sql                <-- Complete database schema & seed data
└── README-CPANEL.md            <-- This guide
```

### Step 5: Configure Database Credentials Server-Side
1. In cPanel File Manager, open the **`config/`** directory.
2. If `config/config.local.php` does not exist, you can create it or edit `config/config.php`.
3. Verify your database connection settings:
   - **DB_HOST:** `localhost`
   - **DB_NAME:** `muhamma1_houserobotics`
   - **DB_USER:** `muhamma1_houserobotics`
   - **DB_PASSWORD:** Enter your assigned database password securely here.
   > **Note:** Database credentials are ONLY processed server-side in PHP. They are never exposed to JavaScript, frontend code, or git.

### Step 6: Import `database.sql` (if setting up a fresh database)
1. In cPanel, click **phpMyAdmin**.
2. In the left column, click database: **`muhamma1_houserobotics`**.
3. If tables already exist, skip to Step 7.
4. If empty: Click the **Import** tab.
5. Choose `database.sql` from your computer (or from `public_html/database.sql`).
6. Format: **SQL**, Character Set: **utf8mb4**.
7. Click **Import**.

### Step 7: Verify Database Connection via Diagnostic Tool
1. In your browser, open:
   `https://houserobotics.online/api/health`
2. It must return HTTP 200 with valid JSON:
   ```json
   {
     "status": "ok",
     "app": "House Robotics",
     "database": "connected"
   }
   ```
3. You can also run the database diagnostic utility:
   `https://houserobotics.online/api/test-db.php`
   It tests the MySQL connection, displays table counts, and checks super admin readiness.

### Step 8: Set Upload Directory Permissions
1. In File Manager, right-click the **`uploads/`** folder.
2. Select **Change Permissions**.
3. Set permissions to **`755`** (`rwxr-xr-x`).
4. Ensure the `.htaccess` file inside `uploads/` exists (it prevents execution of any `.php`, `.phtml`, or executable scripts in uploaded media).

### Step 9: Verify Root `.htaccess`
Verify that `public_html/.htaccess` contains:
- `RewriteRule ^api/(.*)$ api/index.php [L,QSA]`
- `RewriteCond %{REQUEST_URI} !^/api [NC]`
- `RewriteCond %{REQUEST_URI} !^/uploads [NC]`
- `RewriteCond %{REQUEST_URI} !\.php$ [NC]`
- `RewriteRule ^ index.html [L]`
This prevents Apache from ever rewriting `/api/*` or `/uploads/*` requests to `index.html`.

### Step 10: Verification Checklist
1. **Homepage:** Open `https://houserobotics.online/` — verify all sections and modern styling load smoothly.
2. **Admin Panel:** Open `https://houserobotics.online/admin` — verify login screen appears.
3. **Login:** Log in with the administrative credentials.
4. **Blog Image Upload:**
   - Go to **Blog** → **New Post** → **Featured Image**.
   - Click **Upload Image** and select a `.jpg`, `.png`, or `.webp` file.
   - Verify upload completes with a green success message and immediately displays the image preview.
   - Verify NO `Unexpected token '<'` error appears.
5. **Media Library:** Open **Media** tab — verify uploaded assets appear, can be searched, selected, and copied.
6. **Contact Form:**
   - On the public website, submit a test message via `/contact`.
   - Verify instant confirmation message is displayed.
   - In Admin Panel → **Leads** and **Messages**, verify the new submission appears immediately.
   - Verify notification email is dispatched to `sameerliaqat81@gmail.com`.
7. **Sitemap & Robots:**
   - Verify `https://houserobotics.online/sitemap.xml` returns valid XML.
   - Verify `https://houserobotics.online/robots.txt` returns crawl directives.
8. **Browser Cache:** If you see any old cached assets, perform a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`).
