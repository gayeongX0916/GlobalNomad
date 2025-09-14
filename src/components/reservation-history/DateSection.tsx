// UI
import { MenuItem } from "../ui/Dropdown/Dropdown";
import { SelectInput } from "../ui/Input/SelectInput";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function DateSection({ date }: { date: string }) {
  const items: MenuItem[] = [
    { label: "01:00 ~ 02:00" },
    { label: "02:00 ~ 03:00" },
  ];

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
        <SelectInput placeholder="14:00 ~ 15:00" items={items} />
      </div>
    </section>
  );
}
