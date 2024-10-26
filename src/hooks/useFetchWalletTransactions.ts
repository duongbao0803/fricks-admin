import { getStoreWalletTransactions } from "@/apis/walletApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchWalletTransactions = (currentPage: number, pageSize: number) => {
  const fetchWalletTransactions = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getStoreWalletTransactions(PageIndex, PageSize);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["transationList", currentPage, pageSize],
    queryFn: fetchWalletTransactions,
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });

  let totalCount = 0;
  if (data?.headers["x-pagination"]) {
    try {
      totalCount = JSON.parse(data.headers["x-pagination"])?.TotalCount || 0;
    } catch (error) {
      console.error("Error parsing x-pagination:", error);
    }
  } else {
    console.warn("x-pagination header not found in response");
  }

  return { data, isFetching, totalCount, refetch };
};
