import { useRouter, usePathname } from "next/navigation";
import { ProfileUpload } from "./ProfileUpload";
import AccountCheckIcon from "@/assets/account_check_icon.svg";
import BoxCheckIcon from "@/assets/box_check_icon.svg";
import CalendarCheckIcon from "@/assets/calendar_check_icon.svg";
import SettingIcon from "@/assets/setting_icon.svg";
import Image from "next/image";

export function SideNavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItem = [
    {
      img: AccountCheckIcon,
      label: "내 정보",
      path: "/",
    },
    { img: BoxCheckIcon, label: "예약 내역", path: "/" },
    { img: CalendarCheckIcon, label: "내 체험 관리", path: "/" },
    { img: SettingIcon, label: "예약 현황", path: "/" },
  ];

  return (
    <section className="flex flex-col items-center gap-y-[24px] w-[384px] min-w-[251px] p-[24px] rounded-[12px] bg-white">
      <ProfileUpload />
      <ul className="flex flex-col gap-y-[8px] w-full">
        {menuItem.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <li key={idx}>
              <button
                type="button"
                className={`w-full flex items-center gap-x-[14px] rounded-[12px] py-[9px] px-[16px] cursor-pointer ${
                  isActive ? "bg-green-100" : "hover:bg-green-100"
                }`}
                onClick={() => router.push(item.path)}
              >
                <Image src={item.img} alt={item.label} width={24} height={24} />
                <span className="text-lg font-bold text-nomadBlack">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
