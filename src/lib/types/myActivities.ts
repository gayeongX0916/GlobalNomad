import {
  Activity,
  ActivityCategory,
  ActivitySchedule,
  ActivityScheduleInput,
  ActivitySubImage,
} from "./activities";

export interface ActivitiesListResponse {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}

export interface MyActivitiesMonthlyBody {
  activityId: number;
  year: number;
  month: number;
}

interface ReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface DailyReservation {
  date: string;
  reservations: ReservationStatus;
}

export type MyActivitiesMonthlyResponse = DailyReservation[];

export interface MyActivitiesScheduleBody {
  activityId: number;
  date: string;
}

interface ScheduleCount {
  declined: number;
  confirmed: number;
  pending: number;
}

interface ScheduleReservation {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ScheduleCount;
}

export type MyActivitiesScheduleResponse = ScheduleReservation[];

type MyReservationStatus = "decliend" | "pending" | "confirmed";

export interface MyActivitiesReservationsBody {
  activityId: number;
  scheduleld: number;
  status: MyReservationStatus;
}

interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: MyReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivitiesReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservation[];
}

export interface UpdateMyActivitiesReservationsBody {
  activityId: number;
  reservationId: number;
  status: "confirmed" | "declined";
}

export interface UpdateMyActivitiesReservationsResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: "confirmed" | "declined";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteMyActivitiesBody {
  activityId: number;
}

export interface UpdateMyActivitiesBody {
  title: string;
  category: ActivityCategory;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: ActivityScheduleInput[];
}

export interface UpdateMyActivitiesResponse extends Activity {
  schedules: ActivitySchedule[];
  subImages: ActivitySubImage[];
}
