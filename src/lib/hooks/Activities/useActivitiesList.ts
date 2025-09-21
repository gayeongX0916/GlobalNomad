import { getActivitiesList } from "@/lib/api/activities";
import { ActivityListBody } from "@/lib/types/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivitiesList(params: ActivityListBody) {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivitiesList(params),
  });
}
