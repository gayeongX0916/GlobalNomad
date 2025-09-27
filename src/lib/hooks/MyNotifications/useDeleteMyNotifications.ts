import { deleteMyNotifications } from "@/lib/api/myNotifications";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QK_MY_NOTIS } from "./useMyNotificationsList";

export function useDeleteMyNotifications() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteMyNotifications,
    onSuccess: () => {
      toast.success("알림 삭제에 성공했습니다.");
      qc.invalidateQueries({ queryKey: QK_MY_NOTIS });
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
