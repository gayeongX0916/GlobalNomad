import {
  deleteMyNotificationsBody,
  MyNotificationsBody,
  MyNotificationsResponse,
} from "../types/myNotifications";
import { basicAxios } from "./basicAxios";

// 내 알림 리스트 조회
export const getMyNotifications =
  async (): Promise<MyNotificationsResponse> => {
  const { data } = await basicAxios.get<MyNotificationsResponse>(
      "/my-notifications?size=10"
  );
  return data;
};

// 내 알림 삭제
export const deleteMyNotifications = async ({
  notificationId,
}: deleteMyNotificationsBody) => {
  await basicAxios.delete(`/my-notifications/${notificationId}`);
};
