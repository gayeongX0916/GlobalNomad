import { getActivitiesList } from "@/lib/api/activities";
import { ActivityListBody } from "@/lib/types/activities";
import { useQuery } from "@tanstack/react-query";

export function useActivitiesList(params?: Partial<ActivityListBody>) {
  return useQuery({
    queryKey: [
      "activities",
      params?.category ?? null,
      params?.sort ?? null,
      params?.page ?? 1,
      params?.size ?? 8,
      params?.keyword ?? null,
    ],
    queryFn: () => getActivitiesList(params ?? {}), // 👈 빈 객체로 fallback
  });
}
