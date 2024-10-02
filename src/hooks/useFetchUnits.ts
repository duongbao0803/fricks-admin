import { getProductList } from "@/apis/productApi";
import { getUnitList } from "@/apis/unitApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchUnits = () => {
  const fetchUnits = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getUnitList();
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["productList"],
    queryFn: fetchUnits,
    refetchOnWindowFocus: false,
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
