import ChevronDown from "@/assets/svgs/chevron_down.svg";
import ChevronUp from "@/assets/svgs/chevron_up.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ActivityItem = {
  id: number;
  title: string;
};

type ExperienceDropdownProps = {
  items: ActivityItem[];
  onSelect?: (v: number) => void;
};

export function ExperienceDropdown({
  items,
  onSelect,
}: ExperienceDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  
  return (
    <div className="relative">
      <label className="absolute -top-3 left-3 bg-white px-1 text-md text-black z-3">
        체험명
      </label>

      <div ref={ref} className="relative bg-white">
        <button
          className="w-full outline-none text-black text-lg px-[16px] py-[12px] border border-gray-800 rounded-[4px] text-left cursor-pointer"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedTitle || "체험을 선택하세요"}
          <Image
            src={isOpen ? ChevronUp : ChevronDown}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          />
        </button>
      </div>
      {isOpen && (
        <ul className="text-lg rounded-[4px] border border-gray-800 text-black flex flex-col divide-y divide-gray-300 md:text-2lg absolute top-15 items-start bg-white z-20 w-full ">
          {items.map((item) => (
            <li key={item.id} className="w-full">
              <button
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  setSelectedTitle(item.title);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-[16px] py-[12px]  hover:bg-gray-200 w-full text-left"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
