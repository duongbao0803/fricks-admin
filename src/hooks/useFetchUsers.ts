import { getUserList } from "@/apis/userApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = (
  currentPage: number,
  pageSize: number,
  // searchTerm: string,
) => {
  const fetchUsers = async ({ queryKey }: any) => {
    const [, PageIndex, PageSize] = queryKey;
    const res = await getUserList(PageIndex, PageSize);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["userList", currentPage, pageSize],
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
