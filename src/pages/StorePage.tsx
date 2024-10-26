import { StoreView } from "@/sections/store/view";
import React from "react";
import { Helmet } from "react-helmet";

const StorePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Cửa hàng  </title>
      </Helmet>
      <StoreView />
    </>
  );
};

export default StorePage;
