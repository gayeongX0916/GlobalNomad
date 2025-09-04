import { Dropdown, MenuItem } from "../Dropdown";
import { SelectInput } from "../Input/SelectInput";

export function DateSection() {
  const items: MenuItem[] = [
    { label: "01:00 ~ 02:00" },
    { label: "02:00 ~ 03:00" },
  ];
  return (
    <section className="flex flex-col gap-y-[16px]">
      <h4 className="text-xl font-semibold text-black">예약 날짜</h4>
      <div className="flex flex-col gap-y-[7px]">
        <span className="text-xl text-black">2023년 2월 12일</span>
        <SelectInput placeholder="14:00 ~ 15:00" items={items} />
      </div>
    </section>
  );
}
