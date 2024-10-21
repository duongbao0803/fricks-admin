import axiosClient from "@/config/axiosClient";

export const getBannerList = async () => {
  const response = await axiosClient.get(
    `/banners`,
  );
  return response;
};

export const addBanner = async (banner: any) => {
  const response = await axiosClient.post("/banners", banner);
  return response;
};

export const editBanner = async (banner: any) => {
  const response = await axiosClient.put(`/banners}`, banner);
  return response;
};

export const deleteBanner = async (bannerId: number) => {
  const response = await axiosClient.delete(`banners?id=${bannerId}`);
  return response;
};