import React, { useEffect } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import TotalField from "../TotalField";
import DonutChart from "../DonutChart";
import LineChart from "../LineChart";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


const ChartView: React.FC = React.memo(() => {

  const { dashboardInfo, mainChartData, revenueCategoryData, revenueStoreData, fetchDashboard } = useFetchDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const getAllDaysInCurrentMonth = () => {
    const currentDate = dayjs();
    const daysInMonth = currentDate.daysInMonth();
    const labels = [];
    const displayLabels = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs().date(day);
      labels.push(date.format('DD/MM/YYYY'));
      displayLabels.push(date.format('DD'));
    }

    return { labels, displayLabels };
  };

  const lineData = {
    labels: getAllDaysInCurrentMonth().displayLabels,
    datasets: [
      {
        label: "Đơn hàng",
        data: getAllDaysInCurrentMonth().labels.map((date) => {
          return mainChartData?.find((data) => dayjs(data.date).format("DD/MM/YYYY") === date)?.orderCount || 0;
        }),
        borderColor: "#36A2EB",
        pointBorderWidth: 1,
        pointBackgroundColor: "#1b8bd6",
        pointBorderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: "Doanh thu",
        data: getAllDaysInCurrentMonth().labels.map((date) => {
          return mainChartData?.find((data) => dayjs(data.date).format("DD/MM/YYYY") === date)?.revenue || 0;
        }),
        borderColor: "#FF6384",
        pointBorderWidth: 1,
        pointBackgroundColor: "#e73c61",
        pointBorderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
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
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    responsive: true,
  };

  const donutData = {
    labels: revenueStoreData?.map((data) => data.storeName) || [],
    datasets: [
      {
        label: "Doanh thu",
        data: revenueStoreData?.map((data) => data.revenue) || [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  }

  const donutOptions = {
    plugins: {
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc: number, val: number) => acc + val,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return `${percentage}`;
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


  return (
    <>
      <div className="p-5">
        <TotalField data={dashboardInfo} />
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
        <div className="col-span-1 rounded-xl bg-[#fff] shadow-md sm:col-span-2">
          <LineChart chartData={lineData} options={lineOptions} />
        </div>

        <div className="col-span-1 rounded-xl bg-[#fff] sm:col-span-1 flex flex-col">
          <div className="flex-1 h-full">
            <DonutChart chartData={donutData} options={donutOptions} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">

      </div>
    </>
  );
});

export default ChartView;
