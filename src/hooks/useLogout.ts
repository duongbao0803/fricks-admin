import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthStore } from "./useAuthStore";
import { notify } from "@/components/Notification";

const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = useCallback(() => {
    notify("success", "Đăng xuất thành công", 2);
    logout();
    navigate("/");
  }, [logout, navigate]);

  return { handleLogout };
};

export default useLogout;
