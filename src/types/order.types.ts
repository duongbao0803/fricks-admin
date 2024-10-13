import { CommonModel } from "./common.types";

export interface OrderInfo extends CommonModel {
  code: string;
  shipFee: number | null;
  discount: number | null;
  total: number;
  status: string;
  paymentStatus: string;
  paymentDate: string;
  paymentMethod: string;
  bankTranNo: string | null;
  bankCode: string | null;
  transactionNo: string | null;
  userId: number;
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  storeId: number;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  voucherId: number | null;
  orderDetails: any;
}
