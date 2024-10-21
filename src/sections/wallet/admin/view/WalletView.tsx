import React from "react";
import { BreadScrumb } from "@/components";
import WalletList from "../WalletList";

const WalletView: React.FC = React.memo(() => {
  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      title: "Ví cửa hàng",
    }
  ];
  return (
    <>
      <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý ví tiền</p>
      </div>
      <div className="bg-[#fff] p-5">
        <WalletList />
      </div>
    </>
  );
});

export default WalletView;
