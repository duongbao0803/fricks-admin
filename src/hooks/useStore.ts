import { AuthState } from "@/types/auth.types";
import Cookies from "js-cookie";
import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  setData: (data: any) => set({ data }),
}));

export default useStore;
