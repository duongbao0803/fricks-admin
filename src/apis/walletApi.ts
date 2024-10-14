import axiosClient from "@/config/axiosClient";

export const getOrderList = async (PageIndex: number, PageSize: number) => {
  const response = await axiosClient.get(
    `/orders?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
  );
  return response;
};

export const deleteOrder = async (orderId: number) => {
  const response = await axiosClient.delete(`/orders/${orderId}`);
  return response;
};

export const getStoreWallet = async () => {
  const response = await axiosClient.get(`/wallets/store`);
  return response;
};

export const getStoreWalletTransactions = async (
  PageIndex: number,
  PageSize: number,
) => {
  const response = await axiosClient.get(
    `/wallets/store/transactions?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
  );
  return response;
};
