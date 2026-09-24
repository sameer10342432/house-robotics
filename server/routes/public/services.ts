import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// GET /api/services - list all published services
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' },
      include: {
        features: { orderBy: { sortOrder: 'asc' } },
        benefits: { orderBy: { sortOrder: 'asc' } },
        processSteps: { orderBy: { sortOrder: 'asc' } },
        faqs: { where: { status: 'PUBLISHED' }, orderBy: { sortOrder: 'asc' } }
      }
    });

    res.json({
      success: true,
      data: services
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/services/:slug - get detailed service by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        features: { orderBy: { sortOrder: 'asc' } },
        benefits: { orderBy: { sortOrder: 'asc' } },
        processSteps: { orderBy: { sortOrder: 'asc' } },
        faqs: { where: { status: 'PUBLISHED' }, orderBy: { sortOrder: 'asc' } }
      }
    });

    if (!service || service.status !== 'PUBLISHED') {
      res.status(404).json({
        success: false,
        message: `Service with slug '${slug}' was not found.`,
        code: 'SERVICE_NOT_FOUND'
      });
      return;
    }

    res.json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
});

export default router;
