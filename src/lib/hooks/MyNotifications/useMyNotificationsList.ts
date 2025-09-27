import { getMyNotifications } from "@/lib/api/myNotifications";
import { useQuery } from "@tanstack/react-query";

export const QK_MY_NOTIS= ["my-notifications"] as const;

export function useMyNotificationsList(enabled:boolean) {
  return useQuery({
    queryKey: QK_MY_NOTIS,
    queryFn: getMyNotifications,
    enabled,
    refetchOnMount:"always"
  });
}
