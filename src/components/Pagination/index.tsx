import ArrowLeft from "@/assets/arrow_left.svg";
import ArrowRight from "@/assets/arrow_right.svg";
import ArrowLeftGreen from "@/assets/arrow_left_green.svg";
import ArrowRightGreen from "@/assets/arrow_right_green.svg";
import Image from "next/image";
import { useState } from "react";

export function Pagination() {
  // 선택됐을 때 prev next 버튼 border border-green-900
  // 숫자 선택됐을 때 bg-green-900 text-white

  return (
    <div className="flex gap-x-[10px]">
      <button className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer">
        <Image
          src={ArrowLeft}
          alt="이전"
          width={15}
          height={15}
          className="md:w-[21px] md:h-[21px]"
        />
      </button>
      <button className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] text-2lg text-green-900 border border-green-900 bg-white cursor-pointer">
        1
      </button>
      <button className="flex justify-center items-center rounded-[15px] w-[40px] h-[40px] md:w-[55px] md:h-[55px] border border-gray-300 cursor-pointer">
        <Image
          src={ArrowRight}
          alt="다음"
          width={15}
          height={15}
          className="md:w-[21px] md:h-[21px]"
        />
      </button>
    </div>
  );
}
