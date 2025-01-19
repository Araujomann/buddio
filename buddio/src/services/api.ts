import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.PRODUCTION_API_URL,
    withCredentials: true,
});
