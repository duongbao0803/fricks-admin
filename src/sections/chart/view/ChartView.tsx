import React, { useState } from "react";
import TotalField from "../TotalField";
import { SystemData } from "@/constants";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import DonutChart from "../DonutChart";
import LineChart from "../LineChart";
import BarChart from "../BarChart";

const ChartView: React.FC = React.memo(() => {
  const [donutData] = useState({
    labels: ["Gạch", "Thiết bị điện", "Xi măng", "Đất"],
    datasets: [
      {
        label: "Doanh thu",
        data: [2000000, 2500000, 1500000, 1000000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  });

  const lineData = {
    labels: SystemData.map((data) => `T${data.month} / ${data.year}`),
    datasets: [
      {
        label: "Dịch vụ A",
        data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 23, 32],
        borderColor: "#36A2EB",
        pointBorderWidth: 1,
        pointBackgroundColor: "#1b8bd6",
        pointBorderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Dịch vụ B",
        data: [28, 48, 40, 19, 86, 28, 48, 40, 19, 86, 66, 44],
        borderColor: "#FF6384",
        pointBorderWidth: 1,
        pointBackgroundColor: "#e73c61",
        pointBorderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const [barData] = useState<
    ChartData<"bar", (number | [number, number] | null)[]>
  >({
    labels: SystemData.map((data) => `T${data.month} / ${data.year}`),
    datasets: [
      {
        label: "Marketing",
        data: SystemData.map((data) => data.sales),
        backgroundColor: ["#4BC0C0"],
      },
      {
        label: "Vận chuyển",
        data: SystemData.map((data) => data.sales),
        backgroundColor: ["#FFCE56"],
      },
      {
        label: "Giao dịch",
        data: SystemData.map((data) => data.inventory),
        backgroundColor: ["#36A2EB"],
      },
      {
        label: "Khác",
        data: SystemData.map((data) => data.inventory),
        backgroundColor: ["#FF6384"],
      },
    ],
  });

  const [barData2] = useState<
    ChartData<"bar", (number | [number, number] | null)[]>
  >({
    labels: SystemData.map((data) => `T${data.month} / ${data.year}`),
    datasets: [
      {
        type: "bar",
        label: "Chi phí",
        data: SystemData.map((data) => data.sales),
        backgroundColor: "#FFCE56",
      },
      {
        type: "bar",
        label: "Doanh thu",
        data: SystemData.map((data) => data.inventory),
        backgroundColor: "#36A2EB",
      },
    ],
  });

  const [lineData2] = useState<
    ChartData<"line", (number | [number, number] | null)[]>
  >({
    labels: SystemData.map((data) => `T${data.month} / ${data.year}`),
    datasets: [
      {
        type: "line",
        label: "Biên lợi nhuận",
        data: SystemData.map((data) => data.inventory - data.sales),
        backgroundColor: "#4BC0C0",
        borderColor: "red",
        pointBorderWidth: 1,
        pointBackgroundColor: "#4BC0C0",
        pointBorderColor: "#4BC0C0",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  });
  const donutOptions = {
    plugins: {
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc: number, val: number) => acc + val,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${percentage}`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
        anchor: "center",
        align: "center",
        offset: 0,
      },
    },
    responsive: true,
  };

  const lineOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 3,
        backgroundColor: "currentColor",
        hoverRadius: 8,
        hitRadius: 10,
      },
      line: {
        tension: 0.4,
      },
    },
    responsive: true,
  };

  const barOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    responsive: true,
    elements: {
      point: {
        radius: 3,
        backgroundColor: "currentColor",
        hoverRadius: 8,
        hitRadius: 10,
      },
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const combinedChartData: ChartData<
    "bar" | "line",
    (number | [number, number] | null)[]
  > = {
    labels: SystemData.map((data) => `T${data.month} / ${data.year}`),
    datasets: [...lineData2.datasets, ...barData2.datasets],
  };

  return (
    <>
      <div className="p-5">
        <TotalField />
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
        <div className="col-span-1 rounded-xl bg-[#fff] shadow-md  sm:col-span-2">
          <LineChart chartData={lineData} options={lineOptions} />
        </div>
        <div className="col-span-1 rounded-xl bg-[#fff] shadow-md  sm:col-span-1">
          <DonutChart chartData={donutData} options={donutOptions} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
        <div className="col-span-1 rounded-xl bg-[#fff] shadow-md  sm:col-span-1">
          <BarChart
            title="Cơ cấu chi phí cửa hàng A"
            chartData={barData}
            options={barOptions}
          />
        </div>
        <div className="col-span-1 rounded-xl bg-[#fff] shadow-md  sm:col-span-1">
          <BarChart
            title="Doanh thu, Lợi nhuận và Biên Lợi Nhuận cửa hàng A"
            chartData={combinedChartData}
            options={barOptions}
          />
        </div>
      </div>
    </>
  );
});

export default ChartView;
