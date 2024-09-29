import { ProductView } from "@/sections/product/view";
import React from "react";
import { Helmet } from "react-helmet";

const ProductPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Sản phẩm  </title>
      </Helmet>
      <ProductView />
    </>
  );
};

export default ProductPage;
