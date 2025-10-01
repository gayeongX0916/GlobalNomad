import { postMyReservationReviews } from "@/lib/api/myReservations";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateMyReservationReviews() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postMyReservationReviews,
    onSuccess: () => {
      toast.success("리뷰 작성에 성공했습니다.");
      qc.invalidateQueries({ queryKey: ["myreservation"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
