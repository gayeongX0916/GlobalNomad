export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MyNotificationsResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

export interface MyNotificationsBody {
  cursorId: number;
  size: number;
}

export interface deleteMyNotificationsBody {
  notificationId: number;
}
