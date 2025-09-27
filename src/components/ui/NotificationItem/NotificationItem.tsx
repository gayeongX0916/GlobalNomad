import Image from "next/image";

// Icons
import CloseIcon from "@/assets/svgs/close_icon_gray.svg";
import { useDeleteMyNotifications } from "@/lib/hooks/MyNotifications/useDeleteMyNotifications";
import { timeAgo } from "@/lib/utils/timeAgo";

type NotificationItemProps = {
  id: number;
  content: string;
  createdAt: string;
};

function HighlightedContent({ text }: { text: string }) {
  const tokens = text.split(/(승인|거절)/g);
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok === "승인") {
          return (
            <span key={i} className="text-blue-500">
              {tok}
            </span>
          );
        }
        if (tok === "거절") {
          return (
            <span key={i} className="text-red-600">
              {tok}
            </span>
          );
        }
        return <span key={i}>{tok}</span>;
      })}
    </>
  );
}

export function NotificationItem({
  id,
  content,
  createdAt,
}: NotificationItemProps) {
  const { mutate: deleteMyNotifications } = useDeleteMyNotifications();

  const status = content.includes("승인")
    ? "approved"
    : content.includes("거절")
    ? "declined"
    : "default";

  const dotClass =
    status === "approved"
      ? "bg-blue-500"
      : status === "declined"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <article className="bg-white px-[12px] py-[16px] border border-gray-200 rounded-[5px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className={`w-[5px] h-[5px] rounded-full ${dotClass}`}></div>
        <button
          className="cursor-pointer"
          aria-label="닫기"
          onClick={() => deleteMyNotifications({ notificationId: id })}
        >
          <Image
            src={CloseIcon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
        </button>
      </div>

      <p className="text-md whitespace-normal break-keep mt-[3px]">
        <HighlightedContent text={content} />
      </p>

      <span className="text-xs text-gray-600 mt-[4px]">
        {timeAgo(createdAt)}
      </span>
    </article>
  );
}
