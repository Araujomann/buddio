import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const api = axios.create({
  baseURL: 'https://buddio-backend-production.up.railway.app',
  withCredentials: true,
});
