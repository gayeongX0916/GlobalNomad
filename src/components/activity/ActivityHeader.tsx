"use client";

import StarIcon from "@/assets/svgs/star_icon_on.svg";
import LocationIcon from "@/assets/svgs/location_icon.svg";
import { KebabMenu } from "@/components/ui/KebabMenu/KebabMenu";
import Image from "next/image";

import { GetActivityDetailResponse } from "@/lib/types/activities";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "next/navigation";
import { useDeleteMyActivites } from "@/lib/hooks/MyActivities/useDeleteMyActivities";
import { ConfirmModal } from "../ui/Modal/ConfirmModal";
import { ImagePreviewModal } from "../ui/Modal/ImagePreviewModal";
import { useMemo, useState } from "react";

type ActivityHeaderProps = {
  activity: GetActivityDetailResponse;
};

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  const viewerId = useAuthStore((s) => s.userId);
  const ownerId = activity.userId;
  const router = useRouter();
  const { mutate: deleteMyActivities, isPending } = useDeleteMyActivites();

  const { banner, subImages } = useMemo(() => {
    const subs = activity.subImages?.map((i) => i?.imageUrl) ?? [];
    const banner = activity.bannerImageUrl;
    return { banner, subImages: subs };
  }, [activity]);

  const allImages = useMemo(() => [banner, ...subImages], [banner, subImages]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const openDeleteConfirm = () => setIsOpen(true);
  const closeDeleteConfirm = () => setIsOpen(false);

  const openPreviewByIndex = (idx: number) => {
    setCurrentIndex(idx);
    setIsPreviewOpen(true);
  };
  const closePreview = () => setIsPreviewOpen(false);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const handleConfirmDelete = () => {
    deleteMyActivities({ activityId: activity.id });
    router.push("/");
  };

  const spanClass = (i: number, n: number) => {
    if (n >= 4) return "col-span-1 row-span-1";
    if (n === 3)
      return i === 2 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
    if (n === 2) return "col-span-2 row-span-1";
    if (n === 1) return "col-span-2 row-span-2";
    return "";
  };

  return (
    <article
      className="flex flex-col gap-y-[25px] pt-[8px]"
      aria-labelledby="activity-title"
    >
      <ConfirmModal
        isOpen={isOpen}
        onCancel={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="정말 삭제하시겠습니까?"
        confirmText={isPending ? "삭제 중..." : "삭제하기"}
        cancelText="취소하기"
      />

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        images={allImages}
        currentIndex={currentIndex}
        onClose={closePreview}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <header className="flex justify-between">
        <div className="flex flex-col gap-y-[10px]">
          <span className="text-md text-nomadBlack">{activity.category}</span>
          <h2
            id="activity-title"
            className="text-3xl font-bold text-nomadBlack"
          >
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
              if (isPending) return;
              openDeleteConfirm();
            }}
          />
        )}
      </header>

      <div className="grid grid-cols-4 grid-rows-2 gap-x-[8px] gap-y-[8px]">
        {banner && (
          <figure className="col-span-2 row-span-2">
            <div className="group relative overflow-hidden rounded-[8px] aspect-[4/3]">
              <Image
                src={banner}
                alt="활동 대표 이미지"
                fill
                className="object-cover cursor-pointer"
                onClick={() => openPreviewByIndex(0)}
              />
              <button
                type="button"
                onClick={() => openPreviewByIndex(0)}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 cursor-pointer"
                aria-label="원본 사진 보기"
              >
                <span className=" text-white/90 text-sm font-semibold">
                  원본 사진 보기
                </span>
              </button>
            </div>
          </figure>
        )}

        <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-2">
          {subImages.slice(0, 4).map((src, i) => {
            const globalIndex = (banner ? 1 : 0) + i;
            return (
              <div
                key={`${i}`}
                className={`group relative overflow-hidden rounded-[8px] ${spanClass(
                  i,
                  subImages.length
                )}`}
                onClick={() => openPreviewByIndex(globalIndex)}
              >
                <Image
                  src={src}
                  alt={`보조 이미지 ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => openPreviewByIndex(globalIndex)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 cursor-pointer"
                  aria-label="원본 사진 보기"
                >
                  <span className=" text-white/90 text-sm font-semibold">
                    원본 사진 보기
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
