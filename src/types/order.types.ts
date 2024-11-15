import { CommonModel } from "./common.types";
import { ProductInfo } from "./product.types";

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
  image: string;
  storeId: number;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  voucherId: number | null;
  orderDetails: OrderDetails | any;
}

export interface OrderDetails {
  id: number;
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
  productUnit: string | null;
  product: ProductInfo;
}

export interface OrderForm {
  id: number;
  image: string;
  status: number;
}
