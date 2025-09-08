import Image from "next/image";

// Icons
import AddIcon from "@/assets/svgs/add_icon.svg";
import example from "@/assets/svgs/example.svg";
import DeleteIcon from "@/assets/svgs/delete_icon.svg";
import { RefObject } from "react";

type BannerImagePickerProps = {
  bannerImage: string | null;
  bannerImageRef: RefObject<HTMLInputElement>;
  handleBannerInputClick: () => void;
};

export function BannerImagePicker({
  bannerImage,
  bannerImageRef,
  handleBannerInputClick,
}: BannerImagePickerProps) {
  return (
    <fieldset className="flex flex-col gap-y-[24px]">
      <legend className="text-2xl text-black font-bold">배너 이미지</legend>

      <input type="file" ref={bannerImageRef} className="hidden" />
      <div className="flex gap-x-[24px]">
        <button
          className="flex flex-col justify-center items-center gap-y-[30px] rounded-[12px] border border-gray-900 border-dotted w-[180px] h-[180px] cursor-pointer px-[35px] py-[35px]"
          onClick={handleBannerInputClick}
          type="button"
          aria-label="배너 이미지 등록"
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
              aria-label="배너 이미지 삭제"
            >
              <Image src={DeleteIcon} alt="" aria-hidden="true" width={32} height={32} />
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
}
