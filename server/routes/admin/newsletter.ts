import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

const statusSchema = z.object({
  status: z.enum(['SUBSCRIBED', 'UNSUBSCRIBED', 'BOUNCED', 'PENDING'])
});

const createSubscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().optional()
});

// GET /api/admin/newsletter - list all newsletter subscribers
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) where.status = status as string;
    if (search) {
      where.OR = [
        { email: { contains: search as string } },
        { name: { contains: search as string } }
      ];
    }

    const [total, subscribers] = await Promise.all([
      prisma.newsletterSubscriber.count({ where }),
      prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { subscribedAt: 'desc' }
      })
    ]);

    res.json({
      success: true,
      data: subscribers,
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

// POST /api/admin/newsletter - manually add subscriber
router.post('/', authenticateAdmin, validateBody(createSubscriberSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { email, name } = req.body;
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { status: 'SUBSCRIBED', name: name || undefined },
      create: {
        email: email.toLowerCase().trim(),
        name: name || null,
        status: 'SUBSCRIBED',
        source: 'ADMIN_MANUAL'
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SUBSCRIBER_ADD',
      entity: 'NewsletterSubscriber',
      entityId: subscriber.id,
      metadata: { email }
    });

    res.status(201).json({ success: true, data: subscriber });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/newsletter/:id/status - update subscriber status
router.patch('/:id/status', authenticateAdmin, validateBody(statusSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: {
        status,
        unsubscribedAt: status === 'UNSUBSCRIBED' ? new Date() : null
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SUBSCRIBER_STATUS_CHANGE',
      entity: 'NewsletterSubscriber',
      entityId: subscriber.id,
      metadata: { status }
    });

    res.json({ success: true, data: subscriber });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/newsletter/:id - remove subscriber
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.newsletterSubscriber.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'SUBSCRIBER_DELETE',
      entity: 'NewsletterSubscriber',
      entityId: id
    });

    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
