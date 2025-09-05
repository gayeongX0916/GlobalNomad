import { MenuItem } from "../Dropdown";
import { DateInput } from "../Input/DateInput";
import { SelectInput } from "../Input/SelectInput";
import { TextInput } from "../Input/TextInput";
import { TimeInput } from "../Input/TimeInput";
import PlusIcon from "@/assets/plus_icon.svg";
import MinusIcon from "@/assets/minus_icon.svg";
import Image from "next/image";
import AddIcon from "@/assets/add_icon.svg";
import { useRef, useState } from "react";
import example from "@/assets/example.svg";
import DeleteIcon from "@/assets/delete_icon.svg";

const items: MenuItem[] = [
  { label: "액티비티" },
  { label: "숙소" },
  { label: "교통" },
];

export function ExperienceForm() {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const introImageRef = useRef<HTMLInputElement>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(example);
  const [introImages, setIntroImages] = useState<File[]>([
    example,
    example,
    example,
    example,
  ]);

  const handleBannerInputClick = () => {
    bannerImageRef.current?.click();
  };

  const handleIntroInputClick = () => {
    introImageRef.current?.click();
  };

  return (
    <form className="flex flex-col gap-y-[24px] w-[800px]">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-black font-bold">내 체험 등록</h2>
        <button className="rounded-[4px] px-[16px] py-[8px] bg-nomadBlack text-white text-md">
          등록하기
        </button>
      </div>
      <TextInput placehoder="제목" />
      <SelectInput placeholder="카테고리" items={items} />
      <TextInput placehoder="설명" />
      <TextInput placehoder="가격" label="가격" />
      <TextInput placehoder="주소를 입력해주세요" label="주소" />

      <div className="flex flex-col gap-y-[24px]">
        <label className="text-2xl text-black font-bold">
          예약 가능한 시간대
        </label>
        <div className="flex gap-x-[20px] items-center">
          <DateInput placeholder="YY/MM/DD" value="" />
          <div className="flex gap-x-[12px] items-center">
            <TimeInput label="시작 시간" value="" />
            <span className="text-xl font-bold text-black relative top-[20px]">
              ~
            </span>
            <TimeInput label="종료 시간" value="" />
          </div>
          <button type="button" className="relative top-[20px] cursor-pointer">
            <Image src={PlusIcon} alt="추가" width={56} height={56} />
          </button>
        </div>
        <hr className="border-gray-300" />
      </div>

      <div className="flex flex-col gap-y-[24px]">
        <label className="text-2xl text-black font-bold">배너 이미지</label>
        <input type="file" ref={bannerImageRef} className="hidden" />
        <div className="flex gap-x-[24px]">
          <button
            className="flex flex-col justify-center items-center gap-y-[30px] rounded-[12px] border border-gray-900 border-dotted w-[180px] h-[180px] cursor-pointer px-[35px] py-[35px]"
            onClick={handleBannerInputClick}
            type="button"
          >
            <Image src={AddIcon} alt="등록" width={48} height={48} />
            <span className="text-2xl text-gray-900 whitespace-nowrap">
              이미지 등록
            </span>
          </button>
          {bannerImage && (
            <div className="relative">
              <Image
                src={example}
                alt="배너 이미지"
                width={180}
                height={180}
                className="w-[180px] h-[180px] object-cover rounded-[24px]"
              />
              <button
                className="absolute -top-3 -right-3 cursor-pointer"
                type="button"
              >
                <Image src={DeleteIcon} alt="삭제" width={32} height={32} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-[24px]">
        <label className="text-2xl text-black font-bold">소개 이미지</label>
        <input type="file" ref={introImageRef} className="hidden" />
        <div className="flex flex-wrap gap-x-[24px] gap-y-[24px]">
          <button
            className="flex flex-col justify-center items-center gap-y-[30px] rounded-[12px] border border-gray-900 border-dotted  w-[180px] h-[180px] cursor-pointer px-[35px] py-[35px]"
            onClick={handleIntroInputClick}
            type="button"
          >
            <Image src={AddIcon} alt="등록" width={48} height={48} />
            <span className="text-2xl text-gray-900 whitespace-nowrap">
              이미지 등록
            </span>
          </button>
          {introImages.map((image, idx) => (
            <div key={idx} className="relative">
              <Image
                src={example}
                alt="소개 이미지"
                width={180}
                height={180}
                className="w-[180px] h-[180px] object-cover rounded-[24px]"
              />
              <button
                className="absolute -top-3 -right-3 cursor-pointer"
                type="button"
              >
                <Image src={DeleteIcon} alt="삭제" width={32} height={32} />
              </button>
            </div>
          ))}
        </div>
        <span className="text-2lg text-gray-900">
          *이미지를 최소 4개 이상 제출해주세요.
        </span>
      </div>
    </form>
  );
}
