import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://buddio-backend.onrender.com',
  withCredentials: true,
});
