// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // This should match the proxy path in vite.config.js
  withCredentials: true, // ⬅️ Important for sending cookies
});

export default axiosInstance;
