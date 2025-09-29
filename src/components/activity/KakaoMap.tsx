"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

type KakaoMapProps = {
  address: string;
  className?: string;
  level?: number;
};

export function KakaoMap({ address, className, level = 3 }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!address) return;

    let cleanup = () => {};

    const init = () => {
      if (!mapRef.current || !window.kakao?.maps) return;

      const { maps } = window.kakao;
      const map = new maps.Map(mapRef.current, {
        center: new maps.LatLng(37.5665, 126.978),
        level,
      });

      // 컨테이너 크기 변화(예: 탭/모달 열릴 때) 대응
      // const ro = new ResizeObserver(() => {
      // maps.event.trigger(map, "resize"); });
      // ro.observe(mapRef.current);
      // cleanup = () => ro.disconnect();

      const geocoder = new maps.services.Geocoder();
      /* eslint-disable @typescript-eslint/no-explicit-any */
      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (status === maps.services.Status.OK && result[0]) {
          const { x, y } = result[0];
          const coords = new maps.LatLng(Number(y), Number(x));

          new maps.Marker({ position: coords, map });

          map.setCenter(coords);
        } else {
          if (process.env.NODE_ENV !== "production") {
            toast.error("[KakaoMap] 주소 검색 실패:");
          }
        }
      });
    };

    if (window.kakao?.maps) {
      init();
    } else {
      const onLoaded = () => init();
      window.addEventListener("kakao:loaded", onLoaded, { once: true });
      cleanup = () => window.removeEventListener("kakao:loaded", onLoaded);
    }

    return () => cleanup();
  }, [address, level]);

  return <div ref={mapRef} className={className} aria-label="카카오 지도" />;
}
