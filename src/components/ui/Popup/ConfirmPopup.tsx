import { ModalProps } from "@/types/modalProps";
import { BasePopup } from "./BasePopup";
import Image from "next/image";

// Icons
import CheckIcon from "@/assets/svgs/check_icon.svg";

interface ConfirmPopupProps extends ModalProps {
  message: string;
  cancelText: string;
  confirmText: string;
}

export function ConfirmPopup({
  message,
  cancelText,
  confirmText,
  isOpen,
  onClose,
}: ConfirmPopupProps) {
  return (
    <BasePopup isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-y-[16px]">
        
        <div
          className="w-[24px] h-[24px] rounded-full bg-nomadBlack flex justify-center items-center"
          aria-hidden="true"
        >
          <Image src={CheckIcon} alt="" width={20} height={20} />
        </div>

        <p className="text-lg text-black">{message}</p>
    

      <div className="flex items-center gap-x-[8px]">
        <button className="rounded-[6px] px-[20px] py-[10px] bg-white  border border-nomadBlack text-nomadBlack text-lg font-bold cursor-pointer">
          {cancelText}
        </button>
        <button className="rounded-[6px] px-[20px] py-[10px] bg-nomadBlack text-white text-lg font-bold cursor-pointer">
          {confirmText}
        </button>
      </div>
      </div>
    </BasePopup>
  );
}
