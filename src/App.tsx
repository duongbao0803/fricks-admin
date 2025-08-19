import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { LoadingWrapper } from "./components";
import { NotificationProvider } from "./components/Notification";
import { useAuthStore } from "./hooks/useAuthStore";
import Router from "./routes/Sections";
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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff7b29",
            },
          }}
        >
          <NotificationProvider>
            <LoadingWrapper>
              <Router />
            </LoadingWrapper>
          </NotificationProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
