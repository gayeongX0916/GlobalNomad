"use client";

import { NotificationModal } from "@/components/Modal/NotificationModal";
import { BaseModal } from "@/components/Modal/BaseModal";
import { ReservationInfoModal } from "@/components/Modal/ReservationInfoModal";
import { ReviewModal } from "@/components/Modal/ReviewModal";
import { ScheduleModal } from "@/components/Modal/ScheduleModal";
import { ActionPopup } from "@/components/Popup/ActionPopup";
import { BasePopup } from "@/components/Popup/BasePopup";
import { ConfirmPopup } from "@/components/Popup/ConfirmPopup";
import { title } from "process";
import { useState } from "react";
import { ProfileUpload } from "@/components/SideNavigationMenu/ProfileUpload";
import { Dropdown } from "@/components/Dropdown";
import { SideNavigationMenu } from "@/components/SideNavigationMenu";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F9F9F9]">
      <button onClick={() => setIsOpen(true)}>누르기</button>
      <NotificationModal
        id={1}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <SideNavigationMenu />
    </div>
  );
}
