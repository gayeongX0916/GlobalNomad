"use client";

import { ChangeEvent, useRef, useState } from "react";

// UI
import { TimeSlotsEditor } from "./TimeSlotsEditor";
import { BannerImagePicker } from "./BannerImagePicker";
import { IntroImagesPicker } from "./IntroImagesPicker";
import { MenuItem } from "@/components/ui/Dropdown/Dropdown";
import { TextInput } from "@/components/ui/Input/TextInput";
import { SelectInput } from "@/components/ui/Input/SelectInput";

// Icons
import example from "@/assets/svgs/example.svg";

const items: MenuItem[] = [
  { label: "액티비티" },
  { label: "숙소" },
  { label: "교통" },
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
