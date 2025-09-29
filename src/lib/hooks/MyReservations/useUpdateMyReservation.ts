import { patchMyReservation } from "@/lib/api/myReservations";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateMyReservation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchMyReservation,
    onSuccess: () => {
      toast.success("내 예약이 취소되었습니다.");
      qc.invalidateQueries({ queryKey: ["myreservation"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
