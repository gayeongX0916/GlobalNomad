import Image from "next/image";

// Icons
import example from "@/assets/svgs/example.svg";

export function ReservationItem() {
  return (
    <article className="flex gap-x-[24px] rounded-[24px] bg-white w-full shadow-lg shadow-black/5">
      <Image
        src={example}
        alt="대표 이미지"
        className="w-[128px] h-[128px] md:w-[156px] md:h-[156px] lg:w-[204px] lg:h-[204px] rounded-l-[24px] object-cover "
      />

      <div className="flex flex-col justify-center py-[12px] lg:py-[21px] flex-1 lg:gap-y-[8px] pr-[20px]">
        <span className="text-lg font-bold">예약 승인</span>

        <div className="flex flex-col md:gap-y-[10px] lg:gap-y-[15px]">
          <h3 className="text-lg md:text-2lg lg:text-xl font-bold text-nomadBlack">
            열기구 페스티벌
          </h3>

          <p className="text-md md:text-lg lg:text-2lg text-nomadBlack">
            <time dateTime="2023-02-14">2023. 2. 14</time>
            {" · "}
            <time dateTime="11:00">11:00</time>
            {" ~ "}
            <time dateTime="12:30">12:30</time>
            {" · "}
            <span>10명</span>
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg md:text-xl lg:text-2xl text-black">
              <data value="10000">₩10,000</data>
            </p>
            {/* 
          <div className="flex gap-x-[8px]">
            <button
              type="button"
              className="px-[12px] py-[8px] bg-nomadBlack rounded-[6px] w-[144px] text-white text-lg font-bold cursor-pointer"
            >
              후기 작성
            </button>
            <button
              type="button"
              className="px-[12px] py-[8px] bg-white rounded-[6px] w-[144px] text-nomadBlack border border-nomadBlack text-lg font-bold cursor-pointer"
            >
              예약 취소
            </button>
          </div>
          */}
          </div>
        </div>
      </div>
    </article>
  );
}
