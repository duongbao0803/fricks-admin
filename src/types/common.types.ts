export interface CommonModel {
    id: number;
    createDate: string | Date;
    updateDate?: string | Date;
    isDeleted: boolean;
}