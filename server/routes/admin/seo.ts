import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

const seoSchema = z.object({
  pagePath: z.string().min(1, 'Page path is required'),
  seoTitle: z.string().min(1, 'SEO title is required').max(60, 'SEO title cannot exceed 60 characters (including spaces & punctuation)'),
  metaDescription: z.string().min(1, 'Meta description is required').max(160, 'Meta description cannot exceed 160 characters (including spaces & punctuation)'),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogTitle: z.string().max(60, 'OG title cannot exceed 60 characters').optional(),
  ogDescription: z.string().max(160, 'OG description cannot exceed 160 characters').optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().max(60, 'Twitter title cannot exceed 60 characters').optional(),
  twitterDescription: z.string().max(160, 'Twitter description cannot exceed 160 characters').optional(),
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
