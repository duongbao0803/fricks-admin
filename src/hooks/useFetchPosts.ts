import { getPostList } from "@/apis/postApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = (currentPage: number, pageSize: number) => {
  const fetchPosts = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getPostList(PageIndex, PageSize);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["postList", currentPage, pageSize],
    queryFn: fetchPosts,
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
