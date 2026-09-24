# House Robotics — Complete cPanel Deployment & Operations Guide

Production Website: **https://houserobotics.online/**  
Architecture: **React SPA + PHP 8.2+ REST API + MySQL/MariaDB + Admin Panel + Gmail Inquiry Notifications**

---

## 📋 System & Hosting Specifications

| Specification | Target Configuration |
|---|---|
| **Production Domain** | `https://houserobotics.online/` |
| **Hosting Platform** | Standard cPanel Shared / VPS / Cloud Hosting |
| **Web Server** | Apache 2.4+ with `mod_rewrite` enabled |
| **PHP Version** | **PHP 8.2+** (PHP 8.2 or PHP 8.3) |
| **Database Server** | MySQL 5.7+ / 8.0+ or MariaDB 10.3+ |
| **Database Name** | `muhamma1_robotic` |
| **Database User** | `muhamma1_robotic` |
| **Database Host** | `localhost` |
| **PHP Extensions** | `pdo`, `pdo_mysql`, `json`, `mbstring`, `fileinfo`, `gd`, `openssl`, `curl` |
| **Email Inquiries** | `sameerliaqat81@gmail.com` |
| **Admin Panel** | `https://houserobotics.online/admin` |
| **Node.js / PM2 / Docker** | **NOT REQUIRED on the live hosting server** |

---

## 🚀 24-Step Production Deployment Procedure

### 1. Login to cPanel
- Navigate to your cPanel hosting URL (e.g., `https://houserobotics.online:2083` or your web host's client portal).
- Enter your cPanel administrative username and password.

### 2. Open MySQL® Databases
- In the **Databases** category of cPanel, click **MySQL® Databases**.

### 3. Verify Database
- Under **Current Databases**, check that database `muhamma1_robotic` exists.
- If not yet created, create it under **Create New Database**: `muhamma1_robotic`.

### 4. Verify Database User
- Under **Current Users**, verify user `muhamma1_robotic` exists.
- If not yet created, add user `muhamma1_robotic` with your assigned password.

### 5. Verify User Privileges
- In the **Add User to Database** section, ensure `muhamma1_robotic` is assigned to database `muhamma1_robotic`.
- Verify **ALL PRIVILEGES** are selected and click **Make Changes**.

### 6. Open phpMyAdmin
- Return to the main cPanel dashboard.
- In the **Databases** category, click **phpMyAdmin**.
- In the left sidebar, click the database: **`muhamma1_robotic`**.

### 7. Import `database.sql` (if required)
- Check if tables already exist in `muhamma1_robotic`:
  - If the database is empty: Click the **Import** tab.
  - Choose `database/database.sql` (from the extracted ZIP).
  - Format: **SQL**, Character Set: **utf8mb4**. Click **Import**.
  - All 24 tables are created with `CREATE TABLE IF NOT EXISTS` (non-destructive) and seeded with 21 services, blog categories, sample posts, FAQs, testimonials, and default super admin credentials.
  - If tables already exist: You do **not** need to drop anything! The non-destructive SQL and automatic runtime schema checks ensure existing data is 100% preserved.

### 8. Open File Manager
- Return to the cPanel dashboard.
- In the **Files** category, click **File Manager**.

### 9. Open `public_html`
- Double-click on the **`public_html`** folder (the document root for `https://houserobotics.online/`).
- If there are old default placeholder files (e.g., `default.html`), remove or back them up.

### 10. Upload ZIP
- In the File Manager top toolbar, click **Upload**.
- Upload **`House-Robotics-cPanel-Production.zip`**.
- Wait until the progress bar reaches 100% and turns green.

### 11. Extract ZIP
- Return to `public_html`.
- Select `House-Robotics-cPanel-Production.zip` and click **Extract** (or right-click → Extract).
- Confirm the target directory is `/public_html`.
- After extraction finishes, you may safely delete the `.zip` archive.

### 12. Verify `index.html` Location
- Ensure **`index.html`** is located **directly inside `public_html/`**:
  ```text
  public_html/
  ├── index.html              <-- Directly in public_html
  ├── .htaccess               <-- Apache SPA routing + /api/ dispatcher + HTTPS
  ├── robots.php              <-- Dynamic crawler directives (routed via /robots.txt)
  ├── sitemap.php             <-- Dynamic XML sitemap (routed via /sitemap.xml)
  ├── favicon.ico, favicon.svg
  ├── assets/                 <-- Production JavaScript, CSS, and fonts
  ├── images/                 <-- 27 required WebP visuals and illustrations
  ├── uploads/                <-- Media uploads directory (with .htaccess execution blocker)
  ├── api/                    <-- Production PHP REST API (index.php, contact, auth)
  ├── config/                 <-- config.php (database and mail credentials)
  ├── includes/               <-- Database.php, Mailer.php, Auth.php, Upload.php, Security.php
  ├── database/               <-- database.sql reference backup
  └── CPANEL-DEPLOYMENT.md
  ```

### 13. Configure PHP Database Credentials
- In File Manager, open the **`config`** folder.
- Right-click **`config.php`** and click **Edit**.
- Confirm the database credentials match your cPanel MySQL setup:
  ```php
  'db' => [
      'driver'    => 'mysql',
      'host'      => 'localhost',
      'port'      => 3306,
      'database'  => 'muhamma1_robotic',
      'username'  => 'muhamma1_robotic',
      'password'  => '####Sameer1234567890',
      'charset'   => 'utf8mb4',
      'collation' => 'utf8mb4_unicode_ci',
  ],
  ```

### 14. Select PHP 8.2+
- In cPanel, open **Select PHP Version** (or **MultiPHP Manager**).
- Set the PHP version for `houserobotics.online` to **PHP 8.2** or **PHP 8.3**.

### 15. Enable Required PHP Extensions
- Under **PHP Extensions** (or **Select PHP Version → Extensions**), verify the following modules are checked:
  - `pdo`
  - `pdo_mysql`
  - `json`
  - `mbstring`
  - `fileinfo`
  - `gd`
  - `openssl`
  - `curl`

### 16. Configure SMTP (for Gmail Notifications)
- In `config/config.php`, configure email dispatch:
  ```php
  'mail' => [
      'enabled'       => true,
      'driver'        => 'smtp',
      'host'          => 'smtp.gmail.com',
      'port'          => 587,
      'encryption'    => 'tls',
      'username'      => 'sameerliaqat81@gmail.com',
      'password'      => 'YOUR_GMAIL_16_DIGIT_APP_PASSWORD',
      'from_address'  => 'notifications@houserobotics.online',
      'from_name'     => 'House Robotics Notifications',
      'notify_address'=> 'sameerliaqat81@gmail.com',
  ],
  ```
  > **Note on Gmail App Passwords:** To send via Gmail SMTP, generate a 16-character App Password at:
  > Google Account → Security → 2-Step Verification → App passwords.
  > If left blank, cPanel's local Exim MTA (`mail()`) will deliver notifications automatically.

### 17. Open Website
- Navigate to: **`https://houserobotics.online/`**
- Verify the homepage loads instantly over HTTPS with all WebP hero imagery and smooth animations.

### 18. Open Admin Panel
- Navigate to: **`https://houserobotics.online/admin`**
- The dark-mode secure Admin Login interface will be displayed.

### 19. Test Admin Login
- Enter the Super Admin credentials:
  - **Email:** `sameerliaqat81@gmail.com` (or `admin`)
  - **Password:** `Y&VO{(w0J3A6}` (or your account password `####Sameer1234567890`)
- Confirm successful authentication and redirection to the **House Robotics Command Center Dashboard**.
- Verify that real-time counts from MySQL are displayed:
  - Total Inquiries & New Inquiries
  - Total Leads, Contacted, Qualified, Proposals, Won, Lost
  - Blog Posts (Published & Drafts)
  - Services (21 Services)
  - Newsletter Subscribers

### 20. Submit a Test Inquiry
- Open an incognito browser window and visit `https://houserobotics.online/contact` (or click any CTA "Get a Free Consultation" button).
- Submit a test inquiry:
  - **Name:** `Production Test Lead`
  - **Email:** `test.client@example.com`
  - **Phone:** `+1 555 019 2831`
  - **Company:** `Apex Enterprise Solutions`
  - **Service:** `Search Engine Optimization (SEO)`
  - **Budget:** `$5,000 - $10,000 / mo`
  - **Message:** `Live production inquiry test for House Robotics deployment verification.`
- Submit the form. Confirm immediate success screen and inquiry reference code (e.g. `HR-INQ-YYYYMMDD-XXXX`).

### 21. Verify Inquiry in Admin Panel
- Return to `https://houserobotics.online/admin`.
- Click on **Leads CRM** or **Inquiries**.
- Confirm that `Production Test Lead` immediately appears at the top with status `NEW`.
- Open the drawer to inspect the contact information, change the status to `QUALIFIED`, and add an internal note.

### 22. Verify Inquiry Arrives in Gmail
- Check the inbox of **`sameerliaqat81@gmail.com`**.
- Verify receipt of the email with subject:
  `New Website Inquiry — House Robotics — Search Engine Optimization (SEO) [HR-INQ-...]`
- Confirm all inquiry fields are present in the formatted table.
- Test hitting **Reply** in Gmail: verify it populates `test.client@example.com` in the recipient field via the `Reply-To` header.

### 23. Test Blog CMS
- In the Admin Panel, navigate to **Blog Posts**.
- Click **Create New Post**, enter a title, excerpt, and content, select category **SEO**, and click **Publish**.
- Visit `https://houserobotics.online/blog` and verify the new post is rendered immediately.

### 24. Test Media Library
- In the Admin Panel, navigate to **Media Library**.
- Click **Upload New Asset** and select a `.webp` or `.png` file.
- Confirm the image uploads to `uploads/`, receives a sanitized unique filename, and displays in the media gallery.

---

## 🔒 Security Architecture Highlights
1. **Directory Isolation:** The root `.htaccess` completely forbids direct web access to `/config/`, `/includes/`, and `/database/`. Any direct browser request returns `403 Forbidden`.
2. **Upload Execution Prevention:** `uploads/.htaccess` disables all script interpreters (`php_flag engine off`, `Deny from all` on `.php`, `.phtml`, `.cgi`, `.sh`, etc.).
3. **Prepared Statements:** 100% of SQL queries in `includes/Database.php` and `api/index.php` use PDO prepared statements with strict parameter binding.
4. **Session Hardening:** Admin sessions use `HR_ADMIN_SESS`, `HttpOnly=true`, `SameSite=Lax`, and `Secure=true` on HTTPS.
5. **No Node.js Dependency:** Production runs entirely on native Apache and PHP 8.2+ with zero background Node.js processes required.
