export interface AdminDashboardInfo {
    revenue: number;
    numOfStores: number;
    numOfProducts: number;
    numOfUsers: number;
    lastUpdated?: string;
}

export interface AdminDashboardRevenueCategory {
    categoryId: number;
    categoryName: string;
    revenue: number;
    lastUpdated: string;
}

export interface AdminDashboardRevenueStore {
    storeId: number;
    storeName: string;
    revenue: number;
    lastUpdated: string;
}


export interface AdminDashboardMainChart {
    date: string;
    orderCount: number;
    revenue: number;
}
