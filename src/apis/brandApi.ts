import axiosClient from "@/config/axiosClient";

export const getBrandList = async (PageIndex: number, PageSize: number) => {
  const response = await axiosClient.get(
    `/brands/get-all-brand-pagin?PageIndex=${PageIndex}&PageSize=${PageSize}`,
  );
  return response;
};

export const addBrand = async (name: string) => {
  const response = await axiosClient.post("/brands", name);
  return response;
};

export const editBrand = async (id: number, name: string) => {
  const response = await axiosClient.put(`/brands?id=${id}`, name);
  return response;
};

export const deleteBrand = async (brandId: number) => {
  const response = await axiosClient.delete(`brands?id=${brandId}`);
  return response;
};
