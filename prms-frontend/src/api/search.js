import { apiClient } from './ApiClient';

export const searchApi = {
  search(params) {
    return apiClient.get('/search', { params });
  },
  getFavorites() {
    return apiClient.get('/search/favorites');
  },
  toggleFavorite(propertyId) {
    return apiClient.post(`/search/favorites/${propertyId}/toggle`);
  },
};
