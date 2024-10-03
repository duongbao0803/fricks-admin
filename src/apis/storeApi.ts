import axiosClient from "@/config/axiosClient";

export const getStoreList = async (
  PageIndex: number,
  PageSize: number
) => {
  const response = await axiosClient.get(
    `/stores?PageIndex=${PageIndex}&pageSize=${PageSize}`,
  );
  return response;
};

export const addStore = async (storeData: any) => {
  const response = await axiosClient.post("/stores", storeData);
  return response;
};

export const deleteUser = async (storeId: number) => {
  const response = await axiosClient.delete(`/stores/${storeId}`);
  return response;
};
