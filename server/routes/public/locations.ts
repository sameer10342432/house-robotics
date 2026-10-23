import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// GET /api/locations/hub - Summary data for USA National Hub
router.get('/hub', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [states, priorityCities, pilotPages, totalCities] = await Promise.all([
      prisma.usaState.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          code: true,
          slug: true,
          region: true,
          capital: true,
          majorIndustries: true,
          _count: {
            select: { cities: true }
          }
        }
      }),
      prisma.usaCity.findMany({
        where: { status: 'PUBLISHED', priorityTier: 1 },
        orderBy: [{ population: 'desc' }],
        take: 36,
        select: {
          id: true,
          name: true,
          slug: true,
          stateSlug: true,
          metroArea: true,
          population: true,
          majorIndustries: true,
          digitalDemandTier: true,
          priorityTier: true
        }
      }),
      prisma.usaLocationPage.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true,
          pageType: true,
          stateSlug: true,
          citySlug: true,
          serviceSlug: true,
          urlPath: true,
          h1Title: true,
          heroKicker: true,
          focusKeyword: true
        }
      }),
      prisma.usaCity.count({ where: { status: 'PUBLISHED' } })
    ]);

    res.json({
      success: true,
      data: {
        totalStates: states.length,
        totalCities,
        totalPublishedLandingPages: pilotPages.length,
        states,
        priorityCities,
        pilotPages
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/locations/states - All 50 States
router.get('/states', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const states = await prisma.usaState.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { cities: true }
        }
      }
    });
    res.json({ success: true, data: states });
  } catch (err) {
    next(err);
  }
});

// GET /api/locations/state/:stateSlug - State Overview + Cities + Available Pages
router.get('/state/:stateSlug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stateSlug } = req.params;
    const state = await prisma.usaState.findUnique({
      where: { slug: stateSlug },
      include: {
        cities: {
          where: { status: 'PUBLISHED' },
          orderBy: [{ priorityTier: 'asc' }, { population: 'desc' }]
        }
      }
    });

    if (!state) {
      res.status(404).json({ success: false, message: `State ${stateSlug} not found` });
      return;
    }

    const pages = await prisma.usaLocationPage.findMany({
      where: {
        stateSlug,
        status: 'PUBLISHED'
      }
    });

    res.json({
      success: true,
      data: {
        state,
        cities: state.cities,
        pages
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/locations/city/:stateSlug/:citySlug - City Overview + Services
router.get('/city/:stateSlug/:citySlug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stateSlug, citySlug } = req.params;
    const city = await prisma.usaCity.findUnique({
      where: {
        stateSlug_slug: {
          stateSlug,
          slug: citySlug
        }
      },
      include: {
        state: true
      }
    });

    if (!city) {
      res.status(404).json({ success: false, message: `City ${citySlug} in ${stateSlug} not found` });
      return;
    }

    const pages = await prisma.usaLocationPage.findMany({
      where: {
        stateSlug,
        citySlug,
        status: 'PUBLISHED'
      }
    });

    res.json({
      success: true,
      data: {
        city,
        state: city.state,
        pages
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/locations/page/:stateSlug/:citySlug/:serviceSlug - Full Landing Page Content
router.get('/page/:stateSlug/:citySlug/:serviceSlug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stateSlug, citySlug, serviceSlug } = req.params;
    const urlPath = `/usa/${stateSlug}/${citySlug}/${serviceSlug}`;

    const [page, city, state] = await Promise.all([
      prisma.usaLocationPage.findUnique({
        where: { urlPath }
      }),
      prisma.usaCity.findUnique({
        where: {
          stateSlug_slug: {
            stateSlug,
            slug: citySlug
          }
        }
      }),
      prisma.usaState.findUnique({
        where: { slug: stateSlug }
      })
    ]);

    if (!page || (page.status !== 'PUBLISHED' && req.query.preview !== 'true')) {
      res.status(404).json({ success: false, message: 'Location service page not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        page,
        city,
        state
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
