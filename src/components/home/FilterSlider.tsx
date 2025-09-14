"use client";

// UI
import { CategoryButton } from "@/components/ui/Button/CategoryButton";
import { Swiper, SwiperSlide } from "swiper/react";

const categoryList = [
  { name: "문화 예술", onclick: () => console.log("카테고리") },
  { name: "식음료", onclick: () => console.log("카테고리") },
  { name: "스포츠", onclick: () => console.log("카테고리") },
  { name: "투어", onclick: () => console.log("카테고리") },
  { name: "관광", onclick: () => console.log("카테고리") },
  { name: "웰빙", onclick: () => console.log("카테고리") },
  { name: "아으", onclick: () => console.log("카테고리") },
  { name: "뭔가", onclick: () => console.log("카테고리") },
  { name: "왜안", onclick: () => console.log("카테고리") },
  { name: "되냐고", onclick: () => console.log("카테고리") },
  { name: "과연", onclick: () => console.log("카테고리") },
  { name: "에헤", onclick: () => console.log("카테고리") },
  { name: "1", onclick: () => console.log("카테고리") },
  { name: "2", onclick: () => console.log("카테고리") },
  { name: "에3헤", onclick: () => console.log("카테고리") },
  { name: "에4헤", onclick: () => console.log("카테고리") },
];

export function FilterSlider() {
  return (
    <section className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        grabCursor
        simulateTouch
        allowTouchMove
        freeMode
      >
        {categoryList.map((list) => (
          <SwiperSlide
            key={list.name}
            className="!w-[80px] md:!w-[120px] lg:!w-[130px]"
          >
            <CategoryButton onClick={list.onclick}>{list.name}</CategoryButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
