import Image from "next/image";
import { useRef } from "react";

// Icons
import AddIcon from "@/assets/svgs/add_icon.svg";
import DeleteIcon from "@/assets/svgs/delete_icon.svg";
import { useUploadActivityImage } from "@/lib/hooks/Activities/useUploadActivityImage";

type BannerImagePickerProps = {
  bannerImage: string | null;
  onChange: (file: string) => void;
};

export function BannerImagePicker({
  bannerImage,
  onChange,
}: BannerImagePickerProps) {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const handleBannerInputClick = () => bannerImageRef.current?.click();
  const { mutate: UploadActivityImage, isPending } = useUploadActivityImage();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    UploadActivityImage(file, {
      onSuccess: (url) => {
        onChange(url.activityImageUrl);
      },
    });

    e.target.value = "";
  };

  const handleRemoveBanner = () => {
    onChange("");
  };

  return (
    <section className="flex flex-col gap-y-[24px]">
      <h3 className="text-2xl text-black font-bold">배너 이미지</h3>

      <input
        type="file"
        ref={bannerImageRef}
        className="hidden"
        onChange={handleBannerChange}
        disabled={isPending}
      />
      <div className="flex gap-x-[24px]">
        <button
          className="flex flex-col justify-center items-center gap-y-[30px] rounded-[12px] border border-gray-900 border-dotted w-[180px] h-[180px] cursor-pointer px-[35px] py-[35px] bg-white"
          onClick={handleBannerInputClick}
          type="button"
          aria-label="배너 이미지 등록"
          disabled={isPending}
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
              src={bannerImage}
              alt="배너 이미지"
              width={180}
              height={180}
              className="w-[180px] h-[180px] object-cover rounded-[24px]"
            />
            <button
              className="absolute -top-3 -right-3 cursor-pointer"
              type="button"
              aria-label="배너 이미지 삭제"
              onClick={handleRemoveBanner}
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
        )}
      </div>
    </section>
  );
}
