"use client";

import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ArrowDown from "@/assets/svgs/arrow_down.svg";
import { MenuItem } from "@/lib/types/ui";

type DropdownProps<T> = {
  children?: ReactNode;
  items: ReadonlyArray<MenuItem<T>>;
  onSelect?: (value: T) => void;
};

export function Dropdown<T>({ children, items, onSelect }: DropdownProps<T>) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  const handleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div
      ref={ref}
      className="py-[8px] flex items-center justify-between px-[20px] md:py-[16px] rounded-[15px] text-2lg text-green-900 border border-green-900 relative w-[130px] gap-x-[7px]"
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
        <ul className="text-md rounded-[5px] border border-gray-300 text-gray-900 flex flex-col divide-y divide-gray-200 md:text-2lg absolute top-12 md:top-17 right-0 bg-white z-20 w-full">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  onSelect(item.value);
                  setIsOpen(false);
                }}
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
