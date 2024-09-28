import { CommonModel } from "./common.types";

export interface StoreInfo extends CommonModel {
    managerId: number;
    name?: string;
    address?: string;
    taxCode?: string;
    image?: string;
}