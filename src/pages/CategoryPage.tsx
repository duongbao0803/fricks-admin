import { CategoryView } from "@/sections/category/view";
import React from "react";
import { Helmet } from "react-helmet";

const CategoryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Danh mục </title>
      </Helmet>
      <CategoryView />
    </>
  );
};

export default CategoryPage;
