import Image from "next/image";
import { useMemo, useState } from "react";

// Icons
import StarIcon from "@/assets/svgs/star_icon_on.svg";

// UI
import { ActivityReviewItem } from "./ActivityReviewItem";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { useActivityReviews } from "@/lib/hooks/Activities/useActivityReviews";
import { GetActivityDetailResponse } from "@/lib/types/activities";
import { ActivityReviewSkeleton } from "../skeletons/ActivityReviewSkeleton";
import { ErrorView } from "../ui/ErrorView/ErrorView";

type ActivityReviewProps = {
  activity: GetActivityDetailResponse;
};

const EMPTY = {
  averageRating: 0,
  totalCount: 0,
  reviews: [],
};

export function ActivityReview({ activity }: ActivityReviewProps) {
  const [page, setPage] = useState(1);
  const {
    data = EMPTY,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useActivityReviews({
    activityId: activity.id,
    page,
    size: 3,
  });
  const totalPages = useMemo(() => {
    if (!data) return 1;
    if (data.totalCount) {
      return Math.max(1, Math.ceil(data.totalCount / 3));
    }
  }, [data]);

  const getSatisfactionLabel = (rating: number): string => {
    if (rating >= 4.5) return "매우 만족";
    if (rating >= 3.5) return "만족";
    if (rating >= 2.5) return "보통";
    if (rating >= 1.5) return "불만족";
    return "매우 불만족";
  };

  return (
    <article className="mt-[40px]" aria-labelledby="activity-review">
      <header className="flex flex-col gap-y-[24px]">
        <h3 className="text-2lg font-bold text-nomadBlack">후기</h3>

        <div className="flex gap-x-[16px]">
          <span className="text-[50px] text-nomadBlack font-semibold">
            {data.averageRating}
          </span>

          <div className="flex flex-col gap-y-[8px]">
            <span className="text-2lg text-nomadBlack">
              {getSatisfactionLabel(data.averageRating)}
            </span>

            <div className="flex gap-x-[6px]">
              <Image
                src={StarIcon}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
              />
              <span className="text-md text-black">
                {data.totalCount}개 후기
              </span>
            </div>
          </div>
        </div>
      </header>

      <section>
        <h3 className="sr-only">리뷰 목록</h3>
        {isLoading ? (
          <ActivityReviewSkeleton />
        ) : isError ? (
          <ErrorView
            message="후기를 불러오는 중 오류가 발생했어요."
            refetch={refetch}
            isFetching={isFetching}
          />
        ) : data.reviews.length === 0 ? (
          <p className="py-[24px] text-gray-700">아직 후기가 없습니다.</p>
        ) : (
          <ul>
            {data.reviews.map((item, idx) => (
              <li key={idx} className="border-b border-nomadBlack/20 py-[24px]">
                <ActivityReviewItem
                  imageUrl={item.user.profileImageUrl}
                  name={item.user.nickname}
                  date={item.createdAt}
                  des={item.content}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {data.reviews.length > 0 && (
        <div className="flex justify-center mt-[50px]">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </article>
  );
}
