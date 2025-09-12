"use client";

import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";
import { CalendarApi } from "@fullcalendar/core";
import Image from "next/image";
import PrevIcon from "@/assets/svgs/prev_icon.svg";
import NextIcon from "@/assets/svgs/next_icon.svg";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ReservationInfoModal } from "@/components/ui/Modal/ReservationInfoModal";
import { DateClickArg } from "@fullcalendar/interaction";
import { ExperienceDropdown } from "@/components/ui/Dropdown/ExperienceDropdown";
import { MenuItem } from "@/components/ui/Dropdown";

type Api = ReturnType<FullCalendar["getApi"]> | null;

function Toolbar({ api }: { api: Api }) {
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

const ReservationHistory = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [api, setApi] = useState<CalendarApi | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (calendarRef.current) {
      setApi(calendarRef.current.getApi());
    }
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    setClickedDate(arg.date);
    setReferenceEl(arg.dayEl as HTMLElement);
    setIsOpen(true);
  };

  const items: MenuItem[] = [
    { label: "무슨 체험" },
    { label: "해볼까요~?" },
    { label: "저느뇨" },
  ];

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>
        <section className="flex flex-col gap-y-[30px] flex-1 fc-scope relative">
          <header className="flex flex-col gap-y-[35px]">
            <h3 className="text-3xl text-black font-bold">예약 현황</h3>
            <ExperienceDropdown items={items} />
          </header>

          <div className="flex flex-col gap-y-[18px]">
            <Toolbar api={api} />
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={false}
              titleFormat={{ year: "numeric", month: "long" }}
              height="auto"
              fixedWeekCount={false}
              dateClick={handleDateClick}
              dayCellClassNames={() => ["cursor-pointer"]}
            />
            <ReservationInfoModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              date={String(clickedDate)}
              referenceEl={referenceEl}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReservationHistory;
