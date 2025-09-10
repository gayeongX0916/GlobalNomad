"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { PopularCard } from "./PopularCard";

// pngs
import JejuImg from "@/assets/pngs/jeju.png";
import SeoulImg from "@/assets/pngs/seoul.png";
import BusanImg from "@/assets/pngs/busan.png";
import GyeongjuImg from "@/assets/pngs/gyeongju.png";
import GangwonImg from "@/assets/pngs/gangwon.png";

// Icons
import ArrowLeftNone from "@/assets/svgs/slider_arrow_left_none.svg";
import ArrowLeft from "@/assets/svgs/slider_arrow_left.svg";
import ArrowRightNone from "@/assets/svgs/slider_arrow_right_none.svg";
import ArrowRight from "@/assets/svgs/slider_arrow_right.svg";
import Image from "next/image";

export const popularMockData = [
  {
    rating: "4.9",
    reviewCount: "120",
    title: "제주 감귤 농장에서 즐기는 감귤 따기 체험",
    price: "25,000",
    imageUrl: JejuImg,
  },
  {
    rating: "4.8",
    reviewCount: "85",
    title: "서울 한강 요트 선셋 투어",
    price: "45,000",
    imageUrl: SeoulImg,
  },
  {
    rating: "4.7",
    reviewCount: "200",
    title: "부산 해운대 바다 카약",
    price: "30,000",
    imageUrl: BusanImg,
  },
  {
    rating: "5.0",
    reviewCount: "60",
    title: "경주 천년 고도 도자기 만들기",
    price: "20,000",
    imageUrl: GyeongjuImg,
  },
  {
    rating: "4.6",
    reviewCount: "150",
    title: "강원 설악산 케이블카 & 하이킹",
    price: "35,000",
    imageUrl: GangwonImg,
  },
];

export function PopularSlide() {
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
        {popularMockData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <PopularCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
