import axios from "axios";

export const basicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true,  쿠키 기반 인증이면
});

// basicAxios.interceptors.request.use((config) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
