"use client";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const isProd = process.env.NODE_ENV === "production";

const BASE = {
  secure: isProd,
  sameSite: "strict" as const,
  path: "/",
};

const KEYS = {
  refresh: "refreshToken",
};

export function setRefreshCookie(
  refreshToken: string,
  maxAgeSec = 60 * 60 * 24 * 3
) {
  setCookie(KEYS.refresh, refreshToken, {
    ...BASE,
    httpOnly: false,
    maxAge: maxAgeSec,
  });
}

export function getRefreshFromCookie() {
  return getCookie(KEYS.refresh) as string | undefined;
}

export function deleteRefreshCookie() {
  deleteCookie(KEYS.refresh, { path: "/" });
}
