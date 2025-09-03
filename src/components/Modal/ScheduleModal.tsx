import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";

interface ScheduleModalProps extends ModalProps {
  id: number;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  return (
    <BaseModal mode="action" isOpen={isOpen} onClose={onClose} title="날짜">
      <div>{/* 플로팅 박스에서 쓰임 -> 공통ㅇ 컴포넌트화시키기 */}</div>
      <button className="rounded-[4px] bg-nomadBlack text-white text-lg font-bold py-[8px] w-full">
        작성하기
      </button>
    </BaseModal>
  );
}
