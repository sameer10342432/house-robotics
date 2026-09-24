import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// GET /api/faqs - list published FAQs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    const where: any = {
      status: 'PUBLISHED'
    };

    if (category) {
      where.category = category as string;
    }

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: { sortOrder: 'asc' }
    });

    res.json({
      success: true,
      data: faqs
    });
  } catch (err) {
    next(err);
  }
});

export default router;
