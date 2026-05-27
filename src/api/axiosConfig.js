import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.hanyahunya.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    if (status === 401 && (code === 'TOKEN_401' || code === 'EXPIRED_TOKEN' || code === 'INVALID_TOKEN')) {
      // Token-related 401s during normal use → force re-login.
      // Skip on login/register endpoints (they legitimately return 401 with USER_401).
      const url = error.config?.url || '';
      if (!url.includes('/users/login') && !url.includes('/users/register') && !url.includes('/auth/email')) {
        localStorage.removeItem('accessToken');
        if (!window.location.pathname.endsWith('login.html')) {
          window.location.href = '/login.html';
        }
      }
    }
    return Promise.reject(error);
  },
);

export const API_BASE = API_BASE_URL;
export default axiosInstance;
