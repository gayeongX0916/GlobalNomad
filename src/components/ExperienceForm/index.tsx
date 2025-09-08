"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

// UI
import { TextInput } from "../ui/Input/TextInput";
import { SelectInput } from "../ui/Input/SelectInput";
import { DateInput } from "../ui/Input/DateInput";
import { TimeInput } from "../ui/Input/TimeInput";
import { MenuItem } from "../ui/Dropdown";

// Icons
import PlusIcon from "@/assets/svgs/plus_icon.svg";
import MinusIcon from "@/assets/svgs/minus_icon.svg";
import AddIcon from "@/assets/svgs/add_icon.svg";
import DeleteIcon from "@/assets/svgs/delete_icon.svg";
import example from "@/assets/svgs/example.svg";
import { TimeSlotsEditor } from "./TimeSlotsEditor";
import { BannerImagePicker } from "./BannerImagePicker";
import { IntroImagesPicker } from "./IntroImagesPicker";

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
      className="flex flex-col gap-y-[24px] w-[800px]"
    >
      <header className="flex justify-between items-center">
        <h2
          id="experience-form-title"
          className="text-3xl text-black font-bold"
        >
          내 체험 등록
        </h2>
        <button type="submit" className="rounded-[4px] px-[16px] py-[8px] bg-nomadBlack text-white text-md">
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
