import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { config } from '../../config';

const router = Router();

// GET /sitemap.xml - dynamic production sitemap generator
router.get('/sitemap.xml', async (req: Request, res: Response): Promise<void> => {
  try {
    const baseUrl = config.appUrl.replace(/\/$/, '');

    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/blog', priority: '0.8', changefreq: 'daily' }
    ];

    const [services, blogPosts] = await Promise.all([
      prisma.service.findMany({
        where: { status: 'PUBLISHED', noIndex: false },
        select: { slug: true, updatedAt: true }
      }),
      prisma.blogPost.findMany({
        where: { status: 'PUBLISHED', noIndex: false },
        select: { slug: true, updatedAt: true, publishedAt: true }
      })
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const route of staticRoutes) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic published services
    for (const srv of services) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/services/${srv.slug}</loc>\n`;
      xml += `    <lastmod>${srv.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic published blog posts
    for (const post of blogPosts) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${(post.publishedAt || post.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

// GET /robots.txt - clean crawler directives
router.get('/robots.txt', (req: Request, res: Response) => {
  const baseUrl = config.appUrl.replace(/\/$/, '');
  const content = `# House Robotics Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin/
Disallow: /api/
Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(content);
});

export default router;
