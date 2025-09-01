"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowDown from "@/assets/arrow_down.svg";

export type MenuItem = { label: string };

type DropdownProps = {
  children: ReactNode;
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

  return (
    <>
      <div
        ref={ref}
        className="flex items-center w-full justify-between px-[20px] py-[16px] rounded-[15px] text-2lg text-green-900 border border-green-900 relative"
      >
        {children}
        <button
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image src={ArrowDown} alt="더보기" width={22} height={22} />
        </button>
      </div>
      {isOpen && (
        <div className="text-md w-full rounded-[5px] border border-gray-300 text-gray-900 flex flex-col divide-y divide-gray-200 md:text-2lg absolute mt-[8px] bg-white z-20">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              className="cursor-pointer px-[12px] py-[18px]  hover:bg-gray-200"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
