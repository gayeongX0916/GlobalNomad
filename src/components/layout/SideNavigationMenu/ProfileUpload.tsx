"use client";

import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";

// Icons
import PenIcon from "@/assets/svgs/pen_icon.svg";
import exampleIcon from "@/assets/svgs/example_icon.svg";

// UI
import { useCreateProfileImage } from "@/lib/hooks/Users/useCreateProfileImage";
import { usePathname } from "next/navigation";

type ProfileUploadProps = {
  profileImageUrl: string | null;
  onChange?: (url: string | null) => void;
};

export function ProfileUpload({
  profileImageUrl,
  onChange,
}: ProfileUploadProps) {
  const { mutateAsync: CreateProfile, isPending } = useCreateProfileImage();
  const profileRef = useRef<HTMLInputElement>(null);

  const handleProfileClick = () => {
    if (isPending) return;
    profileRef.current?.click();
  };

  const handleProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await CreateProfile(file);
      onChange?.(url.profileImageUrl);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteClick = () => {
    onChange(null);
  };

  const pathname = usePathname();
  const isMyPage = pathname === "/my-page";

  return (
    <div className="relative w-[160px] h-[160px] rounded-full object-cover">
      <Image
        src={profileImageUrl ? profileImageUrl : exampleIcon}
        alt="사용자 프로필"
        width={160}
        height={160}
        className="w-[160px] h-[160px] rounded-full object-cover"
      />
      <input
        ref={profileRef}
        type="file"
        className="hidden"
        onChange={handleProfileChange}
        disabled={isPending}
      />
      {isMyPage && (
        <button
          className="absolute bottom-0 right-0 rounded-full bg-green-900 px-[10px] py-[10px] flex justify-center items-center cursor-pointer"
          aria-label="프로필 사진 편집"
          onClick={handleProfileClick}
        >
          <Image
            src={PenIcon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
        </button>
      )}
      {profileImageUrl && (
        <button
          type="button"
          className="absolute top-0 right-0 rounded-full bg-black/70 text-white text-xs px-2 py-1 cursor-pointer disabled:opacity-60"
          onClick={handleDeleteClick}
          disabled={isPending}
          aria-label="프로필 이미지 삭제"
        >
          삭제
        </button>
      )}
    </div>
  );
}
