import React from "react";
import { Helmet } from "react-helmet";
import { ChartView } from "@/sections/chart/view";

const ChartPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Thống kê </title>
      </Helmet>
      <ChartView />
    </>
  );
};

export default ChartPage;
