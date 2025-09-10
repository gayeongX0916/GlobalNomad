"use client";

import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ArrowDown from "@/assets/svgs/arrow_down.svg";

export type MenuItem = { label: string };

type DropdownProps = {
  children?: ReactNode;
  items?: MenuItem[];
  onSelect?: (label: string) => void;
};

export function Dropdown({ children, items, onSelect }: DropdownProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleonClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleonClick);
    return () => document.removeEventListener("click", handleonClick);
  });

  const handleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div
      ref={ref}
      className="py-[8px] flex items-center justify-between px-[20px] md:py-[16px] rounded-[15px] text-2lg text-green-900 border border-green-900 relative md:min-w-[130px] w-full gap-x-[7px]"
    >
      {children}
      <button
        className="cursor-pointer"
        onClick={handleIsOpen}
        aria-label="메뉴 펼치기"
      >
        <Image
          src={ArrowDown}
          alt=""
          aria-hidden="true"
          width={22}
          height={22}
        />
      </button>

      {isOpen && (
        <ul
          className="text-md rounded-[5px] border border-gray-300 text-gray-900 flex flex-col divide-y divide-gray-200 md:text-2lg absolute top-12 md:top-17 right-0 bg-white z-20 w-full"
          aria-label=""
        >
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => onSelect(item.label)}
                className="cursor-pointer px-[12px] py-[18px]  hover:bg-gray-200 w-full"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
