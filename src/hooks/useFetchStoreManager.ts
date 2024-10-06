import { getStoreManager } from "@/apis/storeApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchStoreManager = (userId: number) => {
  const fetchStoreManager = async () => {
    const res = await getStoreManager(userId);
    return res;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["storeManager"],
    queryFn: fetchStoreManager,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  return { data, isFetching, refetch };
};
