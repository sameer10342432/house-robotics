import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// GET /api/seo?path=/services/seo - fetch SEO metadata for a page
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path = '/' } = req.query;

    const seo = await prisma.seoMetadata.findUnique({
      where: { pagePath: path as string }
    });

    if (!seo) {
      // Fallback to default site settings
      const settings = await prisma.siteSetting.findMany({
        where: { group: 'seo' }
      });

      const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);

      res.json({
        success: true,
        data: {
          pagePath: path,
          seoTitle: settingsMap.default_seo_title || 'House Robotics — Full-Service Digital Marketing & Technology Agency',
          metaDescription: settingsMap.default_meta_description || 'House Robotics combines digital marketing, AI automation, SEO, web development, and performance advertising to help ambitious businesses scale faster.',
          ogTitle: settingsMap.default_seo_title || 'House Robotics — Full-Service Digital Marketing & Technology Agency',
          ogDescription: settingsMap.default_meta_description || 'House Robotics combines digital marketing, AI automation, SEO, web development, and performance advertising.',
          noIndex: false
        }
      });
      return;
    }

    res.json({
      success: true,
      data: seo
    });
  } catch (err) {
    next(err);
  }
});

export default router;
