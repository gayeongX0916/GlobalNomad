import { postMyReservationReviews } from "@/lib/api/myreservations";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateMyReservationReviews() {
  return useMutation({
    mutationFn: postMyReservationReviews,
    onSuccess: () => toast.success("리뷰 작성에 성공했습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
