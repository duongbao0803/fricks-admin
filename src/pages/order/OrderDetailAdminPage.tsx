import OrderDetailView from "@/sections/order/store/view/OrderDetailView";
import React from "react";
import { Helmet } from "react-helmet";

const OrderDetailAdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Đơn hàng  </title>
      </Helmet>
      <OrderDetailView />
    </>
  );
};

export default OrderDetailAdminPage;
