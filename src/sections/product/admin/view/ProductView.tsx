import React from "react";
import ProductList from "../ProductList";

const StoreView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý sản phẩm</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <ProductList />
      </div>
    </>
  );
});

export default StoreView;