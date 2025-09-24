import { getMyActivitiesMonthly } from "@/lib/api/myActivities";
import { MyActivitiesMonthlyBody } from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";

export function useMyActivitiesMonthly(params: MyActivitiesMonthlyBody) {
  const { activityId, year, month } = params;

  return useQuery({
    queryKey: ["MyActivities", "Monthly", activityId, year, month],
    queryFn: () => getMyActivitiesMonthly(params),
  });
}
