import { getMyActivitiesSchedule } from "@/lib/api/myActivities";
import {
  MyActivitiesScheduleBody,
  MyActivitiesScheduleResponse,
} from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";
import { useQueryError } from "../useQueryError";

type UseMyActivitiesScheduleProps = MyActivitiesScheduleBody & {
  enabled?: boolean;
};

export function useMyActivitiesSchedule({
  activityId,
  date,
  enabled = true,
}: UseMyActivitiesScheduleProps) {
  const query = useQuery<MyActivitiesScheduleResponse>({
    queryKey: ["MyActivities", "schedule", activityId, date],
    queryFn: () => getMyActivitiesSchedule({ activityId, date }),
    enabled,
  });

  useQueryError(query.error);

  return query;
}
