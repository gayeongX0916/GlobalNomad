import { getActivitiesReview } from "@/lib/api/activities";
import { ActivityReviewsBody } from "@/lib/types/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivityReviews(params: ActivityReviewsBody) {
  const { activityId, page, size } = params;

  return useQuery({
    queryKey: ["activityReviews", { activityId, page, size }],
    queryFn: () => getActivitiesReview(params),
  });
}
