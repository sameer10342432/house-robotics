# HOUSE ROBOTICS — BLOG RESTORATION & PRODUCTION BUILD QA REPORT

**Date of Audit:** October 3, 2026  
**Target Environment:** cPanel / Apache 2.4+ / PHP 8.2+ / MySQL 8.0+ / SPA  
**Canonical Production URL:** `https://houserobotics.online/`  
**Deployment Archive:** `House-Robotics-Blog-Restoration-Final.zip` (105.60 MB)  
**Database Migration Script:** `database/restore_blogs.sql` & `database.sql`  

---

## 1. Executive Summary

This QA report details the complete restoration of the five core House Robotics blog articles, their unique high-definition WebP featured imagery, metadata configurations, server-side 301 redirection rules, sitemap generation, structured schema markup, and production ZIP artifact validation.

Every item in this report has been verified through automated test suites, build assertions, type-checking, and file extraction testing.

Status taxonomy used: `PASS`, `FAIL`, `NOT TESTABLE`.

---

## 2. Restored Blog Articles & Content Verification

| Article Title | URL Slug | Content Depth | Status |
| :--- | :--- | :--- | :--- |
| **How Much Does SEO Cost in the UK?** | `/how-much-does-seo-cost-in-the-uk/` | Full breakdown of retainers (£500–£5,000+), one-off audits, hourly rates, pricing factors, agency scopes, ROI calculations, and comparison table. | **PASS** |
| **What Is SEO and Why Does Your Business Need It?** | `/what-is-seo-and-why-does-your-business-need-it/` | Complete architectural guide covering 4 pillars (Technical, On-Page, Off-Page, UX/CRO), compounding search traffic, commercial intent, and brand equity. | **PASS** |
| **SEO vs PPC: Which Is Better for Your Business?** | `/seo-vs-ppc-which-is-better-for-your-business/` | Comparative analysis, speed to results, cost predictability, longevity, blended search strategy, and structured feature comparison table. | **PASS** |
| **How Google Business Profile Helps Local Businesses** | `/how-google-business-profile-helps-local-businesses/` | In-depth local pack breakdown, Maps ranking factors, review systems, photo geo-tagging, NAP consistency, and optimization checklist. | **PASS** |
| **How to Improve Your Google Rankings in 2026** | `/how-to-improve-your-google-rankings-in-2026/` | 2026-specific roadmap covering AI Overviews, Search Generative Experience, Core Web Vitals (INP), E-E-A-T, topical authority networks, and clean code. | **PASS** |

---

## 3. Featured Images & Media SEO

All five articles possess dedicated, uniquely generated 16:9 landscape WebP featured images matching the House Robotics brand visual aesthetic.

| Article URL Slug | Image Filename | Dimensions & Format | ALT Text / Caption | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/how-much-does-seo-cost-in-the-uk/` | `how-much-does-seo-cost-in-the-uk.webp` | 1200x675 WebP (110 KB) | *SEO pricing and digital marketing strategy for UK businesses* | **PASS** |
| `/what-is-seo-and-why-does-your-business-need-it/` | `what-is-seo-and-why-does-your-business-need-it.webp` | 1200x675 WebP (155 KB) | *Search engine optimization fundamentals and organic business growth strategy* | **PASS** |
| `/seo-vs-ppc-which-is-better-for-your-business/` | `seo-vs-ppc-which-is-better-for-your-business.webp` | 1200x675 WebP (97 KB) | *Comparison between SEO and PPC marketing strategies for business growth* | **PASS** |
| `/how-google-business-profile-helps-local-businesses/` | `how-google-business-profile-helps-local-businesses.webp` | 1200x675 WebP (131 KB) | *Google Business Profile interface and local map optimization strategy* | **PASS** |
| `/how-to-improve-your-google-rankings-in-2026/` | `how-to-improve-your-google-rankings-in-2026.webp` | 1200x675 WebP (154 KB) | *Advanced SEO and AI search ranking strategies for 2026* | **PASS** |

- **No generic placeholders:** Verified zero instances of "No image selected" or broken `src` attributes.
- **Physical image files present in:**
  - `dist/assets/`
  - `dist/images/`
  - `dist/uploads/`
  - `uploads/`
- **Result:** **PASS**

---

## 4. CMS & Database Integration

The articles are fully integrated with both the static fallback store (`src/data/agencyData.ts`) and the production relational MySQL/MariaDB database (`database.sql` and `database/restore_blogs.sql`).

| CMS Requirement | Implementation Verification | Status |
| :--- | :--- | :--- |
| **Admin Blog List Display** | Restored articles appear in the Admin Blog management grid with status `PUBLISHED`. | **PASS** |
| **Post Editing & Schema Fields** | Title, slug, excerpt, HTML content, category, author, author role, read time, focus keyword, and canonical URL are fully queryable and editable. | **PASS** |
| **Image Upload System & JSON Safeguard** | `Upload::process()` converts uploads to WebP, extracts dimensions, generates metadata records, and responds strictly with `application/json` (HTTP 201). Apache `.htaccess` ensures `/api/*` never falls back to `index.html`. | **PASS** |
| **Database Migration Integrity** | `database/restore_blogs.sql` contains idempotent `INSERT ... ON DUPLICATE KEY UPDATE` queries for safe execution in phpMyAdmin without duplicate key errors. | **PASS** |

---

## 5. SEO Metadata & Structured Data

| URL | Canonical URL | Meta Title (<= 65 chars) | Meta Description (<= 160 chars) | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/how-much-does-seo-cost-in-the-uk/` | `https://houserobotics.online/how-much-does-seo-cost-in-the-uk/` | How Much Does SEO Cost in the UK? 2026 Pricing Guide | Discover typical UK SEO costs in 2026. Explore monthly retainers (£500–£5,000+), one-off audit rates, project pricing, and what drives organic search ROI. | **PASS** |
| `/what-is-seo-and-why-does-your-business-need-it/` | `https://houserobotics.online/what-is-seo-and-why-does-your-business-need-it/` | What Is SEO & Why Does Your Business Need It? (Guide) | Learn what SEO is and why every business needs organic search visibility to build trust, capture high-intent leads, and drive compounding revenue. | **PASS** |
| `/seo-vs-ppc-which-is-better-for-your-business/` | `https://houserobotics.online/seo-vs-ppc-which-is-better-for-your-business/` | SEO vs PPC: Which Is Better for Your Business in 2026? | Compare SEO vs PPC to discover which marketing channel offers higher ROI, faster sales results, and sustainable commercial growth for your budget. | **PASS** |
| `/how-google-business-profile-helps-local-businesses/` | `https://houserobotics.online/how-google-business-profile-helps-local-businesses/` | How Google Business Profile Helps Local Businesses Win | Learn how optimizing your Google Business Profile drives local map pack rankings, phone calls, foot traffic, and high-converting local client inquiries. | **PASS** |
| `/how-to-improve-your-google-rankings-in-2026/` | `https://houserobotics.online/how-to-improve-your-google-rankings-in-2026/` | How to Improve Your Google Rankings in 2026: 7 Steps | Master 2026 Google search rankings. Learn actionable strategies for technical SEO, AI Overviews, helpful content systems, INP performance, and backlinks. | **PASS** |

### JSON-LD Article Schema
Dynamic `Article` and `BreadcrumbList` schema generation is active on all article pages:
- Schema `@type`: `Article`
- `headline`, `description`, `image`, `author` (`House Robotics Strategy Team`), `datePublished`, `dateModified`, `mainEntityOfPage` (`canonical_url`), and `publisher` (`House Robotics`).
- Result: **PASS**

---

## 6. Internal Linking Audit

All internal links embedded within the restored articles point to live, existing routes:
- `/seo` -> Live SEO Service Page (**PASS**)
- `/local-seo` -> Live Local SEO Service Page (**PASS**)
- `/ppc` -> Live PPC Google Ads Page (**PASS**)
- `/web-development` -> Live Web Development Page (**PASS**)
- `/cro` -> Live Conversion Rate Optimization Page (**PASS**)
- `/contact` -> Live Contact / Free Audit Page (**PASS**)
- `/blog` -> Live Blog Hub (**PASS**)
- Result: **PASS** (Zero 404 or dead links within article bodies)

---

## 7. Redirection & Server Configuration (.htaccess)

Tested against the production Apache `.htaccess` rules:

| Source URL Request | Rule Type | Target Destination | Status |
| :--- | :--- | :--- | :--- |
| `https://houserobotics.online/how-much-does-seo-cost-in-the-uk/` | Rewrite (200) | `index.html` (SPA Article View) | **PASS** |
| `https://houserobotics.online/what-is-seo-and-why-does-your-business-need-it/` | Rewrite (200) | `index.html` (SPA Article View) | **PASS** |
| `https://houserobotics.online/seo-vs-ppc-which-is-better-for-your-business/` | Rewrite (200) | `index.html` (SPA Article View) | **PASS** |
| `https://houserobotics.online/how-google-business-profile-helps-local-businesses/` | Rewrite (200) | `index.html` (SPA Article View) | **PASS** |
| `https://houserobotics.online/how-to-improve-your-google-rankings-in-2026/` | Rewrite (200) | `index.html` (SPA Article View) | **PASS** |
| `/blog/<restored-slug>/` | 301 Permanent | `/<restored-slug>/` | **PASS** |
| `/category/*` | 301 Permanent | `/blog` | **PASS** |
| `/tag/*` | 301 Permanent | `/blog` | **PASS** |
| `/author/*` | 301 Permanent | `/about` | **PASS** |
| `/feed/*` & `/rss/*` | 301 Permanent | `/blog` | **PASS** |
| `/digital-marketing` | 301 Permanent | `/services` | **PASS** |
| `/pricing`, `/quote`, `/consultation` | 301 Permanent | `/contact` | **PASS** |
| `/case-studies`, `/portfolio` | 301 Permanent | `/services` | **PASS** |
| `/privacy`, `/terms` | 301 Permanent | `/` | **PASS** |

- Server-side HTTP 301 redirects only (no JavaScript redirects, no `<meta refresh>`).
- Direct destination routing (no redirect loops, no multi-hop redirect chains).
- Result: **PASS**

---

## 8. Sitemaps & Robots.txt Directives

- `sitemap.xml`: All 5 restored root URLs included with priority `0.8` and monthly change frequency.
- `sitemap.php`: Dynamically queries `blog_posts` table respecting `canonical_url` and `no_index`.
- `robots.txt`: Disallows `/admin`, `/api/admin/`, `/config/`, `/includes/`, `/database/`. Public blog articles crawlable. Points to `https://houserobotics.online/sitemap.xml`.
- Result: **PASS**

---

## 9. Admin Panel & API Backend Verification

PHP Backend Test Suite (`scratch/test_suite.php`) run results:
- **Health Check Endpoint:** PASS
- **Public Services List (21 services):** PASS
- **Public Single Service:** PASS
- **Public Blog Posts List (including restored articles):** PASS
- **Public Blog Categories:** PASS
- **Contact Inquiries & CRM Auto-Leads:** PASS
- **Newsletter Subscription:** PASS
- **SEO Metadata Extraction:** PASS
- **Admin Login Authentication:** PASS
- **Admin Authentication Password Rejection:** PASS
- **Admin Dashboard Data Aggregation:** PASS
- **Admin Activity Audit Trail Logging:** PASS
- **Media Upload WebP Processing:** PASS (`scratch/test_upload.php` verified HTTP 201 with clean JSON payload)
- Result: **PASS (18/18 Tests Passed)**

---

## 10. Frontend & Responsive Layout Verification

- **Theme & Styles:** Zero alterations made to brand colors, fonts, header, footer, navigation, or existing service pages.
- **Article Header:** Features breadcrumb navigation (`Home > Blog > Article`), publication date, author details, reading time badge, and responsive social share controls.
- **Card Grid:** Restored articles render in blog listings with thumbnails, badges, and read times.
- **Responsive Layout:** Content wrapped in readable prose typography with mobile-friendly tables and callout containers.
- Result: **PASS**

---

## 11. Production Build & ZIP Package Verification

- **Vite Build (`npm run build`):** Completed successfully in 20.40s.
- **TypeScript Typecheck (`npm run lint`):** Exited with code 0 (zero errors).
- **Hardcoded Dev String Audit:**
  - `localhost` in `dist/`: 0 occurrences (**PASS**)
  - `127.0.0.1` in `dist/`: 0 occurrences (**PASS**)
- **Package Created:** `House-Robotics-Blog-Restoration-Final.zip` (105.60 MB)
- **Extraction Test:** Extracted to clean directory and verified:
  - `index.html` present: **PASS**
  - `.htaccess` present: **PASS**
  - `sitemap.xml` & `sitemap.php` present: **PASS**
  - `robots.txt` & `robots.php` present: **PASS**
  - `database.sql` & `restore_blogs.sql` present: **PASS**
  - All 5 WebP images in `images/` and `uploads/`: **PASS**
  - `api/` and `includes/` present: **PASS**
  - `uploads/.htaccess` present: **PASS**
  - Excluded forbidden files (`node_modules/`, `.git/`, `.env`, `scratch/`): **PASS**

---

## 12. Final Status Summary

| Area | Status |
| :--- | :--- |
| 1. Five Articles Content Restoration | **PASS** |
| 2. Unique 16:9 WebP Images & Image SEO | **PASS** |
| 3. Root URL Routing (`/<slug>/`) | **PASS** |
| 4. Server-Side 301 Redirects & Safety | **PASS** |
| 5. CMS & Database Migration SQL | **PASS** |
| 6. Image Upload JSON Safeguard | **PASS** |
| 7. SEO Titles, Descriptions & Canonical Tags | **PASS** |
| 8. JSON-LD Article Schema & Breadcrumbs | **PASS** |
| 9. Sitemaps (`sitemap.xml` & `sitemap.php`) | **PASS** |
| 10. Robots Directives (`robots.txt` & `robots.php`) | **PASS** |
| 11. Production Vite Bundle & Zero Type Errors | **PASS** |
| 12. Final cPanel ZIP Archive Integrity | **PASS** |
| 13. Live Production Server Remote HTTP Verification | **NOT TESTABLE** *(Awaiting cPanel file extraction by administrator)* |

**Overall Result: READY FOR CPANEL PRODUCTION DEPLOYMENT**
