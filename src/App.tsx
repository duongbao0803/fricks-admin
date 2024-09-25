import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";

function App() {
  return (
    <>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </>
  );
}

export default App;
