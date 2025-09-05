"use client";

import { useEffect, useRef, useState } from "react";
import { ScheduleModal } from "../Modal/ScheduleModal";
import { SchedulePicker } from "../Schedule/SchedulePicker";
import { NumberStepper } from "./NumberStepper";
import { CountPeopleModal } from "../Modal/CountPeopleModal";

const slots = [
  { date: "2025-09-01", startTime: "12:00", endTime: "13:00" },
  { date: "2025-10-01", startTime: "13:00", endTime: "14:00" },
  { date: "2025-10-05", startTime: "09:00", endTime: "10:00" },
  { date: "2025-10-05", startTime: "10:00", endTime: "11:00" },
  { date: "2025-10-05", startTime: "10:00", endTime: "11:00" },
  { date: "2025-10-05", startTime: "10:00", endTime: "11:00" },
  { date: "2025-10-05", startTime: "10:00", endTime: "11:00" },
  { date: "2025-10-05", startTime: "10:00", endTime: "11:00" },
  { date: "2025-10-05", startTime: "11:00", endTime: "12:00" },
  { date: "2025-10-05", startTime: "12:00", endTime: "13:00" },
  { date: "2025-10-10", startTime: "15:00", endTime: "16:00" },
];

export function FloatingBox() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isCountOpen, setIsCountOpen] = useState(false);

  return (
    <div className="relative border border-gray-300 rounded-[12px] px-[20px] py-[24px] md:w-[251px] lg:w-[384px]">
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
      <CountPeopleModal
        isOpen={isCountOpen}
        onClose={() => setIsCountOpen(false)}
      />
      <h2 className="text-3xl font-bold text-black pb-[16px]">
        ₩ 1,000 <span className="text-xl text-gray-900"> / 인</span>
      </h2>
      <div className="border-t border-b border-gray-300 py-[16px]">
        <h3 className="text-xl font-bold text-nomadBlack">날짜</h3>
        <div className="hidden lg:block">
          <SchedulePicker
            data={slots}
            onChange={(slot) => console.log("선택된 슬롯:", slot)}
          />
        </div>
        <button
          className="block lg:hidden mt-[5px] text-lg font-semibold cursor-pointer"
          onClick={() => setIsScheduleOpen(true)}
        >
          날짜 선택하기
        </button>
      </div>
      <div className="flex flex-col gap-y-[8px] pt-[16px]">
        <h3 className="text-2lg font-bold text-nomadBlack">참여 인원 수</h3>
        <NumberStepper />
      </div>
      <button className="rounded-[4px] px-[40px] py-[8px] bg-nomadBlack text-lg font-bold text-white mt-[24px] mb-[24px] w-full">
        예약하기
      </button>
      <div className="border-t border-gray-300 pt-[16px] flex justify-between">
        <h2 className="text-xl font-bold text-nomadBlack">총 합계</h2>
        <span className="text-xl font-bold text-nomadBlack">₩ 1,000</span>
      </div>
    </div>
  );
}
