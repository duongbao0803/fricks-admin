import { getProductList } from "@/apis/productApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = (
  currentPage: number,
  pageSize: number,
  brandId: number,
  categoryId: number,
) => {
  const fetchUsers = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getProductList(PageIndex, PageSize, brandId, categoryId);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["productList", currentPage, pageSize],
    queryFn: fetchUsers,
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
