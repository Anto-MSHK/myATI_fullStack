import axios from "axios";

export const API_URL = `https://myati.up.railway.app`;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// $api.interceptors.request.use((config: any) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });
