"use client";

import Image from "next/image";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";
import LocationIcon from "@/assets/svgs/location_icon.svg";
import { KebabMenu } from "@/components/ui/KebabMenu";
import { ActivityHeader } from "@/features/activity/ActivityHeader";
import { ActivityDescription } from "@/features/activity/ActivityDescription";
import { ActivityReview } from "@/features/activity/ActivityReview/ActivityReview";
import { useCallback, useState } from "react";
import { ExperienceReservationModal } from "@/components/ui/Modal/ExperienceReservationModal";

const ActivityDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <ExperienceReservationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <main className="w-full px-[16px] md:px-[24px] lg:max-w-[1200px] lg:mx-auto pb-[300px]">
        <ActivityHeader />

        <div className="mt-[80px] flex flex-col">
          <ActivityDescription />
          <ActivityReview />
        </div>
      </main>

      <aside className="border-t border-nomadBlack/30 sticky bottom-0 bg-white w-full h-[80px] flex justify-between items-center px-[40px] lg:px-[80px] py-[10px]">
        <div className="text-2lg font-bold text-black">
          ₩ 1,000 / <span className="text-green-900">총1인</span>
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
