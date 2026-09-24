import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// GET /api/admin/services - list all services (admin view)
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { search, category, status } = req.query;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { shortDescription: { contains: search as string } }
      ];
    }
    if (category) where.category = category as string;
    if (status) where.status = status as string;

    const services = await prisma.service.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: {
            features: true,
            benefits: true,
            processSteps: true,
            faqs: true
          }
        }
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

// GET /api/admin/services/:id - get service detail
router.get('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        features: { orderBy: { sortOrder: 'asc' } },
        benefits: { orderBy: { sortOrder: 'asc' } },
        processSteps: { orderBy: { sortOrder: 'asc' } },
        faqs: { orderBy: { sortOrder: 'asc' } }
      }
    });

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found.' });
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

const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().default('Marketing'),
  shortDescription: z.string(),
  longDescription: z.string(),
  heroImage: z.string().optional().nullable(),
  icon: z.string().default('Sparkles'),
  status: z.enum(['PUBLISHED', 'DRAFT', 'ARCHIVED']).default('PUBLISHED'),
  featured: z.boolean().default(false),
  sortOrder: z.number().default(0),
  metricsLabel: z.string().optional().nullable(),
  metricsValue: z.string().optional().nullable(),
  gradient: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  noIndex: z.boolean().default(false),
  features: z.array(z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    sortOrder: z.number().default(0)
  })).optional(),
  benefits: z.array(z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    sortOrder: z.number().default(0)
  })).optional(),
  processSteps: z.array(z.object({
    id: z.string().optional(),
    stepNumber: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    sortOrder: z.number().default(0)
  })).optional(),
  faqs: z.array(z.object({
    id: z.string().optional(),
    question: z.string(),
    answer: z.string(),
    sortOrder: z.number().default(0),
    status: z.string().default('PUBLISHED')
  })).optional()
});

// POST /api/admin/services - create new service
router.post('/', authenticateAdmin, validateBody(serviceSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { features, benefits, processSteps, faqs, ...mainData } = req.body;

    const existing = await prisma.service.findUnique({
      where: { slug: mainData.slug }
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'A service with this slug already exists.' });
      return;
    }

    const service = await prisma.service.create({
      data: {
        ...mainData,
        features: features && features.length > 0 ? { create: features } : undefined,
        benefits: benefits && benefits.length > 0 ? { create: benefits } : undefined,
        processSteps: processSteps && processSteps.length > 0 ? { create: processSteps } : undefined,
        faqs: faqs && faqs.length > 0 ? { create: faqs } : undefined
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'CREATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      metadata: { title: service.title, slug: service.slug }
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/services/:id - update existing service
router.put('/:id', authenticateAdmin, validateBody(serviceSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { features, benefits, processSteps, faqs, ...mainData } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: mainData
    });

    // Update nested relations if provided
    if (features) {
      await prisma.serviceFeature.deleteMany({ where: { serviceId: id } });
      if (features.length > 0) {
        await prisma.serviceFeature.createMany({
          data: features.map((f: any, idx: number) => ({
            serviceId: id,
            title: f.title,
            description: f.description || null,
            icon: f.icon || null,
            sortOrder: f.sortOrder ?? idx
          }))
        });
      }
    }

    if (benefits) {
      await prisma.serviceBenefit.deleteMany({ where: { serviceId: id } });
      if (benefits.length > 0) {
        await prisma.serviceBenefit.createMany({
          data: benefits.map((b: any, idx: number) => ({
            serviceId: id,
            title: b.title,
            description: b.description || null,
            icon: b.icon || null,
            sortOrder: b.sortOrder ?? idx
          }))
        });
      }
    }

    if (processSteps) {
      await prisma.serviceProcessStep.deleteMany({ where: { serviceId: id } });
      if (processSteps.length > 0) {
        await prisma.serviceProcessStep.createMany({
          data: processSteps.map((p: any, idx: number) => ({
            serviceId: id,
            stepNumber: p.stepNumber || `0${idx + 1}`,
            title: p.title,
            description: p.description || null,
            icon: p.icon || null,
            sortOrder: p.sortOrder ?? idx
          }))
        });
      }
    }

    if (faqs) {
      await prisma.serviceFaq.deleteMany({ where: { serviceId: id } });
      if (faqs.length > 0) {
        await prisma.serviceFaq.createMany({
          data: faqs.map((f: any, idx: number) => ({
            serviceId: id,
            question: f.question,
            answer: f.answer,
            sortOrder: f.sortOrder ?? idx,
            status: f.status || 'PUBLISHED'
          }))
        });
      }
    }

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'UPDATE_SERVICE',
      entity: 'Service',
      entityId: id,
      metadata: { title: service.title }
    });

    res.json({
      success: true,
      message: 'Service updated successfully.',
      data: service
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/services/:id - delete service
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const service = await prisma.service.delete({
      where: { id }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'DELETE_SERVICE',
      entity: 'Service',
      entityId: id,
      metadata: { title: service.title }
    });

    res.json({
      success: true,
      message: 'Service removed.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
