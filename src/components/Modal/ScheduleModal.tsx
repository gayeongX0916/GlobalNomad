import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";
import { SchedulePicker } from "../Schedule/SchedulePicker";

interface ScheduleModalProps extends ModalProps {
  id?: number;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOnClick();
  };

  const handleOnClick = () => {
    // API 호출
    onClose();
  };

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

  // width 설정하기
  return (
    <BaseModal mode="action" isOpen={isOpen} onClose={onClose} title="날짜">
      <form onSubmit={handleOnSubmit}>
        <div className="mt-[20px]">
          <SchedulePicker
            data={slots}
            onChange={(slot) => console.log("선택된 슬롯:", slot)}
          />
        </div>
        <button
          type="submit"
          onClick={handleOnClick}
          className="rounded-[4px] bg-nomadBlack text-white text-lg font-bold py-[15px] w-full mt-[30px] cursor-pointer"
        >
          예약하기
        </button>
      </form>
    </BaseModal>
  );
}
