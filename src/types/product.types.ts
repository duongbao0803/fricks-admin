import { CommonModel } from "./common.types";

export interface ProductInfo extends CommonModel {
  sku: string;
  name: string;
  image?: string;
  categoryId: number;
  brandId: number;
  description?: string;
  quantity: number;
  storeId: number;
  soldQuantity?: number;
  brand?: BrandInfo;
  category?: CategoryInfo;
  price?: PriceInfo[];
}

export interface BrandInfo {
  id: number;
  name: string;
}

export interface CategoryInfo {
  id: number;
  name: string;
  code: string;
}

export interface PriceInfo {
  id: number;
  productId: number;
  price: number;
  unit: PriceUnitInfo;
}

export interface PriceUnitInfo {
  id: number;
  name: string;
}
