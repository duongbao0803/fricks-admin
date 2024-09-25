import { notification } from "antd";
import React, { useEffect, useState } from "react";

let notificationApi: any;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    notificationApi = api;
  }, [api]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export const notify = (
  type: "success" | "info" | "warning" | "error",
  description: string,
  duration: number,
) => {
  const typeMessages: { [key: string]: string } = {
    success: "Thành công",
    info: "Thông báo",
    warning: "Cảnh báo",
    error: "Lỗi",
  };

  const notificationMessage = typeMessages[type];

  if (notificationApi) {
    notificationApi[type]({
      message: notificationMessage,
      description,
      duration: duration || 3,
      showProgress: true,
    });
  } else {
    console.error("Notification is not initialized");
  }
};
