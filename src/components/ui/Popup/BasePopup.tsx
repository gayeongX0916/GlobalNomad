import { ModalProps } from "@/lib/types/modalProps";
import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface BasePopupProps extends ModalProps {
  children: ReactNode;
}

export function BasePopup({ isOpen, onClose, children }: BasePopupProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white px-[16px] py-[24px] rounded-[8px] w-[327px]">
          {children}
        </div>
      </div>
    </Dialog>
  );
}
