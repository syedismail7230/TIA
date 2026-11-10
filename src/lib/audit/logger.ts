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
    let validUserId: string | null = null;
    if (params.userId) {
      // Validate that userId is an existing User UUID to satisfy foreign key
      const exists = await prisma.user.findUnique({
        where: { id: params.userId },
        select: { id: true },
      }).catch(() => null);
      if (exists) {
        validUserId = exists.id;
      }
    }

    const metadataObj = {
      ...(params.metadata || {}),
      ...(validUserId ? {} : { rawActorId: params.userId }),
    };

    return await prisma.auditLog.create({
      data: {
        userId: validUserId,
        userRole: params.userRole,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        metadata: Object.keys(metadataObj).length > 0 ? JSON.stringify(metadataObj) : null,
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
