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

export const addProduct = async (productData: any) => {
  const response = await axiosClient.post("/products", productData);
  return response;
};
