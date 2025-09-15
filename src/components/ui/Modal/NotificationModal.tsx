import { ModalProps } from "@/lib/types/modalProps";
import { BaseModal } from "./BaseModal";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface AlertModalProps extends ModalProps {
  id: number;
}

export function NotificationModal({ id, isOpen, onClose }: AlertModalProps) {
  return (
    <BaseModal
      mode="notification"
      isOpen={isOpen}
      onClose={onClose}
      title="알림 6개"
    >
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-y-[8px] mt-[16px]">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </BaseModal>
  );
}
