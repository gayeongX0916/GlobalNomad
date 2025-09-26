// useUpdateMyActivitiesReservation.ts
import { patchMyActivitiesReservations } from "@/lib/api/myActivities";
import { extractErrorMessage } from "@/lib/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type UpdateVars = {
  activityId: number;
  reservationId: number;
  scheduleId: number;
  status: "confirmed" | "declined";
  date: string; // YYYY-MM-DD
};

export function useUpdateMyActivitiesReservation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateVars) => patchMyActivitiesReservations(vars),
    onSuccess: (_res, vars) => {
      toast.success("예약 상태가 변경되었습니다.");
      // 스케줄 카운트(탭)
      qc.invalidateQueries({
        queryKey: ["MyActivities", "Schedule", vars.activityId, vars.date],
      });
      // 목록(세 상태 모두)
      ["pending", "confirmed", "declined"].forEach((s) =>
        qc.invalidateQueries({
          queryKey: [
            "MyActivities",
            "Reservations",
            vars.activityId,
            vars.scheduleId,
            s,
          ],
        })
      );
      // (선택) 월간 캘린더
      qc.invalidateQueries({
        queryKey: ["MyActivities", "Monthly", vars.activityId],
      });
    },
    onError: (error) => toast.error(extractErrorMessage(error)),
  });
}
