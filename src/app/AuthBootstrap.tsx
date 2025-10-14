"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth";
import {
  getRefreshFromCookie,
  setRefreshCookie,
  deleteRefreshCookie,
} from "@/lib/utils/cookies";
import { basicAxios, refreshAxios } from "@/lib/api/basicAxios";

export default function AuthBootstrap() {
  const { setAccessToken, setProfileImageUrl, setUserName, setUserId, clear } =
    useAuthStore.getState();

  useEffect(() => {
    const boot = async () => {
      try {
        const refresh = getRefreshFromCookie();
        if (!refresh) return;

        const { data } = await refreshAxios.post(
          "/auth/tokens",
          {},
          { headers: { Authorization: `Bearer ${refresh}` } }
        );

        const newAccess = data?.accessToken;
        const newRefresh = data?.refreshToken;
        if (!newAccess) throw new Error("No access token in refresh response");

        setAccessToken(newAccess);
        if (newRefresh) setRefreshCookie(newRefresh);

        const me = await basicAxios.get("/users/me");
        setUserId(me.data?.id ?? null);
        setUserName(me.data?.nickname ?? null);
        setProfileImageUrl(me.data?.profileImageUrl ?? null);
      } catch {
        clear();
        deleteRefreshCookie();
      }
    };

    boot();
  }, [clear,setAccessToken,setProfileImageUrl,setUserId,setUserName]);

  return null;
}
