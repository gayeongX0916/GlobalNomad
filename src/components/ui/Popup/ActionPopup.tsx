import { ModalProps } from "@/types/modalProps";
import { BasePopup } from "./BasePopup";

interface ActionPopupProps extends ModalProps {
  message: string;
  confirmText: string;
}

export function ActionPopup({
  message,
  confirmText,
  isOpen,
  onClose,
}: ActionPopupProps) {
  return (
    <BasePopup isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-y-[40px] items-center justify-center">
        <p className="text-lg text-black md:text-2lg pt-[60px]">
          {message}
        </p>
        <button
          onClick={onClose}
          className="flex justify-center items-center rounded-[8px] bg-nomadBlack text-white text-md py-[12px] px-[56px] cursor-pointer"
        >
          {confirmText}
        </button>
      </div>
    </BasePopup>
  );
}
