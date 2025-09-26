"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarApi,
  DatesSetArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";

// UI
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ReservationInfoModal } from "@/components/ui/Modal/ReservationInfoModal";
import { ExperienceDropdown } from "@/components/ui/Dropdown/ExperienceDropdown";
import { Toolbar } from "@/components/reservation-history/Toolbar";
import { useMyActivitiesList } from "@/lib/hooks/MyActivities/useMyActivitiesList";
import { useMyActivitiesMonthly } from "@/lib/hooks/MyActivities/useMyActivitiesMonthly";
import { Chips, Status } from "@/components/ui/Chips/Chips";
import { format } from "date-fns";

type ActivityItem = {
  id: number;
  title: string;
};

const ReservationHistory = () => {
  const { data } = useMyActivitiesList();
  const calendarRef = useRef<FullCalendar>(null);
  const [api, setApi] = useState<CalendarApi | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [list, setList] = useState<ActivityItem[]>([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [year, setYear] = useState(() => new Date().getFullYear().toString());
  const [month, setMonth] = useState(() =>
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const { data: MyActivitiesMonthly } = useMyActivitiesMonthly(
    {
      activityId: selectedActivity ?? undefined,
      year,
      month,
    },
    {
      enabled: !!selectedActivity,
    }
  );

  useEffect(() => {
    if (calendarRef.current) {
      setApi(calendarRef.current.getApi());
    }
  }, []);

  useEffect(() => {
    const activities =
      data?.activities?.map((a) => ({
        id: a.id,
        title: a.title,
      })) ?? [];
    setList(activities);
  }, [data]);

  const handleDateClick = (arg: DateClickArg) => {
    setClickedDate(arg.date);
    setReferenceEl(arg.dayEl as HTMLElement);
    setIsOpen(true);
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    const d = arg.view.currentStart ?? arg.start;
    setYear(d.getFullYear().toString());
    setMonth((d.getMonth() + 1).toString().padStart(2, "0"));
  };

  const events = useMemo<EventInput[]>(() => {
    const rows = MyActivitiesMonthly ?? [];
    return rows.flatMap(({ date, reservations }) => {
      const evts: EventInput[] = [];
      (["pending", "confirmed", "completed"] as Status[]).forEach((status) => {
        const count = Number(reservations?.[status] ?? 0);
        if (count > 0) {
          evts.push({
            start: date,
            extendedProps: { status, count },
          });
        }
      });
      return evts;
    });
  }, [MyActivitiesMonthly]);

  const renderEventContent = (arg: EventContentArg) => {
    const { status, count } = arg.event.extendedProps as {
      status: Status;
      count?: number;
    };
    return <Chips status={status} count={count} />;
  };

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>
        <section className="flex flex-col gap-y-[30px] flex-1 fc-scope relative">
          <header className="flex flex-col gap-y-[35px]">
            <h3 className="text-3xl text-black font-bold">예약 현황</h3>
            <ExperienceDropdown items={list} onSelect={setSelectedActivity} />
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
              datesSet={handleDatesSet}
              dateClick={handleDateClick}
              dayCellClassNames={() => ["cursor-pointer"]}
              events={events}
              eventContent={renderEventContent}
            />
            <ReservationInfoModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              date={clickedDate ? format(clickedDate, "yyyy-MM-dd") : ""}
              referenceEl={referenceEl}
              activityId={selectedActivity}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReservationHistory;
