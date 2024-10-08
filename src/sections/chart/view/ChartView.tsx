import React, { useState } from "react";
import BarChart from "../BarChart";
import TotalField from "../TotalField";
import ProcessOrder from "../ProcessOrder";
import { SystemData } from "@/constants";

const ChartView: React.FC = React.memo(() => {
  const [systemData] = useState({
    labels: SystemData.map((data) => data.year),
    datasets: [
      {
        label: "Hàng bán ra",
        data: SystemData.map((data) => data.sales),
        backgroundColor: ["green"],
      },
      {
        label: "Hàng tồn kho",
        data: SystemData.map((data) => data.inventory),
        backgroundColor: ["blue"],
      },
    ],
  });
  return (
    <>
      <div className="p-5">
        <TotalField />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-12 p-5 sm:grid-cols-3">
        <div className="col-span-1 sm:col-span-2">
          <BarChart chartData={systemData} />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <ProcessOrder />
        </div>
      </div>
    </>
  );
});

export default ChartView;
