import { OrderView } from "@/sections/order/store/view";
import React from "react";
import { Helmet } from "react-helmet";

const OrderAdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Đơn hàng  </title>
      </Helmet>
      <OrderView />
    </>
  );
};

export default OrderAdminPage;
