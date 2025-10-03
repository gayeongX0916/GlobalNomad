import { getActivitiesDetail } from "@/lib/api/activities";
import { useQuery } from "@tanstack/react-query";

type useActivityDetailProps = {
  activityId: number;
  enabled: boolean;
};

export function useActivityDetail({
  activityId,
  enabled,
}: useActivityDetailProps) {
  return useQuery({
    queryKey: ["activities", activityId],
    enabled,
    queryFn: () => getActivitiesDetail({ activityId: activityId }),
  });
}
