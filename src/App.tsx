import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  const { fetchUserInfo } = useAuthStore();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    fetchUserInfo();
  }, [accessToken]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
