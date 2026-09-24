import { prisma } from '../prisma';

export interface LogActionParams {
  adminId?: string | null;
  adminName?: string;
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: Record<string, any>;
}

export const logAdminActivity = async (params: LogActionParams): Promise<void> => {
  try {
    await prisma.activityLog.create({
      data: {
        adminId: params.adminId || null,
        adminName: params.adminName || 'System',
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null
      }
    });
  } catch (err) {
    console.error('[AUDIT LOG ERROR] Failed to record activity log:', err);
  }
};
