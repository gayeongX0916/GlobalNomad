export interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateMeBody {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileImageResponse {
  profileImageUrl: string;
}
