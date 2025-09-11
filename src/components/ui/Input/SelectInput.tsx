"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// UI
import { MenuItem } from "../Dropdown";

// Icons
import ChevronDown from "@/assets/svgs/chevron_down.svg";
import ChevronUp from "@/assets/svgs/chevron_up.svg";
import CheckIcon from "@/assets/svgs/check_icon.svg";

type SelectInputProps = {
  placeholder: string;
  items: MenuItem[];
};

export function SelectInput({ placeholder, items }: SelectInputProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setIsOpen(v.length > 0);
  };

  return (
    <div ref={ref} className="relative w-full">
      <input
        placeholder={placeholder}
        className="px-[16px] py-[15px] rounded-[4px] border border-gray-800 w-full bg-white"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setIsOpen(true);
        }}
        aria-label={placeholder}
      />
      <button
        type="button"
        className="flex cursor-pointer absolute right-[12px] top-1/2 -translate-y-1/2"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "목록 닫기" : "목록 열기"}
      >
        <Image
          src={isOpen ? ChevronUp : ChevronDown}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full mt-[8px] w-full px-[8px] py-[8px] rounded-[6px] shadow-md flex flex-col gap-y-[2px] bg-white border border-gray-100 z-20">
          {items.map((item) => {
            const selected = value === item.label;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-x-[8px] rounded-[6px] py-[8px] pl-[8px] cursor-pointer ${
                  selected ? "bg-nomadBlack" : "bg-white"
                }`}
                onClick={() => {
                  setValue(item.label);
                  setIsOpen(false);
                }}
              >
                {selected ? (
                  <Image src={CheckIcon} alt="체크" width={20} height={20} />
                ) : (
                  <div className="w-[20px] h-[20px]" />
                )}
                <span
                  className={`text-lg ${
                    selected ? "text-white" : "text-black"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
