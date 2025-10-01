import { ModalProps } from "@/lib/types/modalProps";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import CloseIcon from "@/assets/svgs/close_icon.svg";
import { MyNotificationsResponse } from "@/lib/types/myNotifications";

interface NotificationModalProps extends ModalProps {
  isLoading: boolean;
  data: MyNotificationsResponse;
  totalCount: number;
}

export function NotificationModal({
  isOpen,
  onClose,
  isLoading,
  data,
  totalCount,
}: NotificationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-start justify-end">
        <DialogPanel
          className="fixed right-[60px]
          top-[60px] max-w-[300px] md:max-w-[355px] md:h-[400px] w-full h-full overflow-hidden rounded-[10px] bg-green-100 px-[20px] py-[24px] border border-gray-200"
        >
          <header className="flex items-center justify-between">
            <DialogTitle className="font-bold text-black text-xl">
              알림 {totalCount}개
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

          <div className="flex flex-col gap-y-[8px] mt-[16px] h-full overflow-y-auto no-scrollbar pb-[70px] md:pb-[30px]">
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
