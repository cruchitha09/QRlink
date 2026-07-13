import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qrlink_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('qrlink_token');
      localStorage.removeItem('qrlink_user');
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (payload) => api.post('/api/auth/register', payload),
  login: (payload) => api.post('/api/auth/login', payload),
};

export const linksAPI = {
  create: (payload) => api.post('/api/url/create', payload),
  myLinks: () => api.get('/api/url/my-links'),
  remove: (id) => api.delete(`/api/url/delete/${id}`),
  qr: (shortCode) => api.get(`/api/url/qr/${shortCode}`),
};

export default api;
