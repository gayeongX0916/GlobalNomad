"use client";

import { SideNavigationMenu } from "@/components/layout/SideNavigationMenu";
import EmptyList from "@/assets/svgs/empty_list.svg";
import { ActivityItem } from "@/components/ActivityHistory/ActivityItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

const activities = [1, 2, 3, 4];

const MyActivities = () => {
  const router = useRouter();

  return (
    <main className="pb-[200px] pt-[70px] flex justify-center gap-x-[24px] w-full px-[16px] md:px-[32px] lg:px-0">
      <div className="shrink-0 hidden md:block">
        <SideNavigationMenu />
      </div>
      <section
        className="flex flex-col gap-y-[24px] max-w-[640px] flex-1"
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

        {activities.length > 0 ? (
          <ul id="reservation-list" className="flex flex-col gap-y-[24px]">
            {activities.map((id) => (
              <li key={id}>
                <ActivityItem />
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

export default MyActivities;
