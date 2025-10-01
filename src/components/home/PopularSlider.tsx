"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { PopularCard } from "./PopularCard";

// Icons
import ArrowLeft from "@/assets/svgs/slider_arrow_left.svg";
import ArrowRight from "@/assets/svgs/slider_arrow_right.svg";
import Image from "next/image";
import { useActivitiesList } from "@/lib/hooks/Activities/useActivitiesList";
import Link from "next/link";

export function PopularSlider() {
  const { data, isPending, error } = useActivitiesList({
    sort: "most_reviewed",
  });

  if (isPending) return <p>로딩 중…</p>;
  if (error || !data) return <p>에러가 발생했어요.</p>;

  return (
    <section className="w-full" aria-label="인기 체험 캐러셀">
      <div className="flex justify-between items-center mb-[32px]">
        <h3 className="text-3xl font-bold text-black">🔥 인기 체험</h3>

        <div className="flex items-center gap-x-[4px]">
          <button
            className="popular-prev h-[36px] w-[36px] bg-white/80 rounded-full border border-gray-300 flex justify-center items-center cursor-pointer"
            aria-label="이전 슬라이드"
          >
            <Image
              src={ArrowLeft}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
            />
          </button>
          <button
            className="popular-next h-[36px] w-[36px] bg-white/80 rounded-full border border-gray-300 flex justify-center items-center cursor-pointer"
            aria-label="다음 슬라이드"
          >
            <Image
              src={ArrowRight}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>

      <Swiper
        className="popular-swiper"
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        slidesPerView={3}
        spaceBetween={16}
        preventClicks
        preventClicksPropagation
        navigation={{
          enabled: true,
          prevEl: ".popular-prev",
          nextEl: ".popular-next",
        }}
        breakpoints={{
          // 0 ~ 1199px
          0: {
            allowTouchMove: true,
            simulateTouch: true,
            grabCursor: true,
          },
          // 1200px 이상
          1200: {
            allowTouchMove: false,
            simulateTouch: false,
            grabCursor: false,
          },
        }}
      >
        {data.activities.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/activities/${item.id}`}>
              <PopularCard
                rating={item.rating}
                reviewCount={item.reviewCount}
                title={item.title}
                price={item.price}
                imageUrl={item.bannerImageUrl}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
