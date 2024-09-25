import React from "react";
import { Steps } from "antd";

const ProcessOrder: React.FC = () => (
  <>
    <div className="mb-10">
      <p className="text-xl font-bold">Thời gian đặt hàng</p>
    </div>
    <Steps
      progressDot
      responsive
      current={6}
      direction="vertical"
      items={[
        {
          title: "Đơn hàng 6",
          description: "5 thiên cát",
        },
        {
          title: "Đơn hàng 5",
          description: "5 thiên cát",
        },
        {
          title: "Đơn hàng 4",
          description: "5 thiên cát",
        },
        {
          title: "Đơn hàng 3",
          description: "5 thiên cát",
        },
        {
          title: "Đơn hàng 2",
          description: "5 thiên cát",
        },
        {
          title: "Đơn hàng 1",
          description: "5 thiên cát",
        },
      ]}
    />
  </>
);

export default ProcessOrder;
