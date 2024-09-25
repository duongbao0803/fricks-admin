import axiosClient from "@/config/axiosClient";
import { LoginFormParams } from "@/types/auth.types";

const login = (formValues: LoginFormParams) => {
  return axiosClient.post("/authen/login", formValues);
};

const getInfoUser = () => {
  return axiosClient.get("/api/authen/current-user");
};

export { login, getInfoUser };
