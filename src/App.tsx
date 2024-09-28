import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const { fetchUserInfo } = useAuthStore();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    fetchUserInfo();
  }, [accessToken]);

  return (
    <>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </>
  );
}

export default App;
