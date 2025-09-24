import { getMyActivitiesReservations } from "@/lib/api/myActivities";
import { MyActivitiesReservationsBody } from "@/lib/types/myActivities";
import { useQuery } from "@tanstack/react-query";

export function useMyActivitiesReservations(params:MyActivitiesReservationsBody){
    const {activityId,scheduleld,status}=params;

    return useQuery({
        queryKey:["MyActivities","Reservations",activityId,scheduleld,status],
        queryFn:()=>getMyActivitiesReservations(params),
    })

}