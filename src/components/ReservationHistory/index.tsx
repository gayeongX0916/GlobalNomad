// UI
import { Dropdown, MenuItem } from "../ui/Dropdown";
import { ReservationItem } from "./ReservationItem";

export function ReservationHistory() {
  const items: MenuItem[] = [
    { label: "예약 신청" },
    { label: "예약 취소" },
    { label: "예약 승인" },
  ];
  const reservations = [1, 2, 3, 4];

  return (
    <section aria-labelledby="reservation-history-title">
      <header className="flex justify-between">
        <h3
          id="reservation-history-title"
          className="text-3xl text-black font-bold"
        >
          예약 내역
        </h3>
        <Dropdown children="필터" items={items} />
      </header>

      {reservations.length > 0 ? (
        <ul
          id="reservation-list"
          className="flex flex-col pt-[24px] gap-y-[24px]"
        >
          {reservations.map((id) => (
            <li key={id}>
              <ReservationItem />
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-[24px] text-gray-600">
          예약 내역이 없습니다.
        </p>
      )}
    </section>
  );
}
