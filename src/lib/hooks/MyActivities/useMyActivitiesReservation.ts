import { getMyActivitiesReservations } from "@/lib/api/myActivities";
import { MyActivitiesReservationsBody, MyActivitiesReservationsResponse } from "@/lib/types/myActivities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useMyActivitiesReservations(params:MyActivitiesReservationsBody,options?:Omit<
    UseQueryOptions<MyActivitiesReservationsResponse, Error>,
    "queryKey" | "queryFn"
  >){
    const {activityId,scheduleld,status}=params;

    return useQuery({
        queryKey:["MyActivities","Reservations",activityId,scheduleld,status],
        queryFn:()=>getMyActivitiesReservations(params),
        ...options
    })

}