import React from "react";
import ProductDetail from "../ProductDetail";
import { BreadScrumb } from "@/components";

const ProductDetailView: React.FC = React.memo(() => {
  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      href: "/store/product",
      title: "Sản phẩm",
    },
    {
      title: "Chi tiết",
    },
  ];
  return (
    <>
      <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">
          Quản lý sản phẩm chi tiết
        </p>
      </div>
      <div className="bg-[#fff] p-5">
        <ProductDetail />
      </div>
    </>
  );
});

export default ProductDetailView;
