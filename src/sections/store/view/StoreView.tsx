import React from "react";
import StoreList from "../StoreList";

const StoreView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý cửa hàng</p>
      </div>
      <div className="bg-[#fff] p-5">
        <StoreList />
      </div>
    </>
  );
});

export default StoreView;
