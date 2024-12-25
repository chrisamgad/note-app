// lib/axios.js
import axios from 'axios';

const isServer = typeof window === 'undefined';

const baseURL = isServer
  ? process.env.API_BASE_URL || 'http://back:3001'          // Server-side: Docker service name
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; // Client-side: Host machine

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Include cookies in requests if needed
});

export default axiosInstance;