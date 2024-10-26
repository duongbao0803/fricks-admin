import React from "react";
import { Line } from "react-chartjs-2";
import Chart, { ChartData, CategoryScale } from "chart.js/auto";
import dayjs from "dayjs";
Chart.register(CategoryScale);

interface LineChartProps {
  chartData: ChartData<"line"> | any;
  options: object;
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { chartData, options } = props;

  const startOfWeek = dayjs().startOf('week'); // Start of week (Sunday)
  const endOfWeek = startOfWeek.add(7, 'days'); // Move to the next Sunday

  return (
    <>
      <div className="w-full  p-5 ">
        <div className="mb-10">
          <p className="text-xl font-bold">Đơn hàng và Doanh thu từ ngày {' '}
            {`${startOfWeek.format('DD/MM/YYYY')} đến ${endOfWeek.format('DD/MM/YYYY')}`}
          </p>
        </div>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default LineChart;
