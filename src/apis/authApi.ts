import axiosClient from "@/config/axiosClient";
import { LoginFormParams, ResponseTokenProps } from "@/types/auth.types";
import { AxiosResponse } from "axios";

const login = (formValues: LoginFormParams) => {
  return axiosClient.post("/authen/login", formValues);
};

const requestRefreshToken = (
  jwtToken: string,
): Promise<AxiosResponse<ResponseTokenProps>> => {
  return axiosClient.post<ResponseTokenProps>(
    "/authen/refresh-token",
    jwtToken,
  );
};

const getInfoUser = () => {
  return axiosClient.get("/authen/current-user");
};

export { login, getInfoUser, requestRefreshToken };
