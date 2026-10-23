import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import { prisma } from './prisma';
import { errorHandler } from './middleware/errorHandler';

// Public routes
import publicServicesRouter from './routes/public/services';
import publicBlogRouter from './routes/public/blog';
import publicTestimonialsRouter from './routes/public/testimonials';
import publicFaqsRouter from './routes/public/faqs';
import publicContactRouter from './routes/public/contact';
import publicNewsletterRouter from './routes/public/newsletter';
import publicSeoRouter from './routes/public/seo';
import publicAnalyticsRouter from './routes/public/analytics';
import publicLocationsRouter from './routes/public/locations';
import sitemapRouter from './routes/public/sitemap';

// Admin routes
import adminAuthRouter from './routes/admin/auth';
import adminDashboardRouter from './routes/admin/dashboard';
import adminServicesRouter from './routes/admin/services';
import adminBlogRouter from './routes/admin/blog';
import adminLeadsRouter from './routes/admin/leads';
import adminMessagesRouter from './routes/admin/messages';
import adminTestimonialsRouter from './routes/admin/testimonials';
import adminFaqsRouter from './routes/admin/faqs';
import adminNewsletterRouter from './routes/admin/newsletter';
import adminMediaRouter from './routes/admin/media';
import adminSeoRouter from './routes/admin/seo';
import adminSettingsRouter from './routes/admin/settings';
import adminActivityLogsRouter from './routes/admin/activityLogs';
import adminUsersRouter from './routes/admin/users';
import adminLocationsRouter from './routes/admin/locations';
import adminReportsRouter from './routes/admin/reports';
import adminProspectsRouter from './routes/admin/prospects';

const app = express();

// Ensure public/uploads directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Security & Parsing Middlewares
const allowedOrigins = [
  config.corsOrigin,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, or specific origin
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving
app.use('/uploads', express.static(uploadDir));

// SEO Routes (Sitemap and Robots)
app.use('/', sitemapRouter);

// Health Check
app.get('/api/health', async (_req, res) => {
  let dbStatus = 'disconnected';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (e) {
    dbStatus = 'error';
  }

  res.json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    app: config.companyName,
    database: dbStatus,
    env: config.nodeEnv,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Public API Endpoints
app.use('/api/services', publicServicesRouter);
app.use('/api/blog', publicBlogRouter);
app.use('/api/testimonials', publicTestimonialsRouter);
app.use('/api/faqs', publicFaqsRouter);
app.use('/api/contact', publicContactRouter);
app.use('/api/consultation', publicContactRouter);
app.use('/api/newsletter', publicNewsletterRouter);
app.use('/api/seo', publicSeoRouter);
app.use('/api/analytics', publicAnalyticsRouter);
app.use('/api/locations', publicLocationsRouter);

// Admin API Endpoints
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin/dashboard', adminDashboardRouter);
app.use('/api/admin/services', adminServicesRouter);
app.use('/api/admin/blog', adminBlogRouter);
app.use('/api/admin/leads', adminLeadsRouter);
app.use('/api/admin/messages', adminMessagesRouter);
app.use('/api/admin/testimonials', adminTestimonialsRouter);
app.use('/api/admin/faqs', adminFaqsRouter);
app.use('/api/admin/newsletter', adminNewsletterRouter);
app.use('/api/admin/media', adminMediaRouter);
app.use('/api/admin/seo', adminSeoRouter);
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/admin/activity-logs', adminActivityLogsRouter);
app.use('/api/admin/users', adminUsersRouter);
app.use('/api/admin/locations', adminLocationsRouter);
app.use('/api/admin/reports', adminReportsRouter);
app.use('/api/admin/prospects', adminProspectsRouter);

// 404 handler for API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Global Error Handler
app.use(errorHandler);

// Production Static Frontend Serving with Pre-Rendered SEO Metadata Injection
const clientDist = path.join(process.cwd(), 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist, { index: false }));
  
  // SPA Catch-all route for frontend routes with server-side metadata injection
  app.get('*', async (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/sitemap.xml' || req.path === '/robots.txt') {
      return next();
    }
    const indexHtmlPath = path.join(clientDist, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
      return next();
    }

    try {
      let rawHtml = fs.readFileSync(indexHtmlPath, 'utf8');
      const cleanPath = req.path.replace(/\/+$/, '') || '/';
      const baseUrl = 'https://houserobotics.online';

      // Check database first
      let meta: any = null;
      try {
        if (cleanPath.startsWith('/usa/')) {
          meta = await prisma.usaLocationPage.findUnique({
            where: { urlPath: cleanPath }
          });
        }
        if (!meta) {
          meta = await prisma.seoMetadata.findUnique({
            where: { pagePath: cleanPath }
          });
        }
      } catch (dbErr) {
        // Fall back gracefully
      }

      let title = meta?.metaTitle || meta?.seoTitle;
      let description = meta?.metaDescription;
      let canonical = meta?.canonicalUrl || `${baseUrl}${cleanPath === '/' ? '/' : cleanPath}`;
      let robots = meta?.noIndex ? 'noindex, follow' : 'index, follow';

      // Fallback for well-known static paths if not in DB
      if (!title) {
        const fallbacks: Record<string, { title: string; description: string }> = {
          '/': {
            title: 'Digital Marketing & Technology Agency | House Robotics',
            description: 'House Robotics unites digital marketing, AI automation, and web development to help ambitious brands scale traffic, leads, and revenue.'
          },
          '/services': {
            title: 'Digital Marketing & Technology Services | House Robotics',
            description: 'Explore full-service digital marketing and technology solutions: SEO, Google Ads, custom web development, AI automation, and CRO for growth.'
          },
          '/about': {
            title: 'About House Robotics | Digital Marketing & Tech Agency',
            description: 'Learn how House Robotics pairs seasoned digital marketing strategists with software engineers to deliver compounding business growth for clients.'
          },
          '/contact': {
            title: 'Contact House Robotics | Free Growth Consultation',
            description: 'Schedule your 30-minute growth consultation with House Robotics. Connect with our digital marketing and web technology specialists today.'
          },
          '/blog': {
            title: 'Digital Marketing & Tech Insights | House Robotics Blog',
            description: 'Read actionable playbooks on generative SEO, AI automation workflows, paid media bidding, and web speed optimization from House Robotics.'
          },
          '/seo': {
            title: 'Professional SEO Services | Organic Search Optimization',
            description: 'Accelerate organic traffic and qualified leads with data-backed SEO services, technical search audits, high-intent content, and link building.'
          },
          '/web-development': {
            title: 'Custom Web Development Services | House Robotics',
            description: 'Engineer ultra-fast, responsive web applications with modern web development services built in React, TypeScript, and clean semantic architecture.'
          },
          '/ai-automation': {
            title: 'AI Automation Services & Workflows | House Robotics',
            description: 'Automate repetitive tasks and qualify leads 24/7 with custom AI automation services, intelligent CRM webhooks, and streamlined workflows.'
          },
          '/usa': {
            title: 'USA Digital Marketing, SEO & Web Dev | House Robotics',
            description: 'Specialized digital marketing, technical SEO, custom web development, and AI automation for high-growth businesses across all 50 US states.'
          }
        };

        if (fallbacks[cleanPath]) {
          title = fallbacks[cleanPath].title;
          description = fallbacks[cleanPath].description;
        } else if (cleanPath.startsWith('/usa/')) {
          const parts = cleanPath.split('/').filter(Boolean);
          if (parts.length === 2) {
            const stName = parts[1].split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            title = stName.length > 14
              ? `Web Dev, SEO & AI in ${stName} | House Robotics`
              : `Web Dev, SEO & AI Automation in ${stName} | House Robotics`;
            description = `Scalable web development, technical SEO, and AI automation for businesses across ${stName}. Remote excellence for commercial growth.`;
          } else if (parts.length === 3) {
            const cityName = parts[2].split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            title = `Web Dev, SEO & AI in ${cityName} | House Robotics`;
            description = `Accelerate growth in ${cityName} with custom web engineering, high-ranking SEO campaigns, and intelligent AI automation. Schedule a consultation.`;
          }
        }
      }

      if (title && description) {
        // Enforce strict limits: Title <= 60, Desc <= 160
        if (title.length > 60) title = title.substring(0, 60);
        if (description.length > 160) description = description.substring(0, 160);

        rawHtml = rawHtml
          .replace(/<title>.*?<\/title>/is, `<title>${title}</title>`)
          .replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="description" content="${description}" />`)
          .replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/is, `<link rel="canonical" href="${canonical}" />`)
          .replace(/<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="robots" content="${robots}" />`)
          .replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:url" content="${canonical}" />`)
          .replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:title" content="${title}" />`)
          .replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:description" content="${description}" />`);
      }

      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      return res.send(rawHtml);
    } catch (e) {
      return res.sendFile(indexHtmlPath);
    }
  });
}

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[HOUSE ROBOTICS API] Server running on http://localhost:${config.port}`);
    console.log(`[HOUSE ROBOTICS API] Admin API ready at http://localhost:${config.port}/api/admin`);
    console.log(`[HOUSE ROBOTICS API] Official Contact: ${config.officialEmail} | ${config.officialWhatsApp}`);
  });
}

export default app;
