// UI
import { MyActivitiesScheduleResponse } from "@/lib/types/myActivities";
import { SelectInput } from "../ui/Input/SelectInput";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useMemo } from "react";
import { MenuItem } from "@/lib/types/ui";

type DateSectionProps = {
  date: string;
  scheduleData: MyActivitiesScheduleResponse;
  value?: number;
  onChange: (v: number) => void;
};

export function DateSection({
  date,
  scheduleData,
  value,
  onChange,
}: DateSectionProps) {
  const toItem = (
    s: MyActivitiesScheduleResponse[number]
  ): MenuItem<number> => ({
    label: `${s.startTime} ~ ${s.endTime}`,
    value: s.scheduleId,
  });

  const { placeholder, items } = useMemo(() => {
    const arr = scheduleData ?? [];
    if (arr.length === 0) {
      return {
        placeholder: "시간을 선택하세요",
        items: [],
      };
    }
    const [first, ...rest] = arr;
    return {
      placeholder: `${first.startTime} ~ ${first.endTime}`,
      items: [toItem(first), ...rest.map(toItem)],
    };
  }, [scheduleData]);

  return (
    <section
      className="flex flex-col gap-y-[16px]"
      aria-labelledby="date-section-title"
    >
      <h3 id="date-section-title" className="text-xl font-semibold text-black">
        예약 날짜
      </h3>
      <div className="flex flex-col gap-y-[7px]">
        <span className="text-xl text-black">
          {format(date, "yyyy년 M월 d일", { locale: ko })}
        </span>
        <SelectInput<number>
          placeholder={placeholder}
          items={items}
          onChange={onChange}
          value={value}
        />
      </div>
    </section>
  );
}
