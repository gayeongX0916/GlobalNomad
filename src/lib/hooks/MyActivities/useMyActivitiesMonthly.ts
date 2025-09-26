import { getMyActivitiesMonthly } from "@/lib/api/myActivities";
import {
  MyActivitiesMonthlyBody,
  MyActivitiesMonthlyResponse,
} from "@/lib/types/myActivities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useMyActivitiesMonthly(
  params: MyActivitiesMonthlyBody,
  options?: Omit<
    UseQueryOptions<MyActivitiesMonthlyResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  const { activityId, year, month } = params;

  return useQuery({
    queryKey: ["MyActivities", "Monthly", activityId, year, month],
    queryFn: () => getMyActivitiesMonthly(params),
    ...options,
  });
}
