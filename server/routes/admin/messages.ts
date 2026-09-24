import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// GET /api/admin/messages - list contact messages
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) where.status = status as string;
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
        { inquiryId: { contains: search as string } },
        { message: { contains: search as string } }
      ];
    }

    const [total, messages] = await Promise.all([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    res.json({
      success: true,
      data: messages,
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

// PATCH /api/admin/messages/:id/status - mark as READ, REPLIED, ARCHIVED
router.patch(
  '/:id/status',
  authenticateAdmin,
  validateBody(z.object({
    status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED'])
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const message = await prisma.contactMessage.update({
        where: { id },
        data: { status }
      });

      res.json({
        success: true,
        data: message
      });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/admin/messages/:id
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true, message: 'Message removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;
