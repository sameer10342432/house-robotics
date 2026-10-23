import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';
import { authenticateAdmin } from '../../middleware/auth';

const router = Router();

// Apply admin authentication to all location management endpoints
router.use(authenticateAdmin);

// GET /api/admin/locations - Paginated & filtered list of location pages & cities
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { state, priority, status, search, page = '1', limit = '25' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 25;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (state) where.stateSlug = String(state);
    if (status) where.status = String(status);
    if (search) {
      where.OR = [
        { h1Title: { contains: String(search) } },
        { urlPath: { contains: String(search) } },
        { focusKeyword: { contains: String(search) } },
        { citySlug: { contains: String(search) } }
      ];
    }

    const [total, pages, states, stats] = await Promise.all([
      prisma.usaLocationPage.count({ where }),
      prisma.usaLocationPage.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.usaState.findMany({
        select: { slug: true, name: true, code: true },
        orderBy: { name: 'asc' }
      }),
      prisma.usaLocationPage.groupBy({
        by: ['status'],
        _count: { id: true }
      })
    ]);

    res.json({
      success: true,
      data: pages,
      states,
      stats: {
        total,
        breakdown: stats.reduce((acc, curr) => ({ ...acc, [curr.status]: curr._count.id }), {})
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        total
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/locations/stats - High-level metrics
router.get('/stats', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [totalStates, totalCities, totalPages, publishedPages, draftPages, leadsByLocation] = await Promise.all([
      prisma.usaState.count(),
      prisma.usaCity.count(),
      prisma.usaLocationPage.count(),
      prisma.usaLocationPage.count({ where: { status: 'PUBLISHED' } }),
      prisma.usaLocationPage.count({ where: { status: 'DRAFT' } }),
      prisma.lead.findMany({
        where: {
          OR: [
            { pageUrl: { contains: '/usa/' } },
            { city: { not: null } }
          ]
        },
        select: {
          id: true,
          name: true,
          email: true,
          city: true,
          state: true,
          service: true,
          pageUrl: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    ]);

    res.json({
      success: true,
      data: {
        totalStates,
        totalCities,
        totalPages,
        publishedPages,
        draftPages,
        leadsByLocation
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/locations/page - Create a new location landing page
router.post('/page', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.stateSlug || !data.urlPath || !data.h1Title || !data.metaTitle || !data.metaDescription) {
      res.status(400).json({ success: false, message: 'Missing required location page fields.' });
      return;
    }

    // Ensure URL has leading slash and matches convention
    const cleanUrl = '/' + data.urlPath.replace(/^\/+|\/+$/g, '');

    const existing = await prisma.usaLocationPage.findUnique({
      where: { urlPath: cleanUrl }
    });

    if (existing) {
      res.status(409).json({ success: false, message: `Page with URL ${cleanUrl} already exists.` });
      return;
    }

    const created = await prisma.usaLocationPage.create({
      data: {
        pageType: data.pageType || 'CITY_SERVICE',
        stateSlug: data.stateSlug,
        citySlug: data.citySlug || null,
        serviceSlug: data.serviceSlug || null,
        urlPath: cleanUrl,
        h1Title: data.h1Title,
        heroKicker: data.heroKicker || null,
        heroSubtitle: data.heroSubtitle || null,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword || null,
        secondaryKeywords: data.secondaryKeywords || null,
        canonicalUrl: data.canonicalUrl || `https://houserobotics.online${cleanUrl}`,
        ogTitle: data.ogTitle || data.metaTitle,
        ogDescription: data.ogDescription || data.metaDescription,
        ogImage: data.ogImage || '/images/services/seo-hero.webp',
        contentIntro: data.contentIntro || '',
        localIndustryFocus: typeof data.localIndustryFocus === 'object' ? JSON.stringify(data.localIndustryFocus) : data.localIndustryFocus,
        businessProblemsSolved: typeof data.businessProblemsSolved === 'object' ? JSON.stringify(data.businessProblemsSolved) : data.businessProblemsSolved,
        serviceDeliverables: typeof data.serviceDeliverables === 'object' ? JSON.stringify(data.serviceDeliverables) : data.serviceDeliverables,
        suitableCustomerTypes: typeof data.suitableCustomerTypes === 'object' ? JSON.stringify(data.suitableCustomerTypes) : data.suitableCustomerTypes,
        remoteCollaborationModel: data.remoteCollaborationModel || '',
        processSteps: typeof data.processSteps === 'object' ? JSON.stringify(data.processSteps) : data.processSteps,
        illustrativeScenarios: typeof data.illustrativeScenarios === 'object' ? JSON.stringify(data.illustrativeScenarios) : data.illustrativeScenarios,
        faqs: typeof data.faqs === 'object' ? JSON.stringify(data.faqs) : data.faqs,
        qualityGatePassed: data.qualityGatePassed !== false,
        qualityReviewNotes: data.qualityReviewNotes || 'Verified high quality unique content.',
        verifiedAt: new Date(),
        status: data.status || 'PUBLISHED',
        noIndex: !!data.noIndex
      }
    });

    res.status(201).json({ success: true, message: 'Location page created successfully.', data: created });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/locations/page/:id - Update an existing location page
router.put('/page/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.usaLocationPage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Location page not found.' });
      return;
    }

    const updated = await prisma.usaLocationPage.update({
      where: { id },
      data: {
        h1Title: data.h1Title ?? existing.h1Title,
        heroKicker: data.heroKicker ?? existing.heroKicker,
        heroSubtitle: data.heroSubtitle ?? existing.heroSubtitle,
        metaTitle: data.metaTitle ?? existing.metaTitle,
        metaDescription: data.metaDescription ?? existing.metaDescription,
        focusKeyword: data.focusKeyword ?? existing.focusKeyword,
        secondaryKeywords: data.secondaryKeywords ?? existing.secondaryKeywords,
        canonicalUrl: data.canonicalUrl ?? existing.canonicalUrl,
        ogTitle: data.ogTitle ?? existing.ogTitle,
        ogDescription: data.ogDescription ?? existing.ogDescription,
        ogImage: data.ogImage ?? existing.ogImage,
        contentIntro: data.contentIntro ?? existing.contentIntro,
        localIndustryFocus: data.localIndustryFocus !== undefined 
          ? (typeof data.localIndustryFocus === 'object' ? JSON.stringify(data.localIndustryFocus) : data.localIndustryFocus)
          : existing.localIndustryFocus,
        businessProblemsSolved: data.businessProblemsSolved !== undefined
          ? (typeof data.businessProblemsSolved === 'object' ? JSON.stringify(data.businessProblemsSolved) : data.businessProblemsSolved)
          : existing.businessProblemsSolved,
        serviceDeliverables: data.serviceDeliverables !== undefined
          ? (typeof data.serviceDeliverables === 'object' ? JSON.stringify(data.serviceDeliverables) : data.serviceDeliverables)
          : existing.serviceDeliverables,
        suitableCustomerTypes: data.suitableCustomerTypes !== undefined
          ? (typeof data.suitableCustomerTypes === 'object' ? JSON.stringify(data.suitableCustomerTypes) : data.suitableCustomerTypes)
          : existing.suitableCustomerTypes,
        remoteCollaborationModel: data.remoteCollaborationModel ?? existing.remoteCollaborationModel,
        processSteps: data.processSteps !== undefined
          ? (typeof data.processSteps === 'object' ? JSON.stringify(data.processSteps) : data.processSteps)
          : existing.processSteps,
        illustrativeScenarios: data.illustrativeScenarios !== undefined
          ? (typeof data.illustrativeScenarios === 'object' ? JSON.stringify(data.illustrativeScenarios) : data.illustrativeScenarios)
          : existing.illustrativeScenarios,
        faqs: data.faqs !== undefined
          ? (typeof data.faqs === 'object' ? JSON.stringify(data.faqs) : data.faqs)
          : existing.faqs,
        qualityGatePassed: data.qualityGatePassed ?? existing.qualityGatePassed,
        qualityReviewNotes: data.qualityReviewNotes ?? existing.qualityReviewNotes,
        verifiedAt: new Date(),
        status: data.status ?? existing.status,
        noIndex: data.noIndex ?? existing.noIndex
      }
    });

    res.json({ success: true, message: 'Location page updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/locations/page/:id - Delete a location page
router.delete('/page/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.usaLocationPage.delete({ where: { id } });
    res.json({ success: true, message: 'Location page deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
