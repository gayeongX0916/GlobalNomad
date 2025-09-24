"use client";

import { ChangeEvent, useRef, useState } from "react";

// UI
import { TimeSlotsEditor } from "./TimeSlotsEditor";
import { BannerImagePicker } from "./BannerImagePicker";
import { IntroImagesPicker } from "./IntroImagesPicker";
import { TextInput } from "@/components/ui/Input/TextInput";
import { SelectInput } from "@/components/ui/Input/SelectInput";

// Icons
import example from "@/assets/svgs/example.svg";
import { ActivityCategory } from "@/lib/types/activities";
import { MenuItem } from "@/lib/types/ui";

const items: MenuItem<ActivityCategory>[] = [
  { label: "문화 예술", value: "문화 예술" },
  { label: "식음료", value: "식음료" },
  { label: "스포츠", value: "스포츠" },
  { label: "투어", value: "투어" },
  { label: "관광광", value: "관광광" },
  { label: "웰빙", value: "웰빙" },
];

export function ExperienceForm() {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const introImageRef = useRef<HTMLInputElement>(null);

  const [bannerImage, setBannerImage] = useState<string | null>(example);
  const [introImages, setIntroImages] = useState<string[]>([
    example,
    example,
    example,
    example,
  ]);

  const handleBannerInputClick = () => bannerImageRef.current?.click();
  const handleIntroInputClick = () => introImageRef.current?.click();

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    // api 연결
  };
  const handleIntroChange = (e: ChangeEvent<HTMLInputElement>) => {
    // api 연결
  };

  const handleRemoveBanner = () => {
    setBannerImage(null);
  };

  const handleRemoveIntro = (index: number) => {
    const newImages = introImages.filter((_, idx) => idx !== index);
    setIntroImages(newImages);
  };

  return (
    <form
      aria-labelledby="experience-form-title"
      className="flex flex-col gap-y-[24px] max-w-[800px]"
    >
      <header className="flex justify-between items-center">
        <h2
          id="experience-form-title"
          className="text-3xl text-black font-bold"
        >
          내 체험 등록
        </h2>
        <button
          type="submit"
          className="rounded-[4px] px-[30px] py-[11px] bg-nomadBlack text-white text-md cursor-pointer font-bold"
        >
          등록하기
        </button>
      </header>

      <TextInput placeholder="제목" />
      <SelectInput placeholder="카테고리" items={items} />
      <TextInput placeholder="설명" />
      <TextInput placeholder="가격" label="가격" />
      <TextInput placeholder="주소를 입력해주세요" label="주소" />

      <TimeSlotsEditor />

      <BannerImagePicker
        bannerImage={bannerImage}
        bannerImageRef={bannerImageRef}
        handleBannerInputClick={handleBannerInputClick}
      />

      <IntroImagesPicker
        introImages={introImages}
        introImageRef={introImageRef}
        handleIntroInputClick={handleIntroInputClick}
      />
    </form>
  );
}
