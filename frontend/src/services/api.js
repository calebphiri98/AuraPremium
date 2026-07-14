import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const productAPI = {
  getAll: (params) => api.get('/products', { params }).then(res => res.data),
  getBySlug: (slug) => api.get(`/products/${slug}`).then(res => res.data),
  create: (formData) => api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data)
};

export default api;