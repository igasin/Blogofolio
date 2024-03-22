import axios from 'axios';
import { BASE_URL } from '../urls';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = localStorage.getItem('access_token');
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);

export default axiosInstance;
