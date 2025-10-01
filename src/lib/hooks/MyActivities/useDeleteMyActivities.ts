import { deleteMyActivities } from "@/lib/api/myActivities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const QK_MY_ACTIVITIES = ["MyActivities"] as const;

export function useDeleteMyActivites() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteMyActivities,
    onSuccess: () => {
      toast.success("체험이 삭제되었습니다.");
      qc.invalidateQueries({ queryKey: QK_MY_ACTIVITIES });
    },

    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
