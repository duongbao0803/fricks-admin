import React from "react";
import BrandList from "../BrandList";

const BrandView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý thương hiệu</p>
      </div>
      <div className="bg-[#fff] p-5">
        <BrandList />
      </div>
    </>
  );
});

export default BrandView;
