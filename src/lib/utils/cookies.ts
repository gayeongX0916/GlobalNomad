"use client";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface TokenProps {
  accessToken?: string;
  refreshToken?: string;
}

const isProd = process.env.NODE_ENV === "production";

const BASE_OPTS = {
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};

const KEYS = {
  access: "accessToken",
  refresh: "refreshToken",
};

export function setCookiesByToken({ accessToken, refreshToken }: TokenProps) {
  if (accessToken) {
    setCookie(KEYS.access, accessToken, {
      ...BASE_OPTS,
      httpOnly: false,
      maxAge: 60 * 10,
    });
  }
  if (refreshToken) {
    setCookie(KEYS.refresh, refreshToken, {
      ...BASE_OPTS,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}

export function getTokensFromCookies() {
  const accessToken = getCookie(KEYS.access);
  const refreshToken = getCookie(KEYS.refresh);

  return {
    accessToken,
    refreshToken,
  };
}

export function deleteTokensFromCookies() {
  deleteCookie(KEYS.access);
  deleteCookie(KEYS.refresh);
}