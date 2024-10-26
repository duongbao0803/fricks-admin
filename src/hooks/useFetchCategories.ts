import { getCategoryList } from "@/apis/categoryApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = (
  currentPage: number,
  pageSize: number,
  // searchTerm: string,
) => {
  const fetchCategories = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getCategoryList(PageIndex, PageSize);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categoryList", currentPage, pageSize],
    queryFn: fetchCategories,
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
