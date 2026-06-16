"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemSettings = getSystemSettings;
exports.updateSystemSetting = updateSystemSetting;
exports.addSystemSetting = addSystemSetting;
exports.getAuditLogs = getAuditLogs;
exports.createAuditLog = createAuditLog;
exports.getNotifications = getNotifications;
exports.createNotification = createNotification;
exports.markNotificationRead = markNotificationRead;
exports.markAllNotificationsRead = markAllNotificationsRead;
const db_1 = require("../../db");
async function getSystemSettings() {
    return db_1.prisma.systemSetting.findMany({ orderBy: { key: 'asc' } });
}
async function updateSystemSetting(key, value) {
    return db_1.prisma.systemSetting.update({ where: { key }, data: { value } });
}
async function addSystemSetting(key, value, category = 'general', description) {
    return db_1.prisma.systemSetting.create({ data: { key, value, category, description } });
}
async function getAuditLogs(page = 1, limit = 50, entity) {
    const where = {};
    if (entity)
        where.entity = entity;
    const [logs, total] = await Promise.all([
        db_1.prisma.auditLog.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { created_at: 'desc' }, include: { user: { select: { id: true, full_name: true, email: true } } } }),
        db_1.prisma.auditLog.count({ where }),
    ]);
    return { logs, total };
}
async function createAuditLog(data) {
    return db_1.prisma.auditLog.create({ data });
}
async function getNotifications(userId, page = 1, limit = 20) {
    const [notifications, total] = await Promise.all([
        db_1.prisma.notification.findMany({ where: { userId }, skip: (page - 1) * limit, take: limit, orderBy: { created_at: 'desc' } }),
        db_1.prisma.notification.count({ where: { userId } }),
    ]);
    return { notifications, total };
}
async function createNotification(data) {
    return db_1.prisma.notification.create({ data });
}
async function markNotificationRead(notificationId) {
    return db_1.prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
}
async function markAllNotificationsRead(userId) {
    return db_1.prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}
