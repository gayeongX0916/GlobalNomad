'use client'

import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";
import { useState } from "react";
import { DateSection } from "@/components/ReservationInfo/DateSection";
import { ListSection } from "@/components/ReservationInfo/ListSection";

interface ReservationInfoModalProps extends ModalProps {
  id: number;
}

export type TabItem = "request" | "confirmed" | "rejected";

export function ReservationInfoModal({
  id,
  isOpen,
  onClose,
}: ReservationInfoModalProps) {
  const tabItems = [
    {
      key: "request",
      label: "신청",
      count: 12,
      onClick: () => setActive("request"),
    },
    {
      key: "confirmed",
      label: "확정",
      count: 0,
      onClick: () => setActive("confirmed"),
    },
    {
      key: "rejected",
      label: "거절",
      count: 0,
      onClick: () => setActive("rejected"),
    },
  ];
  const [active, setActive] = useState<TabItem>("request");

  return (
    <BaseModal
      mode="action"
      isOpen={isOpen}
      onClose={onClose}
      title="예약 정보"
    >
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

        <DateSection />

        <ListSection mode={active} />
      </div>
    </BaseModal>
  );
}
