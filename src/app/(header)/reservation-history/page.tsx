"use client";

import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarApi } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";

// UI
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";
import { ReservationInfoModal } from "@/components/ui/Modal/ReservationInfoModal";
import { ExperienceDropdown } from "@/components/ui/Dropdown/ExperienceDropdown";
import { MenuItem } from "@/components/ui/Dropdown";
import { Toolbar } from "@/components/reservation-history/Toolbar";

type Api = ReturnType<FullCalendar["getApi"]> | null;

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
