import { ModalProps } from "@/lib/types/modalProps";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { useMyNotificationsList } from "@/lib/hooks/MyNotifications/useMyNotificationsList";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import CloseIcon from "@/assets/svgs/close_icon.svg";

export function NotificationModal({ isOpen, onClose }: ModalProps) {
  const { data, isLoading } = useMyNotificationsList(isOpen);
  const total = data?.totalCount ?? 0;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-start justify-end">
        <DialogPanel
          className="fixed right-[12px]
          top-[60px] md:max-w-[355px] md:h-[400px] overflow-x-auto no-scrollbar w-full h-full rounded-[10px] bg-green-100 px-[20px] py-[24px] border border-gray-200"
        >
          <header className="flex items-center justify-between">
            <DialogTitle className="font-bold text-black text-xl">
              알림 {total}개
            </DialogTitle>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer"
            >
              <Image
                src={CloseIcon}
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
            </button>
          </header>

          <div className="flex flex-col gap-y-[8px] mt-[16px]">
            {isLoading ? (
              <div className="text-sm text-gray-600 py-6 text-center">
                불러오는 중…
              </div>
            ) : data?.notifications?.length ? (
              data.notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  createdAt={item.createdAt}
                />
              ))
            ) : (
              <div className="text-sm text-gray-600 py-6 text-center">
                새로운 알림이 없습니다.
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
