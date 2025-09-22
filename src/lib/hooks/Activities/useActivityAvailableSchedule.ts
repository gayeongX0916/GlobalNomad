import { getActivitiesAvailableSchedule } from "@/lib/api/activities";
import { ActivityAvailableScheduleBody } from "@/lib/types/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivityAvailableSchedule(
  params: ActivityAvailableScheduleBody
) {
  const { activityId, year, month } = params;
  return useQuery({
    queryKey: ["availableSchedule", { activityId, year, month }],
    queryFn: () => getActivitiesAvailableSchedule(params),
    placeholderData: (prev) => prev,
  });
}
