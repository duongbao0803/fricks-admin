import axiosClient from "@/config/axiosClient";

export const getUserList = async (
  PageIndex: number,
  PageSize: number,
  searchTerm: string,
) => {
  const response = await axiosClient.get(
    `/users?PageIndex=${PageIndex}&pageSize=${PageSize}`,
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
