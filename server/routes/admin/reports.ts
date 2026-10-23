import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

// GET /api/admin/reports - SEO, Lead Generation & Pipeline Performance
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { dateRange, service, city, state, status, pageUrl } = req.query as Record<string, string>;

    // Calculate Date Filter
    let dateFilter: Date | undefined;
    const now = new Date();
    if (dateRange === '7d') {
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (dateRange === '30d') {
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (dateRange === '90d') {
      dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    }

    const whereClause: any = {};
    if (dateFilter) {
      whereClause.createdAt = { gte: dateFilter };
    }
    if (service && service !== 'all') {
      whereClause.serviceInterest = { contains: service };
    }
    if (city && city !== 'all') {
      whereClause.city = { contains: city };
    }
    if (state && state !== 'all') {
      whereClause.state = { contains: state };
    }
    if (status && status !== 'all') {
      whereClause.status = status;
    }
    if (pageUrl && pageUrl !== 'all') {
      whereClause.sourceUrl = { contains: pageUrl };
    }

    const [
      filteredLeads,
      totalAllLeads,
      locationPages,
      analyticsEventCounts,
      siteSettings
    ] = await Promise.all([
      prisma.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.count(),
      prisma.usaLocationPage.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { leadsCount: 'desc' },
        take: 15
      }),
      prisma.analyticsEvent.groupBy({
        by: ['eventType'],
        _count: { eventType: true }
      }),
      prisma.siteSetting.findMany({
        where: {
          key: { in: ['analytics_ga_id', 'gsc_verification', 'meta_pixel_id'] }
        }
      })
    ]);

    // Aggregate Leads by Service
    const serviceCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL_SENT: 0,
      WON: 0,
      LOST: 0
    };
    const sourceCounts: Record<string, number> = {};

    for (const lead of filteredLeads) {
      // By Service
      const s = lead.serviceInterest || 'Unspecified';
      serviceCounts[s] = (serviceCounts[s] || 0) + 1;

      // By City
      if (lead.city) {
        const c = `${lead.city}, ${lead.state || ''}`.trim().replace(/,\s*$/, '');
        cityCounts[c] = (cityCounts[c] || 0) + 1;
      }

      // By Status
      if (statusCounts[lead.status] !== undefined) {
        statusCounts[lead.status]++;
      } else {
        statusCounts[lead.status] = 1;
      }

      // By Source / UTM
      const src = lead.utmSource || lead.source || 'Organic Search';
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    }

    // Sort breakdowns
    const sortedServices = Object.entries(serviceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const sortedCities = Object.entries(cityCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const sortedSources = Object.entries(sourceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Parse analytics integration status
    const gaSetting = siteSettings.find(s => s.key === 'analytics_ga_id')?.value;
    const gscSetting = siteSettings.find(s => s.key === 'gsc_verification')?.value;

    const externalAnalytics = {
      googleAnalytics: {
        connected: Boolean(gaSetting && gaSetting !== 'G-HOUSEROBOTICS'),
        trackingId: gaSetting || 'Not Configured (Requires GA4 Measurement ID in Site Settings)'
      },
      searchConsole: {
        connected: Boolean(gscSetting),
        verification: gscSetting || 'Pending GSC HTML Tag / Domain DNS Verification'
      }
    };

    res.json({
      success: true,
      data: {
        summary: {
          totalMatchingLeads: filteredLeads.length,
          totalAllTimeLeads: totalAllLeads,
          qualifiedLeads: statusCounts['QUALIFIED'] || 0,
          wonLeads: statusCounts['WON'] || 0
        },
        statusDistribution: statusCounts,
        topServices: sortedServices,
        topCities: sortedCities,
        topSources: sortedSources,
        topLocationPages: locationPages.map(p => ({
          title: p.h1Title,
          urlPath: p.urlPath,
          city: p.citySlug,
          state: p.stateSlug,
          service: p.serviceSlug,
          leadsCount: p.leadsCount
        })),
        eventsSummary: analyticsEventCounts.map(e => ({
          eventType: e.eventType,
          count: e._count.eventType
        })),
        recentLeads: filteredLeads.slice(0, 10).map(l => ({
          id: l.id,
          name: l.name,
          email: l.email,
          serviceInterest: l.serviceInterest,
          city: l.city,
          state: l.state,
          status: l.status,
          sourceUrl: l.sourceUrl,
          createdAt: l.createdAt
        })),
        externalAnalytics
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
