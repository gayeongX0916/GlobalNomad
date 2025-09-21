"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { basicAxios } from "@/lib/api/basicAxios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/lib/stores/auth";
import { setRefreshCookie } from "@/lib/utils/cookies";
import axios from "axios";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const code = sp.get("code");
  const state = (sp.get("state") as "in" | "up") || "up";
  const next = sp.get("next") || "/";
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  useEffect(() => {
    (async () => {
      if (!code) {
        toast.error("인가 코드(code)가 없습니다.");
        router.replace("/");
        return;
      }
      if (!redirectUri) {
        toast.error("리다이렉트 URI 설정이 없습니다.");
        router.replace("/");
        return;
      }

      const signIn = async () => {
        const { data } = await basicAxios.post("/oauth/sign-in/kakao", {
          redirectUri,
          token: code,
        });
        return data;
      };

      const signUp = async () => {
        const { data } = await basicAxios.post("/oauth/sign-up/kakao", {
          redirectUri,
          token: code,
          nickname: "kakao_user",
        });
        return data;
      };

      try {
        let payload;
        if (state === "in") {
          payload = await signIn();
        } else {
          try {
            payload = await signUp();
          } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 409) {
              // 이미 가입된 유저 → 로그인 시도
              payload = await signIn();
            } else {
              throw err; // 바깥 catch로 넘김
            }
          }
        }

        setAccessToken(payload.accessToken);
        setRefreshCookie(payload.refreshToken);
        router.replace(next);
      } catch (err: unknown) {
        if(axios.isAxiosError(err)){
          toast.error(err?.response?.data?.message ?? "연결 중 오류");
        }
        router.replace("/");
      }
    })();
  }, [code, redirectUri, router, state, next, setAccessToken]);

  return <main className="p-8">{/* 스켈레톤 둘 예정 */}</main>;
}
