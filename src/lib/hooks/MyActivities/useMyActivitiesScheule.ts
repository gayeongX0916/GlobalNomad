import { getMyActivitiesSchedule } from "@/lib/api/myActivities";
import { MyActivitiesScheduleBody } from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";

export function useMyActivitiesSchedule(params: MyActivitiesScheduleBody) {
  const { activityId, date } = params;

  return useQuery({
    queryKey: ["MyActivities", "Schedule", activityId, date],
    queryFn: () => getMyActivitiesSchedule(params),
  });
}
