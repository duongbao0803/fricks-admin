import React from "react";
import OrderList from "../OrderList";

const OrderView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý đơn hàng</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <OrderList />
      </div>
    </>
  );
});

export default OrderView;