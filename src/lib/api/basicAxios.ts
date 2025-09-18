import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../stores/auth";
import {
  deleteRefreshCookie,
  getRefreshFromCookie,
  setRefreshCookie,
} from "../utils/cookies";

export const basicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const refreshAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

basicAxios.interceptors.request.use((config) => {
  const access = useAuthStore.getState().accessToken;
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken?: string;
} | null> | null = null;

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

    try {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refresh = getRefreshFromCookie();
          if (!refresh) return null;

          const { data } = await refreshAxios.post(
            "/auth/tokens",
            {},
            { headers: { Authorization: `Bearer ${refresh}` } }
          );

          const newAccess = data?.accessToken;
          const newRefresh = data?.refreshToken;

          if (!newAccess) return null;

          if (newRefresh) setRefreshCookie(newRefresh);
          return { accessToken: newAccess, refreshToken: newRefresh };
        })();
      }

      const result = await refreshPromise;
      refreshPromise = null;

      if (!result?.accessToken) {
        useAuthStore.getState().clear();
        deleteRefreshCookie();
        if (typeof window !== "undefined") window.location.href = "/signin";
        return Promise.reject(error);
      }

      useAuthStore.getState().setAccessToken(result.accessToken);

      return basicAxios.request({
        ...original,
        headers: new AxiosHeaders(original.headers).set(
          "Authorization",
          `Bearer ${result.accessToken}`
        ),
      });
    } catch (e) {
      refreshPromise = null;
      useAuthStore.getState().clear();
      deleteRefreshCookie();
      if (typeof window !== "undefined") window.location.href = "/signin";
      return Promise.reject(e);
    }
  }
);
