import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// GET /api/admin/testimonials
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    next(err);
  }
});

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  company: z.string().min(2),
  role: z.string().min(2),
  photo: z.string().optional().nullable(),
  rating: z.number().min(1).max(5).default(5),
  review: z.string().min(10),
  highlight: z.string().optional().nullable(),
  status: z.enum(['APPROVED', 'PENDING', 'REJECTED']).default('APPROVED'),
  sortOrder: z.number().default(0)
});

// POST /api/admin/testimonials
router.post('/', authenticateAdmin, validateBody(testimonialSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.testimonial.create({ data: req.body });
    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'CREATE_TESTIMONIAL',
      entity: 'Testimonial',
      entityId: item.id
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/testimonials/:id
router.put('/:id', authenticateAdmin, validateBody(testimonialSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/testimonials/:id
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Testimonial deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
