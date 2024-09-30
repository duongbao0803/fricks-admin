import { getInfoUser } from "@/apis/authApi";
import { UserInfo } from "@/types/auth.types";
import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
  userInfo: UserInfo | null;
  isLoading: boolean;
  isChecking: boolean;
  login: () => void;
  logout: () => void;
  fetchUserInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: null,
  isLoading: false,
  isChecking: !!Cookies.get("accessToken"),
  login: () => {
    set({ isChecking: true });
  },

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.removeItem("keys");
    set({ userInfo: null });
    set({ isChecking: false });
  },

  fetchUserInfo: async () => {
    set({ isLoading: true });
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        set({ userInfo: res.data });
        set({ isLoading: false });
      }
    } catch (err: any) {
      console.log("check err", err);
      set({ userInfo: null });
      set({ isLoading: false });
    }
  },
}));
