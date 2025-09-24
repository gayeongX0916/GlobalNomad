export type ActivityCategory =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export type ActivitySort = "price_asc" | "price_desc" | "most_reviewed";

// 체험 리스트 조회
export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: ActivityCategory;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityListBody {
  category?: ActivityCategory;
  sort?: ActivitySort;
  page?: number;
  size?: number;
}

export interface GetActivitiesListResponse {
  activities: Activity[];
  totalCount: number;
}

// 체험 등록
export interface ActivityScheduleInput {
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateActivityBody {
  title: string;
  category: ActivityCategory;
  description: string;
  address: string;
  price: number;
  schedules: ActivityScheduleInput[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface ActivityTime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ActivitySchedule {
  date: string;
  times: ActivityTime[];
}

export interface ActivitySubImage {
  id: number;
  imageUrl: string;
}

export interface CreateActivityResponse extends Activity {
  schedules: ActivitySchedule[];
  subImages: ActivitySubImage[];
}

// 상세 조회
export interface ActivityDetailBody {
  activityId: number;
}

export interface ActivityScheduleFlat {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface GetActivityDetailResponse extends Activity {
  subImages: ActivitySubImage[];
  schedules: ActivityScheduleFlat[];
}

// 체험 예약 가능일 조회
export interface ActivityAvailableScheduleBody {
  activityId: number;
  year: string;
  month: string;
}

export type GetActivityAvailableScheduleResponse = ActivitySchedule[];

// 체험 리뷰 조회
export interface ActivityReviewsBody {
  activityId: number;
  page: number;
  size: number;
}

export interface ReviewUser {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface ActivityReview {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: ActivityReview[];
}

// 체험 예약 신청
export interface ActivityReservationsBody {
  activityId: number;
  scheduleId: number;
  headCount: number;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "canceled"
  | "completed";

export interface CreateReservationResponse {
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

// 체험 이미지 url 생성
export interface CreateActivityCreateImageResponse {
  activityImageUrl: string;
}
