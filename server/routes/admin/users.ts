import { Router, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, requireRoles, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
});

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional()
});

// GET /api/admin/users - list admin users (Super Admin & Admin)
router.get('/', authenticateAdmin, requireRoles('SUPER_ADMIN', 'ADMIN'), async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/users - create new admin user (Super Admin only)
router.post('/', authenticateAdmin, requireRoles('SUPER_ADMIN'), validateBody(createUserSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    if (existing) {
      res.status(400).json({ success: false, message: 'Admin user with this email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.adminUser.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'ADMIN_USER_CREATE',
      entity: 'AdminUser',
      entityId: newUser.id,
      metadata: { email: newUser.email, role: newUser.role }
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/users/:id - update admin user (Super Admin only)
router.put('/:id', authenticateAdmin, requireRoles('SUPER_ADMIN'), validateBody(updateUserSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive, password } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email.toLowerCase().trim();
    if (role !== undefined) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.passwordHash = await bcrypt.hash(password, salt);
    }

    const updated = await prisma.adminUser.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'ADMIN_USER_UPDATE',
      entity: 'AdminUser',
      entityId: id,
      metadata: { role, isActive }
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/users/:id - delete admin user
router.delete('/:id', authenticateAdmin, requireRoles('SUPER_ADMIN'), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (req.admin?.id === id) {
      res.status(400).json({ success: false, message: 'You cannot delete your own admin account' });
      return;
    }

    await prisma.adminUser.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'ADMIN_USER_DELETE',
      entity: 'AdminUser',
      entityId: id
    });

    res.json({ success: true, message: 'Admin user deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
