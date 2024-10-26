import { BreadScrumb } from "@/components";
import { InfoCircleOutlined, WalletOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React, { useState } from "react";
import Wallet from "../Wallet";
import WalletWithDraw from "../WalletWithDraw";

const WalletView: React.FC = React.memo(() => {
  const [activeKey, setActiveKey] = useState("1");

  const itemTabs = [
    {
      key: "1",
      label: (
        <span>
          <InfoCircleOutlined className="site-form-item-icon mr-1" />
          Thông tin
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <WalletOutlined className="site-form-item-icon mr-1" />
          Rút tiền
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      title: "Ví cửa hàng",
    },
  ];
  return (
    <>
      <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý ví tiền</p>
      </div>
      <div className="bg-[#fff] p-5">
        <Tabs
          defaultActiveKey="1"
          items={itemTabs}
          onChange={handleTabChange}
        />
        <div className="mb-3">{activeKey === "1" && <Wallet />}</div>
        <div>{activeKey === "2" && <WalletWithDraw />}</div>
      </div>
    </>
  );
});

export default WalletView;
