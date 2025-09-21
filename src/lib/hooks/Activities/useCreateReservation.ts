import { postActivitiesReservations } from "@/lib/api/activities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateReservation() {
  return useMutation({
    mutationFn: postActivitiesReservations,
    onSuccess: () => toast.success("체험 예약에 성공했습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
