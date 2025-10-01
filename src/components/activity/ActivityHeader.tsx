import StarIcon from "@/assets/svgs/star_icon_on.svg";
import LocationIcon from "@/assets/svgs/location_icon.svg";
import { KebabMenu } from "@/components/ui/KebabMenu/KebabMenu";
import Image from "next/image";

import { GetActivityDetailResponse } from "@/lib/types/activities";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "next/navigation";
import { useDeleteMyActivites } from "@/lib/hooks/MyActivities/useDeleteMyActivities";

type ActivityHeaderProps = {
  activity: GetActivityDetailResponse;
};

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  const viewerId = useAuthStore((s) => s.userId);
  const ownerId = activity.userId;
  const subImages = activity.subImages.map((image) => image.imageUrl);
  const router = useRouter();
  const { mutate: deleteMyActivities, isPending } = useDeleteMyActivites();

  const spanClass = (i: number, n: number) => {
    if (n >= 4) return "col-span-1 row-span-1";
    if (n === 3) {
      return i === 2 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
    }
    if (n === 2) {
      return "col-span-2 row-span-1";
    }
    if (n === 1) {
      return "col-span-2 row-span-2";
    }
    return "";
  };

  return (
    <article
      className="flex flex-col gap-y-[25px] pt-[8px]"
      aria-labelledby="activity-title"
    >
      <header className="flex justify-between">
        <div className="flex flex-col gap-y-[10px]">
          <span className="text-md text-nomadBlack">{activity.category}</span>
          <h2 className="text-3xl font-bold text-nomadBlack">
            {activity.title}
          </h2>

          <div className="flex gap-x-[12px]">
            <div className="flex items-center gap-x-[6px]">
              <Image src={StarIcon} alt="별점" width={15} height={15} />
              <span className="text-md text-black">
                {activity.rating} ({activity.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-x-[2px]">
              <Image src={LocationIcon} alt="위치" width={18} height={18} />
              <span className="text-md text-black">{activity.address}</span>
            </div>
          </div>
        </div>
        {ownerId === viewerId && (
          <KebabMenu
            className="top-20"
            onEdit={() => {
              if (isPending) return;
              router.push(`/my-activities/registration/${activity.id}`);
            }}
            onDelete={() => {
              if (isPending) return; // 중복 클릭 방지
              // (선택) 확인창
              if (!confirm("정말 이 활동을 삭제할까요?")) return;
              deleteMyActivities({ activityId: activity.id });
              router.push("/");
            }}
          />
        )}
      </header>

      <div className="grid grid-cols-4 grid-rows-2 gap-x-[8px] gap-y-[8px]">
        <figure className="col-span-2 row-span-2">
          <div className="relative overflow-hidden rounded-[8px] aspect-[4/3]">
            <Image
              src={activity.bannerImageUrl}
              alt="활동 대표 이미지"
              fill
              className="object-cover"
            />
          </div>
        </figure>
        <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-2">
          {subImages.map((src, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-[8px] ${spanClass(
                idx,
                subImages.length
              )} `}
            >
              <Image
                src={src}
                alt="보조 이미지"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
