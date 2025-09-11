import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";
import { ReservationItem } from "@/components/ReservationHistory/ReservationItem";
import { Dropdown, MenuItem } from "@/components/ui/Dropdown";
import EmptyList from "@/assets/svgs/empty_list.svg";
import Image from "next/image";

const items: MenuItem[] = [
  { label: "예약 신청" },
  { label: "예약 취소" },
  { label: "예약 승인" },
];
const reservations = [1, 2, 3, 4];

const MyReservationsPage = () => {
  return (
    <main className="pb-[200px] pt-[70px] flex justify-center gap-x-[24px] w-full px-[16px] md:px-[32px] lg:px-0">
      <div className="shrink-0 hidden md:block">
        <SideNavigationMenu />
      </div>
      <section
        className="flex flex-col gap-y-[24px] max-w-[640px] flex-1"
        aria-labelledby="reservation-history-title"
      >
        <header className="flex justify-between">
          <h3
            id="reservation-history-title"
            className="text-3xl text-black font-bold"
          >
            예약 내역
          </h3>
          {reservations.length > 0 && (
            <Dropdown children="필터" items={items} />
          )}
        </header>

        {reservations.length > 0 ? (
          <ul id="reservation-list" className="flex flex-col gap-y-[24px]">
            {reservations.map((id) => (
              <li key={id}>
                <ReservationItem />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-y-[12px] lg:gap-y-[20px] pt-[40px]">
            <Image
              src={EmptyList}
              alt="예약 내역 없음"
              className="w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]"
            />
            <p className="text-2xl text-gray-800">아직 등록한 체험이 없어요</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyReservationsPage;
