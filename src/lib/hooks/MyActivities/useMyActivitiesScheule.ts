import { getMyActivitiesSchedule } from "@/lib/api/myActivities";
import {
  MyActivitiesScheduleBody,
  MyActivitiesScheduleResponse,
} from "@/lib/types/myActivities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useMyActivitiesSchedule(
  params: MyActivitiesScheduleBody,
  options?: Omit<
    UseQueryOptions<MyActivitiesScheduleResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  const { activityId, date } = params;

  return useQuery({
    queryKey: ["MyActivities", "Schedule", activityId, date],
    queryFn: () => getMyActivitiesSchedule(params),
    ...options,
  });
}
