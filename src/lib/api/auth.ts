import { AuthResponse, SignInBody, } from "../types/auth";
import { basicAxios } from "./basicAxios";

// 로그인
export const SignIn = async (body: SignInBody): Promise<AuthResponse> => {
  const { data } = await basicAxios.post<AuthResponse>("/auth/login", body);
  return data;
};