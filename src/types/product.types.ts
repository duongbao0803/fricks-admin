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
  brand?: BrandInfoProduct;
  category?: CategoryInfoProduct;
  price?: PriceInfo[];
}

export interface BrandInfoProduct {
  id: number;
  name: string;
}

export interface CategoryInfoProduct {
  id: number;
  name: string;
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
