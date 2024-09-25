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
