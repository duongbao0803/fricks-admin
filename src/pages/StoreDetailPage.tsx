import StoreDetailView from "@/sections/store/view/StoreDetailView";
import React from "react";
import { Helmet } from "react-helmet";

const StoreDetailPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Cửa hàng  </title>
      </Helmet>
      <StoreDetailView />
    </>
  );
};

export default StoreDetailPage;
