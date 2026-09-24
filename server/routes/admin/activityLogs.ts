import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

// GET /api/admin/activity-logs - list recent administrative actions
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { action, entity, page = '1', limit = '30' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (action) where.action = action as string;
    if (entity) where.entity = entity as string;

    const [total, logs] = await Promise.all([
      prisma.activityLog.count({ where }),
      prisma.activityLog.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { timestamp: 'desc' },
        include: {
          admin: {
            select: { id: true, name: true, email: true, role: true }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
