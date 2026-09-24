# House Robotics — Full-Service Digital Marketing & Technology Agency

A modern, high-performance web application engineered for **House Robotics**, combining a React/Vite interactive frontend with a secure, native **PHP 8.2+** REST API and **MySQL/MariaDB** database architecture designed specifically for deployment on **cPanel Shared Hosting**.

---

## 🌟 Key Highlights

- **Zero Node.js On Live Server:** No Node.js, npm, PM2, Docker, or persistent processes required on cPanel. The live site runs purely on Apache + PHP 8.2+ + MySQL.
- **Identical Frontend Preserved:** All existing typography, colors, dark theme, smooth micro-animations, components, and pages are 100% preserved.
- **Native PHP 8.2+ REST API:** Built with pure, modern object-oriented PHP and PDO. Zero bulky framework dependencies.
- **Enterprise-Grade Security:** Prepared PDO statements, CSRF protection, `HttpOnly` secure cookies, brute-force rate limiting, strict MIME validation, and `.htaccess` execution blocks in uploads.
- **Full Admin CMS:** Services CMS, Blog CMS, Lead Management with CRM stages, Contact Messages, Media Library with dimension detection, Newsletter manager, Testimonials, FAQs, SEO metadata, and Audit Logs.
- **Automated Email Dispatch:** Contact & Consultation submissions create CRM leads, generate unique inquiry reference codes (`HR-INQ-YYYYMMDD-XXXX`), and notify `sameerliaqat81@gmail.com` via SMTP with native fallback.

---

## 📂 Project Architecture

```text
├── api/                         # Production PHP REST API
│   ├── index.php                # Master API Router & Controller Dispatcher
│   ├── auth/                    # Standalone authentication endpoints
│   ├── contact/                 # Contact form submission endpoint
│   ├── newsletter/              # Newsletter subscribe / unsubscribe
│   └── test_db.php              # Secure database connection tester
│
├── assets/                      # Compiled CSS, JavaScript chunks, and fonts (from Vite)
│
├── config/                      # Application & Database Configuration
│   ├── config.example.php       # Template with placeholders for cPanel setup
│   └── config.php               # Active configuration (MySQL credentials & Mail)
│
├── database/                    # Database DDL & Seed Data
│   └── database.sql             # Complete MySQL schema & initial seed data (24 tables)
│
├── images/                      # 27 House Robotics WebP visuals & service heroes
│
├── includes/                    # Core PHP Modules
│   ├── Database.php             # PDO Singleton with prepared statements & query helpers
│   ├── Response.php             # Standardized JSON response handler (CORS, HTTP codes)
│   ├── Security.php             # XSS cleaning, rate-limiting, and payload parsing
│   ├── Auth.php                 # Session management, bcrypt hashing, brute-force shield
│   ├── Mailer.php               # Socket-level SMTP client with mail() fallback
│   ├── Upload.php               # MIME verification, secure name generator, dimension parser
│   └── Audit.php                # Admin activity logger
│
├── uploads/                     # User-uploaded media assets
│   └── .htaccess                # Disables script execution in uploads directory
│
├── .htaccess                    # Root Apache rules: API routing, SPA rewrite, directory protection
├── robots.php                   # Dynamic crawler directives (serves /robots.txt)
├── sitemap.php                  # Dynamic XML sitemap generator (serves /sitemap.xml)
├── index.html                   # React single-page application compiled root
├── CPANEL-DEPLOYMENT.md         # Step-by-step cPanel hosting guide
└── README.md                    # Technical documentation
```

---

## 🗄️ Database Schema Overview

The database contains 24 relational tables in `database/database.sql` with full indexes, foreign keys, and pre-seeded content:

1. **`admins`**: Administrator accounts (Default Super Admin: `sameerliaqat81@gmail.com`).
2. **`admin_sessions`**: Active administrator session tokens.
3. **`password_resets`**: Secure tokens with expiry timestamps for admin password recovery.
4. **`services`**: 21 pre-configured digital agency services with unique slugs.
5. **`service_features`**: Detailed service features linked by foreign key.
6. **`service_benefits`**: Concrete business benefits for each service.
7. **`service_process`**: Phased execution steps for each service.
8. **`service_faqs`**: Targeted service FAQs.
9. **`blog_posts`**: Blog articles supporting statuses (`draft`, `published`, `scheduled`, `archived`), SEO fields, and reading times.
10. **`blog_categories`**: Hierarchical categories with slugs.
11. **`blog_tags`**: Tag taxonomy.
12. **`blog_post_tags`**: Many-to-many relationship linking posts and tags.
13. **`media`**: Uploaded media records with MIME type, dimensions, file size, alt text, and URLs.
14. **`testimonials`**: Client reviews, avatars, star ratings, and display order.
15. **`faqs`**: Global agency FAQs categorized by topic.
16. **`contact_messages`**: Direct inquiry submissions with status tracking.
17. **`leads`**: CRM pipeline records with stages (`new`, `contacted`, `qualified`, `proposal_sent`, `won`, `lost`).
18. **`newsletter_subscribers`**: Subscriber registry with duplicate prevention and unsubscribe tokens.
19. **`seo_metadata`**: Page-level SEO metadata (meta titles, descriptions, canonicals, robots, OG tags).
20. **`site_settings`**: Key-value settings for contact details, business hours, and social profiles.
21. **`analytics_events`**: Lightweight internal event tracking for pageviews and conversions.
22. **`activity_logs`**: Admin audit trail logging user actions, IP addresses, and user agents.

---

## 🔌 API Endpoints Summary

All production API calls use standard JSON over `/api/...`:

### Public Endpoints
- `GET /api/health` — System status, PHP version, and database connection check.
- `GET /api/services` — List published services with features and benefits.
- `GET /api/services/{slug}` — Retrieve complete service details by slug.
- `GET /api/blog` — Query published articles with pagination (`?page=1&limit=9`), category filter, and search.
- `GET /api/blog/{slug}` — Retrieve article by slug and increment view count.
- `GET /api/blog/categories` — List active blog categories.
- `GET /api/testimonials` — List approved client testimonials.
- `GET /api/faqs` — List agency FAQs.
- `POST /api/contact` (or `/api/contact/submit.php`) — Validate inquiry, store message & CRM lead, dispatch email notification to `sameerliaqat81@gmail.com`.
- `POST /api/newsletter/subscribe` — Subscribe an email address.
- `POST /api/newsletter/unsubscribe` — Unsubscribe using an email address or token.
- `GET /api/seo` — Fetch SEO metadata by route (`?path=/seo`).
- `POST /api/analytics/event` — Log page views and user engagement events.

### Admin Endpoints (Require Active Admin Session)
- `POST /api/admin/auth/login` — Authenticate admin with bcrypt and rate limiting.
- `POST /api/admin/auth/logout` — Terminate session.
- `GET /api/admin/auth/me` — Verify authenticated user profile.
- `POST /api/admin/auth/forgot-password` — Generate secure password reset token.
- `POST /api/admin/auth/reset-password` — Update password with verified token.
- `GET /api/admin/dashboard` — Aggregated counts: Leads, New Leads, Messages, Posts, Services, Subscribers.
- `GET|POST|PUT|DELETE /api/admin/services` — Services CRUD.
- `GET|POST|PUT|DELETE /api/admin/blog` — Blog posts CRUD.
- `GET|POST|PUT|DELETE /api/admin/categories` — Blog categories management.
- `GET|PUT|DELETE /api/admin/leads` — Lead CRM management and status progression.
- `GET|DELETE /api/admin/messages` — Contact message management.
- `GET|POST|DELETE /api/admin/media` — Upload, search, and delete media assets.
- `GET|POST|PUT|DELETE /api/admin/testimonials` — Testimonial management.
- `GET|POST|PUT|DELETE /api/admin/faqs` — FAQ management.
- `GET|DELETE /api/admin/newsletter` — Subscriber list management.
- `GET|POST /api/admin/seo` — Update per-page meta tags.
- `GET|POST /api/admin/settings` — Update agency site settings.
- `GET /api/admin/activity-logs` — Review audit trail.

---

## 🛠️ cPanel Deployment in 5 Minutes

1. **Create MySQL Database & User:**
   In cPanel -> **MySQL® Databases**, create a database and user, then assign **ALL PRIVILEGES**.
2. **Import Database:**
   In cPanel -> **phpMyAdmin**, select your new database and import `database/database.sql`.
3. **Upload & Extract:**
   In cPanel -> **File Manager**, navigate to `public_html/`, upload `House-Robotics-cPanel-Production.zip`, and extract.
4. **Configure Database Credentials:**
   Edit `config/config.php` inside `public_html/` and set:
   ```php
   'database' => 'your_cpanel_dbname',
   'username' => 'your_cpanel_dbuser',
   'password' => 'your_db_password',
   ```
5. **Set PHP Version:**
   In cPanel -> **Select PHP Version**, ensure **PHP 8.2 or 8.3** is active with `pdo_mysql`, `mbstring`, `fileinfo`, `gd`, `openssl`, and `curl` enabled.
6. **Open Website & Admin:**
   Visit your domain. Access `/admin` with:
   - **User:** `sameerliaqat81@gmail.com`
   - **Password:** `Y&VO{(w0J3A6}`

*(See [`CPANEL-DEPLOYMENT.md`](file:///d:/Sameer%20Projects/house-robotics---full-service-digital-marketing-&-technology-agency/CPANEL-DEPLOYMENT.md) for full instructions).*

---

## 🔍 Troubleshooting Guide

### 1. Website is completely blank
- **Cause:** Apache may not have `mod_rewrite` enabled or file permissions are too restrictive.
- **Solution:**
  - Check browser console (F12) for 403 or 404 on `assets/` files.
  - Verify file permissions: Directories must be `0755`, files must be `0644`.
  - Confirm `index.html` is located directly in `public_html/` (not inside a subfolder like `public_html/dist/`).

### 2. Internal pages show 404 Not Found on reload (e.g. `/services`, `/about`)
- **Cause:** `.htaccess` file was omitted during upload or server ignored `.htaccess`.
- **Solution:**
  - In cPanel File Manager -> Settings (top right), enable **"Show Hidden Files (dotfiles)"**.
  - Ensure `.htaccess` exists directly in `public_html/`.
  - Verify your hosting package has `AllowOverride All` enabled in Apache configuration.

### 3. API returns HTTP 500 Internal Server Error
- **Cause:** Database connection failure or missing PHP extensions.
- **Solution:**
  - Test connection directly in your browser: `https://yourdomain.com/api/health`
  - In cPanel -> **Select PHP Version**, verify `pdo_mysql`, `json`, `mbstring`, and `fileinfo` are enabled.
  - Check cPanel **Errors** or `public_html/error_log` for the exact line error.

### 4. "Database connection failed" in API response
- **Cause:** Incorrect database name, user, or password in `config/config.php`.
- **Solution:**
  - Ensure the database name and user include your cPanel account prefix (e.g. `cpaneluser_dbname`, not just `dbname`).
  - Verify the user was added to the database with **ALL PRIVILEGES** in cPanel -> **MySQL® Databases**.
  - On 99% of cPanel hosts, `'host' => 'localhost'` or `'127.0.0.1'`.

### 5. Media upload fails or shows error
- **Cause:** Upload directory permissions or PHP file size limits.
- **Solution:**
  - Ensure `uploads/` folder has `0755` or `0775` permissions.
  - In cPanel -> **Select PHP Version** -> **PHP Options**, increase `upload_max_filesize` to `20M` and `post_max_size` to `25M`.

---

## 🛡️ Security Credentials & Administration

- **Admin Portal:** `/admin`
- **Default Super Admin:** `sameerliaqat81@gmail.com`
- **Default Password:** `Y&VO{(w0J3A6}`
- **Lead Notification Email:** `sameerliaqat81@gmail.com`
*(Remember to update the admin password inside the Admin Panel after first deployment).*
