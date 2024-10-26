import React from "react";
import OrderDetail from "../OrderDetail";
import { useParams } from "react-router-dom";
import { BreadScrumb } from "@/components";

const OrderDetailView: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      href: "/store/order",
      title: "Đơn hàng",
    },
    {
      title: "Chi tiết",
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
        <OrderDetail orderId={orderId} />
      </div>
    </>
  );
});

export default OrderDetailView;
