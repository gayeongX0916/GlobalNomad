import { ModalProps } from "@/types/modalProps";
import { BaseModal } from "./BaseModal";
import { NotificationItem } from "../Notification/NotificationItem";

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
      <div className="flex flex-col gap-y-[8px] mt-[16px]">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </BaseModal>
  );
}
