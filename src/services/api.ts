import axios from 'axios';

const apiBaseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_DEVELOPMENT_API_URL || 'http://localhost:5000'
  : import.meta.env.VITE_PRODUCTION_API_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
