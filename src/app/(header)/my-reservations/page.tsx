"use client";

import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ReservationItem } from "@/components/my-reservations/ReservationItem";
import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import EmptyList from "@/assets/svgs/empty_list.svg";
import Image from "next/image";
import { MenuItem } from "@/lib/types/ui";
import { MyReservationStatus } from "@/lib/types/myReservations";
import { useMyReservationList } from "@/lib/hooks/MyReservations/useMyReservationList";
import { useMemo, useState } from "react";
import Link from "next/link";

const items: MenuItem<MyReservationStatus>[] = [
  { label: "예약 신청", value: "pending" },
  { label: "예약 완료", value: "confirmed" },
  { label: "예약 거절", value: "declined" },
  { label: "예약 취소", value: "canceled" },
  { label: "체험 완료", value: "completed" },
];

const MyReservationsPage = () => {
  const [status, setStatus] = useState(undefined);
  const { data, isLoading } = useMyReservationList({ status });

  const reservations = useMemo(() => data?.reservations ?? [], [data]);
  const hasData = reservations.length > 0;

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>

        <section
          className="flex-1 flex flex-col gap-y-[24px]"
          aria-labelledby="reservation-history-title"
        >
          <header className="flex justify-between">
            <h3
              id="reservation-history-title"
              className="text-3xl text-black font-bold"
            >
              예약 내역
            </h3>
            <Dropdown<MyReservationStatus>
              items={items}
              onSelect={(v) => setStatus(v)}
            >
              필터
            </Dropdown>
          </header>

          {/* {isLoading&& 스켈레톤} */}

          {!isLoading && hasData && (
            <ul id="reservation-list" className="flex flex-col gap-y-[24px]">
              {reservations.map((item) => (
                <li key={item.id}>
                  <Link href={`/activities/${item.activity.id}`}>
                  <ReservationItem {...item} />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && !hasData && (
            <div className="flex flex-col items-center gap-y-[12px] lg:gap-y-[20px] pt-[40px]">
              <Image
                src={EmptyList}
                alt="예약 내역 없음"
                className="w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]"
              />
              <p className="text-2xl text-gray-800">
                아직 등록한 체험이 없어요
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyReservationsPage;
