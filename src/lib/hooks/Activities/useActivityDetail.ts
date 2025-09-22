import { getActivitiesDetail } from "@/lib/api/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivityDetail(activityId: number) {
  return useQuery({
    queryKey: ["activities", activityId],
    queryFn: () => getActivitiesDetail({ activityId: activityId }),
  });
}
