import React from "react";
import { Helmet } from "react-helmet";
import { BannerView } from "@/sections/banner/view";

const BannerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Banner </title>
      </Helmet>
      <BannerView />
    </>
  );
};

export default BannerPage;
