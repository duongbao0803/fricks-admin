import axiosClient from "@/config/axiosClient";

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

export const addRequestWithdrawStore = async (withDrawData: any) => {
  const response = await axiosClient.post(
    "/wallets/withdraw/request",
    withDrawData,
  );
  return response;
};

export const getWithdrawsWallet = async (
  PageIndex: number,
  PageSize: number,
) => {
  const response = await axiosClient.get(
    `/wallets/withdraw?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
  );
  return response;
};
