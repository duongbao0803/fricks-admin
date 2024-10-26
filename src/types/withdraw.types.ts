import { CommonModel } from "./common.types";

export interface WithdrawInfo extends CommonModel {
    walletId?: number;
    amount: number;
    requester?: string;
    status?: string;
    confirmBy?: string;
    note?: string;
    confirmDate?: Date;
    transferDate?: Date;
    imageTransfer?: string;
    storeId?: number;
    storeName?: string;
}