import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getTokensFromCookies,
  setCookiesByToken,
  deleteTokensFromCookies,
} from "@/lib/utils/cookies";

export const basicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

basicAxios.interceptors.request.use((config) => {
  const { accessToken } = getTokensFromCookies();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 401이면 refresh → 성공 시 재시도, 실패 시 로그아웃
basicAxios.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || original?._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    const { refreshToken } = getTokensFromCookies();
    if (!refreshToken) {
      deleteTokensFromCookies();
      if (typeof window !== "undefined") window.location.href = "/signin";
      return Promise.reject(error);
    }

    try {
      const { data } = await basicAxios.post(
        "/auth/tokens",
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const newAccess = data?.accessToken;
      const newRefresh = data?.refreshToken;
      if (!newAccess) throw new Error("No access token from refresh");

      setCookiesByToken({ accessToken: newAccess, refreshToken: newRefresh });

      return basicAxios.request({
        ...original,
        headers: new AxiosHeaders(original.headers).set(
          "Authorization",
          `Bearer ${newAccess}`
        ),
      });
    } catch (e) {
      deleteTokensFromCookies();
      if (typeof window !== "undefined") window.location.href = "/signin";
      return Promise.reject(e);
    }
  }
);
