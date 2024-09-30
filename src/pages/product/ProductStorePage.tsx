import React from "react";
import { Helmet } from "react-helmet";
import { ProductView } from "@/sections/product/store/view";

const ProductStorePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Sản phẩm  </title>
      </Helmet>
      <ProductView />
    </>
  );
};

export default ProductStorePage;
