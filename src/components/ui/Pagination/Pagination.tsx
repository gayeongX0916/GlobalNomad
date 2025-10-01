"use client";

import Image from "next/image";

// Icons
import ArrowLeft from "@/assets/svgs/arrow_left.svg";
import ArrowRight from "@/assets/svgs/arrow_right.svg";
import ArrowLeftGreen from "@/assets/svgs/arrow_left_green.svg";
import ArrowRightGreen from "@/assets/svgs/arrow_right_green.svg";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const maxVisible = 5;
  const currenBlock = Math.floor((currentPage - 1) / maxVisible);
  const startPage = currenBlock * maxVisible + 1;
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  const visiblePages = [];

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const gotoPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const gotoNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="페이지네이션">
      <div className="flex gap-x-[10px]">
        <button
          className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer"
          aria-label="이전 페이지"
          onClick={gotoPrev}
          disabled={currentPage === 1}
        >
          <Image
            src={currentPage === 1 ? ArrowLeft : ArrowLeftGreen}
            alt=""
            aria-hidden="true"
            width={15}
            height={15}
            className="md:w-[21px] md:h-[21px]"
          />
        </button>

        {visiblePages.map((number) => (
          <button
            key={number}
            className={`flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] text-2lg cursor-pointer
    ${
      number === currentPage
        ? "bg-green-900 text-white border border-green-900"
        : "text-green-900 border border-green-900 bg-white"
    }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer"
          aria-label="다음 페이지"
          onClick={gotoNext}
          disabled={currentPage === totalPages}
        >
          <Image
            src={currentPage === totalPages ? ArrowRight : ArrowRightGreen}
            alt=""
            aria-hidden="true"
            width={15}
            height={15}
            className="md:w-[21px] md:h-[21px]"
          />
        </button>
      </div>
    </nav>
  );
}
