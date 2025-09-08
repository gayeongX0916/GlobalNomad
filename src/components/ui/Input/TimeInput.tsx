"use client";

import ChevronDown from "@/assets/svgs/chevron_down.svg";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useMemo } from "react";

type TimeInputProps = {
  value: string | null;
  onChange?: (t: string | null) => void;
  step?: number;
  startHour?: number;
  endHour?: number;
  label: string;
};

const format = (h: number, m: number) =>
  `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

export function TimeInput({
  value,
  onChange,
  step = 60,
  startHour = 0,
  endHour = 24,
  label,
}: TimeInputProps) {
  const options = useMemo(() => {
    const arr: string[] = [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += step) arr.push(format(h, m));
    }
    return arr;
  }, [startHour, endHour, step]);

  const initialValue = value ?? "";

  // parseInt(start.split(":")[0], 10) + 1

  return (
    <div className="flex flex-col gap-y-[10px]">
      <span className="text-xl text-gray-900">{label}</span>
      <Listbox
        value={initialValue}
        onChange={(v: string) => onChange?.(v === "" ? null : v)}
      >
        <div className="relative">
          <ListboxButton className="pl-[16px] py-[15px] pr-[40px] text-left border border-gray-800 w-full text-black rounded-[4px] min-w-[140px]">
            <span className={initialValue ? "" : "text-gray-600"}>
              {initialValue || "00:00"}
            </span>
            <Image
              src={ChevronDown}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="pointer-events-none absolute top-1/2 right-[12px] -translate-y-1/2"
            />
          </ListboxButton>

          <ListboxOptions className="absolute z-50 mt-[8px] max-h-60 w-full overflow-y-auto rounded-[10px] border border-gray-200 bg-white shadow-lg focus:outline-none">
            {options.map((t) => (
              <ListboxOption
                key={t}
                value={t}
                className="px-[12px] py-[8px] text-md hover:bg-blue-100 hover:cursor-pointer"
              >
                <span>{t}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
