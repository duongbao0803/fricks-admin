import React from "react";
import BannerList from "../BannerList";

const BannerView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý banner</p>
      </div>
      <div className="bg-[#fff] p-5">
        <BannerList />
      </div>
    </>
  );
});

export default BannerView;
