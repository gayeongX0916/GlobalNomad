import { ModalProps } from "@/types/modalProps";
import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import CloseIcon from "@/assets/close_icon.svg";
import Image from "next/image";

interface BaseModalProps extends ModalProps {
  mode: "action" | "alert";
  title: string;
  children: ReactNode;
}

export function BaseModal({
  mode,
  title,
  children,
  isOpen,
  onClose,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="bg-white px-[24px] pt-[28px] pb-[32px] rounded-[24px] w-[327px] border border-gray-200">
        <div className="flex items-center justify-between w-full">
          <span
            className={`font-bold text-black ${
              mode === "action" ? "text-2xl" : "text-xl"
            }`}
          >
            {title}
          </span>
          <button onClick={onClose} className="cursor-pointer">
            <Image
              src={CloseIcon}
              alt="닫기"
              width={40}
              height={40}
              className={`${mode === "alert" && "w-[24px] h-[24px]"}`}
            />
          </button>
        </div>
        {children}
      </div>
    </Dialog>
  );
}
