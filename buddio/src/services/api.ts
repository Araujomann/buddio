import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const api = axios.create({
  baseURL: process.env.DEVELOPMENT_API_URL,
  withCredentials: true,
});
