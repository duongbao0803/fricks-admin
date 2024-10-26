import AddProductView from "@/sections/product/store/view/AddProductView";
import React from "react";
import { Helmet } from "react-helmet";

const ProductStoreDetail: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Sản phẩm  </title>
      </Helmet>
      <AddProductView />
    </>
  );
};

export default ProductStoreDetail;
