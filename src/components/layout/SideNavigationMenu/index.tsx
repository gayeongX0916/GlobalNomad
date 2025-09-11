"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// UI
import { ProfileUpload } from "./ProfileUpload";

// Icons
import AccountCheckIcon from "@/assets/svgs/account_check_icon.svg";
import BoxCheckIcon from "@/assets/svgs/box_check_icon.svg";
import CalendarCheckIcon from "@/assets/svgs/calendar_check_icon.svg";
import SettingIcon from "@/assets/svgs/setting_icon.svg";
import Link from "next/link";

export function SideNavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItem = [
    {
      img: AccountCheckIcon,
      label: "내 정보",
      path: "/my-page",
    },
    { img: BoxCheckIcon, label: "예약 내역", path: "/my-reservations" },
    {
      img: CalendarCheckIcon,
      label: "내 체험 관리",
      path: ["/my-activities", "/my-activities/registration"],
    },
    { img: SettingIcon, label: "예약 현황", path: "/current" },
  ];

  return (
    <nav
      className="flex flex-col items-center gap-y-[24px] lg:w-[384px] md:w-full md:min-w-[250px] p-[24px] rounded-[12px] bg-white border border-gray-300"
      aria-label="사이드 네비게이션 메뉴"
    >
      <ProfileUpload />
      <ul className="flex flex-col gap-y-[8px] w-full">
        {menuItem.map((item) => {
          const isActive = Array.isArray(item.path)
            ? item.path.includes(pathname)
            : pathname === item.path;

          return (
            <li key={Array.isArray(item.path) ? item.path[0] : item.path}>
              <Link
                href={Array.isArray(item.path) ? item.path[0] : item.path}
                className={`w-full flex items-center gap-x-[14px] rounded-[12px] py-[9px] px-[16px] cursor-pointer ${
                  isActive ? "bg-green-100" : "hover:bg-green-100"
                }`}
              >
                <Image
                  src={item.img}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-bold text-nomadBlack">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
