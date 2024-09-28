import { CommonModel } from "./common.types";

export interface ProductInfo extends CommonModel {
    sku: string;
    name: string;
    image?: string;
    categoryId: number,
    brandId: number;
    description?: string;
    quantity: number;
    storeId: number;
    soldQuantity?: number;
    brand?: BrandInfo;
    category?: CategoryInfo;
}

export interface BrandInfo {
    id: number;
    name: string;
}

export interface CategoryInfo {
    id: number;
    name: string;
}