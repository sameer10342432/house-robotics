# House Robotics — cPanel Production Deployment Guide (USA Design Rollback)

This package contains the complete production-ready build of **House Robotics**, with the USA location pages safely rolled back to their exact verified pre-redesign design while preserving all CRM, SEO, PHP backend, and lead capture features.

---

## 📦 Package Information
- **Archive Name:** `House-Robotics-USA-Design-Rollback.zip`
- **Application:** House Robotics Website & Management System
- **Domain:** `https://houserobotics.online/`
- **PHP Version Requirement:** PHP 8.1+ (PHP 8.2 or 8.3 recommended)
- **Frontend Stack:** React 19 + TypeScript + Vite 8.3

---

## 🚀 Step-by-Step cPanel Deployment Instructions

### Step 1: Backup Current Live Site
1. Log into your **cPanel**.
2. Open **File Manager** and navigate to your document root (`public_html`).
3. Select all files, click **Compress**, and save as `backup-before-rollback.zip`.
4. (Optional) In **phpMyAdmin**, export a backup of database `muhamma1_houserobotics`.

### Step 2: Upload the Deployment ZIP
1. In cPanel **File Manager**, ensure you are in `public_html/`.
2. Click **Upload** in the top toolbar.
3. Select and upload `House-Robotics-USA-Design-Rollback.zip`.

### Step 3: Extract the Files
1. Right-click `House-Robotics-USA-Design-Rollback.zip` inside `public_html/`.
2. Click **Extract** and set the target path to `public_html/`.
3. Confirm extraction.
4. Delete or move the ZIP file out of `public_html/`.

### Step 4: Verify Directory Structure
The root of your `public_html/` should have:
```text
public_html/
├── index.php                      <-- Server-Side Initial HTML Pre-Renderer & Metadata Injector
├── index.html                     <-- Compiled React 19 SPA Template
├── .htaccess                      <-- Root Apache routing, HTTPS enforcement, SEO catch-all
├── assets/                        <-- Compiled Vite JS & CSS production bundles
│   ├── index-*.js
│   └── index-*.css
├── api/                           <-- Production REST API & Admin Controllers
│   ├── index.php
│   └── .htaccess
├── config/                        <-- Production database & security configuration
│   ├── config.php
│   └── config.example.php
├── includes/                      <-- Core PHP OOP classes (Database, Auth, Mailer, etc.)
│   └── Database.php
├── database/                      <-- SQL schemas & seed scripts
│   └── database.sql
├── uploads/                       <-- Upload directory (.htaccess secured)
├── sitemap.php                    <-- Dynamic XML sitemap generator
├── robots.php                     <-- Search crawler directives
├── USA-DESIGN-ROLLBACK-REPORT.md  <-- Rollback audit report
├── USA-DESIGN-ROLLBACK-QA-REPORT.md <-- QA verification matrix
└── README-CPANEL.md               <-- This guide
```

### Step 5: Verify Permissions
Ensure standard cPanel file permissions:
- Directories: `0755`
- Files: `0644`
- `uploads/` directory: writable (`0755` or `0775`)

---

## 🔍 Verification & Post-Deployment Testing

1. Open `https://houserobotics.online/usa` in your browser. Verify the restored original design (clean typography, original card styling, and directory filters).
2. Visit state and city pages:
   - `https://houserobotics.online/usa/texas`
   - `https://houserobotics.online/usa/texas/austin`
   - `https://houserobotics.online/usa/texas/austin/web-development`
3. Verify that the previous redesign components (custom scoped class names like `usa-hero-gradient` or `usa-card`) are absent.
4. Check non-USA pages (`https://houserobotics.online/`, `/services`, `/about`, `/contact`, `/blog`) to confirm zero regressions.
5. Check Admin Panel at `https://houserobotics.online/admin` to confirm login, CRM, and lead generation are operational.

---

## 📞 Support & Contacts
- **Technical Lead:** Sameer Liaqat
- **Official WhatsApp:** `+92 347 4542881`
- **Official Email:** `sameerliaqat81@gmail.com`
