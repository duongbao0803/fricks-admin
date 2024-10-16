import React from "react";
import PostDetail from "../PostDetail";
import { useParams } from "react-router-dom";
import { BreadScrumb } from "@/components";

const PostDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      href: "/post",
      title: "Bài viết",
    },
    {
      title: "Chi tiết",
    },
  ];

  return (
    <>
    <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý bài viết</p>
      </div>
      <div className="bg-[#fff] p-5">
        <PostDetail postId={postId}/>
      </div>
    </>
  );
};

export default PostDetailView;
