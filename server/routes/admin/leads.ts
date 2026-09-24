import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// GET /api/admin/leads - list CRM leads with filtering, search & pagination
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { status, service, search, source, page = '1', limit = '20' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status) where.status = status as string;
    if (service) where.service = { contains: service as string };
    if (source) where.source = source as string;

    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
        { company: { contains: search as string } },
        { inquiryId: { contains: search as string } }
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
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: leads,
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
        }
      }
    });

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found.' });
      return;
    }

    res.json({
      success: true,
      data: lead
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
