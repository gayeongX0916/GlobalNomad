"use client";

import Image from "next/image";

// UI
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useActivitiesList } from "@/lib/hooks/Activities/useActivitiesList";
import { toast } from "react-toastify";

export function HeroSlider() {
  const { data, isLoading, isError } = useActivitiesList();
  const activities = data?.activities ?? [];

  if (activities.length === 0 || isLoading) {
    return <div className="w-full aspect-[5/2] lg:aspect-[7/2]" />;
  }

  if (isError || !data) {
    toast.error("에러가 발생했어요");
  }

  return (
    <div className="w-full" aria-label="메인 캐러셀">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        pagination
        loop
        spaceBetween={16}
        slidesPerView={1}
      >
        {activities.map(({ bannerImageUrl, id, title }, idx) => (
          <SwiperSlide key={id}>
            <article>
              <div className="relative aspect-[5/2] lg:aspect-[7/2] w-full overflow-hidden">
                <Image
                  src={bannerImageUrl}
                  alt=""
                  fill
                  className="object-cover blur-2xl scale-110 brightness-75"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={bannerImageUrl}
                    alt="체험 소개 사진"
                    width={900}
                    height={600}
                    className="object-contain shadow-lg"
                    priority={idx === 0}
                  />
                </div>

                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="absolute inset-x-[24px] bottom-[40px]">
                <h2
                  className="
                    text-white text-[35px] font-bold
                    break-keep hyphens-none
                  "
                >
                  {title}
                </h2>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
