"use client";

import Script from "next/script";

export default function KakaoScript() {
  return (
    <Script
      id="kakao-maps-sdk"
      src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
      strategy="afterInteractive"
      onLoad={() => {
        if (window.kakao?.maps) {
          window.kakao.maps.load(() =>
            window.dispatchEvent(new Event("kakao:loaded"))
          );
        }
      }}
    />
  );
}
