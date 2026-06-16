import { apiClient } from './ApiClient';

/*  Auth endpoints  */

export const authApi = {
  register({ email, password, full_name, phone, role }) {
    return apiClient.post('/auth/register', {
      email,
      password,
      full_name,
      phone,
      role,
    });
  },

  login: ({ email, password }) => apiClient.post('/auth/login', { email, password }),

  googleLogin(idToken) {
    return apiClient.post('/auth/google', { idToken });
  },

  refresh({ refreshToken }) {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  logout() {
    return apiClient.post('/auth/logout');
  },

  getMe() {
    return apiClient.get('/auth/me');
  },

  updateMe(data) {
    return apiClient.put('/auth/me', data);
  },
};
