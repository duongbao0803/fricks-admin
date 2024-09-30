import { ProductDetailView } from "@/sections/product/store/view";
import React from "react";
import { Helmet } from "react-helmet";

const ProductStoreDetail: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Sản phẩm  </title>
      </Helmet>
      <ProductDetailView />
    </>
  );
};

export default ProductStoreDetail;
