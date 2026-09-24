import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// GET /api/testimonials - list approved testimonials
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: 'APPROVED' },
      orderBy: { sortOrder: 'asc' }
    });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
});

export default router;
