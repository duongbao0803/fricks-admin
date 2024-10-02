import React from "react";
import { Helmet } from "react-helmet";
import { BrandView } from "@/sections/brand/view";

const BrandPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Thương hiệu </title>
      </Helmet>
      <BrandView />
    </>
  );
};

export default BrandPage;
