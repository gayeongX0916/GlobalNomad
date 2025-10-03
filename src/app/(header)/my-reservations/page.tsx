"use client";

import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ReservationItem } from "@/components/my-reservations/ReservationItem";
import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import EmptyList from "@/assets/svgs/empty_list.svg";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { MenuItem } from "@/lib/types/ui";
import { MyReservationStatus } from "@/lib/types/myReservations";
import { useMyReservationList } from "@/lib/hooks/MyReservations/useMyReservationList";

const items: MenuItem<MyReservationStatus>[] = [
  { label: "예약 신청", value: "pending" },
  { label: "예약 완료", value: "confirmed" },
  { label: "예약 거절", value: "declined" },
  { label: "예약 취소", value: "canceled" },
  { label: "체험 완료", value: "completed" },
];

export default function MyReservationsPage() {
  const [status, setStatus] = useState<MyReservationStatus | undefined>(
    undefined
  );

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyReservationList({ status, size: 10 });

  const reservations = useMemo(
    () => data?.pages.flatMap((p) => p.reservations) ?? [],
    [data]
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "400px 0px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, status]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-[400px]">
        <Spinner size="56px" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex justify-center items-center h-[400px]">
        <p className="text-red-600">불러오는 중 오류가 발생했어요.</p>
      </main>
    );
  }

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

          {reservations.length > 0 ? (
            <>
              <ul id="reservation-list" className="flex flex-col gap-y-[24px]">
                {reservations.map((item) => (
                  <li key={item.id}>
                    <Link href={`/activities/${item.activity.id}`}>
                      <ReservationItem {...item} />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center mt-[24px] min-h-[40px]">
                {isFetchingNextPage && <Spinner size="35px" />}
              </div>

              <div ref={sentinelRef} className="h-1" />
            </>
          ) : (
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
}
