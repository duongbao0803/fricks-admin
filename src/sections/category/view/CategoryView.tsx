import React from "react";
import CategoryList from "../CategoryList";

const CategoryView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý danh mục</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <CategoryList />
      </div>
    </>
  );
});

export default CategoryView;