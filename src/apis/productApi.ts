import axiosClient from "@/config/axiosClient";

export const getProductList = async (
  PageIndex: number,
  PageSize: number,
  brandId: number,
  categoryId: number,
) => {
  const response = await axiosClient.get(
    `/products?PageIndex=${PageIndex}&pageSize=${PageSize}&brandId=${brandId}&categoryId=${categoryId}`,
  );
  return response;
};

export const addUser = async (userData: any) => {
  const response = await axiosClient.post("/users", userData);
  return response;
};

export const deleteUser = async (userId: number) => {
  const response = await axiosClient.delete(`/users/${userId}`);
  return response;
};
