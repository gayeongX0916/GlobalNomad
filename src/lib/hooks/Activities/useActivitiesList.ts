import { getActivitiesList } from "@/lib/api/activities";
import { ActivityListBody } from "@/lib/types/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivitiesList(params: ActivityListBody) {
  const { category, sort, page, size } = params;

  return useQuery({
    queryKey: ["activities", category ?? null, sort ?? null, page, size],
    queryFn: () => getActivitiesList(params),
  });
}
