"use client";

import ChevronDown from "@/assets/chevron_down.svg";
import ChevronUp from "@/assets/chevron_up.svg";
import CheckIcon from "@/assets/check_icon.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "../Dropdown/Dropdown";

type SelectInputProps = {
  placeholder: string;
  items: MenuItem[];
};

export function SelectInput({ placeholder, items }: SelectInputProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleonClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleonClick);
    return () => document.removeEventListener("click", handleonClick);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  return (
    <>
      <div ref={ref} className="relative w-full">
        <input
          placeholder={placeholder}
          className="px-[16px] py-[15px] rounded-[4px] border border-gray-800 w-full"
          value={value}
          onChange={handleChange}
        />
        <button
          className="flex cursor-pointer absolute right-[12px] top-1/2 -translate-y-1/2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src={isOpen ? ChevronUp : ChevronDown}
            alt="더보기"
            width={24}
            height={24}
          />
        </button>
      </div>
      {isOpen && (
        <div className="w-full px-[8px] py-[8px] rounded-[6px] shadow-md flex flex-col gap-y-[2px] mt-[8px] bg-white border border-gray-100">
          {items.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-x-[8px] rounded-[6px] py-[8px] pl-[8px] cursor-pointer ${
                value === item.label ? "bg-nomadBlack" : "bg-white"
              }`}
              onClick={() => setValue(item.label)}
            >
              {value === item.label ? (
                <Image src={CheckIcon} alt="체크" width={20} height={20} />
              ) : (
                <div className="w-[20px] h-[20px]"></div>
              )}
              <span
                className={`text-lg ${
                  value === item.label ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
