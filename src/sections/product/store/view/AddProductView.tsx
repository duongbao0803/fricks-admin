import React from "react";
import AddProduct from "../AddProduct";

const AddProductView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Thêm sản phẩm mới</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <AddProduct />
      </div>
    </>
  );
});

export default AddProductView;