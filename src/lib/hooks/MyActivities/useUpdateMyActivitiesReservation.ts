import { patchMyActivitiesReservations } from "@/lib/api/myActivities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateMyActivitiesReservation() {
  return useMutation({
    mutationFn: patchMyActivitiesReservations,
    onSuccess: () => toast.success("예약 상태가 변경되었습니다."),
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
