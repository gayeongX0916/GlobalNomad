import { getMyActivitiesReservations } from "@/lib/api/myActivities";
import {
  MyActivitiesReservationsBody,
  MyActivitiesReservationsResponse,
} from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";

type UseMyActivitiesReservationsProps = MyActivitiesReservationsBody & {
  enabled?: boolean;
};

export function useMyActivitiesReservations({
  activityId,
  scheduleId,
  status,
  enabled = true,
}: UseMyActivitiesReservationsProps) {
  return useQuery<MyActivitiesReservationsResponse>({
    queryKey: ["MyActivities", "reservations", activityId, scheduleId, status],
    queryFn: () =>
      getMyActivitiesReservations({ activityId, scheduleId, status }),
    enabled,
  });
}
