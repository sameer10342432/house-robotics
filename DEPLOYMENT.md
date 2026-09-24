# ==============================================================
# HOUSE ROBOTICS — CPANEL & PRODUCTION DEPLOYMENT GUIDE
# Full-Service Digital Marketing & Technology Agency CMS
# ==============================================================

This document provides step-by-step, beginner-friendly instructions for deploying the **House Robotics** production web application to any standard **cPanel** hosting environment, VPS, or cloud server.

---

## 📋 PRE-DEPLOYMENT SPECIFICATIONS

| Component | Specification |
|-----------|---------------|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS 4 (Built to `/dist`) |
| **Backend** | Node.js + Express + Prisma ORM (Built to `/server.js`) |
| **Database** | SQLite (`file:./dev.db` zero-config) OR PostgreSQL / MySQL |
| **Node.js Version** | Node.js 18.x, 20.x, or 22.x LTS (Recommended: 20.x) |
| **Server Engine** | Phusion Passenger (cPanel "Setup Node.js App") or Reverse Proxy |
| **Admin Panel URL** | `https://your-domain.com/admin` |
| **Super Admin Email** | `sameerliaqat81@gmail.com` |
| **Super Admin Pass** | `Y&VO{(w0J3A6` |

---

## 🚀 STEP-BY-STEP CPANEL DEPLOYMENT INSTRUCTIONS

### Step 1: Upload the Deployment ZIP
1. Log in to your **cPanel Dashboard**.
2. Open **File Manager** and navigate to your application root:
   - For primary domain: `public_html/` or a dedicated app directory such as `/home/username/house-robotics/`
3. Click **Upload** in the top toolbar.
4. Select and upload `House-Robotics-Production.zip`.

---

### Step 2: Extract the Package
1. In File Manager, right-click `House-Robotics-Production.zip` and select **Extract**.
2. Extract the files directly into your application directory.
3. Confirm that the extracted directory contains:
   - `dist/` (contains production frontend bundle & `.htaccess`)
   - `prisma/` (contains database schema and SQLite `dev.db`)
   - `public/` (contains uploads, images, favicons, `.htaccess`)
   - `server/` (source backend routes, middleware, and services)
   - `server.js` (production compiled Node.js backend bundle)
   - `package.json` & `package-lock.json`
   - `.env.example`
   - `DEPLOYMENT.md`

---

### Step 3: Configure Environment Variables (`.env`)
1. In cPanel File Manager, locate `.env.example`.
2. Rename or copy it to `.env` (ensure "Show Hidden Files" is enabled in File Manager Settings).
3. Open `.env` in the Code Editor and update the following values:

```ini
# Application URLs
NODE_ENV=production
PORT=5000
APP_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
VITE_API_URL=https://your-domain.com

# Database (Default Zero-Config SQLite)
DATABASE_URL="file:./dev.db"

# Security Keys (Replace with your own 32+ character random strings)
JWT_SECRET=f98a72b6c3104e76a91d84b2c0193e47a52f9b8c1d3e5a7b9c0e2d4f6a8b1c3
SESSION_SECRET=a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef

# Admin Email
ADMIN_EMAIL=sameerliaqat81@gmail.com

# SMTP Email Configuration (Optional - for contact form notifications)
SMTP_HOST=mail.your-domain.com
SMTP_PORT=465
SMTP_USER=notifications@your-domain.com
SMTP_PASSWORD=YourSecureEmailPassword
EMAIL_FROM="House Robotics <notifications@your-domain.com>"
```
4. Click **Save Changes**.

---

### Step 4: Configure Node.js Application in cPanel
1. In the cPanel Dashboard, search for **"Setup Node.js App"** (under the **Software** section).
2. Click **Create Application**.
3. Fill in the configuration fields:
   - **Node.js version:** Select `20.x` (or `18.x` / `22.x`)
   - **Application mode:** Select `Production`
   - **Application root:** Enter the folder path (e.g. `public_html` or `house-robotics`)
   - **Application URL:** Select your domain (e.g. `your-domain.com`)
   - **Application startup file:** Enter `server.js`
4. Click **Create**.
5. Once created, click **Run NPM Install** (or install via cPanel terminal: `npm install --omit=dev`).

---

### Step 5: Initialize the Database
The production package comes pre-bundled with the initialized database (`prisma/dev.db`), containing:
- 21 Approved Services with full features, benefits, and workflows
- Full Blog Posts, Categories & Tags
- Approved Testimonials & FAQs
- Super Admin account pre-configured
- Complete Site Settings & SEO metadata

To verify or regenerate the Prisma client, run via cPanel Terminal:
```bash
npx prisma generate
```

*(Optional)* If you wish to re-seed fresh initial data:
```bash
npm run db:seed
```

---

### Step 6: Enable Free SSL Certificate
1. In cPanel, navigate to **SSL/TLS Status**.
2. Select your domain and click **Run AutoSSL** (or use **Let's Encrypt SSL**).
3. Ensure HTTPS is enforced.

---

### Step 7: Verification & Smoke Test
1. **Health Check:** Open `https://your-domain.com/api/health` in your browser.
   - Expected response:
   ```json
   {
     "status": "ok",
     "app": "House Robotics",
     "database": "connected",
     "env": "production",
     "uptime": 12
   }
   ```
2. **Public Website:** Visit `https://your-domain.com`.
   - Verify Home, About, Services, Blog, and Contact pages load smoothly.
   - Test responsive layout on mobile and desktop.
3. **Admin Panel:** Visit `https://your-domain.com/admin`.
   - Login with:
     - **Email:** `sameerliaqat81@gmail.com`
     - **Password:** `Y&VO{(w0J3A6`
   - Test navigating between Dashboard, Services, Blog CMS, Leads, Messages, Newsletter, Settings.

---

## 🛠️ TROUBLESHOOTING & FAQS

### Q: Why do I get a 404 when refreshing sub-pages like `/about` or `/services`?
**A:** Ensure `.htaccess` is present in your web root (`public_html/`). The `.htaccess` file includes Apache mod_rewrite rules that redirect all non-static requests to `index.html` for single-page application (SPA) client-side routing.

### Q: How do I change between SQLite and MySQL / PostgreSQL?
**A:**
- **SQLite (Default):** Zero configuration, fast, no database server setup needed. Perfect for most cPanel setups.
- **MySQL:** In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "mysql"`, set `DATABASE_URL="mysql://user:pass@localhost:3306/dbname"`, and run `npx prisma db push`.
- **PostgreSQL:** Change `provider = "postgresql"`, set `DATABASE_URL="postgresql://user:pass@localhost:5432/dbname?schema=public"`, and run `npx prisma db push`.

### Q: Where are uploaded media files stored?
**A:** Uploaded files from the Blog CMS and Media Library are stored in `/public/uploads/` and publicly accessible via `/uploads/filename.webp`.

---

## 📞 SUPPORT & TECHNICAL CONTACT
- **Agency:** House Robotics
- **Official Email:** `sameerliaqat81@gmail.com`
- **WhatsApp Support:** `+92 347 4542881`
