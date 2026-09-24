import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';

const router = Router();

router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data: faqs });
  } catch (err) {
    next(err);
  }
});

const faqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(5),
  category: z.string().default('General'),
  sortOrder: z.number().default(0),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED')
});

router.post('/', authenticateAdmin, validateBody(faqSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.faq.create({ data: req.body });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticateAdmin, validateBody(faqSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.faq.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.faq.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'FAQ deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
