import axiosClient from "@/config/axiosClient";

export const getCategoryList = async (PageIndex: number, PageSize: number) => {
  const response = await axiosClient.get(
    `/categories/get-all-category-pagin?PageIndex=${PageIndex}&PageSize=${PageSize}`,
  );
  return response;
};

export const getAllCategory = async () => {
  const response = await axiosClient.get(
    `/categories/get-all-category`,
  );
  return response;
};