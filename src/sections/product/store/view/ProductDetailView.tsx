import React from "react";
import ProductDetail from "../ProductDetail";

const ProductDetailView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý sản phẩm chi tiết</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <ProductDetail />
      </div>
    </>
  );
});

export default ProductDetailView;