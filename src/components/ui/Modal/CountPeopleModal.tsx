import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";
import { NumberStepper } from "@/components/FloatingBox/NumberStepper";

interface CountPeopleModalProps extends ModalProps {
  id?: number;
}

export function CountPeopleModal({
  id,
  isOpen,
  onClose,
}: CountPeopleModalProps) {
  return (
    <BaseModal mode="action" isOpen={isOpen} onClose={onClose} title="날짜">
      <div className="flex flex-col gap-y-[24px]">
        <span className="text-xl text-gray-900">
          예약할 인원을 선택해주세요.
        </span>
        <NumberStepper />
      </div>
    </BaseModal>
  );
}
