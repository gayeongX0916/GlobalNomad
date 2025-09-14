import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ko } from "date-fns/locale";

// Icons
import PrevIcon from "@/assets/svgs/prev_icon.svg";
import NextIcon from "@/assets/svgs/next_icon.svg";



type Api = ReturnType<FullCalendar["getApi"]> | null;

export function Toolbar({ api }: { api: Api }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!api) return;

    const update = () => {
      const d = api.view.currentStart;
      const text = format(d, "yyyy년 M월", { locale: ko });
      setTitle(text);
    };

    update();
    api.on("datesSet", update);

    return () => {
      api.off("datesSet", update);
    };
  }, [api]);

  return (
    <div className="flex items-center justify-center gap-x-[95px]">
      <button
        type="button"
        aria-label="이전"
        onClick={() => api?.prev()}
        className="cursor-pointer"
      >
        <Image
          src={PrevIcon}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
      </button>

      <div className="text-xl font-bold text-black">{title}</div>

      <button
        type="button"
        aria-label="다음"
        onClick={() => api?.next()}
        className="cursor-pointer"
      >
        <Image
          src={NextIcon}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
      </button>
    </div>
  );
}