import React from "react";
import OrderList from "../OrderList";
import { BreadScrumb } from "@/components";

const OrderView: React.FC = React.memo(() => {
  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      title: "Đơn hàng",
    },
  ];
  return (
    <>
      <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý đơn hàng</p>
      </div>
      <div className="bg-[#fff] p-5">
        <OrderList />
      </div>
    </>
  );
});

export default OrderView;
