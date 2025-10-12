"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Icons
import EmptyList from "@/assets/svgs/empty_list.svg";

// UI
import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu/SideNavigationMenu";
import { ActivityItem } from "@/components/my-activities/ActivityItem";
import { useMyActivitiesList } from "@/lib/hooks/MyActivities/useMyActivitiesList";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { ErrorView } from "@/components/ui/ErrorView/ErrorView";

const MyActivities = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useMyActivitiesList({ size: 8 });

  const list = useMemo(
    () => data?.pages.flatMap((p) => p.activities) ?? [],
    [data]
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const onLoadMore = useCallback(async () => {
    try {
      await fetchNextPage();
    } catch {
      toast.error("다음 페이지를 불러오지 못했어요. 다시 시도해 주세요.");
    }
  }, [fetchNextPage]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
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
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-[400px]">
        <Spinner size="56px" />
      </main>
    );
  }

  if (isError && (!data || data.pages.length === 0)) {
    return (
      <ErrorView
        message="내 체험 관리를 불러오는 중 오류가 발생했어요."
        refetch={refetch}
        isFetching={isFetching}
      />
    );
  }

  return (
    <main className="pb-[200px] pt-[70px] px-[16px] md:px-[32px]">
      <div className="mx-auto flex max-w-[1200px] w-full gap-x-[24px]">
        <div className="shrink-0 hidden md:block">
          <SideNavigationMenu />
        </div>
        <section
          className="flex flex-col gap-y-[24px] flex-1"
          aria-labelledby="my-activities-title"
        >
          <header className="flex justify-between">
            <h3
              id="my-activities-title"
              className="text-3xl text-black font-bold"
            >
              내 체험 관리
            </h3>
            <button
              className="bg-nomadBlack rounded-[4px] py-[11px] px-[16px] text-white text-md md:text-lg font-bold cursor-pointer"
              onClick={() => router.push("/my-activities/registration")}
            >
              체험 등록하기
            </button>
          </header>

          {list.length > 0 ? (
            <>
              <ul id="reservation-list" className="flex flex-col gap-y-[24px]">
                {list.map((item) => (
                  <li key={item.id}>
                    <Link href={`/activities/${item.id}`}>
                      <ActivityItem {...item} />
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
                alt="내 체험 없음"
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

export default MyActivities;
