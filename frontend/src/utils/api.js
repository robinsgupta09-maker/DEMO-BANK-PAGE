import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (userId, password) => api.post('/auth/login', { user_id: userId, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

export const bankingAPI = {
  getBalance: () => api.get('/banking/balance'),
  getTransactions: () => api.get('/banking/transactions'),
  getCards: () => api.get('/banking/cards'),
  getAnalytics: () => api.get('/banking/analytics'),
};

export const adminAPI = {
  login: (adminId, password) => api.post('/admin/login', { admin_id: adminId, password }),
  getUsers: () => api.get('/admin/users'),
  updateUserBalance: (userId, balance) => api.post('/admin/update-balance', { user_id: userId, balance }),
  updateUserProfile: (userId, data) => api.post('/admin/update-profile', { user_id: userId, ...data }),
  addTransaction: (userId, transaction) => api.post('/admin/add-transaction', { user_id: userId, ...transaction }),
  getAnalytics: () => api.get('/admin/analytics'),
};

export default api;
