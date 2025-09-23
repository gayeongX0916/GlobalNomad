type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface MyReservationListBody {
  status: ReservationStatus;
}

export interface ActivitySummary {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface MyReservationItem {
  activity: ActivitySummary;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationListResponse {
  totalCount: number;
  reservations: MyReservationItem[];
  cursorId: string | null;
}

export interface UpdateMyReservationBody {
  reservationId: number;
  status: ReservationStatus;
}

export interface UpdateMyReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMyReservationReviewsBody {
  reservationId: number;
  rating: number;
  content: string;
}

export interface CreateMyReservationReviewsResponse{
    id: number;
  teamId: string;
  activityId: number;
  userId: number;
  rating: number;    
  content: string;
  createdAt: string;
  updatedAt: string;
}