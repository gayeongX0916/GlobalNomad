"use client";

import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ModalProps } from "@/lib/types/modalProps";

// UI
import { SchedulePicker } from "@/components/activity/SchedulePicker";

// Icons
import CloseIcon from "@/assets/svgs/close_icon.svg";
import { NumberStepper } from "@/components/activity/NumberStepper";
import { useActivityAvailableSchedule } from "@/lib/hooks/Activities/useActivityAvailableSchedule";
import { formatKRW } from "@/lib/utils/formatKRW";
import { useState } from "react";

interface ExperienceReservationModalProps extends ModalProps {
  activityId: number;
  price: number;
}

export function ExperienceReservationModal({
  isOpen,
  onClose,
  activityId,
  price,
}: ExperienceReservationModalProps) {
  const now = new Date();
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0")
  );

  const { data, isPending, error } = useActivityAvailableSchedule({
    activityId,
    year,
    month,
  });
  const [headId, setHeadId] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <DialogPanel className="w-full h-full border bg-white border-gray-300 rounded-[12px] px-[20px] py-[24px] md:max-w-[450px] md:h-[500px] overflow-x-auto no-scrollbar">
          <header className="pb-[16px]">
            <h2 className="text-3xl font-bold text-black">
              <data value="1000">{formatKRW(price)}</data>
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

            {error ? (
              <div className="text-red-600">에러가 발생했어요.</div>
            ) : (
              <SchedulePicker
                data={data ?? []}
                isLoading={isPending}
                onChange={(id) => setHeadId(id)}
                onCalendarMonthChange={(y, m) => {
                  setYear(String(y));
                  setMonth(String(m).padStart(2, "0"));
                }}
              />
            )}
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
        </DialogPanel>
      </div>
    </Dialog>
  );
}
