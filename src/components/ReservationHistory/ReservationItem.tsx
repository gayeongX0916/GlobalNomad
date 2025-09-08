import Image from "next/image";

// Icons
import example from "@/assets/svgs/example.svg";

export function ReservationItem() {
  return (
    <article className="flex gap-x-[24px] rounded-[24px] shadow-2xs bg-white w-full max-w-[790px]">
      <Image
        src={example}
        alt="대표 이미지"
        width={204}
        height={204}
        className="w-[204px] h-[204px] rounded-l-[24px] object-cover"
      />

      <div className="flex flex-col py-[21px] pr-[23px] flex-1">
        <span className="text-lg font-bold pb-[8px]">예약 승인</span>

        <h3 className="text-xl font-bold text-nomadBlack pb-[12px]">
          열기구 페스티벌
        </h3>

        <p className="text-2lg text-nomadBlack pb-[16px]">
          <time dateTime="2023-02-14">2023. 2. 14</time>
          {" · "}
          <time dateTime="11:00">11:00</time>
          {" ~ "}
          <time dateTime="12:30">12:30</time>
          {" · "}
          <span>10명</span>
        </p>

        <div className="flex justify-between items-center">
          <p className="text-2xl text-black">
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
    </article>
  );
}
