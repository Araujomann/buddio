import axios from 'axios';

export const api = axios.create({
  baseURL: 'buddio-backend-production.up.railway.app',
  withCredentials: true,
});
