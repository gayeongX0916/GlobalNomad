import Image from "next/image";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";
import { KebabMenu } from "../ui/KebabMenu/KebabMenu";
import { formatKRW } from "@/lib/utils/formatKRW";
import { useDeleteMyActivites } from "@/lib/hooks/MyActivities/useDeleteMyActivities";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../ui/Modal/ConfirmModal";
import { useState } from "react";

type ActivityItemProps = {
  id: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
};

export function ActivityItem({
  id,
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: ActivityItemProps) {
  const router = useRouter();
  const { mutate: DeleteMyActivities, isPending } = useDeleteMyActivites();
  const [isOpen, setIsOpen] = useState(false);

  const openDeleteConfirm = () => setIsOpen(true);
  const closeDeleteConfirm = () => setIsOpen(false);

  const handleConfirmDelete = () => {
    if (isPending) return;
    DeleteMyActivities({ activityId: id });
  };

  return (
    <article className="flex gap-x-[24px] rounded-[24px] bg-white w-full shadow-lg shadow-black/5">
      <ConfirmModal
        isOpen={isOpen}
        title="정말 삭제하시겠습니까?"
        confirmText={isPending ? "삭제 중..." : "삭제하기"}
        cancelText="취소하기"
        onCancel={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
      />
      <Image
        src={bannerImageUrl}
        alt="대표 이미지"
        width={128}
        height={128}
        className="w-[128px] h-[128px] md:w-[156px] md:h-[156px] lg:w-[204px] lg:h-[204px] rounded-l-[24px] object-cover "
      />

      <div className="py-[14px] pr-[24px] flex flex-col gap-y-[6px] flex-1">
        <header className="flex items-center gap-x-[6px]">
          <Image src={StarIcon} alt="별점" width={19} height={19} />
          <span className="text-md md:text-lg text-black">
            {rating} ({reviewCount})
          </span>
        </header>

        <div className="flex flex-col h-full justify-between">
          <h3 className="text-lg md:text-2lg lg:text-xl font-bold text-nomadBlack">
            {title}
          </h3>
          <footer className="flex items-center justify-between">
            <span className="text-lg md:text-xl lg:text-2xl text-gray-900">
              {formatKRW(price)} / 인
            </span>
            <KebabMenu
              className="top-10"
              onDelete={openDeleteConfirm}
              onEdit={() => router.push(`/my-activities/registration/${id}`)}
            />
          </footer>
        </div>
      </div>
    </article>
  );
}
