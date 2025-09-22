"use client";

import { format, isSameDay, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarHeader } from "./CalendarHeader";
import { ActivitySchedule, ActivityTime } from "@/lib/types/activities";

type SchedulePickerProps = {
  data: ActivitySchedule[];
  onChange: (id: number) => void;
  onCalendarMonthChange?: (year: number, month: number) => void;
  isLoading?: boolean;
};

export function SchedulePicker({
  data,
  onChange,
  onCalendarMonthChange,
  isLoading = false,
}: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ActivityTime | null>(null);

  const selectKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    if (data.length === 0 || selectedDate) return;
    setSelectedDate(parseISO(data[0].date));
  }, [data, selectedDate]);

  const timesFromSelectedDate = useMemo<ActivityTime[]>(() => {
    if (!selectKey) return [];
    const day = data.find((d) => d.date === selectKey);
    return day?.times ?? [];
  }, [data, selectKey]);

  const handleSelectSlot = (t: ActivityTime) => {
    setSelectedSlot(t);
    onChange(t.id);
  };

  const includeDates = useMemo(() => data.map((d) => parseISO(d.date)), [data]);

  return (
    <div>
      <section
        className="px-[15px] flex justify-center"
        aria-labelledby="date-picker-title"
      >
        <h3 id="date-picker-title" className="sr-only">
          날짜 선택
        </h3>
        <DatePicker
          selected={selectedDate}
          onSelect={(day) => {
            setSelectedDate(day);
            setSelectedSlot(null);
          }}
          onMonthChange={(viewDate) => {
            onCalendarMonthChange?.(
              viewDate.getFullYear(),
              viewDate.getMonth() + 1
            );
          }}
          openToDate={new Date()}
          includeDates={includeDates}
          dateFormat="yyyy-MM-dd"
          inline
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <CalendarHeader
              date={date}
              onPrevMonth={decreaseMonth}
              onNextMonth={increaseMonth}
            />
          )}
          dayClassName={(date) => {
            const isToday = isSameDay(date, new Date());
            return isToday ? "ring-2 ring-nomadBlack rounded-full" : "";
          }}
        />
      </section>

      <section className="mt-[20px]" aria-labelledby="available-times-title">
        <h3
          id="available-times-title"
          className="text-2lg font-bold text-nomadBlack"
        >
          예약 가능한 시간
        </h3>

        {isLoading ? (
          "로딩 중입니다."
        ) : timesFromSelectedDate.length === 0 ? (
          <p className="mt-[8px] text-lg text-gray-800">
            예약 가능한 시간이 없습니다.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-x-[10px] gap-y-[7px] mt-[14px] max-h-[240px] overflow-y-auto">
            {timesFromSelectedDate.map((t) => {
              const isSelected =
                selectedSlot?.startTime === t.startTime &&
                selectedSlot?.endTime === t.endTime;

              return (
                <li key={`${selectKey}-${t.startTime}-${t.endTime}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectSlot(t)}
                    className={`w-full rounded-[8px] border px-[12px] py-[10px] text-lg cursor-pointer font-medium
                      ${
                        isSelected
                          ? "bg-nomadBlack text-white"
                          : "border-nomadBlack bg-white text-nomadBlack"
                      }
                    `}
                  >
                    {t.startTime} ~ {t.endTime}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
