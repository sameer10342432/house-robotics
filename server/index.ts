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

// Production Static Frontend Serving (cPanel Passenger / Single Node deployment)
const clientDist = path.join(process.cwd(), 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // SPA Catch-all route for frontend routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/sitemap.xml' || req.path === '/robots.txt') {
      return next();
    }
    const indexHtml = path.join(clientDist, 'index.html');
    if (fs.existsSync(indexHtml)) {
      return res.sendFile(indexHtml);
    }
    next();
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
