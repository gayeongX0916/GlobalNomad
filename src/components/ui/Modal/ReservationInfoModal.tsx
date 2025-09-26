"use client";

import { ModalProps } from "@/lib/types/modalProps";
import { useEffect, useMemo, useState } from "react";
import { DateSection } from "@/components/reservation-history/DateSection";
import { ListSection } from "@/components/reservation-history/ListSection";
import { Popover, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
} from "@floating-ui/react";

// Icons
import CloseIcon from "@/assets/svgs/close_icon.svg";
import { useMyActivitiesSchedule } from "@/lib/hooks/MyActivities/useMyActivitiesScheule";
import { useMyActivitiesReservations } from "@/lib/hooks/MyActivities/useMyActivitiesReservation";

interface ReservationInfoModalProps extends ModalProps {
  activityId: number;
  date: string;
  referenceEl: HTMLElement | null;
}

export type TabItem = "pending" | "confirmed" | "declined";

export function ReservationInfoModal({
  activityId,
  date,
  isOpen,
  onClose,
  referenceEl,
}: ReservationInfoModalProps) {
  const { data: schedulesRaw } = useMyActivitiesSchedule(
    { activityId, date },
    { enabled: !!activityId && !!date }
  );
  const schedules = useMemo(() => schedulesRaw ?? [], [schedulesRaw]);

  const totals = useMemo(() => {
    return schedules.reduce(
      (acc, row) => {
        acc.pending += row.count?.pending ?? 0;
        acc.confirmed += row.count?.confirmed ?? 0;
        acc.declined += row.count?.declined ?? 0;
        return acc;
      },
      { pending: 0, confirmed: 0, declined: 0 }
    );
  }, [schedules]);

  const tabItems = [
    {
      key: "pending",
      label: "신청",
      count: totals.pending,
      onClick: () => setActive("pending"),
    },
    {
      key: "confirmed",
      label: "확정",
      count: totals.confirmed,
      onClick: () => setActive("confirmed"),
    },
    {
      key: "declined",
      label: "거절",
      count: totals.declined,
      onClick: () => setActive("declined"),
    },
  ];
  const [active, setActive] = useState<TabItem>("pending");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedScheduleId == null && schedules.length > 0) {
      setSelectedScheduleId(schedules[0].scheduleId);
    }
  }, [schedules, selectedScheduleId]);

  const { data: MyActivitiesReservation } = useMyActivitiesReservations(
    {
      activityId,
      scheduleld: selectedScheduleId,
      status: active,
    },
    {
      enabled: !!selectedScheduleId,
    }
  );

  const { x, y, refs, strategy } = useFloating({
    placement: "right-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 12 }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(availableHeight, 480)}px`,
            overflowY: "auto",
          });
        },
      }),
    ],
  });

  useEffect(() => {
    if (referenceEl) refs.setReference(referenceEl);
  }, [referenceEl, refs]);

  if (!isOpen || !referenceEl) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={refs.setFloating}
        style={
          isMobile
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }
            : {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }
        }
        className={
          isMobile
            ? "z-50 overflow-y-auto"
            : "z-50 min-w-[370px] max-w-[430px] w-full rounded-[10px]"
        }
      >
        <Popover className="h-full">
          <PopoverPanel
            static
            className="md:min-w-[370px] md:max-w-[430px] w-full h-full border border-gray-200 z-50 bg-white px-[20px] py-[24px] rounded-[10px]"
          >
            <header className="flex items-center justify-between w-full">
              <span className="font-bold text-black text-2xl">예약 정보</span>
              <button
                onClick={onClose}
                className="cursor-pointer"
                aria-label="닫기"
              >
                <Image
                  src={CloseIcon}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                />
              </button>
            </header>

            <div className="flex flex-col gap-y-[24px]">
              <nav className="border-b border-gray-300 flex gap-x-[12px]">
                {tabItems.map(({ key, label, count, onClick }) => (
                  <button
                    key={key}
                    onClick={onClick}
                    type="button"
                    className={`${
                      active === key
                        ? "text-green-900 font-semibold"
                        : "text-gray-900"
                    } text-xl cursor-pointer px-[6px] py-[8px] relative`}
                  >
                    {label}
                    <span className="pl-[4px]">{count}</span>
                    {active === key && (
                      <span className="absolute left-0 bottom-0 w-full h-1 bg-green-900 rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>

              <DateSection
                date={date}
                scheduleData={schedulesRaw}
                value={selectedScheduleId}
                onChange={setSelectedScheduleId}
              />

              <ListSection
                mode={active}
                scheduleData={MyActivitiesReservation}
                date={date}
                scheduleId={selectedScheduleId}
              />
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </>
  );
}
