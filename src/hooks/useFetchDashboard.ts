import { getAdminDashboardInfo, getAdminDashboardMainChart, getAdminDashboardRevenueCategory, getAdminDashboardRevenueStore } from '@/apis/dashboardApi';
import { AdminDashboardInfo, AdminDashboardMainChart, AdminDashboardRevenueCategory, AdminDashboardRevenueStore } from '@/types/dashboard.type';
import { create } from 'zustand';

interface DashboardState {
    dashboardInfo: AdminDashboardInfo;
    mainChartData: AdminDashboardMainChart[] | null;
    revenueCategoryData: AdminDashboardRevenueCategory[] | null;
    revenueStoreData: AdminDashboardRevenueStore[] | null;
    loading: boolean;
    error: string | null;
    fetchDashboard: (month?: string, year?: string) => Promise<void>;
}

export const useFetchDashboard = create<DashboardState>((set) => ({
    dashboardInfo: {
        revenue: 0,
        numOfProducts: 0,
        numOfStores: 0,
        numOfUsers: 0,
    },
    mainChartData: null,
    revenueCategoryData: null,
    revenueStoreData: null,
    loading: false,
    error: null,
    fetchDashboard: async (month?: string, year?: string) => {
        set({ loading: true, error: null });

        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentYear = currentDate.getFullYear().toString();

        const fetchMonth = month || currentMonth;
        const fetchYear = year || currentYear;

        try {
            const [info, mainChart, revenueCategory, revenueStore] = await Promise.all([
                getAdminDashboardInfo(),
                getAdminDashboardMainChart(fetchMonth, fetchYear),
                getAdminDashboardRevenueCategory(fetchMonth, fetchYear),
                getAdminDashboardRevenueStore(fetchMonth, fetchYear),
            ]);

            set({
                dashboardInfo: info.data,
                mainChartData: mainChart.data,
                revenueCategoryData: revenueCategory.data,
                revenueStoreData: revenueStore.data,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch dashboard data',
                loading: false,
            });
        }
    },
}));
