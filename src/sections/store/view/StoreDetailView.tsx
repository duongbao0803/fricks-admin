import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StoreDetail from "../StoreDetail";
import StoreProductList from "../StoreProductList";
import { Tabs } from "antd";
import { InfoCircleOutlined, ProductOutlined } from "@ant-design/icons";

const StoreDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storeId = Number(id);
  const [activeKey, setActiveKey] = useState("1");

  const items = [
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
          <ProductOutlined className="site-form-item-icon mr-1" />
          Sản phẩm
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <ProductOutlined className="site-form-item-icon mr-1" />
          Đơn hàng
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý cửa hàng</p>
      </div>
      <div className="p-5">
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
        <div className="mb-3">
          {activeKey === "1" && <StoreDetail storeId={storeId} />}
        </div>
        <div>{activeKey === "2" && <StoreProductList storeId={storeId} />}</div>
      </div>
    </div>
  );
};

export default StoreDetailView;
