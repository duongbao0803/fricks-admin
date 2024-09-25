import { useState } from "react";

import React from "react";
import Router from "./routes/Sections";
import { NotificationProvider } from "./components/Notification";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </>
  );
}

export default App;
