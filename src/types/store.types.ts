import { CommonModel } from "./common.types";

export interface StoreInfo extends CommonModel {
    managerEmail?: string;
    name?: string;
    address?: string;
    taxCode?: string;
    image?: string;
    phoneNumber?: string;
    description?: string;
    bankCode?: string;
    accountNumber?: string;
    accountName?: string;
}