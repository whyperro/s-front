import axios from 'axios';
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'https://d867-190-207-118-231.ngrok-free.app/auth-laravel11/public/api',
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
