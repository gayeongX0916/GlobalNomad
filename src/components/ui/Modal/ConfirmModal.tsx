"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import CheckIcon from "@/assets/svgs/modal_check_icon.svg";
import Image from "next/image";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmModal({
  isOpen,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-[360px] rounded-[16px] bg-white p-[24px] flex items-center flex-col">
          <div className="flex justify-center items-center mb-[12px]">
            <Image
              src={CheckIcon}
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
            />
          </div>
          {title && (
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          )}

          <div className="mt-[24px] flex justify-center gap-x-[12px]">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel?.();
              }}
              className="rounded-md border border-gray-600 bg-white px-[16px] py-[8px] text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onConfirm?.();
              }}
              className="rounded-md bg-nomadBlack px-[16px] py-[8px] text-sm font-bold text-white hover:bg-gray-700 cursor-pointer"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
