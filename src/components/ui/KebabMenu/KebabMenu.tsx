"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Icons
import MoreIcon from "@/assets/svgs/more_icon.svg";

type KebabMenu = {
  key: string;
  label: string;
  onClick: () => void;
};

const KebabMenuList: KebabMenu[] = [
  { key: "edit", label: "수정하기", onClick: () => console.log("수정하기") },
  { key: "delete", label: "삭제하기", onClick: () => console.log("삭제하기") },
];

export function KebabMenu({ className }: { className?: string }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  return (
    <div className="inline-flex relative" ref={ref}>
      <button
        onClick={handleIsOpen}
        aria-label="더보기"
        className="cursor-pointer"
      >
        <Image
          src={MoreIcon}
          alt=""
          aria-hidden="true"
          className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
        />
      </button>
      {isOpen && (
        <ul
          className={`text-md rounded-[5px] border border-gray-300 text-gray-900 flex flex-col divide-y divide-gray-200 md:text-2lg absolute right-0 bg-white z-20  ${
            className ?? ""
          }`}
        >
          {KebabMenuList.map(({ key, label, onClick }) => (
            <li key={key}>
              <button
                type="button"
                onClick={onClick}
                className="cursor-pointer px-[12px] py-[13px] w-[160px] hover:bg-gray-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
