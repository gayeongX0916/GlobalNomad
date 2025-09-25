import { getMyReservationList } from "@/lib/api/myReservations";
import { MyReservationListBody } from "@/lib/types/myReservations";
import { useQuery } from "@tanstack/react-query";

export function useMyReservationList(params: MyReservationListBody) {
  const { status } = params;

  return useQuery({
    queryKey: ["myreservation", status ?? null],
    queryFn: () => getMyReservationList(params),
  });
}
