import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReservationList } from "@/lib/api/myReservations";
import { MyReservationListBody } from "@/lib/types/myReservations";

export function useMyReservationList(
  params: Omit<MyReservationListBody, "cursorId">
) {
  const { status, size = 10 } = params;

  return useInfiniteQuery({
    queryKey: ["myreservation", status ?? null],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getMyReservationList({ status, size, cursorId: pageParam }),
    getNextPageParam: (nextPageParam) => nextPageParam.cursorId ?? null,
    refetchOnWindowFocus: false,
  });
}
