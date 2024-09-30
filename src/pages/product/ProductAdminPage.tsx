import React from "react";
import { Helmet } from "react-helmet";
import { ProductView } from "@/sections/product/admin/view";

const ProductAdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Sản phẩm  </title>
      </Helmet>
      <ProductView />
    </>
  );
};

export default ProductAdminPage;
