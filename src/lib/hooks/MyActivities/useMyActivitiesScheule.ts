import { getMyActivitiesSchedule } from "@/lib/api/myActivities";
import {
  MyActivitiesScheduleBody,
  MyActivitiesScheduleResponse,
} from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";

type UseMyActivitiesScheduleProps = MyActivitiesScheduleBody & {
  enabled?: boolean;
};

export function useMyActivitiesSchedule({
  activityId,
  date,
  enabled = true,
}: UseMyActivitiesScheduleProps) {
  return useQuery<MyActivitiesScheduleResponse>({
    queryKey: ["MyActivities", "schedule", activityId, date],
    queryFn: () => getMyActivitiesSchedule({ activityId, date }),
    enabled,
  });
}
