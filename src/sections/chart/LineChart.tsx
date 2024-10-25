import React from "react";
import { Line } from "react-chartjs-2";
import Chart, { ChartData, CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

interface LineChartProps {
  chartData: ChartData<"line">;
  options: object;
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { chartData, options } = props;
  return (
    <>
      <div className="w-full  p-5 ">
        <div className="mb-10">
          <p className="text-xl font-bold">Biểu đồ Đơn hàng và Doanh thu Tháng Hiện Tại</p>
        </div>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default LineChart;
