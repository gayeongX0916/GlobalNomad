"use client";

// UI
import { ActivityHeader } from "@/components/activity/ActivityHeader";
import { ActivityDescription } from "@/components/activity/ActivityDescription";
import { ActivityReview } from "@/components/activity/ActivityReview";
import { ExperienceReservationModal } from "@/components/ui/Modal/ExperienceReservationModal";
import { ActivityDetailSkeleton } from "@/components/skeletons/ActivityDetailSkeleton";

import { useCallback, useState } from "react";
import { useActivityDetail } from "@/lib/hooks/Activities/useActivityDetail";
import { useParams } from "next/navigation";
import { GetActivityDetailResponse } from "@/lib/types/activities";
import { formatKRW } from "@/lib/utils/formatKRW";

const ActivityDetailPage = () => {
  const { activityId } = useParams();
  const { data, isPending, error } = useActivityDetail({
    activityId: Number(activityId),
    enabled: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => setIsOpen(true), []);

  const activity: GetActivityDetailResponse = data;

  if (isPending)
    return (
      <>
        <ActivityDetailSkeleton />
      </>
    );
  if (error || !data) return <main>에러가 발생했어요.</main>;

  return (
    <>
      <ExperienceReservationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activity={activity}
      />

      <main className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto pb-[300px]">
        <ActivityHeader activity={activity} />

        <div className="mt-[80px] flex flex-col">
          <ActivityDescription activity={activity} />
          <ActivityReview activity={activity} />
        </div>
      </main>

      <aside className="z-50 border-t border-nomadBlack/30 sticky bottom-0 bg-white w-full h-[80px] flex justify-between items-center px-[40px] lg:px-[80px] py-[10px]">
        <div className="text-2lg font-bold text-black">
          {formatKRW(activity.price)} /
          <span className="text-green-900">총1인</span>
        </div>
        <button
          className="bg-nomadBlack text-white text-lg font-semibold border-none w-[120px] h-[56px] rounded-[5px] cursor-pointer"
          onClick={handleClick}
        >
          체험 예약하기
        </button>
      </aside>
    </>
  );
};

export default ActivityDetailPage;
