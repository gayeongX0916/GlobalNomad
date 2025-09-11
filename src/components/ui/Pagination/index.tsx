'use client'

import Image from "next/image";
import { useState } from "react";

// Icons
import ArrowLeft from "@/assets/svgs/arrow_left.svg";
import ArrowRight from "@/assets/svgs/arrow_right.svg";
import ArrowLeftGreen from "@/assets/svgs/arrow_left_green.svg";
import ArrowRightGreen from "@/assets/svgs/arrow_right_green.svg";

type PaginationProps = {
  totalPages?: number;
  initalPage?: number;
  onChange?: (page: number) => void;
};

export function Pagination({
  totalPages,
  initalPage,
  onChange,
}: PaginationProps) {
  // 선택됐을 때 prev next 버튼 border border-green-900
  // 숫자 선택됐을 때 bg-green-900 text-white
  const [page, setPage] = useState(initalPage);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav aria-label="페이지네이션">
      <div className="flex gap-x-[10px]">
        <button
          className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer"
          aria-label="이전 페이지"
        >
          <Image
            src={canPrev ? ArrowLeftGreen : ArrowLeft}
            alt=""
            aria-hidden="true"
            width={15}
            height={15}
            className="md:w-[21px] md:h-[21px]"
          />
        </button>

        <button className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] text-2lg text-green-900 border border-green-900 bg-white cursor-pointer">
          {page}
        </button>

        <button
          className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer"
          aria-label="다음 페이지"
        >
          <Image
            src={canNext ? ArrowRightGreen : ArrowRight}
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
