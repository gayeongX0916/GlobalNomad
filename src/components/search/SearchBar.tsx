"use client";

import Image from "next/image";

// Icons
import SearchBarIcon from "@/assets/svgs/search_bar_icon.svg";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  value?: string;
  onChange?: (v: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?query=${encodeURIComponent(value)}&page=1`);
  };

  return (
    <form
      className="flex flex-col gap-y-[32px] w-full px-[24px] py-[32px] bg-white rounded-[16px]"
      onSubmit={handleSubmit}
    >
      <label className="text-lg md:text-xl font-bold text-nomadBlack">
        무엇을 체험하고 싶으신가요?
      </label>

      <div className="flex gap-x-[12px]">
        <div className="relative grow">
          <input
            placeholder="원하는 체험을 입력해 주세요!"
            className="rounded-[4px] py-[15px] pl-[55px] pr-[15px] border border-gray-800 w-full md:pl-[60px]"
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <Image
            src={SearchBarIcon}
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            className="absolute left-[12px] top-1/2 -translate-y-1/2 md:w-[48px] md:h-[48px]"
          />
        </div>

        <button
          type="submit"
          className="flex-shrink-0 rounded-[4px] px-[40px] py-[8px] bg-nomadBlack text-white text-lg font-bold cursor-pointer"
        >
          검색하기
        </button>
      </div>
    </form>
  );
}
