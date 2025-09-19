export type KakaoState = "in" | "up";

export const buildKakaoAuthUrl = (state: KakaoState) => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
  const qs = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state, 
    scope: "profile_nickname",
  });
  return `https://kauth.kakao.com/oauth/authorize?${qs.toString()}`;
};
