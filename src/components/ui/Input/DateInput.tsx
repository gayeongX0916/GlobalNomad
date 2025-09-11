"use client";

import DatePicker from "react-datepicker";
import Image from "next/image";

// Utils
import { DateFormatToString } from "@/utils/DateFormatToString";

// Icons
import CalendarIcon from "@/assets/svgs/calender_icon.svg";

type DateInputProps = {
  value: string | null;
  onChange?: (d: string | null) => void;
  placeholder?: string;
};

export function DateInput({ value, onChange, placeholder }: DateInputProps) {
  return (
    <div className="flex flex-col gap-y-[10px]">
      <label className="text-xl text-gray-900">날짜</label>
      
      <div className="relative w-[380px] [&_.react-datepicker-wrapper]:w-full">
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(d: Date | null) =>
            onChange(d ? DateFormatToString(d) : null)
          }
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          className="pl-[16px] pr-[48px] py-[15px] rounded-[4px] border border-gray-800 w-full text-black bg-white"
        />
        <Image
          src={CalendarIcon}
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="absolute top-1/2 -translate-y-1/2 right-[12px]"
        />
      </div>
    </div>
  );
}
