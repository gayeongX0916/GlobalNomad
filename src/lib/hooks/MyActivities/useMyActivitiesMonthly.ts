import { getMyActivitiesMonthly } from "@/lib/api/myActivities";
import { MyActivitiesMonthlyBody } from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";
type UseMyActivitiesMonthlyProps = MyActivitiesMonthlyBody & {
  enabled?: boolean;
};

export function useMyActivitiesMonthly({
  activityId,
  year,
  month,
  enabled = true,
}: UseMyActivitiesMonthlyProps) {
  return useQuery({
    queryKey: ["MyActivities", "Monthly", activityId, year, month],
    queryFn: () => getMyActivitiesMonthly({ activityId, year, month }),
    enabled,
  });
}
