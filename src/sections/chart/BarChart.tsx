import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
);

const BarChart: React.FC<{
  title: string;
  chartData: ChartData<"line" | "bar", (number | [number, number] | null)[]>;
  options: any;
}> = ({ title, chartData, options }) => {
  return (
    <div className="w-full p-5">
      <div className="mb-10">
        <p className="text-xl font-bold">{title}</p>
      </div>
      <Chart type="bar" data={chartData} options={options} />{" "}
    </div>
  );
};

export default BarChart;
