import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// Helper to escape CSV cells and protect against Formula Injection (=, +, -, @)
function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).replace(/"/g, '""');
  // Prepend single quote if first character is a dangerous spreadsheet formula prefix
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return `"${str}"`;
}

// GET /api/admin/leads/export - export leads to CSV with formula injection protection
router.get('/export', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, service, source, city, state, followUp, search } = req.query;

    const where: any = {};
    if (status && status !== 'ALL') where.status = status as string;
    if (service && service !== 'ALL') where.service = { contains: service as string };
    if (source && source !== 'ALL') where.source = source as string;
    if (city && city !== 'ALL') where.city = { contains: city as string };
    if (state && state !== 'ALL') where.state = { contains: state as string };

    const todayUtcStr = new Date().toISOString().split('T')[0];
    const startOfToday = new Date(`${todayUtcStr}T00:00:00.000Z`);
    const endOfToday = new Date(`${todayUtcStr}T23:59:59.999Z`);

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
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
        { company: { contains: search as string } },
        { inquiryId: { contains: search as string } }
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const headers = [
      'Inquiry Reference',
      'Contact Name',
      'Business Email',
      'Phone',
      'Company Name',
      'Website URL',
      'Requested Service',
      'City',
      'State',
      'Project Budget',
      'Target Timeline',
      'Inbound Brief',
      'Lead Source',
      'CRM Status',
      'Follow-Up Date',
      'Follow-Up Status',
      'Follow-Up Note',
      'Consent Confirmed',
      'Landing Page',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Submission Timestamp'
    ];

    const rows = leads.map(l => [
      sanitizeCsvCell(l.inquiryId || ''),
      sanitizeCsvCell(l.name),
      sanitizeCsvCell(l.email),
      sanitizeCsvCell(l.phone || ''),
      sanitizeCsvCell(l.company || ''),
      sanitizeCsvCell(l.websiteUrl || ''),
      sanitizeCsvCell(l.service || ''),
      sanitizeCsvCell(l.city || ''),
      sanitizeCsvCell(l.state || ''),
      sanitizeCsvCell(l.budget || ''),
      sanitizeCsvCell(l.timeline || ''),
      sanitizeCsvCell(l.message || ''),
      sanitizeCsvCell(l.source || ''),
      sanitizeCsvCell(l.status),
      sanitizeCsvCell(l.followUpDate ? l.followUpDate.toISOString() : ''),
      sanitizeCsvCell(l.followUpStatus || 'NONE'),
      sanitizeCsvCell(l.followUpNote || ''),
      sanitizeCsvCell(l.consentGiven ? 'YES' : 'NO'),
      sanitizeCsvCell(l.pageUrl || ''),
      sanitizeCsvCell(l.utmSource || ''),
      sanitizeCsvCell(l.utmMedium || ''),
      sanitizeCsvCell(l.utmCampaign || ''),
      sanitizeCsvCell(l.createdAt.toISOString())
    ].join(','));

    const csvContent = '\uFEFF' + headers.map(h => `"${h}"`).join(',') + '\n' + rows.join('\n');

    const filename = `house-robotics-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'EXPORT_LEADS_CSV',
      entity: 'Lead',
      metadata: { count: leads.length, filterStatus: status || 'ALL' }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/leads - list CRM leads with filtering, search & pagination
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      status, service, search, source, city, state, followUp, dateRange,
      page = '1', limit = '20' 
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status && status !== 'ALL') where.status = status as string;
    if (service && service !== 'ALL') where.service = { contains: service as string };
    if (source && source !== 'ALL') where.source = source as string;
    if (city && city !== 'ALL') where.city = { contains: city as string };
    if (state && state !== 'ALL') where.state = { contains: state as string };

    // Follow-up status filtering
    const todayUtcStr = new Date().toISOString().split('T')[0];
    const startOfToday = new Date(`${todayUtcStr}T00:00:00.000Z`);
    const endOfToday = new Date(`${todayUtcStr}T23:59:59.999Z`);

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

    // Date range filter
    if (dateRange && dateRange !== 'all') {
      let days = 30;
      if (dateRange === 'today') days = 1;
      else if (dateRange === '7d') days = 7;
      else if (dateRange === '30d') days = 30;
      else if (dateRange === '90d') days = 90;
      where.createdAt = { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
        { company: { contains: search as string } },
        { inquiryId: { contains: search as string } },
        { phone: { contains: search as string } },
        { city: { contains: search as string } }
      ];
    }

    const [total, leads] = await Promise.all([
      prisma.lead.count({ where }),
      prisma.lead.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          notes: {
            orderBy: { createdAt: 'desc' },
            take: 3
          },
          communications: {
            orderBy: { createdAt: 'desc' },
            take: 2
          }
        }
      })
    ]);

    // Compute dynamic follow-up status on returned leads
    const enrichedLeads = leads.map(l => {
      let computedFollowUpStatus = l.followUpStatus;
      if (l.followUpDate && l.followUpStatus !== 'COMPLETED') {
        const d = new Date(l.followUpDate);
        if (d < startOfToday) {
          computedFollowUpStatus = 'OVERDUE';
        } else if (d >= startOfToday && d <= endOfToday) {
          computedFollowUpStatus = 'TODAY';
        } else {
          computedFollowUpStatus = 'UPCOMING';
        }
      }
      return {
        ...l,
        followUpStatus: computedFollowUpStatus
      };
    });

    res.json({
      success: true,
      data: enrichedLeads,
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

// GET /api/admin/leads/:id - get single lead with full history & notes
router.get('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          include: { admin: { select: { id: true, name: true, email: true } } }
        },
        communications: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found.' });
      return;
    }

    // Compute follow-up status
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    let computedFollowUpStatus = lead.followUpStatus;
    if (lead.followUpDate && lead.followUpStatus !== 'COMPLETED') {
      const d = new Date(lead.followUpDate);
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
        ...lead,
        followUpStatus: computedFollowUpStatus
      }
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/leads/:id/status - update lead stage
router.patch(
  '/:id/status',
  authenticateAdmin,
  validateBody(z.object({
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'])
  })),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const lead = await prisma.lead.update({
        where: { id },
        data: { status }
      });

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'UPDATE_LEAD_STATUS',
        entity: 'Lead',
        entityId: id,
        metadata: { oldStatus: lead.status, newStatus: status, leadName: lead.name }
      });

      res.json({
        success: true,
        message: `Lead status updated to ${status}.`,
        data: lead
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/admin/leads/:id/followup - schedule or update follow-up date and note
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
      let parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDateStr)
        ? new Date(`${rawDateStr}T12:00:00.000Z`)
        : new Date(rawDateStr);

      if (isNaN(parsedDate.getTime())) {
        res.status(422).json({ success: false, message: 'Invalid follow-up date format.' });
        return;
      }

      const updatedLead = await prisma.lead.update({
        where: { id },
        data: {
          followUpDate: parsedDate,
          followUpStatus: 'PENDING',
          followUpNote: followUpNote ? followUpNote.trim() : null
        }
      });

      // Add automated note to timeline
      await prisma.leadNote.create({
        data: {
          leadId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: `Scheduled follow-up for ${parsedDate.toLocaleDateString()}${followUpNote ? `: ${followUpNote}` : ''}`
        }
      });

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'SCHEDULE_LEAD_FOLLOWUP',
        entity: 'Lead',
        entityId: id,
        metadata: { followUpDate: parsedDate.toISOString(), note: followUpNote }
      });

      res.json({
        success: true,
        message: 'Follow-up reminder scheduled successfully.',
        data: updatedLead
      });
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/admin/leads/:id/followup/complete - mark follow-up as completed
router.patch(
  '/:id/followup/complete',
  authenticateAdmin,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const updatedLead = await prisma.lead.update({
        where: { id },
        data: {
          followUpStatus: 'COMPLETED'
        }
      });

      // Add timeline note
      await prisma.leadNote.create({
        data: {
          leadId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: 'Marked scheduled follow-up as completed.'
        }
      });

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'COMPLETE_LEAD_FOLLOWUP',
        entity: 'Lead',
        entityId: id
      });

      res.json({
        success: true,
        message: 'Follow-up marked as completed.',
        data: updatedLead
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/admin/leads/:id/notes - add a timeline note to a lead
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

      const leadNote = await prisma.leadNote.create({
        data: {
          leadId: id,
          adminId: req.admin?.id || null,
          authorName: req.admin?.name || 'Admin',
          note: note.trim()
        }
      });

      await logAdminActivity({
        adminId: req.admin?.id,
        adminName: req.admin?.name,
        action: 'ADD_LEAD_NOTE',
        entity: 'Lead',
        entityId: id,
        metadata: { notePreview: note.slice(0, 100) }
      });

      res.status(201).json({
        success: true,
        message: 'Note added to lead timeline.',
        data: leadNote
      });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/admin/leads/:id - delete lead
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'DELETE_LEAD',
      entity: 'Lead',
      entityId: id,
      metadata: { name: lead.name, email: lead.email }
    });

    res.json({
      success: true,
      message: 'Lead deleted.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
