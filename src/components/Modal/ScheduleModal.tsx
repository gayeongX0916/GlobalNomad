import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";

interface ScheduleModalProps extends ModalProps {
  id: number;
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

  // width 설정하기
  return (
    <BaseModal mode="action" isOpen={isOpen} onClose={onClose} title="날짜">
      <form onSubmit={handleOnSubmit}>
        <div>{/* 플로팅 박스에서 쓰임 -> 공통ㅇ 컴포넌트화시키기 */}</div>
        <button
          type="submit"
          onClick={handleOnClick}
          className="rounded-[4px] bg-nomadBlack text-white text-lg font-bold py-[8px] w-full"
        >
          작성하기
        </button>
      </form>
    </BaseModal>
  );
}
