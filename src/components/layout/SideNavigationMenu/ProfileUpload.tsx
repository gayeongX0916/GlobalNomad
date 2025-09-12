"use client";

import Image from "next/image";

// Icons
import PenIcon from "@/assets/svgs/pen_icon.svg";
import example from "@/assets/svgs/example.svg";
import { ChangeEvent, useRef, useState } from "react";

export function ProfileUpload() {
  const profileRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(example);
  // <string|null>

  const handleProfileClick = () => {
    profileRef.current?.click();
  };

  const handleProfileChage = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="relative w-[160px] h-[160px] rounded-full object-cover">
      <Image
        src={example}
        alt="사용자 프로필"
        width={160}
        height={160}
        className="w-[160px] h-[160px] rounded-full object-cover"
      />
      <input
        ref={profileRef}
        type="file"
        className="hidden"
        // value={profileImage}
        onChange={handleProfileChage}
      />
      <button
        className="absolute bottom-0 right-0 rounded-full bg-green-900 px-[10px] py-[10px] flex justify-center items-center cursor-pointer"
        aria-label="프로필 사진 편집"
        onClick={handleProfileClick}
      >
        <Image src={PenIcon} alt="" aria-hidden="true" width={24} height={24} />
      </button>
    </div>
  );
}
