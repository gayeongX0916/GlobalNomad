import { getMyActivitiesList } from "@/lib/api/myActivities";
import { useInfiniteQuery } from "@tanstack/react-query";

type useMyActivitiesListProps = {
  size?: number;
};

export function useMyActivitiesList({ size = 8 }: useMyActivitiesListProps) {
  return useInfiniteQuery({
    queryKey: ["MyActivities"],
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getMyActivitiesList({ size, cursorId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (nextPageParam) => nextPageParam.cursorId ?? null,
    refetchOnWindowFocus: false,
  });
}
