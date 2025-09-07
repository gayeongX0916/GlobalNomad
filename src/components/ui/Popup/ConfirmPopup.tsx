import { ModalProps } from "@/types/modalProps";
import { BasePopup } from "./BasePopup";
import CheckIcon from "@/assets/check_icon.svg";
import Image from "next/image";

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
      <section className="flex flex-col items-center gap-y-[32px]">
        <div className="flex flex-col items-center gap-y-[16px]">
          <div className="w-[24px] h-[24px] rounded-full bg-nomadBlack flex justify-center items-center">
            <Image src={CheckIcon} alt="체크" width={20} height={20} />
          </div>
          <span className="text-lg text-black">{message}</span>
        </div>
        <footer className="flex items-center gap-x-[8px]">
          <button className="rounded-[6px] px-[20px] py-[10px] bg-white  border border-nomadBlack text-nomadBlack text-lg font-bold cursor-pointer">
            {cancelText}
          </button>
          <button className="rounded-[6px] px-[20px] py-[10px] bg-nomadBlack text-white text-lg font-bold cursor-pointer">
            {confirmText}
          </button>
        </footer>
      </section>
    </BasePopup>
  );
}
