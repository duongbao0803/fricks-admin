import axiosClient from "@/config/axiosClient";

export const getUnitList = async () => {
  const response = await axiosClient.get("/product-units/get-all-unit");
  return response;
};
