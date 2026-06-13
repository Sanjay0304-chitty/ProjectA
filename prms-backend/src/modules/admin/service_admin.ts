import { prisma } from '../../db';

export async function getSystemSettings() {
  return prisma.systemSetting.findMany({ orderBy: { key: 'asc' } });
}

export async function updateSystemSetting(key: string, value: string) {
  return prisma.systemSetting.update({ where: { key }, data: { value } });
}

export async function addSystemSetting(key: string, value: string, category = 'general', description?: string) {
  return prisma.systemSetting.create({ data: { key, value, category, description } });
}

export async function getAuditLogs(page = 1, limit = 50, entity?: string) {
  const where: any = {};
  if (entity) where.entity = entity;
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { created_at: 'desc' }, include: { user: { select: { id: true, full_name: true, email: true } } } }),
    prisma.auditLog.count({ where }),
  ]);
  return { logs, total };
}

export async function createAuditLog(data: { userId?: string; action: string; entity: string; entityId?: string; details?: string; ipAddress?: string; userAgent?: string }) {
  return prisma.auditLog.create({ data });
}

export async function getNotifications(userId: string, page = 1, limit = 20) {
  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({ where: { userId }, skip: (page - 1) * limit, take: limit, orderBy: { created_at: 'desc' } }),
    prisma.notification.count({ where: { userId } }),
  ]);
  return { notifications, total };
}

export async function createNotification(data: { userId: string; type: string; title: string; message: string }) {
  return prisma.notification.create({ data });
}

export async function markNotificationRead(notificationId: string) {
  return prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
}

export async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}
