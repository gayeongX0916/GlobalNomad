"use client";

import { SchedulePicker } from "../../../ReservationSchedule/SchedulePicker";
import { NumberStepper } from "./NumberStepper";
import CloseIcon from "@/assets/svgs/close_icon.svg";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { ModalProps } from "@/types/modalProps";

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

export function ExperienceReservationModal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

        <div className="w-full h-full border bg-white border-gray-300 rounded-[12px] px-[20px] py-[24px] md:max-w-[450px] md:h-[500px] overflow-x-auto no-scrollbar">

          <header className="pb-[16px]">
            <h2 className="text-3xl font-bold text-black">
              <data value="1000">₩ 1,000</data>
              <span className="text-xl text-gray-900"> / 인</span>
            </h2>
          </header>

          <section
            className="border-t border-b border-gray-300 py-[16px] flex flex-col gap-y-[10px]"
            aria-labelledby="date-section-title"
          >
            <div className="flex items-center justify-between">
              <h3
                id="date-section-title"
                className="text-xl font-bold text-nomadBlack"
              >
                날짜
              </h3>
              <button
                aria-label="닫기"
                onClick={onClose}
                className="cursor-pointer"
              >
                <Image
                  src={CloseIcon}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                />
              </button>
            </div>

            <SchedulePicker
              data={slots}
              onChange={(slot) => console.log("선택된 슬롯:", slot)}
            />
          </section>

          <section
            className="flex flex-col gap-y-[8px] pt-[16px]"
            aria-labelledby="people-section-title"
          >
            <h3
              id="people-section-title"
              className="text-2lg font-bold text-nomadBlack"
            >
              참여 인원 수
            </h3>
            <NumberStepper />
          </section>

          <div className="mt-[24px] mb-[24px]">
            <button
              type="button"
              className="rounded-[4px] px-[40px] py-[10px] bg-nomadBlack text-lg font-bold text-white w-full cursor-pointer"
            >
              예약하기
            </button>
          </div>

          <footer
            className="border-t border-gray-300 pt-[16px] flex justify-between"
            aria-labelledby="total-title"
          >
            <h2 id="total-title" className="text-xl font-bold text-nomadBlack">
              총 합계
            </h2>
            <span className="text-xl font-bold text-nomadBlack">₩ 1,000</span>
          </footer>
        </div>
      </div>
    </Dialog>
  );
}
