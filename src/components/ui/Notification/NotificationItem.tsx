import CloseIcon from "@/assets/close_icon_gray.svg";
import Image from "next/image";

type NotificationItemProps = {};

export function NotificationItem({}) {
  return (
    <section className="bg-white px-[12px] py-[16px] border border-gray-200 rounded-[5px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="w-[5px] h-[5px] bg-blue-500 rounded-full"></div>
        <button className="cursor-pointer">
          <Image src={CloseIcon} alt="닫기" width={24} height={24} />
        </button>
      </div>
      <span className="text-md whitespace-normal">
        함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.
      </span>
      <span className="text-xs text-gray-600 mt-[4px]">1분 전</span>
    </section>
  );
}
