import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReservationList } from "@/lib/api/myReservations";
import { MyReservationListBody } from "@/lib/types/myReservations";

export function useMyReservationList(
  params: Omit<MyReservationListBody, "cursorId">
) {
  const { status, size = 10 } = params;

  return useInfiniteQuery({
    queryKey: ["myreservation", status ?? null, size],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getMyReservationList({ status, size, cursorId: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.cursorId ?? null,
    refetchOnWindowFocus: false,
  });
}
