import Image from "next/image";

// Icons
import AddIcon from "@/assets/svgs/add_icon.svg";
import example from "@/assets/svgs/example.svg";
import DeleteIcon from "@/assets/svgs/delete_icon.svg";
import { RefObject } from "react";

type IntroImagesPickerProps = {
  introImages: string[] | null;
  introImageRef: RefObject<HTMLInputElement>;
  handleIntroInputClick: () => void;
};

export function IntroImagesPicker({
  introImages,
  introImageRef,
  handleIntroInputClick,
}: IntroImagesPickerProps) {
  return (
    <section className="flex flex-col gap-y-[24px]">
      <h3 className="text-2xl text-black font-bold">소개 이미지</h3>

      <input type="file" ref={introImageRef} className="hidden" />
      <div className="flex flex-wrap gap-x-[24px] gap-y-[24px]">
        <button
          className="flex flex-col justify-center items-center gap-y-[30px] rounded-[12px] border border-gray-900 border-dotted  w-[180px] h-[180px] cursor-pointer px-[35px] py-[35px] bg-white"
          onClick={handleIntroInputClick}
          type="button"
          aria-label="소개 이미지 등록"
        >
          <Image
            src={AddIcon}
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
          />
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
              aria-label="소개 이미지 삭제"
            >
              <Image
                src={DeleteIcon}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
              />
            </button>
          </div>
        ))}
      </div>
      <span className="text-2lg text-gray-900">
        * 이미지는 최대 4개까지 등록 가능합니다.
      </span>
    </section>
  );
}
