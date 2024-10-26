import { getBannerList } from "@/apis/bannerApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchBanners = () => {
  const fetchBanners = async () => {
    const res = await getBannerList();
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["bannerList"],
    queryFn: fetchBanners,
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
