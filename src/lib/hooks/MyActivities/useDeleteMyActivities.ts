import { deleteMyActivities } from "@/lib/api/myActivities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteMyActivites() {
  return useMutation({
    mutationFn: deleteMyActivities,
    onSuccess: () => toast.success("체험이 삭제되었습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
