import Image from "next/image";

// icons
import AccountCheckIcon from "@/assets/svgs/account_check_icon_gray.svg";
import BoxCheckIcon from "@/assets/svgs/box_check_icon_gray.svg";
import CalendarCheckIcon from "@/assets/svgs/calendar_check_icon_gray.svg";
import SettingIcon from "@/assets/svgs/setting_icon_gray.svg";
import LogoutIcon from "@/assets/svgs/logout_icon_gray.svg";

import AccountCheckIconHover from "@/assets/svgs/account_check_icon_green.svg";
import BoxCheckIconHover from "@/assets/svgs/box_check_icon_green.svg";
import CalendarCheckIconHover from "@/assets/svgs/calendar_check_icon_green.svg";
import SettingIconHover from "@/assets/svgs/setting_icon_green.svg";
import LogoutIconHover from "@/assets/svgs/logout_icon_green.svg";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth";
import { deleteRefreshCookie } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";

type ProfileDropdownProps = {
  onSelect: () => void;
};

export function ProfileDropdown({onSelect}:ProfileDropdownProps) {
  const clearAccessToken = useAuthStore((s) => s.clear);
  const router = useRouter();

  const handleLogout = () => {
    clearAccessToken();
    deleteRefreshCookie();
    router.push("/");
  };

  const menuItems = [
    {
      label: "내 정보",
      icon: AccountCheckIcon,
      iconHover: AccountCheckIconHover,
      href: "/my-page",
    },
    {
      label: "예약 내역",
      icon: BoxCheckIcon,
      iconHover: BoxCheckIconHover,
      href: "/my-reservations",
    },
    {
      label: "내 체험관리",
      icon: SettingIcon,
      iconHover: SettingIconHover,
      href: "/my-activities",
    },
    {
      label: "내 체험 예약 현황",
      icon: CalendarCheckIcon,
      iconHover: CalendarCheckIconHover,
      href: "/reservation-history",
    },
    {
      label: "로그아웃",
      icon: LogoutIcon,
      iconHover: LogoutIconHover,
      onClick: handleLogout,
    },
  ];

  return (
    <ul
      className="bg-white border border-gray-600 rounded-[6px] py-[8px] w-[180px]"
      aria-label="프로필 메뉴"
    >
      {menuItems.map(({ label, icon, iconHover, href, onClick }) => (
        <li key={label}>
          {href ? (
            <Link
              href={href}
              onClick={onSelect}
              className="group flex items-center gap-[12px] px-[16px] py-[8px] hover:bg-gray-100 cursor-pointer"
              role="menuitem"
              prefetch={false}
            >
              <span className="relative inline-block w-5 h-5">
                <Image
                  src={icon}
                  alt=""
                  className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0"
                  width={18}
                  height={18}
                />
                <Image
                  src={iconHover}
                  alt=""
                  className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  width={18}
                  height={18}
                />
              </span>
              <span className="text-md text-gray-800 group-hover:text-nomadBlack">
                {label}
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onClick}
              className="group flex w-full items-center gap-[12px] px-[16px] py-[8px] hover:bg-gray-100 cursor-pointer text-left"
              role="menuitem"
            >
              <span className="relative inline-block w-5 h-5">
                <Image
                  src={icon}
                  alt=""
                  className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0"
                  width={18}
                  height={18}
                />
                <Image
                  src={iconHover}
                  alt=""
                  className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  width={18}
                  height={18}
                />
              </span>
              <span className="text-md text-gray-800 group-hover:text-nomadBlack">
                {label}
              </span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
