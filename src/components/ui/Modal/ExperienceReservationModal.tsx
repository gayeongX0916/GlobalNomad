"use client";

import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalProps } from "@/lib/types/modalProps";

// UI
import { SchedulePicker } from "@/components/activity/SchedulePicker";

// Icons
import CloseIcon from "@/assets/svgs/close_icon.svg";
import { NumberStepper } from "@/components/activity/NumberStepper";
import { useActivityAvailableSchedule } from "@/lib/hooks/Activities/useActivityAvailableSchedule";
import { formatKRW } from "@/lib/utils/formatKRW";
import { useCallback, useEffect, useState } from "react";
import { GetActivityDetailResponse } from "@/lib/types/activities";
import { useCreateReservation } from "@/lib/hooks/Activities/useCreateReservation";
import { Spinner } from "../Spinner/Spinner";
import { ErrorView } from "../ErrorView/ErrorView";

interface ExperienceReservationModalProps extends ModalProps {
  activity: GetActivityDetailResponse;
}

export function ExperienceReservationModal({
  isOpen,
  onClose,
  activity,
}: ExperienceReservationModalProps) {
  const now = new Date();
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0")
  );
  const activityId = activity.id;

  const { data, isLoading, isError, refetch, isFetching } =
    useActivityAvailableSchedule({
      activityId,
      year,
      month,
    });
  const [headId, setHeadId] = useState(0);
  const [count, setCount] = useState(1);
  const { mutate: createReservation, isPending: isCreating } =
    useCreateReservation();

  const handleReservationClick = useCallback(() => {
    createReservation({ activityId, scheduleId: headId, headCount: count });
    onClose();
  }, [activityId, headId, count, createReservation, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCount(0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full h-full border bg-white border-gray-300 rounded-[12px] px-[20px] py-[24px] md:max-w-[450px] md:h-[500px] overflow-x-auto no-scrollbar">
          <header className="pb-[16px]">
            <DialogTitle className="text-3xl font-bold text-black">
              <data value="1000">{formatKRW(activity.price)}</data>
              <span className="text-xl text-gray-900"> / 인</span>
            </DialogTitle>
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

            {isLoading ? (
              <div className="flex justify-center py-10">
                <Spinner size="24px" />
              </div>
            ) : isError ? (
              <ErrorView
                message="스케줄을 불러오는 중 오류가 발생했어요."
                refetch={refetch}
                isFetching={isFetching}
              />
            ) : (
              <SchedulePicker
                data={data ?? []}
                onChange={setHeadId}
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
            <NumberStepper onChange={setCount} value={count} />
          </section>

          <div className="mt-[24px] mb-[24px]">
            <button
              type="button"
              className="rounded-[4px] px-[40px] py-[10px] bg-nomadBlack text-lg font-bold text-white w-full cursor-pointer"
              onClick={handleReservationClick}
            >
              {isCreating ? "예약 중..." : "예약하기"}
            </button>
          </div>

          <footer
            className="border-t border-gray-300 pt-[16px] flex justify-between"
            aria-labelledby="total-title"
          >
            <h2 id="total-title" className="text-xl font-bold text-nomadBlack">
              총 합계
            </h2>
            <span className="text-xl font-bold text-nomadBlack">
              {formatKRW(count * activity.price)}
            </span>
          </footer>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
