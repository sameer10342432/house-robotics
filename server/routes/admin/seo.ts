import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

const seoSchema = z.object({
  pagePath: z.string().min(1),
  seoTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  noIndex: z.boolean().default(false)
});

// GET /api/admin/seo - list all page SEO configs
router.get('/', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.seoMetadata.findMany({
      orderBy: { pagePath: 'asc' }
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/seo - upsert page SEO config
router.post('/', authenticateAdmin, validateBody(seoSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const cleanPath = body.pagePath.startsWith('/') ? body.pagePath : `/${body.pagePath}`;

    const seo = await prisma.seoMetadata.upsert({
      where: { pagePath: cleanPath },
      update: {
        ...body,
        pagePath: cleanPath
      },
      create: {
        ...body,
        pagePath: cleanPath
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SEO_UPSERT',
      entity: 'SeoMetadata',
      entityId: seo.id,
      metadata: { pagePath: cleanPath }
    });

    res.json({ success: true, data: seo });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/seo/:id - delete SEO config
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.seoMetadata.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SEO_DELETE',
      entity: 'SeoMetadata',
      entityId: id
    });

    res.json({ success: true, message: 'SEO configuration deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
