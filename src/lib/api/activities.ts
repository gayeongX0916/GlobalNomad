import {
  ActivityAvailableScheduleBody,
  ActivityDetailBody,
  ActivityListBody,
  ActivityReservationsBody,
  ActivityReviewsBody,
  ActivityReviewsResponse,
  CreateActivityBody,
  CreateActivityCreateImageResponse,
  CreateActivityResponse,
  CreateReservationResponse,
  GetActivitiesListResponse,
  GetActivityAvailableScheduleResponse,
  GetActivityDetailResponse,
} from "../types/activities";
import { basicAxios } from "./basicAxios";

// 체험 리스트 조회
export const getActivitiesList = async (
  params: ActivityListBody
): Promise<GetActivitiesListResponse> => {
  const { data } = await basicAxios.get<GetActivitiesListResponse>(
    "/activities",
    {
      params: {
        method: "offset",
        category: params.category,
        sort: params.sort,
        page: params.page,
        size: params.size,
      },
    }
  );
  return data;
};

// 체험 등록
export const postActivities = async (
  body: CreateActivityBody
): Promise<CreateActivityResponse> => {
  const { data } = await basicAxios.post<CreateActivityResponse>(
    "/activities",
    body
  );
  return data;
};

// 체험 상세 조회
export const getActivitiesDetail = async ({
  activityId,
}: ActivityDetailBody): Promise<GetActivityDetailResponse> => {
  const { data } = await basicAxios.get<GetActivityDetailResponse>(
    `/activities/${activityId}`
  );
  return data;
};

// 체험 예약 가능일 조회
export const getActivitiesAvailableSchedule = async ({
  activityId,
  year,
  month,
}: ActivityAvailableScheduleBody): Promise<GetActivityAvailableScheduleResponse> => {
  const { data } = await basicAxios.get<GetActivityAvailableScheduleResponse>(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
  );
  return data;
};

// 체험 리뷰 조회
export const getActivitiesReview = async ({
  activityId,
  page,
  size,
}: ActivityReviewsBody): Promise<ActivityReviewsResponse> => {
  const { data } = await basicAxios.get<ActivityReviewsResponse>(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`
  );
  return data;
};

// 체험 예약 신청
export const postActivitiesReservations = async ({
  activityId,
  scheduleId,
  headCount,
}: ActivityReservationsBody): Promise<CreateReservationResponse> => {
  const { data } = await basicAxios.post<CreateReservationResponse>(
    `/activities/${activityId}/reservations`,
    { scheduleId, headCount }
  );
  return data;
};

// 체험 이미지 url 생성
export const postActivitiesImage = async (
  file: File | Blob
): Promise<CreateActivityCreateImageResponse> => {
  const form = new FormData();
  form.append("image", file);

  const { data } = await basicAxios.post("/activities/image", form);
  return data;
};
