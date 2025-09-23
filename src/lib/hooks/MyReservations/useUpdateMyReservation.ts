import { patchMyReservation } from "@/lib/api/myreservations";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateMyReservation() {
  return useMutation({
    mutationFn: patchMyReservation,
    onSuccess: () => toast.success("내 예약이 취소되었습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
