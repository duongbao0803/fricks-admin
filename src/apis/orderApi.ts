import axiosClient from "@/config/axiosClient";
import { OrderForm } from "@/types/order.types";

export const getOrderList = async (PageIndex: number, PageSize: number) => {
  const response = await axiosClient.get(
    `/orders?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
  );
  return response;
};

export const getOrderAll = async () => {
  const response = await axiosClient.get(`/orders/all`);
  return response;
};

export const getOrderDetail = async (orderId: number) => {
  const response = await axiosClient.get(`/orders/${orderId}`);
  return response;
};

export const deleteOrder = async (orderId: number) => {
  const response = await axiosClient.delete(`/orders/${orderId}`);
  return response;
};

export const updateOrder = async (formData: OrderForm) => {
  const response = await axiosClient.put(`/orders`, formData);
  return response;
};
