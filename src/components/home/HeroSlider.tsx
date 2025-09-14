"use client";

import Image from "next/image";

// UI
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Pngs
import SeoulPic from "@/assets/pngs/seoul.png";
import JeonJuPic from "@/assets/pngs/jeonju.png";
import BusanPic from "@/assets/pngs/busan.png";
import JejuPic from "@/assets/pngs/jeju.png";
import GangneungPic from "@/assets/pngs/gangneung.png";
import GyeongJuPic from "@/assets/pngs/gyeongju.png";
import JeonNamPic from "@/assets/pngs/jeonnam.png";
import GangwonPic from "@/assets/pngs/gangwon.png";
import GyeongNamPic from "@/assets/pngs/gyeongnam.png";
import JeonBukPic from "@/assets/pngs/jeonbuk.png";

const imgList = [
  { src: SeoulPic, des: "서울 도심 속에서 즐기는 특별한 한강 요트 투어" },
  { src: JeonJuPic, des: "고즈넉한 한옥에서 전통 차를 음미하는 다도 체험" },
  { src: BusanPic, des: "푸른 해운대 바다 위에서 즐기는 짜릿한 카약 체험" },
  { src: JejuPic, des: "상큼한 감귤을 직접 따고 맛보는 제주만의 특별한 체험" },
  { src: GangwonPic, des: "설악산의 웅장한 절경을 한눈에 담는 케이블카 체험" },
  { src: GangneungPic, des: "동해 파도를 가르며 배우는 스릴 넘치는 서핑 체험" },
  {
    src: GyeongJuPic,
    des: "천년의 역사 도시 경주에서 직접 만드는 도자기와 공예 체험",
  },
  {
    src: JeonNamPic,
    des: "별빛 가득한 남해 바다에서 즐기는 손맛 가득한 야간 낚시 체험",
  },
  {
    src: GyeongNamPic,
    des: "에메랄드빛 남해 바다 위를 나는 짜릿한 해상 케이블카 체험",
  },
  {
    src: JeonBukPic,
    des: "여름밤 숲속에서 반짝이는 반딧불이를 만나는 특별한 경험",
  },
];

export function HeroSlider() {
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
        {imgList.map(({ src, des }, idx) => (
          <SwiperSlide key={idx}>
            <article>
              <div className="relative aspect-[7/2] w-full">
                <Image
                  src={src}
                  alt="체험 예시 사진"
                  fill
                  className="object-cover object-[center_60%]"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="absolute inset-x-[24px] bottom-[40px]">
                <h2
                  className="
                    text-white text-[35px] font-bold
                    break-keep hyphens-none
                  "
                >
                  {des}
                </h2>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
