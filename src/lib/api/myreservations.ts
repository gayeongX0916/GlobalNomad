import {
  CreateMyReservationReviewsBody,
  CreateMyReservationReviewsResponse,
  MyReservationListBody,
  MyReservationListResponse,
  UpdateMyReservationBody,
  UpdateMyReservationResponse,
} from "../types/myReservations";
import { basicAxios } from "./basicAxios";

// 내 예약 리스트 조회
export const getMyReservationList = async (
  params: MyReservationListBody
): Promise<MyReservationListResponse> => {
  const { data } = await basicAxios.get<MyReservationListResponse>(
    `/my-reservations?size=10`,
    {
      params: {
        status: params.status,
      },
    }
  );
  return data;
};

// 내 예약 수정 (취소)
export const patchMyReservation = async ({
  reservationId,
  status,
}: UpdateMyReservationBody): Promise<UpdateMyReservationResponse> => {
  const { data } = await basicAxios.patch<UpdateMyReservationResponse>(
    `/my-reservations/${reservationId}`,
    { status }
  );
  return data;
};

// 내 예약 리뷰 작성
export const postMyReservationReviews = async ({
  reservationId,
  rating,
  content,
}: CreateMyReservationReviewsBody): Promise<CreateMyReservationReviewsResponse> => {
  const { data } = await basicAxios.post<CreateMyReservationReviewsResponse>(
    `/my-reservations/${reservationId}/review`,
    { rating, content }
  );
  return data;
};
