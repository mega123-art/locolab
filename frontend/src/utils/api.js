import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  signin: (credentials) => api.post('/auth/signin', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  checkUsername: (username) => api.get(`/auth/check-username?value=${username}`),
};

export const campaignAPI = {
  create: (formData) => api.post('/campaigns', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getByBrand: (brandId) => api.get(`/campaigns/brand/${brandId}`),
  starCreator: (campaignId, creatorId) => api.patch(`/campaigns/${campaignId}/star/${creatorId}`),
  getStarredCreators: (campaignId) => api.get(`/campaigns/${campaignId}/starred`),
};

export const creatorAPI = {
  search: (city) => api.get(`/creators?city=${encodeURIComponent(city)}`),
  getProfile: (creatorId) => api.get(`/creators/profile/${creatorId}`),
};

export const adminAPI = {
  getPendingCreators: () => api.get('/admin/creators/pending'),
  getFulfilledCreators: () => api.get('/admin/creators/fulfilled'),
  updateCreatorProfile: (creatorId, profileData) => api.patch(`/admin/creators/${creatorId}`, profileData),
};

export default api;