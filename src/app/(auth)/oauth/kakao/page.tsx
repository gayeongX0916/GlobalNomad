"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { basicAxios } from "@/lib/api/basicAxios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/lib/stores/auth";
import { setRefreshCookie } from "@/lib/utils/cookies";
import axios from "axios";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { buildKakaoAuthUrl } from "@/lib/utils/KakaoLogin";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const code = sp.get("code");
  const state = (sp.get("state") as "in" | "up") || "up";
  const next = sp.get("next") || "/";
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const setUserId = useAuthStore((s) => s.setUserId);
  const setUserName = useAuthStore((s) => s.setUserName);
  const setProfileImageUrl = useAuthStore((s) => s.setProfileImageUrl);

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
              payload = await signIn();
            } else {
              throw err;
            }
          }
        }

        setAccessToken(payload.accessToken);
        setRefreshCookie(payload.refreshToken);
        setUserId(payload.user.id);
        setUserName(payload.user.nickname);
        setProfileImageUrl(payload.user.profileImageUrl ?? null);

        router.replace(next);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 409) {
            toast.info(
              "이미 가입된 계정입니다. 카카오로 다시 로그인해 주세요."
            );
            router.replace(buildKakaoAuthUrl("in")); // 새 인가코드 받으러 이동
            return;
          }
          const msg =
            err.response?.data?.message ||
            err.response?.data?.error_description ||
            err.response?.data ||
            "연결 중 오류";
          toast.error(String(msg));
        }
        router.replace("/");
      }
    })();
  }, [
    code,
    redirectUri,
    router,
    state,
    next,
    setAccessToken,
    setUserId,
    setUserName,
    setProfileImageUrl,
  ]);

  return (
    <main className="flex justify-center items-center h-[400px]">
      <Spinner size="56px" />
    </main>
  );
}
