import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

const updateSettingsSchema = z.object({
  settings: z.record(z.string(), z.string())
});

// GET /api/admin/settings - retrieve all settings
router.get('/', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.siteSetting.findMany({
      orderBy: { group: 'asc' }
    });

    // Provide both grouped array and key-value dictionary
    const dictionary: Record<string, string> = {};
    list.forEach(item => {
      dictionary[item.key] = item.value;
    });

    res.json({
      success: true,
      data: {
        list,
        settings: dictionary
      }
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/settings - update multiple settings
router.put('/', authenticateAdmin, validateBody(updateSettingsSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { settings } = req.body;
    const updates = Object.entries(settings);

    await Promise.all(
      updates.map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: {
            key,
            value: String(value),
            group: key.startsWith('contact_')
              ? 'contact'
              : key.startsWith('social_')
              ? 'social'
              : key.startsWith('seo_')
              ? 'seo'
              : key.startsWith('analytics_')
              ? 'analytics'
              : 'general'
          }
        })
      )
    );

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SETTINGS_UPDATE',
      entity: 'SiteSetting',
      metadata: { keys: Object.keys(settings) }
    });

    const updatedList = await prisma.siteSetting.findMany();
    const updatedDict: Record<string, string> = {};
    updatedList.forEach(item => {
      updatedDict[item.key] = item.value;
    });

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedDict
    });
  } catch (err) {
    next(err);
  }
});

export default router;
