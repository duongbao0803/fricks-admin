import axiosClient from "@/config/axiosClient";
import { PostData } from "@/types/post.types";

export const getPostList = async (PageIndex: number, PageSize: number) => {
  const response = await axiosClient.get(
    `/posts?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
  );
  return response;
};

export const getPostDetail = async (postId: number) => {
  const response = await axiosClient.get(`/posts/${postId}`);
  return response;
}

export const addPost = async (postData: PostData) => {
  const response = await axiosClient.post("/posts", postData);
  return response;
};

export const updatePost = async (postData: PostData) => {
  const response = await axiosClient.put("/posts", postData);
  return response;
};

export const deletePost = async (postId: number) => {
  const response = await axiosClient.delete(`/posts/${postId}`);
  return response;
};
