import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";
import { Loading } from "./components";

function App() {
  const { fetchUserInfo, isLoading } = useAuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </>
  );
}

export default App;
