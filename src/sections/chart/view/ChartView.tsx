import { useFetchDashboard } from "@/hooks/useFetchDashboard";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import DonutChart from "../DonutChart";
import LineChart from "../LineChart";
import TotalField from "../TotalField";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ChartView: React.FC = React.memo(() => {
  const { dashboardInfo, mainChartData, revenueStoreData, fetchDashboard } =
    useFetchDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const getAllDaysInCurrentWeek = () => {
    const currentDate = dayjs();
    // const startOfWeek = currentDate.day(1).startOf("day"); // Set to Monday
    const startOfWeek =
      currentDate.day() === 0
        ? currentDate.day(-6).startOf("day")
        : currentDate.day(1).startOf("day");
    const daysInWeek = 7;
    const labels = [];
    const displayLabels = [];
    const dayNames = [];

    for (let day = 0; day < daysInWeek; day++) {
      const date = startOfWeek.add(day, "day");
      labels.push(date.format("DD/MM/YYYY"));
      displayLabels.push(date.format("DD"));
      dayNames.push(date.format("dddd"));
    }

    return { labels, displayLabels, dayNames };
  };

  const lineData = {
    labels: getAllDaysInCurrentWeek().dayNames,
    datasets: [
      {
        label: "Đơn hàng",
        data: getAllDaysInCurrentWeek().labels.map((date) => {
          return (
            mainChartData?.find(
              (data) => dayjs(data.date).format("DD/MM/YYYY") === date,
            )?.orderCount || 0
          );
        }),
        type: "bar",
        borderColor: "rgba(0, 143, 251, 0.85);",
        pointBorderWidth: 1,
        pointBackgroundColor: "#1b8bd6",
        pointBorderColor: "#36A2EB",
        backgroundColor: "rgba(0, 143, 251, 1)",
        yAxisID: "y",
        order: 2,
        barThickness: 30,
      },
      {
        label: "Doanh thu",
        data: getAllDaysInCurrentWeek().labels.map((date) => {
          return (
            mainChartData?.find(
              (data) => dayjs(data.date).format("DD/MM/YYYY") === date,
            )?.revenue || 0
          );
        }),
        borderColor: "rgb(0, 227, 150)",
        pointBorderWidth: 1,
        pointBackgroundColor: "rgb(0, 227, 150)",
        pointBorderColor: "#FFFFFF",
        backgroundColor: "rgb(0, 227, 150)",
        yAxisID: "y1",
        order: 1,
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
        radius: 2,
        backgroundColor: "currentColor",
        hoverRadius: 4,
        hitRadius: 6,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    responsive: true,
  };

  const donutData = (() => {
    // Lọc ra những store có revenue > 0
    const filteredData =
      revenueStoreData?.filter((data) => data.revenue > 0) || [];

    return {
      labels: filteredData.map((data) => data.storeName),
      datasets: [
        {
          label: "Doanh thu",
          data: filteredData.map((data) => data.revenue),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverOffset: 4,
        },
      ],
    };
  })();

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

        <div className="col-span-1 flex flex-col rounded-xl bg-[#fff] sm:col-span-1">
          <div className="h-full flex-1">
            <DonutChart chartData={donutData} options={donutOptions} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3"></div>
    </>
  );
});

export default ChartView;
