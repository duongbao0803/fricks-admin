import { CommonModel } from "./common.types";

export interface LoginFormParams {
  email: string;
  password: string;
}

export interface ApiResponse {
  httpCode: number;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface BaseResponse {
  httpCode: number;
  message: string;
}

export interface ApiResponse extends BaseResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse extends BaseResponse {
  data: ApiResponse;
}

export interface AuthState {
  user: Record<string, unknown>;
  isLoading: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
}

export interface ResponseTokenProps {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  email?: string;
  confirmEmail?: boolean;
  googleId?: string;
  avatar?: string;
  fullName?: string;
  unsignFullName?: string;
  address?: string;
  phoneNumber?: string;
  role?: string;
  status?: string;
  gender?: number;
}
