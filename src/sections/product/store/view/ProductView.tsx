import React from "react";
import ProductList from "../ProductList";
import { BreadScrumb } from "@/components";

const StoreView: React.FC = React.memo(() => {
  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      title: "Sản phẩm",
    },
  ];
  return (
    <>
    <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
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