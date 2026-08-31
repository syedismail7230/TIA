import prisma from '@/lib/db/prisma';

export interface AuditLogParams {
  userId?: string;
  userRole?: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Creates an append-only audit record for critical marketplace and security actions.
 */
export async function logAuditEvent(params: AuditLogParams) {
  try {
    return await prisma.auditLog.create({
      data: {
        userId: params.userId,
        userRole: params.userRole,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

export interface SimpleAuditParams {
  actorId?: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, any>;
}

export async function logAudit(params: SimpleAuditParams) {
  return logAuditEvent({
    userId: params.actorId,
    action: params.action,
    entityType: params.targetType,
    entityId: params.targetId,
    metadata: params.details,
  });
}
