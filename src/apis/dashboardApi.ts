import axiosClient from "@/config/axiosClient";

export const getAdminDashboardInfo = async () => {
  const response = await axiosClient.get(`/statistics/admin/info`);
  return response;
};

export const getAdminDashboardMainChart = async (
  month: string,
  year: string,
) => {
  const response = await axiosClient.get(
    `/statistics/admin/main-chart?Year=${year}&Month=${month}`,
  );
  return response;
};

export const getAdminDashboardRevenueCategory = async (
  month: string,
  year: string,
) => {
  const response = await axiosClient.get(
    `/statistics/admin/revenue-category?Year=${year}&Month=${month}`,
  );
  return response;
};

export const getAdminDashboardRevenueStore = async (
  month: string,
  year: string,
) => {
  const response = await axiosClient.get(
    `/statistics/admin/revenue-store?Year=${year}&Month=${month}`,
  );
  return response;
};
