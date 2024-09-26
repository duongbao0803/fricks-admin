import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";

function App() {
  const { fetchUserInfo } = useAuthStore();

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
