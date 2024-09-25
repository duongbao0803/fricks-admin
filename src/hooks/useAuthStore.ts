import { login } from "@/apis/authApi";
import { notify } from "@/components/Notification";
import { AuthState } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { create } from "zustand";
import { Roles } from "@/enums";

export const useAuthStore = create<AuthState>((set) => ({
  user: {},
  isLoading: false,

  login: async (values: { email: string; password: string }) => {
    set({ isLoading: true });
    try {
      console.log("object", values);
      const res = await login({
        email: values.email,
        password: values.password,
      });
      console.log("check res", res);
      if (res && res?.data.httpCode === 200) {
        set({ isLoading: false });
        notify("success", "Đăng nhập thành công", 3);
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        const jwtToken = Cookies.get("accessToken");
        if (jwtToken) {
          const decoded: any = jwtDecode(jwtToken);
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          if (role !== Roles.ADMIN && role !== Roles.BUSCOMPANY) {
            notify("success", "Bạn không có quyền truy cập và trang này", 3);
            set({ isLoading: false });
            return;
          } else {
            set({ user: res.data });
            notify("success", "Đăng nhập thành công", 3);
          }
        }
      }
    } catch (err: any) {
      console.log("check err", err);
      set({ isLoading: false });
      notify("error", `${err.response.data.message}`, 3);
      return;
    }
  },
}));
