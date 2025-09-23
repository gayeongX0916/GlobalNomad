import { getMyReservationList } from "@/lib/api/myreservations";
import { MyReservationListBody } from "@/lib/types/myreservations";
import { useQuery } from "@tanstack/react-query";

export function useMyReservationList(params: MyReservationListBody) {
  const { status } = params;
  
  return useQuery({
    queryKey: ["myreservation", status ?? null],
    queryFn: () => getMyReservationList(params),
  });
}
