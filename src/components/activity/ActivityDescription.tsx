import Image from "next/image";

// Icons
import LocationIcon from "@/assets/svgs/location_icon.svg";
import { GetActivityDetailResponse } from "@/lib/types/activities";
import { KakaoMap } from "./KakaoMap";

type ActivityDescriptionProps = {
  activity: GetActivityDetailResponse;
};

export function ActivityDescription({ activity }: ActivityDescriptionProps) {
  return (
    <article
      className="flex flex-col gap-y-[30px]"
      aria-labelledby="activity-description"
    >
      <hr className="border-nomadBlack/20" />

      <section className="flex flex-col gap-y-[16px]">
        <h3 className="text-xl font-bold text-nomadBlack">체험 설명</h3>
        <p className="text-lg text-nomadBlack">{activity.description}</p>
      </section>

      <hr className="border-nomadBlack/20" />

      <section className="flex flex-col gap-y-[8px]">
        <KakaoMap
          address={activity.address}
          className="aspect-[5/2] w-full rounded-[16px] border border-gray-200"
        />

        <div className="flex gap-x-[2px]">
          <Image src={LocationIcon} alt="위치" width={18} height={18} />
          <span className="text-lg text-nomadBlack">{activity.address}</span>
        </div>
      </section>
      <hr className="border-nomadBlack/20" />
    </article>
  );
}
