import axios from "axios";
import Cookies from "js-cookie";
import { requestRefreshToken } from "../apis/authApi";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get("accessToken");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      try {
        if (refreshToken) {
          const res = await requestRefreshToken(refreshToken);
          if (res && res.status === 200) {
            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken;

            Cookies.set("accessToken", newAccessToken);
            Cookies.set("refreshToken", newRefreshToken);

            axiosClient.defaults.headers.common["Authorization"] =
              `Bearer ${newAccessToken}`;
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("check refresh error", refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
