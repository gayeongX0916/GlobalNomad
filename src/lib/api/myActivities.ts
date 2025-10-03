import {
  ActivitiesListBody,
  ActivitiesListResponse,
  DeleteMyActivitiesBody,
  MyActivitiesMonthlyBody,
  MyActivitiesMonthlyResponse,
  MyActivitiesReservationsBody,
  MyActivitiesReservationsResponse,
  MyActivitiesScheduleBody,
  MyActivitiesScheduleResponse,
  UpdateMyActivitiesBody,
  UpdateMyActivitiesReservationsBody,
  UpdateMyActivitiesReservationsResponse,
  UpdateMyActivitiesResponse,
} from "../types/myActivities";
import { basicAxios } from "./basicAxios";

// 내 체험 리스트 조회
export const getMyActivitiesList = async ({
  cursorId,
  size = 10,
}:ActivitiesListBody): Promise<ActivitiesListResponse> => {
  const cursorParam = cursorId != null ? `&cursorId=${cursorId}` : "";
  const { data } = await basicAxios.get<ActivitiesListResponse>(
    `/my-activities?size=${size}${cursorParam}`
  );
  return data;
};

// 내 체험 월별 예약 현황 조회
export const getMyActivitiesMonthly = async ({
  activityId,
  year,
  month,
}: MyActivitiesMonthlyBody): Promise<MyActivitiesMonthlyResponse> => {
  const { data } = await basicAxios.get<MyActivitiesMonthlyResponse>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
  );
  return data;
};

// 내 체험 날짜별 예약정보(신청,승인,거절)가 있는 스케줄 조회
export const getMyActivitiesSchedule = async ({
  activityId,
  date,
}: MyActivitiesScheduleBody): Promise<MyActivitiesScheduleResponse> => {
  const { data } = await basicAxios.get<MyActivitiesScheduleResponse>(
    `/my-activities/${activityId}/reserved-schedule?date=${date}`
  );
  return data;
};

// 내 체험 예약 시간대별 예약 내역 조회
export const getMyActivitiesReservations = async ({
  activityId,
  scheduleld,
  status,
}: MyActivitiesReservationsBody): Promise<MyActivitiesReservationsResponse> => {
  const { data } = await basicAxios.get<MyActivitiesReservationsResponse>(
    `/my-activities/${activityId}/reservations?size=10&scheduleId=${scheduleld}&status=${status}`
  );
  return data;
};

// 내 체험 예약 상태(승인,거절) 업데이트
export const patchMyActivitiesReservations = async ({
  activityId,
  reservationId,
  status,
}: UpdateMyActivitiesReservationsBody): Promise<UpdateMyActivitiesReservationsResponse> => {
  const { data } =
    await basicAxios.patch<UpdateMyActivitiesReservationsResponse>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      { status }
    );
  return data;
};

// 내 체험 삭제
export const deleteMyActivities = async ({
  activityId,
}: DeleteMyActivitiesBody) => {
  await basicAxios.delete(`/my-activities/${activityId}/`);
};

// 내 체험 수정
export const patchMyActivities = async (
  activityId: number,
  body: UpdateMyActivitiesBody
): Promise<UpdateMyActivitiesResponse> => {
  const { data } = await basicAxios.patch<UpdateMyActivitiesResponse>(
    `/my-activities/${activityId}/`,
    body
  );
  return data;
};
