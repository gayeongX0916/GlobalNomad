"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  CalendarApi,
  DatesSetArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";

// UI
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ReservationInfoModal } from "@/components/ui/Modal/ReservationInfoModal";
import { ExperienceDropdown } from "@/components/ui/Dropdown/ExperienceDropdown";
import { Toolbar } from "@/components/reservation-history/Toolbar";
import { useMyActivitiesList } from "@/lib/hooks/MyActivities/useMyActivitiesList";
import { useMyActivitiesMonthly } from "@/lib/hooks/MyActivities/useMyActivitiesMonthly";
import { Chips, Status } from "@/components/ui/Chips/Chips";
import { format } from "date-fns";
import { ErrorView } from "@/components/ui/ErrorView/ErrorView";
import { Spinner } from "@/components/ui/Spinner/Spinner";

type ActivityItem = {
  id: number;
  title: string;
};

const ReservationHistory = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useMyActivitiesList({ size: 6 });

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

  const {
    data: MyActivitiesMonthly,
    isLoading: monthlyLoading,
    isError: monthlyError,
    isFetching: monthlyFetching,
    refetch: monthlyRefetch,
  } = useMyActivitiesMonthly({
    activityId: selectedActivity || undefined,
    year,
    month,
    enabled: !!selectedActivity,
  });

  useEffect(() => {
    if (calendarRef.current) {
      setApi(calendarRef.current.getApi());
    }
  }, []);

  useEffect(() => {
    const flat =
      data?.pages?.flatMap((p) =>
        (p.activities ?? []).map((a) => ({ id: a.id, title: a.title }))
      ) ?? [];
    const seen = new Set<number>();
    const unique = flat.filter(({ id }) =>
      seen.has(id) ? false : (seen.add(id), true)
    );

    setList(unique);
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

  if (isError) {
    return (
      <ErrorView
        message="내 체험 관리를 불러오는 중 오류가 발생했어요."
        refetch={refetch}
        isFetching={isFetching}
      />
    );
  }

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>

        <section className="flex flex-col gap-y-[30px] flex-1 fc-scope relative">
          <header className="flex flex-col gap-y-[35px]">
            <h3 className="text-3xl text-black font-bold">예약 현황</h3>

            <ExperienceDropdown
              items={list}
              onSelect={setSelectedActivity}
              hasMore={!!hasNextPage}
              onLoadMore={() => fetchNextPage()}
              loadingMore={isFetchingNextPage}
              loading={isLoading}
            />
          </header>

          <div className="flex flex-col gap-y-[18px]">
            <Toolbar api={api} />

            {monthlyError && (
              <ErrorView
                message="월별 예약 데이터를 불러오는 중 문제가 발생했어요."
                refetch={monthlyRefetch}
                isFetching={monthlyFetching}
              />
            )}
            {monthlyLoading ? (
              <div className="flex justify-center py-4">
                <Spinner size="36px" />
              </div>
            ) : (
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
            )}

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
