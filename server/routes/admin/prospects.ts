import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// Helper to escape CSV cells and protect against Formula Injection (=, +, -, @, \t, \r)
function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).replace(/"/g, '""');
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return `"${str}"`;
}

// Normalizes domain string: removes protocol, www, trailing slashes, paths, and lowercase
export function normalizeDomain(url: string): string {
  if (!url) return '';
  let clean = url.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, '');
  clean = clean.replace(/^www\./, '');
  clean = clean.split('/')[0];
  clean = clean.split('?')[0];
  clean = clean.split(':')[0];
  return clean;
}

// Date helper for UTC calendar date matching
const getTodayUtcRange = () => {
  const todayUtcStr = new Date().toISOString().split('T')[0];
  return {
    startOfToday: new Date(`${todayUtcStr}T00:00:00.000Z`),
    endOfToday: new Date(`${todayUtcStr}T23:59:59.999Z`)
  };
};

// -----------------------------------------------------------------------------
// GET /api/admin/prospects/export - Export filtered prospects to CSV
// -----------------------------------------------------------------------------
router.get('/export', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, service, priority, confidence, city, state, followUp, search } = req.query;

    const where: any = {};
    if (status && status !== 'ALL') where.status = status as string;
    if (service && service !== 'ALL') where.potentialServiceFit = service as string;
    if (priority && priority !== 'ALL') where.priority = priority as string;
    if (confidence && confidence !== 'ALL') where.confidence = confidence as string;
    if (city && city !== 'ALL') where.city = { contains: city as string };
    if (state && state !== 'ALL') where.state = { contains: state as string };

    const { startOfToday, endOfToday } = getTodayUtcRange();
    if (followUp === 'OVERDUE') {
      where.followUpDate = { lt: startOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'TODAY') {
      where.followUpDate = { gte: startOfToday, lte: endOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'UPCOMING') {
      where.followUpDate = { gt: endOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'COMPLETED') {
      where.followUpStatus = 'COMPLETED';
    }

    if (search) {
      const q = String(search).trim();
      where.OR = [
        { businessName: { contains: q } },
        { websiteUrl: { contains: q } },
        { normalizedDomain: { contains: q } },
        { category: { contains: q } },
        { email: { contains: q } },
        { city: { contains: q } },
        { state: { contains: q } }
      ];
    }

    const prospects = await prisma.prospect.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const headers = [
      'Business Name',
      'Website URL',
      'Domain',
      'Category',
      'City',
      'State',
      'Country',
      'Public Email',
      'Phone',
      'Contact Page URL',
      'Service Fit',
      'Benefit Rationale',
      'Priority',
      'Confidence',
      'Status',
      'Follow-Up Date',
      'Follow-Up Status',
      'Source Type',
      'Research Date',
      'Created At'
    ];

    const rows = prospects.map(p => [
      sanitizeCsvCell(p.businessName),
      sanitizeCsvCell(p.websiteUrl),
      sanitizeCsvCell(p.normalizedDomain),
      sanitizeCsvCell(p.category || ''),
      sanitizeCsvCell(p.city || ''),
      sanitizeCsvCell(p.state || ''),
      sanitizeCsvCell(p.country || 'USA'),
      sanitizeCsvCell(p.email || ''),
      sanitizeCsvCell(p.phone || ''),
      sanitizeCsvCell(p.contactPageUrl || ''),
      sanitizeCsvCell(p.potentialServiceFit),
      sanitizeCsvCell(p.benefitReason || ''),
      sanitizeCsvCell(p.priority),
      sanitizeCsvCell(p.confidence),
      sanitizeCsvCell(p.status),
      sanitizeCsvCell(p.followUpDate ? p.followUpDate.toISOString().slice(0, 10) : ''),
      sanitizeCsvCell(p.followUpStatus),
      sanitizeCsvCell(p.sourceType),
      sanitizeCsvCell(p.researchDate ? p.researchDate.toISOString().slice(0, 10) : ''),
      sanitizeCsvCell(p.createdAt.toISOString())
    ].join(','));

    const csvContent = '\uFEFF' + headers.map(h => `"${h}"`).join(',') + '\n' + rows.join('\n');
    const filename = `house-robotics-prospects-${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'EXPORT_PROSPECTS_CSV',
      entity: 'Prospect',
      metadata: { count: prospects.length, status: status || 'ALL' }
    });
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// GET /api/admin/prospects/reports/summary - Aggregate metrics for USA prospects
// -----------------------------------------------------------------------------
router.get('/reports/summary', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      total,
      statusCounts,
      priorityCounts,
      serviceCounts,
      recentActivities,
      topStates
    ] = await Promise.all([
      prisma.prospect.count(),
      prisma.prospect.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.prospect.groupBy({ by: ['priority'], _count: { id: true } }),
      prisma.prospect.groupBy({ by: ['potentialServiceFit'], _count: { id: true } }),
      prisma.prospectActivity.findMany({
        take: 10,
        orderBy: { performedAt: 'desc' },
        include: { prospect: { select: { id: true, businessName: true, websiteUrl: true } } }
      }),
      prisma.prospect.groupBy({
        by: ['state'],
        where: { state: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 8
      })
    ]);

    const statusMap: Record<string, number> = {};
    statusCounts.forEach(s => { statusMap[s.status] = s._count.id; });

    const priorityMap: Record<string, number> = {};
    priorityCounts.forEach(p => { priorityMap[p.priority] = p._count.id; });

    const serviceMap: Record<string, number> = {};
    serviceCounts.forEach(s => { serviceMap[s.potentialServiceFit] = s._count.id; });

    // Outreach actions breakdown
    const activityCounts = await prisma.prospectActivity.groupBy({
      by: ['activityType'],
      _count: { id: true }
    });
    const activityMap: Record<string, number> = {};
    activityCounts.forEach(a => { activityMap[a.activityType] = a._count.id; });

    res.json({
      success: true,
      data: {
        total,
        statusMap,
        priorityMap,
        serviceMap,
        activityMap,
        topStates: topStates.map(s => ({ state: s.state, count: s._count.id })),
        recentActivities
      }
    });
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// GET /api/admin/prospects - List prospects with filtering, search & pagination
// -----------------------------------------------------------------------------
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      status, service, priority, confidence, city, state, followUp, dateRange, search,
      page = '1', limit = '20'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status && status !== 'ALL') where.status = status as string;
    if (service && service !== 'ALL') where.potentialServiceFit = service as string;
    if (priority && priority !== 'ALL') where.priority = priority as string;
    if (confidence && confidence !== 'ALL') where.confidence = confidence as string;
    if (city && city !== 'ALL') where.city = { contains: city as string };
    if (state && state !== 'ALL') where.state = { contains: state as string };

    const { startOfToday, endOfToday } = getTodayUtcRange();
    if (followUp === 'OVERDUE') {
      where.followUpDate = { lt: startOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'TODAY') {
      where.followUpDate = { gte: startOfToday, lte: endOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'UPCOMING') {
      where.followUpDate = { gt: endOfToday };
      where.followUpStatus = { not: 'COMPLETED' };
    } else if (followUp === 'COMPLETED') {
      where.followUpStatus = 'COMPLETED';
    }

    if (dateRange && dateRange !== 'all') {
      let days = 30;
      if (dateRange === 'today') days = 1;
      else if (dateRange === '7d') days = 7;
      else if (dateRange === '30d') days = 30;
      else if (dateRange === '90d') days = 90;
      where.createdAt = { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) };
    }

    if (search) {
      const q = String(search).trim();
      where.OR = [
        { businessName: { contains: q } },
        { websiteUrl: { contains: q } },
        { normalizedDomain: { contains: q } },
        { category: { contains: q } },
        { email: { contains: q } },
        { city: { contains: q } },
        { state: { contains: q } }
      ];
    }

    const [total, prospects] = await Promise.all([
      prisma.prospect.count({ where }),
      prisma.prospect.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { notes: true, activities: true, campaignMembers: true }
          }
        }
      })
    ]);

    // Dynamic follow-up status enrichment
    const enrichedProspects = prospects.map(p => {
      let computedFollowUpStatus = p.followUpStatus;
      if (p.followUpDate && p.followUpStatus !== 'COMPLETED') {
        const d = new Date(p.followUpDate);
        if (d < startOfToday) {
          computedFollowUpStatus = 'OVERDUE';
        } else if (d >= startOfToday && d <= endOfToday) {
          computedFollowUpStatus = 'TODAY';
        } else {
          computedFollowUpStatus = 'UPCOMING';
        }
      }
      return {
        ...p,
        followUpStatus: computedFollowUpStatus
      };
    });

    res.json({
      success: true,
      data: enrichedProspects,
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

// -----------------------------------------------------------------------------
// POST /api/admin/prospects - Create a new prospect with duplicate detection
// -----------------------------------------------------------------------------
const prospectCreateSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  websiteUrl: z.string().min(3, 'Website URL is required'),
  category: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().default('USA'),
  contactPageUrl: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal('')),
  phone: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  sourceType: z.string().optional().default('MANUAL_RESEARCH'),
  researchDate: z.string().optional().nullable(),
  potentialServiceFit: z.string().default('Web Development'),
  benefitReason: z.string().optional().nullable(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
  confidence: z.enum(['VERIFIED', 'NEEDS_REVIEW', 'INFERRED']).default('INFERRED'),
  status: z.string().default('NEW'),
  internalNotes: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(),
  followUpNote: z.string().optional().nullable()
});

router.post(
  '/',
  authenticateAdmin,
  validateBody(prospectCreateSchema),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        businessName, websiteUrl, category, city, state, country,
        contactPageUrl, email, phone, sourceUrl, sourceType,
        researchDate, potentialServiceFit, benefitReason,
        priority, confidence, status, internalNotes,
        followUpDate, followUpNote
      } = req.body;

      const normDomain = normalizeDomain(websiteUrl);

      // Check for suppression (opt-out / do not contact)
      const isSuppressed = await prisma.suppressedContact.findFirst({
        where: {
          OR: [
            ...(email ? [{ email: email.toLowerCase().trim() }] : []),
            ...(normDomain ? [{ domain: normDomain }] : [])
          ]
        }
      });

      if (isSuppressed) {
        res.status(409).json({
          success: false,
          code: 'PROSPECT_SUPPRESSED',
          message: `This contact or domain (${normDomain || email}) is on the suppression list: ${isSuppressed.reason}. Outreach is prohibited.`
        });
        return;
      }

      // Check for duplicates by domain or by business name + city
      const existing = await prisma.prospect.findFirst({
        where: {
          OR: [
            { normalizedDomain: normDomain },
            ...(city ? [{ businessName: { equals: businessName.trim() }, city: { equals: city.trim() } }] : [])
          ]
        }
      });

      if (existing) {
        res.status(409).json({
          success: false,
          code: 'DUPLICATE_PROSPECT',
          message: `A prospect record already exists for ${existing.businessName} (${existing.normalizedDomain}).`,
          data: existing
        });
        return;
      }

      let parsedFollowUp: Date | null = null;
      if (followUpDate) {
        const rawDateStr = String(followUpDate).trim();
        parsedFollowUp = /^\d{4}-\d{2}-\d{2}$/.test(rawDateStr)
          ? new Date(`${rawDateStr}T12:00:00.000Z`)
          : new Date(rawDateStr);
      }

      const prospect = await prisma.prospect.create({
        data: {
          businessName: businessName.trim(),
          websiteUrl: websiteUrl.trim(),
          normalizedDomain: normDomain,
          category: category ? category.trim() : null,
          city: city ? city.trim() : null,
          state: state ? state.trim() : null,
          country: country || 'USA',
          contactPageUrl: contactPageUrl ? contactPageUrl.trim() : null,
          email: email && email.trim().length > 0 ? email.trim().toLowerCase() : null,
          phone: phone ? phone.trim() : null,
          sourceUrl: sourceUrl ? sourceUrl.trim() : null,
          sourceType: sourceType || 'MANUAL_RESEARCH',
          researchDate: researchDate ? new Date(researchDate) : new Date(),
          potentialServiceFit: potentialServiceFit || 'Web Development',
          benefitReason: benefitReason ? benefitReason.trim() : null,
          priority: priority || 'MEDIUM',
          confidence: confidence || 'INFERRED',
          status: status || 'NEW',
          internalNotes: internalNotes ? internalNotes.trim() : null,
          followUpDate: parsedFollowUp,
          followUpStatus: parsedFollowUp ? 'PENDING' : 'NONE',
          followUpNote: followUpNote ? followUpNote.trim() : null
        }
      });

      if (internalNotes) {
        await prisma.prospectNote.create({
          data: {
            prospectId: prospect.id,
            adminId: req.admin?.id || null,
            authorName: req.admin?.name || 'Admin',
            note: internalNotes.trim()
          }
        });
      }

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'CREATE_PROSPECT',
        entity: 'Prospect',
        entityId: prospect.id,
        metadata: { businessName: prospect.businessName, domain: normDomain, service: prospect.potentialServiceFit }
      });

      res.status(201).json({
        success: true,
        message: 'Prospect added to USA Prospect Manager.',
        data: prospect
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/import - Bulk CSV import with duplicate validation
// -----------------------------------------------------------------------------
router.post(
  '/import',
  authenticateAdmin,
  validateBody(z.object({
    prospects: z.array(z.object({
      businessName: z.string().min(1, 'Business name is required'),
      websiteUrl: z.string().min(1, 'Website URL is required'),
      category: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      state: z.string().optional().nullable(),
      country: z.string().optional().default('USA'),
      email: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
      contactPageUrl: z.string().optional().nullable(),
      potentialServiceFit: z.string().optional().default('Web Development'),
      benefitReason: z.string().optional().nullable(),
      priority: z.string().optional().default('MEDIUM'),
      confidence: z.string().optional().default('INFERRED'),
      sourceUrl: z.string().optional().nullable(),
      sourceType: z.string().optional().default('CSV_IMPORT')
    })),
    duplicateHandling: z.enum(['SKIP', 'FLAG', 'OVERWRITE']).default('SKIP')
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { prospects: items, duplicateHandling } = req.body;

      let insertedCount = 0;
      let skippedCount = 0;
      let flaggedCount = 0;
      const duplicateItems: any[] = [];

      for (const item of items) {
        const normDomain = normalizeDomain(item.websiteUrl);
        if (!normDomain) {
          skippedCount++;
          continue;
        }

        // Check suppression
        const isSuppressed = await prisma.suppressedContact.findFirst({
          where: {
            OR: [
              ...(item.email ? [{ email: item.email.toLowerCase().trim() }] : []),
              { domain: normDomain }
            ]
          }
        });

        if (isSuppressed) {
          skippedCount++;
          continue;
        }

        // Check duplicate
        const existing = await prisma.prospect.findFirst({
          where: { normalizedDomain: normDomain }
        });

        if (existing) {
          if (duplicateHandling === 'SKIP') {
            skippedCount++;
            duplicateItems.push({ businessName: item.businessName, domain: normDomain, reason: 'Already exists' });
          } else if (duplicateHandling === 'FLAG') {
            flaggedCount++;
            await prisma.prospect.update({
              where: { id: existing.id },
              data: {
                confidence: 'NEEDS_REVIEW',
                internalNotes: `${existing.internalNotes ? existing.internalNotes + '\n' : ''}[CSV Import ${new Date().toLocaleDateString()}]: Duplicate re-imported from source.`
              }
            });
          } else if (duplicateHandling === 'OVERWRITE') {
            await prisma.prospect.update({
              where: { id: existing.id },
              data: {
                businessName: item.businessName.trim(),
                category: item.category || existing.category,
                city: item.city || existing.city,
                state: item.state || existing.state,
                email: item.email || existing.email,
                phone: item.phone || existing.phone,
                potentialServiceFit: item.potentialServiceFit || existing.potentialServiceFit,
                benefitReason: item.benefitReason || existing.benefitReason
              }
            });
            insertedCount++;
          }
          continue;
        }

        // Insert new prospect
        await prisma.prospect.create({
          data: {
            businessName: item.businessName.trim(),
            websiteUrl: item.websiteUrl.trim(),
            normalizedDomain: normDomain,
            category: item.category ? item.category.trim() : null,
            city: item.city ? item.city.trim() : null,
            state: item.state ? item.state.trim() : null,
            country: item.country || 'USA',
            email: item.email && item.email.trim().length > 0 ? item.email.trim().toLowerCase() : null,
            phone: item.phone ? item.phone.trim() : null,
            contactPageUrl: item.contactPageUrl ? item.contactPageUrl.trim() : null,
            potentialServiceFit: item.potentialServiceFit || 'Web Development',
            benefitReason: item.benefitReason ? item.benefitReason.trim() : null,
            priority: (['HIGH', 'MEDIUM', 'LOW'].includes(item.priority?.toUpperCase()) ? item.priority.toUpperCase() : 'MEDIUM') as any,
            confidence: (['VERIFIED', 'NEEDS_REVIEW', 'INFERRED'].includes(item.confidence?.toUpperCase()) ? item.confidence.toUpperCase() : 'INFERRED') as any,
            sourceType: item.sourceType || 'CSV_IMPORT',
            sourceUrl: item.sourceUrl ? item.sourceUrl.trim() : null,
            researchDate: new Date(),
            status: 'NEW'
          }
        });
        insertedCount++;
      }

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'IMPORT_PROSPECTS_CSV',
        entity: 'Prospect',
        metadata: { totalItems: items.length, insertedCount, skippedCount, flaggedCount }
      });

      res.json({
        success: true,
        message: `Import complete. ${insertedCount} inserted, ${skippedCount} skipped, ${flaggedCount} flagged for review.`,
        data: {
          insertedCount,
          skippedCount,
          flaggedCount,
          duplicates: duplicateItems
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// GET /api/admin/prospects/:id - Get single prospect with history & details
// -----------------------------------------------------------------------------
router.get('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const prospect = await prisma.prospect.findUnique({
      where: { id },
      include: {
        notes: { orderBy: { createdAt: 'desc' } },
        activities: { orderBy: { performedAt: 'desc' } },
        campaignMembers: {
          include: { campaign: { select: { id: true, name: true, status: true } } }
        },
        leads: {
          select: { id: true, inquiryId: true, status: true, createdAt: true }
        }
      }
    });

    if (!prospect) {
      res.status(404).json({ success: false, message: 'Prospect not found.' });
      return;
    }

    const { startOfToday, endOfToday } = getTodayUtcRange();
    let computedFollowUpStatus = prospect.followUpStatus;
    if (prospect.followUpDate && prospect.followUpStatus !== 'COMPLETED') {
      const d = new Date(prospect.followUpDate);
      if (d < startOfToday) {
        computedFollowUpStatus = 'OVERDUE';
      } else if (d >= startOfToday && d <= endOfToday) {
        computedFollowUpStatus = 'TODAY';
      } else {
        computedFollowUpStatus = 'UPCOMING';
      }
    }

    res.json({
      success: true,
      data: {
        ...prospect,
        followUpStatus: computedFollowUpStatus
      }
    });
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// PATCH /api/admin/prospects/:id - Update prospect details & status
// -----------------------------------------------------------------------------
router.patch(
  '/:id',
  authenticateAdmin,
  validateBody(z.object({
    businessName: z.string().optional(),
    websiteUrl: z.string().optional(),
    category: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    contactPageUrl: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    potentialServiceFit: z.string().optional(),
    benefitReason: z.string().optional().nullable(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
    confidence: z.enum(['VERIFIED', 'NEEDS_REVIEW', 'INFERRED']).optional(),
    status: z.enum([
      'NEW', 'RESEARCHED', 'QUALIFIED', 'READY_FOR_OUTREACH',
      'CONTACTED', 'REPLIED', 'MEETING_REQUESTED', 'PROPOSAL_SENT',
      'WON', 'LOST', 'DO_NOT_CONTACT'
    ]).optional(),
    internalNotes: z.string().optional().nullable()
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: any = { ...req.body };

      if (updateData.websiteUrl) {
        updateData.normalizedDomain = normalizeDomain(updateData.websiteUrl);
      }

      const existing = await prisma.prospect.findUnique({ where: { id } });
      if (!existing) {
        res.status(404).json({ success: false, message: 'Prospect not found.' });
        return;
      }

      // If status changed to DO_NOT_CONTACT, automatically add to suppression list
      if (updateData.status === 'DO_NOT_CONTACT' && existing.status !== 'DO_NOT_CONTACT') {
        await prisma.suppressedContact.create({
          data: {
            email: existing.email,
            domain: existing.normalizedDomain,
            reason: 'DO_NOT_CONTACT_STATUS_SET_BY_ADMIN',
            source: `Admin: ${req.admin?.name || 'Admin'}`
          }
        });
      }

      const updated = await prisma.prospect.update({
        where: { id },
        data: updateData
      });

      // Record activity if status changed
      if (updateData.status && updateData.status !== existing.status) {
        await prisma.prospectActivity.create({
          data: {
            prospectId: id,
            adminId: req.admin?.id || null,
            authorName: req.admin?.name || 'Admin',
            activityType: 'STATUS_CHANGED',
            subject: `Status changed from ${existing.status} to ${updateData.status}`,
            outcome: updateData.status
          }
        });
      }

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'UPDATE_PROSPECT',
        entity: 'Prospect',
        entityId: id,
        metadata: { changes: Object.keys(updateData) }
      });

      res.json({
        success: true,
        message: 'Prospect details updated successfully.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/:id/notes - Add note
// -----------------------------------------------------------------------------
router.post(
  '/:id/notes',
  authenticateAdmin,
  validateBody(z.object({
    note: z.string().min(2, 'Note cannot be empty')
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { note } = req.body;

      const prospectNote = await prisma.prospectNote.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: note.trim()
        }
      });

      res.status(201).json({
        success: true,
        message: 'Note added to prospect timeline.',
        data: prospectNote
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/:id/followup - Schedule follow-up
// -----------------------------------------------------------------------------
router.post(
  '/:id/followup',
  authenticateAdmin,
  validateBody(z.object({
    followUpDate: z.string().min(1, 'Follow-up date is required'),
    followUpNote: z.string().optional().nullable()
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { followUpDate, followUpNote } = req.body;

      const rawDateStr = String(followUpDate).trim();
      const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDateStr)
        ? new Date(`${rawDateStr}T12:00:00.000Z`)
        : new Date(rawDateStr);

      if (isNaN(parsedDate.getTime())) {
        res.status(422).json({ success: false, message: 'Invalid follow-up date format.' });
        return;
      }

      const updated = await prisma.prospect.update({
        where: { id },
        data: {
          followUpDate: parsedDate,
          followUpStatus: 'PENDING',
          followUpNote: followUpNote ? followUpNote.trim() : null
        }
      });

      await prisma.prospectNote.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: `Scheduled follow-up for ${parsedDate.toLocaleDateString()}${followUpNote ? `: ${followUpNote}` : ''}`
        }
      });

      res.json({
        success: true,
        message: 'Follow-up reminder scheduled.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// PATCH /api/admin/prospects/:id/followup/complete - Mark follow-up complete
// -----------------------------------------------------------------------------
router.patch(
  '/:id/followup/complete',
  authenticateAdmin,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const updated = await prisma.prospect.update({
        where: { id },
        data: { followUpStatus: 'COMPLETED' }
      });

      await prisma.prospectNote.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: 'Marked scheduled follow-up as completed.'
        }
      });

      res.json({
        success: true,
        message: 'Follow-up marked as completed.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/:id/activities - Log manual outreach activity
// -----------------------------------------------------------------------------
const activitySchema = z.object({
  activityType: z.enum([
    'EMAIL_DRAFTED', 'EMAIL_SENT_MANUAL', 'CONTACT_FORM_SUBMITTED',
    'PHONE_CALL', 'LINKEDIN_INTERACTION', 'REPLY_RECEIVED',
    'MEETING_BOOKED', 'PROPOSAL_SENT', 'STATUS_CHANGED', 'NOTE_ADDED'
  ]),
  channel: z.enum(['EMAIL', 'CONTACT_FORM', 'PHONE', 'LINKEDIN', 'VIDEO_CALL', 'IN_PERSON']).optional().nullable(),
  subject: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  outcome: z.string().optional().nullable(),
  nextFollowUp: z.string().optional().nullable()
});

router.post(
  '/:id/activities',
  authenticateAdmin,
  validateBody(activitySchema),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { activityType, channel, subject, content, outcome, nextFollowUp } = req.body;

      const prospect = await prisma.prospect.findUnique({ where: { id } });
      if (!prospect) {
        res.status(404).json({ success: false, message: 'Prospect not found.' });
        return;
      }

      // Check Do Not Contact enforcement
      if (prospect.status === 'DO_NOT_CONTACT' && (activityType === 'EMAIL_SENT_MANUAL' || activityType === 'CONTACT_FORM_SUBMITTED' || activityType === 'PHONE_CALL')) {
        res.status(403).json({
          success: false,
          code: 'DO_NOT_CONTACT_RESTRICTION',
          message: 'Cannot perform active outreach. This prospect is marked DO_NOT_CONTACT.'
        });
        return;
      }

      let parsedNext: Date | null = null;
      if (nextFollowUp) {
        const d = new Date(nextFollowUp);
        if (!isNaN(d.getTime())) parsedNext = d;
      }

      const activity = await prisma.prospectActivity.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          activityType,
          channel: channel || 'EMAIL',
          subject: subject ? subject.trim() : null,
          content: content ? content.trim() : null,
          outcome: outcome ? outcome.trim() : null,
          nextFollowUp: parsedNext,
          performedAt: new Date()
        }
      });

      // Automatically update prospect status when milestone activities occur
      const statusUpdates: Record<string, string> = {
        'EMAIL_SENT_MANUAL': 'CONTACTED',
        'CONTACT_FORM_SUBMITTED': 'CONTACTED',
        'REPLY_RECEIVED': 'REPLIED',
        'MEETING_BOOKED': 'MEETING_REQUESTED',
        'PROPOSAL_SENT': 'PROPOSAL_SENT'
      };

      const newStatus = statusUpdates[activityType];
      if (newStatus && prospect.status !== newStatus && prospect.status !== 'WON' && prospect.status !== 'DO_NOT_CONTACT') {
        await prisma.prospect.update({
          where: { id },
          data: {
            status: newStatus,
            ...(parsedNext ? { followUpDate: parsedNext, followUpStatus: 'PENDING' } : {})
          }
        });
      }

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'LOG_PROSPECT_ACTIVITY',
        entity: 'ProspectActivity',
        entityId: activity.id,
        metadata: { prospectId: id, activityType, outcome }
      });

      res.status(201).json({
        success: true,
        message: 'Outreach activity logged successfully.',
        data: activity
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/:id/draft - Generate Personalized Outreach Draft
// -----------------------------------------------------------------------------
const draftRequestSchema = z.object({
  service: z.string().default('Web Development'),
  channel: z.enum(['EMAIL', 'CONTACT_FORM', 'LINKEDIN', 'PHONE']).default('EMAIL'),
  tone: z.enum(['PROFESSIONAL', 'CONSULTATIVE', 'VALUE_FOCUSED']).default('CONSULTATIVE'),
  observedOpportunity: z.string().optional().nullable(),
  proposedValue: z.string().optional().nullable(),
  desiredNextStep: z.string().optional().nullable()
});

router.post(
  '/:id/draft',
  authenticateAdmin,
  validateBody(draftRequestSchema),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { service, channel, tone, observedOpportunity, proposedValue, desiredNextStep } = req.body;

      const prospect = await prisma.prospect.findUnique({ where: { id } });
      if (!prospect) {
        res.status(404).json({ success: false, message: 'Prospect not found.' });
        return;
      }

      if (prospect.status === 'DO_NOT_CONTACT') {
        res.status(403).json({
          success: false,
          code: 'DO_NOT_CONTACT_RESTRICTION',
          message: 'Draft generation blocked. This prospect has requested no contact.'
        });
        return;
      }

      const businessName = prospect.businessName;
      const cityState = prospect.city && prospect.state ? `${prospect.city}, ${prospect.state}` : (prospect.city || prospect.state || 'your market');
      const opportunityText = observedOpportunity || prospect.benefitReason || `enhancing your digital presence and web architecture in ${cityState}`;
      const valueText = proposedValue || 'providing high-performance, senior engineering consultation with transparent milestone delivery and dedicated remote collaboration';
      const nextStepText = desiredNextStep || 'a brief 15-minute video consultation to review your current architecture and outline actionable improvements';

      let subject = '';
      let body = '';

      if (service === 'SEO' || service === 'SEO Services') {
        subject = `Technical Organic Visibility & Search Architecture for ${businessName}`;
        body = `Hi ${businessName} Team,\n\nI was reviewing digital presences across ${cityState} and came across ${businessName} (${prospect.websiteUrl}).\n\nSpecifically, I noted an opportunity around: ${opportunityText}.\n\nAt House Robotics, we deliver technical SEO architecture, structured schema implementation, and search performance tuning for regional and national enterprises. Rather than generic backlinks, our focus is on technical audit fundamentals, high-intent service silo structures, and crawl efficiency: ${valueText}.\n\nWould you be open to ${nextStepText}?\n\nLooking forward to hearing your thoughts.\n\nWarm regards,\nSameer Liaqat\nPrincipal Strategist, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/\nRemote USA Engineering & Dedicated Strategy Consultations`;
      } else if (service === 'AI Automation' || service === 'AI & Automation') {
        subject = `Workflow Automation & Process Optimization for ${businessName}`;
        body = `Hi ${businessName} Team,\n\nI am reaching out regarding repetitive digital workflows at ${businessName}.\n\nIn our research into businesses in ${cityState}, we observed an opportunity for: ${opportunityText}.\n\nHouse Robotics develops custom API workflows, CRM integration pipelines, and intelligent operational automations that save enterprise teams dozens of manual hours every week without disrupting existing software: ${valueText}.\n\nCould we coordinate ${nextStepText} to see if custom automations fit your roadmap this quarter?\n\nBest regards,\nSameer Liaqat\nLead Engineering Consultant, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/`;
      } else if (service === 'E-Commerce' || service === 'E-commerce Development') {
        subject = `E-Commerce Platform Performance & Conversion Experience for ${businessName}`;
        body = `Hi ${businessName} Team,\n\nI came across your online store at ${prospect.websiteUrl}.\n\nWhile reviewing the catalog navigation and mobile responsiveness for shoppers in ${cityState}, I noticed: ${opportunityText}.\n\nHouse Robotics engineers modern Shopify, WooCommerce, and custom headless e-commerce storefronts designed for sub-second load times, streamlined checkout flows, and enterprise stability: ${valueText}.\n\nWould you be available for ${nextStepText} to discuss your digital storefront?\n\nSincerely,\nSameer Liaqat\nHouse Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/`;
      } else {
        // Default Web Development
        subject = `Custom Web Engineering & Digital Platform for ${businessName}`;
        body = `Hi ${businessName} Team,\n\nI came across ${businessName} (${prospect.websiteUrl}) while reviewing commercial service websites in ${cityState}.\n\nI noticed an opportunity for: ${opportunityText}.\n\nAt House Robotics, we build custom high-performance web applications, client portals, and modern digital platforms. We pair senior architectural engineering with seamless remote collaboration aligned with US business hours: ${valueText}.\n\nWould you have 15 minutes this week for ${nextStepText}?\n\nBest regards,\nSameer Liaqat\nFounder & Engineering Lead, House Robotics\nWhatsApp: +92 347 4542881\nEmail: sameerliaqat81@gmail.com\nWebsite: https://houserobotics.online/\nTransparent Remote Collaboration with US Enterprises`;
      }

      // Mandatory CAN-SPAM compliant opt-out footer for email drafts
      const optOutFooter = `\n\n----------------------------------------\nHouse Robotics | Strategic Web Engineering & AI Solutions\nLahore, Pakistan | Serving Remote Clients Across the USA\nOfficial Contact: sameerliaqat81@gmail.com | +92 347 4542881\nOpt-out: If you prefer not to receive strategic engineering briefings from House Robotics, simply reply with "Unsubscribe" or "Do Not Contact" to be immediately removed from our research list.`;

      const fullDraft = body + optOutFooter;

      // Log draft activity
      await prisma.prospectActivity.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          activityType: 'EMAIL_DRAFTED',
          channel,
          subject,
          content: fullDraft,
          outcome: 'DRAFT_GENERATED'
        }
      });

      // Update status to READY_FOR_OUTREACH if still NEW or RESEARCHED
      if (prospect.status === 'NEW' || prospect.status === 'RESEARCHED') {
        await prisma.prospect.update({
          where: { id },
          data: { status: 'READY_FOR_OUTREACH' }
        });
      }

      res.json({
        success: true,
        data: {
          channel,
          tone,
          subject,
          body,
          optOutFooter,
          fullDraft
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// POST /api/admin/prospects/:id/convert - Convert Prospect to CRM Lead
// -----------------------------------------------------------------------------
router.post(
  '/:id/convert',
  authenticateAdmin,
  validateBody(z.object({
    service: z.string().optional(),
    budget: z.string().optional().nullable(),
    timeline: z.string().optional().nullable(),
    notes: z.string().optional().nullable()
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { service, budget, timeline, notes } = req.body;

      const prospect = await prisma.prospect.findUnique({
        where: { id },
        include: { notes: true, activities: true }
      });

      if (!prospect) {
        res.status(404).json({ success: false, message: 'Prospect not found.' });
        return;
      }

      // Check if already converted
      if (prospect.convertedLeadId) {
        const existingLead = await prisma.lead.findUnique({ where: { id: prospect.convertedLeadId } });
        if (existingLead) {
          res.status(409).json({
            success: false,
            code: 'ALREADY_CONVERTED',
            message: `Prospect has already been converted to lead inquiry ${existingLead.inquiryId}.`,
            data: existingLead
          });
          return;
        }
      }

      // Check if a lead with same email or domain already exists
      const email = prospect.email || `contact@${prospect.normalizedDomain}`;
      const duplicateLead = await prisma.lead.findFirst({
        where: {
          OR: [
            { email: { equals: email } },
            { websiteUrl: { contains: prospect.normalizedDomain } }
          ]
        }
      });

      if (duplicateLead) {
        // Link to existing lead
        await prisma.prospect.update({
          where: { id },
          data: {
            convertedLeadId: duplicateLead.id,
            convertedAt: new Date(),
            status: 'QUALIFIED'
          }
        });

        res.json({
          success: true,
          message: `Prospect linked to existing CRM Lead ${duplicateLead.inquiryId}.`,
          data: duplicateLead
        });
        return;
      }

      // Generate inquiry ID
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const inquiryId = `HR-INQ-${dateStr}-${randomSuffix}`;

      // Create new Lead record
      const lead = await prisma.lead.create({
        data: {
          inquiryId,
          name: prospect.businessName,
          email,
          phone: prospect.phone,
          company: prospect.businessName,
          websiteUrl: prospect.websiteUrl,
          city: prospect.city,
          state: prospect.state,
          service: service || prospect.potentialServiceFit,
          budget: budget || null,
          timeline: timeline || null,
          message: `Converted from USA Prospect Manager (${prospect.normalizedDomain}). Opportunity rationale: ${prospect.benefitReason || 'Direct research'}.${notes ? ' Admin note: ' + notes : ''}`,
          source: `Outreach (${prospect.sourceType})`,
          status: 'QUALIFIED',
          score: 75,
          followUpDate: prospect.followUpDate,
          followUpStatus: prospect.followUpStatus,
          followUpNote: prospect.followUpNote,
          consentGiven: true,
          prospectId: prospect.id
        }
      });

      // Update prospect record
      await prisma.prospect.update({
        where: { id },
        data: {
          convertedLeadId: lead.id,
          convertedAt: new Date(),
          status: 'QUALIFIED'
        }
      });

      // Transfer notes
      for (const n of prospect.notes) {
        await prisma.leadNote.create({
          data: {
            leadId: lead.id,
            adminId: n.adminId,
            authorName: n.authorName,
            note: `[Transferred from Prospect Notes]: ${n.note}`
          }
        });
      }

      // Record activity
      await prisma.prospectActivity.create({
        data: {
          prospectId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          activityType: 'STATUS_CHANGED',
          subject: `Converted prospect into CRM Lead ${inquiryId}`,
          outcome: 'CONVERTED'
        }
      });

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'CONVERT_PROSPECT_TO_LEAD',
        entity: 'Prospect',
        entityId: id,
        metadata: { leadId: lead.id, inquiryId }
      });

      res.status(201).json({
        success: true,
        message: `Prospect successfully converted to CRM Lead (${inquiryId}).`,
        data: lead
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// DELETE /api/admin/prospects/:id - Delete prospect
// -----------------------------------------------------------------------------
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const existing = await prisma.prospect.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Prospect not found.' });
      return;
    }

    await prisma.prospect.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'DELETE_PROSPECT',
      entity: 'Prospect',
      entityId: id,
      metadata: { businessName: existing.businessName, domain: existing.normalizedDomain }
    });

    res.json({
      success: true,
      message: 'Prospect record deleted.'
    });
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// CAMPAIGN MANAGEMENT ROUTES
// -----------------------------------------------------------------------------

// GET /api/admin/prospects/campaigns/list
router.get('/campaigns/list', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const campaigns = await prisma.prospectCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { members: true } }
      }
    });

    res.json({
      success: true,
      data: campaigns
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/prospects/campaigns/create
router.post(
  '/campaigns/create',
  authenticateAdmin,
  validateBody(z.object({
    name: z.string().min(2, 'Campaign name is required'),
    goal: z.string().optional().nullable(),
    service: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    targetAudience: z.string().optional().nullable(),
    messageTemplate: z.string().optional().nullable(),
    status: z.enum(['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'PAUSED', 'COMPLETED']).default('DRAFT'),
    notes: z.string().optional().nullable()
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, goal, service, city, state, category, targetAudience, messageTemplate, status, notes } = req.body;

      const campaign = await prisma.prospectCampaign.create({
        data: {
          name: name.trim(),
          goal: goal ? goal.trim() : null,
          service: service || null,
          city: city || null,
          state: state || null,
          category: category || null,
          targetAudience: targetAudience ? targetAudience.trim() : null,
          messageTemplate: messageTemplate ? messageTemplate.trim() : null,
          status: status || 'DRAFT',
          notes: notes ? notes.trim() : null
        }
      });

      res.status(201).json({
        success: true,
        message: 'Outreach campaign created.',
        data: campaign
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/admin/prospects/campaigns/:id/members - Assign prospects to campaign
router.post(
  '/campaigns/:id/members',
  authenticateAdmin,
  validateBody(z.object({
    prospectIds: z.array(z.string().min(1)).min(1, 'Select at least one prospect')
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { prospectIds } = req.body;

      let added = 0;
      for (const pId of prospectIds) {
        try {
          await prisma.prospectCampaignMember.create({
            data: {
              campaignId: id,
              prospectId: pId,
              status: 'PLANNED'
            }
          });
          added++;
        } catch {
          // Already in campaign, ignore unique constraint error
        }
      }

      res.json({
        success: true,
        message: `${added} prospects assigned to campaign.`,
        data: { added }
      });
    } catch (err) {
      next(err);
    }
  }
);

// -----------------------------------------------------------------------------
// SUPPRESSION LIST ROUTES
// -----------------------------------------------------------------------------

// GET /api/admin/prospects/suppressions/list
router.get('/suppressions/list', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await prisma.suppressedContact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: list
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/prospects/suppressions/add
router.post(
  '/suppressions/add',
  authenticateAdmin,
  validateBody(z.object({
    email: z.string().optional().nullable(),
    domain: z.string().optional().nullable(),
    reason: z.string().min(2, 'Reason is required')
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, domain, reason } = req.body;

      if (!email && !domain) {
        res.status(422).json({ success: false, message: 'Please specify an email or domain to suppress.' });
        return;
      }

      const item = await prisma.suppressedContact.create({
        data: {
          email: email ? email.trim().toLowerCase() : null,
          domain: domain ? normalizeDomain(domain) : null,
          reason: reason.trim(),
          source: `Admin Manual Entry (${req.admin?.name || 'Admin'})`
        }
      });

      res.status(201).json({
        success: true,
        message: 'Contact/domain added to suppression list.',
        data: item
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
