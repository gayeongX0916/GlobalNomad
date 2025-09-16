import {
  CreateProfileImageResponse,
  SignUpBody,
  UpdateMeBody,
  UserResponse,
} from "@/lib/types/users";
import { basicAxios } from "./basicAxios";

// 회원가입
export const postSignup = async (body: SignUpBody): Promise<UserResponse> => {
  const { data } = await basicAxios.post<UserResponse>("/users", body);
  return data;
};

// 내 정보 조회
export const getUserMe = async (): Promise<UserResponse> => {
  const { data } = await basicAxios.get<UserResponse>("/users/me");
  return data;
};

// 내 정보 수정
export const patchUserMe = async (
  body: UpdateMeBody
): Promise<UserResponse> => {
  const { data } = await basicAxios.patch<UserResponse>("/users/me", body);
  return data;
};

// 프로필 이미지 url 생성
export const postProfileImage = async (
  file: File
): Promise<CreateProfileImageResponse> => {
  const form = new FormData();
  form.append("image", file, file.name);

  const { data } = await basicAxios.post<CreateProfileImageResponse>(
    "/users/me/image",
    form
  );
  return data;
};
