"use client";

// UI
import { CategoryButton } from "@/components/ui/Button/CategoryButton";
import { ActivityCategory } from "@/lib/types/activities";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const categoryList: { name: ActivityCategory }[] = [
  { name: "문화 · 예술" },
  { name: "식음료" },
  { name: "스포츠" },
  { name: "투어" },
  { name: "관광" },
  { name: "웰빙" },
];

type FilterSliderProps = {
  onChangeCategory: (category: ActivityCategory | undefined) => void;
};

export function FilterSlider({ onChangeCategory }: FilterSliderProps) {
  const [selected, setSelected] = useState<ActivityCategory | undefined>(
    undefined
  );

  const handleClick = useCallback(
    (name: ActivityCategory) => {
      const newValue = selected === name ? undefined : name;
      setSelected(newValue);
      onChangeCategory(newValue);
    },
    [selected, onChangeCategory]
  );

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
            className="!w-[80px] md:!w-[120px] lg:!w-[130px] py-[4px]"
          >
            <CategoryButton
              active={selected === list.name}
              onClick={() => handleClick(list.name)}
            >
              {list.name}
            </CategoryButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
