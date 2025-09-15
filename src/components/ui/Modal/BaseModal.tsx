import { ModalProps } from "@/lib/types/modalProps";
import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import Image from "next/image";

// Icons
import CloseIcon from "@/assets/svgs/close_icon.svg";

interface BaseModalProps extends ModalProps {
  mode: "action" | "notification";
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
      <div
        className={`min-w-[327px] border border-gray-200 w-full z-50 fixed inset-0 ${
          mode === "action"
            ? "bg-white px-[23px] pt-[24px] pb-[32px] rounded-[24px]"
            : "bg-green-100 px-[20px] py-[24px] rounded-[10px]"
        }`}
      >
        <header className="flex items-center justify-between w-full">
          <span
            className={`font-bold text-black ${
              mode === "action" ? "text-2xl" : "text-xl"
            }`}
          >
            {title}
          </span>
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
              className={`${mode === "notification" && "w-[24px] h-[24px]"}`}
            />
          </button>
        </header>
        {children}
      </div>
    </Dialog>
  );
}
