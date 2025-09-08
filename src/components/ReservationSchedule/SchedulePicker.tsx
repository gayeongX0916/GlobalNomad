"use client";

import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarHeader } from "./CalendarHeader";

type Slot = {
  date: string;
  startTime: string;
  endTime: string;
};

type SchedulePickerProps = {
  data: Slot[];
  onChange?: (slot: Slot | null) => void;
};

export function SchedulePicker({ data, onChange }: SchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const slotsForDate = selectedDate
    ? data.filter((item) => item.date === format(selectedDate, "yyyy-MM-dd"))
    : [];

  const handleSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot);
    onChange?.(slot);
  };

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
          dateFormat="yyyy-MM-dd"
          inline
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <CalendarHeader
              date={date}
              onPrevMonth={decreaseMonth}
              onNextMonth={increaseMonth}
            />
          )}
        />
      </section>

      <section className="mt-[16px]" aria-labelledby="available-times-title">
        <h3
          id="available-times-title"
          className="text-2lg font-bold text-nomadBlack"
        >
          예약 가능한 시간
        </h3>

        {slotsForDate.length === 0 ? (
          <p className="mt-[8px] text-lg text-gray-800">
            예약 가능한 시간이 없습니다.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-x-[10px] gap-y-[7px] mt-[14px] max-h-[240px] overflow-y-auto">
            {slotsForDate.map((slot, i) => {
              const isSelected =
                selectedSlot?.date === slot.date &&
                selectedSlot?.startTime === slot.startTime;

              return (
                <li key={`${slot.date}-${slot.startTime}-${slot.endTime}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectSlot(slot)}
                    className={`w-full rounded-[8px] border px-[12px] py-[10px] text-lg cursor-pointer font-medium
                      ${
                        isSelected
                          ? "bg-nomadBlack text-white"
                          : "border-nomadBlack bg-white text-nomadBlack"
                      }
                    `}
                  >
                    {slot.startTime} ~ {slot.endTime}
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
