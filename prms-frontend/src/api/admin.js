import { apiClient } from './ApiClient';

export const adminApi = {
  /* Settings */
  getSettings() {
    return apiClient.get('/admin/settings');
  },
  updateSetting(data) {
    return apiClient.put('/admin/settings', data);
  },
  addSetting(data) {
    return apiClient.post('/admin/settings', data);
  },

  /* Audit logs */
  getAuditLogs(params) {
    return apiClient.get('/admin/audit-logs', { params });
  },

  /* Notifications */
  getNotifications(params) {
    return apiClient.get('/admin/notifications', { params });
  },
  markAsRead(id) {
    return apiClient.patch(`/admin/notifications/${id}/read`);
  },
  markAllAsRead() {
    return apiClient.post('/admin/notifications/read-all');
  },
  dismiss(id) {
    return apiClient.delete(`/admin/notifications/${id}`);
  },
};
