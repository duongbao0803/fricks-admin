import axiosClient from "@/config/axiosClient";
import { ProductPrice } from "@/types/product.types";

export const getProductList = async (
  PageIndex: number,
  PageSize: number,
  brandId: number,
  categoryId: number,
  storeId: number,
) => {
  const response = await axiosClient.get(
    `/products?PageIndex=${PageIndex}&PageSize=${PageSize}&StoreId=${storeId}&BrandId=${brandId}&CategoryId=${categoryId}`,
  );
  return response;
};

export const addProduct = async (productData: any) => {
  const response = await axiosClient.post("/products", productData);
  return response;
};

export const getDetailProduct = async (productId: number) => {
  const response = await axiosClient.get(`/products/${productId}`);
  return response;
};

export const editProduct = async (productData: any) => {
  const response = await axiosClient.post("/products", productData);
  return response;
};

export const editProductPrice = async (formData: ProductPrice, id: number) => {
  const response = await axiosClient.post(`/products?id=${id}`, formData);
  return response;
};
