"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Icons
import MoreIcon from "@/assets/svgs/more_icon.svg";

type KebabMenuItem = {
  key: string;
  label: string;
  onClick: () => void;
};

type KebabMenuProps = {
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function KebabMenu({ className, onDelete, onEdit }: KebabMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const KebabMenuList: KebabMenuItem[] = [
    { key: "edit", label: "수정하기", onClick: onEdit },
    {
      key: "delete",
      label: "삭제하기",
      onClick: onDelete,
    },
  ];

  const handleIsOpen = useCallback((e?: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  }, []);

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
        onClick={(e) => handleIsOpen(e)}
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
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                  setIsOpen(false);
                }}
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
