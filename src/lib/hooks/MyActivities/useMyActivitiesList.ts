import { getMyActivitiesList } from "@/lib/api/myActivities";
import { useQuery } from "@tanstack/react-query";

export function useMyActivitiesList() {
  return useQuery({
    queryKey: ["MyActivities"],
    queryFn: () => getMyActivitiesList(),
  });
}
