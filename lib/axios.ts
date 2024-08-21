import axios from 'axios';
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.120/auth-laravel11/public/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default axiosInstance;
