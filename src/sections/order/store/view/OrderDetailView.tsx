import React from "react";
import OrderDetail from "../OrderDetail";
import { useParams } from "react-router-dom";

const OrderDetailView: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý đơn hàng</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <OrderDetail orderId={orderId} />
      </div>
    </>
  );
});

export default OrderDetailView;