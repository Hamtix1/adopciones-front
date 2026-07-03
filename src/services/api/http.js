import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('acanis_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // No establecer Content-Type si es FormData para permitir multipart
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
});

export default http;
