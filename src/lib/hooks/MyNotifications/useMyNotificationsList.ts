import { getMyNotifications } from "@/lib/api/myNotifications";
import { useInfiniteQuery } from "@tanstack/react-query";

export const QK_MY_NOTIS = ["my-notifications"] as const;

type useMyNotificationsListProps = {
  enabled?: boolean;
  size?: number;
};

export function useMyNotificationsList({
  enabled,
  size,
}: useMyNotificationsListProps) {
  return useInfiniteQuery({
    queryKey: QK_MY_NOTIS,
    enabled,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getMyNotifications({ size, cursorId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (nextPageParam) => nextPageParam.cursorId ?? null,
    refetchInterval: 1000 * 60, 
    refetchOnWindowFocus: false,
  });
}
