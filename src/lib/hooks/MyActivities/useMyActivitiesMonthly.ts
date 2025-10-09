import { getMyActivitiesMonthly } from "@/lib/api/myActivities";
import { MyActivitiesMonthlyBody } from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";
import { useQueryError } from "../useQueryError";

type UseMyActivitiesMonthlyProps = MyActivitiesMonthlyBody & {
  enabled?: boolean;
};

export function useMyActivitiesMonthly({
  activityId,
  year,
  month,
  enabled = true,
}: UseMyActivitiesMonthlyProps) {
  const query = useQuery({
    queryKey: ["MyActivities", "Monthly", activityId, year, month],
    queryFn: () => getMyActivitiesMonthly({ activityId, year, month }),
    enabled,
  });

  useQueryError(query.error);
  return query;
}
