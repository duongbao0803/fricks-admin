import { CommonModel } from "./common.types";

export interface StoreInfo extends CommonModel {
    accountManager?: string;
    name?: string;
    address?: string;
    taxCode?: string;
    image?: string;
}