import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart, { ChartData, CategoryScale } from "chart.js/auto";

Chart.register(CategoryScale);

interface DonutChartProps {
  chartData: ChartData<"doughnut">;
  options: Object;
}

const DonutChart: React.FC<DonutChartProps> = (props) => {
  const { chartData, options } = props;
  return (
    <>
      <div className="w-full p-5">
        <div className="mb-10">
          <p className="text-xl font-bold">Danh thu theo cửa hàng</p>
        </div>
        <Doughnut data={chartData} options={options} />
      </div>
    </>
  );
};

export default DonutChart;
